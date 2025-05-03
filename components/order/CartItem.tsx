import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '@/constants/layout';
import { OrderItem } from '@/types';

interface CartItemProps {
  item: OrderItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const incrementQuantity = () => {
    onUpdateQuantity(item.productId, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productId, item.quantity - 1);
    } else {
      onRemove(item.productId);
    }
  };

  const itemTotal = item.quantity * item.unitPrice;

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.name}>{item.productName}</Text>
        <Text style={styles.price}>${item.unitPrice.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={decrementQuantity}
          >
            <Minus size={16} color={COLORS.textPrimary} />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={incrementQuantity}
          >
            <Plus size={16} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.total}>${itemTotal.toFixed(2)}</Text>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.productId)}
        >
          <Trash2 size={16} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  details: {
    flex: 1,
    marginRight: SPACING.md,
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  price: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.extraLightGray,
    borderRadius: RADIUS.sm,
    marginRight: SPACING.md,
  },
  quantityButton: {
    padding: SPACING.xs,
  },
  quantity: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.xs,
    minWidth: 25,
    textAlign: 'center',
  },
  total: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.primary,
    minWidth: 60,
    textAlign: 'right',
    marginRight: SPACING.md,
  },
  removeButton: {
    padding: SPACING.xs,
  },
});