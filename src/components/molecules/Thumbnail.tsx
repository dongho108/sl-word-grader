import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Text, IconButton } from '../atoms';
import { colors, sizes, spacing } from '../../theme';

interface ThumbnailProps {
  uri: string;
  pageNumber: number;
  isSelected?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  onRetake?: () => void;
  style?: ViewStyle;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  uri,
  pageNumber,
  isSelected = false,
  onPress,
  onDelete,
  onRetake,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />

      <View style={styles.pageNumber}>
        <Text variant="caption" color="inverse">
          {pageNumber}
        </Text>
      </View>

      {(onDelete || onRetake) && (
        <View style={styles.actions}>
          {onRetake && (
            <IconButton
              icon="retake"
              size="sm"
              variant="filled"
              onPress={onRetake}
            />
          )}
          {onDelete && (
            <IconButton
              icon="delete"
              size="sm"
              variant="filled"
              onPress={onDelete}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: sizes.thumbnail.width,
    height: sizes.thumbnail.height,
    borderRadius: sizes.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.gray[200],
    marginHorizontal: spacing.xs,
  },
  selected: {
    borderWidth: 2,
    borderColor: colors.primary[600],
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pageNumber: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: sizes.borderRadius.sm,
  },
  actions: {
    position: 'absolute',
    bottom: spacing.xs,
    right: spacing.xs,
    flexDirection: 'row',
    gap: spacing.xs,
  },
});
