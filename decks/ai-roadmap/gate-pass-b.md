# Pass B: Audience Impact / Expressive Readability

VERDICT: PASS
Confidence: High
Evidence: decks/ai-roadmap/gate-preview/slide-01.png,decks/ai-roadmap/gate-preview/slide-02.png decks/ai-roadmap/gate-preview/slide-03.png,decks/ai-roadmap/gate-preview/slide-04.png decks/ai-roadmap/gate-preview/slide-05.png,decks/ai-roadmap/gate-preview/slide-06.png
Slide fingerprints: slide-01.html: dfff3efb59270b104bf2dff6d3dbf9169772c957c678611497ad1d3574827931,slide-02.html: ba0de98fc0f5f770112a1ccbce92474be19d2b2994c9c8916c91a04fda8d1398 slide-03.html: c6fa2cfdd7a1f17512d33caff6856c56337c87c3b48f4061fca4cf5e0482850d,slide-04.html: 166f1e55cb5d2b8e2dc04dd2b3054f0d5c06a8fac4041e5bd4d1b153b446a2b1 slide-05.html: 9e59dc7c9f58bf959a0b591d28b7c18c0ae38ba3205f8ba68232c2638fe34489,slide-06.html: a06ac963c36a91407291c61d48e145c6e411aae345e17d84704dda7e94dc0d80
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
| all | 폴더 이름 `ai-roadmap`이 주제와 맞지 않는다 | Note | 사용자가 지정한 경로다 | tracked |
