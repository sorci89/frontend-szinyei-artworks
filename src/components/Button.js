import React from 'react';

function Button(props) {
  const buttonText = props.text;
  const onClick = props.onClick;
  const className = props.className;
  const style = props.style;
  const loggedIn = props.loggedIn;
  return (
    <>
      <button
        className={className}
        onClick={onClick}
        style={style}
        disabled={loggedIn}
      >
        {buttonText}
      </button>
    </>
  );
}

export default Button;
