import { useCallback } from 'react';
import { useExamSheetStore } from '../../../store';
import { useCamera } from '../../answer-sheet/hooks/useCamera';
import { useImagePicker } from '../../answer-sheet/hooks/useImagePicker';
import { ExamSheetPage } from '../../../types';

interface UseExamSheetImagesReturn {
  pages: ExamSheetPage[];
  selectedPageId: string | null;
  selectedPage: ExamSheetPage | undefined;
  isLoading: boolean;
  hasExistingData: boolean;
  canComplete: boolean;

  // Camera
  cameraRef: ReturnType<typeof useCamera>['cameraRef'];
  device: ReturnType<typeof useCamera>['device'];
  hasPermission: boolean;
  isCapturing: boolean;

  // Actions
  capturePhoto: () => Promise<void>;
  pickFromGallery: () => Promise<void>;
  pickMultipleFromGallery: () => Promise<void>;
  deletePage: (id: string) => void;
  retakePage: (id: string) => void;
  selectPage: (id: string) => void;
  completeRegistration: () => Promise<void>;
  loadExisting: () => Promise<void>;
  requestCameraPermission: () => Promise<boolean>;
}

export const useExamSheetImages = (): UseExamSheetImagesReturn => {
  const {
    pages,
    selectedPageId,
    isLoading,
    hasExistingData,
    addPage,
    removePage,
    replacePage,
    selectPage,
    saveToStorage,
    loadFromStorage,
  } = useExamSheetStore();

  const {
    cameraRef,
    device,
    hasPermission,
    isCapturing,
    takePhoto,
    requestPermission,
  } = useCamera();

  const { pickImage, pickMultipleImages } = useImagePicker();

  const selectedPage = pages.find((p) => p.id === selectedPageId);
  const canComplete = pages.length >= 1;

  const generateId = () =>
    `exam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const capturePhoto = useCallback(async () => {
    const photo = await takePhoto();
    if (photo) {
      addPage({
        id: generateId(),
        uri: `file://${photo.path}`,
        pageNumber: pages.length + 1,
        createdAt: Date.now(),
      });
    }
  }, [takePhoto, addPage, pages.length]);

  const pickFromGallery = useCallback(async () => {
    const asset = await pickImage();
    if (asset?.uri) {
      addPage({
        id: generateId(),
        uri: asset.uri,
        pageNumber: pages.length + 1,
        createdAt: Date.now(),
      });
    }
  }, [pickImage, addPage, pages.length]);

  const pickMultipleFromGallery = useCallback(async () => {
    const assets = await pickMultipleImages();
    assets.forEach((asset, index) => {
      if (asset.uri) {
        addPage({
          id: generateId(),
          uri: asset.uri,
          pageNumber: pages.length + index + 1,
          createdAt: Date.now(),
        });
      }
    });
  }, [pickMultipleImages, addPage, pages.length]);

  const deletePage = useCallback(
    (id: string) => {
      removePage(id);
    },
    [removePage]
  );

  const retakePage = useCallback(
    async (id: string) => {
      const photo = await takePhoto();
      if (photo) {
        replacePage(id, {
          id,
          uri: `file://${photo.path}`,
          pageNumber: 0,
          createdAt: Date.now(),
        });
      }
    },
    [takePhoto, replacePage]
  );

  const completeRegistration = useCallback(async () => {
    await saveToStorage();
  }, [saveToStorage]);

  const loadExisting = useCallback(async () => {
    await loadFromStorage();
  }, [loadFromStorage]);

  return {
    pages,
    selectedPageId,
    selectedPage,
    isLoading,
    hasExistingData,
    canComplete,
    cameraRef,
    device,
    hasPermission,
    isCapturing,
    capturePhoto,
    pickFromGallery,
    pickMultipleFromGallery,
    deletePage,
    retakePage,
    selectPage,
    completeRegistration,
    loadExisting,
    requestCameraPermission: requestPermission,
  };
};
