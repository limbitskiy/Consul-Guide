import { forwardRef, useState, useRef } from 'react';
import pageImages from './images';
import Navi from './components/Navi';
import Page from './components/Page';
import HTMLFlipBook from 'react-pageflip';

function App() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  let page = useRef(null);
  let flipBook;

  function onNavigate({ direction }) {
    if (direction === 'next') {
      console.log(flipBook);
      flipBook.pageFlip().flipNext();
    } else if (direction === 'prev') {
      flipBook.pageFlip().flipPrev();
    }
  }

  const Page = forwardRef((props, ref) => {
    return (
      <div className="page">
        <div className="page-content">
          <div className="page-image">
            <img src={props.image} ref={ref} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Navi onNavigate={onNavigate}>
        <HTMLFlipBook
          width={501}
          height={750}
          showCover={true}
          flippingTime={500}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          ref={(r) => (flipBook = r)}
        >
          {pageImages.map((image, index) => (
            <Page number={index + 1} key={image} image={image}></Page>
          ))}
        </HTMLFlipBook>
      </Navi>
    </>
  );
}

export default App;
