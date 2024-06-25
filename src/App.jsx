import { forwardRef, useState, useMemo, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
import HTMLFlipBook from "react-pageflip";
import Navi from "./components/Navi";
import { pdfjs, Document, Outline, Page as ReactPdfPage } from "react-pdf";
import { ImSpinner10 } from "react-icons/im";

import pdfFile from "/book.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const height = 900;
const width = 500;

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

let flipBook;

const Page = forwardRef(({ pageNumber, onLoadSuccess }, ref) => {
  // function onLoadSuccess() {
  //   loadedPages += 1;
  //   console.log(`page loaded`);
  // }

  return (
    <div ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} width={width} scale={1} renderTextLayer={false} renderAnnotationLayer={true} onLoadSuccess={onLoadSuccess} />
    </div>
  );
});

function App() {
  const [numPages, setNumPages] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [lazyPages, setLazyPages] = useState([1, 1, 1]);
  const [isLoaded, setIsLoaded] = useState(false);

  let loadedPages = 0;

  // useEffect(() => {}, [loadedPages]);

  // useEffect(() => {
  //   setLazyPages((prev) => [...prev, 1]);
  // }, [currentPage]);

  function onNavigate({ direction }) {
    if (direction === "next") {
      // setCurrentPage((prev) => (prev += 2));
      flipBook.pageFlip().flipNext();
    } else if (direction === "prev") {
      flipBook.pageFlip().flipPrev();
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    console.log(`document loaded`);
    setNumPages(nextNumPages);
  }

  function onSourceSuccess() {
    console.log(`document source success`);
  }

  function toContents() {
    flipBook.pageFlip().flip(3);
  }

  function onFlipbookInit() {
    console.log(`flipbook init`);
  }

  function onItemClick(item) {
    console.log(item);
    flipBook.pageFlip().flip(item.pageNumber - 1);
  }

  function onPageLoadSuccess() {
    loadedPages += 1;
    console.log(`page loaded`);

    if (loadedPages === 237) {
      console.log(`FULLY loaded`);
      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    }
  }

  function Loader() {
    return (
      <div
        className="wrap"
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
      >
        <ImSpinner10 className="spinner" style={{ fontSize: "40px" }} />
        <span>Загрузка файла PDF</span>
      </div>
    );
  }

  return (
    <Navi width={width * 2} toContents={toContents} onNavigate={onNavigate} controlsVisible={isLoaded}>
      {/* <span>Current page: {currentPage}</span>
      <br />
      <span>
        Pages loaded: {lazyPages.length} ({lazyPages})
      </span> */}

      {!isLoaded && <Loader />}

      <div className={"flipbook-cnt" + (isLoaded ? "" : " hidden")} style={{ overflow: "hidden" }}>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} onSourceSuccess={onSourceSuccess} onItemClick={onItemClick}>
          {/* <Outline /> */}
          <HTMLFlipBook width={width} height={height} flippingTime={500} showCover={true} useMouseEvents={false} ref={(f) => (flipBook = f)} onInit={onFlipbookInit}>
            {Array(numPages)
              .fill(1)
              .map((_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} onLoadSuccess={onPageLoadSuccess} />
              ))}
          </HTMLFlipBook>
        </Document>
      </div>
    </Navi>
  );
}

export default App;
