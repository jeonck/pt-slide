# slides-grab Design Gate Report

Verdict: proceed
Generated: 2026-08-28T14:53:20.657Z
Slide mode: presentation
Resolution: 2160p

## Pass A: System Contract / Constraint Integrity

# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/architecture-styles/gate-preview/slide-01.png, decks/architecture-styles/gate-preview/slide-02.png, decks/architecture-styles/gate-preview/slide-03.png, decks/architecture-styles/gate-preview/slide-04.png, decks/architecture-styles/gate-preview/slide-05.png, decks/architecture-styles/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: dfff3efb59270b104bf2dff6d3dbf9169772c957c678611497ad1d3574827931, slide-02.html: ba0de98fc0f5f770112a1ccbce92474be19d2b2994c9c8916c91a04fda8d1398, slide-03.html: c6fa2cfdd7a1f17512d33caff6856c56337c87c3b48f4061fca4cf5e0482850d, slide-04.html: 166f1e55cb5d2b8e2dc04dd2b3054f0d5c06a8fac4041e5bd4d1b153b446a2b1, slide-05.html: 9e59dc7c9f58bf959a0b591d28b7c18c0ae38ba3205f8ba68232c2638fe34489, slide-06.html: a06ac963c36a91407291c61d48e145c6e411aae345e17d84704dda7e94dc0d80
Unresolved Critical: 0
Blocking findings: None

## Checks
- [x] System consistency: PASS — 여섯 장이 한 프레임을 공유한다. 상단 kicker 행, 액션 타이틀(PT Serif 22pt), 1px 헤어라인, `main`, 하단 소스 캡션. 헤어라인은 본문 다섯 장 모두 **y=86.5pt 동일**(실측) — 이 스타일의 "strict grid"가 그것이다. 배경은 `#FFFFFF` 하나, 모듈 면만 `#F1F4F9`. 서체는 PT Serif(제목)와 Inter(본문) 둘.
- [x] Color discipline: PASS — 등장하는 색은 `#FFFFFF` `#F1F4F9` `#14213D` `#5B6472` `#2563EB` `#C7D0DD` 여섯이고 전부 show-design 토큰이다. 조화 확장 없음. 스펙의 "두 블루와 회색만" 규칙대로 다른 색은 없다. 액센트 `#2563EB`는 시트당 한 곳(표지 룰, 모듈 상단 3px, 표의 한 칸, 결정 번호)에만.
- [x] AI slop tropes: PASS — 그라디언트 0, 그림자 0(스펙이 shadow:none), `<svg>` 0, 이모지 0, 아이콘 0. radius 0px으로 스펙을 지켜 둥근 카드가 없다. 폰트 스택은 로컬 임베드 둘.
- [x] Content discipline: PASS — 수치·통계·차트가 없다. 등장하는 숫자는 시트 번호, 질문 번호(01~04), 결정 번호(01~03)뿐이다. 비교는 표로 하되 칸에 들어가는 것은 "One / A few / Many"처럼 **세는 말이 아니라 구분하는 말**이다. 소스 캡션이 모든 시트에서 그 사실을 밝힌다.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| all | 스펙의 caption 9pt를 10pt로 올렸다. 9pt는 이 저장소의 절대 하한 10pt 아래다 | Note | 크기만 조정, 역할은 그대로 | tracked |
| all | 타입을 스펙의 절대값(13.33in 기준)이 아니라 이 캔버스(10in)에 맞춰 잡았다. display 26 → 22pt, body 15pt 유지 | Note | 비율 유지, 절대값은 캔버스에 맞춤 | tracked |
| all | 차트 3색(`#A8B4C6` `#7CA0F0` `#E3E8F0`)과 kpi 토큰 미사용 | Note | 쓸 데이터가 없다 | tracked |
| slide-04 | 표 행 패딩을 8 → 3pt로 줄였다 | Minor | 마무리 문장이 표 마지막 행을 덮었다. 렌더에서만 보였다 | fixed |

## Pass B: Audience Impact / Expressive Readability

# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/architecture-styles/gate-preview/slide-01.png, decks/architecture-styles/gate-preview/slide-02.png, decks/architecture-styles/gate-preview/slide-03.png, decks/architecture-styles/gate-preview/slide-04.png, decks/architecture-styles/gate-preview/slide-05.png, decks/architecture-styles/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: dfff3efb59270b104bf2dff6d3dbf9169772c957c678611497ad1d3574827931, slide-02.html: ba0de98fc0f5f770112a1ccbce92474be19d2b2994c9c8916c91a04fda8d1398, slide-03.html: c6fa2cfdd7a1f17512d33caff6856c56337c87c3b48f4061fca4cf5e0482850d, slide-04.html: 166f1e55cb5d2b8e2dc04dd2b3054f0d5c06a8fac4041e5bd4d1b153b446a2b1, slide-05.html: 9e59dc7c9f58bf959a0b591d28b7c18c0ae38ba3205f8ba68232c2638fe34489, slide-06.html: a06ac963c36a91407291c61d48e145c6e411aae345e17d84704dda7e94dc0d80
Unresolved Critical: 0
Blocking findings: None

## Method

여섯 장 전부를 1080p PNG로 뽑아 컨택트 시트로 두 번 열어 봤다 — 수정 전과 수정 후. 눈으로만 보지
않고 헤드리스 크로미움에서 실측했다: 각 장의 `main` 넘침, 액션 타이틀의 줄 수, 헤어라인의 y좌표,
최하단 텍스트가 바닥에서 떨어진 거리. 가로 예산은 **슬라이드를 쓰기 전에** 다섯 액션 타이틀을
실측해서 잡았고, 그중 하나는 655.4pt로 656pt 폭에 0.6pt만 남아 문장을 줄였다.

## Checks
- [x] Composition & hierarchy: PASS — 본문 다섯 장이 모두 위에서 결론을 말하고 아래에서 증명한다. 표지의 앵커는 38pt 세리프 제목과 그 아래 3px 액센트 룰, 마무리 장의 앵커는 결정 셋을 가르는 헤어라인이다. 슬라이드 3은 내용이 짧아 `main`에 86pt가 남았고, 세로 중앙 정렬로 위아래에 나눠 두었다.
- [x] Typography & legibility: PASS — 본문 14~15pt, 최소 글자 10pt(kicker·소스 캡션). 10pt 미만 없음. `line-height: 1`인 곳 없음(최소 1.25). 대비는 흰 배경 위 `#14213D` 14.6:1, `#5B6472` 6.2:1, 액센트 `#2563EB` 5.2:1 — 본문 기준 4.5:1을 모두 넘는다.
- [x] Korean/CJK word-break integrity: PASS — 영문 전용 덱이라 한글 어절 분리 문제가 없다. 영문 낙수 줄은 시트별로 확인했고, 한 단어만 남은 줄은 없다.
- [x] Review Litmus: PASS — 3초 안에 각 장의 결론이 잡힌다. 액션 타이틀이 완결된 문장이라 제목만 이어 읽어도 논지가 성립한다. 장식이 거의 없어 걷어낼 것이 없다.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-04 | 마무리 문장이 표 마지막 행("Event-driven") 위에 겹쳐 그려졌다. `validate`는 이 상태에서 6/6 통과를 찍었다 — 자식이 `main`을 넘친 것이라 프레임 밖 넘침도 형제 겹침도 아니다 | Major | 표 행 패딩 8 → 3pt. 원문은 그대로 | fixed |
| slide-01 | 커버 제목이 leading 1.2에서 디센더가 잘렸다(validate가 잡음) | Minor | 1.3으로 | fixed |
| slide-03 | 네 칼럼이 짧아 `main` 아래에 86pt가 남는다 | Note | 세로 중앙 정렬. 채우려면 지어내야 한다 | tracked |
## Template Fidelity Report

Status: not-applicable

## Slide Fingerprints

- slide-01.html: dfff3efb59270b104bf2dff6d3dbf9169772c957c678611497ad1d3574827931
- slide-02.html: ba0de98fc0f5f770112a1ccbce92474be19d2b2994c9c8916c91a04fda8d1398
- slide-03.html: c6fa2cfdd7a1f17512d33caff6856c56337c87c3b48f4061fca4cf5e0482850d
- slide-04.html: 166f1e55cb5d2b8e2dc04dd2b3054f0d5c06a8fac4041e5bd4d1b153b446a2b1
- slide-05.html: 9e59dc7c9f58bf959a0b591d28b7c18c0ae38ba3205f8ba68232c2638fe34489
- slide-06.html: a06ac963c36a91407291c61d48e145c6e411aae345e17d84704dda7e94dc0d80
