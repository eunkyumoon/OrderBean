# OrderBean 설치 및 실행 가이드

이 문서는 OrderBean 프로젝트를 설치하고 실행하는 방법을 안내합니다.

## 목차

- [사전 요구사항](#사전-요구사항)
- [프로젝트 클론](#프로젝트-클론)
- [환경 변수 설정](#환경-변수-설정)
- [의존성 설치](#의존성-설치)
- [데이터베이스 설정](#데이터베이스-설정)
- [프로젝트 실행](#프로젝트-실행)
- [문제 해결](#문제-해결)

## 사전 요구사항

프로젝트를 실행하기 전에 다음 소프트웨어가 설치되어 있어야 합니다:

### 필수 요구사항

- **Node.js**: v18.0.0 이상 (권장: v20.x LTS)
  - [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드
  - 설치 확인: `node --version`
  
- **npm**: v9.0.0 이상 (Node.js와 함께 설치됨)
  - 설치 확인: `npm --version`

- **Git**: 최신 버전
  - [Git 공식 사이트](https://git-scm.com/)에서 다운로드
  - 설치 확인: `git --version`

### 데이터베이스 (선택사항 - 구현 시 결정)

- **PostgreSQL** (권장) 또는 **MySQL**, **SQLite**
  - 데이터베이스 서버 설치 및 실행 필요
  - 데이터베이스 클라이언트 도구 (선택사항)

### 개발 도구 (선택사항)

- **VS Code** 또는 선호하는 코드 에디터
- **Postman** 또는 **Insomnia** (API 테스트용)

## 프로젝트 클론

### GitHub에서 클론하기

```bash
# 저장소 클론
git clone https://github.com/yourusername/OrderBean.git

# 프로젝트 디렉토리로 이동
cd OrderBean
```

### ZIP 파일로 다운로드하기

1. GitHub 저장소에서 "Code" → "Download ZIP" 클릭
2. 압축 해제 후 해당 디렉토리로 이동

## 환경 변수 설정

프로젝트 루트 디렉토리에 `.env` 파일을 생성해야 합니다.

### 1. 환경 변수 파일 생성

```bash
# .env.example 파일을 복사하여 .env 파일 생성
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

### 2. 환경 변수 설정

`.env` 파일을 열어 다음 변수들을 설정하세요:

```env
# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orderbean
DB_USER=your_username
DB_PASSWORD=your_password

# JWT 시크릿 (강력한 랜덤 문자열 사용)
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# 서버 설정
PORT=3000
NODE_ENV=development

# 프론트엔드 설정 (필요시)
VITE_API_URL=http://localhost:3000/api

# 기타 설정
# API_KEYS=your_api_key
# EXTERNAL_SERVICES=...
```

### 중요 보안 사항

- ⚠️ `.env` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨)
- ⚠️ 프로덕션 환경에서는 강력한 `JWT_SECRET`을 사용하세요
- ⚠️ 데이터베이스 비밀번호는 안전하게 관리하세요

## 의존성 설치

### 전체 프로젝트 설치 (권장)

프로젝트 루트에서 모든 워크스페이스의 의존성을 한 번에 설치:

```bash
# 루트 디렉토리에서 실행
npm install

# 또는 워크스페이스별로 설치
npm install --workspace=frontend
npm install --workspace=backend
```

### 개별 설치

프론트엔드와 백엔드를 개별적으로 설치할 수도 있습니다:

```bash
# 프론트엔드 의존성 설치
cd frontend
npm install
cd ..

# 백엔드 의존성 설치
cd backend
npm install
cd ..
```

## 데이터베이스 설정

### PostgreSQL 사용 시

1. **PostgreSQL 설치 및 실행**
   ```bash
   # PostgreSQL이 설치되어 있는지 확인
   psql --version
   ```

2. **데이터베이스 생성**
   ```sql
   -- PostgreSQL에 접속
   psql -U postgres
   
   -- 데이터베이스 생성
   CREATE DATABASE orderbean;
   
   -- 사용자 생성 (선택사항)
   CREATE USER orderbean_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE orderbean TO orderbean_user;
   ```

3. **마이그레이션 실행**
   ```bash
   # 루트 디렉토리에서
   npm run migrate
   
   # 또는 백엔드 디렉토리에서
   cd backend
   npm run migrate
   ```

### SQLite 사용 시 (개발용)

SQLite를 사용하는 경우 별도의 데이터베이스 서버 설치가 필요 없습니다:

```bash
# 마이그레이션 실행
npm run migrate
```

## 프로젝트 실행

### 개발 모드로 실행 (권장)

프론트엔드와 백엔드를 동시에 실행:

```bash
# 루트 디렉토리에서
npm run dev
```

이 명령어는 다음을 실행합니다:
- 프론트엔드 개발 서버 (일반적으로 http://localhost:5173 또는 3000)
- 백엔드 API 서버 (일반적으로 http://localhost:3000)

### 개별 실행

#### 프론트엔드만 실행

```bash
cd frontend
npm run dev
```

프론트엔드는 일반적으로 다음 주소에서 실행됩니다:
- http://localhost:5173 (Vite)
- http://localhost:3000 (Create React App)
- http://localhost:4200 (Angular)

#### 백엔드만 실행

```bash
cd backend
npm run dev
```

백엔드 API는 일반적으로 다음 주소에서 실행됩니다:
- http://localhost:3000

### 프로덕션 빌드 및 실행

#### 프론트엔드 빌드

```bash
cd frontend
npm run build
```

빌드된 파일은 `frontend/dist` 또는 `frontend/build` 디렉토리에 생성됩니다.

#### 백엔드 실행

```bash
cd backend
npm start
```

## 실행 확인

### 1. 백엔드 API 확인

브라우저나 API 클라이언트에서 다음 엔드포인트를 확인:

```bash
# Health check (구현 시)
curl http://localhost:3000/api/health

# 또는 브라우저에서
http://localhost:3000/api/health
```

### 2. 프론트엔드 확인

브라우저에서 프론트엔드 주소로 접속:

```
http://localhost:5173
```

### 3. 랜딩 페이지 확인

프로젝트 루트의 `index.html` 파일을 브라우저에서 열어 확인:

```bash
# 간단한 HTTP 서버로 실행 (Python 3)
python -m http.server 8000

# 또는 Node.js (http-server 설치 필요)
npx http-server

# 브라우저에서 접속
http://localhost:8000
```

## 문제 해결

### 일반적인 문제

#### 1. 포트가 이미 사용 중입니다

**에러 메시지**: `Error: listen EADDRINUSE: address already in use :::3000`

**해결 방법**:
```bash
# Windows에서 포트 사용 중인 프로세스 확인
netstat -ano | findstr :3000

# 프로세스 종료 (PID는 위 명령어 결과에서 확인)
taskkill /PID <PID> /F

# 또는 .env 파일에서 다른 포트 사용
PORT=3001
```

#### 2. 모듈을 찾을 수 없습니다

**에러 메시지**: `Cannot find module 'xxx'`

**해결 방법**:
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# Windows
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

#### 3. 데이터베이스 연결 실패

**에러 메시지**: `Error: connect ECONNREFUSED`

**해결 방법**:
- 데이터베이스 서버가 실행 중인지 확인
- `.env` 파일의 데이터베이스 설정이 올바른지 확인
- 방화벽 설정 확인

#### 4. 환경 변수를 찾을 수 없습니다

**에러 메시지**: `Environment variable not found`

**해결 방법**:
- `.env` 파일이 프로젝트 루트에 있는지 확인
- `.env` 파일의 변수명이 올바른지 확인
- 서버 재시작

### 추가 도움말

문제가 지속되면 다음을 확인하세요:

1. **Node.js 버전 확인**: `node --version` (v18 이상 권장)
2. **npm 버전 확인**: `npm --version` (v9 이상 권장)
3. **의존성 재설치**: `npm install` 재실행
4. **캐시 정리**: `npm cache clean --force`
5. **GitHub Issues 확인**: 프로젝트 저장소의 Issues 섹션 확인

## 다음 단계

설치 및 실행이 완료되면 다음 문서를 참조하세요:

- [API 문서](./API.md) - API 엔드포인트 문서 (작성 예정)
- [개발 가이드](./DEVELOPMENT.md) - 개발 가이드 (작성 예정)
- [배포 가이드](./DEPLOYMENT.md) - 배포 가이드 (작성 예정)

## 참고 자료

- [Node.js 공식 문서](https://nodejs.org/docs/)
- [npm 공식 문서](https://docs.npmjs.com/)
- [프로젝트 README](../README.md)

---

**문의사항이나 문제가 있으면 GitHub Issues에 등록해주세요.**

