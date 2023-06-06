import { Header } from ".";
import { Content } from ".";
import { ReactNode } from "react";

const DefaultLayout: React.FC<{ children: ReactNode; headerTitle: string }> = ({
  children,
  headerTitle,
}) => {
  return (
    <>
      <Header title={headerTitle} />
      <div>
        <Content>{children}</Content>
      </div>
    </>
  );
};

export { DefaultLayout };
