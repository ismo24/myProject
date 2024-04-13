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
    // res.send(`Informations payId: ${payID} codeOTP:${codeOTP} serviceCODE ${serviceCode}`)
   

    const url = 'https://apidist.gutouch.net/apidist/sec/touchpayapi/KARBO2991/transaction?loginAgent=56740054&passwordAgent=tPf7tZwPbv';
    const authorizationToken = 'Basic NzVlMTRkMTc3MDZhOTAyN2RmODgzN2M1ZWE4YWZhNTQyMzQwNmNlYTI0NDkyZGMxOWQxM2ZhYjY3OGIxM2ExYjozNTQ3NmJmN2ZhNTQyZDQ1MzViZWUxMjNmMzQ1OGM2NTQ5NDcxY2UxYTYzZTFjN2U2NmEwYmQ0MmIzOTM2MTE5';

   
    const  data={
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
            recipientNumber: '74102140',
            serviceCode: 'BF_PAIEMENTMARCHAND_OM_TP'
          }

   
    try {
        
          const response = await axios.put(url,data,{
            headers: {
              'Authorization': authorizationToken,
              'Content-Type': 'application/json',
              'User-Agent': 'insomnia/2023.5.8'
            }
          });
          // console.log("response",response)
          const myData={
            "message 1":req.query,
            "message 2":"request is successfull",
            "message 3":response.data,
            
          }
      
          res.json(myData)
      
        
    } catch (error) {
        // Handle errors, such as if the external API is down
    // console.log("error",error)
    // res.status(500).send('An error occurred while fetching data.',error,'queryInfos:',req.query);
    const myData={
      "message 1":req.query,
      "message 2":"request failed",
      "message 3":error,
      
    }

    res.json(myData)
        
    }
    
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});