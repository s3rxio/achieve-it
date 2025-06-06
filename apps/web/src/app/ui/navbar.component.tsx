import { Layout, Menu, MenuProps, SiderProps } from "antd";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const navbarItem: MenuItem[] = [
  {
    key: "tasks",
    label: <Link to="/tasks">Задания</Link>
  },
  {
    key: "profile",
    label: <Link to="/profile">Профиль</Link>
  }
];

type NavbarProps = SiderProps;

export const Navbar: FC<NavbarProps> = props => {
  // route
  const { pathname } = useLocation();

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
