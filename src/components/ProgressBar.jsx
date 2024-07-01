const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar" style={{ borderRadius: "4px", overflow: "hidden" }}>
      <div className="value" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
