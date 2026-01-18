import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/atoms';
import { ConfirmModal } from '../../../components/molecules';
import { CameraPreview, ScannedPagesList, StepIndicator, CameraGuide, ActionButtons } from '../components';
import { useAnswerSheetImages } from '../hooks';
import { colors, spacing } from '../../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAMERA_ASPECT_RATIO = 416 / 554;
const CAMERA_WIDTH = SCREEN_WIDTH - 32;
const CAMERA_HEIGHT = CAMERA_WIDTH / CAMERA_ASPECT_RATIO;

export const AnswerSheetRegistrationScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const {
    pages,
    selectedPageId,
    hasExistingData,
    canComplete,
    cameraRef,
    device,
    hasPermission,
    isCapturing,
    capturePhoto,
    pickFromGallery,
    deletePage,
    selectPage,
    completeRegistration,
    loadExisting,
    requestCameraPermission,
  } = useAnswerSheetImages();

  const [showOverwriteModal, setShowOverwriteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);

  useEffect(() => {
    checkExistingData();
  }, []);

  const checkExistingData = async () => {
    if (hasExistingData) {
      setShowOverwriteModal(true);
    }
  };

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleComplete = useCallback(async () => {
    try {
      await completeRegistration();
      navigation.goBack();
    } catch (error) {
      console.error('정답지 저장 실패:', error);
      Alert.alert('오류', '정답지 저장 중 오류가 발생했습니다.');
    }
  }, [completeRegistration, navigation]);

  const handleOverwriteConfirm = useCallback(() => {
    setShowOverwriteModal(false);
  }, []);

  const handleOverwriteCancel = useCallback(async () => {
    setShowOverwriteModal(false);
    await loadExisting();
  }, [loadExisting]);

  const handleDeleteRequest = useCallback((id: string) => {
    setPageToDelete(id);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (pageToDelete) {
      deletePage(pageToDelete);
    }
    setShowDeleteModal(false);
    setPageToDelete(null);
  }, [pageToDelete, deletePage]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteModal(false);
    setPageToDelete(null);
  }, []);

  const handleClearAll = useCallback(() => {
    pages.forEach((page) => deletePage(page.id));
  }, [pages, deletePage]);

  const handleStartGrading = useCallback(async () => {
    try {
      await completeRegistration();
      navigation.navigate('ExamSheetRegistration');
    } catch (error) {
      Alert.alert('오류', '정답지 저장 중 오류가 발생했습니다.');
    }
  }, [completeRegistration, navigation]);

  const currentStep = 1;
  const totalSteps = 3;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 상단 콘텐츠 영역 - 스크롤 가능 */}
      <ScrollView
        style={styles.contentArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        {/* Header Text */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>
            {'네모 칸 안에 정답지를\n맞춰주세요'}
          </Text>
          <Text style={styles.subtitle}>
            그림자가 지지 않게 촬영하면 인식이 더 잘 됩니다.
          </Text>
        </View>

        {/* Camera Preview with Guide */}
        <View style={styles.cameraContainer}>
          <View style={styles.cameraWrapper}>
            <CameraPreview
              cameraRef={cameraRef}
              device={device}
              hasPermission={hasPermission}
              isActive={true}
              onRequestPermission={requestCameraPermission}
            />
            <CameraGuide isScanning={isCapturing} />
          </View>
        </View>

        {/* Scanned Pages Section */}
        <ScannedPagesList
          pages={pages}
          selectedPageId={selectedPageId}
          onPageSelect={selectPage}
          onPageDelete={handleDeleteRequest}
          onClearAll={handleClearAll}
        />
      </ScrollView>

      {/* Action Buttons - 하단 고정 */}
      <ActionButtons
        onCapture={capturePhoto}
        onPickGallery={pickFromGallery}
        onComplete={handleComplete}
        onStartGrading={handleStartGrading}
        isCapturing={isCapturing}
        canComplete={canComplete}
      />

      <ConfirmModal
        visible={showOverwriteModal}
        title="기존 정답지 발견"
        message="이미 등록된 정답지가 있습니다. 새로 등록하시겠습니까?"
        confirmText="새로 등록"
        cancelText="불러오기"
        onConfirm={handleOverwriteConfirm}
        onCancel={handleOverwriteCancel}
      />

      <ConfirmModal
        visible={showDeleteModal}
        title="페이지 삭제"
        message="이 페이지를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        variant="danger"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.md,
  },
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '700',
    color: '#0D141B',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.36,
  },
  subtitle: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '300',
    color: '#6B7280',
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  cameraContainer: {
    paddingHorizontal: spacing.md,
  },
  cameraWrapper: {
    width: CAMERA_WIDTH,
    height: CAMERA_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
