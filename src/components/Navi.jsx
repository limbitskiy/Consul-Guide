import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Navi({ children, onNavigate }) {
  return (
    <div className="navi-cnt" style={{ display: 'flex', alignItems: 'center' }}>
      <div
        className="left-icon"
        style={{ marginLeft: '1rem', cursor: 'pointer' }}
      >
        <FaChevronLeft
          size="3em"
          onClick={() => onNavigate({ direction: 'prev' })}
        />
      </div>
      <div
        id="pdf-book"
        className="navi-content"
        style={{
          flex: 1,
          height: '80dvh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
      <div
        className="right-icon"
        style={{ marginRight: '1rem', cursor: 'pointer' }}
      >
        <FaChevronRight
          size="3em"
          onClick={() => onNavigate({ direction: 'next' })}
        />
      </div>
    </div>
  );
}
