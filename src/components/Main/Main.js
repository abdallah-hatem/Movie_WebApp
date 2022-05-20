import { React, useEffect, useState } from 'react'
import Card from '../Card/Card'
import './Main.scss'
import axios from 'axios'



function Main({ search }) {

    const [data, setData] = useState()
    const [popularMovies, setPopularMovies] = useState()
    const [noScroll, setNoScroll] = useState(false)

    function handleNoScroll(type) {
        if (type === "true") {
            setNoScroll(true)
        } else if (type === "false") {
            setNoScroll(false)
        }

    }


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8563f98f5d86e805ed933b39121f6d62&language=en-US&query=${search}&page=1&include_adult=false`)
            .then(data => setData(data.data.results))
            .catch(err => console.log(err))
    }, [search])

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/popular?api_key=8563f98f5d86e805ed933b39121f6d62&language=en-US&page=1")
            .then(data => setPopularMovies(data.data.results))
            .catch(err => console.log(err))
    }, [])




    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className={!noScroll ? 'main-cont' : 'main-cont fixed'}>
            {data && !data.length && <h1 style={{ textAlign: "center", marginTop: "100px", color: "red" }}>No result found!</h1>}
            {!data && popularMovies && <h1 style={{ textAlign: "center", margin: "60px 0", fontSize: "45px",padding:"10px" }}>Popular Right Now</h1>}
            <div className='card-cont'>
                {data && data.map(movie => <Card noScroll={noScroll} handleNoScroll={handleNoScroll} data={movie} />)}
                {!data && popularMovies && popularMovies.map(movie => <Card noScroll={noScroll} handleNoScroll={handleNoScroll} data={movie} />)}
                {showButton && (
                    <button onClick={scrollToTop} className="back-to-top">
                        &#8679;
                    </button>
                )}
            </div>
        </div>
    )
}

export default Main