import React, { useEffect, useState, useCallback } from "react";
import api from "../api/api";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee?: { name: string };
  createdAt: string;
}

interface Employee {
  id: number;
  name: string;
  email: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  }, []);

  const fetchEmployees = useCallback(async () => {
    const res = await api.get("/admin/employees");
    setEmployees(res.data);
  }, []);

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.assignedTo) return; // ✅ simple validation
    setLoading(true);
    try {
      await api.post("/tasks", {
        title: form.title,
        description: form.description,
        status: "PENDING",
        assignedTo: Number(form.assignedTo),
      });
      setForm({ title: "", description: "", assignedTo: "" }); // reset
      fetchTasks();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, [fetchTasks, fetchEmployees]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {/* Add Task Form */}
      <form
        onSubmit={addTask}
        className="mb-6 p-4 bg-white rounded-lg shadow flex flex-col gap-3 w-full md:w-1/2"
      >
        <input
          type="text"
          placeholder="Task title "
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-sky-500"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={form.description }
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-sky-500"
        />

        <select
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          className="border rounded px-3 py-2 focus:outline-sky-500"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="overflow-x-auto">
        <table className="min-w-max w-full bg-white rounded-lg shadow text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Assigned To</th>
              <th className="p-3 text-left">Assigned At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3 whitespace-nowrap">{t.title}</td>
                <td className="p-3">{t.description}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      t.status === "COMPLETED"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="p-3 whitespace-nowrap">
                  {t.assignee?.name || "Unassigned"}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tasks.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No tasks yet</p>
      )}
    </div>
  );
}
