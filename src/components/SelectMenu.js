import React, { useState } from 'react';
import Button from './Button';
import './SelectMenu.scss';

function SelectMenu() {
  console.log();
  const colors = [
    {
      id: 1,
      colorName: 'Green',
      colorValue: '#abdd98',
    },
    {
      id: 2,
      colorName: 'Blue',
      colorValue: '#a7cfe6',
    },
    {
      id: 3,
      colorName: 'Red',
      colorValue: '#92264d',
    },
  ];

  const [color, setColor] = useState('rgb(236, 197, 42)');
  const [isSelected, setIsSelected] = useState(false);

  const select = () => {
    setIsSelected(!isSelected);
    console.log('click');
  };

  return (
    <div className='menu_container'>
      <Button
        onClick={select}
        style={{ backgroundColor: color }}
        className='menu'
        text='Change'
      />

      {isSelected &&
        colors.map((color) => (
          <div key={color.id}>
            <Button
              className='option'
              style={{ backgroundColor: color.colorValue }}
              onClick={() => {
                console.log(color.colorName);
                setColor(color.colorValue);
                setTimeout(() => setIsSelected(false), 1000);
              }}
              text={color.colorName}
            />
          </div>
        ))}
    </div>
  );
}

export default SelectMenu;
