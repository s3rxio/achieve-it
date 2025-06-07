import { Col, Row, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { Task, useTasks } from "../../../entitites/task";
import { CreateTaskModal, EditTaskModal } from "../../../features/task";
import { TaskCalendar, TaskPanel } from "../../../widgets/task-calendar";

export const TasksPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const tasksQuery = useTasks(selectedDate.format("YYYY-MM"));

  return (
    <div>
      <Typography.Title>Задачи</Typography.Title>

      <Row gutter={[24, 24]} justify="space-between">
        <Col span={14}>
          <TaskCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onSelectTask={setSelectedTask}
            tasks={tasksQuery.data}
          />
        </Col>

        <Col span={8}>
          <TaskPanel
            date={selectedDate}
            selectedTask={selectedTask}
            onSelectTask={setSelectedTask}
            tasks={tasksQuery.data}
            onCloseTask={() => setSelectedTask(null)}
          />
        </Col>
      </Row>

      <CreateTaskModal />
      <EditTaskModal />
    </div>
  );
};

export default TasksPage;
