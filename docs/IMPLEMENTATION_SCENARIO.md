# Express API 레이어 최소단위 구현 시나리오

## 📋 목표
통합 테스트 19개를 통과시키기 위한 최소한의 Express API 레이어 구현

## 🎯 구현 범위
- Express 서버 설정 및 초기화
- 메뉴 API 라우트 및 컨트롤러 (8개 테스트)
- 주문 API 라우트 및 컨트롤러 (11개 테스트)
- 기본 미들웨어 (인증, 에러 처리)

## 📝 구현 단계

### Phase 1: Express 서버 기본 설정
**파일**: `backend/src/index.js`

1. Express 앱 초기화
2. 기본 미들웨어 설정
   - `express.json()` - JSON 파싱
   - `express.urlencoded()` - URL 인코딩
3. 라우트 등록
   - `/api/v1/menus/*` → 메뉴 라우트
   - `/api/v1/orders/*` → 주문 라우트
   - `/api/v1/admin/*` → 관리자 라우트
4. 에러 처리 미들웨어
5. 서버 export (테스트용)

**의존성 추가 필요**:
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5"
}
```

### Phase 2: 메뉴 API 구현
**파일**: 
- `backend/src/routes/menuRoutes.js`
- `backend/src/controllers/menuController.js`

#### 라우트 구조
```
GET    /api/v1/menus              - 메뉴 목록 조회
GET    /api/v1/menus/:id          - 메뉴 상세 조회
POST   /api/v1/admin/menus        - 메뉴 생성 (관리자)
```

#### 컨트롤러 기능
1. `getMenus(req, res, next)` - 메뉴 목록 조회
   - 쿼리 파라미터: `category`, `search`, `page`, `limit`
   - `menuService.getMenus()` 호출
   - 응답 형식: `{ success: true, data: { menus: [], pagination: {} } }`

2. `getMenuById(req, res, next)` - 메뉴 상세 조회
   - 파라미터: `req.params.id`
   - `menuService.getMenuById()` 호출
   - 404 에러 처리

3. `createMenu(req, res, next)` - 메뉴 생성 (관리자)
   - 요청 본문: `{ name, description, price, category, is_available }`
   - `menuService.createMenu()` 호출
   - 403 에러 처리 (일반 사용자)

#### 미들웨어
- `authMiddleware` - JWT 토큰 검증 (관리자 라우트용)
- `adminMiddleware` - 관리자 권한 확인

### Phase 3: 주문 API 구현
**파일**:
- `backend/src/routes/orderRoutes.js`
- `backend/src/controllers/orderController.js`

#### 라우트 구조
```
POST   /api/v1/orders              - 주문 생성
GET    /api/v1/orders              - 주문 목록 조회
GET    /api/v1/orders/:id          - 주문 상세 조회
PATCH  /api/v1/admin/orders/:id/status - 주문 상태 업데이트 (관리자)
```

#### 컨트롤러 기능
1. `createOrder(req, res, next)` - 주문 생성
   - 인증 필수
   - 요청 본문: `{ store_id, items, payment_method, payment_info }`
   - `orderService.createOrder(userId, orderData)` 호출
   - 401 에러 처리 (인증 없음)
   - 400 에러 처리 (잘못된 데이터)
   - 404 에러 처리 (존재하지 않는 메뉴)

2. `getOrders(req, res, next)` - 주문 목록 조회
   - 인증 필수
   - 쿼리 파라미터: `status`, `page`, `limit`
   - `orderService.getUserOrders(userId, filters)` 호출

3. `getOrderById(req, res, next)` - 주문 상세 조회
   - 인증 필수
   - 파라미터: `req.params.id`
   - `orderService.getOrderById()` 호출
   - 403 에러 처리 (다른 사용자의 주문)

4. `updateOrderStatus(req, res, next)` - 주문 상태 업데이트 (관리자)
   - 관리자 권한 필수
   - 요청 본문: `{ status }`
   - `orderService.updateOrderStatus()` 호출

### Phase 4: 미들웨어 구현
**파일**: `backend/src/middleware/`

#### 1. 인증 미들웨어 (`authMiddleware.js`)
```javascript
- JWT 토큰 검증
- req.user에 사용자 정보 설정
- 토큰 없음/유효하지 않음 → 401 에러
```

#### 2. 관리자 미들웨어 (`adminMiddleware.js`)
```javascript
- req.user.role === 'admin' 확인
- 일반 사용자 → 403 에러
```

#### 3. 에러 처리 미들웨어 (`errorHandler.js`)
```javascript
- 에러 타입별 상태 코드 매핑
- 표준 에러 응답 형식: { success: false, error: { code, message } }
```

#### 4. 요청 검증 미들웨어 (선택사항, 최소단위에서는 컨트롤러에서 처리)

### Phase 5: 라우트 통합
**파일**: `backend/src/routes/index.js`

```javascript
- 모든 라우트 통합
- /api/v1/menus → menuRoutes
- /api/v1/orders → orderRoutes
- /api/v1/admin → adminRoutes
```

## 🔧 기술 스택
- **Express**: 4.18.2
- **jsonwebtoken**: 9.0.2 (이미 설치됨)
- **cors**: 2.8.5 (추가 필요)

## 📊 테스트 통과 목표
- ✅ 메뉴 API 테스트 8개 통과
- ✅ 주문 API 테스트 11개 통과
- ✅ 총 19개 통합 테스트 통과

## ⚠️ 최소단위 구현 원칙
1. **테스트 통과에 필요한 최소한의 코드만 작성**
2. **기존 서비스 레이어 재사용** (menuService, orderService)
3. **에러 처리는 기본적인 것만** (상세한 검증은 추후)
4. **인증은 JWT 기본 검증만** (토큰 검증, 사용자 정보 추출)
5. **데이터베이스 연동은 제외** (현재 메모리 기반 서비스 사용)

## 📁 파일 구조
```
backend/src/
├── index.js                    # Express 서버 설정
├── routes/
│   ├── index.js               # 라우트 통합
│   ├── menuRoutes.js         # 메뉴 라우트
│   └── orderRoutes.js         # 주문 라우트
├── controllers/
│   ├── menuController.js     # 메뉴 컨트롤러
│   └── orderController.js     # 주문 컨트롤러
└── middleware/
    ├── authMiddleware.js      # 인증 미들웨어
    ├── adminMiddleware.js     # 관리자 미들웨어
    └── errorHandler.js        # 에러 처리 미들웨어
```

## 🚀 실행 순서
1. Express 및 CORS 패키지 설치
2. Express 서버 기본 설정 (index.js)
3. 미들웨어 구현 (인증, 에러 처리)
4. 메뉴 컨트롤러 및 라우트 구현
5. 주문 컨트롤러 및 라우트 구현
6. 통합 테스트 실행 및 검증

## ✅ 검증 방법
```bash
cd backend
npm test -- __tests__/integration/api/menus.test.js
npm test -- __tests__/integration/api/orders.test.js
```

---

**예상 소요 시간**: 2-3시간  
**우선순위**: 최우선 (통합 테스트 통과를 위해 필수)

