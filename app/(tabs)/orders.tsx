import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, FlatList, Alert } from 'react-native';
import { OrderItemCard } from '@/components/order/OrderItem';
import { COLORS } from '@/constants/colors';
import { SPACING, TYPOGRAPHY } from '@/constants/layout';
import { useStore } from '@/store/useStore';
import { Order, OrderStatus } from '@/types';
import { printOrder } from '@/services/printer';
import { Card } from '@/components/ui/Card';

export default function OrdersScreen() {
  const { orders, updateOrderStatus, settings } = useStore();

  const handlePrintReceipt = async (order: Order) => {
    if (!settings.printer.isEnabled) {
      Alert.alert(
        'Printer Not Configured', 
        'Please configure your printer in Settings tab.'
      );
      return;
    }

    try {
      const result = await printOrder(
        order,
        settings.printer,
        settings.shopName,
        settings.receiptFooter
      );

      if (result.success) {
        Alert.alert('Success', 'Receipt printed successfully');
      } else {
        Alert.alert('Print Error', result.message);
      }
    } catch (error) {
      console.error('Failed to print receipt:', error);
      Alert.alert(
        'Print Error',
        'Failed to print receipt. Check printer settings.'
      );
    }
  };

  const handleChangeStatus = (id: string, status: OrderStatus) => {
    updateOrderStatus(id, status);
  };

  const renderEmptyState = () => (
    <Card style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>No Orders Yet</Text>
      <Text style={styles.emptyMessage}>
        Orders you create will appear here. Start by creating an order from the Order tab.
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <View style={styles.content}>
        {orders.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <OrderItemCard
                order={item}
                onPrintReceipt={handlePrintReceipt}
                onChangeStatus={handleChangeStatus}
              />
            )}
            contentContainerStyle={styles.ordersList}
          />
        )}
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
    padding: SPACING.md,
  },
  ordersList: {
    paddingBottom: SPACING.lg,
  },
  emptyCard: {
    marginTop: SPACING.xl,
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  emptyMessage: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});