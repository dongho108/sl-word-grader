import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, sizes } from '../../theme';
import { Text } from './Text';

type IconType = 'camera' | 'gallery' | 'delete' | 'back' | 'retake' | 'close';
type IconButtonVariant = 'default' | 'filled' | 'outlined';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  icon: IconType;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: string;
  style?: ViewStyle;
}

const iconMap: Record<IconType, string> = {
  camera: '📷',
  gallery: '🖼️',
  delete: '🗑️',
  back: '←',
  retake: '🔄',
  close: '✕',
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'default',
  size = 'md',
  color,
  disabled = false,
  style,
  ...props
}) => {
  const iconSize = sizes.icon[size];

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        {
          width: iconSize + 16,
          height: iconSize + 16,
        },
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={{ fontSize: iconSize, color: color || colors.text.primary }}>
        {iconMap[icon]}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: sizes.borderRadius.full,
  },
  default: {
    backgroundColor: 'transparent',
  },
  filled: {
    backgroundColor: colors.gray[100],
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  disabled: {
    opacity: 0.5,
  },
});
