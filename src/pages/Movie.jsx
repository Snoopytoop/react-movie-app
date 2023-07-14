import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Movie() {

    const { movie } = useParams()

    const [film, setFilm] = useState([])

    async function fetchMovies() {
        const {data} = await axios.get(`https://www.omdbapi.com/?apikey=da79f3d4&i=${movie}&plot=full`)
        console.log(data)
        setFilm(data)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

  return (
    <div>
        <h1>{film.Title}</h1>
        <p>{film.Plot}</p>
    </div>
  )
}

export default Movie