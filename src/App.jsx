import { useState } from "react";
import Header from "./components/header";
import TaskItem from "./components/task-item";
import TaskForm from "./components/task-form";
import "./App.css";
import confetti from "canvas-confetti";

function App() {
  const [tasks, setTasks] = useState([]); //declaram taskurile
  const [filter, setFilter] = useState("all"); //ca sa vad toate sarcinile
  const [message, setMessage] = useState(""); //ca sa fie vizibil mesajul de la final

  const addTask = (taskText) => {
    //aici adaugam taskuri noi
    const newTask = {
      //declaram noul task
      id: tasks.length + 1, //la task aflam nr de task si dupa mai adaugam unul
      title: taskText, //se impune nume la noul task
      completed: false, //noul task e clar e terminat
    };
    setTasks([...tasks, newTask]); //actualizeaza lista cu taskuri
  };

  const toggleTaskCompletion = (taskId) => {
    //marcheaza o sarcina fie completa fie incompleta
    setTasks(
      //actualizeaza lista cu taskuri
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    //sterge toate taskurile complete
    const hasCompleted = tasks.some((task) => task.completed);
    if (hasCompleted) {
      //daca toate taskurile sunt complete apar confeti
      confetti({
        particleCount: 2000,
        spread: 130,
        origin: { y: 0.6 },
      });
      setMessage("Good job champ!"); //apare mesajul Good job champ!
    }
    setTasks(tasks.filter((task) => !task.completed)); //actualizeaza lista cu taskuri
  };

  const totalTasks = tasks.length; // toate sarcinile
  const completedTasks = tasks.filter((task) => task.completed).length; //numara cate taskuri au fost completate

  const filteredTasks = tasks.filter((task) => {
    //filtrarea sarcinilor
    if (filter === "active") return !task.completed; //sarcinile necompletate se returneaza
    if (filter === "done") return task.completed; // doar sarcinile terminate se returneaza
    return true;
  });

  return (
    <>
      <Header />
      <TaskForm onAdd={addTask} />

      <div className="navbar">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "active" : ""}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("done")}
          className={filter === "done" ? "active" : ""}
        >
          Done
        </button>
      </div>

      <div className="app-container">
        <p>
          {completedTasks} / {totalTasks} tasks completed
        </p>

        {message && <button className="congratulations-btn">{message}</button>}

        <ul>
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              completed={task.completed}
              onToggle={() => toggleTaskCompletion(task.id)}
            />
          ))}
        </ul>

        <button onClick={clearCompleted}>Clear Completed</button>
      </div>
    </>
  );
}

export default App;

/*
harta 
    1 declararea taskurilor
    2 adaugarea taskurilor
    3 confeti + mesaj
    4 stergera taskurilor completate 
    5 filtrarea taskurilor
    6 return
*/
