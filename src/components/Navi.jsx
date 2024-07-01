import { FaChevronLeft, FaChevronRight, FaBookmark } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

export default function Navi({ flipTo, children, handleNavigate, bookmark, setBookmark }) {
  const handleBookmark = () => {
    if (bookmark) {
      flipTo(bookmark + 1);
      // show("Перемещение к закладке");
    } else {
      setBookmark();
      // show("Закладка добавлена");
    }
  };

  return (
    <div className="navi-cnt" style={{ display: "flex", alignItems: "center", width: "100%", height: "100dvh", justifyContent: "center", gap: "3rem" }}>
      <div className="navi-toolbar">
        <span className="contents-btn" onClick={() => flipTo(5)}>
          <CiViewList size={28} />
        </span>
        <span className="contents-btn">{bookmark ? <FaBookmark size={22} onClick={handleBookmark} /> : <CiBookmark size={26} onClick={handleBookmark} />}</span>
      </div>
      <div className="navi-icon left-icon" style={{ marginLeft: "1rem", cursor: "pointer" }}>
        <FaChevronLeft size="3em" onClick={() => handleNavigate({ direction: "prev" })} />
      </div>
      <div
        className="pdf-book navi-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
      <div className="navi-icon right-icon" style={{ marginRight: "1rem", cursor: "pointer" }}>
        <FaChevronRight size="3em" onClick={() => handleNavigate({ direction: "next" })} />
      </div>
    </div>
  );
}
