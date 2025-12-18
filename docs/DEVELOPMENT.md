# OrderBean 개발 가이드

이 문서는 OrderBean 프로젝트의 개발 가이드입니다.

## 목차

- [개발 환경 설정](#개발-환경-설정)
- [코딩 컨벤션](#코딩-컨벤션)
- [프로젝트 구조](#프로젝트-구조)
- [개발 워크플로우](#개발-워크플로우)
- [주요 기능 구현 가이드](#주요-기능-구현-가이드)
- [디버깅](#디버깅)
- [성능 최적화](#성능-최적화)

## 개발 환경 설정

### 필수 도구

1. **Node.js**: v18.0.0 이상 (권장: v20.x LTS)
2. **npm**: v9.0.0 이상
3. **Git**: 최신 버전
4. **코드 에디터**: VS Code (권장)

### VS Code 확장 프로그램 (권장)

- ESLint
- Prettier
- GitLens
- REST Client (API 테스트용)

### 개발 환경 변수

`.env.development` 파일 생성:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orderbean_dev
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=development_secret_key_change_in_production
```

## 코딩 컨벤션

### JavaScript/TypeScript

#### 네이밍 규칙

- **변수/함수**: camelCase
  ```javascript
  const userName = '홍길동';
  function getUserOrders() {}
  ```

- **상수**: UPPER_SNAKE_CASE
  ```javascript
  const MAX_ORDER_ITEMS = 10;
  const API_BASE_URL = 'https://api.orderbean.com';
  ```

- **클래스/컴포넌트**: PascalCase
  ```javascript
  class OrderController {}
  function MenuCard() {}
  ```

- **파일명**: kebab-case
  ```
  order-controller.js
  menu-card.jsx
  ```

#### 코드 스타일

- **들여쓰기**: 2 spaces
- **세미콜론**: 사용
- **따옴표**: 작은따옴표 (single quotes)
- **최대 줄 길이**: 100자

#### 예시

```javascript
// 좋은 예
function calculateTotalPrice(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

// 나쁜 예
function calc(items){return items.reduce((s,i)=>s+i.price*i.qty,0)}
```

### 주석 작성

```javascript
/**
 * 주문 총액을 계산합니다.
 * @param {Array<OrderItem>} items - 주문 항목 배열
 * @returns {number} 총 주문 금액
 */
function calculateTotalPrice(items) {
  // ...
}
```

### Git 커밋 메시지

**형식**: `<type>: <subject>`

**타입**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 설정 등

**예시**:
```
feat: 주문 생성 API 엔드포인트 추가
fix: 메뉴 검색 시 대소문자 구분 문제 해결
docs: API 문서 업데이트
```

## 프로젝트 구조

### 프론트엔드 구조

```
frontend/
├── src/
│   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Modal/
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── MenuPage/
│   │   ├── OrderPage/
│   │   └── RecipePage/
│   ├── services/        # API 서비스
│   │   ├── api.js
│   │   ├── menuService.js
│   │   └── orderService.js
│   ├── utils/           # 유틸리티
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── hooks/           # 커스텀 훅 (React)
│   ├── store/           # 상태 관리
│   └── index.js
└── package.json
```

### 백엔드 구조

```
backend/
├── src/
│   ├── controllers/     # 요청 핸들러
│   │   ├── menuController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── models/          # 데이터 모델
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Menu.js
│   ├── routes/          # 라우트 정의
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   └── index.js
│   ├── services/        # 비즈니스 로직
│   │   ├── menuService.js
│   │   ├── orderService.js
│   │   └── paymentService.js
│   ├── middleware/       # 미들웨어
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── utils/           # 유틸리티
│   │   ├── logger.js
│   │   └── helpers.js
│   └── index.js         # 진입점
└── package.json
```

## 개발 워크플로우

### 1. 브랜치 전략

- **main**: 프로덕션 배포 브랜치
- **develop**: 개발 브랜치
- **feature/**: 기능 개발 브랜치
- **fix/**: 버그 수정 브랜치

### 2. 개발 프로세스

```bash
# 1. 최신 코드 가져오기
git checkout develop
git pull origin develop

# 2. 기능 브랜치 생성
git checkout -b feature/add-menu-search

# 3. 개발 및 테스트
# ... 코드 작성 ...

# 4. 커밋
git add .
git commit -m "feat: 메뉴 검색 기능 추가"

# 5. 푸시
git push origin feature/add-menu-search

# 6. Pull Request 생성
```

### 3. 코드 리뷰

- 모든 PR은 최소 1명의 리뷰어 승인 필요
- 자동화된 테스트 통과 필수
- 코드 스타일 검사 통과 필수

## 주요 기능 구현 가이드

### 1. 메뉴 조회 및 검색

**백엔드 구현**:

```javascript
// controllers/menuController.js
async function getMenus(req, res) {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;
    
    const menus = await menuService.getMenus({
      category,
      search,
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    res.json({
      success: true,
      data: menus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
}
```

**프론트엔드 구현**:

```javascript
// services/menuService.js
export async function getMenus(params) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/v1/menus?${queryString}`);
  return response.json();
}
```

### 2. 주문 생성

**주문 생성 플로우**:

1. 사용자가 메뉴 선택 및 커스터마이징
2. 장바구니에 추가
3. 결제 정보 입력
4. 주문 생성 API 호출
5. 주문 상태 실시간 업데이트

**구현 예시**:

```javascript
// services/orderService.js
export async function createOrder(orderData) {
  const response = await fetch('/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(orderData)
  });
  
  if (!response.ok) {
    throw new Error('주문 생성 실패');
  }
  
  return response.json();
}
```

### 3. 실시간 주문 상태 업데이트

**WebSocket 또는 Server-Sent Events 사용**:

```javascript
// 프론트엔드
const eventSource = new EventSource(`/api/v1/orders/${orderId}/stream`);

eventSource.onmessage = (event) => {
  const order = JSON.parse(event.data);
  updateOrderStatus(order);
};
```

### 4. 나만의 레시피 저장

**구현 예시**:

```javascript
// services/recipeService.js
export async function saveRecipe(recipeData) {
  const response = await fetch('/api/v1/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(recipeData)
  });
  
  return response.json();
}
```

## 디버깅

### 백엔드 디버깅

1. **로깅 활용**
```javascript
const logger = require('./utils/logger');

logger.info('주문 생성 요청', { userId, orderData });
logger.error('주문 생성 실패', { error: error.message });
```

2. **VS Code 디버깅 설정**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "runtimeExecutable": "node",
  "runtimeArgs": ["--inspect"],
  "program": "${workspaceFolder}/backend/src/index.js"
}
```

### 프론트엔드 디버깅

1. **React DevTools** 사용
2. **브라우저 개발자 도구** 활용
3. **콘솔 로깅**
```javascript
console.log('주문 데이터:', orderData);
console.error('에러 발생:', error);
```

## 성능 최적화

### 백엔드 최적화

1. **데이터베이스 쿼리 최적화**
   - 인덱스 활용
   - N+1 쿼리 문제 해결
   - 페이지네이션 구현

2. **캐싱**
```javascript
const redis = require('redis');
const client = redis.createClient();

async function getCachedMenus() {
  const cached = await client.get('menus');
  if (cached) return JSON.parse(cached);
  
  const menus = await menuService.getAll();
  await client.setex('menus', 3600, JSON.stringify(menus));
  return menus;
}
```

3. **응답 압축**
```javascript
const compression = require('compression');
app.use(compression());
```

### 프론트엔드 최적화

1. **코드 스플리팅**
```javascript
const MenuPage = lazy(() => import('./pages/MenuPage'));
```

2. **이미지 최적화**
   - WebP 형식 사용
   - Lazy loading

3. **API 요청 최적화**
   - Debounce/Throttle 적용
   - 요청 캐싱

## 테스트

### 단위 테스트

```javascript
// __tests__/orderService.test.js
describe('OrderService', () => {
  test('주문 총액 계산', () => {
    const items = [
      { price: 5000, quantity: 2 },
      { price: 3000, quantity: 1 }
    ];
    expect(calculateTotalPrice(items)).toBe(13000);
  });
});
```

### 통합 테스트

```javascript
describe('POST /api/v1/orders', () => {
  test('주문 생성 성공', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderData);
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});
```

## 참고 자료

- [API 문서](./API.md)
- [데이터베이스 문서](./DATABASE.md)
- [테스트 가이드](./TESTING.md)
- [프로젝트 구조 문서](../PROJECT_STRUCTURE.md)

---

**개발 관련 문의사항은 GitHub Issues에 등록해주세요.**

