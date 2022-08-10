import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesThunk } from "../store/slices/favorites.slice";

const Favorites = () => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getFavoritesThunk());
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((favorite) => (
          <li>
            {favorite.news.headline}
            <img src={favorite.news.image} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
