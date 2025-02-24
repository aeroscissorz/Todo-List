import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    if (editedTitle.trim() !== todo.title) {
      onEdit(todo.id, editedTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
            ${todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-green-500'}`}
        >
          {todo.completed && <Check size={14} className="text-white" />}
        </button>
        
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 min-w-0 px-2 py-1 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span className={`flex-1 min-w-0 truncate text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.title}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="text-green-500 hover:text-green-600 transition-colors p-1"
              title="Save"
            >
              <Save size={18} />
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-500 transition-colors p-1"
              title="Cancel"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all p-1"
              title="Edit"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}