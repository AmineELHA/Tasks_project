import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ProgressBar = ({ totalTasks, completedTasks, progressPercentage }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium tabular-nums">
          {completedTasks} / {totalTasks} tasks
        </span>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2"
      />
    </div>
  );
};

export default ProgressBar;
