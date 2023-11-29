import React from "react";
import "./movie-item.css";

function MovieItem({ index, item, isRankDisplay }) {
    return (
        <article className="movie-item" key={index}>
            <img src="#" alt="" />
            {(isRankDisplay === false) || <div className="ranking">
                <span className="rank">{index + 1}</span>
            </div>}
        </article>
    )
}

export default MovieItem;