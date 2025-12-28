import { Platform, Alert, Linking } from 'react-native';
import { Camera } from 'react-native-vision-camera';

export type PermissionStatus = 'granted' | 'denied' | 'not-determined';

export const permissions = {
  async checkCamera(): Promise<PermissionStatus> {
    const status = await Camera.getCameraPermissionStatus();
    return this.mapStatus(status);
  },

  async requestCamera(): Promise<PermissionStatus> {
    const status = await Camera.requestCameraPermission();
    return this.mapStatus(status);
  },

  mapStatus(status: string): PermissionStatus {
    switch (status) {
      case 'granted':
        return 'granted';
      case 'denied':
        return 'denied';
      default:
        return 'not-determined';
    }
  },

  async ensureCameraPermission(): Promise<boolean> {
    let status = await this.checkCamera();

    if (status === 'not-determined') {
      status = await this.requestCamera();
    }

    if (status === 'denied') {
      this.showSettingsAlert(
        '카메라 권한 필요',
        '정답지 촬영을 위해 카메라 권한이 필요합니다. 설정에서 권한을 허용해주세요.'
      );
      return false;
    }

    return status === 'granted';
  },

  showSettingsAlert(title: string, message: string): void {
    Alert.alert(
      title,
      message,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '설정으로 이동',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
        },
      ],
      { cancelable: true }
    );
  },
};
