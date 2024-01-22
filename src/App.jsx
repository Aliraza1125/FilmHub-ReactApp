import { useState, useEffect } from "react"
import "./App.css"
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration,getGenres } from "./store/homeslice.js";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Searchresult from "./pages/searchResult/Searchresult"

function App() {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home || {});

  console.log(url);
  useEffect(() => {
    fetchApiConfiguration();
    genresCall();
  }, [])


  const fetchApiConfiguration = () => {
    fetchDataFromApi("/configuration")
      .then((res) => {
        console.log(res);
        const url={
          backdrop:res.images.secure_base_url + "original",
          poster:res.images.secure_base_url + "original",
          profile:res.images.secure_base_url + "original",
        };
        dispatch(getApiConfiguration(url));
        console.log("dsdsds",url)
      })
  }

  const genresCall =async ()=>{
    let promises = [];
    let endpoints=["tv","movie"];
    let allgenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    console.log(data);

    data.map(({genres})=>{
      return genres.map((item)=>(allgenres[item.id]=item));
    });

    dispatch(getGenres(allgenres))

  }

  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/:mediaType/:id" element={<Details/>} />
    <Route path="/search/:query" element={<Searchresult/>} />
    <Route path="/explore/:mediaType" element={<Explore/>} />
    <Route path="*" element={<PageNotFound/>} />
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
