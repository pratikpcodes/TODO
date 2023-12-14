import React from "react";
import { useTodo } from "../Context/TodoContext";
import { useState } from "react";

function TodoItem({ todo }) {
  const { updatedTodo, deleteTodo, toggleCmp } = useTodo();
  const [isTodoEdit, setisTodoEdit] = useState(false);
  const [todoMsg, settodoMsg] = useState(todo.todo);
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  const editTodo = () => {
    updatedTodo(todo.id, { ...todo, todo: todoMsg, date });
    setisTodoEdit(false);
  };
  const toggleCompleted = () => {
    toggleCmp(todo.id);
  };

  return (
    <div
      className={`flex border  border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEdit ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => settodoMsg(e.target.value)}
        readOnly={!isTodoEdit}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEdit) {
            editTodo();
          } else setisTodoEdit((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEdit ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="m-0 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
      <div>
      <div className="  text-xs font-bold text-gray-900 m-0"> {time} {date} </div>

      </div>
     
    </div>
  );
}

export default TodoItem;
