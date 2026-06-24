# Pritech Task Manager

A premium, modern React Native mobile application built with Expo SDK 56 and TypeScript. It implements a clean, high-fidelity UI matching the design mockup and satisfies all the requirements (core and bonus) from the technical task.

## 📱 Visual Highlights (Mockup Alignment)

We have styled the application to look exactly like the mockup:
*   **Header**: Clean centered header title "My Tasks" with a floating, glowing blue Settings button on the top right.
*   **Search**: A light gray rounded search input field ("Search tasks...") for searching tasks in real-time.
*   **Filters**: Horizontal chips ("All", "Pending", "Completed") where the active chip is black with white text and inactive chips are white with light gray borders.
*   **Sync Button**: A custom circular cloud-download button located next to the filter chips to sync data from the public API.
*   **Task Cards**: Rounded cards with modern margins and drop shadows. Checkboxes are rendered as clean circles (empty for pending, checked with a gray checkmark and gray border for completed). Active tasks use bold text, while completed tasks use a line-through styling and gray colors.
*   **FAB**: A clean, rounded black Floating Action Button with a white plus icon in the bottom-right corner to add new tasks.

---

## 🛠️ Features Implemented

### Core Requirements
1.  **Task List Screen**: Displays all tasks in a performant scrollable list (`FlatList`).
2.  **Add New Task**: A validated form screen to create new tasks locally.
3.  **Complete / Uncomplete**: Easy toggle behavior by tapping the checkbox in the list or the status button in the details view.
4.  **Delete Task**: Delete local or fetched tasks from the Details screen.
5.  **Task Details View**: Displays the task's title, description, status badge, created timestamp, and data source.
6.  **Basic Input Validation**: Ensures task titles are not empty before saving.
7.  **Fetch Data from Public API**: Synced JSONPlaceholder todos (`https://jsonplaceholder.typicode.com/todos`) into the task list, converting them to the custom task structure and adding them dynamically.

### Bonus Features
1.  **Search Tasks**: Search tasks by title or description in real-time.
2.  **Filter by Status**: Filter task list using "All", "Pending", or "Completed" chips.
3.  **Local Storage**: Persisted all task states across app reboots using `@react-native-async-storage/async-storage`.
4.  **Simple Navigation**: Implemented a custom, high-performance slide-in animated screen transition navigator (`Animated.Value`) for moving between List, Details, Add/Edit, and Settings views.
5.  **Settings Panel**: Includes controls to seed sample API tasks, reset/wipe the local database, and view statistics (total, completed, pending tasks and completion rate).

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### Installation
Clone or navigate to the project directory and install the dependencies:
```bash
npm install
```

### Running the App
You can start the Expo development server by running:
```bash
npm run start
```

In the Expo CLI, you can choose how to preview the app:
*   Press **`i`** to run on the **iOS Simulator** (requires macOS and Xcode).
*   Press **`a`** to run on the **Android Emulator** (requires Android Studio).
*   Press **`w`** to run on the **Web Browser**.
*   Scan the QR code using the **Expo Go** app on your physical iOS or Android device.

---

## 📂 Project Structure

```
├── App.tsx                    # Main App Shell & State Controller (Custom Navigator)
├── types.ts                   # Type Definitions (Task, FilterType, ScreenType)
├── theme.ts                   # Design System & Styling Tokens
└── src/
    ├── components/
    │   └── TaskCard.tsx       # Interactive Task Card Component
    └── screens/
        ├── TaskListScreen.tsx # Mockup-matched Main Dashboard
        ├── TaskDetailsScreen.tsx # Screen showing Task Details & Actions
        ├── AddEditTaskScreen.tsx # Screen with Title-validated Task Form
        └── SettingsScreen.tsx    # Statistics and App Database Controls
```

---

## 📝 Candidate Implementation Note

*   **Custom Animation**: We opted for a lightweight state-based animated navigator inside `App.tsx` instead of adding bulky navigation libraries. This guarantees out-of-the-box compatibility and flawless animations without native linking errors.
*   **State Seeding**: To test the public API fetch behavior, you can tap the **cloud-download** button next to the filter chips on the main screen, or use the **Seed Demo Tasks** button in the Settings menu.
