"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

async function fetchTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) {
    throw new Error("Gagal mengambil data todo");
  }
  return res.json();
}

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return <div className="text-center py-4">Memuat data...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Terjadi kesalahan: {error?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Daftar Tugas (Todos)
      </h1>
      <ul className="space-y-2">
        {data.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="mr-3 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <span
              className={`text-lg ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
