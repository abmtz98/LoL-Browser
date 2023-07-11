import React, {useState, useEffect} from 'react'
import axios, { all } from 'axios'
import ChampionCard from './components/ChampionCard';
import './App.css';

function App() {
  const [summonerSearch, setSummonerSearch] = useState('')
  const [playerData, setPlayerData] = useState({})
  const [allChampions, setAllChampions] = useState([])
  const API_KEY ='RGAPI-52cfa9b5-e09a-4cab-8581-506479f6633c'
  const APIAllChampions = 'http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json'
  
  
  function searchSummoner(e){
    //Set up  the correct API call
    var APICallString ='https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ summonerSearch + '?api_key='+ API_KEY
    
    //Handle the API call
    axios.get(APICallString)
      .then(res=>{
        setPlayerData(res.data)
      })  
      .catch(err=>{
        console.error(err)
      })
    }
    function loadAllChampions(){
      axios.get(APIAllChampions)
      .then(res=>{
        setAllChampions(res.data.data)
        console.log(res.data.name)
        console.log(res.data.data)
      })
      .catch(err=>{
        console.error(err)
      })
    }
    
    /* Window.onload = loadAllChampions(); */
    
    return (
    <div className="App-header Gen-container">
      <nav>
        <h5>League of Legends <span className='kaushanF'>Summoner Searcher</span></h5>
        <div>
          <button className='href'>Home</button>
          <button 
            onClick={e=>{loadAllChampions(e)}} className='href'>Load</button>
        </div>
      </nav>
      <section>

      </section>
      <section className='container-search'>
        <div className='search-bar'>
          <form action='#' id='searchSummoner'>
            <input type='text' placeholder='Summoner name'
              onChange={(e)=>{setSummonerSearch(e.target.value)}}  />
            <button className='searchBtn' onClick={e=>{
              e.preventDefault()
              searchSummoner(e)}}><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
            
        </div>
        
        <div className='responseData'>
          {JSON.stringify(playerData) != '{}' ? 
          <>
            <p>We got you {playerData.name}!</p>
            <p>Summoner level: {playerData.summonerLevel}</p>
            <img width={150} src={"http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/"+playerData.profileIconId+".png"} />
          </> 
          : 
          <><p>Are you sure your'e there?</p></>}
        </div>
      </section>
      <section className='allChampions'>
        {allChampions &&
          Object.values(allChampions).map((champion)=>(
            <ChampionCard
              key={champion.id}
              img={'http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/'+champion.image.full}
              championName={champion.name}
              title={champion.title}
            />
          ))
        }
      </section>
    </div>
  );
}

export default App;
