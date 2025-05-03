import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants/colors';
import { SPACING, TYPOGRAPHY } from '@/constants/layout';
import { Order, OrderStatus } from '@/types';
import { Printer } from 'lucide-react-native';

interface OrderItemProps {
  order: Order;
  onPrintReceipt: (order: Order) => void;
  onChangeStatus: (id: string, status: OrderStatus) => void;
}

export const OrderItemCard: React.FC<OrderItemProps> = ({
  order,
  onPrintReceipt,
  onChangeStatus,
}) => {
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return <Badge label="New" variant="primary" />;
      case 'processing':
        return <Badge label="Processing" variant="warning" />;
      case 'completed':
        return <Badge label="Completed" variant="success" />;
      case 'cancelled':
        return <Badge label="Cancelled" variant="error" />;
      default:
        return null;
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case 'new':
        return 'processing';
      case 'processing':
        return 'completed';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus(order.status);

  const getNextStatusButton = () => {
    if (!nextStatus) return null;

    const buttonTitle = 
      nextStatus === 'processing' ? 'Start Processing' : 
      nextStatus === 'completed' ? 'Complete Order' : '';

    return (
      <Button
        title={buttonTitle}
        onPress={() => onChangeStatus(order.id, nextStatus)}
        size="sm"
        variant={nextStatus === 'completed' ? 'secondary' : 'primary'}
      />
    );
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.orderId}>Order #{order.id.substring(0, 6)}</Text>
          <Text style={styles.date}>
            {new Date(order.createdAt).toLocaleString()}
          </Text>
        </View>
        {getStatusBadge(order.status)}
      </View>

      <View style={styles.itemsContainer}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>
              {item.quantity} x {item.productName}
            </Text>
            <Text style={styles.itemPrice}>
              ${(item.quantity * item.unitPrice).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.printButton}
            onPress={() => onPrintReceipt(order)}
          >
            <Printer size={20} color={COLORS.primary} />
          </TouchableOpacity>
          
          {getNextStatusButton()}
          
          {order.status !== 'cancelled' && order.status !== 'completed' && (
            <Button
              title="Cancel"
              onPress={() => onChangeStatus(order.id, 'cancelled')}
              size="sm"
              variant="outline"
              style={styles.cancelButton}
            />
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  orderId: {
    fontFamily: TYPOGRAPHY.fontFamily.subheading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textPrimary,
  },
  date: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  itemsContainer: {
    marginBottom: SPACING.md,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  itemName: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
    flex: 1,
  },
  itemPrice: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  totalContainer: {},
  totalLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  totalAmount: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  printButton: {
    padding: SPACING.xs,
    marginRight: SPACING.sm,
  },
  cancelButton: {
    marginLeft: SPACING.sm,
  },
});