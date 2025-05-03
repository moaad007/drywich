import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { ProductCard } from './ProductCard';
import { Product } from '@/types';
import { COLORS } from '@/constants/colors';
import { SPACING, TYPOGRAPHY } from '@/constants/layout';

const { width } = Dimensions.get('window');
const numColumns = Math.floor(width / 180);

interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  emptyMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductPress,
  emptyMessage = 'No products available',
}) => {
  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard product={item} onPress={onProductPress} />
      )}
      numColumns={numColumns > 0 ? numColumns : 1}
      key={numColumns > 0 ? numColumns : 1}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxl,
  },
  emptyText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});