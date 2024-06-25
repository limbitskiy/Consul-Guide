import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { VariableSizeList as List } from "react-window";
import { asyncMap } from "@wojtekmaj/async-array-utils";
import { useWindowWidth, useWindowHeight } from "@wojtekmaj/react-hooks";

// import "./styles.css";

import pdfFile from "./assets/book.pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

function Row({ index, style }) {
  function onPageRenderSuccess(page) {
    console.log(`Page ${page.pageNumber} rendered`);
  }

  return (
    <div style={style}>
      <Page onRenderSuccess={onPageRenderSuccess} pageIndex={index} renderTextLayer={false} renderAnnotationLayer={false} />
    </div>
  );
}

export default function App() {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const [pdf, setPdf] = useState(null);
  const [pageViewports, setPageViewports] = useState(null);

  /**
   * React-Window cannot get item size using async getter, therefore we need to
   * calculate them ahead of time.
   */
  useEffect(() => {
    setPageViewports(null);

    if (!pdf) {
      return;
    }

    (async () => {
      const pageNumbers = Array.from(new Array(pdf.numPages)).map((_, index) => index + 1);

      const nextPageViewports = await asyncMap(pageNumbers, (pageNumber) => pdf.getPage(pageNumber).then((page) => page.getViewport({ scale: 1 })));

      setPageViewports(nextPageViewports);
    })();
  }, [pdf]);

  function onDocumentLoadSuccess(nextPdf) {
    setPdf(nextPdf);
  }

  function getPageHeight(pageIndex) {
    if (!pageViewports) {
      throw new Error("getPageHeight() called too early");
    }

    const pageViewport = pageViewports[pageIndex];

    return pageViewport.height;
  }

  return (
    <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
      {pdf && pageViewports ? (
        <List width={windowWidth} height={windowHeight} estimatedItemSize={getPageHeight(0)} itemCount={pdf.numPages} itemSize={getPageHeight}>
          {Row}
        </List>
      ) : null}
    </Document>
  );
}
