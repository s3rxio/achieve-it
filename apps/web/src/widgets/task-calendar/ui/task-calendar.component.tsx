import { Calendar } from "antd";
import { Dayjs } from "dayjs";
import {
  filterTasksByDate,
  Task,
  TaskStatusBadge
} from "../../../entitites/task";

interface TaskCalendarProps {
  selectedDate: Dayjs;
  onSelectDate: (date: Dayjs) => void;
  onSelectTask: (task: Task) => void;
  tasks: Task[];
}

export const TaskCalendar = ({
  selectedDate,
  onSelectDate,
  onSelectTask,
  tasks
}: TaskCalendarProps) => {
  const dateCellRender = (date: Dayjs) => {
    const tasksForDate = filterTasksByDate(tasks, date);

    return (
      <div onClick={() => onSelectDate(date)}>
        {tasksForDate.map(task => (
          <div
            key={task.id}
            onClick={e => {
              e.stopPropagation();
              onSelectTask(task);
            }}
          >
            <TaskStatusBadge status={task.status} title={task.title} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Calendar
      value={selectedDate}
      onSelect={onSelectDate}
      cellRender={dateCellRender}
    />
  );
};
