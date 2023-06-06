import { DefaultLayout } from "./components/Layouts";
import AppRouter from "./router";
import "./App.css";

function App() {
  return (
    <>
      <DefaultLayout headerTitle="Todo App">
        <AppRouter />
      </DefaultLayout>
    </>
  );
}

export default App;
