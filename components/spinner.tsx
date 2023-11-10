import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function MyComponent({loading , className}:{loading:boolean , className:any}) {
  return (
    <div>
      <ClipLoader className={className} color={'#123abc'} loading={loading} />
    </div>
  );
}
