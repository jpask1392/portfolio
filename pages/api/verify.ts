import { IRON_OPTIONS } from '@/utils/constants';
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { SiweMessage } from 'siwe'
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'POST':
      try {
        const { message, signature } = req.body;
        
        const siweMessage = new SiweMessage(message)
        const { data } = await siweMessage.verify({ signature: signature })
 
        if (data.nonce !== req.session.nonce)
          return res.status(422).json({ message: 'Invalid nonce.' })
 
        req.session.siwe = data
        await req.session.save()
        res.json({ ok: true })
      } catch (_error) {
        res.json({ ok: false })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 
export default withIronSessionApiRoute(handler, IRON_OPTIONS)