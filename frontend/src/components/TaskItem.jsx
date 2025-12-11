import { useState } from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate || '',
    completed: task.completed,
  });

  const handleToggleComplete = async () => {
    try {
      await onUpdate(task.id, {
        ...task,
        completed: !task.completed,
      });
    } catch (error) {
      alert('Failed to update task');
    }
  };

  const handleSave = async () => {
    try {
      await onUpdate(task.id, {
        ...editedTask,
        projectId: task.projectId,
      });
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDelete(task.id);
      } catch (error) {
        alert('Failed to delete task');
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          placeholder="Task title"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          placeholder="Description"
          rows="2"
        />
        <input
          type="date"
          value={editedTask.dueDate}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border ${task.completed ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <p className={`text-xs mt-2 ${task.completed ? 'text-gray-400' : 'text-gray-500'}`}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
