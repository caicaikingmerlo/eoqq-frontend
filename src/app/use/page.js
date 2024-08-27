"use client"
// Ou, se estiver usando ES Modules
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadInvoice from '../../../components/UploadInvoice.js';

export default function Home() {
  console.log(localStorage.getItem('token'))
  const isValidToken = (token) =>{
    try{
      const decoded = jwt.verify(token,'asd');
      return true;
    }
    catch(error){
      console.log('erro aqui')
      return false;
    }
  }
  // useEffect(() => {
    // try{
      // const decoded = jwt.verify(localStorage.getItem('token'), process.env.JWT_SECRET);
    // }
    // catch(error){
      // window.location = '/'
    // }
  // });
  return (
    <div className="container">
      <h1>Invoice Uploader</h1>
      <UploadInvoice />
    </div>
  );
}
