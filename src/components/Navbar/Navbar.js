import React from 'react'
import './Navbar.scss'


function Navbar({ handleChange, handleClick }) {

    function handleSubmit(e) {
        e.preventDefault()
        handleClick()
    }

    return (
        <div className='navbar'>
            <h1>MovieZ.</h1>
            <form onSubmit={handleSubmit} className='search-cont'>
                <input onChange={handleChange} placeholder='Search'></input>
                <button onClick={handleSubmit}>Search</button>
            </form>
        </div>
    )
}

export default Navbar