/* Cross-module imports @Taks */
import { Task } from "../task";

export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
  tasks?: Task[];
}
