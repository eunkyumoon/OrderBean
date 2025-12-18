/**
 * 메뉴 라우트
 */
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// 공개 라우트
router.get('/', menuController.getMenus);
router.get('/:id', menuController.getMenuById);

// 관리자 라우트
router.post('/', authMiddleware, adminMiddleware, menuController.createMenu);

module.exports = router;

