import { create } from "zustand";
import { Task } from "../../../entitites/task";

interface State {
  isOpen: boolean;
  confirmLoading: boolean;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
  setConfirmLoading: (confirmLoading: boolean) => void;
}

type Store = State & Actions;

const initialState: State = {
  isOpen: false,
  confirmLoading: false
};

type CreateTaskModalStore = State & Actions;

interface EditTaskModalState extends State {
  task: Task | null;
}

interface EditTaskModalActions extends Actions {
  setTask: (task: Task) => void;
  openModal: (task: Task) => void;
}

type EditTaskModalStore = EditTaskModalState & EditTaskModalActions;

const editInitialState: EditTaskModalState = {
  ...initialState,
  task: null
};

export const useCreateTaskModalStore = create<CreateTaskModalStore>()(set => ({
  ...initialState,
  setIsOpen: isOpen => set({ isOpen }),
  setConfirmLoading: confirmLoading => set({ confirmLoading })
}));

export const useEditTaskModalStore = create<EditTaskModalStore>()(set => ({
  ...editInitialState,
  setIsOpen: isOpen => set({ isOpen }),
  setConfirmLoading: confirmLoading => set({ confirmLoading }),
  setTask: task => set({ task }),
  openModal: task => set({ isOpen: true, task })
}));
