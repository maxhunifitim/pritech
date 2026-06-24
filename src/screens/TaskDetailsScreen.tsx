import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Task } from '../../types';
import { Theme } from '../../theme';

interface TaskDetailsScreenProps {
  task: Task;
  onBack: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskDetailsScreen({
  task,
  onBack,
  onEdit,
  onDelete,
  onToggle,
}: TaskDetailsScreenProps) {
  const { id, title, description, completed, createdAt, source } = task;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(id) },
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
          <Text style={styles.headerTitle}>Task Details</Text>
          <TouchableOpacity 
            style={styles.editHeaderButton} 
            activeOpacity={0.7}
            onPress={onEdit}
          >
            <Feather name="edit-2" size={20} color={Theme.colors.settingsBg} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {/* Metadata badges */}
          <View style={styles.badgeRow}>
            <View style={[
              styles.badge, 
              completed ? styles.badgeSuccess : styles.badgeWarning
            ]}>
              <Text style={[
                styles.badgeText, 
                completed ? styles.badgeTextSuccess : styles.badgeTextWarning
              ]}>
                {completed ? 'Completed' : 'Pending'}
              </Text>
            </View>

            <View style={[styles.badge, styles.badgeSource]}>
              <Text style={[styles.badgeText, styles.badgeTextSource]}>
                {source === 'api' ? 'API Synced' : 'Local Task'}
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description Section */}
          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={styles.descriptionText}>
            {source === 'api' 
              ? 'This task was fetched from the public JSONPlaceholder API. It represents an external todo item synced to your list.' 
              : (description || 'No description provided for this task.')}
          </Text>

          {/* Date Section */}
          <Text style={styles.sectionLabel}>Created Date</Text>
          <View style={styles.dateContainer}>
            <Feather name="calendar" size={16} color={Theme.colors.textSecondary} style={styles.dateIcon} />
            <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOutline]}
            activeOpacity={0.8}
            onPress={() => onToggle(id)}
          >
            <Feather 
              name={completed ? 'circle' : 'check-circle'} 
              size={18} 
              color="#000000" 
              style={styles.buttonIcon} 
            />
            <Text style={styles.buttonOutlineText}>
              Mark as {completed ? 'Pending' : 'Completed'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonDelete]}
            activeOpacity={0.8}
            onPress={handleDelete}
          >
            <Feather name="trash-2" size={18} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.buttonDeleteText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
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
  editHeaderButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Theme.radius.small,
    marginRight: 8,
  },
  badgeSuccess: {
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
  },
  badgeWarning: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)',
  },
  badgeSource: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextSuccess: {
    color: Theme.colors.success,
  },
  badgeTextWarning: {
    color: Theme.colors.warning,
  },
  badgeTextSource: {
    color: Theme.colors.settingsBg,
  },
  title: {
    ...Theme.typography.title,
    lineHeight: 32,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  descriptionText: {
    ...Theme.typography.body,
    lineHeight: 24,
    color: '#3A3A3C',
    marginBottom: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.inputBg,
    padding: 12,
    borderRadius: Theme.radius.medium,
  },
  dateIcon: {
    marginRight: 8,
  },
  dateText: {
    ...Theme.typography.subtext,
    color: '#000000',
    fontWeight: '500',
  },
  actionsContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  button: {
    height: 50,
    borderRadius: Theme.radius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  buttonOutlineText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDelete: {
    backgroundColor: Theme.colors.danger,
  },
  buttonDeleteText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
});
