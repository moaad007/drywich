import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/colors';
import { RADIUS, SHADOW, SPACING } from '@/constants/layout';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  shadow?: 'none' | 'small' | 'medium' | 'large';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padded = true,
  shadow = 'medium',
}) => {
  return (
    <View
      style={[
        styles.card,
        padded && styles.padded,
        shadow !== 'none' && shadow === 'small' && SHADOW.small,
        shadow !== 'none' && shadow === 'medium' && SHADOW.medium,
        shadow !== 'none' && shadow === 'large' && SHADOW.large,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  padded: {
    padding: SPACING.md,
  },
});