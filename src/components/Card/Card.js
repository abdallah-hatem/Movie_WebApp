import { React, useState, useEffect } from 'react'
import './Card.scss'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';
import 'font-awesome/css/font-awesome.min.css';




function Card({ data, noScroll, handleNoScroll }) {


    const [details, setDetails] = useState()
    const [show, setShow] = useState(false)
    const [poster, setPoster] = useState()




    useEffect(() => {
        axios.get(`https://image.tmdb.org/t/p/w500${data.backdrop_path}`)
            .then(data => setPoster(data.config.url))
            .catch(err => console.log(err))
    }, [data])

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${data.id}?api_key=8563f98f5d86e805ed933b39121f6d62&language=en-US`)
            .then(data => setDetails(data.data))
            .catch(err => console.log(err))
    }, [data])

    // console.log(details);


    return (
        <>
            <div className='card'>
                <img
                    onClick={() => {
                        !noScroll &&
                            setShow(true)
                        handleNoScroll("true")
                    }}
                    src={poster ? poster : "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}>
                </img>
                <p id='title'>{data.title}</p>
                <div id='details'>
                    <span>Rating: </span>
                    <p id='type-2'>{data.vote_average}</p>
                </div>
            </div>

            {show &&
                <div className='movie-details'>
                    <img src={poster ? poster : "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}></img>
                    <CloseIcon
                        className='exit'
                        onClick={() => {
                            setShow(false)
                            handleNoScroll("false")
                        }}
                    />
                    <div id='details'>
                        <div id='top-details'>
                            <p id='title'>{details.title}</p>
                            <div id='rating-cont'>
                                <i class="fa-solid fa-star"><p id='rating'>{String(details.vote_average).split("").length > 1 ? details.vote_average : details.vote_average + ".0"}</p></i>
                            </div>
                        </div>
                        <p>Year: <span>{String(details.release_date).slice(0, 4)}</span></p>
                        <p>Genre: <span>{details.genres.length > 1 ? details.genres.map(genre => genre.name + ", ") : "N/A"}</span></p>
                        <p>Language: <span>{details.spoken_languages.length > 1 ? details.spoken_languages.map(lang => lang.english_name + ", ") : "N/A"}</span></p>
                        <p>Released: <span>{details.release_date}</span></p>
                        <p>Runtime: <span>{details.runtime} min</span></p>
                        <p id='synopsis'>Synopsis: <span>{details.overview}</span></p>
                    </div>
                </div>}
        </>
    )
}

export default Card