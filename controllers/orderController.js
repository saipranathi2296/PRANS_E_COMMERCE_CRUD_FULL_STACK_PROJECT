const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res, next) => {
  try {
    const { user, items, totalPrice, status } = req.body;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ message: `Product ${item.product} not found.` });
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for product ${product.name}.` });
      }
    }

    const order = await Order.create({ user, items, totalPrice, status });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name price');
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const { items, totalPrice, status } = req.body;

    if (items) {
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) return res.status(400).json({ message: `Product ${item.product} not found.` });
        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Not enough stock for product ${product.name}.` });
        }
      }
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { items, totalPrice, status },
      { new: true, runValidators: true }
    )
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json({ message: 'Order deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
