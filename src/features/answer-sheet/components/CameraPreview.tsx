import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, CameraDevice } from 'react-native-vision-camera';
import { Text, Button } from '../../../components/atoms';
import { colors, spacing, sizes } from '../../../theme';

interface CameraPreviewProps {
  cameraRef: React.RefObject<Camera | null>;
  device: CameraDevice | undefined;
  hasPermission: boolean;
  isActive: boolean;
  onRequestPermission: () => void;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  cameraRef,
  device,
  hasPermission,
  isActive,
  onRequestPermission,
}) => {
  if (!hasPermission) {
    return (
      <View style={styles.placeholder}>
        <Text variant="body" color="secondary" center>
          카메라 권한이 필요합니다
        </Text>
        <Button
          variant="primary"
          onPress={onRequestPermission}
          style={styles.permissionButton}
        >
          권한 허용하기
        </Button>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.placeholder}>
        <ActivityIndicator size="large" color={colors.primary[600]} />
        <Text variant="body" color="secondary" style={styles.loadingText}>
          카메라 초기화 중...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={isActive}
        photo={true}
      />
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
  camera: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.gray[200],
    borderRadius: sizes.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  permissionButton: {
    marginTop: spacing.md,
  },
  loadingText: {
    marginTop: spacing.md,
  },
});
