export const spacing = {
  // Base spacing
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,

  // Component specific
  buttonPadding: {
    horizontal: 16,
    vertical: 12,
  },

  inputPadding: {
    horizontal: 12,
    vertical: 10,
  },

  cardPadding: 16,
  screenPadding: 16,
} as const;

export const sizes = {
  // Icon sizes
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // Button heights
  button: {
    sm: 36,
    md: 44,
    lg: 52,
  },

  // Thumbnail
  thumbnail: {
    width: 80,
    height: 100,
  },

  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
} as const;

export type Spacing = typeof spacing;
export type Sizes = typeof sizes;
