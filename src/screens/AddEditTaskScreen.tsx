import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Task } from '../../types';
import { Theme } from '../../theme';

interface AddEditTaskScreenProps {
  task?: Task; // If provided, we are in Edit mode
  onBack: () => void;
  onSave: (title: string, description: string) => void;
}

export default function AddEditTaskScreen({
  task,
  onBack,
  onSave,
}: AddEditTaskScreenProps) {
  const isEditing = !!task;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    setError('');
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    onSave(title.trim(), description.trim());
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    if (text.trim() && error) {
      setError('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              activeOpacity={0.7}
              onPress={onBack}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {isEditing ? 'Edit Task' : 'New Task'}
            </Text>
            <TouchableOpacity 
              style={[styles.saveButton, !title.trim() && styles.saveButtonDisabled]} 
              activeOpacity={0.7}
              onPress={handleSave}
              disabled={!title.trim()}
            >
              <Text style={[styles.saveText, !title.trim() && styles.saveTextDisabled]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView style={styles.form} contentContainerStyle={styles.formContainer}>
            {/* Title Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Task Title</Text>
              <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder="What needs to be done?"
                placeholderTextColor={Theme.colors.placeholder}
                value={title}
                onChangeText={handleTitleChange}
                maxLength={80}
                autoFocus={!isEditing}
              />
              {error ? (
                <View style={styles.errorContainer}>
                  <Feather name="alert-circle" size={14} color={Theme.colors.danger} />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
            </View>

            {/* Description Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add some details about this task..."
                placeholderTextColor={Theme.colors.placeholder}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                maxLength={200}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
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
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
  headerTitle: {
    ...Theme.typography.header,
  },
  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: Theme.radius.small,
    backgroundColor: '#000000',
  },
  saveButtonDisabled: {
    backgroundColor: '#F2F2F7',
  },
  saveText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  saveTextDisabled: {
    color: Theme.colors.placeholder,
  },
  form: {
    flex: 1,
  },
  formContainer: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: Theme.colors.inputBg,
    borderRadius: Theme.radius.medium,
    paddingHorizontal: 16,
    height: 48,
    ...Theme.typography.input,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Theme.colors.danger,
    backgroundColor: 'rgba(255, 59, 48, 0.02)',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
    paddingBottom: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    color: Theme.colors.danger,
    fontSize: 13,
    marginLeft: 4,
  },
});
