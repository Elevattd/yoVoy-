const nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      post: 587,
      secure: false,
      auth: {
        user: 'soporteyovoypf@gmail.com',
        pass: 'iefkyfxwlvdgitsp'
      }
})

export const buildMail = (mail: any) => {
  return {
      ...mail,
      from: 'soporteyovoypf@gmail.com',
  }
}

export const sendMail = async (mail: any) => {
  mail  = buildMail(mail)
  try{
    await transporter.sendMail(mail, (err: any, info: any) => {
      if (err) {
        console.log(err)
        throw err
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }catch(e){throw e}
}