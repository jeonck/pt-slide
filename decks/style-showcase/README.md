# style-showcase — 번들 스타일 92종 견본

slides-grab에 들어 있는 **선택 가능한 디자인 스타일 92종을 한 장씩** 보여주는 견본 덱.
`npx slides-grab list-styles`가 출력하는 목록과 정확히 같은 92개다 (원본 데이터에는 95개가 있고, 그중 3개 `ppt-glassmorphism` · `ppt-neo-brutalism` · `ppt-editorial-magazine`는 builtin id의 별칭이라 CLI가 걸러낸다).

각 슬라이드는 손으로 쓴 게 아니라 **스타일 자신의 스펙에서 값을 읽어 생성**된다 — `scripts/build-style-showcase.mjs`.

## 한 장에 담긴 것

| 요소 | 출처 |
|---|---|
| 제목 | 스타일의 `title` |
| 무드 줄 | 스타일의 `mood` 원문 그대로 |
| 보조 줄 | builtin은 `bestFor`, design-diversity는 `relatedStyleIds` |
| 본문 문장 | 92장 전부 **동일한 한 문장** — 달라지는 건 색과 타이포뿐이도록 |
| 색 스와치 | 실제로 적용된 hex를 그대로 라벨로 출력 (`palette-report.json`과 대조 가능) |
| TYPE / LAYOUT / ID | 아래 규칙으로 정해진 축과 `--style`에 넣을 id |

## 어디까지가 스펙이고 어디부터가 이 스크립트인가

**스펙에서 그대로 온 것**
- bg / surface / text / muted / accent / border 여섯 토큰. 모두 해당 스타일의 `background`·`colors`에서 추출.
- 타이포 축과 레이아웃 축. design-diversity 스타일은 `mood`가 `<팔레트> · <타이포> · <레이아웃> · <밀도> · <모션>` 순서라 해당 자리를 읽는다. builtin과, 자체 어휘를 쓰는 85–92번은 `fonts`/`layout`/`signature` 문구를 키워드로 판별한다 — 그래서 슬라이드에 무드 원문을 같이 찍어 검증할 수 있게 했다.
- 각진/둥근 모서리, 두꺼운 테두리 + 블러 없는 오프셋 그림자 같은 시그니처는 스펙이 그렇게 적어둔 스타일에만 적용된다 (예: 02 Neo-Brutalism).

**이 스크립트가 정한 것 — 스펙 재현이 아님**
- **레이아웃 5종**(`strict-grid` `full-bleed` `centered` `asymmetric` `block-grid`)은 축을 표현하려고 만든 견본 프레임이지, 각 스타일의 실제 슬라이드 구성이 아니다.
- **서체 대체.** 스펙이 지정한 Segoe UI·Impact·Bebas Neue 같은 서체는 이 환경에 없다. 타이포 축에 맞춰 로컬 임베드된 5종(Pretendard / Archivo Black / JetBrains Mono / Source Serif 4 / Playfair Display)으로 매핑했다. 한글은 항상 Pretendard로 떨어진다.
- **대비 보정.** 스펙 토큰을 그대로 쓰면 자기 배경 위에서 안 읽히는 경우가 있어(본문 4.5:1, 보조 4:1, 액센트 2.2:1 미만) 92장 중 **29장**에 대체색을 넣었다. 대체는 같은 스펙의 다른 hex를 우선 쓰고, 없으면 그 스펙의 text↔bg 축을 섞는다. 원본·대체·측정된 비율이 전부 `palette-report.json`에 남아 있다.
- **그라디언트는 첫 스톱만 평면으로.** slides-grab이 슬라이드 HTML에서 CSS 그라디언트를 금지한다. 전체 스톱은 스와치에 남는다.

## 파일

| 경로 | 내용 |
|---|---|
| `slide-01.html` … `slide-92.html` | 견본 슬라이드 (720pt × 405pt) |
| `palette-report.json` | 92장 전부의 해석된 토큰 + 대체 내역 |
| `gate-pass-a.md`, `gate-pass-b.md` | 디자인 게이트 리포트. Pass B는 렌더된 92장을 3×4 컨택트 시트 8장으로 전부 확인한 뒤 작성 |
| `.slides-grab/` | 게이트 영수증 (`design-gate.json`, 리포트) |
| `viewer.html` | 92장 미리보기 |
| `slides-grab-style-showcase.pdf` | 92쪽 PDF (1080p 캡처) |

렌더 PNG(`gate-preview/`, `.slides-grab/gate-preview/`)는 용량 때문에 커밋하지 않는다 — 아래 명령으로 언제든 다시 만든다.

## 다시 만들기

```bash
npm install
node scripts/build-style-showcase.mjs                                    # 92장 재생성
npx slides-grab validate --slides-dir decks/style-showcase               # 92/92 통과
npx slides-grab png --slides-dir decks/style-showcase \
  --output-dir decks/style-showcase/gate-preview --resolution 1080p      # 렌더
node scripts/build-contact-sheets.mjs decks/style-showcase/gate-preview  # 리뷰용 컨택트 시트 8장
npx slides-grab build-viewer --slides-dir decks/style-showcase
```

스타일 하나가 마음에 들면 그 id를 덱 아웃라인의 `style:`에 적으면 된다:

```bash
npx slides-grab show-design ppt-korea-policy-navy   # 색·타이포·레이아웃·금지사항 전문
```
