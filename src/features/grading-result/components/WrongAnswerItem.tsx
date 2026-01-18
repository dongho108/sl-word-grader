import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';
import { WrongAnswer } from '../../../types';

interface WrongAnswerItemProps {
  item: WrongAnswer;
}

export const WrongAnswerItem: React.FC<WrongAnswerItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{item.questionNumber}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.answerRow}>
          <Text style={styles.label}>학생 답안:</Text>
          <Text style={styles.wrongAnswer}>
            {item.studentAnswer || '(미작성)'}
          </Text>
        </View>
        <View style={styles.answerRow}>
          <Text style={styles.label}>정답:</Text>
          <Text style={styles.correctAnswer}>{item.correctAnswer}</Text>
        </View>
        <Text style={styles.reason}>{item.reason}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.error + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  numberText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
  },
  content: {
    flex: 1,
  },
  answerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 13,
    color: '#647488',
    marginRight: spacing.xs,
  },
  wrongAnswer: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.error,
    textDecorationLine: 'line-through',
  },
  correctAnswer: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  reason: {
    fontSize: 12,
    color: '#647488',
    marginTop: spacing.xs,
  },
});
