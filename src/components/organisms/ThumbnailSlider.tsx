import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ViewStyle,
  ListRenderItemInfo,
} from 'react-native';
import { Thumbnail } from '../molecules';
import { colors, spacing } from '../../theme';

interface PageImage {
  id: string;
  uri: string;
  pageNumber: number;
}

interface ThumbnailSliderProps {
  pages: PageImage[];
  selectedPageId?: string;
  onPageSelect?: (id: string) => void;
  onPageDelete?: (id: string) => void;
  onPageRetake?: (id: string) => void;
  style?: ViewStyle;
}

export const ThumbnailSlider: React.FC<ThumbnailSliderProps> = ({
  pages,
  selectedPageId,
  onPageSelect,
  onPageDelete,
  onPageRetake,
  style,
}) => {
  const renderItem = ({ item }: ListRenderItemInfo<PageImage>) => (
    <Thumbnail
      uri={item.uri}
      pageNumber={item.pageNumber}
      isSelected={item.id === selectedPageId}
      onPress={() => onPageSelect?.(item.id)}
      onDelete={onPageDelete ? () => onPageDelete(item.id) : undefined}
      onRetake={onPageRetake ? () => onPageRetake(item.id) : undefined}
    />
  );

  if (pages.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={pages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.secondary,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  listContent: {
    paddingHorizontal: spacing.sm,
  },
});
