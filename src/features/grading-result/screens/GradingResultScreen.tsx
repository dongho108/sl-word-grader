import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';
import { useGradingResultStore, useExamSheetStore } from '../../../store';
import {
  ScoreBadge,
  ScoreCard,
  ProgressBar,
  WrongAnswerList,
  ResultActions,
} from '../components';

export const GradingResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { result, clearResult } = useGradingResultStore();
  const { clearAll: clearExamSheet } = useExamSheetStore();

  const handleNextStudent = useCallback(() => {
    clearResult();
    clearExamSheet();
    navigation.reset({
      index: 0,
      routes: [{ name: 'ExamSheetRegistration' as never }],
    });
  }, [clearResult, clearExamSheet, navigation]);

  const handleGoHome = useCallback(() => {
    clearResult();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' as never }],
    });
  }, [clearResult, navigation]);

  const handleBack = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ExamSheetRegistration' as never }],
    });
  }, [navigation]);

  // Mock 데이터 (result가 없을 경우 대비)
  const displayResult = result || {
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
  };

  const score = Math.round(
    (displayResult.correctCount / displayResult.totalQuestions) * 100
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>채점 결과</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Badge */}
        <ScoreBadge studentName={displayResult.studentName} score={score} />

        {/* Score Cards */}
        <View style={styles.scoreCardsRow}>
          <ScoreCard
            type="correct"
            count={displayResult.correctCount}
            label="정답"
          />
          <ScoreCard
            type="wrong"
            count={displayResult.wrongCount}
            label="오답"
          />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <ProgressBar
            totalQuestions={displayResult.totalQuestions}
            correctCount={displayResult.correctCount}
          />
        </View>

        {/* Wrong Answer List */}
        <View style={styles.wrongAnswerSection}>
          <WrongAnswerList wrongAnswers={displayResult.wrongAnswers} />
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <ResultActions onNextStudent={handleNextStudent} onGoHome={handleGoHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F8F8E6',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  headerSpacer: {
    width: 48,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  scoreCardsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  progressSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  wrongAnswerSection: {
    marginTop: spacing.md,
  },
});
