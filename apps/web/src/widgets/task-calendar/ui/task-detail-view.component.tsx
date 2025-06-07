import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { FC } from "react";
import styled from "styled-components";
import { Task, TaskStatusBadge } from "../../../entitites/task";
import { useEditTaskModalStore } from "../../../features/task";

interface TaskDetailViewProps {
  task: Task;
  onClose: () => void;
}

const { Text, Title } = Typography;

const StyledCard = styled(Card)({
  marginTop: "1rem"
});

const Description = styled(Text)({ display: "block", marginTop: 4 });

export const TaskDetailView: FC<TaskDetailViewProps> = ({ task, onClose }) => {
  const editTaskModalState = useEditTaskModalStore();

  return (
    <div>
      <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
        Назад
      </Button>

      <StyledCard
        title={<Title level={5}>{task.title}</Title>}
        extra={
          <Space>
            <Button
              onClick={() => editTaskModalState.openModal(task)}
              icon={<EditOutlined />}
            />
            {/* <Button onClick={onDelete} danger icon={<DeleteOutlined />} /> */}
          </Space>
        }
      >
        <div style={{ marginBottom: 12 }}>
          <Text type="secondary">Описание:</Text>
          <Description>{task.description || "—"}</Description>
        </div>

        <Space size="middle" wrap>
          <div>
            <Text type="secondary">Статус:</Text>
            <TaskStatusBadge status={task.status} title={task.status} />
          </div>

          <div>
            <Text type="secondary">Срок:</Text>
            <div style={{ marginTop: 4 }}>
              {task.dueDate ? (
                <Tag
                  color={dayjs(task.dueDate).isBefore(dayjs()) ? "red" : "blue"}
                >
                  {dayjs(task.dueDate).format("DD.MM.YYYY")}
                </Tag>
              ) : (
                <Tag color="blue">Нет срока</Tag>
              )}
            </div>
          </div>
        </Space>
      </StyledCard>
    </div>
  );
};

export default TaskDetailView;
