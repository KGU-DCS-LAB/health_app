# 헬스케어 : Health Care

경기대학교 분산병렬컴퓨팅시스템연구실 KGU-DCS-LAB

## 설치 경로

프로젝트는 반드시 C드라이브의 KGU-DCS-LAB 폴더에 clone합니다.

    C://KGU-DCS-LAB

## 사용 가능한 명령어

프로젝트에서 사용이 가능한 대표적인 명령어는 다음과 같습니다.

모든 명령어는 Terminal에서 사용이 가능합니다.

> Terminal의 기본 조작 방법은 리눅스의 Terminal과 유사합니다.

    1. 터미널 접근
        cd (경로)
    2. 터미널 뒤로가기
        cd ..
    3. 터미널에서 실행 상태를 종료
        Ctrl + C
    4. 터미널 내용 복사하기
        마우스로 드래그 한 다음 Ctrl + C
    5. 복사한 텍스트를 터미널에 붙여넣기
        마우스 우클릭


### `npm start`
> **Note: 아래 `install 명령어`를 먼저 실행할 필요가 있을 수도 있습니다.**

이 프로그램을 실행하게 합니다.
실행에 성공하면 EXPO가 자동으로 실행됩니다.

EXPO는 Android나 iOS에 설치 후 스마트폰에서 직접 실행이 가능합니다.

이 프로젝트를 수정하고 저장하면 자동으로 리로딩이 됩니다.
오류가 발생하면 터미널 콘솔창에 찍힙니다. (터미널에 찍히지 않는 경우에는 웹 브라우저에서 확인)

    부가 옵션으로 cache를 초기화 하면서 실행하는 방법이 있습니다.
    npm start --reset-cache
    분명 코드가 잘 들어갔고, 아무리 생각해도 문제가 없음에도 불구하고 오류가 발생하면 위 명령어로 실행하는 방법이 있습니다.


### `npm install`

> **Note: 패키지 변화가 없으면 매번 작업을 할 필요가 없습니다.**

package.json에 있는 npm 설치 이력을 토대로 본인 컴퓨터에 패키지를 자동으로 설치합니다.
이 작업은 평소에 할 필요가 없지만, 누군가가 새 패키지를 설치하는 경우 다른사람들이 모두 해줘야 합니다.

    부가 옵션으로 과거 버전의 패키지를 설치하는 방법이 있습니다.
    npm install --legacy-peer-deps
    패키지 설치 시 더이상 과거 버전을 지원하지 않는다거나 권장하지 않는다고 설치를 거부하는 경우 레거시 버전을 설치하는 방법입니다.

    만약 위 명령어로도 설치가 불가능하면
    npm install --force
    강제로 설치하는 명령어도 있습니다.

## 실행 방법

client 폴더와 server 폴더를 각각 패키지 설치 후 실행합니다.

## Client 프로젝트 구조

이 프로젝트에서 사용하는 구조는 다음과 같습니다.

    src
     |-components
     |-routes
     |-views

- components

재사용이 가능한 형태의 요소를 모아두는 폴더. view에서 자주 사용하는 공통 요소들을 모아놓는다.

- routes

React Native Navigatior에 관련된 코드

- views

routes에 삽입할 view를 모아놓는 폴더


## 더 알아보기

이 프로젝트에는 여러 가지 패키지(라이브러리)가 추가로 적용된 상태입니다.

일부 패키지는 자동으로 설치되지 않거나, 기본적인 프로그램 설치 환경을 요구합니다.

### puppeteer 관련 설치 팁

`Visual Studio` 관련

    반드시 Visual Studio에서 C++ 개발 환경을 선택한 후 설치해야 합니다.


`Chromium` 관련

> Error: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (961656).
    at ChromeLauncher.launch (C:\KGU-DCS-LAB\health_app\server\node_modules\puppeteer\lib\cjs\puppeteer\node\Launcher.js:104:23)
    at async getHTML (C:\KGU-DCS-LAB\health_app\server\routes\news.js:11:25)
[nodemon] app crashed - waiting for file changes before starting...

    health_app\server\node_modules\puppeteer> 에서 npm install로 크로미움 설치
