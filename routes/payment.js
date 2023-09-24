// usersRoutes.js
const express = require('express');
const router = express.Router();
const { Payment } = require('../models/payment');
const paymentCont = require('../controllers/payments');

router.get('/', paymentCont.getAllPayments);

router.get('/:id', paymentCont.getPaymentById);

router.post('/', paymentCont.createPayment);

router.put('/:id', paymentCont.updatePaymentById);

router.delete('/:id', paymentCont.deletePaymentById);


module.exports = router;
