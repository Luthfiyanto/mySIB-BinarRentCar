const nodemailer = require("nodemailer");
const generateOTP = require("./../app/services/otp");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "lulufaridaalfani73@gmail.com",
    pass: "ffbs njch ddpy bemw",
  },
});

exports.sendEmail = (mailInfo) => {
  transporter.sendMail(
    {
      from: "Lulu Farida Alfani <noreplay@gmail.com>",
      mailInfo,
    },
    (err, info) => {
      if (err) {
        console.log("err", err);
      }
      console.log("info", info);
    }
  );
};
// const otp = generateOTP();

// const testSendMail = () => {
//   transporter.sendMail(
//     {
//       from: "Lulu Farida Alfani Bangkit Academy <noreplay@gmail.com>",
//       to: "luthfiyant1425@gmail.com",
//       subject: "OTP Verification",
//       // html: `<p>Halo Herlambang,</p><p>Kami mengidentifikasi bahwa akunmu melakukan permintaan penggantian sandi. Untuk memverifikasi bahwa itu benar-benar kamu, silakan masukkan kode OTP ini.</p><p>Psssttt... Jangan bagikan ke orang lain yah. </p><h2>${otp}</h2><p>Jika kamu merasa tidak melakukan tindakan tersebut. Mohon konfirmasi dengan membalas email ini.</p>`,
//       html: `<p>Halo Herlambang</p><p>Kami ingin menginformasikan bahwa hari ini adalah hari terakhir pengumpulan tugas Proposal Metode Penelitian. Apabila kamu mengalami kesulitan dalam pengerjaan, kami menawarkan jasa joki tugas agar kamu bisamendapatkan nilai E. Jika kamu tertarik, silakan menghubungi kami lewat link berikut ini yaa...</p><a href="wa.me/+6282265026035">metopen/wa</a>`,
//     },
//     (err, info) => {
//       if (err) {
//         console.log("err", err);
//       }
//       console.log("info", info);
//     }
//   );
// };

// testSendMail();
