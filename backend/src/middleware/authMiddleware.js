/**
 * 인증 미들웨어
 * JWT 토큰 검증 및 사용자 정보 추출
 */
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '인증 토큰이 필요합니다'
        }
      });
    }
    
    const token = authHeader.substring(7); // 'Bearer ' 제거
    const jwtSecret = process.env.JWT_SECRET || 'test_secret';
    
    // 토큰 검증
    const decoded = jwt.verify(token, jwtSecret);
    
    // 사용자 정보를 req.user에 설정
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role || 'user'
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: '유효하지 않은 토큰입니다'
        }
      });
    }
    
    next(error);
  }
};

module.exports = authMiddleware;

