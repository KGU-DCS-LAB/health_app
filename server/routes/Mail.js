// const nodemailer = require('nodemailer');
// const senderInfo = require('../config/SenderInfo.json');

// router.post('/save', function(req, res, next)) => {
//     const { email } = req.body; // 보낼 이메일 주소, 이메일 제목, 이메일 본문, 받는 사람 이름
//     console.log(email);
//     // try {
//     // // 전송하기
//     //   let transporter = nodemailer.createTransport({
//     //     service: 'gmail',
//     //     host: 'smtp.gmail.com', // gmail server 사용
//     //     port: 587,
//     //     secure: false,
//     //     auth: {
//     //       user: 'kguhealthapp@gmail.com', // 보내는 사람의 구글계정 메일 
//     //       pass: 'NewSt@rt!70', // 보내는 사람의 구글계정 비밀번호 (또는 생성한 앱 비밀번호)
//     //     },
//     //   });
      
//     //   // 보낼 메세지
//     //   let message = {
//     //     from: 'kguhealthapp@gmail.com', // 보내는 사람
//     //     to: `ellie5508@naver.com`, // 받는 사람 이름과 이메일 주소
//     //     subject: 'hello', // 메일 제목
//     //     html: `<div // 메일 본문 -> html을 이용해 꾸며서 보낼수 있다
//     //     style='
//     //     text-align: center; 
//     //     width: 50%; 
//     //     height: 60%;
//     //     margin: 15%;
//     //     padding: 20px;
//     //     box-shadow: 1px 1px 3px 0px #999;
//     //     '>
//     //     <h2>seonae 님, 안녕하세요.</h2> <br/> <h2>제목: hello</h2> <br/><br/><br/><br/><br/></div>`,
//     //   };
      
//     //   // 메일이 보내진 후의 콜백 함수
//     //   transporter.sendMail(message, (err) => {
//     //     if (err) next(err);
//     //     else res.status(200).json({ isMailSucssessed: true});
//     //   });
//     // } catch (err) {
//     //   next(err);
//     // }
//   };

