const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
