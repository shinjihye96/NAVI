import React from 'react';
import * as Icons from 'assets/icons/icons_paths';

const Icon = ({ name, size, className }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) {
    console.error(`Icon not found for name: ${name}`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icon;

// example
{/* <Icon name='arrow_left' size={24} clasName='icon_example' > */}

// icon color example
// .icon_example: fill: $Gray100;