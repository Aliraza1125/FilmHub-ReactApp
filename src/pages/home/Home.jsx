import React from 'react';
import  "./style.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Polular';
import TopRated from './toprated/TopRated';
const Home = () => {
  return (
    <div className="homePage">
       <HeroBanner/>
       <Trending/>
       <Popular/>
       <TopRated/>
      
    </div>
  )
}

export default Home
