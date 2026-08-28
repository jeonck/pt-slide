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
