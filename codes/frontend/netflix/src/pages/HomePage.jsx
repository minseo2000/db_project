import React from "react";
import "./home-page.css";
import Header from "../components/Header";
import MovieList from "../components/MovieList"; 

const items = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"];

function HomePage() {
    return (
        <div id="home-page">
            <Header />
            <div id="home-page-content">
                <img src="/test.jpeg" alt="" />
            </div>
            <main>
                <MovieList items={items} /> 
                <MovieList items={items} rankDisplayScope={0} /> 
                <MovieList items={items} rankDisplayScope={9}/> 
            </main>
        </div>
    );
}

export default HomePage;
