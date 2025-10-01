import {
  Calendar,
  Check,
  CheckSquare,
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
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function TawanOS() {
  // Load data from localStorage
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Tasks State
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

  // Calendar Events State
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

  // Finance State
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

  // Goals State
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

  // Notes State
  const [notes, setNotes] = useState(() =>
    loadFromStorage("tawanOS_notes", [
      {
        id: 1,
        title: "New Project Ideas",
        content: "Build an AI-powered time management app",
        date: "2025-10-01",
        tags: ["work"],
      },
      {
        id: 2,
        title: "Shopping List",
        content: "Milk, eggs, bread",
        date: "2025-10-01",
        tags: ["personal"],
      },
    ])
  );
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  // Habits State
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
      { id: 4, name: "Meditate 10 min", streak: 2, checked: false, icon: "🧘" },
    ])
  );
  const [newHabit, setNewHabit] = useState("");

  // Save to localStorage whenever data changes
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

  // Task Functions
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

    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [tasks, taskFilter, searchQuery]);

  // Event Functions
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

  const upcomingEvents = useMemo(() => {
    return events
      .filter((e) => new Date(e.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  }, [events]);

  // Finance Functions
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

  const calculateBalance = () => {
    return transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.amount : acc - t.amount;
    }, 0);
  };

  const totalIncome = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  // Goal Functions
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

  // Note Functions
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

  // Habit Functions
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

  // Statistics
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

  // Navigation Items
  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: TrendingUp },
    { id: "tasks", name: "Tasks", icon: CheckSquare },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "finance", name: "Finance", icon: DollarSign },
    { id: "goals", name: "Goals", icon: Target },
    { id: "notes", name: "Notes", icon: FileText },
    { id: "habits", name: "Habits", icon: Check },
  ];

  // Quick Add Modal
  const QuickAddModal = () => {
    if (!showQuickAdd) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 w-full max-w-md shadow-2xl border-2 border-amber-500/30 transform transition-all">
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
      className="flex flex-col h-screen bg-black overflow-hidden"
      style={{ fontFamily: "'Anuphan', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Anuphan:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-gray-900 to-black border-b-2 border-amber-500/20 px-4 py-3 flex items-center justify-between">
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

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-gray-900 to-black shadow-2xl border-r-2 border-amber-500/20 z-30">
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20 lg:pb-0 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-gray-900 to-black border-b-2 border-amber-500/20 sticky top-0 z-20 backdrop-blur-lg bg-opacity-95">
          <div className="px-4 py-3 md:px-8 md:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <Search className="text-amber-400" size={18} />
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
              <Plus size={18} />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          {/* Dashboard */}
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

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg w-fit">
                      <CheckSquare className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      {stats.tasksLeft}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Tasks Left</p>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-yellow-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${stats.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg w-fit">
                      <DollarSign className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      ${(stats.balance / 1000).toFixed(1)}k
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Balance</p>
                  <p className="text-xs text-green-400 mt-1">
                    +${(totalIncome / 1000).toFixed(1)}k
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg w-fit">
                      <TrendingUp className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      {stats.bestStreak} 🔥
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Best Streak</p>
                  <p className="text-xs text-amber-400 mt-1">
                    {habits.filter((h) => h.checked).length}/{habits.length}{" "}
                    today
                  </p>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-lg w-fit">
                      <Target className="text-amber-400" size={20} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-amber-400">
                      {stats.goalsProgress}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Goals</p>
                  <p className="text-xs text-amber-400 mt-1">
                    {goals.length} total
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-amber-400">
                      Today's Tasks
                    </h3>
                    <span className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-semibold border border-amber-500/30">
                      {tasks.filter((t) => !t.completed).length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {tasks
                      .filter((t) => !t.completed)
                      .slice(0, 5)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-2 p-2 md:p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="w-4 h-4 rounded accent-amber-500"
                          />
                          <p className="text-white text-sm flex-1 line-clamp-1">
                            {task.title}
                          </p>
                        </div>
                      ))}
                    {tasks.filter((t) => !t.completed).length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-amber-400 text-xl mb-1">🎉</p>
                        <p className="text-gray-400 text-sm">All done!</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-amber-400">
                      Upcoming
                    </h3>
                    <Calendar className="text-amber-400" size={18} />
                  </div>
                  <div className="space-y-2">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-xl border border-gray-700 bg-gray-800/50"
                      >
                        <p className="text-white font-semibold text-sm mb-1">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {event.date} • {event.time}
                        </p>
                      </div>
                    ))}
                    {upcomingEvents.length === 0 && (
                      <div className="text-center py-6">
                        <p className="text-gray-400 text-sm">
                          No upcoming events
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-2xl border-2 border-amber-500/30">
                <h3 className="text-lg md:text-xl font-bold text-amber-400 mb-4">
                  Daily Habits
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        habit.checked
                          ? "border-amber-500 bg-gradient-to-br from-amber-500/20 to-yellow-500/20"
                          : "border-gray-700 bg-gray-800/50"
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl block mb-1">
                          {habit.icon}
                        </span>
                        <p className="text-xs font-medium text-white line-clamp-1">
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

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                  Tasks
                </h2>
                <p className="text-gray-400 text-sm">Manage your tasks</p>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl border-2 border-amber-500/30">
                <div className="space-y-3">
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

              <div className="space-y-2">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border-2 border-gray-700 hover:border-amber-500/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 rounded accent-amber-500 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold text-sm md:text-base ${
                            task.completed ? "line-through opacity-50" : ""
                          } text-white truncate`}
                        >
                          {task.title}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              task.priority === "high"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : task.priority === "medium"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-400 hover:text-red-300 p-2 flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs similar structure - simplified for mobile */}
          {activeTab === "calendar" && (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Calendar
              </h2>
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 border-amber-500/30">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Event name..."
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                    />
                    <input
                      type="time"
                      value={newEvent.time}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, time: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                    />
                  </div>
                  <button
                    onClick={addEvent}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl font-semibold"
                  >
                    <Plus size={20} className="inline mr-2" />
                    Add Event
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border-2 border-gray-700 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-white">{event.title}</p>
                      <p className="text-sm text-gray-400">
                        {event.date} • {event.time}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-400 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Finance
              </h2>
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-6 rounded-2xl text-black">
                <p className="text-sm opacity-90 mb-1">Balance</p>
                <p className="text-3xl md:text-4xl font-bold mb-3">
                  ${calculateBalance().toLocaleString()}
                </p>
                <div className="flex gap-4 text-sm">
                  <div>
                    <p className="opacity-75">Income</p>
                    <p className="font-semibold">
                      +${totalIncome.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="opacity-75">Expense</p>
                    <p className="font-semibold">
                      -${totalExpense.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 border-amber-500/30">
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
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
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
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                    />
                    <select
                      value={newTransaction.type}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          type: e.target.value,
                        })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <button
                    onClick={addTransaction}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl font-semibold"
                  >
                    <Plus size={20} className="inline mr-2" />
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {transactions.slice(0, 10).map((t) => (
                  <div
                    key={t.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl border-2 border-gray-700 flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white truncate">{t.title}</p>
                      <p className="text-xs text-gray-400">{t.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-lg font-bold ${
                          t.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {t.type === "income" ? "+" : "-"}${t.amount}
                      </p>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-red-400 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Goals
              </h2>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 border-amber-500/30">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Goal name..."
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Target"
                      value={newGoal.target}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, target: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                    />
                    <input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, deadline: e.target.value })
                      }
                      className="px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                    />
                  </div>
                  <button
                    onClick={addGoal}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl font-semibold"
                  >
                    <Plus size={20} className="inline mr-2" />
                    Add Goal
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {goals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div
                      key={goal.id}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 border-amber-500/30"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-white flex-1">
                          {goal.title}
                        </h3>
                        <button
                          onClick={() => deleteGoal(goal.id)}
                          className="text-red-400 p-1"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-white">Progress</span>
                          <span className="text-sm font-bold text-amber-400">
                            {progress.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-yellow-600 h-2 rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="number"
                          value={goal.current}
                          onChange={(e) =>
                            updateGoalProgress(goal.id, e.target.value)
                          }
                          className="flex-1 px-3 py-2 border-2 border-amber-500/30 rounded-lg bg-gray-900 text-white"
                        />
                        <span className="text-gray-400">/ {goal.target}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Notes
              </h2>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 border-amber-500/30">
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Title..."
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                  />
                  <textarea
                    placeholder="Content..."
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-amber-500/30 rounded-xl h-24 bg-gray-900 text-white"
                  />
                  <button
                    onClick={addNote}
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black py-3 rounded-xl font-semibold"
                  >
                    <Plus size={20} className="inline mr-2" />
                    Add Note
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 border-amber-500/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-amber-400">
                        {note.title}
                      </h3>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-red-400 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                      {note.content}
                    </p>
                    <span className="text-xs text-gray-500">
                      📅 {note.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "habits" && (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Habits
              </h2>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 border-amber-500/30">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="New habit..."
                    value={newHabit}
                    onChange={(e) => setNewHabit(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addHabit()}
                    className="flex-1 px-4 py-3 border-2 border-amber-500/30 rounded-xl bg-gray-900 text-white"
                  />
                  <button
                    onClick={addHabit}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-6 py-3 rounded-xl font-semibold"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className={`bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-2xl border-2 ${
                      habit.checked ? "border-amber-500" : "border-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <button
                          onClick={() => toggleHabit(habit.id)}
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            habit.checked
                              ? "bg-gradient-to-br from-amber-500 to-yellow-600 text-black"
                              : "bg-gray-800 text-gray-500"
                          }`}
                        >
                          {habit.checked ? (
                            <Check size={24} />
                          ) : (
                            <X size={24} />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-sm truncate">
                            {habit.name}
                          </p>
                          <p className="text-sm text-amber-400 font-semibold">
                            {habit.streak} days 🔥
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="text-red-400 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-black border-t-2 border-amber-500/20 z-30">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
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

      {/* Quick Add Modal */}
      <QuickAddModal />
    </div>
  );
}
