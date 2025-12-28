import React from 'react';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Text } from '../../../components/atoms';
import { spacing } from '../../../theme';

interface PageItem {
  id: string;
  uri: string;
  pageNumber: number;
}

interface ScannedPagesListProps {
  pages: PageItem[];
  selectedPageId?: string | null;
  onPageSelect?: (id: string) => void;
  onPageDelete?: (id: string) => void;
  onClearAll?: () => void;
  style?: ViewStyle;
}

export const ScannedPagesList: React.FC<ScannedPagesListProps> = ({
  pages,
  selectedPageId,
  onPageSelect,
  onPageDelete,
  onClearAll,
  style,
}) => {
  const renderItem = ({ item }: { item: PageItem }) => (
    <TouchableOpacity
      style={[
        styles.thumbnailContainer,
        item.id === selectedPageId && styles.thumbnailSelected,
      ]}
      onPress={() => onPageSelect?.(item.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      {onPageDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onPageDelete(item.id)}
        >
          <Text style={styles.deleteIcon}>×</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>스캔된 페이지 ({pages.length})</Text>
        {pages.length > 0 && onClearAll && (
          <TouchableOpacity onPress={onClearAll}>
            <Text style={styles.clearAllText}>전체 삭제</Text>
          </TouchableOpacity>
        )}
      </View>

      {pages.length > 0 ? (
        <FlatList
          data={pages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>촬영된 페이지가 없습니다</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.md,
    maxHeight: 160,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '700',
    color: '#0D141B',
  },
  clearAllText: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '700',
    color: '#137FEC',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    gap: 8,
  },
  thumbnailContainer: {
    width: 80,
    height: 106,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: '#137FEC',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginTop: -2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'System',
    fontSize: 14,
    color: '#6B7280',
  },
});
