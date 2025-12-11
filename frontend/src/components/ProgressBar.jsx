import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ProgressBar = ({ totalTasks, completedTasks, progressPercentage }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Progress</span>
        <Badge 
          variant={progressPercentage === 100 ? "default" : "secondary"}
          className="tabular-nums"
        >
          {completedTasks} / {totalTasks}
        </Badge>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2"
      />
      
      <p className="text-xs text-muted-foreground text-right tabular-nums">
        {Math.round(progressPercentage)}% complete
      </p>
    </div>
  );
};

export default ProgressBar;
