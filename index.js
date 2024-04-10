const express = require('express');
const app = express();
const path=require('path')
const port = process.env.PORT || 3000;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public/homePage.html'));
  });

  app.get('/Paiements', async(req, res) => {
    const payID=req.query.payID
    const codeOTP=req.query.codeOTP
    const serviceCode=req.query.serviceCode
    const url = 'https://apidist.gutouch.net/apidist/sec/touchpayapi/KARBO2991/transaction?loginAgent=56740054&passwordAgent=tPf7tZwPbv';
    const authorizationToken = 'Basic NzVlMTRkMTc3MDZhOTAyN2RmODgzN2M1ZWE4YWZhNTQyMzQwNmNlYTI0NDkyZGMxOWQxM2ZhYjY3OGIxM2ExYjozNTQ3NmJmN2ZhNTQyZDQ1MzViZWUxMjNmMzQ1OGM2NTQ5NDcxY2UxYTYzZTFjN2U2NmEwYmQ0MmIzOTM2MTE5';

    const data = {
            idFromClient: mycode, // Assuming the OTP code is used as 'idFromClient'
            additionnalInfos: {
              recipientEmail: "JUNIOR@hubsocial.org",
              recipientFirstName: "Moustapha",
              recipientLastName: "SECK"
            },
            amount: 2000,
            callback: "https://www.karborotech.net",
            recipientNumber: "54791752",
            serviceCode: serviceCode
          };
    try {
        
          const response = await axios.get(url, {
            headers: {
              'Authorization': authorizationToken,
              'Content-Type': 'application/json',
              'User-Agent': 'insomnia/2023.5.8'
            }
          });
          res.json(response.data);
      
        
    } catch (error) {
        // Handle errors, such as if the external API is down
    
    res.status(500).send('An error occurred while fetching data.');
        
    }
    
  });



// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });