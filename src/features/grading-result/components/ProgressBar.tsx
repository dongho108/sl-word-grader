import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';

interface ProgressBarProps {
  totalQuestions: number;
  correctCount: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalQuestions,
  correctCount,
}) => {
  const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>정답률</Text>
        <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
      </View>
      <View style={styles.trackContainer}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${percentage}%` }]} />
        </View>
      </View>
      <Text style={styles.summaryText}>
        총 {totalQuestions}문제 중 {correctCount}문제 정답
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#137FEC',
  },
  trackContainer: {
    marginBottom: spacing.sm,
  },
  track: {
    height: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#137FEC',
    borderRadius: 9999,
  },
  summaryText: {
    fontSize: 13,
    color: '#647488',
    textAlign: 'right',
  },
});
