/* Cross-module imports @User */
// import { User } from "../user";

export enum TaskStatus {
    Created = 'Created',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Archived = 'Archived',
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date | null;
    // user: User; @x
    createdAt: Date;
    updatedAt: Date;
}

export interface TaskFormData {
    title: string;
    description: string;
    status?: TaskStatus; // Опционально, если есть дефолтное значение
    dueDate?: Date | null;
}