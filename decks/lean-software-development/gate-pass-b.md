# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/lean-software-development/gate-preview/slide-01.png, decks/lean-software-development/gate-preview/slide-02.png, decks/lean-software-development/gate-preview/slide-03.png, decks/lean-software-development/gate-preview/slide-04.png, decks/lean-software-development/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: d57c2929f030b06732dc4fcada60e0be38376f15e57787b6d1a4d96d06281e55, slide-02.html: 43e15c22d8f1ddc9780bcda14535507e082f1c9b4d631ec473f30b1847861eeb, slide-03.html: e0f72bb8dee03de37900300c0ccbc29f22697fc535cd9c653a2f74e014ad4f5b, slide-04.html: c14e853cbb51dbe133e70f1a24137785274c4ddfdf7c17b3622892a55d81c7e3, slide-05.html: dd9f356e9e472fe626b1ad7e8bf7342179e7d8ef9482ba34267a5588ec92dd91
Unresolved Critical: 0
Blocking findings: None

## Method

다섯 장 전부를 1080p PNG로 뽑아 컨택트 시트(`contact-sheets/sheet-01.png`)로 두 차례 열어 봤다 —
수정 전과 수정 후. 눈으로만 판단하지 않고 헤드리스 크로미움에서 기하를 실측했다: 각 장의
`main` 실사용 높이, `main` 아래로 넘친 자손의 최대 넘침량, 그리고 표지에서 감긴 줄들의 필요 폭과
가진 폭. 가로 예산 계수는 추정하지 않고 Pretendard가 실제 로드된 상태에서 실측했다.

## Checks
- [x] Composition & hierarchy: PASS — 장마다 하나의 일을 한다(표지 / 원칙 1–4 / 원칙 5–7 / 낭비 7 / 효과 4). 표지의 앵커는 40pt 디스플레이와 그 아래 그린 바, 마무리 장의 앵커는 그린 도트가 붙은 한 줄이다. 수정 전 slide-05는 목록과 마무리 줄 사이에 약 90pt의 빈 띠가 있었고(`margin-top:auto`), 블록 전체를 세로 중앙에 두어 없앴다.
- [x] Typography & legibility: PASS — 본문 14pt, 최소 글자 10pt(kicker·footer·페이지 번호). 10pt 미만 없음. `line-height: 1`인 곳 없음(최소 1.2). 대비는 흰 배경 위 `#0A0A0A` 19.0:1, `#7B7B7B` 4.8:1(본문 기준 통과), `#B4B4B4` 2.5:1은 footer·페이지 번호·영문 병기 같은 보조 라벨에만 쓰고 본문에는 쓰지 않는다.
- [x] Korean/CJK word-break integrity: PASS — 다섯 장 전부 `word-break: keep-all`. Layer 1(어절 중간 쪼개짐) 없음. Layer 2로 표지에서 낙수 줄 두 개를 발견했다 — "…가치 스트림 / 방법론"과 "…이론적 / 기반". 원문을 줄이는 대신 실측(484.5pt·474.8pt 필요, 470.3pt 보유)에 맞춰 측정 폭을 512pt로 넓혀 둘 다 한 줄이 됐다.
- [x] Review Litmus: PASS — 3초 안에 각 장의 요점이 잡힌다. 장식이 거의 없어 걷어낼 것이 없다. 뺄 수 있는 줄이 있는지는 판단하지 않았다 — 본문이 사용자 원문이라 줄이는 것은 이쪽 권한이 아니다.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-04 | 7행 목록이 `main`을 5.8pt 넘쳤다. validate는 이 상태에서 5/5 통과를 찍었다 | Major | 행 세로 패딩 6pt → 4pt. 원문은 손대지 않음 | fixed |
| slide-01 | 낙수 줄 두 개 ("방법론", "기반") | Major | 측정 폭 470 → 512pt | fixed |
| slide-05 | 목록과 마무리 줄 사이 약 90pt의 빈 띠 | Minor | `margin-top:auto` 제거, 블록 전체 세로 중앙 정렬 | fixed |
| slide-03 | 3행뿐이라 `main`에 102pt의 여유가 남는다. 세로 중앙 정렬로 위아래에 나눠 두었다 | Note | 없음 — 원문이 3항목이고 채우려면 지어내야 한다 | tracked |
| slide-01 | 링크로 주신 `fw-thinking.metacog.co.kr` 문서를 열어보지 못했다(프록시 차단). 출처 캡션은 "발표자 제공 개요"라고 밝힌다 | Note | 없음 | tracked |
| slide-01 | 표지의 맨 `<div>` 텍스트 4곳을 `<h1>`·`<p>`로 바꿨다. 맨 div에 든 글자는 파워포인트에서 아예 사라진다 | Note | 시맨틱 태그로 교체, `.big`에 margin-top:0을 더해 h1 상속분을 상쇄 | fixed |
| all | `<header>`·`<footer>` 를 `<div>`로, `<p>` 밖 `<span>`을 `<p>`로 바꿨다. 파워포인트 text 엔진은 두 경우 모두 글자를 **경고 없이 버린다** | Major | 실제 PPTX를 열어 HTML과 텍스트를 대조해 발견. 렌더 픽셀 차이 0 | fixed |
