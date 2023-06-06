import { styled } from "baseui";

const Header: React.FC<{ title: string }> = ({ title }) => {
  return <StyledHeader>{title}</StyledHeader>;
};

const StyledHeader = styled("header", {
  padding: "1rem",
  fontSize: "2rem",
});

export { Header };
