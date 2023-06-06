import { styled } from "baseui";
import { Header } from ".";
import { Content } from ".";
import { ReactNode } from "react";

const DefaultLayout: React.FC<{ children: ReactNode; headerTitle: string }> = ({
  children,
  headerTitle,
}) => {
  return (
    <Container>
      <Header title={headerTitle} />
      <div>
        <Content>{children}</Content>
      </div>
    </Container>
  );
};

const Container = styled("div", {
  padding: "1rem",
});

export { DefaultLayout };
