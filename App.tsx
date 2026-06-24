import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Task, FilterType, ScreenType } from './types';
import { Theme } from './theme';

import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
import AddEditTaskScreen from './src/screens/AddEditTaskScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const STORAGE_KEY = '@pritech_tasks';
const { width } = Dimensions.get('window');

export default function App() {
  // Application State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('list');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Animation Refs
  const slideAnim = useRef(new Animated.Value(width)).current;

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever tasks array changes
  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (e) {
      console.error('Failed to save tasks to storage', e);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Seed default local tasks if empty
        const defaultTasks: Task[] = [
          {
            id: '1',
            title: 'Welcome to Pritech Task Manager!',
            description: 'This is a local task. You can complete it, edit it, or delete it.',
            completed: false,
            createdAt: new Date().toISOString(),
            source: 'local',
          },
          {
            id: '2',
            title: 'Fetch some API tasks',
            description: 'Press the cloud download button on the top right of the list or go to settings to seed tasks from JSONPlaceholder API.',
            completed: false,
            createdAt: new Date().toISOString(),
            source: 'local',
          }
        ];
        setTasks(defaultTasks);
        await saveTasks(defaultTasks);
      }
    } catch (e) {
      console.error('Failed to load tasks from storage', e);
    }
  };

  // Fetch tasks from JSONPlaceholder API
  const fetchTasksFromAPI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await response.json();
      
      const apiTasks: Task[] = data.map((todo: any) => ({
        id: `api-${todo.id}-${Date.now()}`, // Make it unique
        title: todo.title,
        description: 'Fetched from JSONPlaceholder API',
        completed: todo.completed,
        createdAt: new Date().toISOString(),
        source: 'api',
      }));

      // Merge with existing tasks, avoiding exact duplicates by title
      const updatedTasks = [...tasks];
      apiTasks.forEach((apiTask) => {
        const titleExists = updatedTasks.some(
          (t) => t.title.toLowerCase() === apiTask.title.toLowerCase()
        );
        if (!titleExists) {
          updatedTasks.unshift(apiTask); // Add new API tasks at the top
        }
      });

      setTasks(updatedTasks);
      await saveTasks(updatedTasks);
      
      Alert.alert('Sync Complete', `Successfully fetched and synced tasks from JSONPlaceholder API.`);
    } catch (error) {
      console.error(error);
      Alert.alert('Sync Error', 'Failed to fetch tasks from JSONPlaceholder API. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all tasks
  const resetAllData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setTasks([]);
      Alert.alert('Reset Successful', 'All task data has been cleared.');
      setCurrentScreen('list');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to reset data.');
    }
  };

  // Seed demo data
  const seedDemoData = async () => {
    await fetchTasksFromAPI();
    setCurrentScreen('list');
  };

  // Screen transition handler
  const navigateTo = (screen: ScreenType, task: Task | null = null) => {
    setSelectedTask(task);
    
    // Animate slide-in from right
    slideAnim.setValue(width);
    setCurrentScreen(screen);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const navigateBack = () => {
    // Animate slide-out to right
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setCurrentScreen('list');
      setSelectedTask(null);
    });
  };

  // Task Actions
  const handleToggleTask = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // Sort completed to bottom if desired, but keep standard order for simple list
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);

    // If viewing this task details, update the selectedTask state
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask({ ...selectedTask, completed: !selectedTask.completed });
    }
  };

  const handleAddTask = async (title: string, description: string) => {
    const newTask: Task = {
      id: `local-${Date.now()}`,
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      source: 'local',
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    navigateBack();
  };

  const handleUpdateTask = async (title: string, description: string) => {
    if (!selectedTask) return;

    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id
        ? { ...task, title, description }
        : task
    );

    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    navigateBack();
  };

  const handleDeleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    navigateBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Main List Screen */}
        <View style={StyleSheet.absoluteFill}>
          <TaskListScreen
            tasks={tasks}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onToggleTask={handleToggleTask}
            onSelectTask={(task) => navigateTo('details', task)}
            onAddTaskPress={() => navigateTo('add')}
            onSettingsPress={() => navigateTo('settings')}
            onFetchTasks={fetchTasksFromAPI}
            isLoading={isLoading}
          />
        </View>

        {/* Slide-in Secondary Screen */}
        {currentScreen !== 'list' && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.slidingScreen,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            {currentScreen === 'details' && selectedTask && (
              <TaskDetailsScreen
                task={selectedTask}
                onBack={navigateBack}
                onEdit={() => navigateTo('edit', selectedTask)}
                onDelete={handleDeleteTask}
                onToggle={handleToggleTask}
              />
            )}

            {(currentScreen === 'add' || currentScreen === 'edit') && (
              <AddEditTaskScreen
                task={selectedTask || undefined}
                onBack={navigateBack}
                onSave={currentScreen === 'edit' ? handleUpdateTask : handleAddTask}
              />
            )}

            {currentScreen === 'settings' && (
              <SettingsScreen
                tasks={tasks}
                onBack={navigateBack}
                onResetData={resetAllData}
                onSeedData={seedDemoData}
                isLoading={isLoading}
              />
            )}
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: RNStatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slidingScreen: {
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
});
