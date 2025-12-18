/**
 * 메뉴 컨트롤러
 * 메뉴 관련 HTTP 요청 처리
 */
const menuService = require('../services/menuService');

/**
 * 메뉴 목록 조회
 */
const getMenus = async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      search: req.query.search,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 20
    };
    
    const result = await menuService.getMenus(filters);
    
    res.status(200).json({
      success: true,
      data: {
        menus: result.menus,
        pagination: result.pagination
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 메뉴 상세 조회
 */
const getMenuById = async (req, res, next) => {
  try {
    const menuId = req.params.id;
    const menu = await menuService.getMenuById(menuId);
    
    res.status(200).json({
      success: true,
      data: {
        menu: menu
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 메뉴 생성 (관리자)
 */
const createMenu = async (req, res, next) => {
  try {
    const menuData = req.body;
    const menu = await menuService.createMenu(menuData);
    
    res.status(201).json({
      success: true,
      data: {
        menu: menu
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenus,
  getMenuById,
  createMenu
};

