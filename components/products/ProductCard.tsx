import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '@/constants/layout';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const placeholderImage = 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg';
  
  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      activeOpacity={0.8}
      disabled={!product.isAvailable}
    >
      <Card style={[styles.card, !product.isAvailable && styles.unavailableCard]}>
        <Image
          source={{ uri: product.image || placeholderImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {!product.isAvailable && (
            <View style={styles.unavailableBadge}>
              <Text style={styles.unavailableText}>Unavailable</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 180,
    padding: 0,
    marginRight: SPACING.md,
    marginBottom: SPACING.md,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: RADIUS.md,
    borderTopRightRadius: RADIUS.md,
  },
  content: {
    padding: SPACING.sm,
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily.subheading,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  price: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.primary,
  },
  unavailableCard: {
    opacity: 0.7,
  },
  unavailableBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: COLORS.error,
    borderRadius: RADIUS.round,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
  },
  unavailableText: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
  },
});