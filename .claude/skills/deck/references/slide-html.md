# 슬라이드 HTML 작성 규칙

720pt × 405pt 한 장이 파일 하나다. 아래는 slides-grab의 규칙과, 이 저장소의 덱들을 렌더해 보며 실제로 고쳐야 했던 것들이다.

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
도트 그리드·해치 같은 **패턴 배경**은 흔히 `radial-gradient`로 만들지만, 그것도 그라디언트다.
data-URI SVG 타일을 `background-image`로 깔면 같은 결과를 그라디언트 없이 얻는다 — 타일 하나를
base64로 인코딩해 붙이면 이스케이프 문제도 없다.

**폰트는 그 덱의 언어와 스타일이 정한다.** 한국어 덱은 Pretendard(`scripts/new-deck.mjs`가 넣어준다).
영어 전용 덱이면 Pretendard 4종 3MB는 죽은 무게이니 지우고, **스타일 스펙이 지정한 서체**를 npm
`@fontsource/<face>`로 받아 임베드한다. 스펙이 Inter를 지정하면 Inter를 쓴다 — 범용 폰트 스택 금지
규칙은 "스타일이 지정한 서체"를 예외로 두고 있고, 게이트도 그렇게 판정한다.

**에셋은 로컬.** 이미지·비디오·폰트는 `<slides-dir>/assets/`에 두고 `./assets/<file>`로 참조한다. 저장된 HTML에 `http(s)://`가 남으면 안 된다. 자기완결이 필요하면 `data:` URL은 허용된다.

**아이콘은 Lucide 우선, 이모지는 브리프가 요구할 때만.**

**AI 슬롭 회피.** 전면 그라디언트 배경, 기본 컨테이너로 쓰는 둥근 카드 + 좌측 스트라이프, SVG로 그린 일러스트, 범용 폰트 스택(Inter/Roboto/Arial), 3×2 아이콘+설명 그리드. 좌측 스트라이프는 스펙이 의미를 부여한 곳(정보 콜아웃, 활성 단계, 위험 카드)에만 쓴다.

## 높이 예산 — 쓰기 전에 계산한다

**`validate`가 못 잡는 가장 흔한 결함이 여기서 나온다.** 스타일에 고정 furniture(우하단 타이틀 블록,
하단 액센트 밴드, 헤더바)가 있으면, `main`을 넘친 콘텐츠가 그 아래로 조용히 깔린다. `validate`는
형제끼리 겹칠 때만 `sibling-overlap`을 내는데, 이건 **자식이 부모를 넘친 것**이라 통과해 버린다.
렌더를 열어보기 전까지 알 수 없고, 열어봐도 "왜 겹치지?"에서 한참 헤맨다.

그래서 슬라이드를 쓰기 전에 산수를 먼저 한다.

```
사용 가능 높이 = 405
  − body padding(top + bottom)
  − 고정 furniture 높이 + 그 margin
= main 이 실제로 쓸 수 있는 높이
```

그다음 각 블록의 높이를 더해 본다. `font-size × line-height × 줄 수 + padding + margin`.
**합이 예산을 넘으면 넘친 만큼 furniture 위로 올라탄다.** 예산에 맞을 때까지 조정한다.

조정 순서 — 위에서부터 시도한다:

1. **카피를 줄인다.** 줄 수가 예산을 정한다. 한 줄만 줄여도 20pt가 빈다.
2. **여백을 줄인다.** margin·padding은 몇 pt씩 회수된다.
3. **블록을 옮긴다.** 하단 노트를 제목 밑 서브라인으로 올리면 furniture와 부딪힐 일 자체가 없어진다.
4. **타입 크기는 마지막에도 건드리지 않는다.** 본문 14pt / 절대 10pt 하한 아래로는 내려가지
   않는다. 카피를 크기에 맞추는 것이지, 크기를 카피에 맞추는 게 아니다.

### `flex:1` / `1fr`은 콘텐츠보다 작아지지 않는다

`min-height: auto`가 기본이라, 플렉스 아이템과 그리드 트랙은 내용의 최소 높이 아래로 줄지 않는다.
`main`에 `flex:1; min-height:0`을 줘도 **자식들은 여전히 넘친다.** 카드 하나에서 한 줄이 더 감기면
그리드 전체가 그만큼 아래로 밀린다.

- 그리드 트랙: `grid-template-rows: minmax(0,1fr) minmax(0,1fr)`
- 그래도 근본 해법은 트랙이 감당할 만큼 콘텐츠를 줄이는 것이다. `minmax(0,1fr)`은 넘침을 잘라낼 뿐
  읽히게 만들지는 않는다.

### 감기면 안 되는 줄은 글자 수로 예산을 잡는다

세로 예산이 맞아도 **가로에서 감기면** 같은 결함이 난다. 한 줄로 있어야 할 제목이 두 줄이 되면
그 아래 furniture가 통째로 내려가고, 시트마다 다른 높이에 놓인다.

컨설팅 그리드 스타일에서 실제로 그랬다. 액션 타이틀 아래 1px 헤어라인 룰이 **모든 시트에서 같은
y에 있다는 것**이 그 스타일의 "엄격한 그리드"의 전부인데, 일곱 장 중 네 장의 타이틀이 두 줄로
감기면서 룰이 제각각 내려갔다. `validate`도 통과하고 세로 예산도 통과한다 — 헤더에는 자리가 있었으니까.

한 줄을 강제해야 하는 것들:

- 그 아래 furniture의 y를 결정하는 제목 (액션 타이틀, 헤더바 타이틀)
- 가로로 늘어서는 파이프라인·타임라인의 스테이지 라벨
- 표의 열 머리

**글자 수 예산**은 이렇게 잡는다:

```
한 줄에 들어가는 글자 수 ≈ 사용 가능 폭 ÷ (font-size × 계수)
```

폭 656pt에 20pt, 계수 0.48이면 약 68자. 여유를 두어 **66자 이하**로 쓴다.

#### 사용 가능 폭은 박스 폭이 아니다

좌우 패딩, 보더, 불릿 점의 들여쓰기를 **전부 뺀** 값이다. CI 덱은 176pt 카드의 불릿 예산을
176pt로 잡았다가 점 들여쓰기 11pt를 빼먹었다. 실제 폭은 165pt였고, 12pt에서 한계는 28자가
아니라 25자였다 — 아홉 개 중 두 개가 감기면서 3열 그리드가 어긋났다.

#### 계수는 서체가 아니라 **문자열**의 성질이다

이 저장소의 덱에서 실제 액션 타이틀을 재서 나온 값:

| 서체 | 문자열 | 계수 |
|---|---|---|
| Space Grotesk 700 | `Three failures, none of them technical` | 0.471 |
| Archivo 800 | `Three ways to replace a running version` | 0.485 |
| Inter 600 | `What CI answers on every commit` | 0.519 |
| Archivo Black 900 | `Make one path the only path` | 0.550 |

여기까지만 보면 서체별 표로 정리하고 싶어진다. 그런데 **같은 서체, 같은 크기**에서 문자열만 바꾸면
이렇게 된다 (Archivo Black 900):

| 문자열 | 계수 |
|---|---|
| `It it lit till` | 0.347 |
| `Make one path the only path` | 0.550 |
| `READ-ONLY BY DEFAULT` | 0.661 |
| `WWWWWWWWWW` | 0.973 |

같은 서체 안에서 두 배 가까이 벌어진다. 특히 **대문자 라벨은 혼합 대소문자 산문보다 한참 넓다** —
0.55로 잡은 예산에 0.661짜리 문자열을 넣은 것이 IaC 덱에서 `READ-ONLY BY DEFAULT`가 200pt 셀에
210pt를 요구한 이유다. 라벨이 감기자 원장 행이 전부 커지고 닫는 문장이 하단 룰 아래로 깔렸는데
`validate`는 5/5를 찍었다.

그래서:

- **0.48은 영문 혼합 대소문자 산문의 출발점일 뿐이다.** 배포 전략 덱은 Inter를 0.50으로 잡았다가
  마무리 슬라이드 질문 하나만 네 줄로 감겨서 세 블록이 한 세트로 읽히지 않게 됐다. 실측은 0.52다.
- **대문자 라벨·배지·열 머리는 따로 잰다.** 산문 계수를 그대로 쓰면 20~30% 과소평가한다.
- **한글은 계수 영역이 다르다.** Pretendard 실측:

  | | 계수 |
  |---|---|
  | 순한글 본문 14pt | 0.70 – 0.72 |
  | 한글 + 영문·괄호 혼합 14pt | 0.63 – 0.66 |
  | 한글 제목 28pt | 0.725 |

  영문의 0.48을 한글에 쓰면 폭을 **40% 넘게 과소평가한다.** 혼합 문자열이 순한글보다 좁은 것은
  공백·괄호·영문이 좁기 때문이고, 글자 수에 그것들이 함께 세어지기 때문이다. 그래서 한글에서도
  "이 서체는 0.71"로 끝내지 말고 실제 문자열을 잰다.
- 샘플 문자열로 재지 않는다. `I`와 `W`는 같은 글자가 아니다 — 슬라이드에 **실제로 들어갈 그
  문자열**을 잰다.

#### 재는 법

폭이 아슬아슬한 줄은 계산하지 말고 이걸로 잰다. 저장소 루트에서 실행한다(`playwright`가
`node_modules`에 있다):

```js
// _measure.mjs — 실제 문자열의 실제 폭. 다 쓰면 지운다.
import { chromium } from 'playwright';
const [file, sel] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + file);
console.log(await p.evaluate((sel) => {
  const el = document.querySelector(sel);
  const cs = getComputedStyle(el);
  const probe = document.createElement('span');
  probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;
    font:${cs.font};letter-spacing:${cs.letterSpacing}`;
  const text = el.textContent.trim();
  probe.textContent = text;
  document.body.appendChild(probe);
  const needs = probe.getBoundingClientRect().width;
  probe.remove();
  const par = getComputedStyle(el.parentElement);
  const avail = el.parentElement.clientWidth
    - parseFloat(par.paddingLeft) - parseFloat(par.paddingRight);
  const pt = (px) => +(px / (4 / 3)).toFixed(1);
  return { text, chars: text.length, needs_pt: pt(needs), avail_pt: pt(avail),
           coef: +(needs / (parseFloat(cs.fontSize) * text.length)).toFixed(3) };
}, sel));
await b.close();
```

```bash
node ./_measure.mjs $PWD/decks/<name>/slide-04.html h2
```

두 가지를 조심한다:

- **`getBoundingClientRect()`는 px를 준다.** 이 캔버스는 pt로 짜여 있으므로 4/3으로 나눠야 스펙과
  같은 단위가 된다. 그냥 비교하면 33% 여유가 있는 것처럼 보인다.
- **재려는 요소의 `clientWidth`를 쓰지 않는다.** 제목이 inline-block이나 flex 아이템이면 폭이
  내용에 맞춰지므로 언제나 "딱 맞음"으로 나온다. **부모의** 콘텐츠 폭에서 패딩을 뺀 값이 실제
  예산이다.

- **빈 페이지에서 재지 않는다. 이 함정은 조용하다.** `page.setContent()`로 만든 문서는 origin이
  `about:blank`라 `file://` `@font-face`가 로드되지 않는다. `@font-face`를 선언해 넣어도, 그 페이지에서
  아직 아무도 그 서체를 쓰지 않으면 로드가 시작조차 안 된다. 둘 다 `document.fonts.ready`는 **그대로
  resolve된다** — 대기 중인 폰트가 없으니까. 그래서 오류 하나 없이 **폴백 서체를 잰다.**

  덱 세 개가 각자 독립적으로 여기 빠졌고, 값이 8~20% 좁게 나왔다. 안전하다고 판정된 문자열들이 렌더에서
  감겼고, 셋 다 렌더를 열어보고 나서야 알았다. 위 스니펫처럼 **실제 슬라이드 파일로 `goto`** 한다.
  프로브 페이지를 따로 만들어야 한다면 파일로 저장해서 `goto`하고, 재기 전에 가드를 건다:

  ```js
  const size = getComputedStyle(el).fontSize;
  for (const fam of ['Inter', 'SourceSerif4']) {          // 실제로 쓰는 서체
    if (!document.fonts.check(`${size} ${fam}`)) throw new Error(`${fam} 미로드 — 측정 무효`);
  }
  ```

  폴백 수치를 조용히 돌려주느니 던지는 편이 낫다.

슬라이드가 아직 없으면 같은 `@font-face`·폰트 크기를 넣은 임시 HTML **파일**을 만들어 그 파일로
`goto` 해서 잰다. 어느 쪽이든 추정으로 끝내지 말고, 마지막에는 렌더 이미지에서 실제로 한 줄인지
눈으로 확인한다.

넘치면 **제목을 줄인다.** 한 줄에 안 들어가는 액션 타이틀은 대개 주장이 두 개다 — 하나로 줄이면
문장도 좋아진다. 타입을 줄이거나 감기게 두는 것은 답이 아니다.

> `header { height: 54pt }`처럼 높이를 고정해도 보호되지 않는다. 넘친 콘텐츠는 잘리는 게 아니라
> **고정 박스 밖으로 흘러나온다.** 고정 높이는 의도를 적어두는 것이지 강제하는 장치가 아니다.

### 한 축을 고치면 다른 축이 터진다

세로로 감기는 걸 `white-space: nowrap`으로 막으면 그 줄이 가로로 길어져 프레임 밖으로 나간다.
한쪽을 막았으면 반대 축을 다시 확인한다 — 파이프라인 뒤에 붙인 라벨을 nowrap으로 고정했더니
오른쪽으로 잘려 나가서, 결국 파이프라인 **아래 줄**로 내렸다.

## 렌더해 봐야 드러나는 것들

### 하단 요소가 고정 furniture 아래로 깔린다

위의 높이 예산 섹션을 보라. `validate`는 통과하는데 렌더에서만 보이는 결함이라, 렌더 확인을
건너뛰면 그대로 나간다.

### 세로 여백이 가운데 뻥 뚫린다

내용 블록이 위에, 콜아웃이 아래에 붙고 사이가 텅 비는 현상. `main`에 `justify-content: space-between`만 주면 이렇게 된다.

내용 컨테이너에 `flex: 1`을 줘서 남는 공간을 차지하게 한다. 열 구분 헤어라인이 전체 높이로 늘어나면 그 자체가 구조가 된다. 카드라면 `flex: 1`로 늘리고 안쪽 요소를 `margin-top: auto`로 바닥에 고정하면 여러 카드의 하단 줄이 정렬된다.

빈 공간을 **채워 넣을 내용을 지어내서** 메우지 않는다. 레이아웃과 스케일로 해결한다.

### 빡빡한 행간은 글자를 자른다 — 큰 제목만이 아니다

`line-height: 1.05` 같은 값은 validate에서 `text-clipped`로 잡힌다. 폰트의 실제 줄 높이는 글자 크기보다
크기 때문에, 행간을 1에 가깝게 주면 어센더나 디센더가 박스 밖으로 나간다.

큰 제목에서 제일 눈에 띄지만 **크기와 무관하다.** 실제로 걸린 것들:

- 54pt 커버 제목에 `1.05` → 디센더 잘림
- 28pt 번호 레일에 `1` → 잘림
- **22pt 정사각 배지 안의 12pt 숫자에 `1`** → 잘림. 작아서 안전할 거라 생각했지만 아니었다
- 10pt 타이틀 블록 텍스트에 `1.2` → 1px 모자람

기준: 본문 1.4 이상, 큰 제목 1.2 이상(디스플레이 서체면 1.3), **고정 크기 박스 안의 한 글자짜리
라벨도 1.4 이상.** `line-height: 1`은 어디에도 쓰지 않는다 — 세로 중앙 정렬은 행간이 아니라
flex의 `align-items: center`가 하는 일이다.

### 한 글자만 남는 낙수 줄

`keep-all`을 켜면 긴 어절이 통째로 다음 줄로 밀려 `만든다` / `기` 같은 줄이 생긴다. 해결 순서:

1. 의도한 구절 경계에 `<br>`을 직접 넣는다 (제목에 특히 효과적)
2. `text-wrap: balance`로 줄 길이를 고르게 한다
3. 텍스트 상자를 좁혀 줄당 글자 수를 줄인다
4. 자간·크기를 한 단계 줄인다 (하한 아래로는 안 된다)
5. 승인된 아웃라인 범위 안에서 문구를 줄인다

### 패널 안 글자가 사라진다

배경보다 훨씬 어둡거나 밝은 surface 위에 배경용 글자색을 쓰면 안 보인다. 패널 안에서는 그 패널 대비 판독 가능한 잉크를 따로 쓴다. 본문은 배경 대비 4.5:1, 보조 텍스트는 4:1을 기준으로 잡는다.

### 하나만 강조하면 그 하나만 밀린다

반복되는 행·셀·카드 중 **한 개에만** 강조 장식을 붙이면, 그 항목의 콘텐츠가 장식 두께만큼 밀려
형제들과 열이 어긋난다. 원장 네 행 중 세 번째에만 `border-left: 9pt`를 줬더니 그 행의 색인 번호만
9pt 오른쪽으로 나가서, 왼쪽 번호 열이 세 개는 맞고 하나가 틀어졌다.

`validate`는 못 잡는다 — 넘친 것도 겹친 것도 아니고 각 행은 자기 박스 안에 얌전히 들어 있다.
**정렬만 깨진다.** 그리고 엄격한 그리드를 쓰는 스타일에서는 정렬이 곧 그 스타일이다.

**전부에 적용하고 값만 바꾼다.**

```css
.row      { border-left: 9pt solid transparent; }  /* 자리는 모든 행이 차지 */
.row.mark { border-left-color: #33302A; }          /* 보이는 건 하나만 */
```

같은 함정이 나는 것들 — 강조 행에만 추가하면 전부 어긋난다:

- 두꺼운 보더·좌측 바
- 여분의 padding
- 배지·아이콘처럼 앞에 끼워 넣는 요소
- 굵어진 룰 라인

**우회하지 말 것.** `box-shadow: inset`으로 바를 그리면 밀리지는 않지만 그림자를 금지하는 스타일이
많고, `margin`으로 반대편을 빼서 보정하면 값이 어긋나기 쉽다. 자리를 모두에게 주는 편이 언제나 단순하다.

### 표·스와치 라벨이 겹친다

좁은 칸에 라벨을 여러 개 넣으면 서로 침범한다. 칸 수를 줄이거나 컨테이너에 `overflow: hidden`을 주고 `white-space: nowrap`으로 자른다.

## PPTX로 내보내기

`slides-grab convert`에 엔진이 둘 있고, 둘은 대체재가 아니다.

| 엔진 | 나오는 것 | 이 저장소에서 |
|---|---|---|
| `raster` (기본) | 장마다 전면 이미지 한 장 | 모든 덱에서 동작. 게이트에서 검토한 그 PNG가 그대로 들어간다 |
| `text` | 실제 파워포인트 텍스트 상자 — 편집 가능 | HTML이 파워포인트 규칙을 만족해야만 실행된다 |

`scripts/build-pptx.mjs`가 기본으로 raster를 만든다. **raster를 기본으로 두는 이유는 검증
가능성이다** — raster는 이미 눈으로 확인한 PNG를 담으므로 내보낸 것이 확인한 것과 같다. text 엔진은
DOM에서 레이아웃을 다시 짜는데, 이 환경에는 PPTX를 렌더해 볼 수단이 없어 결과를 확인할 방법이 없다.
`--text`로 선택할 수 있고, 고르면 파워포인트에서 직접 확인해야 한다.

### text 엔진을 쓰려면 지켜야 하는 네 가지

`--probe-text`로 어느 덱이 통과하는지 볼 수 있다. 저장소 전체를 훑어 실제로 나온 거부 사유는 넷이다.

1. **모든 텍스트가 시맨틱 텍스트 태그 안에 있어야 한다** — `<p>`, `<h1>`~`<h6>`, `<ul>`, `<ol>`.
   맨 `<div>`에 넣은 글자는 **파워포인트에서 아예 사라진다.**
2. **텍스트 상자가 아래 가장자리에서 0.5인치(36pt) 이상 떨어져야 한다.** 파워포인트 안전 여백
   규칙이고, 가장 흔한 거부 사유다. 대부분의 스타일이 푸터를 바닥에서 20~32pt에 둔다.
   그 16pt를 `main`에서 빼거나 위쪽 여백에서 가져와야 한다 — **예산을 세울 때부터 반영한다.**
3. **텍스트 요소에 배경·테두리·그림자를 주지 않는다.** `<p>`나 `<h3>`에 `border`나 `background`를
   걸면 거부된다. 그 장식은 텍스트를 감싸는 `<div>`로 옮긴다. 이 저장소가 자주 쓰는
   "행마다 투명 border-left, 강조 행만 색" 패턴이 여기 걸린다 — border를 `<div>` 래퍼로 옮기면 된다.
4. **`<div>`에 배경 이미지를 쓰지 않는다.** `data:image/svg+xml` 인라인 SVG 배경도 포함이다.
   단색과 테두리로 대체한다.
5. **인라인 요소에 margin 을 주지 않는다.** `display:block`을 준 `<span>`도 엔진에는 인라인이다.
   문단처럼 쓰고 있었다면 실제로 `<p>`로 분리한다.

### 옮기는 방향이 요소마다 다르다

- **`<p>`·`<h*>`의 장식** → 바깥에 `<div>`를 두르고 장식을 그 div 에 옮긴다. 안쪽 `<p>`에는
  `font:inherit; color:inherit; letter-spacing:inherit`을 걸어 전역 `p` 규칙에 눌리지 않게 한다.
- **`<li>`의 장식** → 안쪽에 `<div>` 래퍼를 만들어 옮긴다. `<li>`에는 `display:flex`만 남긴다.
  바깥에 두르면 리스트 구조가 깨진다.
- **`<ul>`·`<li>` 전체가 장식투성이라면** 컨테이너 태그를 `<div>`로 바꾸는 편이 낫다. 글자가 이미
  `<p>` 안에 있으면 렌더는 그대로다. 시맨틱을 잃는 교환이므로 게이트 리포트에 남긴다.
  **단, CSS가 `ul.qs li` 처럼 태그 선택자로 스타일을 걸고 있으면 태그를 바꾸는 순간 규칙이 끊긴다.**
  그때는 래퍼 방식을 쓴다.

**고쳤으면 렌더를 픽셀로 대조한다.** 이 부류의 수정은 시각 결과가 바뀌지 않아야 정상이다:

```python
from PIL import Image, ImageChops
a = Image.open('before.png').convert('RGB'); b = Image.open('after.png').convert('RGB')
print(ImageChops.difference(a, b).convert('L').getbbox())   # None 이면 완전히 동일
```

이 저장소에서 실제로 두 번, 바뀌면 안 되는 것이 바뀐 걸 이 방법으로 잡았다.

기존 덱을 소급해서 고치지는 않는다. 바닥 여백을 바꾸면 모든 장이 다시 흐르고 게이트 영수증이
무효가 된다. 새 덱에서 편집 가능한 PPTX가 필요하면 위 두 가지를 처음부터 지킨다.

### 배경 텍스처는 PPTX에서 포기한다

`data:image/svg+xml` 배경(점 그리드, 은은한 글로우)은 text 엔진이 어떤 경우에도 파워포인트로
가져가지 못한다. 그래서 선택지는 "텍스처를 살릴지"가 아니라 **"텍스처 없이 편집 가능하게"** 대
**"텍스처가 있는 그림 한 장"**이다.

`scripts/build-pptx.mjs`는 이 사유로만 거부된 덱을 만나면 **텍스처를 뺀 임시 복사본**을 만들어
거기서 PPTX를 뽑는다. 덱의 HTML·PDF·뷰어·preview 이미지는 그대로 텍스처를 유지한다. 복사본은
지문이 달라지므로 자기 게이트 영수증을 따로 받는다 — 그 영수증은 덱이 아니라 내보내기 변형을
증명하는 것이다.

덱에서 텍스처를 지우지 않는다. 디자인 요소를 조용히 없애는 것이 되기 때문이다.

## 차트

수치를 보여줘야 하면 Chart.js 실제 `<canvas>`를 쓴다. `div`로 만든 장식용 막대는 데이터가 아니다.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

`animation: false`, `responsive: true`, `maintainAspectRatio: false`. 캔버스는 크기가 고정된 컨테이너로 감싼다 — 레이아웃 박스나 드로잉 버퍼가 0이면 validate가 `empty-canvas`로 잡는다. 내보내기 전에 `build-viewer`로 iframe 안에서도 그려지는지 확인한다.

실제 데이터가 없으면 차트를 만들지 않는다.

## 다이어그램

복잡한 노드/엣지 다이어그램은 `slides-grab tldraw`로 에셋을 만들어 쓴다. 간단한 흐름도는 HTML 박스(의미 태그로 텍스트) + 커넥터만 인라인 SVG로 그리는 조합이 잘 맞는다 — 텍스트가 SVG 안으로 들어가지 않아 편집·검색이 살아 있다.
