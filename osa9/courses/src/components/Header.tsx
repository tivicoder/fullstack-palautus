import React from 'react';

const Header: React.FC<{ name: string }> = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

export default Header;