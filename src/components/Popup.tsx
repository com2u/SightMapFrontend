import { LocationData } from "@/data/types";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Popup } from "react-leaflet";
import { IoIosArrowDropdown } from "react-icons/io";
import LocationAudio from "./LocationAudio";

interface Props {
  location: LocationData;
}

const MapPopup = ({ location }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let gallery: string[] = [];

  if (location.gallery) {
    const data = location.gallery;
    gallery = data
      .replaceAll("\n", "") // Remove newline escape characters
      .replaceAll('"', "") // Remove escaped double quotes
      .replaceAll(" ", "")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .trim()
      .split(",");
  }

  useEffect(() => {
    const desc = document.getElementById("desc");
    if (desc && isExpanded) {
      desc.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isExpanded]);

  function renderStarRating(stars: any, votes: any) {
    return (
      <>
        <div className="star-icon">
          <FaStar color={"gold"} size={40} />
          <div className="rating">{stars}</div>
        </div>
        <div className="votes"> ({votes})</div>
      </>
    );
  }

  return (
    <Popup minWidth={291}>
      <div className="popup-content">
        <div className="popup-image">
          <img src={location.picture || "/image/no-location.jpeg"} alt={location.name} />
          <div className="popup-details">
            <div className="popup-header">
              {location.icon && <img src={location.icon} alt="Icon" style={{ width: 30, height: 30 }} />}
              <h3 className="popup-location-name">{location.name}</h3>
            </div>
            <div className="popup-rating">{renderStarRating(location.stars, location.votes)}</div>
          </div>
        </div>
      </div>
      <div>
        <div
          style={{
            padding: "10px 10px 5px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div>
            <div>
              {location.zip} {location.city}, {location.street}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {location.webpage && (
                <div
                  onClick={() => {
                    window.open(location.webpage, "_blank");
                  }}
                  style={{ cursor: "pointer" }}>
                  <img src="image/web-icon.png" width={35} height={35} />
                </div>
              )}

              <div>
                {location.related && (
                  <div
                    onClick={() => {
                      window.open(location.related, "_blank");
                    }}
                    style={{ cursor: "pointer" }}>
                    <img src="image/library.png" width={35} height={35} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {(location.description || location.gallery) && (
              <IoIosArrowDropdown
                size={30}
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
                style={{
                  cursor: "pointer",
                  margin: "0px 8px",
                  transform: isExpanded ? "rotate(180deg)" : "none",
                }}
              />
            )}
            {location.audio && <LocationAudio audio={location.audio} />}
          </div>
        </div>
        <div style={{ padding: "0px 5px" }} hidden={!isExpanded}>
          <div
            id="desc"
            style={{
              padding: "0px 5px 10px",
              scrollBehavior: "smooth",
            }}>
            {location.description}
          </div>
          {gallery?.map((image, index) => (
            <img src={image} alt={location.name} key={index} className="img" />
          ))}
        </div>
      </div>
    </Popup>
  );
};

export default MapPopup;
