# 프로젝트 지침: React Native & Gemini Vision AI

## 1. 아키텍처 및 폴더 구조 (Clean Architecture)
유지보수와 확장을 위해 기능을 중심으로 레이어를 분리합니다.

### Directory Structure
- `src/api`: 외부 API 통신
- `src/components`: 재사용 가능한 공통 UI 컴포넌트 (Atomic Design)
- `src/features`: 기능별 모듈 (예: `camera-scanner`, `action-handler`)
    - `components/`: 해당 기능 전용 UI
    - `hooks/`: 비동기 로직 및 상태 관리 (Custom Hooks)
    - `services/`: 비즈니스 로직
- `src/store`: 전역 상태 관리 (Zustand 또는 Redux Toolkit)
- `src/utils`: 이미지 압축, 권한 체크 등 유틸리티

---

## 2. 개발 원칙 (Development Rules)

### 2.1 UI & UX
- **TypeScript First**: 모든 Props와 State에 엄격한 Interface/Type 정의 필수.
- **Fast Refresh**: 로직 변경 시 상태가 유지되도록 Functional Component와 Hooks 사용 준수.
- **Loading & Error UX**: 카메라 권한 거부, AI 분석 지연 시의 예외 UI를 반드시 포함.

### 2.2 카메라 및 성능 (Performance)
- **Vision Camera**: `react-native-vision-camera`를 주력으로 사용.
- **Zero-Copy**: 프레임 프로세싱 시 불필요한 이미지 복사 방지.
- **Optimization**: AI 전송 전 `react-native-image-resizer`로 이미지 최적화 필수.

### 2.3 AI Interaction
- **Prompt Engineering**: 시스템 프롬프트에 JSON 출력을 강제하여 앱 내 자동화를 구현함.
- **Streaming**: 긴 응답이 필요한 경우 응답 스트리밍 고려.

---

## 3. AI (Claude/Cursor) 코딩 가이드
- **Custom Hooks**: 데이터 페칭과 비즈니스 로직은 반드시 Custom Hook으로 분리할 것.
- **Native Modules**: 안드로이드/iOS 네이티브 설정(Info.plist, AndroidManifest) 변경 시 변경 사항을 명시할 것.
- **Safety**: API Key는 반드시 `.env`에서 관리하고 코드로 노출하지 말 것.