import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Switch,
  ScrollView,
} from 'react-native';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '@/constants/layout';
import { Product } from '@/types';

interface AddProductSheetProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
  editProduct?: Product;
}

export const AddProductSheet: React.FC<AddProductSheetProps> = ({
  onAddProduct,
  onCancel,
  editProduct,
}) => {
  const [name, setName] = useState(editProduct?.name || '');
  const [price, setPrice] = useState(editProduct?.price.toString() || '');
  const [category, setCategory] = useState(editProduct?.category || '');
  const [description, setDescription] = useState(editProduct?.description || '');
  const [image, setImage] = useState(editProduct?.image || '');
  const [isAvailable, setIsAvailable] = useState(
    editProduct ? editProduct.isAvailable : true
  );

  const handleSubmit = () => {
    if (!name || !price || !category) {
      return; // Validate required fields
    }

    const productData: Omit<Product, 'id'> = {
      name,
      price: parseFloat(price),
      category,
      description,
      image,
      isAvailable,
    };

    onAddProduct(productData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Product name"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text.replace(/[^0-9.]/g, ''))}
            placeholder="0.00"
            keyboardType="numeric"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Category *</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="e.g., Sandwiches, Drinks"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Product description"
            multiline
            numberOfLines={3}
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={setImage}
            placeholder="https://example.com/image.jpg"
            placeholderTextColor={COLORS.textTertiary}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Available</Text>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primaryLight }}
            thumbColor={isAvailable ? COLORS.primary : COLORS.extraLightGray}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            onPress={onCancel}
            variant="outline"
            style={styles.button}
          />
          <Button
            title={editProduct ? 'Update' : 'Add Product'}
            onPress={handleSubmit}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.xxl,
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  formGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.extraLightGray,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  button: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});