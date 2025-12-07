# Nuxt4-Weather

---

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
**app/assets**:   
**app/components**:   
**app/composable**:   
**app/layouts**:   
**app/pages**:   
**app/plugins**:   
**app/utils**:   
**public**: 빌드 과정에서 변환 없이 그대로 제공되는 정적 리소스를 보관합니다.
favicon, robots.txt, 아이콘 등의 파일이 이곳에 위치합니다.     
**server**: Nuxt 서버 환경에서만 실행되는 코드를 관리합니다.
API 라우트(/server/api)와 서버 미들웨어, 서버 전용 유틸 등이 포함됩니다.    
**shared**: 서버와 클라이언트 양쪽에서 사용되는 타입 및 공용 유틸을 모아둔 공간입니다.
shared/types, shared/utils 경로는 Nuxt에서 자동으로 import됩니다.   
**tests**: Playwright 기반 E2E 테스트 코드를 저장하는 폴더



- Codex 를 활용한 Playwright 
```
// input prompts
- playwright 추가해줘
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

- actions CI 에서 테스 통과 시, Vercel 에 배포되도록 하기
```
- Vercel 에서 자동 배포 비활성화
- github actions 에서 workflow 에 Vercel 배포 관련 설정 추가
- vercel-token, vercel-org-id, vercel-project-id 가 필요하며, 이는 Vercel 에서 확인 및 해당 값은 Secrets and variables - actions 에서 등록하여 관리

```

---

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
