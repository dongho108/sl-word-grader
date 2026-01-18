import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';

interface ResultActionsProps {
  onNextStudent: () => void;
  onGoHome: () => void;
}

export const ResultActions: React.FC<ResultActionsProps> = ({
  onNextStudent,
  onGoHome,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + spacing.md }]}>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onNextStudent}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>다음 학생 채점하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onGoHome}
        activeOpacity={0.7}
      >
        <Text style={styles.secondaryButtonText}>홈으로</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8F880',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  primaryButton: {
    backgroundColor: '#137FEC',
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    shadowColor: '#137FEC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  secondaryButton: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#647488',
  },
});
