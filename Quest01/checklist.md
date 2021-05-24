# Quest 00. HTML과 웹의 기초
## HTML 표준의 역사는 어떻게 될까요?
- __HTML 1.0__ (1993)
    - `Tim Berners-Lee`에 의해 개발되었다.
    - 거의 텍스트 위주의 정보전달을 목적으로 사용되었다.
    - 문서용 마크업 언어인 `SGML`에서 웹에 알맞게 필요한 것만 정리한 것이다.
- __W3C__ (1994)
    - 웹의 표준을 정의하는 국제 컨소시엄으로 첫 프로젝트는 HTML 3.2였다.
    - 처음에 등장한 HTML이 사용자가 증가함에 따라 다양한 브라우저에서 표현할 수 있도록 하나의 표준을 정의하게 된다.
- __HTML 2.0__ (1995)
    - 1.0스펙에 조금 새로운 특징이 추가되었다.
- __HTML 3.2__(1997.1)
    - 여러 종류의 겹치는 확장 수학 수식을 완전히 제외 시키고 넷스케이프의 비주얼 마크업 태그의 대다수를 채택했다.
- __HTML 4.0__ (1997.12)
    - CSS로 디자인적인 요소를 구분하게 되고, HTML으로는 웹페이지의 전반적인 구조만을 명시한다.
    - W3C에서는 이제 HTML은 다양한 웹 페이지를 모두 표현하기에 기술적인 한계에 부딪혔다고 판단하고, 더 이상 HTML을 발전시키지 않을 것을 공표하게 된다.
- __WHATWG(Web Hypertext Application Technology Working Group)__ (2004)
    - W3C에서 XHTML을 표준으로 삼으려고 하자, 당시 Apple, Mozilla, Opera, MS등 대중적인 브라우저를 가지고 있던 기업들이 HTML을 계승하는 언어를 개발하기 위해 설립한 그룹이다.
- __HTML 5.0__ (2014)
    - 결국 W3C에서 XHTML을 포기하고 WHATWG에서 정의한 표준을 따르기로 하여 HTML5와 CSS3가 표준으로 확정된다.
    - 현재는 W3C와 WHATWG가 함께 표준을 정의하고 있다.
<br><br>

### HTML 표준을 지키는 것은 왜 중요할까요?
- HTML 표준을 지키지 않는다면 개발자 입장에서는 같은 서비스를 제공하기 위해 구현방법을 각각 다른 방식으로 구현해야하는 불편함이 있고, 사용자 입장에서는 익숙한 인터페이스가 제공되지 않기 때문에 불편함이 발생한다.
- 웹 브라우저 제조사와 웹 개발자가 공통된 약속을 마련하고 지킨다면 사용자가 어떤 환경에서 접속하든 같은 화면을 보여주고 정보와 의미를 전달할 수 있다.
<br><br>

### XHTML 2.0은 왜 세상에 나오지 못하게 되었을까요?
- W3C는 HTML에서 XHTML 2.0으로의 전환을 준비했다.
- WATHWG는 웹 브라우저 개발사 간 불명확했던 처리 방식을 재정의하고 웹 개발자들이 콘텐츠 중심의 웹 어플리케이션을 개발을 쉽게 하는 새로운 버전의 HTML 표준을 준비했다.
- 이후 W3C의 실패를 인정하게 되면서 HTML 5가 웹 표준으로 거듭나게 되었다.
<br><br>

### HTML5 표준은 어떤 과정을 통해 정해질까요?
1. __Working Draft__ (WD: 초안)
    - W3C가 그 멤버 뿐만 아니라 대중, 다른 기술단체 등 여러 커뮤니티에 검토를 받기 위해 공개한 문서이다.
    - Last Call 과정을 통해 대중들에게 코멘트를 받을 수 있는 마감기한을 제시하며 공개적으로 재검토를 요청한다.
1. __Candidate Recommendation__ (CR: 후보 권고안)
    - 광범위하게 검토를 받았고 워킹그룹의 기술적인 요구사항을 만족했다고 믿는 문서로, W3C는 더 많은 구현경험을 얻기 위해 이 문서를 공개한다.
    - 문서에 대한 내용을 실제로 구현한다.
1. __Proposed Recommendation__ (PR: 제안 권고안)
    - 광범위한 기술적인 구현과 검토가 끝난 거의 완성된 문서로, 최종 승인을 얻기 위해 자문위원회에 보낸다.
1. __W3C Recommendation__ (REC: 확정 권고안)
    - 모든 합의를 끝낸 후 W3C멤버들과 감독에게 승인을 받은 문서로, 이 문서가 널리 쓰이기를 권장한다.
<br><br><br><br>


## 브라우저의 역사는 어떻게 될까요?
- 1991년 `Tim Berners-Lee`가 최초의 웹 서버와 `WorldWideWeb`이라는 최초의 웹 브라우저를 개발했으며, 나중에 `Nexus`로 이름이 변경되었다.
- 1993년 최초의 그래픽 브라우저인 `NCSA Mosaic`에 의해 웹의 인기가 급증했다.
- 1994년 NCSA Mosaic 팀 리더였던 Marc Andreesseen가 `Netscape`를 설립해 Navigator을 출시했다.
- 1995년 Microsoft(MS)가 `Internet Explorer(IE)`를 출시하며 `브라우저 전쟁`이 시작되었다.
- 1990년대 후반, Netscape의 브라우저가 압도적으로 점유율이 높았으나, MS는 브라우저와 운영체제를 통합하고 OEM과 번들링을 시작하며 99%의 점유율을 차지한다.
- Netscape는 자금난으로 인해 자사 제품을 오픈소싱하여 `Mozilla`를 만들었으며 1998년 말 Americal Online(AOL)에 매각된다.
- 2003년 Apple은 Macintosh에서 사용할 `Safari`를 출시했으며 v10.3부터 Mac OS X의 기본 브라우저로 사용되었다..
- 2007년 Apple은 `Mobile Safari`를 출시했다.
- 2008년 Google은 `Chrome` 브라우저를 출시했다.
<br><br>


### Internet Explorer가 브라우저 시장을 독점하면서 어떤 문제가 일어났고, 이 문제는 어떻게 해결되었을까요?
- MS의 자만으로 릴리즈 주기가 매우 길어졌고 그에 따라 다양한 문제가 발생했다.
    - 기능이 적다.
    - 웹 표준을 어긴다. 
    - 지나치게 무겁고 느리다.
    - 버그 수정이 굉장히 느리다.
- 국내에서는 IE의 점유율이 높았기 때문에 IE 이외의 웹 브라우저에 대한 호환성을 전혀 고려하지 않고 ActiveX나 비표준 코드를 사용해 개발하는 경우가 많았다.
- 위의 문제들은 모바일 브라우저의 등장과 Chrome, Safari 등 다른 브라우저의 점유율이 올라가며 해결되었다.
```
ActiveX?
실행 바이너리를 패키징하여 다른 프로그램에서 쉽게 사용할 수 있도록 객체지향적 인터페이스를 만드는 기술이다.
자동 설치, 샌드박스 기능 미적용, 크로스 플랫폼 미지원(심지어 같은 Windows 계열인 Mobile, Phone, RT에서는 사용 CPU가 다르기 때문에 사용할 수 없다), 성능 저하, 보안문제 등 여러 문제를 발생시켰다.
```
<br>

### 현재 시점에 브라우저별 점유율은 어떻게 될까요? 이 브라우저별 점유율을 알아보는 것은 왜 중요할까요?
- 2021.04 국내 기준 (PC, Mobile, Tablet 포함)
    - 크롬: 52.78%
    - 삼성 인터넷: 14.13%
    - 사파리: 13.07%
    - 웨일: 7.63%
    - 엣지: 5.5%
    - IE: 3.78%
- 웹 브라우저마다 랜더링 엔진이 다르고, 버전간의 호환성을 따져야 하기 때문에 점유율이 중요하다.
<br><br>

### 브라우저 엔진(렌더링 엔진)이란 무엇일까요? 어떤 브라우저들이 어떤 엔진을 쓸까요?
- __브라우저 엔진__
    - HTML문서 및 웹 페이지의 기타 리소스를 사용자 장치에서 상호작용적인 시각 표현으로 변환시키는 것
- __WebKit__
    - Apple에서 패키지로 제공하는 엔진으로 `Safari, OmniWeb, Chrome(v27이하)`이 사용한다.
- __Blink__
    - WebKit에서 파생된 엔진으로 `Chrome(v28이상), Edge, Opera`가 사용한다.
- __Gecko__
    - Mozilla 재단에서 만든 엔진으로 `Firefox, Mozilla, ThunderBird`가 사용한다.
- __Trident__
    - MS에서 만든 엔진으로 `IE, Outlook Express`가 사용한다.
<br><br>

### 모바일 시대 이후, 최근에 출시된 브라우저들은 어떤 특징을 가지고 있을까요?
- 가볍고 빠르다.
- 결제수단 저장
- 제스처 인식
- 데이터 절약
- 개인정보 보호
- 광고 콘텐츠 차단
<br><br><br>


## HTML 문서는 어떤 구조로 이루어져 있나요?
- `<DOCTYPE html>`: 페이지에 쓸 언어를 지정한다. 이 경우, HTML5을 사용한다.
- `<html>`: 여기서부터 HTML 코드로 작성할 것을 선언한다.
- `<head>`: 이 페이지의 모든 메타 데이터가 있는 곳으로, 대부분 검색 엔진 및 기타 컴퓨터 프로그램을 위한 것이다.
- `<body>`: 페이지의 내용이 있는 곳이다.
<br><br>

### `<head>`에 자주 들어가는 엘리먼트들은 어떤 것이 있고, 어떤 역할을 할까요?
- `title`: 브라우저의 창이나 탭의 상단에 표시되는 페이지 이름을 삽입한다.
- `meta`: character encoding, name (page context), description 등 문서에 대한 정보가 저장된다.
- `style`: Javascript나 CSS파일을 삽입한다.
<br><br>

### 시맨틱 태그는 무엇일까요?
- `<header>, <table>` 태그처럼 역할 또는 의미를 명확하게 가지고 있는 태그다.
- div(non-semantic) <-> header, footer(semantic)
<br><br>

### 시맨틱 엘리먼트를 사용하면 어떤 점이 좋을까요?
- 태그의 역할이 명확하기 떄문에 개발자가 HTML 코드를 분석할 때 용이하다.
- 컴퓨터가 사람을 대신하여 정보를 읽고, 이해하고 가공하여 새로운 정보를 만들어 낼 수 있다.
- 검색사이트에서 어디가 어떤 내용인지를 알 수 있어서 검색 노출을 용이하게 한다.
- 시각장애인에게 사이트의 어디가 본문인지 알려줄 수 있다는 장점이 있다.
<br><br>

### `<selction> 과 <div>, <header>, <footer>, <article>` 엘리먼트의 차이점은 무엇인가요?
![body영역의 구조](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile24.uf.tistory.com%2Fimage%2F2259F94D5651731A0FAB3C)
- __div__
    - 섹션을 식별하고 그룹화하는 non-sematic한 태그
- __header__
    - `<body>`영역의 머리말, 제목 등을 표현해 탐색이 되는 컨테이너
- __selction__
    - `<body>`영역의 본문 콘텐츠를 담고있는 컨테이너
- __article__
    - 블로그 게시물 또는 기술 문서와 같은 재사용 및 신디케이션에 적한합 컨텐츠 블록
- __footer__
    - `<body>`영역의 화면의 구조 중 제일 아래에 위치하며 탐색링크, 맨 위로 돌아가는 링크, 회사소개, 저작권, 약관, 제작정보 등을 담고있는 컨테이너
- __nav__
    - 콘텐츠를 담고 있는 문서를 사이트간에 서로 연결하는 링크의 역할을 담당하는 태그로, 주로 메뉴에 사용되며 위치에 영향을 받지 않아 어디에서든 사용 가능
- __aside__
    - 본문 이외의 내용을 표시하는 사이드바 영역으로, 주로 광고나 링크 등으로 구성되며 메인 내용에 영향을 미치지 않는 내용으로 구성
<br><br>

### 블록 레벨 엘리먼트와 인라인 엘리먼트는 어떤 차이가 있을까요?
- __인라인 레벨 엘리먼트__
    - 콘텐츠의 흐름을 끊지 않고 할당된 공간만 사용하기 떄문에 줄바꿈이 되지 않는다.
- __블록 레벨 엘리먼트__
    - 사용시 자동으로 줄 바꿈이 된다.
    - 인라인 태그의 상위 구조이기 때문에 인라인, 인라인 레벨 엘리먼트를 포함할 수 있다.
<br><br><br>


# Quest
### 화면을 구성하는 큰 요소들을 어떻게 처리하면 좋을까요?
- 시맨틱 엘리먼트를 사용해 용도에 맞게 구획을 나눈다.
### HTML 문서상에서 같은 층위에 비슷한 요소들이 반복될 때는 어떤 식으로 처리하는 것이 좋을까요?
- `<ul>, <ol>, <li>` 을 사용해서 리스트로 출력한다.
<br><br><br>


# Advanced
### XML은 어떤 표준일까요? 어떤 식으로 발전해 왔을까요?
### YML, Markdown 등 다른 마크업 언어들은 어떤 특징을 가지고 있고, 어떤 용도로 쓰일까요?
<br><br><br>


# 개인 노트
## HTML의 구성요소
- 태그와 속성으로 이루어져 있다.
- __태그__
    - HTML 요소의 시작을 표시하는데 사용되며 일반적으로 꺽쇠 괄호로 묶여 있다.
    - 대부분의 태그가 작동하려면 열리고 닫혀야 한다.  
        `<h1> 제목 </h1>`
- __속성__
    - 여는 태그의 내부에 배치되어 태그의 속성을 변경한다.  
        `<img src="tmp.png" alt="Test Image"> 의 경우 srt, alt는 <img>의 속성`


## Chromium?
- 크로미움이라는 오픈소스 프로젝트에서 만든 브라우저이다.
- 크로미움에 여러가지 기능 및 요소를 추가하여 탄생한 것이 바로 크롬이다.
- 구글에서 2008년 9월에 시작한 오픈소스 프로젝트이기 때문에 구글 직원이 아닌 사람들도 참가할 수 있다.