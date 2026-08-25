# pt-slide

[slides-grab](https://github.com/NomaDamas/slides-grab)로 만든 프레젠테이션 덱 모음.
슬라이드는 전부 편집·검색 가능한 시맨틱 HTML(720pt × 405pt)이고, 여기서 PDF·PNG·PPTX로 내보낸다.

**🔗 <https://jeonck.github.io/pt-slide/>** — 두 덱을 브라우저에서 바로 볼 수 있다.

## 덱

| 덱 | 내용 | 장수 | 스타일 |
|---|---|---|---|
| [`decks/test-deck`](decks/test-deck/) | **인공지능의 미래와 업무 자동화** — 사내 공유용 한국어 발표 덱. 커버 → 변화 진단 → 자동화 3단계 → 도입 준비 → Q&A | 5 | `ppt-korea-policy-navy` |
| [`decks/style-showcase`](decks/style-showcase/) | **번들 스타일 92종 견본** — `slides-grab list-styles`가 출력하는 스타일마다 한 장씩. 스타일 고를 때 보는 카탈로그 | 92 | 92종 전부 |

각 덱 폴더의 `README.md`에 그 덱의 구성·판단·재생성 방법이 있다.
스타일 92종 전체 목록(각 스타일의 id·축·색)은 [style-showcase README의 표](decks/style-showcase/README.md#스타일-92종-전체-목록)에 있다.

### 산출물

| | HTML | GitHub에서 보기 | 로컬 미리보기 |
|---|---|---|---|
| test-deck | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/test-deck/viewer.html)** · [PDF](decks/test-deck/ai-automation-deck.pdf) · [이미지](decks/test-deck/preview/) | [`viewer.html`](decks/test-deck/viewer.html) |
| style-showcase | `slide-01.html` … `slide-92.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/style-showcase/viewer.html)** · [PDF](decks/style-showcase/slides-grab-style-showcase.pdf) · [이미지](decks/style-showcase/README.md#브라우저에서-바로-보기) | [`viewer.html`](decks/style-showcase/viewer.html) |

> **저장소 안의 `.html`을 GitHub에서 클릭하면 페이지가 아니라 소스 코드가 보인다.** GitHub은 저장소 트리의
> `.html`을 렌더링하지 않고 텍스트로 서빙하기 때문이고, 파일이 잘못된 게 아니다.
> **위 Pages 링크로 열면 실제 페이지로 뜬다.** 표의 PDF·이미지 열도 GitHub에서 바로 보인다.
>
> 그 밖의 방법:
> - **로컬에서 열기** (권장) — 클론 후 `viewer.html`을 브라우저로. 폰트·레이아웃이 그대로 나오는 유일한 방법
> - **GitHub Pages** — **이미 배포돼 있다: <https://jeonck.github.io/pt-slide/>**.
>   `main`에 푸시할 때마다 `.github/workflows/pages.yml`이 저장소를 그대로 다시 배포한다
> - **htmlpreview** — `htmlpreview.github.io/?<파일 URL>`. Pages가 있으니 이제 쓸 일은 없다

각 덱의 `preview/` 이미지는 커밋돼 있다. 전체 해상도 렌더 PNG는 용량 때문에 커밋하지 않으니
(`.gitignore` 참고) 필요하면 아래 `png` 명령으로 다시 만든다.

![test-deck 5장](decks/test-deck/preview/slides-01-05.png)

## 시작하기

Node.js ≥ 20 필요.

```bash
npm install
npx playwright install chromium   # validate / png / pdf가 Chromium을 쓴다
```

## 작업 흐름

slides-grab은 **Plan → Design → Export** 3단계이고, 각 단계 사이에 게이트가 있다.

```bash
DECK=decks/test-deck

npx slides-grab validate     --slides-dir $DECK    # 오버플로·클리핑·겹침 검사
npx slides-grab png          --slides-dir $DECK --output-dir $DECK/gate-preview --resolution 1080p
npx slides-grab build-viewer --slides-dir $DECK    # viewer.html 갱신
npx slides-grab edit         --slides-dir $DECK    # 브라우저 시각 편집기
npx slides-grab pdf          --slides-dir $DECK --output $DECK/deck.pdf
```

`pdf` / `convert` / `figma`는 **디자인 게이트 영수증이 있어야** 실행된다. 슬라이드 HTML을 고치면 영수증이 무효가 되므로, 다시 통과시켜야 한다:

```
validate → png(증거 재촬영) → Pass A / Pass B 리포트 갱신 → slides-grab design-gate --verdict proceed
```

두 덱 모두 `gate-pass-a.md`(시스템 계약)와 `gate-pass-b.md`(청중 임팩트) 리포트, 그리고 `.slides-grab/`에 영수증이 들어 있다.

## 스크립트

| 경로 | 하는 일 |
|---|---|
| [`scripts/build-style-showcase.mjs`](scripts/build-style-showcase.mjs) | 스타일 스펙에서 팔레트·타이포·레이아웃을 읽어 견본 92장을 생성 |
| [`scripts/build-contact-sheets.mjs`](scripts/build-contact-sheets.mjs) | 렌더된 PNG를 3×4 컨택트 시트로 묶음. 기본은 리뷰용 큰 타일, `--web`은 README에 붙일 `preview/` 이미지 |
| [`.github/workflows/pages.yml`](.github/workflows/pages.yml) | `main` 푸시마다 저장소를 <https://jeonck.github.io/pt-slide/>로 배포 |

```bash
node scripts/build-style-showcase.mjs
node scripts/build-contact-sheets.mjs decks/style-showcase/gate-preview          # 리뷰용
node scripts/build-contact-sheets.mjs decks/style-showcase/gate-preview --web    # README용 preview/
```

## 알아둘 것

- **폰트는 로컬 임베드.** 한글 폰트가 없는 환경에서도 그대로 렌더되도록 Pretendard(와 견본 덱의 Latin 서체 4종)를 각 덱의 `assets/fonts/`에 넣고 상대경로로 참조한다. 저장된 슬라이드 HTML에 원격 URL은 없다 — slides-grab 규칙이기도 하다.
- **한국어 줄바꿈.** 모든 슬라이드에 `word-break: keep-all`을 걸어 어절이 줄 중간에서 쪼개지지 않게 했다.
- **test-deck에는 수치·차트가 없다.** 출처를 댈 수 있는 실측 데이터가 없어서 만들지 않았다.
- **커버와 Q&A의 `발표자 · 소속`은 자리표시자다.** 발표 전에 채울 것.
- **PPTX(`convert`)·Figma(`figma`) 내보내기는 slides-grab에서 experimental / unstable로 표시돼 있다.** 손보정이 필요할 수 있다.
