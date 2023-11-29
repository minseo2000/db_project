import React from "react";
import "./movie-list.css";
import MovieItem from "./MovieItem.jsx";

function MovieList({ items, rankDisplayScope }) {
    return (
        <section className="movie-list">
            {items.map((item, index) => (
                <MovieItem
                    index={index}
                    item={item}
                    isRankDisplay={(index < rankDisplayScope) || (rankDisplayScope === undefined)}
                />
            ))}
        </section>
    );
}

export default MovieList;
