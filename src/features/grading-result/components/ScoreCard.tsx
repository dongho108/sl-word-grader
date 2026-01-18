import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';

type ScoreCardType = 'correct' | 'wrong';

interface ScoreCardProps {
  type: ScoreCardType;
  count: number;
  label: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  type,
  count,
  label,
}) => {
  const iconColor = type === 'correct' ? colors.success : colors.error;

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}15` }]}>
        <View style={[styles.iconDot, { backgroundColor: iconColor }]} />
      </View>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    padding: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  count: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 14,
    color: '#647488',
  },
});
