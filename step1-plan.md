구현 순서

Step 1: 라이브러리 설치 및 네이티브 설정

설치할 패키지:
- react-native-vision-camera - 카메라 촬영
- react-native-image-picker - 갤러리 선택
- @react-native-async-storage/async-storage - 로컬
  스토리지
- @bam.tech/react-native-image-resizer - 이미지 최적화
- @react-navigation/native,
  @react-navigation/native-stack, react-native-screens -
  네비게이션
- zustand - 상태 관리

네이티브 설정:
- iOS: Info.plist에 카메라/갤러리 권한 추가
- Android: AndroidManifest.xml에 카메라/스토리지 권한
  추가
- cd ios && pod install

 ---
Step 2: 폴더 구조 생성 및 테마 설정

생성할 폴더:
src/
├── components/atoms/       # Button, IconButton, Text
├── components/molecules/   # Header, Thumbnail,
ConfirmModal
├── components/organisms/   # ThumbnailSlider
├── features/answer-sheet/  # 정답지 등록 기능
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── screens/
├── navigation/
├── store/
├── theme/
├── types/
└── utils/

생성할 파일:
- src/theme/colors.ts - 컬러 팔레트 (#2563EB, #3B82F6
  등)
- src/theme/typography.ts - 타이포그래피
- src/theme/spacing.ts - 여백/크기

 ---
Step 3: 공통 컴포넌트 구현

Atoms:
- src/components/atoms/Button.tsx -
  primary/secondary/danger/disabled 버튼
- src/components/atoms/IconButton.tsx -
  카메라/갤러리/삭제/뒤로가기 아이콘 버튼
- src/components/atoms/Text.tsx - 스타일링된 텍스트

Molecules:
- src/components/molecules/Header.tsx - 뒤로가기 +
  타이틀 + 페이지 카운터
- src/components/molecules/Thumbnail.tsx - 썸네일 +
  삭제/재촬영 버튼
- src/components/molecules/ConfirmModal.tsx - 덮어쓰기
  확인 팝업

Organisms:
- src/components/organisms/ThumbnailSlider.tsx - 가로
  스크롤 썸네일 목록

 ---
Step 4: 서비스 및 유틸리티 구현

Services:
- src/features/answer-sheet/services/imageProcessor.ts
- 이미지 리사이즈, Base64 변환
- src/features/answer-sheet/services/answerSheetStorag
  e.ts - AsyncStorage CRUD

Utils:
- src/utils/permissions.ts - 카메라/갤러리 권한 체크

 ---
Step 5: 상태 관리 구현

Zustand Store:
- src/store/useAnswerSheetStore.ts
    - pages: 이미지 목록
    - addPage, removePage, replacePage 액션
    - completeRegistration, loadFromStorage

Custom Hooks:
- src/features/answer-sheet/hooks/useCamera.ts -
  카메라 초기화/촬영
- src/features/answer-sheet/hooks/useImagePicker.ts -
  갤러리 선택
- src/features/answer-sheet/hooks/useAnswerSheetImages
  .ts - 이미지 관리 통합

 ---
Step 6: 정답지 등록 화면 구현

Feature Components:
-
src/features/answer-sheet/components/CameraPreview.tsx
- 카메라 프리뷰
-
src/features/answer-sheet/components/ImagePreview.tsx
- 촬영된 이미지 표시
-
src/features/answer-sheet/components/ActionButtons.tsx
- 촬영/갤러리/완료 버튼

Screen:
- src/features/answer-sheet/screens/AnswerSheetRegistr
  ationScreen.tsx
    - Header: 뒤로가기 + "정답지 등록" + 페이지 카운터
    - 중앙: 카메라 프리뷰 또는 촬영된 이미지
    - ThumbnailSlider: 촬영된 이미지 목록
    - ActionButtons: 촬영/갤러리/등록완료 버튼

 ---
Step 7: 네비게이션 설정 및 통합

Navigation:
- src/navigation/types.ts - 타입 정의
- src/navigation/RootNavigator.tsx - 스택 네비게이터
- App.tsx 수정 - NavigationContainer 적용

 ---
핵심 파일 목록

| 파일
| 용도          |
|-----------------------------------------------------
----------------|---------------|
| src/features/answer-sheet/screens/AnswerSheetRegistr
ationScreen.tsx | 메인 화면     |
| src/store/useAnswerSheetStore.ts
| 상태 관리     |
| src/features/answer-sheet/hooks/useCamera.ts
| 카메라 로직   |
| src/features/answer-sheet/services/answerSheetStorag
e.ts            | 로컬 저장     |
| src/theme/colors.ts
| 디자인 시스템 |

 ---
디자인 가이드
- 정답지 등록화면: https://www.figma.com/design/XeGkSAPAB0xjkyeU8IVc6H/sl?node-id=4-483&t=VUoCvAGWvlzqXcG9-4
- 시험지 등록 카메라: https://www.figma.com/design/XeGkSAPAB0xjkyeU8IVc6H/sl?node-id=4-900&t=VUoCvAGWvlzqXcG9-4
- 채점 화면: https://www.figma.com/design/XeGkSAPAB0xjkyeU8IVc6H/sl?node-id=4-698&t=VUoCvAGWvlzqXcG9-4
- 채점 결과: https://www.figma.com/design/XeGkSAPAB0xjkyeU8IVc6H/sl?node-id=4-765&t=VUoCvAGWvlzqXcG9-4

 ---
작동 규칙

- 최소 1페이지 이상 촬영해야 등록 완료 가능
- 등록 완료 시 홈 화면으로 이동
- 기존 정답지가 있으면 덮어쓰기 확인 팝업 표시
- 이미지는 Base64로 변환하여 AsyncStorage에 저장