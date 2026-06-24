export const Theme = {
  colors: {
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    textCompleted: '#A2A2A7',
    border: '#E5E5EA',
    borderLight: '#F2F2F7',
    
    // Filters & Chips
    chipActiveBg: '#000000',
    chipActiveText: '#FFFFFF',
    chipInactiveBg: '#FFFFFF',
    chipInactiveText: '#8E8E93',
    chipBorder: '#E5E5EA',

    // Buttons
    settingsBg: '#007AFF', // Premium blue
    settingsBlueShadow: 'rgba(0, 122, 255, 0.4)',
    fabBg: '#000000',
    fabIcon: '#FFFFFF',

    // Status Colors
    success: '#34C759',
    danger: '#FF3B30',
    warning: '#FF9500',
    
    // Utility
    inputBg: '#F2F2F7',
    placeholder: '#8E8E93',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  typography: {
    header: {
      fontSize: 20,
      fontWeight: '700' as const,
      color: '#000000',
    },
    body: {
      fontSize: 16,
      color: '#000000',
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: '#000000',
    },
    subtext: {
      fontSize: 13,
      color: '#8E8E93',
    },
    input: {
      fontSize: 16,
      color: '#000000',
    },
    title: {
      fontSize: 24,
      fontWeight: '700' as const,
      color: '#000000',
    },
  },
  shadows: {
    settings: {
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 6,
    },
    fab: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
  },
  radius: {
    small: 8,
    medium: 12,
    large: 16,
    xl: 20,
    round: 9999,
  },
};
