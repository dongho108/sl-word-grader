import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Button } from '../atoms';
import { colors, spacing, sizes } from '../../theme';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'danger';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  variant = 'default',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <Text variant="h3" style={styles.title}>
                {title}
              </Text>
              <Text variant="body" color="secondary" style={styles.message}>
                {message}
              </Text>

              <View style={styles.buttons}>
                <Button
                  variant="ghost"
                  onPress={onCancel}
                  style={styles.button}
                >
                  {cancelText}
                </Button>
                <Button
                  variant={variant === 'danger' ? 'danger' : 'primary'}
                  onPress={onConfirm}
                  style={styles.button}
                >
                  {confirmText}
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: sizes.borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 320,
  },
  title: {
    marginBottom: spacing.sm,
  },
  message: {
    marginBottom: spacing.lg,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  button: {
    minWidth: 80,
  },
});
