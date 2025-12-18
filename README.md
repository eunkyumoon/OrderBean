# OrderBean (오더빈) 📱☕

> 바쁜 직장인들을 위한 간편 모바일 선주문 웹 서비스

[![Version](https://img.shields.io/badge/version-v1.0-blue.svg)](https://github.com/yourusername/OrderBean)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Test Coverage](https://img.shields.io/badge/coverage-97.51%25-brightgreen.svg)](docs/TEST_COVERAGE.md)

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [주요 기능 상세](#주요-기능-상세)
- [비기능적 요구사항](#비기능적-요구사항)
- [기여하기](#기여하기)
- [라이선스](#라이선스)

## 프로젝트 소개

**OrderBean**은 바쁜 직장인들이 카페 대기 없이 빠르게 커피를 주문하고 픽업하여 시간을 절약할 수 있도록 돕는 간편 모바일 선주문 웹 서비스입니다.

### 🎯 서비스 목표

- 카페 대기 시간 낭비 해소
- 복잡한 커스터마이징 주문의 어려움 해결
- 주문 히스토리 관리의 편의성 제공
- 주문 시간 3분 이상 단축

### 👥 대상 사용자

- 바쁜 직장인
- 단골 고객
- 정교한 커스터마이징을 원하는 사용자

## 주요 기능

### 1. 신속한 주문 및 결제 (Quick Ordering & Payment)

- **커피 메뉴 조회 및 검색**: 카테고리별 탐색 및 키워드 검색
- **주문 생성 및 정교한 옵션 선택**: 샷, 시럽 펌프 횟수, 우유 종류 등 모든 커스터마이징 옵션 설정
- **모바일 선결제 및 수단 관리**: 등록된 카드/간편 페이로 대기 없이 선결제
- **매장 선택 및 픽업 알림**: 매장 선택 후, 주문 상태가 '제조 완료' 시 푸시 알림

### 2. 개인화 및 재주문 (Personalization & Reorder)

- **주문 내역 조회**: 과거 주문 이력 및 옵션 정보 상세 확인
- **나만의 레시피 저장**: 커스터마이징된 메뉴를 '나만의 레시피'로 저장하여 이름 지정
- **원클릭 재주문**: 저장된 레시피 또는 과거 이력을 선택하여 단 한 번의 터치로 재주문

### 3. 관리자 운영 및 지원 (Admin Operations & Support)

- **메뉴 관리 (CRUD)**: 메뉴의 가격, 옵션, 상세 설명 등록, 수정, 삭제
- **실시간 주문 상태 관리**: 주문 상태를 '접수' → '제조 중' → '픽업 완료'로 변경
- **매출 및 통계 데이터 조회**: 일별/월별 매출, 주문 건수, 인기 메뉴 등 핵심 운영 데이터 조회

## 기술 스택

> ⚠️ **참고**: 기술 스택은 프로젝트 구현 시 결정됩니다.

### Frontend
- (추후 결정)

### Backend
- (추후 결정)

### Database
- (추후 결정)

### Infrastructure
- (추후 결정)

## 시작하기

### 사전 요구사항

- Node.js (버전 추후 결정)
- 데이터베이스 (추후 결정)
- 기타 의존성 (추후 결정)

### 설치 방법

```bash
# 저장소 클론
git clone https://github.com/yourusername/OrderBean.git

# 프로젝트 디렉토리로 이동
cd OrderBean

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 데이터베이스 마이그레이션
npm run migrate

# 개발 서버 실행
npm run dev
```

### 환경 변수 설정

`.env` 파일에 다음 변수들을 설정하세요:

```env
# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orderbean
DB_USER=your_username
DB_PASSWORD=your_password

# JWT 시크릿
JWT_SECRET=your_jwt_secret

# 기타 설정
# ...
```

## 프로젝트 구조

```
OrderBean/
├── frontend/          # 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/           # 백엔드 API 서버
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│   └── package.json
├── database/          # 데이터베이스 스키마 및 마이그레이션
│   └── migrations/
├── docs/              # 문서
│   └── PRD.md
└── README.md
```

## 주요 기능 상세

### 커스터마이징 주문

**시나리오**: 고객이 원하는 대로 옵션을 변경하여 주문한다.

```
Given 고객이 '카페 라떼' 상세 페이지에 접속하고
When 우유 종류를 '오트밀크'로, 샷을 '1개 추가'로 선택한 후
Then 장바구니에 '오트밀크 라떼 (샷 추가)'가 정확한 가격으로 추가된다.
```

### 재주문

**시나리오**: 단골 고객이 저장된 레시피로 빠르게 재주문한다.

```
Given 고객이 '힘찬 아침 레시피'를 저장했으며 '나만의 레시피' 페이지에 있을 때
When 고객이 해당 레시피를 선택하고 '재주문' 버튼을 클릭하면
Then 해당 레시피가 옵션 변경 없이 장바구니에 추가되고 바로 결제 페이지로 이동한다.
```

### 주문 상태 관리

**시나리오**: 직원이 주문을 처리하고 고객에게 상태를 업데이트한다.

```
Given 관리자 시스템에 '주문 번호 101'이 '접수 대기' 상태로 표시되고
When 매장 직원이 101번 주문 제조를 시작하며 '제조 중' 버튼을 클릭하면
Then 관리자 시스템과 고객 앱에서 주문 상태가 '제조 중'으로 실시간 업데이트된다.
```

## 비기능적 요구사항

> 📖 **상세 내용**: [비기능적 요구사항 문서](docs/NON_FUNCTIONAL_REQUIREMENTS.md) 참조

### 성능 기대치 (Toy Project 기준)

- ✅ 메뉴 조회: **500ms 이내**
- ✅ 주문 생성: **1초 이내**
- ✅ 동시 사용자: **최소 10명** 처리 가능
- ✅ 시스템 가용성: **95% 이상** (개발 환경 기준)

### 보안 요구사항

- ✅ JWT 기반 인증
- ✅ 비밀번호: **bcrypt 해싱** (salt rounds: 10)
- ✅ SQL Injection 방어: **ORM/파라미터화된 쿼리**
- ✅ HTTPS: 프로덕션 환경에서만 필수 (개발 환경 HTTP 허용)
- ✅ Rate Limiting: 분당 100회 (인증), 20회 (비인증)

### 확장성 고려사항

- ✅ 모듈화된 서비스 레이어 구조
- ✅ RESTful API 표준 준수
- ✅ 다중 매장 지원 구조 설계
- ✅ 인덱싱 및 페이지네이션 적용

### 사용성 표준

- ✅ 모바일 반응형 디자인 적용
- ✅ 주문 프로세스: **3단계 이내 완료**
  1. 메뉴 선택
  2. 옵션 커스터마이징
  3. 결제
- ✅ 브라우저 지원: Chrome, Firefox, Safari 최신 2개 버전
- ✅ 명확한 에러 메시지 제공

## 기여하기

프로젝트에 기여하고 싶으시다면 다음 단계를 따르세요:

1. 이 저장소를 Fork 합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 연락처

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.

---

**OrderBean** - 빠르고 간편한 커피 주문의 시작 ✨

## To-Do List

### 🔴 RED 단계 (테스트 작성 및 실행 - 실패 확인)
- [x] 단위 테스트 작성 (50개 완료)
- [x] 통합 테스트 작성 (19개 작성 완료, API 미구현으로 대기)
- [ ] E2E 테스트 작성

### 🟢 GREEN 단계 (최소한의 코드 작성 - 테스트 통과)

#### 우선순위 1: Express API 레이어 구현
- [x] Express 서버 설정 및 초기화
- [x] 라우트 설정
  - [ ] 인증 라우트 (`/api/v1/auth/*`) - 추후 구현
  - [x] 메뉴 라우트 (`/api/v1/menus/*`)
  - [x] 주문 라우트 (`/api/v1/orders/*`)
  - [ ] 레시피 라우트 (`/api/v1/recipes/*`) - 추후 구현
  - [x] 관리자 라우트 (`/api/v1/admin/*`)
- [x] 컨트롤러 구현
  - [ ] AuthController (회원가입, 로그인, 로그아웃) - 추후 구현
  - [x] MenuController (메뉴 CRUD)
  - [x] OrderController (주문 생성, 조회, 취소)
  - [ ] RecipeController (레시피 CRUD, 재주문) - 추후 구현
  - [x] AdminController (주문 상태 관리)
- [x] 미들웨어 구현
  - [x] JWT 인증 미들웨어
  - [x] 에러 처리 미들웨어
  - [x] 관리자 권한 미들웨어
  - [ ] 요청 검증 미들웨어 - 추후 구현
  - [ ] Rate Limiting 미들웨어 - 추후 구현
- [x] 통합 테스트 통과 (19개 통과 ✅)
  - [x] 메뉴 API 테스트 통과 (8개)
  - [x] 주문 API 테스트 통과 (11개)

#### 우선순위 2: 데이터베이스 연동
- [ ] ORM 설정 (Sequelize/TypeORM 등)
- [ ] 마이그레이션 구현
  - [ ] Users 테이블
  - [ ] Stores 테이블
  - [ ] Menus 테이블
  - [ ] Orders 테이블
  - [ ] OrderItems 테이블
  - [ ] Recipes 테이블
  - [ ] 인덱스 생성
- [ ] 서비스 레이어 DB 연동
  - [ ] menuService DB 연동
  - [ ] orderService DB 연동
  - [ ] recipeService DB 연동
  - [ ] paymentService DB 연동

#### 우선순위 3: 프론트엔드 구현
- [ ] 프론트엔드 프레임워크 설정 (React/Vue 등)
- [ ] 컴포넌트 구현
  - [ ] 메뉴 조회/검색 컴포넌트
  - [ ] 주문 생성 컴포넌트 (커스터마이징 옵션 UI)
  - [ ] 주문 내역 조회 컴포넌트
  - [ ] 레시피 관리 컴포넌트
  - [ ] 관리자 대시보드 컴포넌트
- [ ] API 연동
  - [ ] 인증 API 연동
  - [ ] 메뉴 API 연동
  - [ ] 주문 API 연동
  - [ ] 레시피 API 연동
- [ ] 모바일 반응형 디자인 적용

#### 테스트 커버리지 개선
- [ ] paymentService.js 테스트 추가
  - [ ] `refundPayment` 함수 테스트 (현재 미커버, 목표: 90% 이상)
- [ ] orderService.js 브랜치 커버리지 개선
  - [ ] 에지 케이스 테스트 추가 (목표: Branches 85% 이상)
- [ ] 전체 커버리지 98% 이상 유지

### 🔵 REFACTOR 단계 (코드 개선)

> 📖 **상세 분석**: [프런트엔드 리팩토링 분석 문서](docs/FRONTEND_REFACTORING_ANALYSIS.md) 참조

#### 🔴 높은 우선순위 (즉시 개선)
- [x] **상수 파일 생성 및 매직 넘버/문자열 제거**
  - [x] `frontend/src/constants/index.js` 생성
  - [x] 커스터마이제이션 가격 상수 정의 (`EXTRA_SHOT: 500`, `EXTRA_SYRUP: 0`)
  - [x] 주문 상태 상수 정의 (`PENDING`, `RECEIVED`, `MAKING`, `COMPLETED`)
  - [x] 라우트 경로 상수 정의
  - [x] `MenuCard.jsx`, `MenuList.jsx`, `AdminDashboard.jsx`, `Header.jsx`에서 하드코딩된 값 제거
- [x] **비즈니스 로직 유틸리티 함수로 분리**
  - [x] `frontend/src/utils/priceUtils.js` 생성 - 가격 계산 로직 분리
  - [x] `frontend/src/utils/customizationUtils.js` 생성 - 커스터마이제이션 포맷팅 로직 분리
  - [x] `frontend/src/utils/idUtils.js` 생성 - ID 생성 로직 개선
  - [x] `MenuList.jsx`에서 가격 계산 로직 제거
  - [x] `MenuCard.jsx`에서 하드코딩된 가격 제거
- [x] **에러 처리 개선 (innerHTML 제거)**
  - [x] `frontend/src/components/ErrorDisplay.jsx` 생성
  - [x] `index.jsx`에서 `innerHTML` 직접 조작 제거
  - [x] React 패턴을 따르는 에러 표시 컴포넌트 사용
  - [x] XSS 취약점 제거
- [x] **가격 계산 로직 중앙화**
  - [x] 모든 가격 계산을 `priceUtils.js`로 통합
  - [x] 컴포넌트에서 직접 가격 계산하는 코드 제거

#### 🟡 중간 우선순위 (단기 개선)
- [ ] **인라인 스타일을 CSS 클래스로 변경**
  - [ ] `App.jsx` 인라인 스타일 제거
  - [ ] `MenuList.jsx` 인라인 스타일 제거
  - [ ] `ErrorBoundary.jsx` 인라인 스타일 제거
  - [ ] `TestPage.jsx` 인라인 스타일 제거
  - [ ] `index.jsx` 인라인 스타일 제거
  - [ ] 모든 스타일을 `App.css`로 이동
- [ ] **중복 JSX 구조 리팩토링**
  - [ ] `Cart.jsx`에서 빈 장바구니와 채워진 장바구니의 중복 구조 제거
  - [ ] 공통 구조를 재사용 가능한 컴포넌트로 분리
- [ ] **커스터마이제이션 로직 유틸리티화**
  - [ ] `Cart.jsx`의 커스터마이제이션 텍스트 생성 로직을 `customizationUtils.js`로 이동
  - [ ] 컴포넌트에서 비즈니스 로직 제거
- [ ] **Console.log 제거 또는 조건부 로깅**
  - [ ] 프로덕션 코드에서 디버깅용 `console.log` 제거
  - [ ] 로깅 라이브러리 도입 검토 (예: `winston`, `pino`)
  - [ ] 개발 환경에서만 로깅하도록 조건부 처리
  - [ ] `App.jsx`, `MenuList.jsx`, `index.jsx` 정리
- [ ] **객체 비교 로직 개선**
  - [ ] `MenuList.jsx`에서 `JSON.stringify` 기반 객체 비교 제거
  - [ ] 효율적인 커스터마이제이션 비교 함수 구현
  - [ ] 깊은 객체 비교 유틸리티 함수 생성

#### 🟢 낮은 우선순위 (장기 개선)
- [ ] **커스텀 훅 분리**
  - [ ] `frontend/src/hooks/useCart.js` 생성 - 장바구니 로직 분리
  - [ ] `frontend/src/hooks/useMenus.js` 생성 - 메뉴 로딩 로직 분리
  - [ ] 컴포넌트에서 상태 관리 로직 제거
- [ ] **ID 생성 방식 개선**
  - [ ] `Date.now()` 기반 ID 생성 방식 개선
  - [ ] UUID 라이브러리 도입 검토 (`uuid` 패키지)
  - [ ] 고유성 보장 및 동시성 문제 해결
- [ ] **AdminDashboard 하드코딩 데이터 제거**
  - [ ] 임시 데이터를 API 호출로 대체
  - [ ] 실제 백엔드 API와 연동
  - [ ] 테스트 데이터와 프로덕션 코드 분리
- [ ] **로딩 컴포넌트 분리**
  - [ ] `frontend/src/components/Loading.jsx` 생성
  - [ ] 중복된 로딩 UI 제거
  - [ ] 재사용 가능한 로딩 컴포넌트 사용
- [ ] **환경 변수 관리 개선**
  - [ ] `frontend/src/config/index.js` 생성
  - [ ] 환경 변수 중앙 관리
  - [ ] 개발/프로덕션 환경 구분
- [ ] **TypeScript 도입 검토**
  - [ ] TypeScript 마이그레이션 계획 수립
  - [ ] 점진적 타입 적용 검토
  - [ ] 타입 안정성 향상
- [ ] **상태 관리 라이브러리 도입 검토**
  - [ ] 전역 상태 관리 필요성 평가
  - [ ] Context API vs Redux/Zustand 비교
  - [ ] 필요 시 상태 관리 라이브러리 도입

#### 백엔드 리팩토링
- [ ] 코드 리뷰 및 리팩토링
- [ ] 성능 최적화
- [ ] 보안 강화
- [ ] 문서화 업데이트
