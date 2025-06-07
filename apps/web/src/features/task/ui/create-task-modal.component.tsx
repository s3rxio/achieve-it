import { Modal } from "antd";
import React from "react";
import { useCreateTask } from "../hooks/use-create-task.hook";
import { useCreateTaskModalStore } from "../model/store";
import { CreateTaskFormData } from "../schemas/create-task.schema";
import { CreateTaskForm } from "./create-task-form.component";

export const CreateTaskModal: React.FC = () => {
  const createTaskMutation = useCreateTask();
  const modalStore = useCreateTaskModalStore();

  const onSubmit = (data: CreateTaskFormData) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        modalStore.setIsOpen(false);
      }
    });
  };

  const handleCancel = () => {
    modalStore.setIsOpen(false);
  };

  return (
    <Modal
      title="Создать задачу"
      open={modalStore.isOpen}
      confirmLoading={modalStore.confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <CreateTaskForm
        onSubmit={onSubmit}
        isLoading={createTaskMutation.isPending}
      />
    </Modal>
  );
};

export default CreateTaskModal;
