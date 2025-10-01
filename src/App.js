import {
  BarChart3,
  Calendar,
  Check,
  CheckSquare,
  Clock,
  Crown,
  DollarSign,
  FileText,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function TawanOS() {
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return defaultValue;
    }
  };

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const [tasks, setTasks] = useState(() =>
    loadFromStorage("tawanOS_tasks", [
      {
        id: 1,
        title: "Complete weekly report",
        completed: false,
        priority: "high",
        category: "Work",
        dueDate: "2025-10-02",
      },
      {
        id: 2,
        title: "Exercise for 30 minutes",
        completed: false,
        priority: "medium",
        category: "Health",
        dueDate: "2025-10-01",
      },
      {
        id: 3,
        title: "Read a book",
        completed: true,
        priority: "low",
        category: "Personal",
        dueDate: "2025-10-01",
      },
    ])
  );
  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskCategory, setTaskCategory] = useState("Work");
  const [taskFilter, setTaskFilter] = useState("all");

  const [events, setEvents] = useState(() =>
    loadFromStorage("tawanOS_events", [
      {
        id: 1,
        title: "Team Meeting",
        date: "2025-10-02",
        time: "10:00",
        category: "Work",
      },
      {
        id: 2,
        title: "Annual Health Checkup",
        date: "2025-10-05",
        time: "14:00",
        category: "Health",
      },
      {
        id: 3,
        title: "Dinner with Friends",
        date: "2025-10-03",
        time: "19:00",
        category: "Personal",
      },
    ])
  );
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    category: "Work",
  });

  const [transactions, setTransactions] = useState(() =>
    loadFromStorage("tawanOS_transactions", [
      {
        id: 1,
        title: "Monthly Salary",
        amount: 30000,
        type: "income",
        date: "2025-10-01",
        category: "Income",
      },
      {
        id: 2,
        title: "Rent Payment",
        amount: 8000,
        type: "expense",
        date: "2025-10-01",
        category: "Housing",
      },
      {
        id: 3,
        title: "Food",
        amount: 150,
        type: "expense",
        date: "2025-10-01",
        category: "Food",
      },
      {
        id: 4,
        title: "Transportation",
        amount: 200,
        type: "expense",
        date: "2025-10-01",
        category: "Transport",
      },
    ])
  );
  const [newTransaction, setNewTransaction] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
  });

  const [goals, setGoals] = useState(() =>
    loadFromStorage("tawanOS_goals", [
      {
        id: 1,
        title: "Save $10,000",
        current: 4500,
        target: 10000,
        deadline: "2025-12-31",
        category: "Finance",
      },
      {
        id: 2,
        title: "Read 24 Books",
        current: 8,
        target: 24,
        deadline: "2025-12-31",
        category: "Personal Growth",
      },
      {
        id: 3,
        title: "Lose 5kg",
        current: 2,
        target: 5,
        deadline: "2025-12-31",
        category: "Health",
      },
    ])
  );
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    deadline: "",
    category: "Personal",
  });

  const [notes, setNotes] = useState(() =>
    loadFromStorage("tawanOS_notes", [
      {
        id: 1,
        title: "New Project Ideas",
        content:
          "Build an AI-powered time management app that learns user behavior and suggests optimal schedules",
        date: "2025-10-01",
        tags: ["work", "ideas"],
      },
      {
        id: 2,
        title: "Shopping List",
        content: "Milk, eggs, bread, vegetables, fruits",
        date: "2025-10-01",
        tags: ["personal"],
      },
    ])
  );
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const [habits, setHabits] = useState(() =>
    loadFromStorage("tawanOS_habits", [
      {
        id: 1,
        name: "Drink 8 glasses of water",
        streak: 5,
        checked: false,
        icon: "💧",
      },
      {
        id: 2,
        name: "Read for 30 minutes",
        streak: 3,
        checked: false,
        icon: "📚",
      },
      { id: 3, name: "Exercise", streak: 7, checked: true, icon: "💪" },
      {
        id: 4,
        name: "Meditate for 10 minutes",
        streak: 2,
        checked: false,
        icon: "🧘",
      },
    ])
  );
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem("tawanOS_tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem("tawanOS_events", JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem("tawanOS_transactions", JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    localStorage.setItem("tawanOS_goals", JSON.stringify(goals));
  }, [goals]);
  useEffect(() => {
    localStorage.setItem("tawanOS_notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("tawanOS_habits", JSON.stringify(habits));
  }, [habits]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          priority: taskPriority,
          category: taskCategory,
          dueDate: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewTask("");
      setShowQuickAdd(false);
    }
  };
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (taskFilter === "active")
      filtered = filtered.filter((t) => !t.completed);
    if (taskFilter === "completed")
      filtered = filtered.filter((t) => t.completed);
    if (searchQuery)
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return filtered;
  }, [tasks, taskFilter, searchQuery]);

  const addEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ title: "", date: "", time: "", category: "Work" });
      setShowQuickAdd(false);
    }
  };
  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };
  const upcomingEvents = useMemo(
    () =>
      events
        .filter((e) => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3),
    [events]
  );

  const addTransaction = () => {
    if (newTransaction.title && newTransaction.amount) {
      setTransactions([
        ...transactions,
        {
          ...newTransaction,
          id: Date.now(),
          amount: parseFloat(newTransaction.amount),
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      setNewTransaction({
        title: "",
        amount: "",
        type: "expense",
        category: "Food",
      });
      setShowQuickAdd(false);
    }
  };
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  const calculateBalance = () =>
    transactions.reduce(
      (acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount),
      0
    );
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );
  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const addGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      setGoals([
        ...goals,
        {
          ...newGoal,
          id: Date.now(),
          current: 0,
          target: parseFloat(newGoal.target),
        },
      ]);
      setNewGoal({ title: "", target: "", deadline: "", category: "Personal" });
      setShowQuickAdd(false);
    }
  };
  const updateGoalProgress = (id, value) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, current: parseFloat(value) || 0 } : goal
      )
    );
  };
  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const addNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([
        ...notes,
        {
          ...newNote,
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
          tags: [],
        },
      ]);
      setNewNote({ title: "", content: "" });
      setShowQuickAdd(false);
    }
  };
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([
        ...habits,
        {
          id: Date.now(),
          name: newHabit,
          streak: 0,
          checked: false,
          icon: "⭐",
        },
      ]);
      setNewHabit("");
      setShowQuickAdd(false);
    }
  };
  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newChecked = !habit.checked;
          return {
            ...habit,
            checked: newChecked,
            streak: newChecked
              ? habit.streak + 1
              : Math.max(0, habit.streak - 1),
          };
        }
        return habit;
      })
    );
  };
  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const stats = useMemo(() => {
    const completionRate =
      tasks.length > 0
        ? (
            (tasks.filter((t) => t.completed).length / tasks.length) *
            100
          ).toFixed(0)
        : 0;
    const bestStreak = Math.max(...habits.map((h) => h.streak), 0);
    const goalsProgress =
      goals.length > 0
        ? (
            goals.reduce((sum, g) => sum + (g.current / g.target) * 100, 0) /
            goals.length
          ).toFixed(0)
        : 0;
    return {
      completionRate,
      bestStreak,
      goalsProgress,
      tasksLeft: tasks.filter((t) => !t.completed).length,
      balance: calculateBalance(),
    };
  }, [tasks, habits, goals, transactions]);

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: TrendingUp },
    { id: "tasks", name: "Tasks", icon: CheckSquare },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "finance", name: "Finance", icon: DollarSign },
    { id: "goals", name: "Goals", icon: Target },
    { id: "notes", name: "Notes", icon: FileText },
    { id: "habits", name: "Habits", icon: Check },
  ];

  const QuickAddModal = () => {
    if (!showQuickAdd) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 w-full max-w-md shadow-2xl border-2 border-amber-500/30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-amber-400 flex items-center gap-2">
              <Sparkles size={20} className="text-amber-400" />
              Quick Add
            </h3>
            <button
              onClick={() => setShowQuickAdd(false)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="text-gray-400" size={24} />
            </button>
          </div>
          <div className="space-y-4">
            {activeTab === "tasks" && (
              <>
                <input
                  type="text"
                  placeholder="New task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={addTask}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all font-semibold shadow-lg shadow-amber-500/50"
                >
                  Add Task
                </button>
              </>
            )}
            {activeTab === "habits" && (
              <>
                <input
                  type="text"
                  placeholder="New habit..."
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addHabit()}
                  className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={addHabit}
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all font-semibold shadow-lg shadow-amber-500/50"
                >
                  Add Habit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex flex-col lg:flex-row h-screen bg-black overflow-hidden"
      style={{ fontFamily: "'Anuphan', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Anuphan:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="lg:hidden bg-gradient-to-r from-gray-900 to-black border-b-2 border-amber-500/20 px-4 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Crown className="text-amber-400" size={24} />
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
            Tawan OS
          </h1>
        </div>
        <button
          onClick={() => setShowQuickAdd(true)}
          className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black p-2 rounded-lg shadow-lg shadow-amber-500/50"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="hidden lg:block lg:w-64 bg-gradient-to-b from-gray-900 to-black shadow-2xl border-r-2 border-amber-500/20 overflow-y-auto">
        <div className="p-6 border-b-2 border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="text-amber-400" size={28} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Tawan OS
            </h1>
          </div>
          <p className="text-sm text-gray-400">Premium Life Management</p>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg shadow-amber-500/50 transform scale-105"
                    : "text-gray-300 hover:bg-gray-800/50 hover:text-amber-400"
                }`}
              >
                <Icon size={20} />
                <span className="font-semibold">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 m-4 rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-gray-900 to-gray-800">
          <p className="text-xs text-amber-400 mb-3 font-semibold flex items-center gap-2">
            <Sparkles size={14} />
            Quick Stats
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Completion</span>
              <span className="text-sm font-bold text-amber-400">
                {stats.completionRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Best Streak</span>
              <span className="text-sm font-bold text-amber-400">
                {stats.bestStreak} 🔥
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="bg-gradient-to-r from-gray-900 to-black border-b-2 border-amber-500/20 sticky top-0 z-10 backdrop-blur-lg bg-opacity-95">
          <div className="px-4 py-3 md:px-8 md:py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <Search className="text-amber-400 flex-shrink-0" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm"
              />
            </div>
            <button
              onClick={() => setShowQuickAdd(true)}
              className="hidden lg:flex bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 py-2.5 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all items-center gap-2 shadow-lg shadow-amber-500/50 font-semibold"
            >
              <Zap size={18} />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                  Today's Overview
                </h2>
                <p className="text-gray-400 text-sm">
                  Your complete life at a glance
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl">
                      <CheckSquare className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      {stats.tasksLeft}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Tasks Left</p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl">
                      <DollarSign className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      ${(stats.balance / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Balance</p>
                  <p className="text-xs text-green-400">
                    +${(totalIncome / 1000).toFixed(1)}k
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl">
                      <TrendingUp className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      {stats.bestStreak} 🔥
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Best Streak</p>
                  <p className="text-xs text-amber-400">
                    {habits.filter((h) => h.checked).length}/{habits.length}{" "}
                    today
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl">
                      <Target className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      {stats.goalsProgress}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">Goals Progress</p>
                  <p className="text-xs text-amber-400">{goals.length} total</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-amber-400">
                      Today's Tasks
                    </h3>
                    <span className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 px-3 py-1 rounded-full text-xs md:text-sm font-semibold border border-amber-500/30">
                      {tasks.filter((t) => !t.completed).length}
                    </span>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {tasks
                      .filter((t) => !t.completed)
                      .slice(0, 5)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-2 md:p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all cursor-pointer border border-gray-700"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-4 md:w-5 h-4 md:h-5 rounded-lg accent-amber-500 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm md:text-base truncate">
                              {task.title}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <span
                                className={`text-xs px-2 py-1 rounded-lg font-medium ${
                                  task.priority === "high"
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : task.priority === "medium"
                                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                                }`}
                              >
                                {task.priority === "high"
                                  ? "🔴"
                                  : task.priority === "medium"
                                  ? "🟡"
                                  : "🟢"}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-lg font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                {task.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {tasks.filter((t) => !t.completed).length === 0 && (
                      <div className="text-center py-6 md:py-8">
                        <p className="text-amber-400 mb-2 text-2xl">🎉</p>
                        <p className="text-gray-400 text-sm">All done!</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-amber-400">
                      Upcoming Events
                    </h3>
                    <Calendar className="text-amber-400" size={20} />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 md:p-4 rounded-xl border-2 border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-amber-500/30 transition-all"
                      >
                        <p className="text-white font-semibold text-sm md:text-base mb-1">
                          {event.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock
                            size={14}
                            className="text-gray-400 flex-shrink-0"
                          />
                          <p className="text-xs md:text-sm text-gray-400">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                    {upcomingEvents.length === 0 && (
                      <div className="text-center py-6 md:py-8">
                        <p className="text-gray-400 text-sm">
                          No upcoming events
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-4 md:mb-6">
                  Daily Habits
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      onClick={() => toggleHabit(habit.id)}
                      className={`p-3 md:p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        habit.checked
                          ? "border-amber-500 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 shadow-lg shadow-amber-500/30"
                          : "border-gray-700 bg-gray-800/50 hover:border-amber-500/50"
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl md:text-3xl mb-2 block">
                          {habit.icon}
                        </span>
                        <p className="text-xs md:text-sm font-medium text-white line-clamp-2">
                          {habit.name}
                        </p>
                        <p className="text-xs text-amber-400 mt-1 font-semibold">
                          {habit.streak} 🔥
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                    Task Management
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Organize and track your tasks
                  </p>
                </div>
                <select
                  value={taskFilter}
                  onChange={(e) => setTaskFilter(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-amber-500/30 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                >
                  <option value="all">All Tasks</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <div className="space-y-3 md:space-y-4">
                  <input
                    type="text"
                    placeholder="New task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={taskCategory}
                      onChange={(e) => setTaskCategory(e.target.value)}
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    >
                      <option>Work</option>
                      <option>Personal</option>
                      <option>Health</option>
                      <option>Study</option>
                    </select>
                    <select
                      value={taskPriority}
                      onChange={(e) => setTaskPriority(e.target.value)}
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <button
                    onClick={addTask}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-amber-500/50"
                  >
                    <Plus size={20} />
                    Add Task
                  </button>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-5 rounded-2xl shadow-2xl border-2 border-gray-700 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 md:w-6 h-5 md:h-6 rounded-lg accent-amber-500 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold text-sm md:text-base ${
                            task.completed ? "line-through opacity-50" : ""
                          } text-white`}
                        >
                          {task.title}
                        </p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span
                            className={`text-xs px-2 md:px-3 py-1 rounded-full font-medium ${
                              task.category === "Work"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : task.category === "Health"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : task.category === "Personal"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            }`}
                          >
                            {task.category}
                          </span>
                          <span
                            className={`text-xs px-2 md:px-3 py-1 rounded-full font-medium ${
                              task.priority === "high"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : task.priority === "medium"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                            }`}
                          >
                            {task.priority === "high"
                              ? "🔴 High"
                              : task.priority === "medium"
                              ? "🟡 Medium"
                              : "🟢 Low"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-300 p-2 transition-all flex-shrink-0"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                {filteredTasks.length === 0 && (
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl text-center border-2 border-gray-700">
                    <p className="text-lg text-gray-400">No tasks found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                  Calendar & Events
                </h2>
                <p className="text-gray-400 text-sm">Manage your schedule</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Event name..."
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    />
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    />
                    <select
                      value={newEvent.category}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, category: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    >
                      <option>Work</option>
                      <option>Personal</option>
                      <option>Health</option>
                    </select>
                  </div>
                  <button
                    onClick={addEvent}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-amber-500/50"
                  >
                    <Plus size={20} />
                    Add Event
                  </button>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                {events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => {
                    const isUpcoming = new Date(event.date) >= new Date();
                    return (
                      <div
                        key={event.id}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-5 rounded-2xl shadow-2xl border-2 border-gray-700 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                          <div
                            className={`p-3 md:p-4 rounded-2xl flex-shrink-0 ${
                              isUpcoming
                                ? "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-2 border-amber-500/30"
                                : "bg-gray-800 border-2 border-gray-600"
                            }`}
                          >
                            <Calendar
                              className={
                                isUpcoming ? "text-amber-400" : "text-gray-500"
                              }
                              size={28}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-base md:text-lg text-white truncate">
                              {event.title}
                            </p>
                            <div className="flex items-center gap-2 md:gap-3 mt-1 flex-wrap">
                              <p className="text-xs md:text-sm text-gray-400">
                                {event.date} • {event.time}
                              </p>
                              <span
                                className={`text-xs px-2 md:px-3 py-1 rounded-full font-medium ${
                                  event.category === "Work"
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    : event.category === "Health"
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                }`}
                              >
                                {event.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-300 p-2 transition-all flex-shrink-0"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                  Personal Finance
                </h2>
                <p className="text-gray-400 text-sm">
                  Track and plan your finances
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 p-6 md:p-8 rounded-2xl shadow-2xl text-black col-span-1 md:col-span-2 border-2 border-amber-400">
                  <p className="text-base md:text-lg mb-2 opacity-90 font-semibold">
                    Current Balance
                  </p>
                  <p className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                    ${calculateBalance().toLocaleString()}
                  </p>
                  <div className="flex gap-4 md:gap-6 text-sm">
                    <div>
                      <p className="opacity-75 font-medium">Income</p>
                      <p className="text-lg md:text-xl font-semibold">
                        +${totalIncome.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="opacity-75 font-medium">Expenses</p>
                      <p className="text-lg md:text-xl font-semibold">
                        -${totalExpense.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="text-center">
                    <BarChart3
                      className="text-amber-400 mx-auto mb-3"
                      size={40}
                    />
                    <p className="text-2xl md:text-3xl font-bold text-amber-400 mb-1">
                      {transactions.length}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400">
                      Total Transactions
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <h3 className="text-lg md:text-xl font-semibold text-amber-400 mb-4">
                  Add Transaction
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Description..."
                    value={newTransaction.title}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          amount: e.target.value,
                        })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                    />
                    <select
                      value={newTransaction.type}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          type: e.target.value,
                        })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                    <select
                      value={newTransaction.category}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          category: e.target.value,
                        })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    >
                      <option>Food</option>
                      <option>Housing</option>
                      <option>Transport</option>
                      <option>Shopping</option>
                      <option>Income</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button
                    onClick={addTransaction}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-amber-500/50"
                  >
                    <Plus size={20} />
                    Add Transaction
                  </button>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                {transactions
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-5 rounded-2xl shadow-2xl border-2 border-gray-700 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        <div
                          className={`p-3 md:p-4 rounded-2xl border-2 flex-shrink-0 ${
                            transaction.type === "income"
                              ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30"
                              : "bg-gradient-to-br from-red-500/20 to-rose-500/20 border-red-500/30"
                          }`}
                        >
                          <DollarSign
                            className={
                              transaction.type === "income"
                                ? "text-green-400"
                                : "text-red-400"
                            }
                            size={28}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm md:text-base truncate">
                            {transaction.title}
                          </p>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            <span className="text-xs px-2 md:px-3 py-1 rounded-full font-medium bg-gray-700 text-gray-300 border border-gray-600">
                              {transaction.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              {transaction.date}
                            </span>
                          </div>
                        </div>
                        <p
                          className={`text-lg md:text-2xl font-bold flex-shrink-0 ${
                            transaction.type === "income"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}$
                          {transaction.amount.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-300 p-2 ml-2 md:ml-4 transition-all flex-shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                  My Goals
                </h2>
                <p className="text-gray-400 text-sm">
                  Set goals and track progress
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <h3 className="text-lg md:text-xl font-semibold text-amber-400 mb-4">
                  Add New Goal
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Goal name..."
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="number"
                      placeholder="Target value"
                      value={newGoal.target}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, target: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                    />
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, deadline: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    />
                    <select
                      value={newGoal.category}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, category: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                    >
                      <option>Personal</option>
                      <option>Finance</option>
                      <option>Health</option>
                      <option>Personal Growth</option>
                    </select>
                  </div>
                  <button
                    onClick={addGoal}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-amber-500/50"
                  >
                    <Plus size={20} />
                    Add Goal
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {goals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  const isComplete = progress >= 100;
                  return (
                    <div
                      key={goal.id}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-white truncate">
                              {goal.title}
                            </h3>
                            {isComplete && (
                              <span className="text-2xl flex-shrink-0">🎉</span>
                            )}
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <span
                              className={`text-xs px-2 md:px-3 py-1 rounded-full font-medium ${
                                goal.category === "Finance"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : goal.category === "Health"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                  : goal.category === "Personal Growth"
                                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                  : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                              }`}
                            >
                              {goal.category}
                            </span>
                            <span className="text-xs text-gray-400">
                              📅 {goal.deadline}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteGoal(goal.id)}
                          className="text-red-400 hover:text-red-300 p-2 flex-shrink-0"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-semibold text-white">
                            Progress
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              isComplete ? "text-green-400" : "text-amber-400"
                            }`}
                          >
                            {progress.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 md:h-3">
                          <div
                            className={`h-2 md:h-3 rounded-full transition-all duration-500 ${
                              isComplete
                                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                : "bg-gradient-to-r from-amber-500 to-yellow-600"
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 items-center">
                        <input
                          type="number"
                          value={goal.current}
                          onChange={(e) =>
                            updateGoalProgress(goal.id, e.target.value)
                          }
                          className="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white"
                          placeholder="Current progress"
                        />
                        <span className="text-gray-400 font-medium flex-shrink-0">
                          / {goal.target}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                  Notes & Ideas
                </h2>
                <p className="text-gray-400 text-sm">Capture your thoughts</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <h3 className="text-lg md:text-xl font-semibold text-amber-400 mb-4">
                  Create New Note
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Title..."
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  />
                  <textarea
                    placeholder="Content..."
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl h-24 md:h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  />
                  <button
                    onClick={addNote}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-amber-500/50"
                  >
                    <Plus size={20} />
                    Add Note
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg md:text-xl font-bold text-amber-400 flex-1 truncate">
                        {note.title}
                      </h3>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-300 p-1 transition-all flex-shrink-0"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 whitespace-pre-wrap line-clamp-4">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        📅 {note.date}
                      </span>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {note.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "habits" && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                  Daily Habits Tracker
                </h2>
                <p className="text-gray-400 text-sm">
                  Build good habits and track consistency
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <div className="flex gap-3 md:gap-4">
                  <input
                    type="text"
                    placeholder="Add new habit..."
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addHabit()}
                    className="flex-1 px-4 py-3 border-2 border-amber-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-900 text-white placeholder-gray-500"
                  />
                  <button
                    onClick={addHabit}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 md:px-8 py-3 rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center gap-2 font-semibold shadow-lg shadow-amber-500/50 flex-shrink-0"
                  >
                    <Plus size={20} />
                    <span className="hidden md:inline">Add</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 transition-all group ${
                      habit.checked
                        ? "border-amber-500 shadow-amber-500/30 bg-gradient-to-br from-amber-900/30 to-yellow-900/30"
                        : "border-gray-700 hover:border-amber-500/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg flex-shrink-0 ${
                            habit.checked
                              ? "bg-gradient-to-br from-amber-500 to-yellow-600 text-black scale-110 shadow-amber-500/50"
                              : "bg-gray-800 text-gray-500 hover:scale-105"
                          }`}
                        >
                          {habit.checked ? (
                            <Check size={28} strokeWidth={3} />
                          ) : (
                            <X size={28} />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-base md:text-lg text-white truncate">
                            {habit.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xl md:text-2xl flex-shrink-0">
                              {habit.icon}
                            </span>
                            <span className="text-sm text-amber-400 font-semibold">
                              {habit.streak} days 🔥
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="opacity-100 md:opacity-0 md:group-hover:opacity-100 text-red-400 hover:text-red-300 p-2 transition-all flex-shrink-0"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {habit.streak >= 7 && (
                      <div className="mt-3 p-2 md:p-3 rounded-xl bg-amber-900/30 border border-amber-500/30">
                        <p className="text-xs md:text-sm text-center font-medium text-amber-400">
                          🎉 Amazing streak! Keep it up!
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {habits.length === 0 && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl text-center border-2 border-gray-700">
                  <p className="text-lg text-gray-400 mb-2">
                    No habits tracked yet
                  </p>
                  <p className="text-sm text-gray-500">
                    Start building good habits today!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-black border-t-2 border-amber-500/20 z-30">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "text-amber-400 bg-amber-500/10"
                    : "text-gray-400"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <QuickAddModal />
    </div>
  );
}
