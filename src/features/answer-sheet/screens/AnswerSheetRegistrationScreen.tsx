import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, ConfirmModal } from '../../../components/molecules';
import { ThumbnailSlider } from '../../../components/organisms';
import { CameraPreview, ImagePreview, ActionButtons } from '../components';
import { useAnswerSheetImages } from '../hooks';
import { colors, spacing } from '../../../theme';

export const AnswerSheetRegistrationScreen: React.FC = () => {
  const navigation = useNavigation();

  const {
    pages,
    selectedPageId,
    selectedPage,
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
    await completeRegistration();
    navigation.goBack();
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

  const showCamera = !selectedPage || pages.length === 0;

  return (
    <View style={styles.container}>
      <Header
        title="정답지 등록"
        onBack={handleBack}
        pageInfo={
          pages.length > 0
            ? {
                current: selectedPage?.pageNumber || pages.length,
                total: pages.length,
              }
            : undefined
        }
      />

      <View style={styles.content}>
        <View style={styles.previewArea}>
          {showCamera ? (
            <CameraPreview
              cameraRef={cameraRef}
              device={device}
              hasPermission={hasPermission}
              isActive={true}
              onRequestPermission={requestCameraPermission}
            />
          ) : (
            selectedPage && (
              <ImagePreview
                uri={selectedPage.uri}
                pageNumber={selectedPage.pageNumber}
              />
            )
          )}
        </View>

        <ThumbnailSlider
          pages={pages.map((p) => ({
            id: p.id,
            uri: p.uri,
            pageNumber: p.pageNumber,
          }))}
          selectedPageId={selectedPageId || undefined}
          onPageSelect={selectPage}
          onPageDelete={handleDeleteRequest}
        />
      </View>

      <ActionButtons
        onCapture={capturePhoto}
        onPickGallery={pickFromGallery}
        onComplete={handleComplete}
        isCapturing={isCapturing}
        canComplete={canComplete}
        pageCount={pages.length}
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
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
  },
  previewArea: {
    flex: 1,
    margin: spacing.md,
  },
});
