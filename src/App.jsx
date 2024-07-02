import { useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import Flipbook from "./components/Flipbook";
import pages from "./pages";

function App() {
  // prevent ctrl + wheel zoom
  useEffect(() => {
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && (e.keyCode == "61" || e.keyCode == "107" || e.keyCode == "173" || e.keyCode == "109" || e.keyCode == "187" || e.keyCode == "189")) {
        e.preventDefault();
      }
    });
    document.addEventListener(
      "wheel",
      function (e) {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      },
      {
        passive: false,
      }
    );
  }, []);

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
