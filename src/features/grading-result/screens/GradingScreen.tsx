import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';
import { useGradingResultStore } from '../../../store';
import { useAnswerSheetStore, useExamSheetStore } from '../../../store';
import { GradingResult } from '../../../types';

// Mock 데이터 생성 함수
const generateMockResult = (): GradingResult => ({
  id: `result_${Date.now()}`,
  examSheetId: 'exam_001',
  studentName: '김영희',
  totalQuestions: 20,
  correctCount: 18,
  wrongCount: 2,
  wrongAnswers: [
    {
      questionNumber: 5,
      studentAnswer: 'grammer',
      correctAnswer: 'grammar',
      reason: '철자 오류',
    },
    {
      questionNumber: 12,
      studentAnswer: 'recieve',
      correctAnswer: 'receive',
      reason: '철자 오류 (i/e 순서)',
    },
  ],
  gradedAt: Date.now(),
});

export const GradingScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { setResult, setLoading } = useGradingResultStore();
  const answerSheetPages = useAnswerSheetStore((state) => state.pages);
  const examSheetPages = useExamSheetStore((state) => state.pages);

  useEffect(() => {
    // 채점 시뮬레이션 (2-3초 후 결과 화면으로 이동)
    const timer = setTimeout(() => {
      const mockResult = generateMockResult();
      setResult(mockResult);
      setLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'GradingResult' as never }],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, setResult, setLoading]);

  const answerSheetPreview = answerSheetPages[0]?.uri;
  const examSheetPreview = examSheetPages[0]?.uri;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>채점</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <View style={styles.loadingBlur} />
          <ActivityIndicator size="large" color="#137FEC" style={styles.spinner} />
        </View>

        {/* Image Previews */}
        <View style={styles.imageRow}>
          <View style={styles.imageCard}>
            {answerSheetPreview ? (
              <Image source={{ uri: answerSheetPreview }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <Text style={styles.imageLabel}>정답지</Text>
          </View>
          <View style={styles.imageCard}>
            {examSheetPreview ? (
              <Image source={{ uri: examSheetPreview }} style={styles.previewImage} />
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <Text style={styles.imageLabel}>시험지</Text>
          </View>
        </View>
      </View>

      {/* Bottom Button (Disabled) */}
      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.disabledButton}>
          <ActivityIndicator size="small" color="#94A3B8" style={styles.buttonSpinner} />
          <Text style={styles.disabledButtonText}>채점 중...</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F8',
  },
  header: {
    backgroundColor: '#F7F8F8E6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  loadingContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  loadingBlur: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#137FEC20',
  },
  spinner: {
    transform: [{ scale: 1.5 }],
  },
  imageRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  imageCard: {
    alignItems: 'center',
  },
  previewImage: {
    width: 192,
    height: 256,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  placeholderImage: {
    width: 192,
    height: 256,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  imageLabel: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: '#647488',
  },
  bottomContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  disabledButton: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpinner: {
    marginRight: spacing.sm,
  },
  disabledButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#94A3B8',
  },
});
