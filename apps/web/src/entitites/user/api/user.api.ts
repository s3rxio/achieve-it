import { apiInstance } from "../../../shared/api";
import { User } from "../user.model";

export const userApi = {
  fetchUsers: () => apiInstance.get<User[]>("/users").then(res => res.data),
  delete: (id: number) => apiInstance.delete(`/users/${id}`)
};
