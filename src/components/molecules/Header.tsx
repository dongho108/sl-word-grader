import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, IconButton } from '../atoms';
import { colors, spacing } from '../../theme';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  pageInfo?: {
    current: number;
    total: number;
  };
  rightElement?: React.ReactNode;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  pageInfo,
  rightElement,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      <View style={styles.content}>
        <View style={styles.left}>
          {onBack && (
            <IconButton
              icon="back"
              onPress={onBack}
              variant="default"
              size="md"
            />
          )}
        </View>

        <View style={styles.center}>
          <Text variant="h3">{title}</Text>
        </View>

        <View style={styles.right}>
          {pageInfo && (
            <Text variant="bodySmall" color="secondary">
              {pageInfo.current}/{pageInfo.total}
            </Text>
          )}
          {rightElement}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: spacing.sm,
  },
  left: {
    width: 48,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 48,
    alignItems: 'flex-end',
  },
});
