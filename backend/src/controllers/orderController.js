/**
 * 주문 컨트롤러
 * 주문 관련 HTTP 요청 처리
 */
const orderService = require('../services/orderService');

/**
 * 주문 생성
 */
const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderData = req.body;
    
    // 기본 검증
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '주문 항목이 필요합니다'
        }
      });
    }
    
    const order = await orderService.createOrder(userId, orderData);
    
    res.status(201).json({
      success: true,
      data: {
        order: order
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 주문 목록 조회
 */
const getOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const filters = {
      status: req.query.status,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20
    };
    
    const result = await orderService.getUserOrders(userId, filters);
    
    res.status(200).json({
      success: true,
      data: {
        orders: result.items,
        pagination: result.pagination
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 주문 상세 조회
 */
const getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    const order = await orderService.getOrderById(orderId, userId);
    
    res.status(200).json({
      success: true,
      data: {
        order: order
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 주문 상태 업데이트 (관리자)
 */
const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '상태 값이 필요합니다'
        }
      });
    }
    
    const order = await orderService.updateOrderStatus(orderId, status);
    
    res.status(200).json({
      success: true,
      data: {
        order: order
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus
};

