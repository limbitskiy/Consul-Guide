import { useRef } from "react";
import { Toast } from "primereact/toast";
import Flipbook from "./components/Flipbook";
import pages from "./pages";

function App() {
  const toast = useRef(null);

  const showToast = (text) => {
    toast.current.show({ severity: "contrast", detail: text, life: 2000 });
  };

  return (
    <>
      <Flipbook pages={pages} />
      {/* makes react re-render images */}
      {/* <Toast ref={toast} position="top-center" /> */}
    </>
  );
}

export default App;
