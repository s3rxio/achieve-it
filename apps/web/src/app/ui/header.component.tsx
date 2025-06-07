import { LoginOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps, Space, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "../../features/auth";

export type HeaderProps = React.DOMAttributes<HTMLDivElement>;

export const StyledHeader = styled(Layout.Header)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  gap: "4rem"
});

export const Header: FC<HeaderProps> = props => {
  const { user, clear } = useAuthStore();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Выйти",
      icon: <LogoutOutlined />,
      onClick: () => clear(),
      danger: true
    }
  ];

  return (
    <StyledHeader {...props}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Achieve It
      </Typography.Title>

      {/* TODO: вынести в компонент */}
      {user ? (
        <Dropdown placement="bottomRight" menu={{ items: userMenuItems }}>
          <Button type="text">
            <Space>
              <UserOutlined />
              {user.username}
            </Space>
          </Button>
        </Dropdown>
      ) : (
        <Space>
          <Link to="/login">
            <Button type="primary" icon={<LoginOutlined />}>
              Войти
            </Button>
          </Link>
          <Link to="/register">
            <Button>Регистрация</Button>
          </Link>
        </Space>
      )}
    </StyledHeader>
  );
};

export default Header;
