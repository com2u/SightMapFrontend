import { useState } from 'react';

interface Props {
  isPressed: string;
  setIsPressed: (isPressed: string) => void;
}

const Input = ({ isPressed, setIsPressed }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <input
      type='text'
      className='input'
      placeholder='Location, City, State, Zip, Street'
      value={searchQuery}
      onChange={(e) => {
        const value = e.target.value;
        if (!value) {
          setIsPressed(value);
        }
        setSearchQuery(value);
      }}
      onKeyDown={(e) => e.key === 'Enter' && setIsPressed(searchQuery)}
    />
  );
};

export default Input;
