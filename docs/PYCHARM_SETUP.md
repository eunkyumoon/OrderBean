# PyCharm에서 OrderBean 프로젝트 실행하기

## 📋 사전 준비

이 프로젝트는 **Node.js/Express** 백엔드 프로젝트입니다. PyCharm에서 실행하려면:

1. **PyCharm Professional 버전** 필요 (Node.js 지원)
   - Community 버전은 Node.js 지원이 제한적입니다
   - 또는 **WebStorm** (IntelliJ의 JavaScript IDE) 사용 권장

2. **Node.js 설치 확인**
   - Node.js가 설치되어 있어야 합니다
   - 터미널에서 확인: `node --version`

## 🚀 PyCharm에서 실행하는 방법

### 방법 1: Run Configuration 설정 (권장)

1. **프로젝트 열기**
   - PyCharm에서 `OrderBean` 프로젝트 폴더를 엽니다

2. **Node.js Run Configuration 생성**
   - 상단 메뉴: `Run` → `Edit Configurations...`
   - `+` 버튼 클릭 → `Node.js` 선택

3. **설정 입력**
   ```
   Name: OrderBean Backend
   Node interpreter: (Node.js 경로 자동 감지)
   Working directory: $PROJECT_DIR$/backend
   JavaScript file: src/index.js
   Application parameters: (비워둠)
   ```

4. **환경 변수 설정 (선택사항)**
   - `Environment variables` 섹션에서:
     ```
     PORT=3000
     NODE_ENV=development
     JWT_SECRET=your_jwt_secret
     ```

5. **실행**
   - 상단 툴바에서 "OrderBean Backend" 선택 후 실행 버튼 클릭
   - 또는 `Shift + F10`

### 방법 2: npm 스크립트 실행

1. **npm 스크립트 실행**
   - 우측 상단의 `npm` 탭 클릭
   - `backend` 폴더의 `package.json` → `scripts` → `dev` 더블클릭
   - 또는 터미널에서: `cd backend && npm run dev`

2. **터미널에서 실행**
   - PyCharm 하단의 `Terminal` 탭 열기
   - 다음 명령어 실행:
     ```bash
     cd backend
     npm run dev
     ```

### 방법 3: 직접 Node.js 실행

1. **Run Configuration 생성**
   - `Run` → `Edit Configurations...`
   - `+` → `Node.js`

2. **설정**
   ```
   Name: OrderBean Backend (Direct)
   Node interpreter: (자동 감지)
   Working directory: $PROJECT_DIR$/backend
   JavaScript file: src/index.js
   ```

## 🔧 디버깅 설정

1. **디버그 Configuration 생성**
   - `Run` → `Edit Configurations...`
   - `+` → `Node.js` → `Attach to Node.js/Chrome`

2. **브레이크포인트 설정**
   - 코드 라인 번호 왼쪽 클릭하여 브레이크포인트 설정
   - `Shift + F9`로 디버그 모드 실행

## 📝 환경 변수 설정

`.env` 파일 생성 (선택사항):

1. `backend` 폴더에 `.env` 파일 생성
2. 다음 내용 추가:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   ```

3. PyCharm에서 `.env` 파일을 환경 변수로 로드하려면:
   - `dotenv` 패키지 설치 필요
   - 또는 Run Configuration의 `Environment variables`에 직접 입력

## 🧪 테스트 실행

### PyCharm에서 테스트 실행

1. **Jest Configuration 설정**
   - `Run` → `Edit Configurations...`
   - `+` → `Jest`

2. **설정**
   ```
   Name: Jest Tests
   Jest package: $PROJECT_DIR$/backend/node_modules/jest
   Working directory: $PROJECT_DIR$/backend
   ```

3. **테스트 실행**
   - 테스트 파일에서 `▶` 버튼 클릭
   - 또는 `Ctrl + Shift + F10`

### 터미널에서 테스트 실행

```bash
cd backend
npm test                    # 모든 테스트
npm run test:unit          # 단위 테스트만
npm run test:integration   # 통합 테스트만
```

## 🌐 서버 접속 확인

서버 실행 후:

- **API Base URL**: `http://localhost:3000`
- **메뉴 API**: `http://localhost:3000/api/v1/menus`
- **주문 API**: `http://localhost:3000/api/v1/orders`

## ⚠️ 주의사항

1. **PyCharm Community 버전**
   - Node.js 지원이 제한적입니다
   - 터미널에서 실행하는 것을 권장합니다

2. **WebStorm 사용 권장**
   - JavaScript/Node.js 프로젝트에는 WebStorm이 더 적합합니다
   - IntelliJ 계열 IDE이므로 PyCharm과 유사한 인터페이스

3. **포트 충돌**
   - 3000번 포트가 사용 중이면 다른 포트로 변경:
     ```bash
     PORT=3001 npm run dev
     ```

## 🔗 관련 문서

- [개발 가이드](./DEVELOPMENT.md)
- [API 문서](./API.md)
- [설치 가이드](./INSTALLATION.md)

---

**팁**: PyCharm 대신 **VS Code**나 **WebStorm**을 사용하는 것도 좋은 선택입니다!

