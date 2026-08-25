# 디자인 게이트

validate가 기계적 정확성을 증명한다면, 게이트는 **덱이 실제로 잘 디자인됐는지**를 증거와 함께 남기는 단계다. `pdf`/`convert`/`figma`는 유효한 영수증 없이 실행되지 않는다.

핵심 원칙 하나: 게이트는 의견이 아니라 **증거가 붙은 판정**이다. "좋아 보인다"는 통과가 아니다. "이 기준들을 이 슬라이드에 대해 확인했고 결과는 이렇다"가 통과다.

## 순서

```
슬라이드 작성
  → validate 통과
  → png 렌더 (증거 촬영)
  → Pass A + Pass B 리포트 작성
  → design-gate --verdict proceed
  → export
```

편집이 있을 때마다 다시 돈다. Critical이 남아 있으면 진행하지 않는다.

## 무엇을 보는가

**Pass A — 시스템 계약.** 이 덱이 승인된 계약 안에 있는가.

- 시스템 일관성: 선언한 레이아웃 패턴 재사용, 배경색 최대 2, 서체 최대 2, 액센트 1. 슬라이드마다 표류하지 않는가
- 색 출처: 모든 색이 승인된 스펙이나 문서화된 조화 확장으로 추적되는가. **추적되지 않는 색은 Critical**
- AI 슬롭: 전면 그라디언트, 기본 컨테이너로 쓴 둥근 카드+스트라이프, SVG 일러스트, 범용 폰트 스택, 이모지, 3×2 아이콘 그리드. **슬라이드의 주 처리로 쓰였으면 Critical**
- 콘텐츠 규율: 지어낸 수치·더미 통계·정보처럼 보이려고 넣은 스탯 스트립이 없는가. **지어낸 데이터를 진짜처럼 보여주면 Critical**

**Pass B — 청중 임팩트.** 렌더된 화면이 청중에게 실제로 통하는가. **PNG를 이미지로 열어서 판단한다.**

- 구성과 위계: 슬라이드마다 하나의 일, 하나의 앵커. 커버·구분·마무리 장에 진짜 시각적 앵커가 있는가. **없으면 Critical**
- 타이포와 판독성: 본문 14pt 이상, **10pt 미만 없음**, 일관된 타입 스케일, 발표 거리에서 읽히는 대비. **10pt 미만이거나 사실상 안 읽히면 Critical**
- 한국어 줄바꿈: 어절 중간에서 쪼개지지 않는가(Layer 1), `keep-all` 부작용으로 줄이 심하게 들쭉날쭉하지 않은가(Layer 2). Layer 2를 발견하면 **고칠 전략까지 제시한다**
- 리뷰 리트머스: 3–5초 안에 요점이 잡히는가. 장식을 걷어내도 좋은가. 뺄 수 있는 줄이 있는가

## 리포트 형식

CLI가 형식을 강제한다. 다음이 전부 있어야 한다.

```markdown
# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/<name>/.slides-grab/gate-preview/slide-01.png, ...
Slide fingerprints: slide-01.html: <sha256>, ...
Unresolved Critical: 0
Blocking findings: None

## Checks
- [x] System consistency: PASS — <무엇을 보고 그렇게 판단했는지>
- [x] Color discipline: PASS — <근거>
- [x] AI slop tropes: PASS — <근거>
- [x] Content discipline: PASS — <근거>

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | No blocking findings | Note | None | tracked |
```

Pass B도 같은 구조에 체크 항목만 다르다: Composition & hierarchy / Typography & legibility / Korean·CJK word-break integrity / Review Litmus.

지문은 이렇게 만든다:

```bash
cd decks/<name> && sha256sum slide-0*.html | awk '{print $2": "$1}'
```

**Confidence는 `High` / `Medium` / `Low` 셋 중 하나여야 한다.** `Medium-High`는 거부된다.

## 정직하게 쓰기

이 리포트의 가치는 통과 도장이 아니라 **실제로 확인했다는 기록**이다.

- 전부 열어보지 못했으면 Pass B의 Method에 몇 장을 어떤 방식으로 봤는지 적고 Confidence를 낮춘다. 컨택트 시트로 훑었다면 그렇게 적는다
- 근거 칸에 "좋아 보임"이라고 쓰지 않는다. 어느 PNG의 무엇을 보고 그렇게 판단했는지 쓴다
- 스펙과 어긋나지만 의도한 것이라면 소견 표에 이유와 함께 남긴다. 조용히 넘어가지 않는다
- 수용한 Minor/Note는 `design-debt.md`에 옮긴다. 소견을 그냥 버리지 않는다

## 심각도

| | |
|---|---|
| **Critical** | 진행 차단. 추적 안 되는 색, 주 처리로 쓴 슬롭, 앵커 없는 핵심 장, 10pt 미만·판독 불가 텍스트, 지어낸 데이터 |
| **Major** | 지금 고치거나 사용자 수용을 받는다 |
| **Minor / Note** | 고치거나 `design-debt.md`에 기록한다 |
