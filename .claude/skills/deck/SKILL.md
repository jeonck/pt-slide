---
name: deck
description: Build, revise or export a presentation deck in this repo with slides-grab — semantic HTML slides under decks/<name>/, through the plan → design → gate → export pipeline, published to GitHub Pages. Use this whenever the user asks for slides, a deck, a presentation, 발표 자료, 슬라이드, PPT, 프레젠테이션, or 덱, and whenever they want an existing deck in decks/ changed, re-rendered, re-validated, exported to PDF/PNG/PPTX, or pushed. Also use it when they ask which design style to pick, when validate or the design gate fails, or when Korean text renders as boxes, gets clipped, or breaks mid-word. Trigger it even for a one-line request like "decks/foo에 5장짜리 덱 만들어줘" — the repo has conventions the request will not restate.
---

# 이 저장소에서 덱 만들기

`slides-grab`으로 720pt × 405pt 시맨틱 HTML 슬라이드를 만든다. 이 스킬은 세 덱(5장 한국어 발표 덱, 92장 스타일 견본, 6장 영어 기술 덱)을 실제로 만들며 부딪힌 것들을 담고 있다 — 순서를 지키는 것보다 **각 단계가 왜 있는지**를 이해하고 판단하는 게 중요하다.

## 최소 입력

사용자가 주는 것은 대개 **주제와 장수**뿐이다. 나머지는 아래 기본값으로 진행하고, 다르게 해야 할 이유가 생기면 그때 확인한다.

| | 기본값 |
|---|---|
| 위치 | `decks/<name>/` |
| 스타일 | 주제와 톤에 맞는 것을 **직접 고르고, 왜 그걸 골랐는지 밝힌다**. 한국어 비즈니스/보고서면 `ppt-korea-policy-navy`가 안전한 기본값. 아래 "스타일 고르기" 참고 |
| 형태 | 첫 장 커버, 마지막 장 Q&A, 사이는 주제에 맞게 |
| 언어 | 요청한 언어. 영어 덱이면 Pretendard를 지우고 스타일이 지정한 서체를 임베드한다 |
| 데이터 | 출처를 댈 수 없으면 **수치·차트를 만들지 않는다** |
| 발표자 | `발표자 · 소속` 자리표시자. 이름을 지어내지 않는다 |
| 완료 지점 | validate → 디자인 게이트 → viewer + PDF + preview 이미지 → README → main 푸시 |

푸시하면 `.github/workflows/pages.yml`이 <https://jeonck.github.io/pt-slide/> 로 자동 배포한다. 끝나면 그 덱의 뷰어 URL을 알려준다.

## 파이프라인

### 1. 스캐폴딩

```bash
node scripts/new-deck.mjs <name>          # 폴더 + Pretendard + 아웃라인 뼈대
node scripts/new-deck.mjs <name> --display # Latin 디스플레이 서체까지 필요할 때
```

폰트를 각 덱의 `assets/fonts/`에 복사하는 이유: 컨테이너에 한글 폰트가 없어서 임베드하지 않으면 한글이 두부(□)로 렌더되고, slides-grab은 저장된 슬라이드 HTML에 원격 URL을 금지한다.

### 2. 스타일 정하기

```bash
npx slides-grab list-styles                     # 92종
npx slides-grab show-design <style-id>          # 색·타이포·레이아웃·시그니처·금지사항 전문
```

`show-design` 출력은 **읽고 지켜야 하는 계약**이다. 특히 `## Avoid` 항목은 디자인 게이트에서 그대로 걸린다. 스타일 후보를 훑을 때는 [92종 견본](../../../decks/style-showcase/README.md)을 보면 빠르다.

**스타일 고르기 — 기본은 묻지 않고 고르는 것.** 주제·청중·언어를 보면 대개 답이 좁혀지고, 스타일을
바꾸는 것은 재실행이지 되돌릴 수 없는 결정이 아니다. 고른 이유를 한 줄로 밝히고 진행한 뒤,
"다르게 가고 싶으면 말씀해 달라"고 덧붙이면 사용자가 왕복 없이 받아볼 수 있다. 이미 만든 덱과
색·톤이 겹치지 않게 하는 것도 고려한다.

물어보는 게 맞는 경우는 좁다:

- 후보 둘 이상이 **비슷하게 잘 맞아서** 취향이 갈리는 문제일 때
- 사내 브랜드·기존 템플릿처럼 **스킬이 알 수 없는 제약**이 있어 보일 때
- 사용자가 스타일을 직접 고르고 싶다는 신호를 준 적이 있을 때

물어볼 때도 후보 2–3개에 추천 하나를 명시한다. 고민을 그대로 넘기지 않는다.

정한 스타일과 토큰을 `slide-outline.md` meta에 적는다. 스펙에 없는 색이 필요하면(예: 네이비 배경 위에서 스펙의 muted가 안 읽힘) 승인된 토큰 사이의 조화색으로 확장하고 **왜 확장했는지를 아웃라인과 `design-debt.md`에 기록한다.** 기록 없는 새 색은 게이트에서 Critical이다.

### 3. 아웃라인

`slide-outline.md`를 채운다. 장별로 레이아웃·핵심 메시지·의도를 적는다. 여기서 콘텐츠를 확정해야 슬라이드를 쓰다가 내용을 지어내지 않는다.

### 4. 슬라이드 HTML

`slide-01.html` … `slide-NN.html` (2자리 번호). 작성 규칙은 `references/slide-html.md`를 읽고 따른다 — 시맨틱 태그, 한글 줄바꿈, 폰트 크기 하한, 세로 리듬 등 렌더해 봐야 드러나는 것들이 정리돼 있다.

스타일에 **고정 furniture**(우하단 타이틀 블록, 하단 밴드, 상단 헤더바)가 있으면 첫 슬라이드를 쓰기 전에
`references/slide-html.md`의 **높이 예산** 섹션을 먼저 본다. 두 가지를 계산한다:

- **세로** — `main`이 실제로 쓸 수 있는 높이. 넘치면 콘텐츠가 furniture 아래로 깔린다.
- **가로** — 감기면 안 되는 줄(액션 타이틀 등)의 글자 수 상한. 감기면 그 아래 furniture가 내려가
  시트마다 다른 높이에 놓인다.

둘 다 `validate`가 잡지 못한다. 모르고 시작하면 슬라이드마다 카피를 줄이며 여러 번 왕복하게 된다.

가로 예산은 **계수를 추정하지 말고 잰다.** 같은 서체·같은 크기에서도 문자열에 따라 계수가 두 배
가까이 벌어지고, 대문자 라벨은 산문보다 20~30% 넓다. `references/slide-html.md`의 "재는 법"에
그대로 복사해 쓸 수 있는 계측 스니펫이 있다.

### 5. 검증

```bash
npx slides-grab validate --slides-dir decks/<name>
```

**리포 루트에서 실행한다.** 덱 폴더로 `cd`한 뒤 상대경로를 주면 `decks/<name>/decks/<name>`을 찾다가 실패한다.

오버플로·텍스트 클리핑·형제 요소 겹침·빈 캔버스를 잡아준다. 통과할 때까지 소스를 고친다. 실패가 없어질 때까지는 사용자에게 보여주지 않는다.

### 6. 눈으로 보기 — 건너뛰지 말 것

```bash
npx slides-grab png --slides-dir decks/<name> --output-dir decks/<name>/gate-preview --resolution 1080p
```

**렌더된 PNG를 실제로 열어서 본다.** validate는 기계적 결함만 잡는다. 실제로 이 단계에서만 발견된 것들: 고정 furniture 아래로 깔린 하단 콜아웃, 본문과 콜아웃 사이의 거대한 빈 공간, 디센더가 잘린 큰 제목, 한 글자만 남은 낙수 줄, 배경과 같은 색으로 칠해져 사라진 패널 텍스트.

장수가 많으면 컨택트 시트로 묶어서 한 번에 본다:

```bash
node scripts/build-contact-sheets.mjs decks/<name>/gate-preview
```

### 7. 디자인 게이트

`pdf` / `convert` / `figma`는 게이트 영수증 없이는 실행되지 않는다. 절차와 리포트 형식은 `references/design-gate.md`에 있다. 요약하면 Pass A(시스템 계약)와 Pass B(청중 임팩트) 리포트를 쓰고:

```bash
npx slides-grab design-gate --slides-dir decks/<name> --verdict proceed \
  --pass-a-report decks/<name>/gate-pass-a.md \
  --pass-b-report decks/<name>/gate-pass-b.md
```

리포트는 형식이 CLI로 강제된다. 슬라이드를 고치면 지문(sha256)이 달라져 영수증이 무효가 되므로, 편집 후에는 다시 통과시켜야 한다.

**리포트에 사실이 아닌 걸 쓰지 않는다.** 전부 열어보지 못했으면 Pass B에 몇 장을 어떤 방식으로 봤는지 적고 Confidence를 낮춘다. 게이트의 가치는 통과 도장이 아니라 실제로 확인했다는 기록이다.

### 8. 내보내기

```bash
npx slides-grab build-viewer --slides-dir decks/<name>
npx slides-grab pdf          --slides-dir decks/<name> --output decks/<name>/<name>.pdf --resolution 1080p
node scripts/build-contact-sheets.mjs decks/<name>/gate-preview --web   # README용 preview/ 이미지
```

PDF 해상도는 1080p면 충분하다 — 기본 2160p는 92장 기준 12MB까지 가고, 1080p로 4.9MB가 된다.

`preview/` 이미지를 만드는 이유: GitHub은 저장소 트리의 `.html`을 렌더링하지 않고 소스로 보여준다. 커밋된 이미지가 있어야 저장소 안에서도 슬라이드를 볼 수 있다.

### 9. 문서와 푸시

덱 폴더에 `README.md`를 쓴다 — 구성, 스타일, **판단한 것과 그 이유**(수치를 안 쓴 이유, 자리표시자, 팔레트 확장), 재생성 명령. 루트 README의 덱 표에 한 줄 추가한다.

커밋하고 `main`에 푸시한다. 커밋 메시지에는 렌더해 보고 고친 실제 결함을 적는다 — 나중에 같은 함정을 다시 밟지 않게 하는 게 그 기록의 목적이다.

## 기존 덱 고치기

요청받은 슬라이드만 고친다. 그다음 **반드시** validate → png 재촬영 → 게이트 재통과 → export 순으로 다시 돌린다. 레이아웃·색·타이포·밀도를 건드렸으면 게이트는 새로 받아야 한다.

## 막혔을 때

`references/troubleshooting.md`에 이 환경에서 실제로 난 오류와 해법이 있다 — Playwright 브라우저 버전 불일치, 한글 두부 현상, CDN 차단, 게이트 리포트 거부, 경로 중복 오류, **validate는 통과인데 렌더가 이상한 경우**. 처음 보는 오류를 만나면 추측하기 전에 이 파일을 먼저 본다.

## 참고

- `references/slide-html.md` — 슬라이드 HTML 작성 규칙과 렌더에서 드러나는 함정
- `references/design-gate.md` — 게이트 절차와 리포트 형식
- `references/troubleshooting.md` — 환경 오류와 해법
- `node_modules/slides-grab/skills/` — slides-grab이 제공하는 원본 스킬 문서 (더 깊은 내용이 필요할 때)
