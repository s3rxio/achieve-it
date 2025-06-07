import { Modal } from "antd";
import React from "react";
import { Task } from "../../../entitites/task";
import { useEditTask } from "../hooks/use-edit-task.hook";
import { useEditTaskModalStore } from "../model/store";
import { EditTaskFormData } from "../schemas/edit-task.schema";
import { EditTaskForm } from "./edit-task-form.component";

export const EditTaskModal: React.FC = () => {
  const editTaskMutation = useEditTask();
  const modalStore = useEditTaskModalStore();

  const onSubmit = (data: EditTaskFormData) => {
    editTaskMutation.mutate(
      {
        id: modalStore.task?.id as number,
        ...data
      },
      {
        onSuccess: () => {
          modalStore.setIsOpen(false);
          modalStore.setTask(null);
        }
      }
    );
  };

  const handleCancel = () => {
    modalStore.setIsOpen(false);
    modalStore.setTask(null);
  };

  return (
    <Modal
      title="Создать задачу"
      open={modalStore.isOpen}
      confirmLoading={modalStore.confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <EditTaskForm
        onSubmit={onSubmit}
        isLoading={editTaskMutation.isPending}
        task={modalStore.task as Task}
      />
    </Modal>
  );
};

export default EditTaskModal;
