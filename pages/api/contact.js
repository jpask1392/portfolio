
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import sgMail from '@sendgrid/mail'
import { promises as fs } from 'fs'
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  let Message = ''
  let ignoreFields = ['FROM', 'SENDTO', 'SUBJECT']
  for (const property in data.fields) {
    if (ignoreFields.includes(property)) continue;
    Message += `<strong>${property}:</strong>  ${data.fields[property]} <br><br>`;
  }

  // read file from the temporary path
  // const contents = await fs.readFile(data?.files?.Upload.path, {
  //   encoding: 'base64',
  // })

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: data.fields.SENDTO,
    from: data.fields.FROM, // Change to your verified sender
    subject: data.fields.SUBJECT,
    text: Message,
    html: Message,
    // attachments: [
    //   {
    //     content: contents,
    //     filename: "attachment.pdf",
    //     type: "application/pdf",
    //     disposition: "attachment"
    //   }
    // ]
  }

  sgMail
    .send(msg)
    .then(() => {
      res.json({ success: true })
      console.log('Email sent')
    })
    .catch((error) => {
      res.json({ success: false })
      console.error(error)
    })
}
