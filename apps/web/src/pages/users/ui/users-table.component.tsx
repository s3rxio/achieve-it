import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import dayjs from "dayjs";
import { User } from "../../../entitites/user";

interface UsersTableProps {
  users: User[];
  onDelete: (id: number) => void;
  currentUserId?: number;
}

export const UsersTable = ({
  users,
  onDelete,
  currentUserId
}: UsersTableProps) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80
    },
    {
      title: "Логин",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Админ",
      dataIndex: "isAdmin",
      key: "isAdmin"
    },
    {
      title: "Дата регистрации",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD.MM.YYYY")
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: User) => {
        return (
          <Space>
            <Popconfirm
              title="Удалить пользователя?"
              onConfirm={() => onDelete(record.id)}
              disabled={record.id === currentUserId}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                disabled={record.id === currentUserId}
              />
            </Popconfirm>
          </Space>
        );
      }
    }
  ];

  return <Table columns={columns} dataSource={users} rowKey="id" bordered />;
};
