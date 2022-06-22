
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

const contact = async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()
    
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

  let Message = ''
  let ignoreFields = ['FROM', 'SENDTO', 'SUBJECT']
  for (const property in data.fields.formData) {
    if (ignoreFields.includes(property)) continue;
    Message += `<strong>${property}:</strong>  ${data.fields.formData[property]} <br><br>`;
  }


  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: data.fields.SENDTO,
    from: data.fields.FROM, // Change to your verified sender
    subject: data.fields.SUBJECT,
    text: Message,
    html: Message,
  };

  // read file from the temporary path
  // const contents = await fs.readFile(data?.files?.Upload.path, {
  //   encoding: 'base64',
  // })

  // if (contents) {
  //   msg['attachments'] = [
  //     {
  //       content: contents,
  //       filename: "attachment.pdf",
  //       type: "application/pdf",
  //       disposition: "attachment"
  //     }
  //   ]
  // }

  return new Promise((resolve, reject) => {
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
        res.json({ success: true });
        resolve();
      })
      .catch((error) => {
        console.error(error);
        res.json({ success: false });
        resolve();
      })
  });
}

export default contact;