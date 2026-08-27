# Pass A: System Contract / Constraint Integrity

VERDICT: PASS
Confidence: High
Evidence: decks/lean-software-development/gate-preview/slide-01.png, decks/lean-software-development/gate-preview/slide-02.png, decks/lean-software-development/gate-preview/slide-03.png, decks/lean-software-development/gate-preview/slide-04.png, decks/lean-software-development/gate-preview/slide-05.png
Slide fingerprints: slide-01.html: 473a7b831df0d4572e34094f992b382fa7333c26f74ee1a58bc3707fe779dda5, slide-02.html: c4e135b92b764cadd0d1b8fbd260eebfeeafcf8e615252c65976ee77d88daef3, slide-03.html: 5e5b1e5021ceef2bf2c05656fe325a617aeb0e8bce0f0aa14449a74fe9b9ef3a, slide-04.html: 0b7f8584c2dc74d58cf32de607a8562950b0f112ee3048dd66dc00242479359e, slide-05.html: fbd5e95cba5ec7e000a7c40791c3ba23bd26b1ac8a0bfed3f374bd94cd44c2da
Unresolved Critical: 0
Blocking findings: None

## Checks
- [x] System consistency: PASS — 다섯 장이 하나의 프레임을 공유한다. 상단 kicker + 0.5pt 헤어라인, h1, `main`(flex:1), 상단 보더가 있는 footer. 배경은 `#FFFFFF` 하나(슬라이드 4의 행 배경 `#FAFAFA`는 스펙의 bg slate 토큰이며 배경이 아니라 카드 면이다). 서체는 Pretendard 하나, 액센트는 `#03C75A` 하나. 행 목록은 슬라이드 2·3·4·5가 같은 `.row` 그리드를 쓴다.
- [x] Color discipline: PASS — 다섯 파일에 등장하는 색은 `#FFFFFF` `#FAFAFA` `#0A0A0A` `#7B7B7B` `#B4B4B4` `#E8E8E8` `#03C75A` 일곱 개이고 전부 show-design 토큰 그대로다. 조화 확장 없음. 스펙의 Avoid("그린을 장식색으로 남발")를 지켜 `#03C75A`는 표지의 4pt 바와 슬라이드 5의 마무리 도트, 덱 전체에서 두 곳에만 쓴다. 차트 5색·다이어그램 2색은 선언만 되어 있고 쓰지 않았다.
- [x] AI slop tropes: PASS — 그라디언트 0, 그림자 0, `<svg>` 0, 이모지 0, 아이콘 0. 둥근 카드는 슬라이드 4의 행에만 쓰였고(스펙 radius 8~10px 범위인 8px) 슬라이드의 주 처리가 아니라 7행 목록의 행 구분이다. 폰트 스택은 범용이 아니라 로컬 임베드 Pretendard 하나.
- [x] Content discipline: PASS — 본문 전체가 사용자가 장별로 지정해 준 원문이다. 지어낸 수치·통계·스탯 스트립이 없다. 등장하는 숫자는 원칙 번호(1~7), 페이지 번호, 원문에 있던 '7가지'·'3M'뿐이다. 모든 시트의 footer가 "수치·차트 없음"을 명시한다.

## Findings
| Slide | Finding | Severity | Fix | Status |
|-------|---------|----------|-----|--------|
| slide-01 | 스펙의 거대 디스플레이(96~110pt)를 쓰지 않고 40pt로 내렸다. 스펙은 13.33in 캔버스 기준이고 이 프레임은 10in다 | Note | 비율만 유지, 절대값은 캔버스에 맞춤 | tracked |
| slide-01 | 스펙의 그린 안개 래스터 에셋 없음. 스펙이 명시적으로 허용하는 flat-token fallback 사용 | Note | 없음 | tracked |
| slide-04 | 행 배경 `#FAFAFA`를 7행 전부에 동일하게 준다. 한 행만 칠하면 그 행만 밀린다 | Note | 없음 | tracked |
| slide-05 | 차트 토큰·데이터 카드 숫자 토큰·5개 사업부문 색 미사용 | Note | 대응하는 데이터가 없다 | tracked |
| slide-01 | 표지의 맨 `<div>` 텍스트 4곳을 `<h1>`·`<p>`로 바꿨다. 맨 div에 든 글자는 파워포인트에서 아예 사라진다 | Note | 시맨틱 태그로 교체, `.big`에 margin-top:0을 더해 h1 상속분을 상쇄 | fixed |
