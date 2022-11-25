import React from "react";

const Button = (props) => {
  if (props.infoOfButton) {
    const classes = "button " + props.infoOfButton.class + " col-sm-3";
    return (
      <button id={props.infoOfButton.id} className={classes} onClick={props.onclick}>
        {props.infoOfButton.content}
      </button>
    );
  } else {
    return <button className="button col-sm-3"></button>;
  }
};

export default Button;
