import React from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/UseFetch";
import DetailsBanner from "./detailsbanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosection/VideoSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";


const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

  const { data: credits, loading: creditsloading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsloading} />
      <VideosSection data={data} loading={loading} />
      <Similar  mediaType={mediaType}  id={id}/>
      <Recommendation  mediaType={mediaType}  id={id}/>
    </div>
  );
};

export default Details;
