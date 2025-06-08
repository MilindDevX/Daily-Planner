import React, { useContext } from 'react';
import { TimerIcon } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';

const TaskTimer = ({ task }) => {
  const { getTimeUntilDeadline, getDaysUntilDeadline } = useContext(TaskContext);

  const timeLeft = getTimeUntilDeadline(task.deadline);
  const isOverdue = timeLeft === 'Overdue';
  const isUrgent = getDaysUntilDeadline(task.deadline) <= 1;

  return (
    <div className={`text-sm font-mono ${isOverdue ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-blue-600'}`}>
      <TimerIcon className="h-4 w-4 inline mr-1" />
      {timeLeft}
    </div>
  );
};

export default TaskTimer;
