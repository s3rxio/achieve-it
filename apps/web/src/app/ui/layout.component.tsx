import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./header.component";
import Navbar from "./navbar.component";

const LaoyutContent = styled(Layout.Content)({
  padding: "1rem",
  border: "1px solid #d9d9d9",
  borderBottom: "none",
  borderRight: "none",
  borderTopLeftRadius: "2rem",
  backgroundColor: "#f5f5f5",
  overflowX: "hidden"
});

const AppLayout = styled(Layout)({
  maxHeight: "100vh",
  height: "100vh",
  overflow: "hidden"
});

export const MainLayout = () => {
  return (
    <AppLayout>
      <Header />

      <Layout>
        <Navbar />
        <LaoyutContent>
          <Outlet />
        </LaoyutContent>
      </Layout>
    </AppLayout>
  );
};
