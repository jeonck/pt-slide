# 슬라이드 HTML 작성 규칙

720pt × 405pt 한 장이 파일 하나다. 아래는 slides-grab의 규칙과, 두 덱을 렌더해 보며 실제로 고쳐야 했던 것들이다.

## 뼈대

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title><슬라이드 제목></title>
<style>
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-Regular.woff2') format('woff2'); font-weight:400; font-display:block; }
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-SemiBold.woff2') format('woff2'); font-weight:600; font-display:block; }
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-Bold.woff2') format('woff2'); font-weight:700; font-display:block; }
  @font-face { font-family:'Pretendard'; src:url('./assets/fonts/Pretendard-ExtraBold.woff2') format('woff2'); font-weight:800; font-display:block; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:720pt; height:405pt; overflow:hidden;
    font-family:'Pretendard', 'Noto Sans KR', sans-serif;
    word-break:keep-all;
    background:<bg>; color:<text>;
    display:flex; flex-direction:column;
  }
</style>
</head>
<body>
  <!-- 내용 -->
</body>
</html>
```

`word-break: keep-all`은 한국어 슬라이드의 기본값이다. 없으면 어절이 줄 중간에서 쪼개진다(`오케스트` / `레이션`).

## 지켜야 하는 것

**텍스트는 의미 태그에만.** `p`, `h1`–`h6`, `ul`, `ol`, `li`. `div`나 `span`에 텍스트를 직접 넣지 않는다 — 배경·테두리는 `div`가, 글자는 의미 태그가 맡는다. PPTX 텍스트 엔진과 접근성이 여기에 의존한다.

**폰트 크기 하한.** 본문 14pt 이상, 어떤 텍스트도 **10pt 미만 금지**. 10pt 미만은 게이트에서 Critical이다. 실제로 스와치 라벨을 7.5pt로 뒀다가 전부 10pt로 올려야 했다. 캡션이 작아야 한다면 10pt가 바닥이다.

**색은 스타일 스펙에서만.** `show-design` 출력의 토큰을 쓴다. 중간에 새 hex를 지어내지 않는다. 조화색으로 확장해야 하면 어느 토큰 사이인지와 이유를 기록한다.

**그라디언트 금지.** 평면 채우기만 쓴다. 스펙이 그라디언트를 지정하면 첫 스톱을 평면으로 쓰고 그 사실을 기록한다.

**에셋은 로컬.** 이미지·비디오·폰트는 `<slides-dir>/assets/`에 두고 `./assets/<file>`로 참조한다. 저장된 HTML에 `http(s)://`가 남으면 안 된다. 자기완결이 필요하면 `data:` URL은 허용된다.

**아이콘은 Lucide 우선, 이모지는 브리프가 요구할 때만.**

**AI 슬롭 회피.** 전면 그라디언트 배경, 기본 컨테이너로 쓰는 둥근 카드 + 좌측 스트라이프, SVG로 그린 일러스트, 범용 폰트 스택(Inter/Roboto/Arial), 3×2 아이콘+설명 그리드. 좌측 스트라이프는 스펙이 의미를 부여한 곳(정보 콜아웃, 활성 단계, 위험 카드)에만 쓴다.

## 렌더해 봐야 드러나는 것들

### 세로 여백이 가운데 뻥 뚫린다

내용 블록이 위에, 콜아웃이 아래에 붙고 사이가 텅 비는 현상. `main`에 `justify-content: space-between`만 주면 이렇게 된다.

내용 컨테이너에 `flex: 1`을 줘서 남는 공간을 차지하게 한다. 열 구분 헤어라인이 전체 높이로 늘어나면 그 자체가 구조가 된다. 카드라면 `flex: 1`로 늘리고 안쪽 요소를 `margin-top: auto`로 바닥에 고정하면 여러 카드의 하단 줄이 정렬된다.

빈 공간을 **채워 넣을 내용을 지어내서** 메우지 않는다. 레이아웃과 스케일로 해결한다.

### 큰 제목의 디센더가 잘린다

`line-height: 1.05` 같은 빡빡한 행간은 validate에서 `text-clipped`로 잡힌다. 디스플레이 서체는 어센더가 커서 더 그렇다. 큰 제목은 **1.2 이상**, 디스플레이 서체를 쓰면 1.3 이상을 준다.

### 한 글자만 남는 낙수 줄

`keep-all`을 켜면 긴 어절이 통째로 다음 줄로 밀려 `만든다` / `기` 같은 줄이 생긴다. 해결 순서:

1. 의도한 구절 경계에 `<br>`을 직접 넣는다 (제목에 특히 효과적)
2. `text-wrap: balance`로 줄 길이를 고르게 한다
3. 텍스트 상자를 좁혀 줄당 글자 수를 줄인다
4. 자간·크기를 한 단계 줄인다 (하한 아래로는 안 된다)
5. 승인된 아웃라인 범위 안에서 문구를 줄인다

### 패널 안 글자가 사라진다

배경보다 훨씬 어둡거나 밝은 surface 위에 배경용 글자색을 쓰면 안 보인다. 패널 안에서는 그 패널 대비 판독 가능한 잉크를 따로 쓴다. 본문은 배경 대비 4.5:1, 보조 텍스트는 4:1을 기준으로 잡는다.

### 표·스와치 라벨이 겹친다

좁은 칸에 라벨을 여러 개 넣으면 서로 침범한다. 칸 수를 줄이거나 컨테이너에 `overflow: hidden`을 주고 `white-space: nowrap`으로 자른다.

## 차트

수치를 보여줘야 하면 Chart.js 실제 `<canvas>`를 쓴다. `div`로 만든 장식용 막대는 데이터가 아니다.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

`animation: false`, `responsive: true`, `maintainAspectRatio: false`. 캔버스는 크기가 고정된 컨테이너로 감싼다 — 레이아웃 박스나 드로잉 버퍼가 0이면 validate가 `empty-canvas`로 잡는다. 내보내기 전에 `build-viewer`로 iframe 안에서도 그려지는지 확인한다.

실제 데이터가 없으면 차트를 만들지 않는다.

## 다이어그램

복잡한 노드/엣지 다이어그램은 `slides-grab tldraw`로 에셋을 만들어 쓴다. 간단한 흐름도는 HTML 박스(의미 태그로 텍스트) + 커넥터만 인라인 SVG로 그리는 조합이 잘 맞는다 — 텍스트가 SVG 안으로 들어가지 않아 편집·검색이 살아 있다.
