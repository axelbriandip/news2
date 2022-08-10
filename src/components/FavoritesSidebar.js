import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFavoritesThunk } from "../store/slices/favorites.slice";

const FavoritesSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFavoritesThunk());
  }, []);

  return (
    <Offcanvas placement="end" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Favorites</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {favorites.map((favorite) => (
            <li onClick={() => navigate(`/news/${favorite.news.id}`)}>
              {favorite.news.headline}
              <img src={favorite.news.image} className="img-fluid" alt="" />
            </li>
          ))}
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default FavoritesSidebar;
