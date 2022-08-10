import React, { useEffect, useState } from "react";
import {
  filterCategoryThunk,
  filterHeadlineThunk,
  getNewsThunk
} from "../store/slices/news.slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Card,
  Col,
  InputGroup,
  Form,
  Button,
  ListGroup
} from "react-bootstrap";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);

  const news = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNewsThunk());

    axios
      .get("https://news-app-academlo.herokuapp.com/categories/")
      .then((res) => setCategories(res.data));
  }, []);

  console.log(categories);

  return (
    <div>
      <Row>
        <Col lg={3}>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h1>Home</h1>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
            <Button
              variant="outline-secondary"
              onClick={() => dispatch(filterHeadlineThunk(searchValue))}
            >
              Button
            </Button>
          </InputGroup>

          <Row xs={1} md={2} xl={3} className="g-4">
            {news.map((newsItem) => (
              <Col key={newsItem.id}>
                <Card onClick={() => navigate(`/news/${newsItem.id}`)}>
                  <Card.Img variant="top" src={newsItem.image} />
                  <Card.Body>
                    <Card.Title>{newsItem.headline}</Card.Title>
                    <Card.Text>{newsItem.lead}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
