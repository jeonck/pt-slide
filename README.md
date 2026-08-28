# pt-slide

[slides-grab](https://github.com/NomaDamas/slides-grab)로 만든 프레젠테이션 덱 모음.
슬라이드는 전부 편집·검색 가능한 시맨틱 HTML(720pt × 405pt)이고, 여기서 PDF·PNG·PPTX로 내보낸다.

**🔗 <https://jeonck.github.io/pt-slide/>** — 덱을 브라우저에서 바로 볼 수 있다.

덱을 만드는 방법은 [덱 만들기 — 프롬프트 사용법](#덱-만들기--프롬프트-사용법)에 있다. Claude Code에서 `decks/<name> 에 '<주제>' <N>장 덱 만들어줘` 한 줄이면 시작된다.

## 덱

| 덱 | 내용 | 장수 | 스타일 |
|---|---|---|---|
| [`decks/test-deck`](decks/test-deck/) | **인공지능의 미래와 업무 자동화** — 사내 공유용 한국어 발표 덱. 커버 → 변화 진단 → 자동화 3단계 → 도입 준비 → Q&A | 5 | `ppt-korea-policy-navy` |
| [`decks/agentic-rag`](decks/agentic-rag/) | **From RAG to Agentic RAG** — 영어 기술 덱. 클래식 RAG의 한계 → 검색이 루프가 되는 전환 → 도입 패턴 → 비용과 결정 → Q&A | 6 | `ppt-blueprint-schematic-deck` |
| [`decks/mlops-platform`](decks/mlops-platform/) | **MLOps Platform Roadmap** — 영어 컨설팅 익스히빗. 진단 → 역량 지도 → 3단계 시퀀스 → build vs buy → 결정 → 논의 | 7 | `ppt-consulting-precision-grid` |
| [`decks/feature-store`](decks/feature-store/) | **Feature Store adoption review** — 영어 고스트 덱. 무엇을 푸는가 → 무엇인가 → 언제 도입하나 → 비용 → 결정 | 6 | `ppt-mckinsey-ghost-deck` |
| [`decks/model-registry`](decks/model-registry/) | **Model Registry operating guide** — 영어 대장(ledger) 덱. 무엇을 기록하나 → 승격 원장 → 운영 규칙 4개 → 미결 사항 | 5 | `ppt-archival-index-deck` |
| [`decks/alert-design`](decks/alert-design/) | **Alert design: what deserves a page** — 영어 모노크롬 리스크 덱. 세 목적지(page·ticket·dashboard) → 페이지의 자격을 묻는 시험 3문 → 탈락한 알럿의 처분 → 결정 | 5 | `ppt-monochrome-risk` |
| [`decks/incident-response`](decks/incident-response/) | **Incident response: the first 30 minutes** — 영어 다크 테크 런북. 기술이 아닌 세 가지 실패 → 역할이 하지 않는 일 → 체크포인트 5 → 심각도가 지우는 의무 → 결정 | 6 | `ppt-dark-tech` |
| [`decks/deployment-strategies`](decks/deployment-strategies/) | **Deployment strategies** — 영어 블록 인포그래픽. rolling·blue-green·canary 비교 → 전략을 정하는 두 질문 → 각 전략의 전제 조건 → 결정 | 5 | `ppt-bold-block-infographic-deck` |
| [`decks/ci-pipeline`](decks/ci-pipeline/) | **CI pipeline: what belongs in it** — 영어 정밀 그리드 덱. CI가 매 커밋에 답하는 질문 → CI/머지 후/스케줄 경계 → 신호를 지키는 두 정책 → 이미 느릴 때 → 결정 | 6 | `ppt-precision-fintech-deck` |
| [`decks/iac-drift`](decks/iac-drift/) | **Infrastructure drift** — 영어 스위스 에디토리얼 덱. 손으로 고친 변경이 계획을 무효로 만드는 고리 → 콘솔이 이기는 이유 → 경로를 하나로 만드는 세 수 → 결정 | 5 | `ppt-swiss-editorial-bold` |
| [`decks/postmortem`](decks/postmortem/) | **Blameless postmortems** — 영어 신문 조판 덱. 회고가 쓰이는 용도 → 그 말이 요구하는 세 가지 양보 → 사람이 사실대로 말하게 되는 조건 → 결정 | 6 | `ppt-print-first-newspaper` |
| [`decks/staging-parity`](decks/staging-parity/) | **Why staging lies** — 영어 엔지니어드 다크 덱. 그린 런이 증명하는 것 → 네 가지 간극과 각각이 숨기는 것 → 정직한 두 선택지 → 결정 | 5 | `ppt-engineered-dark-deck` |
| [`decks/backup-restore`](decks/backup-restore/) | **A backup you have never restored** — 영어 헤리티지 럭셔리 덱. 백업이 조용히 실패하는 지점 → 장난감 데이터로는 증명되지 않는다 → 훈련의 산출물은 고쳐진 런북 → 결정 | 5 | `ppt-heritage-luxury-deck` |
| [`decks/slo`](decks/slo/) | **Service level objectives** — 영어 모노크롬 인프라 덱. SLO는 지표가 아니라 스위치다 → 에러 버짓 → 적어두지 않은 예외 → 스위치가 아니게 되는 세 경로 → 결정 | 6 | `ppt-monochrome-infrastructure-deck` |
| [`decks/secrets`](decks/secrets/) | **Revocability is the standard** — 영어 패턴 볼드 포스터 덱. 흔한 규칙이 실패하는 이유 → 회전이 싸지는 조건 → 회전 불가는 곧 영구 → 결정 | 5 | `ppt-pattern-bold-poster-keynote` |
| [`decks/oncall-rotation`](decks/oncall-rotation/) | **On-call rotations people can survive** — 영어 웜 미니멀 다이어그램 덱. 로타는 인력 결정이다 → 인수인계가 실어야 하는 것 → 페이지 상한이 상류에 강제하는 것 → 결정 | 5 | `ppt-warm-minimal-diagram-deck` |
| [`decks/observability-cost`](decks/observability-cost/) | **Logs cost the most and get read the least** — 영어 에디토리얼 프로덕트 덱. 세 신호가 답하는 서로 다른 질문 → 용량은 곱이고 독자 수는 상수 → 샘플링과 보존은 절약이 아니라 베팅 → 결정 | 6 | `ppt-editorial-product-deck` |
| [`decks/prod-access`](decks/prod-access/) | **Who gets into production** — 영어 IR 네이비+골드 덱. 상시 권한이 쌓이는 이유 → 최소 권한의 실제 비용 → 승격 기록이 담아야 하는 것 → 아무도 읽지 않는 기록 → 결정 | 6 | `ppt-goldman-ir-deck` |
| [`decks/lean-software-development`](decks/lean-software-development/) | **Lean Software Development** — 한국어 통합보고서 톤 덱. TPS 낭비 제거 철학 → 7가지 원칙 → 7가지 낭비(Muda) → 기대 효과. 본문은 발표자가 장별로 지정한 원문 | 5 | `ppt-naver-integrated-report-award` |
| [`decks/ai-roadmap`](decks/ai-roadmap/) | **Architecture styles: what actually tells them apart** — 영어 전략 컨설팅 익스히빗. 라벨은 결정이 아니다 → 구분하는 네 질문 → 다섯 스타일 비교표 → 라벨과 답이 어긋날 때 → 결정 | 6 | `ppt-strategy-navy-deck` |
| [`decks/style-showcase`](decks/style-showcase/) | **번들 스타일 92종 견본** — `slides-grab list-styles`가 출력하는 스타일마다 한 장씩. 스타일 고를 때 보는 카탈로그 | 92 | 92종 전부 |

각 덱 폴더의 `README.md`에 그 덱의 구성·판단·재생성 방법이 있다.
스타일 92종 전체 목록(각 스타일의 id·축·색)은 [style-showcase README의 표](decks/style-showcase/README.md#스타일-92종-전체-목록)에 있다.

### 산출물

| | HTML | GitHub에서 보기 | 로컬 미리보기 |
|---|---|---|---|
| test-deck | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/test-deck/viewer.html)** · [PDF](decks/test-deck/ai-automation-deck.pdf) · [PPTX](decks/test-deck/ai-automation-deck.pptx) · [이미지](decks/test-deck/preview/) | [`viewer.html`](decks/test-deck/viewer.html) |
| agentic-rag | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/agentic-rag/viewer.html)** · [PDF](decks/agentic-rag/agentic-rag.pdf) · [PPTX](decks/agentic-rag/agentic-rag.pptx) · [이미지](decks/agentic-rag/preview/) | [`viewer.html`](decks/agentic-rag/viewer.html) |
| mlops-platform | `slide-01.html` … `slide-07.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/mlops-platform/viewer.html)** · [PDF](decks/mlops-platform/mlops-platform.pdf) · [PPTX](decks/mlops-platform/mlops-platform.pptx) · [이미지](decks/mlops-platform/preview/) | [`viewer.html`](decks/mlops-platform/viewer.html) |
| feature-store | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/feature-store/viewer.html)** · [PDF](decks/feature-store/feature-store.pdf) · [PPTX](decks/feature-store/feature-store.pptx) · [이미지](decks/feature-store/preview/) | [`viewer.html`](decks/feature-store/viewer.html) |
| model-registry | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/model-registry/viewer.html)** · [PDF](decks/model-registry/model-registry.pdf) · [PPTX](decks/model-registry/model-registry.pptx) · [이미지](decks/model-registry/preview/) | [`viewer.html`](decks/model-registry/viewer.html) |
| alert-design | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/alert-design/viewer.html)** · [PDF](decks/alert-design/alert-design.pdf) · [PPTX](decks/alert-design/alert-design.pptx) · [이미지](decks/alert-design/preview/) | [`viewer.html`](decks/alert-design/viewer.html) |
| incident-response | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/incident-response/viewer.html)** · [PDF](decks/incident-response/incident-response.pdf) · [PPTX](decks/incident-response/incident-response.pptx) · [이미지](decks/incident-response/preview/) | [`viewer.html`](decks/incident-response/viewer.html) |
| deployment-strategies | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/deployment-strategies/viewer.html)** · [PDF](decks/deployment-strategies/deployment-strategies.pdf) · [PPTX](decks/deployment-strategies/deployment-strategies.pptx) · [이미지](decks/deployment-strategies/preview/) | [`viewer.html`](decks/deployment-strategies/viewer.html) |
| ci-pipeline | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/ci-pipeline/viewer.html)** · [PDF](decks/ci-pipeline/ci-pipeline.pdf) · [PPTX](decks/ci-pipeline/ci-pipeline.pptx) · [이미지](decks/ci-pipeline/preview/) | [`viewer.html`](decks/ci-pipeline/viewer.html) |
| iac-drift | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/iac-drift/viewer.html)** · [PDF](decks/iac-drift/iac-drift.pdf) · [PPTX](decks/iac-drift/iac-drift.pptx) · [이미지](decks/iac-drift/preview/) | [`viewer.html`](decks/iac-drift/viewer.html) |
| postmortem | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/postmortem/viewer.html)** · [PDF](decks/postmortem/postmortem.pdf) · [PPTX](decks/postmortem/postmortem.pptx) · [이미지](decks/postmortem/preview/) | [`viewer.html`](decks/postmortem/viewer.html) |
| staging-parity | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/staging-parity/viewer.html)** · [PDF](decks/staging-parity/staging-parity.pdf) · [PPTX](decks/staging-parity/staging-parity.pptx) · [이미지](decks/staging-parity/preview/) | [`viewer.html`](decks/staging-parity/viewer.html) |
| backup-restore | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/backup-restore/viewer.html)** · [PDF](decks/backup-restore/backup-restore.pdf) · [PPTX](decks/backup-restore/backup-restore.pptx) · [이미지](decks/backup-restore/preview/) | [`viewer.html`](decks/backup-restore/viewer.html) |
| slo | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/slo/viewer.html)** · [PDF](decks/slo/slo.pdf) · [PPTX](decks/slo/slo.pptx) · [이미지](decks/slo/preview/) | [`viewer.html`](decks/slo/viewer.html) |
| secrets | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/secrets/viewer.html)** · [PDF](decks/secrets/secrets.pdf) · [PPTX](decks/secrets/secrets.pptx) · [이미지](decks/secrets/preview/) | [`viewer.html`](decks/secrets/viewer.html) |
| oncall-rotation | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/oncall-rotation/viewer.html)** · [PDF](decks/oncall-rotation/oncall-rotation.pdf) · [PPTX](decks/oncall-rotation/oncall-rotation.pptx) · [이미지](decks/oncall-rotation/preview/) | [`viewer.html`](decks/oncall-rotation/viewer.html) |
| observability-cost | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/observability-cost/viewer.html)** · [PDF](decks/observability-cost/observability-cost.pdf) · [PPTX](decks/observability-cost/observability-cost.pptx) · [이미지](decks/observability-cost/preview/) | [`viewer.html`](decks/observability-cost/viewer.html) |
| prod-access | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/prod-access/viewer.html)** · [PDF](decks/prod-access/prod-access.pdf) · [PPTX](decks/prod-access/prod-access.pptx) · [이미지](decks/prod-access/preview/) | [`viewer.html`](decks/prod-access/viewer.html) |
| lean-software-development | `slide-01.html` … `slide-05.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/lean-software-development/viewer.html)** · [PDF](decks/lean-software-development/lean-software-development.pdf) · [PPTX](decks/lean-software-development/lean-software-development.pptx) · [이미지](decks/lean-software-development/preview/) | [`viewer.html`](decks/lean-software-development/viewer.html) |
| ai-roadmap | `slide-01.html` … `slide-06.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/ai-roadmap/viewer.html)** · [PDF](decks/ai-roadmap/ai-roadmap.pdf) · [PPTX](decks/ai-roadmap/ai-roadmap.pptx) · [이미지](decks/ai-roadmap/preview/) | [`viewer.html`](decks/ai-roadmap/viewer.html) |
| style-showcase | `slide-01.html` … `slide-92.html` | **[뷰어](https://jeonck.github.io/pt-slide/decks/style-showcase/viewer.html)** · [PDF](decks/style-showcase/slides-grab-style-showcase.pdf) · [PPTX](decks/style-showcase/slides-grab-style-showcase.pptx) · [이미지](decks/style-showcase/README.md#브라우저에서-바로-보기) | [`viewer.html`](decks/style-showcase/viewer.html) |

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

## 포크해서 쓰기

이 저장소는 **템플릿으로 쓰라고 열어둔 것**이다. 덱 자체보다 `.claude/skills/deck/`에 들어 있는
작업 규칙이 본체다 — 두 축 예산, 계수 실측, `validate`가 통과시키는 결함 목록, 게이트 절차.

**스킬만 복사해 가면 동작하지 않는다.** 스킬은 파이프라인 세 지점에서 이 저장소의 스크립트를 부른다
(`new-deck.mjs`, `patch-viewer.mjs`, `build-contact-sheets.mjs`). 저장소째 가져가는 것이 맞다.

1. **포크하거나 "Use this template"으로 새 저장소를 만든다.**
2. **Settings → Pages → Source를 `GitHub Actions`로 바꾼다.** 이건 사람이 한 번 눌러야 한다 —
   워크플로 토큰은 이미 켜진 Pages에 배포만 할 수 있고 사이트를 처음 만들지는 못한다
   (`actions/configure-pages`가 `Resource not accessible by integration`을 낸다).
3. 사이트 주소는 자동으로 `https://<owner>.github.io/<repo>/`가 된다. 워크플로는 손댈 필요가 없다.
   위 표의 뷰어 링크만 이 저장소를 가리키니, **예제 덱이 필요 없으면 `decks/`를 비우고** 자기 덱을
   만들면 된다.
4. ```bash
   npm install
   npx playwright install chromium
   ```
5. Claude Code에서 한 줄이면 된다 — `decks/<name> 에 '<주제>' <N>장 덱 만들어줘`.
   더 많은 예시는 아래 [덱 만들기 — 프롬프트 사용법](#덱-만들기--프롬프트-사용법) 참고.

**알아둘 환경 전제.** 이 저장소는 *한글 폰트가 없고 CDN이 막힌* 컨테이너에서 만들어졌다. 그래서 폰트를
덱마다 로컬 임베드하고 npm에서 받는다. 폰트가 갖춰진 환경에서는 불필요한 수고지만 해롭지는 않고,
결과물이 어디서든 같게 렌더된다는 이점은 남는다. `references/troubleshooting.md`의 Playwright 빌드
번호 심링크 항목은 그 컨테이너 전용 우회이니, 같은 증상이 아니면 무시해도 된다.

## 덱 만들기 — 프롬프트 사용법

새 덱은 **`deck` 스킬**([`.claude/skills/deck/`](.claude/skills/deck/))이 처음부터 끝까지 끌고 간다.
스캐폴딩 → 스타일 선택 → 아웃라인 → 슬라이드 → validate → 디자인 게이트 → viewer·PDF·PPTX →
README → 푸시까지 정해진 순서로 간다. Claude Code에서 평범한 문장으로 말하면 된다.

아래는 **이 저장소의 덱 20종을 실제로 만들 때 쓴 프롬프트**다.

### 새 덱 만들기

가장 짧은 형태. 위치와 주제, 장수만 준다.

```
decks/ai-roadmap 에 '제조 현장의 AI 품질검사' 8장 덱 만들어줘
```

영문 덱이면 그렇게 말한다. 스타일·서체·구성은 스킬이 정하고, **왜 그 스타일을 골랐는지 알려준다.**

```
decks/feature-store 에 'Feature Store 도입 검토' 6장 영문 덱 만들어줘
```

첫 장과 마지막 장을 지정할 수도 있다.

```
decks/test-deck 에 '인공지능의 미래와 업무 자동화' 5장 덱 만들어줘.
첫 번째 슬라이드는 커버, 마지막은 Q&A로 해줘.
```

### 장별 내용을 직접 주기

주제만 주면 내용은 스킬이 구성한다. **장별 문구를 직접 주면 그 텍스트가 원문이 되고,
다듬거나 늘리거나 줄이지 않는다.** 레이아웃이 안 맞으면 문구 대신 레이아웃을 고친다.

```
decks/lean-software-development 에 아래의 내용으로 덱 만들어줘
---
슬라이드 1: 타이틀 및 개요
* 제목: Lean Software Development
* 핵심 내용: …
슬라이드 2: 7대 원칙 (1~4)
* 1. 낭비 제거: …
```

### 여러 덱을 한 번에

```
병렬 에이전트로 아래 것 모두 만들어줘.
--- Alert design — 무엇이 페이지를 받을 자격이 있나
/ Incident response — 온콜의 첫 30분
/ Deployment strategies — rolling / blue-green / canary
```

스타일이 겹치지 않게 배정되고, 끝나면 각 덱의 렌더를 확인한 뒤 한 커밋으로 올라간다.

### 기존 덱 고치기

```
decks/slo 3번 슬라이드의 표가 너무 빽빽해. 여백 좀 늘려줘
```

고친 뒤에는 validate → 렌더 재확인 → 게이트 재통과 → 재내보내기가 자동으로 따라온다.
슬라이드를 건드리면 게이트 영수증이 무효가 되므로 이 순서는 건너뛸 수 없다.

### 스타일 고르기

```
이 주제에 어울리는 스타일 뭐가 있어?
decks/slo 를 다른 스타일로 다시 만들어줘
```

번들 스타일 92종은 [견본 덱](decks/style-showcase/)에서 한 장씩 볼 수 있다.

### 막혔을 때

증상만 말해도 된다. 이 환경에서 실제로 났던 오류와 해법이 스킬에 들어 있다.

```
한글이 두부(□)로 나와
validate는 통과인데 렌더가 이상해
PPTX를 파워포인트에서 열었더니 제목이 다음 줄로 내려가
```

### 알아두면 좋은 것

| | |
|---|---|
| 수치·차트 | **출처를 댈 수 없으면 만들지 않는다.** 이 저장소의 덱에 수치가 없는 이유다. 실제 데이터를 주면 그때 쓴다 |
| 발표자 | `발표자 · 소속`은 자리표시자다. 발표 전에 채울 것 |
| 산출물 | 뷰어·PDF·PPTX·preview 이미지가 함께 나온다. PPTX는 **파워포인트에서 글자와 도형을 편집할 수 있다** |
| 배포 | `main`에 푸시하면 GitHub Pages로 자동 배포되고, 그 덱의 뷰어 URL을 알려준다 |

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

각 덱에 `gate-pass-a.md`(시스템 계약)와 `gate-pass-b.md`(청중 임팩트) 리포트, 그리고 `.slides-grab/`에 영수증이 들어 있다.

## 스크립트

| 경로 | 하는 일 |
|---|---|
| [`scripts/new-deck.mjs`](scripts/new-deck.mjs) | 새 덱 스캐폴딩 — 폴더, 로컬 임베드용 Pretendard(`--display`면 Latin 서체까지), 아웃라인 뼈대 |
| [`scripts/build-style-showcase.mjs`](scripts/build-style-showcase.mjs) | 스타일 스펙에서 팔레트·타이포·레이아웃을 읽어 견본 92장을 생성 |
| [`scripts/build-contact-sheets.mjs`](scripts/build-contact-sheets.mjs) | 렌더된 PNG를 3×4 컨택트 시트로 묶음. 기본은 리뷰용 큰 타일, `--web`은 README에 붙일 `preview/` 이미지 |
| [`scripts/build-pptx.mjs`](scripts/build-pptx.mjs) | 덱을 PPTX로 내보냄. 기본은 raster(장당 이미지), `--text`는 편집 가능한 텍스트를 지원하는 덱에 한해. `--probe-text`로 어느 덱이 되는지 확인 |
| [`scripts/build-index.mjs`](scripts/build-index.mjs) | 위 덱 표를 읽어 랜딩 페이지 `index.html`을 다시 생성. 덱을 추가하면 표에 줄을 넣고 이걸 돌린다 |
| [`scripts/patch-viewer.mjs`](scripts/patch-viewer.mjs) | `build-viewer`가 만든 뷰어를 보정 — 웹에서 폰트가 뜨게 하고, 슬라이드를 클릭한 뒤에도 화살표 키가 듣게 함. `build-viewer` 뒤에 매번 실행 |
| [`.github/workflows/pages.yml`](.github/workflows/pages.yml) | `main` 푸시마다 저장소를 <https://jeonck.github.io/pt-slide/>로 배포 |

```bash
node scripts/new-deck.mjs my-deck                                                # 새 덱 시작
node scripts/build-style-showcase.mjs
node scripts/build-contact-sheets.mjs decks/style-showcase/gate-preview          # 리뷰용
node scripts/build-contact-sheets.mjs decks/style-showcase/gate-preview --web    # README용 preview/
```

## 라이선스

이 저장소의 코드·스크립트·스킬·슬라이드는 [MIT](LICENSE)다.

**폰트는 별개다.** 각 덱의 `assets/fonts/`에 임베드된 웹폰트는 전부 **SIL Open Font License 1.1**이고,
라이선스 원문이 폰트 파일과 같은 폴더에 함께 들어 있다. MIT가 이 폰트들에까지 적용되는 것은 아니니,
재배포할 때 그 `*-LICENSE.txt` 파일을 같이 두면 된다 — OFL이 요구하는 것은 그게 전부다.

임베드된 서체: Anton, Archivo, Archivo Black, Arimo, EB Garamond, Geist, IBM Plex Mono, Inter,
JetBrains Mono, Noto Serif, Playfair Display, Pretendard, Source Serif 4, Space Grotesk, Work Sans.

`slides-grab` 자체와 번들 스타일 92종은 [NomaDamas/slides-grab](https://github.com/NomaDamas/slides-grab)의
라이선스를 따른다.

## 알아둘 것

- **폰트는 로컬 임베드.** 한글 폰트가 없는 환경에서도 그대로 렌더되도록 Pretendard(와 견본 덱의 Latin 서체 4종)를 각 덱의 `assets/fonts/`에 넣고 상대경로로 참조한다. 저장된 슬라이드 HTML에 원격 URL은 없다 — slides-grab 규칙이기도 하다.
- **한국어 줄바꿈.** 모든 슬라이드에 `word-break: keep-all`을 걸어 어절이 줄 중간에서 쪼개지지 않게 했다.
- **어느 덱에도 수치·차트가 없다.** 출처를 댈 수 있는 실측 데이터가 없어서 만들지 않았다. 실제 데이터를 주면 그때 쓴다.
- **커버와 Q&A의 `발표자 · 소속`은 자리표시자다.** 발표 전에 채울 것.
- **PPTX는 파워포인트에서 편집된다.** 글자도 도형도 실제 개체다(이미지가 아니다). 다만 서체 파일은 담기지 않으므로, 그 서체가 없는 컴퓨터에서는 대체 서체로 다시 흐른다. 각 덱의 `assets/fonts/`에 있는 파일을 설치하면 원본과 같아진다.
- **Figma(`figma`) 내보내기는 slides-grab에서 experimental / unstable로 표시돼 있다.** 손보정이 필요할 수 있다.
