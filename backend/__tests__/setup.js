/**
 * Jest 테스트 설정 파일
 */

// 환경 변수 설정
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'orderbean_test';

// 전역 테스트 타임아웃
jest.setTimeout(10000);

// 콘솔 에러 무시 (선택사항)
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn()
// };

