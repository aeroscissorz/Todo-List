import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';
import { Todo } from './types/todo';

const API_URL = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from backend
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch todos');
        return response.json();
      })
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load todos');
        setLoading(false);
      });
  }, []);

  const addTodo = async (title: string) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          completed: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to add todo');
      
      const newTodo = await response.json();
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t._id === id);
      if (!todo) return;

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      setTodos(prev =>
        prev.map(t =>
          t._id === id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');

      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  const editTodo = async (id: string, newTitle: string) => {
    try {
      const todo = todos.find(t => t._id === id);
      if (!todo) return;

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...todo,
          name: newTitle,
        }),
      });

      if (!response.ok) throw new Error('Failed to edit todo');

      setTodos(prev =>
        prev.map(t =>
          t._id === id ? { ...t, name: newTitle } : t
        )
      );
    } catch (err) {
      setError('Failed to edit todo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading todos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-8">
            <CheckSquare size={32} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
              <button 
                onClick={() => setError(null)}
                className="ml-2 text-red-800 hover:text-red-900"
              >
                Dismiss
              </button>
            </div>
          )}

          <TodoInput onAdd={addTodo} />

          <div className="space-y-2">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No todos yet. Add one above!
              </p>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={{
                    id: todo._id,
                    title: todo.name,
                    completed: todo.completed,
                  }}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
