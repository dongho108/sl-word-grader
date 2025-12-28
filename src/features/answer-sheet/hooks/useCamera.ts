import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, CameraDevice, useCameraDevices, PhotoFile } from 'react-native-vision-camera';
import { permissions } from '../../../utils';

interface UseCameraReturn {
  cameraRef: React.RefObject<Camera | null>;
  device: CameraDevice | undefined;
  hasPermission: boolean;
  isInitialized: boolean;
  isCapturing: boolean;
  takePhoto: () => Promise<PhotoFile | null>;
  requestPermission: () => Promise<boolean>;
}

export const useCamera = (): UseCameraReturn => {
  const cameraRef = useRef<Camera | null>(null);
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === 'back');

  const [hasPermission, setHasPermission] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const status = await permissions.checkCamera();
    setHasPermission(status === 'granted');
    setIsInitialized(true);
  };

  const requestPermission = useCallback(async () => {
    const granted = await permissions.ensureCameraPermission();
    setHasPermission(granted);
    return granted;
  }, []);

  const takePhoto = useCallback(async (): Promise<PhotoFile | null> => {
    if (!cameraRef.current || isCapturing) return null;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePhoto({
        enableShutterSound: true,
      });
      return photo;
    } catch (error) {
      console.error('Failed to take photo:', error);
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [isCapturing]);

  return {
    cameraRef,
    device,
    hasPermission,
    isInitialized,
    isCapturing,
    takePhoto,
    requestPermission,
  };
};
