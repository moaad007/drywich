import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PrinterSettings } from '@/components/settings/PrinterSettings';
import { COLORS } from '@/constants/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '@/constants/layout';
import { useStore } from '@/store/useStore';
import { printOrder } from '@/services/printer';
import { AppSettings } from '@/types';

export default function SettingsScreen() {
  const { settings, updateSettings } = useStore();
  
  const [shopName, setShopName] = useState(settings.shopName);
  const [currency, setCurrency] = useState(settings.currency);
  const [receiptFooter, setReceiptFooter] = useState(settings.receiptFooter || '');
  const [taxRate, setTaxRate] = useState(settings.taxRate.toString());

  const handleSaveGeneralSettings = () => {
    const updatedSettings: Partial<AppSettings> = {
      shopName,
      currency,
      receiptFooter,
      taxRate: parseFloat(taxRate) || 0,
    };
    
    updateSettings(updatedSettings);
    Alert.alert('Success', 'Settings saved successfully');
  };

  const handleUpdatePrinterSettings = (printerSettings) => {
    updateSettings({ printer: printerSettings });
  };

  const handleTestPrint = async () => {
    if (!settings.printer.isEnabled) {
      Alert.alert('Error', 'Printer is not enabled');
      return;
    }

    // Create a test order
    const testOrder = {
      id: 'TEST-' + Date.now(),
      items: [
        {
          productId: 'test1',
          productName: 'Test Product 1',
          quantity: 1,
          unitPrice: 9.99,
        },
        {
          productId: 'test2',
          productName: 'Test Product 2',
          quantity: 2,
          unitPrice: 4.99,
        },
      ],
      total: 19.97,
      status: 'new',
      createdAt: new Date(),
    };

    try {
      const result = await printOrder(
        testOrder,
        settings.printer,
        settings.shopName,
        settings.receiptFooter
      );

      if (result.success) {
        Alert.alert('Success', 'Test print sent successfully');
      } else {
        Alert.alert('Print Error', result.message);
      }
    } catch (error) {
      console.error('Failed to send test print:', error);
      Alert.alert(
        'Print Error',
        'Failed to send test print. Check printer settings.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.settingCard}>
          <Text style={styles.cardTitle}>General Settings</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Shop Name</Text>
            <TextInput
              style={styles.input}
              value={shopName}
              onChangeText={setShopName}
              placeholder="Enter shop name"
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Currency</Text>
            <TextInput
              style={styles.input}
              value={currency}
              onChangeText={setCurrency}
              placeholder="USD"
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tax Rate (%)</Text>
            <TextInput
              style={styles.input}
              value={taxRate}
              onChangeText={(text) => setTaxRate(text.replace(/[^0-9.]/g, ''))}
              placeholder="0.0"
              keyboardType="numeric"
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Receipt Footer</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={receiptFooter}
              onChangeText={setReceiptFooter}
              placeholder="Thank you for your order!"
              multiline
              numberOfLines={3}
              placeholderTextColor={COLORS.textTertiary}
            />
          </View>

          <Button
            title="Save Settings"
            onPress={handleSaveGeneralSettings}
            style={styles.saveButton}
          />
        </Card>

        <View style={styles.settingCard}>
          <PrinterSettings
            settings={settings.printer}
            onSave={handleUpdatePrinterSettings}
            onTestPrint={handleTestPrint}
          />
        </View>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Driwich POS v1.0.0</Text>
        </View>
      </ScrollView>
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
  settingCard: {
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
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
  saveButton: {
    marginTop: SPACING.md,
  },
  versionContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textTertiary,
  },
});