// const transport = require('./Mail');
// const express = require('express')
// const router = express.Router()

// router.post('/mail', (req, res) => {
//     // const { email } = req.body.data
//     console.log(req.body.data);
  
//     // transport.sendMail({
//     //   from: `kguhealthapp@gmail.com>`,
//     //   to: email,
//     //   subject: '[ABC] ������ȣ�� �����߽��ϴ�.',
//     //   text: '123456',
//     //   html: `
//     //     <div style="text-align: center;">
//     //       <h3 style="color: #FA5882">ABC</h3>
//     //       <br />
//     //       <p>123456</p>
//     //     </div>
//     //   `})

//       res.status(200).json({
//         status: 'Success',
//         code: 200,
//         message: 'Sent Auth Email',
//       });
//   })
  
//   module.exports = router;