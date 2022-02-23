import React from 'react';

function Button(props) {
  const buttonText = props.text;
  const onClick = props.onClick;
  const className = props.className;
  const style = props.style;
  return (
    <div>
      <button className={className} onClick={onClick} style={style}>
        {buttonText}
      </button>
    </div>
  );
}

export default Button;
