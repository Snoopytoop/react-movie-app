import React from 'react'

function Loading() {
  return (
    <>
       { new Array(10).fill(0).map((_, index) => (
                <div className="search__movie-card-outer">
                  <div className="search__movie-card-inner">
                    <div
                      className="search__movie-card-poster"
                      style={{ backgroundColor: "gray" }}
                    ></div>
                    <div className="search__movie-card--text">
                      <div className="sample__wrapper">
                        <div className="sample__title"></div>
                        <div className="sample__year"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
    </>
  )
}

export default Loading