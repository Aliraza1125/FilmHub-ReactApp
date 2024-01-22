import React, { useState, useEffect } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
const HeroBanner = () => {
    const [background, setbackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { data, loading } = useFetch("/movie/top_rated");
    const { url } = useSelector((state) => state.home || {});

    useEffect(() => {
        const urlbackdrop = "https://image.tmdb.org/t/p/original"
        const bg =
        urlbackdrop +  data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setbackground(bg);
        console.log("poster",url.poster);
        console.log("backfrop",url.urlbackdrop);
        console.log(bg);
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };
    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} alt="dsdsd" />
                    
                </div>
            )}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannercontent">
                    <span className="title">Welcome.</span>
                    <span className="subtitle">
                        Millions of movies , Tv Shows and people to discover. Explore Now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            className="text"
                            placeholder="Search For a Movie Or TV Show..."
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
