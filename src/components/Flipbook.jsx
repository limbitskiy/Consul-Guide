import { forwardRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Navi from "./Navi";
import ProgressBar from "./ProgressBar";
import logo from "../assets/logo.gif";

const Contents = ({ page, flipTo }) => {
  if (page === 5) {
    return (
      <div className="page-contents">
        <ul className="contents-list first">
          <li className="contents-item" style={{ height: "11%" }} onClick={() => flipTo(9)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(29)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(35)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(37)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(42)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(45)}></li>
          <li className="contents-item" style={{ height: "8%" }} onClick={() => flipTo(51)}></li>
          <li className="contents-item" style={{ height: "9%" }} onClick={() => flipTo(58)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(61)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(68)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(76)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(78)}></li>
        </ul>
      </div>
    );
  }

  if (page === 6) {
    return (
      <div className="page-contents">
        <ul className="contents-list">
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(79)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(86)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(88)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(91)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(95)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(98)}></li>
          <li className="contents-item" style={{ height: "5%" }} onClick={() => flipTo(100)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(103)}></li>
          <li className="contents-item" style={{ height: "9%" }} onClick={() => flipTo(105)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(107)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(109)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(114)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(128)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(132)}></li>
        </ul>
      </div>
    );
  }

  if (page === 7) {
    return (
      <div className="page-contents">
        <ul className="contents-list">
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(134)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(144)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(148)}></li>
          <li className="contents-item" style={{ height: "12%" }} onClick={() => flipTo(163)}></li>
          <li className="contents-item" style={{ height: "6%" }} onClick={() => flipTo(169)}></li>
          <li className="contents-item" style={{ height: "5%" }} onClick={() => flipTo(170)}></li>
          <li className="contents-item" style={{ height: "4%" }} onClick={() => flipTo(180)}></li>
          <li className="contents-item" style={{ height: "5%" }} onClick={() => flipTo(190)}></li>
          <li className="contents-item" style={{ height: "5%" }} onClick={() => flipTo(198)}></li>
          <li className="contents-item" style={{ height: "9%" }} onClick={() => flipTo(213)}></li>
          <li className="contents-item" style={{ height: "7%" }} onClick={() => flipTo(218)}></li>
          <li className="contents-item" style={{ height: "8%" }} onClick={() => flipTo(225)}></li>
          <li className="contents-item" style={{ height: "9%" }} onClick={() => flipTo(228)}></li>
        </ul>
      </div>
    );
  }
};

const ImgComponent = ({ src }) => {
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   const img = new Image();
  //   img.onload = () => setIsLoaded(true);
  //   img.src = src;
  // }, [src]);

  return (
    <div className="page-image" style={{ backgroundImage: `url(${src})` }}>
      {/* {!isLoaded && <p>Loading...</p>} */}
    </div>
  );
};

const Page = forwardRef((props, ref) => {
  return (
    <div className="page" data-density="soft" ref={ref}>
      <div className="page-content">
        {props.contents && props.number === 5 && <Contents page={props.number} flipTo={props.flipTo} />}
        {props.contents && props.number === 6 && <Contents page={props.number} flipTo={props.flipTo} />}
        {props.contents && props.number === 7 && <Contents page={props.number} flipTo={props.flipTo} />}
        {props.shadow && props.number % 2 === 0 ? <div className="page-shadow shadow-right"></div> : null}
        {props.shadow && props.number % 2 !== 0 ? <div className="page-shadow shadow-left"></div> : null}
        <ImgComponent src={props.src} setLoaded={props.setLoaded} />
        {/* <h2 className="page-header">Page header - {props.number}</h2> */}
        {/* <div className="page-image" style={{ backgroundImage: `url(${props.src})` }}> */}
        {/* <img src={props.src} /> */}
        {/* </div> */}
        {/* <div className="page-text">{props.children}</div> */}
        {/* <div className="page-footer">{props.number + 1}</div> */}
      </div>
    </div>
  );
});

function Loader({ isShown, loadedPages, loaderMessage }) {
  return (
    <div className={"loader" + (isShown ? "" : " hidden")}>
      <div className="progress-cnt">
        <ProgressBar progress={(loadedPages * 100) / 237} />
        <div className="message-cnt">
          <img src={logo} style={{ width: "15%" }} />
          <span>{loaderMessage}</span>
        </div>
      </div>
    </div>
  );
}

function Flipbook({ pages }) {
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(1);
  const [bookmark, setBookmark] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // watch resize
  useEffect(() => {
    setIsMobile(innerWidth < 768);

    const handleResize = () => {
      setIsMobile(innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    Promise.all(
      pages.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            resolve();
            setLoadingProgress((prev) => prev + 1);
          };
        });
      })
    ).then(() => {
      setTimeout(() => {
        setImagesLoaded(true);
        // console.log(`loaded`);
      }, 3000);
    });
  }, [pages]);

  let flipBook;

  function handleNavigate({ direction }) {
    if (direction === "next") {
      flipBook.pageFlip().flipNext();
    } else if (direction === "prev") {
      flipBook.pageFlip().flipPrev();
    }
  }

  function flipTo(pageNumber) {
    flipBook.pageFlip().flip(+pageNumber - 1);
  }

  function onFlip(e) {
    // console.log(e.data);
    setPage(e.data);
  }

  if (isMobile) {
    return (
      <div className="mobile-cnt">
        <Loader isShown={!imagesLoaded} loadedPages={loadingProgress} loaderMessage={"Идет загрузка..."} />
        <HTMLFlipBook
          width={480}
          height={720}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          maxHeight={1000}
          minHeight={450}
          maxShadowOpacity={0.5}
          flippingTime={500}
          mobileScrollSupport={true}
          className="demo-book mobile"
        >
          {pages.map((page, idx) => (
            <Page key={page} number={idx + 1} src={page} />
          ))}
          <Page number={238} />
        </HTMLFlipBook>
      </div>
    );
  }

  return (
    <>
      <Loader isShown={!imagesLoaded} loadedPages={loadingProgress} loaderMessage={"Идет загрузка..."} />
      <Navi flipTo={flipTo} handleNavigate={handleNavigate} bookmark={bookmark} setBookmark={() => setBookmark(page)}>
        <HTMLFlipBook
          width={480}
          height={720}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          maxHeight={1000}
          minHeight={450}
          maxShadowOpacity={0.5}
          flippingTime={500}
          mobileScrollSupport={false}
          className="demo-book desktop"
          useMouseEvents={false}
          onFlip={onFlip}
          ref={(el) => (flipBook = el)}
        >
          {pages.map((page, idx) => (
            <Page key={page} number={idx + 1} src={page} shadow={true} flipTo={flipTo} contents={true} />
          ))}
          <Page number={238} />
        </HTMLFlipBook>
      </Navi>
    </>
  );
}

export default Flipbook;
