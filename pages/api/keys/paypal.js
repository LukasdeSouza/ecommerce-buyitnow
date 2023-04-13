const { getSession } = require("next-auth/react");

const handler = async (req, res) => {
  const session = getSession()

  if (!session) {
    return res.status(401).send({ message: 'Registro obrigatório' })
  }

  res.send(process.env.CLIENT_ID_PAYPAL || 'sb')
}

export default handler