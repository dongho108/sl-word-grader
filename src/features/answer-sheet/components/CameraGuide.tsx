import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../components/atoms';

interface CameraGuideProps {
  isScanning?: boolean;
}

export const CameraGuide: React.FC<CameraGuideProps> = ({
  isScanning = false,
}) => {
  return (
    <View style={styles.container}>
      {/* Corner guides */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />

      {/* Center crosshair */}
      <View style={styles.crosshairContainer}>
        <View style={styles.horizontalLine} />
        <View style={styles.verticalLine} />
      </View>

      {/* Document icon in center */}
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📄</Text>
      </View>

      {/* Top highlight bar */}
      <View style={styles.topBar} />

      {/* Scanning indicator */}
      {isScanning && (
        <View style={styles.scanningBadge}>
          <Text style={styles.scanningIcon}>🔍</Text>
          <Text style={styles.scanningText}>자동 인식 중...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#137FEC',
    borderWidth: 4,
    borderRadius: 4,
  },
  topLeft: {
    top: 16,
    left: 16,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 16,
    right: 16,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 16,
    left: 16,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 16,
    right: 16,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  crosshairContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    width: '90%',
    height: 1,
    backgroundColor: 'rgba(19, 127, 236, 0.3)',
  },
  verticalLine: {
    position: 'absolute',
    width: 1,
    height: '90%',
    backgroundColor: 'rgba(19, 127, 236, 0.3)',
  },
  iconContainer: {
    opacity: 0.3,
  },
  icon: {
    fontSize: 28,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    height: 4,
    backgroundColor: 'rgba(19, 127, 236, 0.6)',
    borderRadius: 2,
    shadowColor: '#137FEC',
    shadowOffset: { x: 0, y: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  scanningBadge: {
    position: 'absolute',
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    gap: 4,
  },
  scanningIcon: {
    fontSize: 14,
  },
  scanningText: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
