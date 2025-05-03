import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { COLORS } from '@/constants/colors';
import { RADIUS, SPACING, TYPOGRAPHY } from '@/constants/layout';
import { PrinterSettings as PrinterSettingsType } from '@/types';
import { ChevronRight, Printer, RefreshCw } from 'lucide-react-native';

interface PrinterSettingsProps {
  settings: PrinterSettingsType;
  onSave: (settings: PrinterSettingsType) => void;
  onTestPrint: () => void;
}

export const PrinterSettings: React.FC<PrinterSettingsProps> = ({
  settings,
  onSave,
  onTestPrint,
}) => {
  const [ipAddress, setIpAddress] = useState(settings.ipAddress);
  const [port, setPort] = useState(settings.port.toString());
  const [isEnabled, setIsEnabled] = useState(settings.isEnabled);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const updatedSettings: PrinterSettingsType = {
      ipAddress,
      port: parseInt(port, 10) || 9100,
      isEnabled,
    };
    onSave(updatedSettings);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Card>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Printer size={20} color={COLORS.primary} />
            <Text style={styles.title}>Receipt Printer</Text>
          </View>
          <Switch
            value={isEnabled}
            onValueChange={(value) => {
              setIsEnabled(value);
              onSave({ ...settings, isEnabled: value });
            }}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primaryLight }}
            thumbColor={isEnabled ? COLORS.primary : COLORS.extraLightGray}
          />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>IP Address</Text>
            <Text style={styles.infoValue}>{settings.ipAddress}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Port</Text>
            <Text style={styles.infoValue}>{settings.port}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Test Printer"
            onPress={onTestPrint}
            variant="outline"
            icon={<RefreshCw size={16} color={COLORS.primary} style={{ marginRight: 8 }} />}
            disabled={!isEnabled}
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editText}>Edit</Text>
            <ChevronRight size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  return (
    <Card>
      <Text style={styles.title}>Receipt Printer Settings</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>IP Address</Text>
        <TextInput
          style={styles.input}
          value={ipAddress}
          onChangeText={setIpAddress}
          placeholder="192.168.1.1"
          keyboardType="numbers-and-punctuation"
          placeholderTextColor={COLORS.textTertiary}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Port</Text>
        <TextInput
          style={styles.input}
          value={port}
          onChangeText={(text) => setPort(text.replace(/[^0-9]/g, ''))}
          placeholder="9100"
          keyboardType="numeric"
          placeholderTextColor={COLORS.textTertiary}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Enable Printer</Text>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: COLORS.lightGray, true: COLORS.primaryLight }}
          thumbColor={isEnabled ? COLORS.primary : COLORS.extraLightGray}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => {
            setIpAddress(settings.ipAddress);
            setPort(settings.port.toString());
            setIsEnabled(settings.isEnabled);
            setIsEditing(false);
          }}
          variant="outline"
          style={styles.button}
        />
        <Button title="Save" onPress={handleSave} style={styles.button} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.heading,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  infoContainer: {
    backgroundColor: COLORS.extraLightGray,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  infoLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontFamily: TYPOGRAPHY.fontFamily.body,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  editText: {
    fontFamily: TYPOGRAPHY.fontFamily.bodyMedium,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.primary,
    marginRight: SPACING.xs,
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});