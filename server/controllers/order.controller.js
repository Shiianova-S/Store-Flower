const { Order, BouquetList, Bouquet } = require('../db/models');

const addOrder = async (req, res) => {
  const {
    date, street, house, apartment, delivery_method, user_id, cart,
  } = req.body;
  try {
    const newOrder = await Order.create({
      delivery_date: date,
      delivery_street: street,
      delivery_house: house,
      delivery_apartment: apartment,
      delivery_method,
      user_id,
      isActive: true,
    });
    cart.forEach(async (el) => {
      await BouquetList.create({
        bouquet_id: el.bouquet.id,
        count: el.count,
        user_id,
        order_id: newOrder.id,
      });
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getOrdersUser = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findAll({
      where: { user_id: Number(id) },
      attributes: { exclude: ['isActive', 'user_id', 'createdAt', 'updatedAt'] },
      include: {
        model: Bouquet,
        as: 'orderList',
        attributes: ['id', 'title', 'img'],
        include: {
          model: BouquetList,
          as: 'count',
          attributes: ['count'],
        },
      },
    });
    const needView = order.map((el) => {
      const newEl = {
        id: el.id,
        delivery_date: el.delivery_date,
        delivery_street: el.delivery_street,
        delivery_house: el.delivery_house,
        delivery_apartment: el.delivery_apartment,
        orderList:
          el.orderList.map((item) => {
            const newItem = {
              id: item.id,
              title: item.title,
              img: item.img,
              count: item.count.count,
            };
            return newItem;
          }),
      };
      return newEl;
    });
    // const needView1 = order.map((el) => ({
    //   ...el,
    //   orderList: el.orderList.map((item) => ({ ...item, count: item.count.count })),
    // }));
    res.json(needView);
  } catch (error) {
    res.status(401).json({ message: error.message }).end();
  }
};

module.exports = { addOrder, getOrdersUser };
