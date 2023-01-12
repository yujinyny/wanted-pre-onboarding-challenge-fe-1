# 본인 소개

안녕하세요, 프론트엔드 개발자 홍유진입니다. ☺️

# 프로젝트 소개

원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제입니다.

[🔗 API](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)

## ⛏️ 기술 스택

- React
- React Router
- Recoil
- styled-components
- axios

## ♻️ 개선 사항

### [1회차] 23.01.10 ~ 23.01.12

- 프로젝트 구조 리팩토링 (관심사 분리)
- 변수, 함수명 변경
- axios Instance 생성
- TypeScript 적용

## ✅ 과제

### 1 - Login / SignUp

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
  - [X] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
  <div><img width="200" alt="image" src="https://user-images.githubusercontent.com/74370531/211027171-d2d8819b-1a9d-4633-bb72-8e3eb0fb67e4.png">
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/74370531/211027215-4c579112-23f6-4cf9-9793-923edb71e9f8.png"></div>
- 이메일과 비밀번호의 유효성을 확인합니다
  - [X] 이메일 조건 : 최소 `@`, `.` 포함
  - [X] 비밀번호 조건 : 8자 이상 입력
  - [X] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
  <div><img width="200" alt="image" src="https://user-images.githubusercontent.com/74370531/211051144-02b7780f-5a7a-4068-a09c-5dd99d25f566.gif">
  <img width="200" alt="image" src="https://user-images.githubusercontent.com/74370531/211033495-8c30af61-3f2d-4963-acfd-7e8ccd1decf4.gif"></div>
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [X] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211034324-b6bda3f7-7621-4cea-8c6e-e896165f0c34.gif"></div>
  - [X] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211034344-7af46e13-237a-4822-a15c-0df49adce2b9.gif">
    <img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211034554-f35fee95-6b4d-488b-8b66-753e74153b39.png"></div>
  - [X] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211034473-a7479e3c-61e9-4167-809d-70f76577c9f0.png"></div>

### 2 - Todo List

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [X] 목록 / 상세 영역으로 나누어 구현해주세요
  - [X] Todo 목록을 볼 수 있습니다.
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211032401-359484c5-b8d3-4ebc-9ecc-b4c77bcfee13.png"></div>
  - [X] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211033819-15344524-4833-4a1e-bff6-6fbaa6b821ad.gif"></div>
  - [X] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211033837-665559e9-b511-4d0d-9444-9c993a66dfa8.gif"></div>
  - [X] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211033860-0f1afbb2-8c1f-4d98-9930-f7184b13d92e.gif"></div>
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [X] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [X] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
    <div><img width="400" alt="image" src="https://user-images.githubusercontent.com/74370531/211051330-5bc10d4a-3bc7-457c-bce9-bab3a5a95202.gif"></div>
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
  - [X] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다
