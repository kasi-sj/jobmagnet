import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";


const apiKey = process.env.CHATGPT_API; // Replace with your actual API key
const openai = new OpenAI({
  apiKey: apiKey,
});


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('pdf');
    if (!pdfFile) {
      return new Response(JSON.stringify({status: "notok"}));
    }
    const pdfBuffer = await (pdfFile as Blob).arrayBuffer();

    const uploadUrl = 'https://api.pdf.co/v1/file/upload/base64';
    const body = {
      file:   'data:application/pdf;base64,'+Buffer.from(pdfBuffer).toString('base64'),
    }
    const urlResponse = await axios.post(uploadUrl, body, {
      headers: {
        'x-api-key': process.env.PDFTOTEXT,
      },
    });
    const textUrl = 'https://api.pdf.co/v1/pdf/convert/to/text';
    const response1 = await axios.post(textUrl, {
      url : urlResponse.data.url,
      "inline": true,
      "async": false
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.PDFTOTEXT,
      },
    });
    const textContent = response1.data.body;
    console.log(textContent)
    const prompt = textContent+"\n"+"This is an Text Content in a resume \n i need \n1.skills(array like [python,java,..]) \n2.address {country:'',state:'',city:''}\n3.contact {name : '' , email : '' , phone : ''}\n4.specialization eg (FullStack) (need all of this only) details \n return me a json stringified version don't add unnessacery data";
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.1,
    });
    console.log(completion.choices)
    const data = JSON.parse(completion.choices[0].text);
    console.log(data);
    return new Response(JSON.stringify({data : data}));
  } catch (error) {
    console.error('Error handling PDF file:', error);
    return new Response(JSON.stringify({data: "notok"}), { status: 300 });
  }
}