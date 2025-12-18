# OrderBean 프론트엔드 웹 실행 가이드

## 📋 사전 준비

1. **Node.js 설치 확인**
   ```bash
   node --version  # v16 이상 권장
   npm --version
   ```

2. **프로젝트 의존성 설치**
   ```bash
   cd frontend
   npm install
   ```

## 🚀 웹에서 실행하는 방법

### 방법 1: 개발 서버 실행 (권장)

1. **프론트엔드 개발 서버 실행**
   ```bash
   cd frontend
   npm run dev
   ```

2. **브라우저에서 접속**
   - 자동으로 브라우저가 열립니다
   - 또는 수동으로 접속: `http://localhost:5173`

3. **서버 중지**
   - 터미널에서 `Ctrl + C` (Windows/Linux) 또는 `Cmd + C` (Mac)

### 방법 2: 빌드 후 실행

1. **프로덕션 빌드**
   ```bash
   cd frontend
   npm run build
   ```

2. **빌드 결과 미리보기**
   ```bash
   npm run preview
   ```

3. **브라우저에서 접속**
   - `http://localhost:4173` (preview 기본 포트)

## 🌐 백엔드 서버와 함께 실행

프론트엔드가 정상 작동하려면 백엔드 API 서버가 실행 중이어야 합니다.

### 1. 백엔드 서버 실행

**터미널 1 (백엔드)**
```bash
cd backend
npm run dev
```

백엔드 서버가 `http://localhost:3000`에서 실행됩니다.

### 2. 프론트엔드 서버 실행

**터미널 2 (프론트엔드)**
```bash
cd frontend
npm run dev
```

프론트엔드 서버가 `http://localhost:5173`에서 실행됩니다.

### 3. 브라우저에서 확인

- 프론트엔드: `http://localhost:5173`
- 백엔드 API: `http://localhost:3000/api/v1/menus`

## 🔧 환경 변수 설정 (선택사항)

### API URL 변경

`frontend` 폴더에 `.env` 파일 생성:

```env
VITE_API_URL=http://localhost:3000
```

코드에서 사용:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

## 📱 접속 URL

### 개발 모드
- **프론트엔드**: `http://localhost:5173`
- **백엔드 API**: `http://localhost:3000`

### 프로덕션 빌드 미리보기
- **프론트엔드**: `http://localhost:4173`

## 🐛 문제 해결

### 포트가 이미 사용 중인 경우

포트를 변경하려면 `vite.config.js` 수정:

```javascript
server: {
  port: 3001,  // 원하는 포트 번호
  open: true
}
```

또는 명령어로 포트 지정:
```bash
npm run dev -- --port 3001
```

### 백엔드 연결 오류

1. **백엔드 서버가 실행 중인지 확인**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **CORS 오류 발생 시**
   - 백엔드의 `cors` 설정 확인
   - `backend/src/index.js`에서 CORS 미들웨어 확인

3. **프록시 설정 확인**
   - `vite.config.js`의 `proxy` 설정 확인
   - API 요청이 `/api`로 시작하는지 확인

### 모듈을 찾을 수 없는 경우

의존성을 다시 설치:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 주요 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch

# 테스트 커버리지
npm run test:coverage
```

## 🎯 실행 확인 체크리스트

- [ ] Node.js가 설치되어 있음
- [ ] `frontend` 폴더에서 `npm install` 완료
- [ ] 백엔드 서버가 `http://localhost:3000`에서 실행 중
- [ ] 프론트엔드 서버가 `http://localhost:5173`에서 실행 중
- [ ] 브라우저에서 `http://localhost:5173` 접속 가능
- [ ] 메뉴 목록이 표시됨
- [ ] 장바구니 기능이 작동함

## 🔗 관련 문서

- [PyCharm 프론트엔드 설정](./PYCHARM_FRONTEND_SETUP.md)
- [백엔드 실행 가이드](./PYCHARM_SETUP.md)
- [개발 가이드](./DEVELOPMENT.md)
- [API 문서](./API.md)

---

**팁**: 
- 개발 중에는 `npm run dev`를 사용하세요 (핫 리로드 지원)
- 프로덕션 배포 전에는 `npm run build`로 최적화된 빌드를 생성하세요

