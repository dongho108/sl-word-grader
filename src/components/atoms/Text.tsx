import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import { colors, typography } from '../../theme';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption';
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'error';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  center?: boolean;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  bold = false,
  center = false,
  style,
  children,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        { color: colorMap[color] },
        bold && styles.bold,
        center && styles.center,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const colorMap: Record<TextColor, string> = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  tertiary: colors.text.tertiary,
  inverse: colors.text.inverse,
  error: colors.error,
};

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.fontFamily.regular,
  },
  h1: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
  },
  body: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },
  bold: {
    fontWeight: typography.fontWeight.bold,
  },
  center: {
    textAlign: 'center',
  },
});
