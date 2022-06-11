const express = require('express');
const router = express.Router()
const { Order, User } = require('../db/models')

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findAll({ where: { user_id: id } })
    res.json(order)
  } catch (error) {
    res.status(401)
    .json({ message: error.message})
    .end()  
  }
})

router.post('/', async (req, res) => {
  try {
    const { date, street, house, apartment, uuid, user_id } = req.body;
    const order = await Order.create({ 
      delivery_date: date,
      delivery_street: street,
      delivery_house: house,
      delivery_apartment: apartment,
      delivery_method: 'delivery',
      uuid,
      user_id
    })
    res.json({ ok: true })
  } catch (error) {
    res.status(401).json({ ok: false })
    .end()  
  }
})

router.post('/pickup', async (req, res) => {
  try {
    const { time, date, user_id } = req.body;
    const user = await User.findOne({ where: { id: user_id } })
    const order = await Order.create({ 
      delivery_date: date,
      delivery_time: time,
      delivery_method: 'pickup',
      user_id
    })
    res.json({ order })
  } catch (error) {
    res.status(401)
    .json({ message: error.message})
    .end()  
  }
})


module.exports = router;
