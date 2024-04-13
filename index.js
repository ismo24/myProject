const express = require('express');
const app = express();
const path=require('path')
const port =3000;
const axios=require('axios');
const { send } = require('process');


app.use(express.static('public'));



  app.get('/', async(req, res) => {
    console.log('queryInfos',req.query)

    // res.send('Bienvenue sur ma page ISMO226')

    

    const payID=req.query.payID?req.query.payID:""
    const codeOTP=req.query.codeOTP?req.query.codeOTP:""
    const serviceCode=req.query.serviceCode?req.query.serviceCode:""
    const clientNumber=req.query.clientNumber?req.query.clientNumber:""
    
   

    const url = 'https://apidist.gutouch.net/apidist/sec/touchpayapi/KARBO2991/transaction?loginAgent=56740054&passwordAgent=tPf7tZwPbv';
    const authorizationToken = 'Basic NzVlMTRkMTc3MDZhOTAyN2RmODgzN2M1ZWE4YWZhNTQyMzQwNmNlYTI0NDkyZGMxOWQxM2ZhYjY3OGIxM2ExYjozNTQ3NmJmN2ZhNTQyZDQ1MzViZWUxMjNmMzQ1OGM2NTQ5NDcxY2UxYTYzZTFjN2U2NmEwYmQ0MmIzOTM2MTE5';

   
    const  orangeData={
            idFromClient: payID,
            additionnalInfos: {
              recipientEmail: 'JUNIOR@hubsocial.org',
              recipientFirstName: 'Moustapha',
              recipientLastName: 'SECK',
              destinataire: '54791752',
              otp: codeOTP
            },
            amount: 2000,
            callback: 'https://karborotech.net',
            recipientNumber: clientNumber,
            serviceCode: serviceCode
          }

     const  MoovData={
            idFromClient: payID,
            additionnalInfos: {
              recipientEmail: 'JUNIOR@hubsocial.org',
            recipientFirstName: 'Moustapha',
            recipientLastName: 'SECK',
              destinataire: '54791752',
            },
            amount: 2000,
            callback: 'https://karborotech.net',
            recipientNumber: clientNumber,
            serviceCode: serviceCode
          }
   

          const data=serviceCode=='BF_PAIEMENTMARCHAND_MOBICASH_TP'?MoovData:orangeData
   
    try {
        
          const response = await axios.put(url,data,{
            headers: {
              'Authorization': authorizationToken,
              'Content-Type': 'application/json',
              'User-Agent': 'insomnia/2023.5.8'
            }
          });
         
      
          res.json(response.data)
      
        
    } catch (error) {
   

    res.json(error)
        
    }
    
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});