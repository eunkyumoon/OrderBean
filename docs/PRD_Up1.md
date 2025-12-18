# OrderBean (오더빈) 제품 요구사항 정의서 (PRD) v1.1

> Python + FastAPI + React + Render 기반 풀스택 웹 서비스

## 📋 목차

- [개요](#개요)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [시스템 아키텍처](#시스템-아키텍처)
- [API 설계](#api-설계)
- [데이터베이스 설계](#데이터베이스-설계)
- [인증 및 보안](#인증-및-보안)
- [배포 및 운영](#배포-및-운영)
- [개발 환경](#개발-환경)

---

## 개요

### 프로젝트 정보

- **프로젝트명**: OrderBean (오더빈)
- **버전**: v1.1 (Python 기반 풀스택 버전)
- **서비스 목표**: 바쁜 직장인들이 카페 대기 없이 빠르게 커피를 주문하고 픽업하여 시간을 절약할 수 있도록 돕는 간편 모바일 선주문 웹 서비스

### 대상 사용자

- **주요 사용자**: 바쁜 직장인, 단골 고객
- **관리자**: 매장 운영자, 프랜차이즈 관리자

---

## 기술 스택

### 프론트엔드 (UI)

| 계층 | 사용 기술 | 설명 |
|------|----------|------|
| **프론트엔드 (UI)** | **React** | 빠른 프로토타입 또는 완성형 웹 인터페이스 |

**세부 기술**:
- React 18+ (함수형 컴포넌트, Hooks)
- React Router (라우팅)
- Axios (HTTP 클라이언트)
- React Query / SWR (데이터 페칭 및 캐싱)
- Tailwind CSS / Material-UI (스타일링)
- Vite (빌드 도구)

### 백엔드 (API)

| 계층 | 사용 기술 | 설명 |
|------|----------|------|
| **백엔드 (API)** | **FastAPI** | 비동기 고성능 Python 웹 프레임워크 |

**세부 기술**:
- FastAPI 0.100+ (비동기 웹 프레임워크)
- Pydantic (데이터 검증 및 직렬화)
- SQLAlchemy (ORM)
- Alembic (데이터베이스 마이그레이션)
- Python 3.11+ (런타임)

### 데이터베이스

| 계층 | 사용 기술 | 설명 |
|------|----------|------|
| **데이터베이스** | **PostgreSQL** | 안정적이고 ORM 기반의 DB 설계 |

**세부 기술**:
- PostgreSQL 14+ (관계형 데이터베이스)
- SQLAlchemy ORM (Python ORM)
- psycopg2 (PostgreSQL 어댑터)
- 데이터베이스 연결 풀링

### 인증/세션

| 계층 | 사용 기술 | 설명 |
|------|----------|------|
| **인증/세션** | **FastAPI Users, OAuth2** | 로그인, JWT 인증 |

**세부 기술**:
- FastAPI Users (사용자 관리 라이브러리)
- OAuth2 with Password (Bearer Token)
- JWT (JSON Web Tokens)
- bcrypt (비밀번호 해싱)
- python-jose (JWT 토큰 처리)

### 테스트

| 계층 | 사용 기술 | 설명 |
|------|----------|------|
| **테스트** | **pytest** | 단위/통합 테스트 |

**세부 기술**:
- pytest (테스트 프레임워크)
- pytest-asyncio (비동기 테스트)
- pytest-cov (커버리지 측정)
- httpx (API 테스트 클라이언트)
- Factory Boy (테스트 데이터 생성)

### 문서화

| 계층 | 사용 기술 | 설명 |
|------|----------|------|
| **문서화** | **Swagger / ReDoc** | API 자동 문서 생성 |

**세부 기술**:
- FastAPI 자동 문서 (Swagger UI)
- ReDoc (대체 문서 인터페이스)
- OpenAPI 3.0 스펙
- Pydantic 모델 기반 스키마 자동 생성

### 배포/환경

| 계층 | 사용 기술 | 설명 |
|------|----------|------|
| **배포/환경** | **Render** | 백엔드, DB, 프론트 통합 실행 환경 구성 |

**세부 기술**:
- Render (플랫폼 as a Service)
- PostgreSQL 서비스 (Render 제공)
- Web Service (FastAPI 배포)
- Static Site (React 빌드 배포)
- 환경 변수 관리
- 자동 배포 (Git 연동)

---

## 주요 기능

### 에픽 1: 신속한 주문 및 결제

#### 기능 목록
- **커피 메뉴 조회 및 검색**
  - 카테고리별 탐색 (커피, 차, 디저트)
  - 키워드 검색 (메뉴명, 설명)
  - 페이지네이션 지원
  - 메뉴 상세 정보 조회

- **주문 생성 및 정교한 옵션 선택**
  - 샷 개수 선택 (1~5개, 추가당 500원)
  - 우유 종류 선택 (일반우유, 오트밀크, 두유, 코코넛밀크)
  - 시럽 종류 및 펌프 수 선택 (바닐라, 카라멜, 헤이즐넛)
  - 실시간 가격 계산
  - 장바구니 관리

- **모바일 선결제 및 수단 관리**
  - 카드 결제
  - 간편 결제 (추후 확장)
  - 결제 상태 관리

- **매장 선택 및 픽업 알림**
  - 매장 목록 조회
  - 매장 선택
  - 주문 상태 변경 시 알림 (제조 완료)

### 에픽 2: 개인화 및 재주문

#### 기능 목록
- **주문 내역 조회**
  - 과거 주문 이력 조회
  - 주문 상세 정보 (메뉴, 옵션, 가격)
  - 상태별 필터링
  - 날짜별 필터링

- **나만의 레시피 저장**
  - 커스터마이징된 메뉴를 레시피로 저장
  - 레시피 이름 지정
  - 레시피 목록 조회
  - 레시피 수정/삭제

- **원클릭 재주문**
  - 저장된 레시피로 주문 생성
  - 최근 주문으로 재주문
  - 빠른 주문 프로세스

### 에픽 3: 관리자 운영 및 지원

#### 기능 목록
- **메뉴 관리 (CRUD)**
  - 메뉴 등록 (이름, 설명, 가격, 카테고리)
  - 메뉴 수정
  - 메뉴 삭제
  - 메뉴 옵션 설정 (샷, 우유, 시럽)
  - 판매 가능 여부 관리

- **실시간 주문 상태 관리**
  - 주문 목록 조회
  - 주문 상태 업데이트 (접수 → 제조 중 → 제조 완료 → 픽업 완료)
  - 주문 취소 처리

- **매출 및 통계 데이터 조회**
  - 일별/주별/월별 매출 조회
  - 주문 건수 통계
  - 인기 메뉴 분석
  - 기간별 필터링

---

## 시스템 아키텍처

### 전체 아키텍처

```
┌─────────────────┐
│   React (UI)    │  ← 프론트엔드 (Vite 빌드)
│   Static Site   │
└────────┬────────┘
         │ HTTPS
         │ REST API
┌────────▼────────┐
│  FastAPI (API)  │  ← 백엔드 (Python)
│  Web Service    │
└────────┬────────┘
         │
         │ SQLAlchemy ORM
┌────────▼────────┐
│  PostgreSQL     │  ← 데이터베이스
│  Database       │
└─────────────────┘
```

### 레이어 구조

1. **프레젠테이션 레이어** (React)
   - 사용자 인터페이스
   - 상태 관리 (Context API / Zustand)
   - API 통신 (Axios)

2. **API 레이어** (FastAPI)
   - RESTful API 엔드포인트
   - 요청/응답 검증 (Pydantic)
   - 인증/인가 미들웨어
   - 비즈니스 로직 처리

3. **서비스 레이어** (Python)
   - 비즈니스 로직
   - 데이터 변환
   - 외부 서비스 연동

4. **데이터 레이어** (SQLAlchemy)
   - ORM 모델
   - 데이터베이스 쿼리
   - 트랜잭션 관리

5. **데이터베이스** (PostgreSQL)
   - 데이터 저장
   - 인덱싱
   - 트랜잭션

---

## API 설계

### API 기본 정보

- **Base URL**: `https://orderbean-api.onrender.com/api/v1`
- **인증 방식**: Bearer Token (JWT)
- **응답 형식**: JSON
- **문서**: Swagger UI (`/docs`), ReDoc (`/redoc`)

### 주요 API 엔드포인트

#### 인증 API
```
POST   /api/v1/auth/register      # 회원가입
POST   /api/v1/auth/login          # 로그인
POST   /api/v1/auth/logout         # 로그아웃
POST   /api/v1/auth/refresh        # 토큰 갱신
```

#### 메뉴 API
```
GET    /api/v1/menus               # 메뉴 목록 조회
GET    /api/v1/menus/{id}          # 메뉴 상세 조회
POST   /api/v1/admin/menus         # 메뉴 생성 (관리자)
PUT    /api/v1/admin/menus/{id}    # 메뉴 수정 (관리자)
DELETE /api/v1/admin/menus/{id}    # 메뉴 삭제 (관리자)
```

#### 주문 API
```
POST   /api/v1/orders               # 주문 생성
GET    /api/v1/orders               # 주문 목록 조회
GET    /api/v1/orders/{id}          # 주문 상세 조회
PATCH  /api/v1/orders/{id}/cancel   # 주문 취소
```

#### 레시피 API
```
GET    /api/v1/recipes              # 레시피 목록 조회
POST   /api/v1/recipes               # 레시피 생성
GET    /api/v1/recipes/{id}          # 레시피 상세 조회
PUT    /api/v1/recipes/{id}          # 레시피 수정
DELETE /api/v1/recipes/{id}          # 레시피 삭제
POST   /api/v1/recipes/{id}/order   # 레시피로 주문 생성
```

#### 관리자 API
```
PATCH  /api/v1/admin/orders/{id}/status  # 주문 상태 업데이트
GET    /api/v1/admin/statistics          # 통계 조회
```

### FastAPI 특징 활용

- **자동 문서화**: Pydantic 모델 기반 OpenAPI 스키마 자동 생성
- **비동기 처리**: async/await를 통한 고성능 처리
- **타입 힌팅**: Python 타입 힌팅으로 안정성 향상
- **의존성 주입**: FastAPI의 Dependency Injection 활용

---

## 데이터베이스 설계

### 주요 테이블

1. **users** (사용자)
   - id, email, password_hash, name, phone, role, created_at, updated_at

2. **stores** (매장)
   - id, name, address, phone, latitude, longitude, is_active, created_at, updated_at

3. **menus** (메뉴)
   - id, name, description, price, category, image_url, is_available, options (JSONB), created_at, updated_at

4. **orders** (주문)
   - id, user_id, store_id, status, total_price, payment_method, payment_status, created_at, updated_at

5. **order_items** (주문 항목)
   - id, order_id, menu_id, quantity, customizations (JSONB), price

6. **recipes** (레시피)
   - id, user_id, menu_id, name, customizations (JSONB), created_at, updated_at

### ORM 모델 (SQLAlchemy)

```python
# 예시: Menu 모델
class Menu(Base):
    __tablename__ = "menus"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(Integer, nullable=False)
    category = Column(String(50), nullable=False)
    image_url = Column(String(500))
    is_available = Column(Boolean, default=True)
    options = Column(JSONB)  # 커스터마이징 옵션
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
```

### 마이그레이션 (Alembic)

- Alembic을 사용한 데이터베이스 스키마 버전 관리
- 마이그레이션 파일 자동 생성
- 롤백 지원

---

## 인증 및 보안

### 인증 방식

- **FastAPI Users** 라이브러리 활용
- **OAuth2 Password Flow** (Bearer Token)
- **JWT 토큰** 기반 인증
- **토큰 만료 시간**: 1시간 (기본값)
- **리프레시 토큰**: 지원 (선택사항)

### 보안 기능

- **비밀번호 해싱**: bcrypt (salt rounds: 10)
- **SQL Injection 방어**: SQLAlchemy ORM 사용
- **XSS 방어**: 입력 데이터 검증 및 Sanitization
- **CORS 설정**: 허용된 도메인만 접근
- **Rate Limiting**: 분당 요청 수 제한
- **HTTPS**: 프로덕션 환경 필수

### 권한 관리

- **역할 기반 접근 제어 (RBAC)**
  - `user`: 일반 사용자
  - `admin`: 관리자
- **엔드포인트별 권한 검증**

---

## 배포 및 운영

### Render 플랫폼 구성

#### 1. PostgreSQL 서비스
- Render PostgreSQL 데이터베이스 생성
- 자동 백업 설정
- 연결 정보 환경 변수 관리

#### 2. FastAPI Web Service
- Python 런타임 환경
- Gunicorn + Uvicorn 워커
- 환경 변수 설정
- 자동 배포 (Git 연동)
- Health Check 엔드포인트

#### 3. React Static Site
- Vite 빌드 결과물 배포
- 환경 변수 설정 (API URL)
- CDN을 통한 정적 파일 제공

### 배포 프로세스

1. **코드 푸시** → Git 저장소
2. **자동 빌드** → Render가 감지
3. **테스트 실행** → pytest (선택사항)
4. **배포** → 자동 배포 또는 수동 승인

### 환경 변수

```env
# 데이터베이스
DATABASE_URL=postgresql://user:password@host:port/dbname

# 인증
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# API
API_V1_PREFIX=/api/v1
CORS_ORIGINS=["https://orderbean.onrender.com"]

# 환경
ENVIRONMENT=production
DEBUG=False
```

---

## 개발 환경

### 필수 도구

- **Python**: 3.11 이상
- **Node.js**: 18 이상
- **PostgreSQL**: 14 이상 (로컬 개발)
- **Git**: 버전 관리

### 프로젝트 구조

```
OrderBean/
├── backend/                 # FastAPI 백엔드
│   ├── app/
│   │   ├── api/            # API 라우터
│   │   ├── core/           # 설정, 보안
│   │   ├── models/         # SQLAlchemy 모델
│   │   ├── schemas/        # Pydantic 스키마
│   │   ├── services/       # 비즈니스 로직
│   │   └── main.py         # FastAPI 앱
│   ├── alembic/            # 마이그레이션
│   ├── tests/              # pytest 테스트
│   ├── requirements.txt    # Python 의존성
│   └── Dockerfile          # 컨테이너 이미지
│
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── pages/          # 페이지
│   │   ├── services/       # API 클라이언트
│   │   ├── hooks/          # Custom Hooks
│   │   └── App.jsx         # 메인 앱
│   ├── package.json        # Node 의존성
│   └── vite.config.js      # Vite 설정
│
├── docs/                   # 문서
└── README.md
```

### 개발 워크플로우

1. **로컬 개발 환경 설정**
   ```bash
   # 백엔드
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   
   # 프론트엔드
   cd frontend
   npm install
   npm run dev
   ```

2. **데이터베이스 마이그레이션**
   ```bash
   cd backend
   alembic upgrade head
   ```

3. **테스트 실행**
   ```bash
   # 백엔드 테스트
   cd backend
   pytest
   pytest --cov  # 커버리지 포함
   ```

4. **배포**
   - Git push → Render 자동 배포

---

## 비기능적 요구사항

### 성능
- API 응답 시간: 500ms 이내 (Toy Project 기준)
- 동시 사용자: 최소 10명 처리 가능
- 데이터베이스 쿼리 최적화 (인덱싱, 페이지네이션)

### 보안
- JWT 기반 인증
- bcrypt 비밀번호 해싱
- SQL Injection 방어 (ORM)
- HTTPS (프로덕션)

### 확장성
- 모듈화된 서비스 레이어
- RESTful API 표준
- 다중 매장 지원 구조

### 사용성
- 모바일 반응형 디자인
- 주문 프로세스 3단계 이내
- 명확한 에러 메시지

> 상세 내용: [비기능적 요구사항 문서](./NON_FUNCTIONAL_REQUIREMENTS.md)

---

## 개발 일정 (예상)

### Phase 1: 백엔드 API 개발 (2-3주)
- FastAPI 프로젝트 설정
- 데이터베이스 모델 및 마이그레이션
- 인증 시스템 구현
- 메뉴/주문/레시피 API 구현
- 테스트 작성

### Phase 2: 프론트엔드 개발 (2-3주)
- React 프로젝트 설정
- 컴포넌트 개발
- API 연동
- 상태 관리
- UI/UX 구현

### Phase 3: 통합 및 배포 (1주)
- 통합 테스트
- Render 배포 설정
- 문서화
- 최종 테스트

---

## 관련 문서

- [기능 요구사항](./FUNCTIONAL_REQUIREMENTS.md)
- [사용자 스토리](./USER_STORIES.md)
- [비기능적 요구사항](./NON_FUNCTIONAL_REQUIREMENTS.md)
- [API 문서](./API.md) (FastAPI 자동 생성 문서 참조)

---

## 변경 이력

- **v1.1** (2024-12-16): Python + FastAPI + React + Render 기술 스택으로 업데이트
- **v1.0** (2024-12-16): 초기 PRD 작성

---

**문서 작성일**: 2024-12-16  
**다음 검토일**: 구현 시작 전

