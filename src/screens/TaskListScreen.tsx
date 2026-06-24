import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Task, FilterType } from "../../types";
import { Theme } from "../../theme";
import TaskCard from "../components/TaskCard";

interface TaskListScreenProps {
  tasks: Task[];
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onToggleTask: (id: string) => void;
  onSelectTask: (task: Task) => void;
  onAddTaskPress: () => void;
  onSettingsPress: () => void;
  onFetchTasks: () => void;
  isLoading: boolean;
}

export default function TaskListScreen({
  tasks,
  searchQuery,
  onSearchQueryChange,
  activeFilter,
  onFilterChange,
  onToggleTask,
  onSelectTask,
  onAddTaskPress,
  onSettingsPress,
  onFetchTasks,
  isLoading,
}: TaskListScreenProps) {
  // Filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === "pending") {
      return matchesSearch && !task.completed;
    }
    if (activeFilter === "completed") {
      return matchesSearch && task.completed;
    }
    return matchesSearch;
  });

  const renderEmptyState = () => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Theme.colors.settingsBg} />
          <Text style={styles.loadingText}>Fetching tasks...</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Feather
          name="clipboard"
          size={50}
          color={Theme.colors.textSecondary}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyTitle}>No Tasks Found</Text>
        <Text style={styles.emptySubtitle}>
          {searchQuery
            ? "Try adjusting your search keywords."
            : activeFilter !== "all"
              ? `You don't have any ${activeFilter} tasks.`
              : "Get started by adding a task or syncing from the API."}
        </Text>
        {!searchQuery && activeFilter === "all" && (
          <TouchableOpacity
            style={styles.emptyButton}
            activeOpacity={0.8}
            onPress={onFetchTasks}
          >
            <Text style={styles.emptyButtonText}>Sync API Tasks</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>My Tasks</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          activeOpacity={0.8}
          onPress={onSettingsPress}
        >
          <AntDesign name="user" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={Theme.colors.placeholder}
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Filter Row */}
      <View style={styles.filterRow}>
        <View style={styles.chipsContainer}>
          {(["all", "pending", "completed"] as FilterType[]).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.chip,
                  isActive ? styles.chipActive : styles.chipInactive,
                ]}
                activeOpacity={0.8}
                onPress={() => onFilterChange(filter)}
              >
                <Text
                  style={[
                    styles.chipText,
                    isActive ? styles.chipTextActive : styles.chipTextInactive,
                  ]}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Sync Button */}
        <TouchableOpacity
          style={styles.syncButton}
          activeOpacity={0.7}
          onPress={onFetchTasks}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <Feather name="download-cloud" size={18} color="#000000" />
          )}
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggle={onToggleTask}
            onPress={onSelectTask}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB (Floating Action Button) */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={onAddTaskPress}
      >
        <Feather name="plus" size={24} color={Theme.colors.fabIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerSpacer: {
    width: 44, // Matches the settings button width to keep title perfectly centered
  },
  headerTitle: {
    ...Theme.typography.header,
    textAlign: "center",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.settingsBg,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.settings,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInput: {
    height: 46,
    backgroundColor: Theme.colors.inputBg,
    borderRadius: Theme.radius.medium,
    paddingHorizontal: 16,
    ...Theme.typography.input,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  chipsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Theme.radius.round,
    marginRight: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: Theme.colors.chipActiveBg,
    borderColor: Theme.colors.chipActiveBg,
  },
  chipInactive: {
    backgroundColor: Theme.colors.chipInactiveBg,
    borderColor: Theme.colors.chipBorder,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextActive: {
    color: Theme.colors.chipActiveText,
  },
  chipTextInactive: {
    color: Theme.colors.chipInactiveText,
  },
  syncButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.chipBorder,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100, // Room for FAB
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 12,
    ...Theme.typography.subtext,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyTitle: {
    ...Theme.typography.bodyBold,
    fontSize: 18,
    marginBottom: 8,
  },
  emptySubtitle: {
    ...Theme.typography.subtext,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: Theme.radius.medium,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Theme.colors.fabBg,
    justifyContent: "center",
    alignItems: "center",
    ...Theme.shadows.fab,
  },
});
