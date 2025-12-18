/**
 * OrderBean Backend API Server
 * Entry point for the backend application
 */
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// Express 앱 생성
const app = express();

// 기본 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 루트 경로 - API 상태 확인
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OrderBean Backend API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      menus: {
        list: 'GET /api/v1/menus',
        detail: 'GET /api/v1/menus/:id',
        create: 'POST /api/v1/admin/menus (관리자)'
      },
      orders: {
        create: 'POST /api/v1/orders (인증 필요)',
        list: 'GET /api/v1/orders (인증 필요)',
        detail: 'GET /api/v1/orders/:id (인증 필요)'
      },
      admin: {
        updateOrderStatus: 'PATCH /api/v1/admin/orders/:id/status (관리자)'
      }
    },
    documentation: '/api/health - 서버 상태 확인'
  });
});

// API 상태 확인
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// 라우트 등록
app.use('/api/v1', routes);

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: '요청한 리소스를 찾을 수 없습니다'
    }
  });
});

// 에러 처리 미들웨어 (마지막에 위치)
app.use(errorHandler);

// 서버 시작 (개발 환경에서만)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`OrderBean Backend API Server is running on port ${PORT}`);
  });
}

// 테스트를 위해 export
module.exports = app;
