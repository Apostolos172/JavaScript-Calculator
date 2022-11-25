const Display = (props) => {
  return (
    <div id="display" className="monitor">
      <div className="row">
        <span className="history"></span>
      </div>
      <div className="row">
        <span className="current-value">{props.display}</span>
      </div>
    </div>
  );
};

export default Display;
