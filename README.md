# 본인 소개

# 프로젝트 소개

원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제입니다.

## 과제 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [X] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/74370531/210978981-525dedb2-af61-4f1d-bdda-69f4410d6b11.png">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/74370531/210979021-11a90e94-a436-44f7-a9ef-f0d61ffc2b12.png">
- 이메일과 비밀번호의 유효성을 확인합니다
  - [X] 이메일 조건 : 최소 `@`, `.` 포함
  - [X] 비밀번호 조건 : 8자 이상 입력
  - [X] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/74370531/210987261-28338472-baa1-49ca-b48e-e9f72eb37aef.gif">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/74370531/210987248-2b6a1de1-e8bf-40fb-bd69-0631bbc16e64.gif">
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [X] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
    <div><img width="600" alt="image" src="https://user-images.githubusercontent.com/74370531/210990584-57fe2a8e-0549-4ba2-9a52-15da6e5323b2.gif"></div>
  - [X] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
    <div><img width="600" alt="image" src="https://user-images.githubusercontent.com/74370531/210990570-c4100486-ae1c-472b-8e51-01d3a541e586.gif"></div>
  - [X] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요
    <img width="400" alt="화면 캡처 2023-01-06 200422" src="https://user-images.githubusercontent.com/74370531/211000091-f3f8a717-8895-46d9-b2b5-7cfb5e81babc.png">

## 과제 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [X] 목록 / 상세 영역으로 나누어 구현해주세요
  - [X] Todo 목록을 볼 수 있습니다.
  - [X] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [X] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
  - [X] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [ ] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [ ] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다
