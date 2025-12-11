import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { projectsAPI, tasksAPI } from '../api';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Skeleton } from '../components/ui/skeleton';

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
      toast.success('Task created successfully');
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
          <Skeleton className="h-10 w-48 mb-4" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-full" />
            </CardContent>
          </Card>
          <div className="mt-8">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              {error || 'Project not found'}
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/projects')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/projects')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">{project.title}</CardTitle>
            {project.description && (
              <CardDescription className="text-base">
                {project.description}
              </CardDescription>
            )}
          </CardHeader>
          {progress && (
            <CardContent>
              <ProgressBar
                totalTasks={progress.totalTasks}
                completedTasks={progress.completedTasks}
                progressPercentage={progress.progressPercentage}
              />
            </CardContent>
          )}
        </Card>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tasks</h2>
            <Button onClick={() => setShowTaskForm(!showTaskForm)}>
              {showTaskForm ? (
                'Cancel'
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </>
              )}
            </Button>
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
            <Card className="text-center py-12">
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-lg">No tasks yet</p>
                <Button onClick={() => setShowTaskForm(true)} size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Your First Task
                </Button>
              </CardContent>
            </Card>
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
