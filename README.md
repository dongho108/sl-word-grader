# SL Prime

React Native 기반의 정답지 촬영 및 채점 도우미 앱입니다.

## 요구 사항

- **Node.js**: v20 이상
- **Java**: JDK 17
- **Android Studio**: 최신 버전 (에뮬레이터 포함)
- **Xcode**: 최신 버전 (iOS 개발 시)

## 설치

```bash
# 의존성 설치
npm install

# iOS의 경우 CocoaPods 설치
cd ios && bundle install && bundle exec pod install && cd ..
```

## 개발 서버 실행

### Metro 번들러 시작

```bash
# 기본 실행
npm start

# 캐시 초기화 후 실행 (문제 발생 시)
npm start -- --reset-cache

# 이미 포트가 사용중이라면
lsof -ti:8081 | xargs kill -9

```

### 앱 실행

```bash
# Android
npm run android

# iOS
npm run ios
```

## 에뮬레이터 명령어

### Android 에뮬레이터

```bash
# 사용 가능한 에뮬레이터 목록 확인
emulator -list-avds

# 에뮬레이터 시작
emulator -avd Medium_Phone_API_36.1 &

# 연결된 디바이스 확인
adb devices

# 에뮬레이터 종료
adb emu kill

# 에뮬레이터 재시작 (한 줄)
adb emu kill && sleep 2 && emulator -avd <에뮬레이터_이름> &
```

### 앱 새로고침 (Hot Reload)

| 방법 | 설명 |
|------|------|
| `r` | Metro 터미널에서 입력 |
| `R` 두 번 | 에뮬레이터에서 입력 |
| `Cmd + M` → Reload | Android 개발자 메뉴 |
| `Cmd + R` | iOS 시뮬레이터 |

### 디버깅

```bash
# Android 로그 확인
adb logcat | grep -E "(ReactNative|ReactNativeJS)"

# 개발자 메뉴 열기
adb shell input keyevent 82
```

## Node 버전 관리 (nvm)

```bash
# Node 20 설치
nvm install 20

# Node 20 사용
nvm use 20

# 현재 Node 버전 확인
node --version
```

## 문제 해결

### 하얀 화면이 보일 때

1. Metro 번들러가 실행 중인지 확인
2. 캐시 초기화 후 재시작
   ```bash
   npm start -- --reset-cache
   ```
3. Node 버전이 20 이상인지 확인
   ```bash
   node --version
   nvm use 20
   ```

### 빌드 에러 발생 시

```bash
# Android 빌드 캐시 정리
cd android && ./gradlew clean && cd ..

# iOS 빌드 캐시 정리
cd ios && rm -rf build Pods && bundle exec pod install && cd ..

# node_modules 재설치
rm -rf node_modules && npm install
```

### Metro 프로세스 강제 종료

```bash
pkill -f "react-native"
pkill -f "metro"
```

## 프로젝트 구조

```
src/
├── api/                 # 외부 API 통신
├── components/          # 공통 UI 컴포넌트 (Atomic Design)
│   ├── atoms/          # Button, Text, IconButton
│   ├── molecules/      # Header, Thumbnail, ConfirmModal
│   └── organisms/      # ThumbnailSlider
├── features/           # 기능별 모듈
│   └── answer-sheet/   # 정답지 등록 기능
│       ├── components/ # 기능 전용 UI
│       ├── hooks/      # Custom Hooks
│       └── screens/    # 화면 컴포넌트
├── navigation/         # 네비게이션 설정
├── store/              # 전역 상태 관리 (Zustand)
├── theme/              # 테마 (colors, typography, spacing)
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수
```

## 기술 스택

- **React Native** 0.79
- **TypeScript**
- **Zustand** - 상태 관리
- **React Navigation** - 네비게이션
- **React Native Vision Camera** - 카메라
- **React Native Image Picker** - 갤러리

## 라이선스

Private Repository
