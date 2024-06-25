import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Navi({ toContents, children, onNavigate, width }) {
  return (
    <div className="navi-cnt" style={{ display: "flex", alignItems: "center", height: "100dvh", justifyContent: "center", gap: "3rem" }}>
      <span className="contents-btn" onClick={toContents}>
        К оглавлению
      </span>
      <div className="left-icon" style={{ marginLeft: "1rem", cursor: "pointer" }}>
        <FaChevronLeft size="3em" onClick={() => onNavigate({ direction: "prev" })} />
      </div>
      <div
        className="pdf-book navi-content"
        style={{
          width,
          height: "80dvh",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      <div className="right-icon" style={{ marginRight: "1rem", cursor: "pointer" }}>
        <FaChevronRight size="3em" onClick={() => onNavigate({ direction: "next" })} />
      </div>
    </div>
  );
}