import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Alert } from 'react-native';
import { ProductGrid } from '@/components/products/ProductGrid';
import { OrderSummary } from '@/components/order/OrderSummary';
import { COLORS } from '@/constants/colors';
import { SPACING, TYPOGRAPHY } from '@/constants/layout';
import { useStore } from '@/store/useStore';
import { OrderItem, Product } from '@/types';
import { printOrder } from '@/services/printer';

export default function OrderScreen() {
  const {
    products,
    currentOrderItems,
    addItemToOrder,
    updateOrderItem,
    removeOrderItem,
    clearCurrentOrder,
    createOrder,
    settings,
  } = useStore();

  const handleProductPress = (product: Product) => {
    if (!product.isAvailable) return;

    const orderItem: OrderItem = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      unitPrice: product.price,
    };

    addItemToOrder(orderItem);
  };

  const handleCreateOrder = async () => {
    if (currentOrderItems.length === 0) {
      Alert.alert('Error', 'Cannot create an empty order');
      return;
    }

    // Create the order in the store
    createOrder();

    // Get the latest order (the one we just created)
    const latestOrder = useStore.getState().orders[0];

    if (latestOrder && settings.printer.isEnabled) {
      try {
        const result = await printOrder(
          latestOrder,
          settings.printer,
          settings.shopName,
          settings.receiptFooter
        );

        if (!result.success) {
          Alert.alert('Print Error', result.message);
        }
      } catch (error) {
        console.error('Failed to print receipt:', error);
        Alert.alert(
          'Print Error',
          'Failed to print receipt. Check printer settings.'
        );
      }
    }

    Alert.alert('Success', 'Order created successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Driwich POS</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <ProductGrid
            products={products}
            onProductPress={handleProductPress}
            emptyMessage="No products available. Add products in the Products tab."
          />
        </View>

        <View style={styles.cartSection}>
          <OrderSummary
            items={currentOrderItems}
            onUpdateQuantity={updateOrderItem}
            onRemoveItem={removeOrderItem}
            onCreateOrder={handleCreateOrder}
            onClearCart={clearCurrentOrder}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    paddingTop: SPACING.xl,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xxl,
    color: COLORS.white,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  menuSection: {
    flex:0.7,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  cartSection: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.subheading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.textPrimary,
    padding: SPACING.md,
  },
});