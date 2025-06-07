import { PlusOutlined } from "@ant-design/icons";
import { Button, List, Typography } from "antd";
import { Dayjs } from "dayjs";
import { FC } from "react";
import styled from "styled-components";
import {
  filterTasksByDate,
  Task,
  TaskStatusBadge
} from "../../../entitites/task";
import { useCreateTaskModalStore } from "../../../features/task/model/store";

interface TaskDayViewProps {
  date: Dayjs;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

const StyledTaskStatusBadge = styled(TaskStatusBadge)({
  cursor: "pointer"
});

export const TaskDayView: FC<TaskDayViewProps> = ({
  date,
  tasks,
  onSelectTask
}) => {
  const createTaskModalState = useCreateTaskModalStore();
  const tasksForDate = filterTasksByDate(tasks, date.endOf("day"));

  return (
    <div>
      <Typography.Title level={5}>
        Задачи на {date.format("DD.MM.YYYY")}
      </Typography.Title>
      <List
        dataSource={tasksForDate}
        renderItem={task => (
          <List.Item onClick={() => onSelectTask(task)}>
            <StyledTaskStatusBadge status={task.status} title={task.title} />
          </List.Item>
        )}
      />
      <Button
        onClick={() => createTaskModalState.setIsOpen(true)}
        icon={<PlusOutlined />}
        type="primary"
      >
        Добавить задачу
      </Button>
    </div>
  );
};

export default TaskDayView;
