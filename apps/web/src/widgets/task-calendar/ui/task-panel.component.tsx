import { Dayjs } from "dayjs";
import { FC } from "react";
import { Task } from "../../../entitites/task";
import TaskDayView from "./task-day-view.component";
import TaskDetailView from "./task-detail-view.component";

interface TaskPanelProps {
  date: Dayjs;
  selectedTask: Task | null;
  tasks: Task[];
  onCloseTask: () => void;
  onSelectTask: (task: Task) => void;
}

export const TaskPanel: FC<TaskPanelProps> = ({
  date,
  selectedTask,
  tasks,
  onCloseTask,
  onSelectTask
}) => {
  return (
    <div>
      {selectedTask ? (
        <TaskDetailView task={selectedTask} onClose={onCloseTask} />
      ) : (
        <TaskDayView date={date} tasks={tasks} onSelectTask={onSelectTask} />
      )}
    </div>
  );
};

export default TaskPanel;
