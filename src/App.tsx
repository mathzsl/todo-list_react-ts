import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./global.css";
import styles from "./App.module.css";

import { PlusCircle } from "phosphor-react";

import { Header } from "./components/Header";
import { EmptyList } from "./components/EmptyList";
import { TaskItem } from "./components/TaskItem";

export interface Task {
  id: string;
  task: string;
  done: boolean;
}

export function App() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const isNewCommentEmpty = newTask.trim().length === 0;

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTaskList([
      ...taskList,
      {
        id: uuidv4(),
        task: newTask,
        done: isChecked,
      },
    ]);
    setNewTask("");
  }

  function deleteTask(taskToDelete: string) {}

  return (
    <div>
      <Header />

      <main className={styles.main}>
        <form onSubmit={handleCreateNewTask} className={styles.newTaskForm}>
          <input
            name="newTask"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
          />

          <button type="submit" disabled={isNewCommentEmpty}>
            Criar
            <PlusCircle size={18} />
          </button>
        </form>

        <section className={styles.wrapper}>
          <header>
            <div className={styles.infoTasks}>
              <strong>Tarefas criadas</strong>
              <span>{taskList.length}</span>
            </div>

            <div className={styles.infoTasks}>
              <strong style={{ color: " #8284fa" }}>Concluídas</strong>
              <span>0</span>
            </div>
          </header>

          <div className={styles.todoList}>
            {taskList.length ? (
              <ul>
                {taskList.map((task) => (
                  <TaskItem key={task.id} taskItem={task} />
                ))}
              </ul>
            ) : (
              <EmptyList />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
