import { Button } from "antd";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { TaskStatus } from "../../../entitites/task";
import { useAppForm } from "../../../shared/libs/zod";
import { DatePickerField, InputField, SelectField } from "../../../shared/ui";
import { EditTaskFormData, editTaskSchema } from "../schemas/edit-task.schema";

interface EditTaskFormProps {
  onSubmit: (data: EditTaskFormData) => void;
  isLoading: boolean;
  task: EditTaskFormData;
}

export const EditTaskForm: FC<EditTaskFormProps> = ({
  onSubmit,
  isLoading,
  task
}) => {
  const { control, handleSubmit, reset } = useAppForm(editTaskSchema, {
    mode: "onChange",
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status
    }
  });

  const onSubmitForm = (data: EditTaskFormData) => {
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    reset({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status
    });
  }, [task, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <InputField control={control} name="title" label="Название" />
      <InputField
        control={control}
        name="description"
        label="Описание"
        inputComponent="TextArea"
      />
      <SelectField
        control={control}
        name="status"
        label="Статус"
        options={Object.values(TaskStatus).map(status => ({
          value: status,
          label: status
        }))}
      />
      <DatePickerField
        control={control}
        name="dueDate"
        label="Срок выполнения"
        disabledDate={current => current && current < dayjs().startOf("day")}
      />
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Изменить задачу
      </Button>
    </form>
  );
};
