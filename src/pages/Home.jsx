import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>Homepage</h1>
        <Link to="/search">
        <button>Search</button>
        </Link>
    </div>
  )
}

export default Home