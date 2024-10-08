import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputForm from "./assets/components/InputForm";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-center" />
      <main className="flex-grow flex flex-col justify-center items-center">
        <InputForm />
      </main>
    </div>
  );
}

export default App;
