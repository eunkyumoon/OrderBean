/**
 * 라우트 통합
 */
const express = require('express');
const router = express.Router();
const menuRoutes = require('./menuRoutes');
const orderRoutes = require('./orderRoutes');
const adminRoutes = require('./adminRoutes');

// API v1 라우트
router.use('/menus', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);

module.exports = router;

