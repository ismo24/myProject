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
    // res.send(`Informations payId: ${payID} codeOTP:${codeOTP} serviceCODE ${serviceCode}`)
   

    const url = 'https://apidist.gutouch.net/apidist/sec/touchpayapi/KARBO2991/transaction?loginAgent=56740054&passwordAgent=tPf7tZwPbv';
    const authorizationToken = 'Basic NzVlMTRkMTc3MDZhOTAyN2RmODgzN2M1ZWE4YWZhNTQyMzQwNmNlYTI0NDkyZGMxOWQxM2ZhYjY3OGIxM2ExYjozNTQ3NmJmN2ZhNTQyZDQ1MzViZWUxMjNmMzQ1OGM2NTQ5NDcxY2UxYTYzZTFjN2U2NmEwYmQ0MmIzOTM2MTE5';

   //change to give idFromClient from browser 2 don't work
   //change to give recipientNumber from browser works well
   //change to give serviceCode from browser don't work so deleted
   //change to give a my proper email and name pas de plantage mais pas de mail recu
   //change to integrate Moov Money paiement
    const  data=serviceCode=="MM"?{
      idFromClient: '15487171111111669723',
      additionnalInfos: {
        recipientEmail: 'karborotech@gmail.com',
        recipientFirstName: 'Ismael',
        recipientLastName: 'KOURA'
      },
      amount: 2000,
      callback: 'https://yourcallbacurl',
      recipientNumber: clientNumber,
      serviceCode: 'BF_PAIEMENTMARCHAND_MOBICASH_TP'
    }:{
        idFromClient: '12345678',
        additionnalInfos: {
        recipientEmail: 'karborotech@gmail.com',
        recipientFirstName: 'Ismael',
        recipientLastName: 'KOURA',
        destinataire: '54791752',
        otp: codeOTP
            },
            amount: 2000,
            callback: 'https://karborotech.net',
            recipientNumber: clientNumber,
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
          
      
          res.json(response.data)
      
        
    } catch (error) {
        
    res.json(error)
        
    }
    
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});