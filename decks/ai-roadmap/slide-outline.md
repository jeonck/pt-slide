# Architecture styles: what actually tells them apart — 슬라이드 아웃라인

## meta
- deck: decks/ai-roadmap
- mode: html
- style: `ppt-strategy-navy-deck` (bundled)
- slide-size: 720pt × 405pt
- language: English
- audience: 아키텍처 결정을 내리는 개발·플랫폼 리드
- tone: 전략 컨설팅 익스히빗 — 액션 타이틀이 결론을 말하고 아래 모듈이 근거를 댄다
- slides: 6 (첫 장 커버, 마지막 장 마무리)
- charts: **없음.** 출처를 댈 수 있는 수치가 없다. 비교는 표로 하고 숫자는 쓰지 않는다
- fonts: PT Serif 400/700 + Inter 400/500/600/700 로컬 임베드

## 폴더 이름에 대하여

사용자가 `decks/ai-roadmap`을 지정했다. 주제(아키텍처 스타일 구분 기준)와 이름이 맞지 않지만
경로는 지정받은 그대로 쓴다.

## 디자인 토큰 (show-design)

- bg `#FFFFFF` · surface `#F1F4F9` · text `#14213D` · muted `#5B6472`
- accent `#2563EB` · navy `#14213D` · border `#C7D0DD`
- 규칙: **두 가지 블루와 회색만.** 다른 색 없음. radius 0, shadow 없음
- 액션 타이틀은 라벨이 아니라 **완결된 결론 문장**이고 그 아래 1px 헤어라인
- source_caption은 오른쪽 아래 고정

## 비주얼 테제

한눈에 컨설팅 익스히빗. 모든 시트가 위에서 결론을 말하고 아래에서 증명한다. 색은 위계에만 쓰고
장식에는 쓰지 않는다 — 시트당 액센트는 한 곳뿐.

## 콘텐츠 플랜

라벨(모놀리스/마이크로서비스)이 구분 기준이 아니라는 데서 출발해, 실제로 스타일을 가르는 네 가지
질문을 세우고, 그 질문으로 다섯 스타일을 나란히 놓고, 라벨과 답이 어긋나는 경우를 보여준 뒤,
우리가 답해야 할 것으로 닫는다.

## 두 축 예산

- **세로** — `body` 패딩 26/32(하단 32pt는 파워포인트 안전 여백 때문. 아래 참고).
  상단 kicker + 액션 타이틀 + 1px 헤어라인 + `main`(flex:1) + 하단 소스 캡션.
- **가로** — 액션 타이틀은 **한 줄이어야 한다.** 감기면 헤어라인이 시트마다 다른 높이에 놓여
  이 스타일의 "strict grid"가 무너진다. 계수는 추정하지 않고 `references/slide-html.md`의
  계측 스니펫으로 잰다.

## PPTX 규칙을 처음부터 지킨다

이 저장소가 뒤늦게 20개 덱을 고쳐야 했던 항목들이다. 이 덱은 처음부터 지킨다.

1. `<header>`·`<footer>` 태그를 쓰지 않는다 — 엔진이 서브트리를 통째로 버린다
2. 모든 글자는 `<p>`·`<h1>`~`<h6>`·`<ul>`·`<ol>` 안에. `<p>` 밖의 `<span>` 글자도 사라진다
3. 텍스트 요소에 border·background·shadow를 걸지 않는다 — 래퍼 `<div>`가 갖는다
4. `<li>` 안에 블록 요소를 넣지 않는다 — 리스트와 문단이 각각 상자가 되어 겹쳐 그려진다
5. `<div>` 배경 이미지 금지, 인라인 요소 margin 금지
6. 최하단 텍스트는 바닥에서 30pt 이상 (파워포인트 0.5in 안전 여백)

---

## slide-01 — 커버
- 레이아웃: 좌측 큰 세리프 제목 + 리드 문장, 하단 메타 3열
- 핵심 메시지: 스타일을 가르는 것은 이름이 아니라 네 가지 질문에 대한 답이다

## slide-02 — 라벨은 결정이 아니다
- 액션 타이틀: The label names a deployment shape, not a design decision
- 근거 3모듈: 같은 이름이 다른 것을 가리킨다 / 다른 이름이 같은 것을 가리킨다 / 이름은 결과지 기준이 아니다

## slide-03 — 실제로 가르는 네 질문
- 액션 타이틀: Four questions separate every style you will actually meet
- 4모듈: 배포 단위 / 데이터 소유 / 호출 방향 / 실패 반경. 각 모듈에 "묻는 것"과 "답이 갈리는 지점"

## slide-04 — 같은 질문, 다섯 스타일
- 액션 타이틀: The same four answers place any codebase on the map
- 5×4 비교 표. 액센트는 한 칸에만

## slide-05 — 라벨과 답이 어긋날 때
- 액션 타이틀: When the label and the answers disagree, the answers are right
- 3모듈: 분산 모놀리스 / 공유 DB 마이크로서비스 / 모듈러 모놀리스라 부르는 큰 진흙공

## slide-06 — 마무리
- 액션 타이틀: What we need to answer before we name our style
- 3개 결정 + 마무리 한 줄
