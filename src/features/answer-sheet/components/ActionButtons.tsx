import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, Button } from '../../../components/atoms';
import { colors, spacing, sizes } from '../../../theme';

interface ActionButtonsProps {
  onCapture: () => void;
  onPickGallery: () => void;
  onComplete: () => void;
  isCapturing: boolean;
  canComplete: boolean;
  pageCount: number;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCapture,
  onPickGallery,
  onComplete,
  isCapturing,
  canComplete,
  pageCount,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + spacing.md }]}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onPickGallery}
          activeOpacity={0.7}
        >
          <Text style={styles.iconText}>🖼️</Text>
          <Text variant="caption" color="secondary">
            갤러리
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.captureButton}
          onPress={onCapture}
          disabled={isCapturing}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.captureInner,
              isCapturing && styles.captureInnerActive,
            ]}
          />
        </TouchableOpacity>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.bottomRow}>
        <Button
          variant="primary"
          onPress={onComplete}
          disabled={!canComplete}
          fullWidth
        >
          {`등록완료 (${pageCount}장)`}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  secondaryButton: {
    width: 60,
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.primary[600],
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[600],
  },
  captureInnerActive: {
    backgroundColor: colors.primary[400],
  },
  placeholder: {
    width: 60,
  },
  bottomRow: {
    marginTop: spacing.sm,
  },
});
