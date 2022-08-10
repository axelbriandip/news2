import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const newsSlice = createSlice({
  name: "news",
  initialState: [],
  reducers: {
    setNews: (state, action) => {
      const news = action.payload;
      return news;
    }
  }
});

export const getNewsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://news-app-academlo.herokuapp.com/news/")
    .then((res) => dispatch(setNews(res.data))) // setNews(res.data)
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterHeadlineThunk = (searchValue) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://news-app-academlo.herokuapp.com/news/?headline__icontains=${searchValue}`
    )
    .then((res) => dispatch(setNews(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategoryThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(`https://news-app-academlo.herokuapp.com/news/?category=${id}`)
    .then((res) => dispatch(setNews(res.data)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;
