import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getNewsThunk } from "../store/slices/news.slice";

const NewsDetail = () => {
  const allNews = useSelector((state) => state.news);
  const [newsDetail, setNewsDetail] = useState({});
  const [suggestedNews, setSuggestedNews] = useState([]);
  const [rate, setRate] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNewsThunk());
  }, []);

  useEffect(() => {
    const newsFind = allNews.find((newsItem) => newsItem.id === Number(id));
    setNewsDetail(newsFind);

    const filteredNews = allNews.filter(
      (newsItem) => newsItem.category.id === newsFind.category.id
    );
    setSuggestedNews(filteredNews);
  }, [allNews, id]);

  const addFavorite = () => {
    alert("Añadido a favoritos");
    const favorite = {
      news: newsDetail.id,
      rate
    };
    console.log(favorite);
  };

  return (
    <div>
      <h1>{newsDetail?.headline}</h1>

      <div>
        <h5>Add news to favorites</h5>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Rate"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <Button
            onClick={addFavorite}
            variant="outline-secondary"
            id="button-addon2"
          >
            Add
          </Button>
        </InputGroup>
      </div>

      <img src={newsDetail?.image} alt="" />
      <ul>
        {suggestedNews.map((news) => (
          <li onClick={() => navigate(`/news/${news.id}`)}>{news.headline}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewsDetail;
