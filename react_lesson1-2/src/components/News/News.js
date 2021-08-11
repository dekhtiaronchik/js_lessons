import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, setNewsList } from "../../store/news/actions";

function News() {
  const { status, list } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const loadNews = () => dispatch(fetchNews());
  const clearNewsPage = () => dispatch(setNewsList([]));

  if (status === "loading") {
    return <CircularProgress />;
  }
  return (
    <div>
      <h3>News</h3>
      <Button onClick={loadNews}>Show news</Button>
      <Button onClick={clearNewsPage}>Clear</Button>
      {status !== "error" ? (
        <ul>
          {list.map((newsItem) => (
            <li key={newsItem.id}>
              <p>{newsItem.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "red" }}>ERROR!!!</p>
      )}
    </div>
  );
}

export default News;
