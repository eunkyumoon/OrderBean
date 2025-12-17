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

### 성능 기대치

- ✅ 주문 생성 및 전송 완료까지의 응답 시간: **2초 이내**
- ✅ 피크 시간대 동시 사용자 처리: **최소 50명 이상**
- ✅ 시스템 가용성: **최소 99.5% 이상**

### 보안 요구사항

- ✅ 모든 클라이언트-서버 통신: **HTTPS/SSL 암호화**
- ✅ 사용자 비밀번호: **복구 불가능한 단방향 해시 알고리즘 사용**
- ✅ 데이터베이스 쿼리: **SQL Injection 공격 방어**

### 확장성 고려사항

- ✅ 다수의 프랜차이즈 매장 추가 및 관리 용이성
- ✅ RESTful API 표준 준수

### 사용성 표준

- ✅ 모바일 반응형 디자인 적용
- ✅ 메뉴 선택, 커스터마이징, 결제 과정: **3단계 이내 완료 가능**

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
- [ ] Express 서버 설정 및 초기화
- [ ] 라우트 설정
  - [ ] 인증 라우트 (`/api/v1/auth/*`)
  - [ ] 메뉴 라우트 (`/api/v1/menus/*`)
  - [ ] 주문 라우트 (`/api/v1/orders/*`)
  - [ ] 레시피 라우트 (`/api/v1/recipes/*`)
  - [ ] 관리자 라우트 (`/api/v1/admin/*`)
- [ ] 컨트롤러 구현
  - [ ] AuthController (회원가입, 로그인, 로그아웃)
  - [ ] MenuController (메뉴 CRUD)
  - [ ] OrderController (주문 생성, 조회, 취소)
  - [ ] RecipeController (레시피 CRUD, 재주문)
  - [ ] AdminController (주문 상태 관리, 통계)
- [ ] 미들웨어 구현
  - [ ] JWT 인증 미들웨어
  - [ ] 에러 처리 미들웨어
  - [ ] 요청 검증 미들웨어
  - [ ] Rate Limiting 미들웨어
- [ ] 통합 테스트 통과 (현재 19개 실패)
  - [ ] 메뉴 API 테스트 통과 (8개)
  - [ ] 주문 API 테스트 통과 (11개)

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
- [ ] 코드 리뷰 및 리팩토링
- [ ] 성능 최적화
- [ ] 보안 강화
- [ ] 문서화 업데이트
