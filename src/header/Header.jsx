import rick from '../components/rick.jpg';
import './header.css';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Header({setCharacter,setCharacterInfo,setPage_n}){

    const[filter,setFilter] = useState({});

    function search(params){
        let search_value = document.querySelector(".inp_search").value;
        setFilter(search_value);
        setPage_n(1);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`https://rickandmortyapi.com/api/character/?name=${filter}`)
            console.log(result.data);
            setCharacter(result.data.results);
            setCharacterInfo(result.data.info);
        }

    fetchData();
    },[filter]);


    return(
        <div className="container_header">
            <div className="container_navbar">
                <div className="logo">
                    <img src={rick} alt=""></img>
                </div>
                <div className="items">
                    <ul>
                        RICK Y MORTY API
                    </ul>
                </div>
                <div className="search">
                    <input className="inp_search"type="text" placeholder="Search">
                    </input>
                    <button className="filter" onClick={() => search()}>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;