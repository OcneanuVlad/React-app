function Favorites({ data, onLocationChange, currentLocation }) {
  function onFavoriteClick(event): any {
    onLocationChange(data[parseInt(event.target.getAttribute('data-index'))]);
  }

  return (
    <div className="favorites">
      {data[0] && (
        <button className={currentLocation.city == data[0].city ? "favorite favoriteSelected" : "favorite"} data-index={0} onClick={onFavoriteClick}>
          {data[0].city}, {data[0].country}
        </button>
      )}
      {data[1] && (
        <button className={currentLocation.city == data[1].city ? "favorite favoriteSelected" : "favorite"} data-index={1} onClick={onFavoriteClick}>
          {data[1].city}, {data[1].country}
        </button>
      )}
      {data[2] && (
        <button className={currentLocation.city == data[2].city ? "favorite favoriteSelected" : "favorite"} data-index={2} onClick={onFavoriteClick}>
          {data[2].city}, {data[2].country}
        </button>
      )}
    </div>
  );
}

export default Favorites;
