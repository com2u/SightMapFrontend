import React, { useState } from 'react';
import './Filter.css'; // Make sure to create and import your CSS file
import { Icon, iconsData } from '@/data/types';

interface FilterProps {
  selectedIcons: Icon[]; // Corrected the prop name
  setSelectedIcons: React.Dispatch<React.SetStateAction<Icon[]>>;
}

const Filter: React.FC<FilterProps> = ({
  selectedIcons,
  setSelectedIcons,
}: FilterProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSquareHover = () => {
    setIsModalVisible(true);
  };

  const handleSquareLeave = () => {
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (icon: Icon) => {
    if (selectedIcons.some((selectedIcon) => selectedIcon.name === icon.name)) {
      setSelectedIcons(
        selectedIcons.filter((selectedIcon) => selectedIcon.name !== icon.name)
      );
    } else {
      setSelectedIcons([...selectedIcons, icon]);
    }
  };

  return (
    <div className="filter-main-container">
      <div className="container">
        <div className="square-button" onMouseEnter={handleSquareHover}>
          <img src={'image/location-filter.png'} width={30} height={30} />
        </div>
        {isModalVisible && (
          <div className="modal" onMouseLeave={handleSquareLeave}>
            <form>
              {iconsData.map((icon) => (
                <div key={icon.name}>
                  <label>
                    <input
                      type="checkbox"
                      value={icon.name}
                      checked={selectedIcons.some(
                        (selectedIcon) => selectedIcon.icon === icon.icon
                      )}
                      onChange={() => handleCheckboxChange(icon)}
                    />
                    <img
                      src={icon.icon}
                      alt={icon.name}
                      width={20}
                      height={20}
                    />
                  </label>
                </div>
              ))}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
