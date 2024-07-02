import { forwardRef, useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Navi from "./Navi";
import ProgressBar from "./ProgressBar";
import logo from "../assets/logo.gif";
import { LuLoader2 } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";

const Contents = ({ page, flipTo }) => {
  if (page === 4) {
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

  if (page === 5) {
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

  if (page === 6) {
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    // console.log(`${src} loading....`);
    img.onload = () => {
      setIsLoaded(true);
      // console.log(`${src} loaded!!`);
    };
    img.src = src;
  }, [src]);

  if (!isLoaded) {
    return (
      <div className="loader-backdrop">
        <LuLoader2 className="loader" size={28} />
      </div>
    );
  }

  return <div className="page-image" style={{ backgroundImage: `url(${src})` }}></div>;
};

const Page = forwardRef((props, ref) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const touchScreenRef = useRef(null);

  const minSwipeDistance = 80;

  const isZoomed = () => {
    return window.innerWidth !== window.visualViewport.width;
  };

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = (e) => {
    if (!touchStart || !touchEnd || e.touches.length > 1) {
      touchScreenRef.current.style.pointerEvents = "none";
      setTimeout(() => {
        touchScreenRef.current.style.pointerEvents = "auto";
      }, 500);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if ((isLeftSwipe || isRightSwipe) && !isZoomed()) {
      props.handleNavigate({ direction: isLeftSwipe ? "next" : "prev" });
      // console.log("swipe", isLeftSwipe ? "left" : "right");
    }
  };

  return (
    <>
      <div className="page" data-density="soft" idx={props.idx} ref={ref}>
        <div className="page-content">
          {props.number === 4 && <Contents page={props.number} flipTo={props.flipTo} />}
          {props.number === 5 && <Contents page={props.number} flipTo={props.flipTo} />}
          {props.number === 6 && <Contents page={props.number} flipTo={props.flipTo} />}
          {props.shadow && props.number % 2 === 0 ? <div className="page-shadow shadow-left"></div> : null}
          {props.shadow && props.number % 2 !== 0 ? <div className="page-shadow shadow-right"></div> : null}
          {props.customTouchActions && <div className="touch-screen" ref={touchScreenRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}></div>}
          {Math.abs(props.idx - props.pageIdx) < 5 && <ImgComponent src={props.src} />}
        </div>
      </div>
    </>
  );
});

function Loader({ isShown, loadedPages, loaderMessage }) {
  return (
    <div className={"app-loader" + (isShown ? "" : " hidden")}>
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
  const [pageIdx, setPageIdx] = useState(0);
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

  // preload future pages
  useEffect(() => {
    if (pages[pageIdx + 1]) {
      const img = new Image();
      img.src = pages[pageIdx + 1];
    }

    if (pages[pageIdx + 2]) {
      const img = new Image();
      img.src = pages[pageIdx + 2];
    }

    if (pages[pageIdx - 1]) {
      const img = new Image();
      img.src = pages[pageIdx - 1];
    }

    if (pages[pageIdx - 2]) {
      const img = new Image();
      img.src = pages[pageIdx - 2];
    }
  }, [pageIdx]);

  useEffect(() => {
    Promise.all(
      Array(4)
        .fill(1)
        .map((_, idx) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = pages[idx];
            img.onload = () => {
              resolve();
              setLoadingProgress((prev) => prev + 30);
            };
          });
        })
    ).then(() => {
      setTimeout(() => {
        setImagesLoaded(true);
        // console.log(`loaded`);
      }, 3000);
    });
  }, []);

  let flipBook;

  function handleNavigate({ direction }) {
    if (direction === "next") {
      flipBook.pageFlip().flipNext();
    } else if (direction === "prev") {
      flipBook.pageFlip().flipPrev();
    }
  }

  function flipTo(pageNumber) {
    // console.log(`going to ${pageNumber - 1}`);
    flipBook.pageFlip().flip(+pageNumber - 1);
  }

  function onFlip(e) {
    // console.log(e.data);
    // setPage(e.data);
    setPageIdx(e.data);
  }

  if (isMobile) {
    return (
      <div className="mobile-cnt">
        {/* <span>{pageIdx}</span> */}
        <Loader isShown={!imagesLoaded} loadedPages={loadingProgress} loaderMessage={"Идет загрузка..."} />
        <span className="contents-btn mobile" onClick={() => flipTo(5)}>
          <CiViewList size={28} />
        </span>
        <HTMLFlipBook
          width={480}
          height={720}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          maxHeight={1000}
          minHeight={450}
          onFlip={onFlip}
          maxShadowOpacity={0.5}
          flippingTime={500}
          useMouseEvents={false}
          className="demo-book mobile"
          ref={(el) => (flipBook = el)}
        >
          {pages.map((_, idx) => {
            return <Page key={idx} idx={idx} pageIdx={pageIdx} number={idx} src={pages[idx]} customTouchActions={true} handleNavigate={handleNavigate} flipTo={flipTo} />;
          })}
        </HTMLFlipBook>
      </div>
    );
  }

  return (
    <>
      <Loader isShown={!imagesLoaded} loadedPages={loadingProgress} loaderMessage={"Идет загрузка..."} />
      <Navi flipTo={flipTo} handleNavigate={handleNavigate} bookmark={bookmark} setBookmark={() => setBookmark(pageIdx)}>
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
          {pages.map((_, idx) => {
            return <Page key={idx} idx={idx} pageIdx={pageIdx} number={idx} src={pages[idx]} shadow={true} flipTo={flipTo} />;
          })}
          <Page number={238} />
        </HTMLFlipBook>
      </Navi>
    </>
  );
}

export default Flipbook;
