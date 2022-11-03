const crypto = require('crypto');
const hashService = require('./hash-service');
const nodemailer = require("nodemailer");

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
   lazyLoading: true,
});

class OtpService {
   async generateOtp() {
      const otp = crypto.randomInt(1000, 9999);
      return otp;
   }

   async sendBySms(phone, otp) {
      return await twilio.messages.create({
         to: phone,
         from: process.env.SMS_FROM_NUMBER,
         body: `Your codershouse OTP is ${otp}`,
      });
   }
   async sendByEmail(email, otp) {
      // const testAccount = await nodemailer.createTestAccount()
      let mailTransport = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
         }
      })
      let details = {
         from: 'sasa46559@gmail.com',
         to: email,
         subject: 'Your Infinity OTP',
         text: `Your Account OTP code : ${otp}`,
         // html: `<h1>Your Account OTP code : ${otp}</h1>`
      }
      mailTransport.sendMail(details, (err) => {
         if (err) return console.log(err)
         console.log('SENT !');
      })
   }

   verifyOtp(hashedOtp, data) {
      let computedHash = hashService.hashOtp(data);
      return computedHash === hashedOtp;
   }
}

module.exports = new OtpService();