import { Typography } from "antd";
import { FC } from "react";
import { useRemoveUser, useUsers } from "../../../features/user";
import { UsersTable } from "./users-table.component";

export const UsersPage: FC = () => {
  const usersQuery = useUsers();

  const deleteUserMutation = useRemoveUser();

  const deleteUser = async (id: number) => {
    deleteUserMutation.mutate(id, {
      onSuccess: () => {
        usersQuery.refetch();
      }
    });
  };

  return (
    <div>
      <Typography.Title>Пользователи</Typography.Title>
      <UsersTable users={usersQuery.data} onDelete={deleteUser} />
    </div>
  );
};

export default UsersPage;
