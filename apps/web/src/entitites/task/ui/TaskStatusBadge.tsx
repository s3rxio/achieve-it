import { Badge } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { taskStatusColors } from "../task.const";
import { TaskStatus } from "../task.types";

interface TaskStatusBadgeProps {
  status: TaskStatus;
  title: string;
  onClick?: () => void;
}

const StyledBadge = styled(Badge)({
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "4px",
  width: "100%",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  }
});

export const TaskStatusBadge: FC<TaskStatusBadgeProps> = ({
  status,
  title,
  ...props
}) => <StyledBadge color={taskStatusColors[status]} text={title} {...props} />;
