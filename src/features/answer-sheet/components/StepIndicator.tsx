import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/atoms';
import { spacing } from '../../../theme';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index < currentStep ? styles.dotActive : styles.dotInactive,
              index < currentStep && { width: 32 },
            ]}
          />
        ))}
      </View>
      <Text style={styles.stepText}>
        Step {currentStep} of {totalSteps}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 6,
    width: 8,
    borderRadius: 9999,
  },
  dotActive: {
    backgroundColor: '#137FEC',
  },
  dotInactive: {
    backgroundColor: '#CFD8E7',
  },
  stepText: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
  },
});
