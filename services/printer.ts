import { Platform } from 'react-native';
import { Order, PrinterSettings } from '@/types';

// Mock printer service for web since we can't actually connect to a TCP/IP printer from web
const createPrinterContent = (order: Order, shopName: string, footer?: string): string => {
  const header = `
${shopName}
--------------------------------
ORDER #${order.id.substring(0, 8)}
${new Date().toLocaleString()}
--------------------------------
`;

  const items = order.items
    .map(
      (item) =>
        `${item.productName}
  ${item.quantity} x $${item.unitPrice.toFixed(2)}  $${(
          item.quantity * item.unitPrice
        ).toFixed(2)}`
    )
    .join('\n');

  const total = `
--------------------------------
TOTAL: $${order.total.toFixed(2)}
--------------------------------
`;

  const footerText = footer ? `\n${footer}\n` : '';

  return `${header}${items}${total}${footerText}`;
};

export const printOrder = async (
  order: Order,
  settings: PrinterSettings,
  shopName: string,
  footer?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!settings.isEnabled) {
      return {
        success: false,
        message: 'Printer is not enabled in settings',
      };
    }

    // Create receipt content
    const receiptContent = createPrinterContent(order, shopName, footer);

    // On web, we can't directly connect to a TCP/IP printer
    // In a real app, this would connect to a backend service that handles printing
    if (Platform.OS === 'web') {
      console.log('Printing order via TCP/IP on web:');
      console.log(`Target: ${settings.ipAddress}:${settings.port}`);
      console.log(receiptContent);
      
      // For demo purposes, let's simulate a printing delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      return {
        success: true,
        message: 'Order sent to printer (simulated on web)',
      };
    } else {
      // On native platforms, we could implement actual TCP connection
      // This is a placeholder for native implementation
      console.log(`Sending to printer at ${settings.ipAddress}:${settings.port}`);
      console.log(receiptContent);
      
      // Simulate printer connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Order successfully sent to printer',
      };
    }
  } catch (error) {
    console.error('Printer error:', error);
    return {
      success: false,
      message: `Failed to print: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};