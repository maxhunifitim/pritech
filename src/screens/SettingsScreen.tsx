import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Alert } from '../utils/alert';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Task } from '../../types';
import { Theme } from '../../theme';

interface SettingsScreenProps {
  tasks: Task[];
  onBack: () => void;
  onResetData: () => void;
  onSeedData: () => void;
  isLoading: boolean;
}

export default function SettingsScreen({
  tasks,
  onBack,
  onResetData,
  onSeedData,
  isLoading,
}: SettingsScreenProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleReset = () => {
    Alert.alert(
      'Reset All Tasks',
      'This will delete all tasks permanently. Are you sure you want to proceed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: onResetData },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            activeOpacity={0.7}
            onPress={onBack}
          >
            <Feather name="arrow-left" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats Section */}
          <Text style={styles.sectionTitle}>Task Statistics</Text>
          <View style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{totalTasks}</Text>
                <Text style={styles.statLabel}>Total Tasks</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: Theme.colors.success }]}>{completedTasks}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: Theme.colors.warning }]}>{pendingTasks}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Completion Rate</Text>
                <Text style={styles.progressPercent}>{completionRate}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${completionRate}%` }]} />
              </View>
            </View>
          </View>

          {/* Actions Section */}
          <Text style={styles.sectionTitle}>App Controls</Text>
          
          {/* Seed Data Button */}
          <TouchableOpacity 
            style={styles.settingsRowButton} 
            activeOpacity={0.7}
            onPress={onSeedData}
            disabled={isLoading}
          >
            <View style={styles.settingsRowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(0, 122, 255, 0.1)' }]}>
                <Feather name="download-cloud" size={20} color={Theme.colors.settingsBg} />
              </View>
              <View>
                <Text style={styles.settingsRowTitle}>Seed Demo Tasks</Text>
                <Text style={styles.settingsRowSubtitle}>Fetch new sample tasks from API</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={Theme.colors.textSecondary} />
          </TouchableOpacity>

          {/* Reset Data Button */}
          <TouchableOpacity 
            style={styles.settingsRowButton} 
            activeOpacity={0.7}
            onPress={handleReset}
          >
            <View style={styles.settingsRowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 59, 48, 0.1)' }]}>
                <Feather name="trash-2" size={20} color={Theme.colors.danger} />
              </View>
              <View>
                <Text style={[styles.settingsRowTitle, { color: Theme.colors.danger }]}>Reset App Data</Text>
                <Text style={styles.settingsRowSubtitle}>Delete all tasks from local storage</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={Theme.colors.textSecondary} />
          </TouchableOpacity>

          {/* App Info Section */}
          <Text style={styles.sectionTitle}>Task Info</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>App Name</Text>
              <Text style={styles.infoValue}>Pritech Task Manager</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Candidate Level</Text>
              <Text style={styles.infoValue}>Junior / Junior-Mid</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Framework</Text>
              <Text style={styles.infoValue}>React Native (Expo SDK 56)</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...Theme.typography.header,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 24,
    marginBottom: 12,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.large,
    padding: 20,
    ...Theme.shadows.card,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Theme.colors.border,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Theme.colors.inputBg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Theme.colors.settingsBg,
    borderRadius: 4,
  },
  settingsRowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.large,
    padding: 16,
    marginBottom: 12,
    ...Theme.shadows.card,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingsRowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  settingsRowSubtitle: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.radius.large,
    padding: 16,
    marginBottom: 40,
    ...Theme.shadows.card,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: Theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  infoDivider: {
    height: 1,
    backgroundColor: Theme.colors.borderLight,
  },
});
