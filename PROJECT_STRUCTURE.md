# OrderBean 프로젝트 구조

## 전체 구조

```
OrderBean/
├── frontend/              # 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── services/      # API 서비스
│   │   ├── utils/         # 유틸리티 함수
│   │   └── index.js       # 진입점
│   └── package.json       # 프론트엔드 패키지 설정
│
├── backend/               # 백엔드 API 서버
│   ├── src/
│   │   ├── controllers/   # 요청 핸들러
│   │   ├── models/        # 데이터 모델
│   │   ├── routes/        # API 라우트
│   │   ├── services/      # 비즈니스 로직
│   │   ├── middleware/    # 미들웨어
│   │   └── index.js       # 진입점
│   └── package.json       # 백엔드 패키지 설정
│
├── database/              # 데이터베이스 관련
│   ├── migrations/        # 마이그레이션 파일
│   └── README.md          # 데이터베이스 문서
│
├── docs/                  # 문서
│   ├── PRD.md             # 제품 요구사항 정의서
│   └── README.md          # 문서 가이드
│
├── index.html             # 랜딩 페이지
├── styles.css             # 랜딩 페이지 스타일
├── script.js              # 랜딩 페이지 스크립트
├── package.json           # 루트 패키지 설정 (workspace)
├── .gitignore             # Git 무시 파일
├── LICENSE                # MIT 라이선스
└── README.md              # 프로젝트 README
```

## 디렉토리 설명

### Frontend (`frontend/`)
- **components/**: 재사용 가능한 UI 컴포넌트 (버튼, 카드, 모달 등)
- **pages/**: 페이지 레벨 컴포넌트 (메뉴 페이지, 주문 페이지, 레시피 페이지 등)
- **services/**: API 통신을 담당하는 서비스 레이어
- **utils/**: 공통 유틸리티 함수 (상수, 헬퍼, 유효성 검사 등)

### Backend (`backend/`)
- **controllers/**: HTTP 요청을 처리하는 컨트롤러
- **models/**: 데이터베이스 모델 정의
- **routes/**: API 엔드포인트 라우트 정의
- **services/**: 비즈니스 로직 처리
- **middleware/**: 인증, 에러 처리, 로깅 등 미들웨어

### Database (`database/`)
- **migrations/**: 데이터베이스 스키마 마이그레이션 파일

### Docs (`docs/`)
- 프로젝트 관련 문서 저장

## 주요 기능별 파일 구조 (예상)

### 1. 신속한 주문 및 결제
- `frontend/src/pages/MenuPage.jsx` - 메뉴 조회 페이지
- `frontend/src/pages/OrderPage.jsx` - 주문 페이지
- `frontend/src/pages/PaymentPage.jsx` - 결제 페이지
- `backend/src/controllers/menuController.js` - 메뉴 컨트롤러
- `backend/src/controllers/orderController.js` - 주문 컨트롤러
- `backend/src/services/paymentService.js` - 결제 서비스

### 2. 개인화 및 재주문
- `frontend/src/pages/OrderHistoryPage.jsx` - 주문 내역 페이지
- `frontend/src/pages/RecipePage.jsx` - 나만의 레시피 페이지
- `backend/src/controllers/recipeController.js` - 레시피 컨트롤러
- `backend/src/models/Recipe.js` - 레시피 모델

### 3. 관리자 운영 및 지원
- `frontend/src/pages/AdminPage.jsx` - 관리자 페이지
- `backend/src/controllers/adminController.js` - 관리자 컨트롤러
- `backend/src/services/statisticsService.js` - 통계 서비스

## 다음 단계

1. 기술 스택 결정 (React/Vue, Node.js/Express 등)
2. 데이터베이스 스키마 설계
3. API 엔드포인트 설계
4. 컴포넌트 및 페이지 구현
5. 인증 및 보안 구현
6. 테스트 작성

