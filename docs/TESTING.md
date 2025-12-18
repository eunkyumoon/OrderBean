# OrderBean 테스트 계획서 및 가이드

이 문서는 OrderBean 프로젝트의 테스트 전략과 가이드를 설명합니다.

## 목차

- [테스트 개요](#테스트-개요)
- [테스트 전략](#테스트-전략)
- [테스트 종류](#테스트-종류)
- [테스트 도구](#테스트-도구)
- [테스트 작성 가이드](#테스트-작성-가이드)
- [테스트 실행](#테스트-실행)
- [테스트 커버리지](#테스트-커버리지)
- [CI/CD 통합](#cicd-통합)

## 테스트 개요

### 테스트 목표

1. **기능 정확성**: 모든 기능이 요구사항대로 동작하는지 확인
2. **안정성**: 예외 상황에서도 안정적으로 동작하는지 확인
3. **성능**: 요구사항에 명시된 성능 기준을 만족하는지 확인
4. **보안**: 보안 취약점이 없는지 확인

### 테스트 원칙

- **자동화**: 가능한 모든 테스트를 자동화
- **빠른 피드백**: 개발 중 빠른 피드백 제공
- **독립성**: 각 테스트는 독립적으로 실행 가능
- **재현 가능**: 동일한 조건에서 항상 동일한 결과

## 테스트 전략

### 테스트 피라미드

```
        /\
       /  \      E2E Tests (소수)
      /____\
     /      \    Integration Tests (중간)
    /________\
   /          \  Unit Tests (다수)
  /____________\
```

### 테스트 비율

- **단위 테스트**: 70%
- **통합 테스트**: 20%
- **E2E 테스트**: 10%

## 테스트 종류

### 1. 단위 테스트 (Unit Tests)

개별 함수나 컴포넌트를 독립적으로 테스트합니다.

#### 백엔드 단위 테스트

**예시**: 주문 총액 계산 함수

```javascript
// __tests__/utils/orderUtils.test.js
const { calculateTotalPrice } = require('../../src/utils/orderUtils');

describe('calculateTotalPrice', () => {
  test('정상적인 주문 항목의 총액 계산', () => {
    const items = [
      { price: 5000, quantity: 2 },
      { price: 3000, quantity: 1 }
    ];
    
    expect(calculateTotalPrice(items)).toBe(13000);
  });
  
  test('빈 배열일 때 0 반환', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });
  
  test('수량이 0인 항목 처리', () => {
    const items = [
      { price: 5000, quantity: 0 }
    ];
    expect(calculateTotalPrice(items)).toBe(0);
  });
});
```

#### 프론트엔드 단위 테스트

**예시**: 컴포넌트 테스트

```javascript
// __tests__/components/MenuCard.test.jsx
import { render, screen } from '@testing-library/react';
import MenuCard from '../../src/components/MenuCard';

describe('MenuCard', () => {
  test('메뉴 정보 표시', () => {
    const menu = {
      id: 1,
      name: '카페 라떼',
      price: 4500,
      description: '부드러운 우유와 에스프레소'
    };
    
    render(<MenuCard menu={menu} />);
    
    expect(screen.getByText('카페 라떼')).toBeInTheDocument();
    expect(screen.getByText('4,500원')).toBeInTheDocument();
  });
});
```

### 2. 통합 테스트 (Integration Tests)

여러 컴포넌트나 모듈이 함께 동작하는지 테스트합니다.

#### API 통합 테스트

```javascript
// __tests__/integration/order.test.js
const request = require('supertest');
const app = require('../../src/index');
const { createTestUser, getAuthToken } = require('../helpers');

describe('Order API Integration', () => {
  let authToken;
  let userId;
  
  beforeAll(async () => {
    const user = await createTestUser();
    userId = user.id;
    authToken = await getAuthToken(user);
  });
  
  test('주문 생성 및 조회', async () => {
    // 주문 생성
    const orderData = {
      store_id: 1,
      items: [
        {
          menu_id: 1,
          quantity: 2,
          customizations: {
            shots: 2,
            milk: '오트밀크'
          }
        }
      ],
      payment_method: 'card'
    };
    
    const createResponse = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send(orderData)
      .expect(201);
    
    const orderId = createResponse.body.data.order.id;
    
    // 주문 조회
    const getResponse = await request(app)
      .get(`/api/v1/orders/${orderId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    
    expect(getResponse.body.data.order.id).toBe(orderId);
    expect(getResponse.body.data.order.status).toBe('접수');
  });
});
```

### 3. E2E 테스트 (End-to-End Tests)

전체 사용자 시나리오를 테스트합니다.

```javascript
// __tests__/e2e/order-flow.test.js
const { test, expect } = require('@playwright/test');

test('주문 생성 플로우', async ({ page }) => {
  // 1. 로그인
  await page.goto('http://localhost:5173/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');
  
  // 2. 메뉴 선택
  await page.goto('http://localhost:5173/menu');
  await page.click('[data-testid="menu-card-1"]');
  
  // 3. 커스터마이징
  await page.selectOption('#milk-type', '오트밀크');
  await page.fill('#shots', '2');
  await page.click('button:has-text("장바구니에 추가")');
  
  // 4. 주문하기
  await page.click('button:has-text("주문하기")');
  await page.fill('#card-number', '1234567890123456');
  await page.click('button:has-text("결제하기")');
  
  // 5. 주문 확인
  await expect(page.locator('.order-success')).toBeVisible();
  await expect(page.locator('text=주문이 접수되었습니다')).toBeVisible();
});
```

### 4. 성능 테스트

#### API 응답 시간 테스트

```javascript
// __tests__/performance/api-performance.test.js
const request = require('supertest');
const app = require('../../src/index');

describe('API Performance', () => {
  test('주문 생성 응답 시간이 2초 이내', async () => {
    const startTime = Date.now();
    
    await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderData);
    
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(2000);
  });
});
```

### 5. 보안 테스트

```javascript
// __tests__/security/auth.test.js
describe('Authentication Security', () => {
  test('비밀번호는 해시되어 저장되어야 함', async () => {
    const user = await createUser({
      email: 'test@example.com',
      password: 'plainPassword'
    });
    
    expect(user.password).not.toBe('plainPassword');
    expect(user.password.length).toBeGreaterThan(50); // 해시 길이
  });
  
  test('SQL Injection 방어', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: maliciousInput,
        password: 'password'
      });
    
    // 테이블이 삭제되지 않았는지 확인
    const users = await db.query('SELECT * FROM users');
    expect(users.length).toBeGreaterThan(0);
  });
});
```

## 테스트 도구

### 백엔드

- **Jest**: 테스트 프레임워크
- **Supertest**: HTTP 통합 테스트
- **Sinon**: 모킹 및 스파이

### 프론트엔드

- **Jest**: 테스트 프레임워크
- **React Testing Library**: React 컴포넌트 테스트
- **Playwright**: E2E 테스트

### 설치

```bash
# 백엔드
cd backend
npm install --save-dev jest supertest

# 프론트엔드
cd frontend
npm install --save-dev jest @testing-library/react @playwright/test
```

## 테스트 작성 가이드

### 테스트 구조

```javascript
describe('기능 설명', () => {
  // Setup
  beforeAll(() => {
    // 모든 테스트 전 실행
  });
  
  beforeEach(() => {
    // 각 테스트 전 실행
  });
  
  // Tests
  test('특정 시나리오 설명', () => {
    // Arrange (준비)
    const input = 'test';
    
    // Act (실행)
    const result = functionToTest(input);
    
    // Assert (검증)
    expect(result).toBe('expected');
  });
  
  // Teardown
  afterEach(() => {
    // 각 테스트 후 실행
  });
  
  afterAll(() => {
    // 모든 테스트 후 실행
  });
});
```

### 테스트 네이밍

- **형식**: `should [expected behavior] when [condition]`
- **예시**: 
  - `should return total price when items are provided`
  - `should throw error when invalid input is given`

### 모킹 (Mocking)

```javascript
// 서비스 모킹
jest.mock('../services/menuService', () => ({
  getMenuById: jest.fn(() => Promise.resolve({
    id: 1,
    name: '카페 라떼',
    price: 4500
  }))
}));

// 데이터베이스 모킹
const mockDb = {
  query: jest.fn()
};
```

## 테스트 실행

### 전체 테스트 실행

```bash
# 루트에서
npm test

# 백엔드만
cd backend
npm test

# 프론트엔드만
cd frontend
npm test
```

### 특정 테스트 실행

```bash
# 특정 파일
npm test order.test.js

# 특정 패턴
npm test -- --testNamePattern="주문 생성"

# Watch 모드
npm test -- --watch
```

### E2E 테스트 실행

```bash
# Playwright
npx playwright test

# 특정 브라우저
npx playwright test --project=chromium
```

## 테스트 커버리지

### 커버리지 목표

- **전체 커버리지**: 80% 이상
- **핵심 비즈니스 로직**: 90% 이상
- **유틸리티 함수**: 100%

### 커버리지 확인

```bash
# 커버리지 리포트 생성
npm test -- --coverage

# HTML 리포트 확인
open coverage/lcov-report/index.html
```

### 커버리지 설정

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## CI/CD 통합

### GitHub Actions 예시

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Generate coverage
        run: npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## 테스트 체크리스트

### 기능별 테스트

#### 주문 기능
- [ ] 주문 생성 성공
- [ ] 주문 생성 실패 (잘못된 데이터)
- [ ] 주문 조회 성공
- [ ] 주문 상태 업데이트
- [ ] 주문 취소

#### 메뉴 기능
- [ ] 메뉴 목록 조회
- [ ] 메뉴 검색
- [ ] 메뉴 필터링 (카테고리)
- [ ] 메뉴 상세 조회

#### 레시피 기능
- [ ] 레시피 저장
- [ ] 레시피 목록 조회
- [ ] 레시피로 재주문
- [ ] 레시피 삭제

#### 인증 기능
- [ ] 회원가입
- [ ] 로그인
- [ ] 로그아웃
- [ ] 토큰 갱신
- [ ] 인증 실패 처리

## 참고 자료

- [Jest 공식 문서](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright 문서](https://playwright.dev/)
- [API 문서](./API.md)
- [개발 가이드](./DEVELOPMENT.md)

---

**테스트 관련 문의사항은 GitHub Issues에 등록해주세요.**

