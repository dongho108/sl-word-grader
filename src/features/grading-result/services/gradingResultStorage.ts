import AsyncStorage from '@react-native-async-storage/async-storage';
import { GradingResult, StoredGradingResult } from '../../../types';

const STORAGE_KEY = '@grading_result';

export const gradingResultStorage = {
  async save(result: GradingResult): Promise<void> {
    try {
      const storedResult: StoredGradingResult = {
        id: result.id,
        examSheetId: result.examSheetId,
        studentName: result.studentName,
        totalQuestions: result.totalQuestions,
        correctCount: result.correctCount,
        wrongCount: result.wrongCount,
        wrongAnswers: result.wrongAnswers,
        gradedAt: result.gradedAt,
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedResult));
    } catch (error) {
      console.error('채점 결과 저장 실패:', error);
      throw error;
    }
  },

  async load(): Promise<GradingResult | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return null;

      const storedResult: StoredGradingResult = JSON.parse(data);
      return {
        id: storedResult.id,
        examSheetId: storedResult.examSheetId,
        studentName: storedResult.studentName,
        totalQuestions: storedResult.totalQuestions,
        correctCount: storedResult.correctCount,
        wrongCount: storedResult.wrongCount,
        wrongAnswers: storedResult.wrongAnswers,
        gradedAt: storedResult.gradedAt,
      };
    } catch (error) {
      console.error('채점 결과 로드 실패:', error);
      return null;
    }
  },

  async exists(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data !== null;
    } catch (error) {
      console.error('채점 결과 존재 확인 실패:', error);
      return false;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('채점 결과 삭제 실패:', error);
      throw error;
    }
  },
};
