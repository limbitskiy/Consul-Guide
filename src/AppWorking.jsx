import { forwardRef, useState, useMemo, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
import HTMLFlipBook from "react-pageflip";
import Navi from "./components/Navi";
import { pdfjs, Document, Outline, Page as ReactPdfPage } from "react-pdf";
import ProgressBar from "./components/ProgressBar";

import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

import pdfFile from "/book.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };

const Page = forwardRef(({ pageNumber, onLoadSuccess, width }, ref) => {
  return (
    <div className="page-content" ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} width={width} renderTextLayer={false} renderAnnotationLayer={true} onLoadSuccess={onLoadSuccess} />
    </div>
  );
});

function Loader({ loadedPages, loaderMessage }) {
  return (
    <div
      className="wrap"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "max(15%, 155px)",
      }}
    >
      <ProgressBar progress={(loadedPages * 100) / 237} />
      <span>{loaderMessage}</span>
    </div>
  );
}

function App() {
  const [numPages, setNumPages] = useState();
  // const [currentPage, setCurrentPage] = useState(0);
  // const [lazyPages, setLazyPages] = useState([1, 1, 1]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedPages, setLoadedPages] = useState(0);
  const [loaderMessage, setLoaderMessage] = useState("Загрузка файла PDF");
  const [dimensions, setDimensions] = useState({
    width: innerWidth / 3,
    height: innerWidth * 1.5,
  });

  let isMobile = innerWidth < 768;

  // watch pages loaded
  useEffect(() => {
    if (loadedPages === 5) {
      setLoaderMessage("Данные загружены");
      setTimeout(() => {}, 3000);
      setIsLoaded(true);
    }
  }, [loadedPages]);

  // watch resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: innerWidth / 3,
        height: innerWidth * 1.5,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let flipBook;

  // useEffect(() => {
  //   setLazyPages((prev) => [...prev, 1]);
  // }, [currentPage]);

  function handleNavigate({ direction }) {
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
    setLoadedPages((prev) => (prev += 1));
    console.log(`page loaded`);
  }

  if (isMobile) {
    return (
      <div className="mobile-cnt">
        <Document file={pdfFile} className="mobile-document" onLoadSuccess={onDocumentLoadSuccess} onSourceSuccess={onSourceSuccess} onItemClick={onItemClick}>
          {/* <Outline /> */}
          <HTMLFlipBook
            width={innerWidth}
            height={innerHeight}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            flippingTime={500}
            ref={(f) => (flipBook = f)}
            onInit={onFlipbookInit}
          >
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Page key={`page_${index + 1}`} width={innerWidth} pageNumber={index + 1} onLoadSuccess={onPageLoadSuccess} />
              ))}
          </HTMLFlipBook>
        </Document>
      </div>
    );
  }

  return (
    <Navi width={dimensions.width * 2} toContents={toContents} handleNavigate={handleNavigate} controlsVisible={isLoaded}>
      {/* <span>Current page: {currentPage}</span>
      <br />
      <span>
        Pages loaded: {lazyPages.length} ({lazyPages})
      </span> */}

      {!isLoaded && <Loader loadedPages={loadedPages} loaderMessage={loaderMessage} />}

      <div className={"flipbook-cnt" + (isLoaded ? "" : " hidden")} style={{ overflow: "hidden" }}>
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} onSourceSuccess={onSourceSuccess} onItemClick={onItemClick}>
          {/* <Outline /> */}
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            size={"stretch"}
            flippingTime={500}
            showCover={true}
            useMouseEvents={false}
            ref={(f) => (flipBook = f)}
            onInit={onFlipbookInit}
          >
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Page key={`page_${index + 1}`} width={dimensions.width} pageNumber={index + 1} onLoadSuccess={onPageLoadSuccess} />
              ))}
          </HTMLFlipBook>
        </Document>
      </div>
    </Navi>
  );
}

export default App;
