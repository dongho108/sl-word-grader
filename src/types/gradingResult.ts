// 오답 상세 정보
export interface WrongAnswer {
  questionNumber: number;
  studentAnswer: string;
  correctAnswer: string;
  reason: string; // 철자 오류, 단어 혼동, 미작성 등
}

// 채점 결과
export interface GradingResult {
  id: string;
  examSheetId: string;
  studentName: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  wrongAnswers: WrongAnswer[];
  gradedAt: number;
}

// 저장용 채점 결과 (로컬 스토리지)
export interface StoredGradingResult {
  id: string;
  examSheetId: string;
  studentName: string;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  wrongAnswers: WrongAnswer[];
  gradedAt: number;
}
