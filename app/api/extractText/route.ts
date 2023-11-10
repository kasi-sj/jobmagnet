import fs from 'fs/promises';
import ConvertApi from 'convertapi'
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import OpenAI from "openai";



const apiKey = process.env.CHATGPT_API; // Replace with your actual API key
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Update the engine and endpoint as needed


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
    const destinationPath = path.join(process.cwd(), 'public', 'uploads', 'uploaded.pdf');
    const destinationText = path.join(process.cwd(), 'public', 'uploads', 'example.txt');
    await fs.writeFile(destinationPath, Buffer.from(pdfBuffer));

    var convertapi = new ConvertApi(process.env.PDFTOTEXT||'');
    await convertapi.convert('txt', {
        File: destinationPath,
    }, 'pdf').then(async function(result) {
      await result.saveFiles(destinationText);
    });
    const textContent = await fs.readFile(destinationText, 'utf-8');
    console.log(textContent);
    const prompt = textContent+"\n"+"This is an Text Content in a resume \n i need \n1.skills(array like [python,java,..]) \n2.address {country:'',state:'',city:''}\n3.contact {name : '' , email : '' , phone : ''}\n4.specialization eg (FullStack) (need all of this only) details \n return me a json stringified version don't add unnessacery data";
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.2,
    });
    console.log(completion.choices)
    const data = JSON.parse(completion.choices[0].text);
    console.log(data);
    // console.log(completion.choices[0].text.trim());
    return new Response(JSON.stringify({data : data}));
  } catch (error) {
    console.error('Error handling PDF file:', error);
    return new Response(JSON.stringify({data: error}), { status: 300 });
  }
}