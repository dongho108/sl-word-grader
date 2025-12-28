import { useCallback, useState } from 'react';
import { launchImageLibrary, ImagePickerResponse, Asset } from 'react-native-image-picker';

interface UseImagePickerReturn {
  isPicking: boolean;
  pickImage: () => Promise<Asset | null>;
  pickMultipleImages: () => Promise<Asset[]>;
}

export const useImagePicker = (): UseImagePickerReturn => {
  const [isPicking, setIsPicking] = useState(false);

  const pickImage = useCallback(async (): Promise<Asset | null> => {
    if (isPicking) return null;

    try {
      setIsPicking(true);
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 1,
      });

      if (result.didCancel || result.errorCode) {
        return null;
      }

      return result.assets?.[0] || null;
    } catch (error) {
      console.error('Failed to pick image:', error);
      return null;
    } finally {
      setIsPicking(false);
    }
  }, [isPicking]);

  const pickMultipleImages = useCallback(async (): Promise<Asset[]> => {
    if (isPicking) return [];

    try {
      setIsPicking(true);
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
        quality: 1,
      });

      if (result.didCancel || result.errorCode) {
        return [];
      }

      return result.assets || [];
    } catch (error) {
      console.error('Failed to pick images:', error);
      return [];
    } finally {
      setIsPicking(false);
    }
  }, [isPicking]);

  return {
    isPicking,
    pickImage,
    pickMultipleImages,
  };
};
