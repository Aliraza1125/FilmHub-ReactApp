import React, { useState, useEffect } from "react";

import "./style.scss";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/moviecard/MovieCard";


const Searchresult = () => {
  const [data, setdata] = useState(null);
  const [pageNum, setpageNum] = useState(1);
  const [loading, setloading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setloading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setdata(res);
        setpageNum((prev) => prev + 1);
        setloading(false);
      }
    );
  };
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setdata({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setdata(res);
        }
        setpageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setpageNum(1)
    fetchInitialData();
  }, [query]);

  return (
    <>
      <div className="searchResultsPage">
        {loading && <Spinner initial={true} />}
        {!loading && (
          <ContentWrapper>
            {data?.results?.length > 0 ? (
              <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1 ? "Results":"Result"} of '${query}' `}
              </div>
              <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner/>}
              >
                {data?.results.map((item,index)=>{
                  if(item.media_type==="person")
                  {
                    return;
                  }
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
              </>
            ): (
              <span className="resultNotFound">
                Sorry, Results Not Found
              </span>
            )};
          </ContentWrapper>
        )}
        </div>;
    </>
  );
};

export default Searchresult;
