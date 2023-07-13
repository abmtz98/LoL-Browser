import React, {useState, useEffect} from 'react'
import axios, { all } from 'axios'
import ChampionCard from './components/ChampionCard';
import './App.css';

function App() {
  const [summonerSearch, setSummonerSearch] = useState('')
  const [playerData, setPlayerData] = useState({})
  const [allChampions, setAllChampions] = useState([])
  const API_KEY ='RGAPI-3d3cbd77-bd1a-4644-94c7-8531f7143d5c'
  const APIAllChampions = 'http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/champion.json'
  

  function searchSummoner(e){
    //Set up  the correct API call
    var APICallString ='https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ summonerSearch + '?api_key='+ API_KEY
    
    //Handle the API call
    axios.get(APICallString)
      .then(res=>{
        setPlayerData(res.data)
        //console.log(res.data)
      })  
      .catch(err=>{
        console.error(err)
      })
  }

  function loadAllChampions(){
    axios.get(APIAllChampions)
    .then(res=>{
      setAllChampions(res.data.data)

      const championsData = res.data.data;
      const championsArray = Object.keys(championsData).map(key => championsData[key]);
      
      setAllChampions(championsArray.map(champion => (
        <ChampionCard
          fxname={champion.name}
          key={champion.id}
          bck={'url("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+champion.name+'_0.jpg")'}
          img={'http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/'+champion.image.full}
          championName={champion.name}
          title={champion.title}
        />
      )))

      console.log(res.data.data)
    })
    .catch(err=>{
      console.error(err)
    })
  }

  useEffect(()=>{
    loadAllChampions()
  },[])

  return (
    <div className="App-header Gen-container">
      <nav>
        <h5>League of Legends <span className='kaushanF'>Summoner Searcher</span></h5>
        <div>
          <button className='href'>Home</button>
        </div>
      </nav>
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
            <div className='container-BI'>
              <div className='borderIcon'></div>
                <img width={160} 
                  src={"http://ddragon.leagueoflegends.com/cdn/11.21.1/img/profileicon/"+playerData.profileIconId+".png"} 
                  style={{borderRadius: '50%'}}
                />
            </div>
            <p>We got you <span className='kaushanF'>{playerData.name}</span>!</p>
            <p>Summoner level: <span>{playerData.summonerLevel}</span></p>
          </> 
          : 
          <>
            <p>Are you sure your'e there?</p>
          </>}
        </div>
      </section>
      <section className='allChampions' id='allChampions'>
        {/*Object.entries(allChampions).map(([key, champion], index)=>(
          <div key={index}>
              <ChampionCard
                img={'http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/'+champion.img.full}
                championName={champion.name}
                title={champion.title}
              />
          </div>
        ))*/
          allChampions
          
        }
      </section>
    </div>
  );
}

export default App;
