import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';
import { WrongAnswer } from '../../../types';
import { WrongAnswerItem } from './WrongAnswerItem';

interface WrongAnswerListProps {
  wrongAnswers: WrongAnswer[];
}

export const WrongAnswerList: React.FC<WrongAnswerListProps> = ({
  wrongAnswers,
}) => {
  if (wrongAnswers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>O</Text>
        </View>
        <Text style={styles.emptyTitle}>모두 정답입니다!</Text>
        <Text style={styles.emptySubtitle}>틀린 문제가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>오답 분석</Text>
      <Text style={styles.sectionSubtitle}>
        {wrongAnswers.length}개의 문제를 틀렸습니다
      </Text>
      <FlatList
        data={wrongAnswers}
        keyExtractor={(item) => `wrong-${item.questionNumber}`}
        renderItem={({ item }) => <WrongAnswerItem item={item} />}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#647488',
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.success + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  successEmoji: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.success,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#647488',
  },
});
