import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '@/constants/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '@/constants/layout';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    const baseStyle: StyleProp<ViewStyle> = [
      styles.badge,
      styles[`${size}Badge`],
    ];

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryBadge);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryBadge);
        break;
      case 'success':
        baseStyle.push(styles.successBadge);
        break;
      case 'warning':
        baseStyle.push(styles.warningBadge);
        break;
      case 'error':
        baseStyle.push(styles.errorBadge);
        break;
      default:
        baseStyle.push(styles.defaultBadge);
        break;
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: StyleProp<TextStyle> = [
      styles.badgeText,
      styles[`${size}Text`],
    ];

    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'success':
        baseStyle.push(styles.successText);
        break;
      case 'warning':
        baseStyle.push(styles.warningText);
        break;
      case 'error':
        baseStyle.push(styles.errorText);
        break;
      default:
        baseStyle.push(styles.defaultText);
        break;
    }

    return baseStyle;
  };

  return (
    <View style={[getContainerStyle(), style]}>
      <Text style={[getTextStyle(), textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: RADIUS.round,
    alignSelf: 'flex-start',
  },
  
  // Size variants
  smBadge: {
    paddingVertical: 2,
    paddingHorizontal: SPACING.xs,
  },
  mdBadge: {
    paddingVertical: 2,
    paddingHorizontal: SPACING.sm,
  },
  
  // Text sizes
  smText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
  },
  mdText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  
  // Badge variants
  defaultBadge: {
    backgroundColor: COLORS.extraLightGray,
  },
  primaryBadge: {
    backgroundColor: COLORS.primaryLight,
  },
  secondaryBadge: {
    backgroundColor: COLORS.secondary,
  },
  successBadge: {
    backgroundColor: COLORS.success,
  },
  warningBadge: {
    backgroundColor: COLORS.warning,
  },
  errorBadge: {
    backgroundColor: COLORS.error,
  },
  
  // Badge text
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    textAlign: 'center',
  },
  defaultText: {
    color: COLORS.textPrimary,
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.textPrimary,
  },
  successText: {
    color: COLORS.white,
  },
  warningText: {
    color: COLORS.textPrimary,
  },
  errorText: {
    color: COLORS.white,
  },
});