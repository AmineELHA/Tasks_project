import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsAPI, tasksAPI } from '../api';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const [projectData, tasksData, progressData] = await Promise.all([
        projectsAPI.getById(id),
        tasksAPI.getByProject(id),
        projectsAPI.getProgress(id),
      ]);
      setProject(projectData);
      setTasks(tasksData);
      setProgress(progressData);
      setError('');
    } catch (err) {
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await tasksAPI.create(taskData);
      setTasks([...tasks, newTask]);
      setShowTaskForm(false);
      // Refresh progress
      const progressData = await projectsAPI.getProgress(id);
      setProgress(progressData);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const updatedTask = await tasksAPI.update(taskId, taskData);
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
      // Refresh progress
      const progressData = await projectsAPI.getProgress(id);
      setProgress(progressData);
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
      // Refresh progress
      const progressData = await projectsAPI.getProgress(id);
      setProgress(progressData);
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error || 'Project not found'}
          </div>
          <button
            onClick={() => navigate('/projects')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/projects')}
          className="mb-4 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Projects
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{project.title}</h1>
          {project.description && (
            <p className="text-gray-600 mb-4">{project.description}</p>
          )}
          {progress && (
            <div className="mt-6">
              <ProgressBar
                totalTasks={progress.totalTasks}
                completedTasks={progress.completedTasks}
                progressPercentage={progress.progressPercentage}
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              {showTaskForm ? 'Cancel' : 'Add Task'}
            </button>
          </div>

          {showTaskForm && (
            <TaskForm
              projectId={parseInt(id)}
              onSubmit={handleCreateTask}
              onCancel={() => setShowTaskForm(false)}
            />
          )}
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">No tasks yet</p>
              <button
                onClick={() => setShowTaskForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                Add Your First Task
              </button>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
