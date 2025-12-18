/**
 * 에러 처리 미들웨어
 * 에러 타입별 상태 코드 매핑 및 표준 에러 응답
 */
const errorHandler = (err, req, res, next) => {
  // 기본 에러 정보
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let message = err.message || '서버 오류가 발생했습니다';
  
  // 에러 타입별 처리
  if (err.message === '메뉴를 찾을 수 없습니다') {
    statusCode = 404;
    errorCode = 'NOT_FOUND';
  } else if (err.message === '주문을 찾을 수 없습니다') {
    statusCode = 404;
    errorCode = 'NOT_FOUND';
  } else if (err.message === '주문을 조회할 권한이 없습니다' || 
             err.message.includes('권한이 없습니다')) {
    statusCode = 403;
    errorCode = 'FORBIDDEN';
  } else if (err.message === '필수 필드가 누락되었습니다') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
  } else if (err.message === '가격은 0보다 커야 합니다') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
  } else if (err.message === '판매 중지된 메뉴입니다') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
  } else if (err.message === '결제 처리에 실패했습니다') {
    statusCode = 400;
    errorCode = 'PAYMENT_ERROR';
  } else if (err.message && err.message.includes('주문 항목')) {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
  }
  
  // 개발 환경에서는 스택 트레이스 포함
  const response = {
    success: false,
    error: {
      code: errorCode,
      message: message
    }
  };
  
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }
  
  res.status(statusCode).json(response);
};

module.exports = errorHandler;

