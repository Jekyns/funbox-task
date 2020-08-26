import React from 'react';

function ExtraInfo(props) {
  const { amount, text } = props;
  return (
    <div className="extra__string">
      {amount ?
        <span className="extra__string-amount">{amount}</span>
        : null
      }
      <span className="extra__string-text">{text}</span>
    </div>
  )
}

export default ExtraInfo;