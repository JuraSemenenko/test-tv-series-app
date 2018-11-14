import React from "react";

const SeriesCard = ({ data, onClickModal }) => {
  return (
    <div className="series-item-container">
      <div className="series-medium-image-container">
        <img
          className="series-medium-image"
          src={
            data.show.image
              ? data.show.image.medium
              : "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20170219125728"
          }
          alt={data.show.name}
          onClick={() =>
            onClickModal(
              data.show.image
                ? data.show.image.original
                : "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/latest?cb=20170219125728"
            )
          }
        />
      </div>
      <div className="series-description-container">
        <div className="series-description-header-container">
          <h3 className="series-header-title">{data.show.name}</h3>
          <p className="series-header-premier">
            {`${data.show.premiered.split("-")[0]}${
              data.show.status === "Running" ? " - ..." : ""
            }`}
          </p>
        </div>
        <div className="series-info-container">
          <p>Season: {data.season}</p>
          <p>Episod: {data.number}</p>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
