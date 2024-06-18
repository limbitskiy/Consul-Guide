import { useCallback, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import file from './assets/book.pdf';
import Navi from './components/Navi';

// import './Sample.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

export default function App() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(5);
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState(500);

  // const onResize = useCallback<ResizeObserverCallback>((entries) => {
  //   const [entry] = entries;

  //   if (entry) {
  //     setContainerWidth(entry.contentRect.width);
  //   }
  // }, []);

  // useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function onNavigate({ direction }) {
    if (direction === 'next') {
      setPageNumber((val) => {
        return val + 1;
      });
    } else if (direction === 'prev') {
      setPageNumber((val) => {
        return val - 1;
      });
    }
  }

  function onItemClick({ pageNumber }) {
    // console.log(page);
    setPageNumber(pageNumber);
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <Navi onNavigate={onNavigate}>
          <div className="Example__container__document" ref={setContainerRef}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              options={options}
              renderMode="canvas"
              onItemClick={onItemClick}
            >
              <Page
                pageNumber={pageNumber}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
              {/* {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))} */}
            </Document>
          </div>
        </Navi>
      </div>
    </div>
  );
}
