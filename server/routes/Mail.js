// const nodemailer = require('nodemailer');
// const senderInfo = require('../config/SenderInfo.json');

// router.post('/save', function(req, res, next)) => {
//     const { email } = req.body; // ���� �̸��� �ּ�, �̸��� ����, �̸��� ����, �޴� ��� �̸�
//     console.log(email);
//     // try {
//     // // �����ϱ�
//     //   let transporter = nodemailer.createTransport({
//     //     service: 'gmail',
//     //     host: 'smtp.gmail.com', // gmail server ���
//     //     port: 587,
//     //     secure: false,
//     //     auth: {
//     //       user: 'kguhealthapp@gmail.com', // ������ ����� ���۰��� ���� 
//     //       pass: 'NewSt@rt!70', // ������ ����� ���۰��� ��й�ȣ (�Ǵ� ������ �� ��й�ȣ)
//     //     },
//     //   });
      
//     //   // ���� �޼���
//     //   let message = {
//     //     from: 'kguhealthapp@gmail.com', // ������ ���
//     //     to: `ellie5508@naver.com`, // �޴� ��� �̸��� �̸��� �ּ�
//     //     subject: 'hello', // ���� ����
//     //     html: `<div // ���� ���� -> html�� �̿��� �ٸ缭 ������ �ִ�
//     //     style='
//     //     text-align: center; 
//     //     width: 50%; 
//     //     height: 60%;
//     //     margin: 15%;
//     //     padding: 20px;
//     //     box-shadow: 1px 1px 3px 0px #999;
//     //     '>
//     //     <h2>seonae ��, �ȳ��ϼ���.</h2> <br/> <h2>����: hello</h2> <br/><br/><br/><br/><br/></div>`,
//     //   };
      
//     //   // ������ ������ ���� �ݹ� �Լ�
//     //   transporter.sendMail(message, (err) => {
//     //     if (err) next(err);
//     //     else res.status(200).json({ isMailSucssessed: true});
//     //   });
//     // } catch (err) {
//     //   next(err);
//     // }
//   };

