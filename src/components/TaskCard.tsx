import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Task } from "../../types";
import { Theme } from "../../theme";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onPress: (task: Task) => void;
}

export default function TaskCard({ task, onToggle, onPress }: TaskCardProps) {
  const { title, description, completed, source } = task;

  return (
    <TouchableOpacity
      style={[styles.card, completed && styles.cardCompleted]}
      activeOpacity={0.7}
      onPress={() => onPress(task)}
    >
      <TouchableOpacity
        style={styles.checkboxContainer}
        activeOpacity={0.8}
        onPress={() => onToggle(task.id)}
      >
        {completed ? (
          <View style={styles.checkedCircle}>
            <Feather
              name="check"
              size={12}
              color={Theme.colors.textSecondary}
            />
          </View>
        ) : (
          <View style={styles.uncheckedCircle} />
        )}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text
          style={[styles.title, completed && styles.titleCompleted]}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text
          style={[styles.description, completed && styles.descriptionCompleted]}
          numberOfLines={1}
        >
          {source === "api"
            ? "Fetched from JSONPlaceholder API"
            : description || "No description"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.cardBackground,
    borderRadius: Theme.radius.xl,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0F0F2",
    ...Theme.shadows.card,
  },
  cardCompleted: {
    borderColor: "#EBEBEB",
    opacity: 0.8,
  },
  checkboxContainer: {
    marginRight: 16,
  },
  uncheckedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "transparent",
  },
  checkedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Theme.colors.textSecondary,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    ...Theme.typography.bodyBold,
    marginBottom: 4,
    lineHeight: 20,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: Theme.colors.textSecondary,
    fontWeight: "400",
  },
  description: {
    ...Theme.typography.subtext,
  },
  descriptionCompleted: {
    color: "#B3B3B7",
  },
});
