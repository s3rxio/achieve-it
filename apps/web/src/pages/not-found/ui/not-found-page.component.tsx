import { Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div({
  position: "relative",
  padding: "1rem",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Title = styled.h1({
  fontSize: "6rem",
  fontWeight: "900",
  letterSpacing: "1.5rem",
  marginBottom: "1rem",
  marginLeft: "1.5rem" // FIXME: Сделал только потому что почему width текстового блока больше чем надо из за letterSpacing. Должно быть равно letterSpacing
});

export const NotFoundPage: FC = () => {
  return (
    <Container>
      <Title>404</Title>
      <Typography.Paragraph>
        На этой странице ничего нет.{" "}
        <Typography.Link href="/">
          <Link to="/">Назад</Link>
        </Typography.Link>
      </Typography.Paragraph>
    </Container>
  );
};

export default NotFoundPage;
