import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
  new Date(evtA.date) - new Date(evtB.date)
);

useEffect(() => {
  const intervalId = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  }, 5000);

  return () => clearInterval(intervalId); 
}, [byDateDesc.length]);

const handlePaginationClick = (clickedIndex) => {
  setIndex(clickedIndex);
};

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => {

        const key=`${event.title}-${idx}`
 
        return(

          <React.Fragment key={key}>
          <div
            key= {key}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radio-${radioIdx + 0}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} 
                  onClick={() => handlePaginationClick(radioIdx)}
                  readOnly
                />
              ))}
            </div>
          </div>    
          </React.Fragment>
      )})};
    </div>
  );
};

export default Slider;
