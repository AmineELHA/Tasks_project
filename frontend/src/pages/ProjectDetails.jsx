import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { projectsAPI, tasksAPI } from '../api';
import Navbar from '../components/Navbar';
import ProgressBar from '../components/ProgressBar';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import Pagination from '../components/Pagination';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Skeleton } from '../components/ui/skeleton';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  
  // Pagination and filter states
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedFilter, setCompletedFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [sortBy, setSortBy] = useState('createdAt'); // 'createdAt', 'dueDate', 'title'
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc', 'desc'

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  useEffect(() => {
    fetchTasks();
  }, [id, currentPage, searchTerm, completedFilter, sortBy, sortDirection]);

  const fetchProjectData = async () => {
    try {
      const [projectData, progressData] = await Promise.all([
        projectsAPI.getById(id),
        projectsAPI.getProgress(id),
      ]);
      setProject(projectData);
      setProgress(progressData);
      setError('');
    } catch (err) {
      setError('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const completed = completedFilter === 'all' ? null : completedFilter === 'completed';
      const response = await tasksAPI.getFiltered(id, {
        search: searchTerm,
        completed,
        sortBy,
        sortDirection,
        page: currentPage,
        size: 10,
      });
      setTasks(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      toast.error('Failed to load tasks');
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await tasksAPI.create(taskData);
      setShowTaskForm(false);
      toast.success('Task created successfully');
      // Refresh tasks and progress
      await fetchTasks();
      const progressData = await projectsAPI.getProgress(id);
      setProgress(progressData);
    } catch (err) {
      throw err;
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      await tasksAPI.update(taskId, taskData);
      // Refresh tasks and progress
      await fetchTasks();
      const progressData = await projectsAPI.getProgress(id);
      setProgress(progressData);
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      // Refresh tasks and progress
      await fetchTasks();
      const progressData = await projectsAPI.getProgress(id);
      setProgress(progressData);
    } catch (err) {
      throw err;
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0); // Reset to first page on search
  };

  const handleFilterChange = (e) => {
    setCompletedFilter(e.target.value);
    setCurrentPage(0); // Reset to first page on filter change
  };

  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split('-');
    setSortBy(field);
    setSortDirection(direction);
    setCurrentPage(0); // Reset to first page on sort change
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
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/projects')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl tracking-tight">{project.title}</CardTitle>
            {project.description && (
              <CardDescription className="text-base mt-2">
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <Button onClick={() => setShowTaskForm(!showTaskForm)} variant={showTaskForm ? "outline" : "default"}>
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
            <div className="mb-6">
              <TaskForm
                projectId={parseInt(id)}
                onSubmit={handleCreateTask}
                onCancel={() => setShowTaskForm(false)}
              />
            </div>
          )}

          {/* Search and Filter Controls */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={completedFilter}
                    onChange={handleFilterChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <Label htmlFor="sort">Sort By</Label>
                  <select
                    id="sort"
                    value={`${sortBy}-${sortDirection}`}
                    onChange={handleSortChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="createdAt-desc">Newest First</option>
                    <option value="createdAt-asc">Oldest First</option>
                    <option value="dueDate-asc">Due Date (Earliest)</option>
                    <option value="dueDate-desc">Due Date (Latest)</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center py-16">
                <p className="text-sm text-muted-foreground mb-4">
                  {searchTerm || completedFilter !== 'all' 
                    ? 'No tasks match your filters' 
                    : 'No tasks yet'}
                </p>
                {!searchTerm && completedFilter === 'all' && (
                  <Button onClick={() => setShowTaskForm(true)} variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
