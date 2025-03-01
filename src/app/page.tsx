"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [tasks, setTasks] = useState<{ id: number; name: string; description?: string; status: string }[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data: { id: number; name: string; description?: string; status: string }[] = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTask, description: newDescription, status: "PENDING" })
    });

    if (res.ok) {
      fetchTasks();
      setNewTask("");
      setNewDescription("");
    }
  };

  const markDone = async (id: number) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "DONE" })
    });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchTasks();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 rounded-l-md"
          placeholder="Ajouter une tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          className="border p-2 ml-2 rounded-l-md"
          placeholder="Ajouter une description..."
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">Ajouter</button>
      </div>
      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-3 mb-2 flex justify-between items-center shadow-md rounded-md">
            <div>
              <span>{task.name}</span>
              <p>{task.description}</p>
              <span className={`text-sm ${task.status === "DONE" ? "text-green-500" : "text-yellow-500"}`}>
                {task.status}
              </span>
            </div>
            <div> 
              <button onClick={() => markDone(task.id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                FAIT
              </button>
              <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                SUPPRIMER
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
