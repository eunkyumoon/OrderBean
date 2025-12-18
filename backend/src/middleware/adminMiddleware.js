/**
 * 관리자 권한 미들웨어
 * 관리자 권한 확인
 */
const adminMiddleware = (req, res, next) => {
  // authMiddleware 이후에 실행되어야 함
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: '인증이 필요합니다'
      }
    });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: '관리자 권한이 필요합니다'
      }
    });
  }
  
  next();
};

module.exports = adminMiddleware;

