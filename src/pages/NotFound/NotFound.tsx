import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>Ooops</div>
      <div>Something went wrong</div>
      <div>Error 404 Page Not Found </div>
      <Button onClick={() => navigate("/")}>Redirect to main page</Button>
    </div>
  );
};

export { NotFound };
