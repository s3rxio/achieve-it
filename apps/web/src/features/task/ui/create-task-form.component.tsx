import { Button } from "antd";
import dayjs from "dayjs";
import { FC } from "react";
import { useAppForm } from "../../../shared/libs/zod";
import { DatePickerField, InputField } from "../../../shared/ui";
import {
  CreateTaskFormData,
  createTaskSchema
} from "../schemas/create-task.schema";

interface CreateTaskFormProps {
  onSubmit: (data: CreateTaskFormData) => void;
  isLoading: boolean;
}

export const CreateTaskForm: FC<CreateTaskFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const { control, handleSubmit } = useAppForm(createTaskSchema);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField control={control} name="title" label="Название" />
      <InputField
        control={control}
        name="description"
        label="Описание"
        inputComponent="TextArea"
      />
      <DatePickerField
        control={control}
        name="dueDate"
        label="Срок выполнения"
        disabledDate={current => current && current < dayjs().startOf("day")}
      />
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Создать задачу
      </Button>
    </form>
  );
};
