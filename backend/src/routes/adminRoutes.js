/**
 * 관리자 라우트
 */
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// 메뉴 생성 (관리자)
router.post('/menus', authMiddleware, adminMiddleware, menuController.createMenu);

// 주문 상태 업데이트 (관리자)
router.patch('/orders/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

module.exports = router;

