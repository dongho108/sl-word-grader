import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';

interface ScoreBadgeProps {
  studentName: string;
  score: number;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  studentName,
  score,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.studentName}>{studentName}</Text>
      <View style={styles.scoreBadge}>
        <Text style={styles.scoreText}>{score}점</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  studentName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
  },
  scoreBadge: {
    backgroundColor: colors.white,
    borderRadius: 9999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#137FEC',
  },
});
