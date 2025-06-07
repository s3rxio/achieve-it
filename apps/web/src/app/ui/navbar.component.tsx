import { Layout, Menu, MenuProps, SiderProps } from "antd";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth";

type MenuItem = Required<MenuProps>["items"][number];

type NavbarProps = SiderProps;

export const Navbar: FC<NavbarProps> = props => {
  // route
  const { pathname } = useLocation();
  const user = useAuthStore(state => state.user);

  const navbarItem: MenuItem[] = [
    {
      key: "tasks",
      label: <Link to="/tasks">Задания</Link>
    },
    {
      key: "users",
      label: <Link to="/users">Пользователи</Link>,
      disabled: !user?.isAdmin
    }
  ];

  return (
    <Layout.Sider theme="light" {...props}>
      <Menu
        selectedKeys={[pathname.split("/")[1]]}
        mode="inline"
        items={navbarItem}
      />
    </Layout.Sider>
  );
};

export default Navbar;
