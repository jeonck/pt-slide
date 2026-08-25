# 막혔을 때

이 환경에서 실제로 난 오류와 해법. 처음 보는 오류라면 추측하기 전에 여기부터 본다.

## `browserType.launch: Executable doesn't exist at /opt/pw-browsers/chromium_headless_shell-XXXX/...`

validate·png·pdf가 전부 여기서 멈춘다. slides-grab이 쓰는 Playwright 버전이 요구하는 브라우저 빌드 번호와, 컨테이너에 미리 설치된 번호가 다를 때 난다.

**`npx playwright install`을 실행하지 않는다** — 이 환경은 브라우저를 미리 넣어두고 다운로드를 막아둔다. 설치된 빌드에 요구 번호로 별칭을 만든다:

```bash
B=/opt/pw-browsers
HAVE=$(ls $B | grep -oP 'chromium-\K[0-9]+' | head -1)   # 설치된 번호
WANT=<오류 메시지에 찍힌 번호>

mkdir -p $B/chromium-$WANT
ln -sfn $B/chromium-$HAVE/chrome-linux $B/chromium-$WANT/chrome-linux
touch $B/chromium-$WANT/INSTALLATION_COMPLETE $B/chromium-$WANT/DEPENDENCIES_VALIDATED

mkdir -p $B/chromium_headless_shell-$WANT/chrome-headless-shell-linux64
for f in $B/chromium_headless_shell-$HAVE/chrome-linux/*; do
  ln -sfn "$f" "$B/chromium_headless_shell-$WANT/chrome-headless-shell-linux64/$(basename $f)"
done
ln -sfn $B/chromium_headless_shell-$HAVE/chrome-linux/headless_shell \
        $B/chromium_headless_shell-$WANT/chrome-headless-shell-linux64/chrome-headless-shell
touch $B/chromium_headless_shell-$WANT/INSTALLATION_COMPLETE $B/chromium_headless_shell-$WANT/DEPENDENCIES_VALIDATED
```

헤드리스 셸은 바이너리 이름까지 다르다(`headless_shell` → `chrome-headless-shell`). 디렉터리만 링크하면 안 되고 마지막 줄이 필요하다.

컨테이너 한정 수정이라 리포에는 커밋하지 않는다.

## 한글이 두부(□)로 나온다

컨테이너에 한글 폰트가 없다. `fc-list :lang=ko`로 확인하면 CJK 폴백밖에 없다.

`node scripts/new-deck.mjs <name>`이 Pretendard를 덱의 `assets/fonts/`에 넣어준다. 이미 있는 덱이라면 `@font-face`가 실제로 그 파일을 가리키는지, 경로가 상대경로(`./assets/fonts/...`)인지 확인한다.

## `curl: (56) CONNECT tunnel failed, response 403`

egress 프록시가 그 호스트를 막고 있다. jsDelivr, `jeonck.github.io` 등이 여기 해당한다.

npm 레지스트리는 열려 있으므로 웹폰트·라이브러리는 npm 패키지로 받는다:

```bash
npm install --no-save pretendard @fontsource/<face>
```

배포된 Pages 사이트도 이 환경에서는 열리지 않는다. 배포 성공 여부는 Actions 실행 결과로 확인하고, **직접 열어보지 못했다는 사실을 사용자에게 밝힌다.**

## `ENOENT: no such file or directory, scandir '.../decks/<name>/decks/<name>'`

덱 폴더로 `cd`한 상태에서 `--slides-dir decks/<name>`을 줬다. slides-grab 명령은 **리포 루트에서** 실행한다. Bash 도구는 작업 디렉터리를 유지하므로 이전 명령의 `cd`가 남아 있을 수 있다.

## `Design gate cannot proceed: Pass B is missing required Confidence: High|Medium|Low`

Confidence 값은 저 셋 중 하나여야 한다. `Medium-High` 같은 값은 거부된다.

같은 계열의 거부 사유들 — 리포트에 다음이 전부 있어야 한다: 역할 제목, `VERDICT: PASS`, Confidence, 증거 PNG 파일명, 모든 `slide-*.html`의 현재 sha256, `Unresolved Critical: 0`, `Blocking findings: None`, 소견 표, 필수 체크 항목 전부 PASS.

## `pdf`/`convert`/`figma`가 게이트를 요구한다

슬라이드를 고치면 지문이 달라져 영수증이 무효가 된다. validate → png 재촬영 → 리포트의 지문 갱신 → `design-gate --verdict proceed` 순으로 다시 받는다.

## validate는 통과인데 렌더가 이상하다

`validate`가 보는 것은 프레임 밖 넘침, 텍스트 클리핑, **형제 요소** 겹침, 빈 캔버스다.
다음은 통과시키고 지나간다:

- **자식이 부모를 넘쳐서 다른 블록 위로 올라타는 경우** — 타이틀 블록·하단 밴드 같은 고정
  furniture가 있는 스타일에서 제일 자주 난다. `references/slide-html.md`의 높이 예산 섹션 참고
- 대비가 모자라 안 읽히는 글자
- 의미는 통하지만 어색한 줄바꿈
- 배경과 같은 색으로 칠해져 사라진 요소

그래서 렌더 확인은 선택이 아니다. `png`로 뽑아 실제로 열어본다.

## 화살표가 노드에 닿으면 `sibling-overlap` 경고가 난다

다이어그램에서 엣지가 목표 노드 테두리에 닿으면 바운딩 박스가 겹쳐 경고가 뜬다.
**에러가 아니라 경고이고, 그게 다이어그램의 의미다.** 고치지 말고 게이트 리포트에 Note로 남긴다.

## 스타일 스펙의 `hex` 필드가 색이 아니다

번들 스타일 데이터에는 `hex` 자리에 문장이 들어 있는 경우가 있다:

```
"#FF6B35 → #FF0080"        (그라디언트 표기)
"RGBA(200,255,180,0.85)"
"TRANSPARENT → #00C8FF"
```

이걸 그대로 CSS에 넣으면 무효한 색이 되어 요소가 조용히 검게 렌더된다. 정규식으로 첫 6자리 hex만 뽑아 쓰고, 뽑히지 않으면 버린다.

## PDF가 너무 크다

기본 캡처 해상도가 2160p다. `--resolution 1080p`를 주면 92장 기준 12MB가 4.9MB가 된다. 화면·검토용으로는 충분하다.

## Actions에서 `Create Pages site failed: Resource not accessible by integration`

워크플로 토큰은 이미 켜진 Pages에 배포만 할 수 있고 사이트를 처음 만들지는 못한다. Pages는 이미 켜져 있으므로 지금은 나지 않아야 하는 오류지만, 사이트가 삭제되면 다시 난다. 그때는 Settings → Pages → Source를 `GitHub Actions`로 사람이 한 번 눌러야 한다.
