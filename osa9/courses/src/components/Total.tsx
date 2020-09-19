import React from 'react';

const Total: React.FC<{ count: number }> = (props) => {
  return(
    <div>
      <p>
        Number of exercises{" "}
        {props.count}
      </p>
    </div>
  )
}

export default Total;