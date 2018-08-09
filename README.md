# toy project 프론트엔드 (Vue.js Nuxt)

> toy project frontend part

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

***
### Nuxt -> Vue로 변경 (18.08.09)
> 브라우저에서의 애니메이션 처리로 인하여 Nuxt 프로젝트를 Vue로 변경하였습니다.
***
### Vue.js 배포 스크립트
```
#!/bin/bash

REPOSITORY=/home/ec2-user/frontend-vue // frontend 프로젝트가 들어가 있는 디렉터리 경로
cd $REPOSITORY/toy-frontend/ // frontend 프로젝트 디렉터리

echo "> Git Pull"
git pull

echo "> Npm Install"
npm install

echo "> 프로젝트 Build 시작"
npm run build

echo "> Build 파일 S3 배포"
aws s3 cp dist s3://bangshinchul.com --recursive
```
### Travis CI를 통한 frontend 프로젝트 자동배포 travis.yml 파일
```
// .travis.yml

language: node_js
node_js: 8

branches:
  only:
    - master

cache:
  directories:
    - '$HOME/node_modules'

script:
    - 'npm install'
    - 'npm run build'

before_deploy:

deploy:
  - provider: s3
    access_key_id: $AWS_ACCESS_KEY # Travis repo settings에 설정된 값
    secret_access_key: $AWS_SECRET_KEY # Travis repo settings에 설정된 값
    bucket: bangshinchul.com # 배포할 S3 버킷
    region: ap-northeast-2
    skip_cleanup: true
    acl: public_read
    local_dir: dist # npm run build 실행 후 생성된 dist 디렉터리의 내용들을 s3에 배포합니다.
    wait-until-deployed: true
    on:
      repo: BangShinChul/toy-frontend
      branch: master

# CI 실행 완료시 메일로 알람
notifications:
  email:
    recipients:
      - bsc0227@gmail.com

```
<br>
업데이트 사항
- 로그인 validation 기능 EventBus로 리다이렉팅 처리

***
<이전의 Nuxt 버젼>
### Nuxt.js에서 브라우저에서 모듈을 불러와야 할 때 
> 참고 : https://jason-awbrey.com/blog/creating-a-nuxt-plugin-get-past-window-undefined-issue-with-3rd-party-libraries/

***
1. plugins 디렉터리에 라이브러리를 로드할 js 파일을 만든다. 
  - vue-carousel 모듈을 예로 들어보자
  ```
  // ~/plugins/vue-carousel.js
  import Vue from 'vue'
  import VueCarousel from 'vue-carousel'
  Vue.use(VueCarousel)   
  ```
  ```
  // nuxt.config.js
  plugins: [
    {src: '~/plugins/vue-carousel.js', ssr: false}
  ],
  // plugins에서 만든 라이브러리 로드용 js 파일을 등록해준다.
  // ssr: false를 추가해주는 이유는 서버사이드 렌더링 시 라이브러리에 접근하는것을 막기 위해서.
  ...
  
  build: {
    vendor: ['vue-carousel'],
    // vendor에는 plugins에 만들어놓은 js에서 불러올 라이브러리를 추가해준다. - cache처리를 위함. 추가안해줘도됨.
    // (vue-carousel.js가 아니다. vue-carousel 라이브러리이다.)
  ...
  ```
  ```
  // vue-carousel 라이브러리를 사용할 .vue 파일
  // vue-carousel 라이브러리에서는 Carousel, Slide 두개의 컴포넌트를 제공한다.
  // 이 컴포넌트들을 components : {} 에 추가해줄 필요 없이 바로 사용할 수 있다.
  // 왜냐하면 해당 라이브러리는 전역으로 불러와지기 때문이다.(자세한 동작원리는 아직 이해가 안감)
  
  <template>
    <carousel per-page="1" loop="true">
      <slide>
        안녕하세요.
      </slide>
      <slide>
        반갑습니다.
      </slide>
    </carousel>
  </template>
  
  <script>
  export default {
    // components : { Carousel, Slide} <= 이런거 필요없다.X
    ...
  }
  </script>
  
  <style>
    ...
  </style>

  ```
***
### Nuxt.js App을 aws s3에 배포할 시
> aws ec2에서
1. git pull
2. npm build
3. npm generate
> s3 버킷에다가
4. npm generate해서 나온 dist 디렉터리 복붙(copy & paste)
```
$ aws s3 cp dist s3://bangshinchul.com --recursive
```
> Nuxt.js를 S3에 배포할 시 참고 : <br>
> https://medium.freecodecamp.org/deploy-a-nuxt-app-to-s3-in-5-minutes-515a161eb74f
