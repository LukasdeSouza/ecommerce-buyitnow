import Order from "@/models/Order";
import db from "@/utils/db";

const { getSession } = require("next-auth/react");

const handler = async (req, res) => {
  const session = getSession()
  if (!session) {
    return res.status(401).send({ message: 'Registro obrigatório' })
  }

  await db.connect()
  const order = await Order.findById(req.query.id)
  if (order) {
    if (order.isPaid) {
      return res.status(400).send({ message: "A compra já foi paga" })
    }
    order.isPaid = true
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address
    }
    const paidOrder = await order.save()
    await db.disconnect()
    res.send({ message: 'Compra paga com sucesso!', order: paidOrder })
  } else {
    res.status(404).send({ message: 'Erro: Pedido não encontrado' })
  }
}

export default handler