import React, { useEffect, useRef, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useSelector } from "react-redux";
// import { AddProj, setProj } from "../Projects/projectSlice.js";

function Task({ id, content }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  const taskClasses = `
    p-4 my-4 mx-2 bg-white rounded border border-gray-300 cursor-grab 
    flex flex-col
    ${isDragging ? "shadow-lg z-50 opacity-80" : "shadow-none"}
  `;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={taskClasses}
      {...listeners}
      {...attributes}
    >
      <span className="pb-3 text-gray-800">{content}</span>
      <div className="flex justify-end w-full">
        <img src="user_icon.png" className="w-5" alt="Assignee avatar" />
      </div>
    </div>
  );
}

// Column Component (with Tailwind CSS)
function Column({ id, title, tasks }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const columnClasses = `
    p-3 m-2.5 rounded-sm  min-w-[300px] h-fit
    flex flex-col transition-colors duration-200 ease-in-out
    ${isOver ? "bg-gray-300" : "bg-gray-100"}
  `;

  return (
    <div ref={setNodeRef} className={columnClasses}>
      <h3 className="text-lg font-semibold text-gray-700 flex items-center">
        <span className="text-sm pr-1">{title}</span>
        <span className="px-2 text-gray-400 text-sm">{tasks.length}</span>
      </h3>
      {tasks.map((task) => (
        <Task key={task._id} id={task._id} content={task.task} />
      ))}
      <button
        
        className="mt-5 text-center font-bold text-white rounded-sm mx-2 p-2 py-1 bg-gray-300"
      >
        {" "}
        ADD TASK
      </button>
    </div>
  );
}

// Board Component (with Tailwind CSS)
function Board() {
  const [data, setData] = useState([]);
  const project = useSelector((state) => state.project);
  {
    console.log(project);
  }
  const scrollRef = useRef(null);

  useEffect(() => {
    async function getCols() {
      if (project.currentProj) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/column/${project.currentProj}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          const result = await response.json();
          if (result.success) {
            {
              console.log(result);
            }
            setData(result.data);
          } else {
            console.error("Failed to fetch columns:", result.message);
          }
        } catch (error) {
          console.error("Error fetching columns:", error);
        }
      }
    }

    getCols();
  }, [project.currentProj]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    let destColumnId = over.id;

    const isColumn = data.some((col) => col._id === destColumnId);
    if (!isColumn) {
      for (const col of data) {
        if (col.tasks.some((task) => task._id === destColumnId)) {
          destColumnId = col._id;
          break;
        }
      }
    }

    let sourceColumnId = null;
    let taskToMove = null;

    for (const col of data) {
      const task = col.tasks.find((t) => t._id === taskId);
      if (task) {
        sourceColumnId = col._id;
        taskToMove = task;
        break;
      }
    }

    if (!taskToMove || sourceColumnId === destColumnId) return;

    setData((prev) =>
      prev.map((col) => {
        if (col._id === sourceColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t._id !== taskId),
          };
        }
        if (col._id === destColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, taskToMove],
          };
        }
        return col;
      })
    );
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        className="flex justify-start p-5 font-sans relative overflow-x-auto h-full"
        ref={scrollRef}
      >
        {data.map((column) => (
          <Column
            key={column._id}
            id={column._id}
            title={column.title}
            tasks={column.tasks}
          />
        ))}
        <div
         
          className="flex flex-col justify-center  h-fit my-3 p-1 bg-gray-300"
        >
          <i class="fa-solid fa-plus text-white font-bold text-sm   rounded-lg opacity-70 hover:opacity-100 transition-all"></i>
        </div>
      </div>
    </DndContext>
  );
}

export default Board;
