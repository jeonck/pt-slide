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
- **반복 요소 중 하나에만 강조를 붙여 그 항목만 밀린 경우** — 각 행이 제 박스 안에 있으니
  넘침도 겹침도 아니다. `references/slide-html.md`의 "하나만 강조하면 그 하나만 밀린다" 참고
- **한 줄인 줄 알았던 라벨이 감겨서 그 아래가 전부 밀린 경우** — 글자 수 예산의 계수를 추정으로
  잡으면 난다. `references/slide-html.md`의 "재는 법"으로 실제 문자열의 폭을 잰다
- 대비가 모자라 안 읽히는 글자
- 의미는 통하지만 어색한 줄바꿈
- 배경과 같은 색으로 칠해져 사라진 요소

그래서 렌더 확인은 선택이 아니다. `png`로 뽑아 실제로 열어본다.

## 뷰어를 브라우저로 열면 폰트가 다르게 나온다

슬라이드 파일(`slide-01.html`)을 직접 열면 멀쩡한데 `viewer.html`로 보면 서체가 다르다. 한글이면
두부가 되기도 한다.

`build-viewer`가 만드는 뷰어는 각 슬라이드를 `<iframe srcdoc sandbox="allow-scripts">`에 넣는다.
`allow-same-origin`이 없으면 그 문서의 origin이 `null`이 되고, `@font-face` 요청은 **항상** CORS
요청이라 `Access-Control-Allow-Origin`을 주지 않는 정적 호스트에서는 전부 실패한다. GitHub Pages,
`python -m http.server` 둘 다 해당한다. 페이지는 그려지고 콘솔에만 오류가 남는다.

```bash
node scripts/patch-viewer.mjs                  # 전체
node scripts/patch-viewer.mjs decks/<name>
```

슬라이드에는 `<script>`가 없으므로 `allow-scripts`는 필요 없다. 이걸 `allow-same-origin`으로 바꾼다.
둘을 **같이** 주면 프레임 안 콘텐츠가 자기 샌드박스를 해제할 수 있으니 그렇게 하지 않는다.
`build-viewer`를 다시 돌리면 원상복구되므로 그때마다 다시 실행한다.

확인은 브라우저에서 뷰어를 HTTP로 띄우고 프레임 문서의 `document.fonts`가 실제로 `loaded`인지 본다 —
`file://`로 열면 이 결함이 재현되지 않는다.

## 뷰어에서 화살표 키가 듣지 않는다

처음에는 되다가 슬라이드를 한 번 클릭하면 멈춘다. 뷰어는 자기 document에 키 핸들러를 걸어두는데,
클릭이 포커스를 iframe 안으로 옮기고 **프레임 안 keydown은 부모 document로 버블링하지 않는다.**

`node scripts/patch-viewer.mjs`가 부모 쪽에서 각 프레임 document에 핸들러를 걸어 해결한다. 프레임
안 스크립트는 샌드박스에 막혀 있지만, 같은 출처라 **부모가 밖에서** 리스너를 붙일 수 있다.

이 결함은 클릭하지 않고 테스트하면 재현되지 않는다. 확인할 때는 슬라이드를 한 번 클릭한 다음 키를 누른다.

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
