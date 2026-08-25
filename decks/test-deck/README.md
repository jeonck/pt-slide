# test-deck — 인공지능의 미래와 업무 자동화

[slides-grab](https://github.com/NomaDamas/slides-grab)로 만든 5장짜리 한국어 프레젠테이션.

| # | 슬라이드 | 역할 |
|---|---|---|
| 01 | 인공지능의 미래와 업무 자동화 | 커버 (네이비 풀블리드 포스터) |
| 02 | 지금 무엇이 달라졌는가 | 변화 진단 — 3열 번호 그리드 |
| 03 | 업무 자동화는 3단계로 성숙한다 | 프로세스 플로우 (보조 → 위임 → 자율) |
| 04 | 도입 조직이 먼저 준비해야 할 것 | 먼저 할 일 vs 미루면 위험한 것 |
| 05 | Q&A | 클로징 (커버와 대칭) |

- 디자인 스타일: 번들 스타일 `ppt-korea-policy-navy` (한국 정책보고서 네이비)
- 캔버스: 720pt × 405pt · 한글 폰트 Pretendard를 `assets/fonts/`에 로컬 임베드 (원격 URL 없음)
- 데이터·수치 없음 — 출처를 댈 수 없는 통계는 만들지 않았다
- `발표자 · 소속`은 커버와 Q&A에 남겨둔 **자리표시자**다. 발표 전에 채울 것

## 파일

| 경로 | 내용 |
|---|---|
| `slide-01.html` … `slide-05.html` | 슬라이드 본체 (편집·검색 가능한 시맨틱 HTML) |
| `slide-outline.md` | 승인된 Stage 1 아웃라인 + 디자인 토큰 |
| `gate-pass-a.md`, `gate-pass-b.md` | Stage 2 디자인 게이트 리뷰 리포트 (Pass A / Pass B) |
| `design-debt.md` | 게이트에서 수용한 Minor/Note 항목 |
| `.slides-grab/` | 게이트 영수증 + 렌더 증거 PNG (export가 이걸 확인한다) |
| `preview/slides-01-05.png` | 5장 미리보기 이미지 (GitHub에서 바로 보이는 용도) |
| `viewer.html` | 읽기 전용 미리보기 — 로컬 브라우저로 열 것. GitHub에서는 소스로 보인다 |
| `ai-automation-deck.pdf` | PDF 내보내기 |

## 미리보기

![test-deck 5장](preview/slides-01-05.png)

실제 페이지로는 [Pages 뷰어](https://jeonck.github.io/pt-slide/decks/test-deck/viewer.html)에서 열린다.
GitHub 저장소 트리의 `.html`은 렌더링되지 않고 소스로 보이니, 저장소 안에서는 위 이미지나 [PDF](ai-automation-deck.pdf)를 보면 된다.

## 다시 만들거나 고치기

```bash
npm install                 # slides-grab 설치
npx playwright install chromium

npx slides-grab edit         --slides-dir decks/test-deck   # 시각 편집기
npx slides-grab validate     --slides-dir decks/test-deck   # 구조 검증
npx slides-grab build-viewer --slides-dir decks/test-deck   # viewer.html 갱신
npx slides-grab pdf          --slides-dir decks/test-deck --output decks/test-deck/ai-automation-deck.pdf
npx slides-grab png          --slides-dir decks/test-deck --output-dir decks/test-deck/out-png --resolution 2160p
```

슬라이드 HTML을 고치면 게이트 영수증이 무효가 된다. `validate` → `png`(증거 재촬영) → 두 리뷰 패스 갱신 → `slides-grab design-gate --verdict proceed` 순으로 다시 통과시켜야 `pdf`/`convert`/`figma`가 실행된다.

> PPTX(`convert`)와 Figma(`figma`) 내보내기는 slides-grab에서 **experimental / unstable**로 표시돼 있다. 손보정이 필요할 수 있다.
