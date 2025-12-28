import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '../../../components/atoms';
import { colors, spacing, sizes } from '../../../theme';

interface ImagePreviewProps {
  uri: string;
  pageNumber: number;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  uri,
  pageNumber,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.badge}>
        <Text variant="caption" color="inverse">
          {pageNumber}페이지
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    borderRadius: sizes.borderRadius.lg,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: sizes.borderRadius.sm,
  },
});
