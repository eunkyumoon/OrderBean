# PyCharm에서 OrderBean 프론트엔드 실행하기

## 📋 사전 준비

이 프로젝트는 **React** 프론트엔드 프로젝트입니다. PyCharm에서 실행하려면:

1. **PyCharm Professional 버전** 필요 (Node.js 지원)
   - Community 버전은 Node.js 지원이 제한적입니다
   - 또는 **WebStorm** (IntelliJ의 JavaScript IDE) 사용 권장

2. **Node.js 설치 확인**
   - Node.js가 설치되어 있어야 합니다
   - 터미널에서 확인: `node --version`
   - 권장 버전: Node.js 16 이상

3. **의존성 설치**
   ```bash
   cd frontend
   npm install
   ```

## 🚀 개발 서버 설정 (필수)

현재 프론트엔드 개발 서버가 설정되지 않았습니다. 다음 중 하나의 방법으로 설정하세요:

### 방법 1: Vite 사용 (권장)

1. **Vite 설치**
   ```bash
   cd frontend
   npm install --save-dev vite @vitejs/plugin-react
   ```

2. **vite.config.js 생성**
   ```javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173,
       open: true
     }
   });
   ```

3. **index.html 생성** (frontend 폴더 루트)
   ```html
   <!DOCTYPE html>
   <html lang="ko">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>OrderBean - 커피 주문</title>
   </head>
   <body>
     <div id="root"></div>
     <script type="module" src="/src/index.js"></script>
   </body>
   </html>
   ```

4. **src/index.js 수정**
   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import { BrowserRouter } from 'react-router-dom';
   import MenuList from './pages/MenuList';
   import './styles/App.css';

   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(
     <React.StrictMode>
       <BrowserRouter>
         <MenuList />
       </BrowserRouter>
     </React.StrictMode>
   );
   ```

5. **package.json 스크립트 수정**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     }
   }
   ```

### 방법 2: Create React App 사용

1. **Create React App으로 새 프로젝트 생성** (별도 폴더)
2. 기존 컴포넌트와 스타일 파일 복사
3. `npm start`로 실행

## 🎯 PyCharm에서 실행하는 방법

### 방법 1: npm 스크립트 실행 (권장)

1. **프로젝트 열기**
   - PyCharm에서 `OrderBean` 프로젝트 폴더를 엽니다

2. **npm 스크립트 실행**
   - 우측 상단의 `npm` 탭 클릭
   - `frontend` 폴더의 `package.json` → `scripts` → `dev` 더블클릭
   - 또는 터미널에서: `cd frontend && npm run dev`

3. **터미널에서 실행**
   - PyCharm 하단의 `Terminal` 탭 열기
   - 다음 명령어 실행:
     ```bash
     cd frontend
     npm run dev
     ```

### 방법 2: Run Configuration 설정

1. **Node.js Run Configuration 생성**
   - 상단 메뉴: `Run` → `Edit Configurations...`
   - `+` 버튼 클릭 → `npm` 선택

2. **설정 입력**
   ```
   Name: OrderBean Frontend
   Package.json: $PROJECT_DIR$/frontend/package.json
   Command: run
   Scripts: dev
   ```

3. **실행**
   - 상단 툴바에서 "OrderBean Frontend" 선택 후 실행 버튼 클릭
   - 또는 `Shift + F10`

### 방법 3: Vite 직접 실행 (Vite 설정 후)

1. **Run Configuration 생성**
   - `Run` → `Edit Configurations...`
   - `+` → `npm`

2. **설정**
   ```
   Name: OrderBean Frontend (Vite)
   Package.json: $PROJECT_DIR$/frontend/package.json
   Command: run
   Scripts: dev
   Working directory: $PROJECT_DIR$/frontend
   ```

## 🌐 브라우저 접속

개발 서버 실행 후:

- **로컬 URL**: `http://localhost:5173` (Vite 기본 포트)
- 또는 터미널에 표시된 URL 확인

## 🔧 환경 변수 설정

`.env` 파일 생성 (선택사항):

1. `frontend` 폴더에 `.env` 파일 생성
2. 다음 내용 추가:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=OrderBean
   ```

3. 코드에서 사용:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL;
   ```

## 🧪 테스트 실행

### PyCharm에서 테스트 실행

1. **Jest Configuration 설정**
   - `Run` → `Edit Configurations...`
   - `+` → `Jest`

2. **설정**
   ```
   Name: Jest Tests (Frontend)
   Jest package: $PROJECT_DIR$/frontend/node_modules/jest
   Working directory: $PROJECT_DIR$/frontend
   ```

3. **테스트 실행**
   - 테스트 파일에서 `▶` 버튼 클릭
   - 또는 `Ctrl + Shift + F10`

### 터미널에서 테스트 실행

```bash
cd frontend
npm test                    # 모든 테스트
npm run test:unit          # 단위 테스트만
npm run test:watch         # 감시 모드
npm run test:coverage      # 커버리지 포함
```

## 🐛 디버깅 설정

### Chrome DevTools 사용

1. **디버그 Configuration 생성**
   - `Run` → `Edit Configurations...`
   - `+` → `JavaScript Debug`

2. **설정**
   ```
   Name: Debug Frontend
   URL: http://localhost:5173
   ```

3. **디버깅**
   - 브레이크포인트 설정
   - `Shift + F9`로 디버그 모드 실행

## 📝 현재 상태 확인

현재 프론트엔드 프로젝트 상태:

- ✅ React 컴포넌트 구현 완료
- ✅ 스타일링 (CSS) 완료
- ✅ 테스트 설정 완료
- ⚠️ 개발 서버 설정 필요 (Vite 또는 CRA)
- ⚠️ React 앱 초기화 코드 필요 (`src/index.js`)

## ⚠️ 주의사항

1. **PyCharm Community 버전**
   - Node.js 지원이 제한적입니다
   - 터미널에서 실행하는 것을 권장합니다

2. **WebStorm 사용 권장**
   - JavaScript/React 프로젝트에는 WebStorm이 더 적합합니다
   - IntelliJ 계열 IDE이므로 PyCharm과 유사한 인터페이스

3. **포트 충돌**
   - 5173번 포트가 사용 중이면 다른 포트로 변경:
     ```bash
     npm run dev -- --port 3001
     ```

4. **백엔드 서버 필요**
   - 프론트엔드가 정상 작동하려면 백엔드 API 서버가 실행 중이어야 합니다
   - 백엔드 실행 방법: [PYCHARM_SETUP.md](./PYCHARM_SETUP.md) 참고

## 🔗 관련 문서

- [백엔드 PyCharm 설정](./PYCHARM_SETUP.md)
- [개발 가이드](./DEVELOPMENT.md)
- [API 문서](./API.md)
- [설치 가이드](./INSTALLATION.md)

## 💡 빠른 시작 (터미널)

가장 간단한 실행 방법:

```bash
# 1. 의존성 설치 (최초 1회)
cd frontend
npm install

# 2. 개발 서버 실행 (Vite 설정 후)
npm run dev

# 또는 테스트만 실행
npm test
```

---

**팁**: 
- PyCharm 대신 **VS Code**나 **WebStorm**을 사용하는 것도 좋은 선택입니다!
- React 개발에는 **React Developer Tools** 브라우저 확장 프로그램을 설치하세요.

