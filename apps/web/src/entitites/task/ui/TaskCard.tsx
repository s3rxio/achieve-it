import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { FC } from "react";
import { Task } from "../types";
import { TaskStatusBadge } from "./TaskStatusBadge";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
}

export const TaskCard: FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      title={<Typography.Title level={5}>{task.title}</Typography.Title>}
      extra={
        <Space>
          {onEdit && (
            <Button icon={<EditOutlined />} onClick={() => onEdit(task)} />
          )}
          {onDelete && (
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(task.id)}
            />
          )}
        </Space>
      }
      style={{ marginBottom: 16 }}
    >
      <div style={{ marginBottom: 12 }}>
        <Typography.Text type="secondary">Описание:</Typography.Text>
        <Typography.Text style={{ display: "block", marginTop: 4 }}>
          {task.description || "—"}
        </Typography.Text>
      </div>

      <Space size="middle" wrap>
        <div>
          <Typography.Text type="secondary">Статус:</Typography.Text>
          <div style={{ marginTop: 4 }}>
            <TaskStatusBadge status={task.status} title={task.status} />
          </div>
        </div>

        {task.dueDate && (
          <div>
            <Typography.Text type="secondary">Срок:</Typography.Text>
            <div style={{ marginTop: 4 }}>
              <Tag
                color={dayjs(task.dueDate).isBefore(dayjs()) ? "red" : "blue"}
              >
                {dayjs(task.dueDate).format("DD.MM.YYYY")}
              </Tag>
            </div>
          </div>
        )}
      </Space>
    </Card>
  );
};
