import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './header/Header';
import React from 'react';



function App() {

  const[path,setPath] = useState(`https://rickandmortyapi.com/api/character/?page=1`);
  const[character,setCharacter] = useState(null);
  const[page_n,setPage_n] = useState(1);
  const[characterInfo,setCharacterInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(path);
      setCharacter(result.data.results);
      setCharacterInfo(result.data.info);
      console.log(characterInfo);
    }
  fetchData();
  },[path]);

  function update_next(){
    setPage_n(page_n + 1);
    console.log(characterInfo);
    setPath(characterInfo.next);
  }
  function update_prev(){
    setPage_n(page_n - 1);
    setPath(characterInfo.prev);

  }

  function render_btn(page){
    if(characterInfo.pages > 1){
      if (page > 1 && page < characterInfo.pages){
          return <div className='container_btn'>
                  <button onClick={() => update_next()}>next</button>
                  <button onClick={() => update_prev()}>prev</button>
                </div>
        }
      else if(page <=1 ){
        return <div className='container_btn'><button onClick={() => update_next()}>next</button></div>
      }
      else if(page >= characterInfo.pages ){
        return <div className='container_btn'><button onClick={() => update_prev()}>prev</button></div>
      }
    }
  }

  function show_card(card){
    var card = document.getElementById(`${card.id}`);
    card.classList.remove('hidden');
    card.classList.add('circle_pop')
  }
  function show_card_hidden(card){
    var card = document.getElementById(`${card.id}`);
    card.classList.add('hidden');

  }
  function render_card(character){
    return(
      <div className='body'>
        <Header
          setCharacter = {setCharacter}
          setCharacterInfo = {setCharacterInfo}
          setPage_n = {setPage_n}
        ></Header>
        <div className='container_pj'>
          {character.map((el) => (
            <div className='container_cards' onMouseEnter={() => show_card(el)} onMouseLeave={() => show_card_hidden(el)}>
              <div className='container_img'>
                <img src={el.image}></img>
              </div>
              <div id = {el.id} className='container_body hidden'>
                <h2>{el.name}</h2>
                <p>{el.species}</p>
                <p>{el.status}</p>
              </div>
          </div>))}
        </div> 
      </div>
    );
  }

  return (
    <div className="App">
      {render_card(character)}
      {render_btn(page_n)}
    </div>
  );
}

export default App;
