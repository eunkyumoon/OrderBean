# Database

이 디렉토리는 데이터베이스 스키마 및 마이그레이션 파일을 포함합니다.

## 구조

```
database/
├── migrations/     # 데이터베이스 마이그레이션 파일
└── README.md       # 이 파일
```

## 예상 테이블 구조

### Users (사용자)
- id
- email
- password (hashed)
- name
- phone
- created_at
- updated_at

### Stores (매장)
- id
- name
- address
- phone
- is_active
- created_at
- updated_at

### Menus (메뉴)
- id
- name
- description
- price
- category
- image_url
- is_available
- created_at
- updated_at

### Orders (주문)
- id
- user_id
- store_id
- status (접수, 제조 중, 제조 완료, 픽업 완료)
- total_price
- created_at
- updated_at

### OrderItems (주문 항목)
- id
- order_id
- menu_id
- quantity
- customizations (JSON)
- price
- created_at

### Recipes (나만의 레시피)
- id
- user_id
- name
- menu_id
- customizations (JSON)
- created_at
- updated_at

## 마이그레이션 실행

마이그레이션 파일이 준비되면 다음 명령어로 실행합니다:

```bash
npm run migrate
```

