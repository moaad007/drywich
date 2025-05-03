import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { ProductCard } from '@/components/products/ProductCard';
import { Card } from '@/components/ui/Card';
import { AddProductSheet } from '@/components/products/AddProductSheet';
import { COLORS } from '@/constants/colors';
import { RADIUS, SHADOW, SPACING, TYPOGRAPHY } from '@/constants/layout';
import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import { Plus } from 'lucide-react-native';

export default function ProductsScreen() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct({ ...product, id: editingProduct.id });
      setEditingProduct(undefined);
    } else {
      addProduct(product as Product);
    }
    setIsAddModalVisible(false);
  };

  const handleProductPress = (product: Product) => {
    setEditingProduct(product);
    setIsAddModalVisible(true);
  };

  const renderEmptyState = () => (
    <Card style={styles.emptyCard}>
      <Text style={styles.emptyTitle}>No Products Yet</Text>
      <Text style={styles.emptyMessage}>
        Add your first product by clicking the + button below
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
      </View>

      <View style={styles.content}>
        {products.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard product={item} onPress={handleProductPress} />
            )}
            numColumns={2}
            contentContainerStyle={styles.productsList}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingProduct(undefined);
          setIsAddModalVisible(true);
        }}
      >
        <Plus size={24} color={COLORS.white} />
      </TouchableOpacity>

      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AddProductSheet
              onAddProduct={handleAddProduct}
              onCancel={() => {
                setIsAddModalVisible(false);
                setEditingProduct(undefined);
              }}
              editProduct={editingProduct}
            />
          </View>
        </View>
      </Modal>
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
  },
  productsList: {
    padding: SPACING.md,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.large,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.backdrop,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    maxHeight: '80%',
  },
  emptyCard: {
    margin: SPACING.xl,
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