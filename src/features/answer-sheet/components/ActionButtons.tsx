import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/atoms';
import { colors, spacing } from '../../../theme';

interface ActionButtonsProps {
  onCapture: () => void;
  onPickGallery: () => void;
  onComplete: () => void;
  onStartGrading: () => void;
  isCapturing: boolean;
  canComplete: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onCapture,
  onPickGallery,
  onComplete,
  onStartGrading,
  isCapturing,
  canComplete,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 32 }]}>
      {/* 상단 버튼 행: 앨범, 촬영, 완료 */}
      <View style={styles.topRow}>
        {/* 앨범 버튼 */}
        <TouchableOpacity
          style={styles.sideButtonWrapper}
          onPress={onPickGallery}
          activeOpacity={0.7}
        >
          <View style={styles.albumButton}>
            <AlbumIcon />
          </View>
          <Text style={styles.sideButtonLabel}>앨범</Text>
        </TouchableOpacity>

        {/* 촬영 버튼 */}
        <TouchableOpacity
          style={styles.captureButtonOuter}
          onPress={onCapture}
          disabled={isCapturing}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.captureButtonInner,
              isCapturing && styles.captureButtonInnerActive,
            ]}
          />
        </TouchableOpacity>

        {/* 완료 버튼 */}
        <TouchableOpacity
          style={styles.sideButtonWrapper}
          onPress={onComplete}
          disabled={!canComplete}
          activeOpacity={0.7}
        >
          <View style={[styles.completeButton, !canComplete && styles.completeButtonDisabled]}>
            <CheckIcon color={canComplete ? '#137FEC' : '#9CA3AF'} />
          </View>
          <Text style={[styles.completeButtonLabel, !canComplete && styles.completeButtonLabelDisabled]}>
            완료
          </Text>
        </TouchableOpacity>
      </View>

      {/* 하단 CTA 버튼: 채점 시작하기 */}
      <TouchableOpacity
        style={[styles.ctaButton, !canComplete && styles.ctaButtonDisabled]}
        onPress={onStartGrading}
        disabled={!canComplete}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaButtonText}>채점 시작하기</Text>
        <ArrowRightIcon />
      </TouchableOpacity>
    </View>
  );
};

// 앨범 아이콘 컴포넌트
const AlbumIcon: React.FC = () => (
  <View style={{ width: 24, height: 28 }}>
    <View style={iconStyles.albumOuter}>
      <View style={iconStyles.albumInner} />
    </View>
  </View>
);

// 체크 아이콘 컴포넌트
const CheckIcon: React.FC<{ color: string }> = ({ color }) => (
  <View style={{ width: 24, height: 28, justifyContent: 'center', alignItems: 'center' }}>
    <View
      style={[
        iconStyles.checkmark,
        { borderColor: color },
      ]}
    />
  </View>
);

// 오른쪽 화살표 아이콘 컴포넌트
const ArrowRightIcon: React.FC = () => (
  <View style={iconStyles.arrowContainer}>
    <View style={iconStyles.arrowLine} />
    <View style={iconStyles.arrowHead} />
  </View>
);

const iconStyles = StyleSheet.create({
  albumOuter: {
    width: 20,
    height: 16,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  albumInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
  },
  checkmark: {
    width: 12,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '-45deg' }],
    marginTop: -2,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    width: 12,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  arrowHead: {
    position: 'absolute',
    right: 4,
    width: 8,
    height: 8,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }],
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 24,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    // 상단 그림자
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  sideButtonWrapper: {
    width: 64,
    alignItems: 'center',
  },
  albumButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideButtonLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  captureButtonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#137FEC',
    // 그림자 효과
    shadowColor: '#137FEC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  captureButtonInnerActive: {
    backgroundColor: '#0D5BB5',
    transform: [{ scale: 0.95 }],
  },
  completeButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(19, 127, 236, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  completeButtonLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '500',
    color: '#137FEC',
    textAlign: 'center',
  },
  completeButtonLabelDisabled: {
    color: '#9CA3AF',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#137FEC',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    // 그림자 효과
    shadowColor: '#137FEC',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  ctaButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
