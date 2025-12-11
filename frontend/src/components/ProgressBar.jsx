const ProgressBar = ({ totalTasks, completedTasks, progressPercentage }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Progress</span>
        <span>{completedTasks} / {totalTasks} tasks completed</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        >
          <span className="text-xs text-white flex items-center justify-center h-full font-semibold">
            {progressPercentage > 10 && `${Math.round(progressPercentage)}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
