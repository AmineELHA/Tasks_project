import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Check, X, Calendar } from "lucide-react";
import { format, isPast, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
      toast.error('Failed to update task');
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
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task.id);
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  // Edit mode
  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Task Title</Label>
            <Input
              id="edit-title"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              placeholder="Task title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              placeholder="Description"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-dueDate">Due Date</Label>
            <Input
              id="edit-dueDate"
              type="date"
              value={editedTask.dueDate}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button 
              onClick={() => setIsEditing(false)} 
              variant="outline"
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // View mode
  const getDueDateVariant = () => {
    if (task.completed) return "secondary";
    if (!task.dueDate) return "secondary";
    const dueDate = new Date(task.dueDate);
    if (isPast(dueDate) && !isToday(dueDate)) return "destructive";
    if (isToday(dueDate)) return "default";
    return "secondary";
  };

  return (
    <Card className={cn(
      "transition-all",
      task.completed && "opacity-60 bg-muted/50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-1">
            <h3 className={cn(
              "text-lg font-semibold",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "text-sm",
                task.completed ? "text-muted-foreground" : "text-foreground"
              )}>
                {task.description}
              </p>
            )}
            
            {task.dueDate && (
              <Badge
                variant={getDueDateVariant()}
                className="text-xs mt-2"
              >
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(task.dueDate), "MMM d, yyyy")}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete "{task.title}".
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
