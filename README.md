# Nuxt4-Weather

---

- 프로젝트 개요

Nuxt와 Vue를 오랜만에 다시 써보고 싶어서 진행한 토이 프로젝트입니다.  
Vercel에 배포되어 있고, GitHub Actions로 CI 이후 자동 배포되도록 구성했습니다.

- 배포 주소: https://nuxt4-weather.vercel.app/

- 주요 설정
  - CI: GitHub Actions
  - 배포: Vercel (CI 이후 자동 배포)

- CI/CD 흐름
  1. PR/푸시
  2. GitHub Actions에서 CI(테스트/빌드) 실행
  3. CI 통과 시 Vercel 배포
  4. 배포 완료 후 프로덕션 사이트 반영

- 전체 워크플로 구조
```
Feature 브랜치 작업
    ↓
PR 생성
    ↓
preview.yml 실행
    ├─ Playwright Tests ✅
    └─ Vercel Preview 배포 
    ↓
코드 리뷰 & 승인
    ↓
main 브랜치에 Merge
    ↓
production.yml 실행
    ├─ Playwright Tests ✅(현재는 주석 처리.)
    └─ Vercel Production 배포
```

- 주요 컴포넌트
  - `Header`, `Footer`: 전역 레이아웃 상단/하단 UI
  - `CurrentWeather`: 현재 날씨 정보 표시
  - `FiveDayWeatherForecast`: 5일 예보 카드 목록
  - `FiveDayWeatherForecastChart`: 5일 예보(풍량) 차트 시각화
  - `LoadingOverlay`: 데이터 로딩 상태 표시
  - `Dropdown`, `IconButton`, `Box`, `Link`: 공용 UI 컴포넌트
  - `SunIcon`, `MoonIcon`, `GithubIcon` 등: 아이콘 컴포넌트

- 프로젝트 구조

```
nuxt4-weather
├── .github
├── app
│   ├── assets
│   ├── components
│   ├── composable
│   ├── layouts
│   ├── pages
│   ├── plugins
│   └── utils
├── public
├── server
│   ├── api
├── shared
│   ├── types
│   └── utils
└── tests

```
**.github**: GitHub Actions 워크플로우 및 GitHub 관련 설정 파일을 관리합니다.   
**app**: Nuxt4 애플리케이션 컴포넌트 및 코드들을 모아두고 관리합니다.
**app/assets**: 전역 스타일, 이미지 등 정적 리소스를 관리합니다.   
**app/components**: 재사용 가능한 UI 컴포넌트를 모아둡니다.   
**app/composable**: Vue/Nuxt composable 로직(상태, 훅)을 모아둡니다.   
**app/layouts**: 페이지 공통 레이아웃을 정의합니다.   
**app/pages**: 라우팅되는 페이지 컴포넌트를 관리합니다.   
**app/plugins**: Nuxt 플러그인 등록 및 초기화를 관리합니다.   
**app/utils**: 공통 유틸리티 함수 모음입니다.   
**public**: 빌드 과정에서 변환 없이 그대로 제공되는 정적 리소스를 보관합니다.
favicon, robots.txt, 아이콘 등의 파일이 이곳에 위치합니다.     
**server**: Nuxt 서버 환경에서만 실행되는 코드를 관리합니다.
API 라우트(/server/api)와 서버 미들웨어, 서버 전용 유틸 등이 포함됩니다.    
**shared**: 서버와 클라이언트 양쪽에서 사용되는 타입 및 공용 유틸을 모아둔 공간입니다.
shared/types, shared/utils 경로는 Nuxt에서 자동으로 import됩니다.   
**tests**: Playwright 기반 E2E 테스트 코드를 저장하는 폴더

---

- Codex 를 활용한 Playwright 
```
// input prompts
- playwright 추가해줘.
- pnpm run test:e2e 로 테스트를 실행하여, 동작하는지 확인해줘.
- playwright 브라우저 셋 설치를 진행해줘.
- playwright.config.ts 를 수정해줘. 크로미움 계열의 브라우저만 테스트를 하도록 설정해주고. rpoter 는 html 형식, worker 설정은 CI 환경에서는 2 로컬 에서는 4로 동작하도록 수정해줘.
- home.spec.ts 에 테스트 추가해줘. - 도시를 선택하면, 콘텐츠가 렌더링 되는지 여부 - 다크모드 클릭 시, 색상이 변경되는지
- home.spec.ts 에 너무 많은 로직이 포함되어있어. 이것을 POM구조로 작성해줘. pom 은 tests/pom 에 생성 및 작성해주고, mock data 는 test/mock/[페이지별] 로 분리해서 생성 및 작성해줘
- home.page.ts 에 각 POM 클래스 메서드마다 로케이터들이 있는데, 이것을 클래스 맴버로 정의하고 생성자 메서드에서 초기화 하도록 수정해줘.
- locator에 전달하는 text를 정규식으로 수정해줘.
- 정규식에 i 플래그 추가해줘
- POM에는 expect 로직이 없도록 좋은 관례를 따르도록 코드를 수정해줘. 그리고 정적 대기 말고 자동 대기를 활용해줘
- 더 추가해야 하는 테스트 시나리오가 있을까? -> 답변을 받고, 로딩 표시 및 다크모드 유지를 추가해 달라고 요청
- home.spec.ts 에 작성된 test() 에 test 명들을 영어 말고, 한글 표기로 바꿔줘. 한글 표기 시 명사 단언 형태로 해줘.
- loadingOverlay 는 test() 에 있으면 안되니까, 이건 POM으로 옮겨줘.

```

- https://playwright.dev/docs/ci-intro
```
- CI 연동 작업(Github Actions)
- .github/workflows/playwright.yml 생성 및 작성

1차 실패
Unable to locate executable file: pnpm. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.

수정 후, 테스트 실패 리포트 확인(github actions 에는 .env 가 없어서 발생하는 에러)
Secrets and variables -> Actions 설정
step 에 env 연결

```

- actions CI 에서 테스트 통과 시, Vercel 에 배포되도록 하기
```
- Vercel 에서 자동 배포 비활성화
- github actions 에서 workflow 에 Vercel 배포 관련 설정 추가
- vercel-token, vercel-org-id, vercel-project-id 가 필요하며, 이는 Vercel 에서 확인 및 해당 값은 Secrets and variables - actions 에서 등록하여 관리

```

---

# Nuxt Minimal Starter

- Nuxt 공식 문서: https://nuxt.com/docs/getting-started/introduction
- Vue 공식 문서: https://vuejs.org/guide/introduction.html

## Setup (pnpm)

의존성 설치:

```bash
pnpm install
```

## Development Server (pnpm)

개발 서버 실행 (`http://localhost:3000`):

```bash
pnpm dev
```

## Production (pnpm)

프로덕션 빌드:

```bash
pnpm build
```

로컬 프리뷰:

```bash
pnpm preview
```
