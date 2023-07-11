function ChampionCard(props){
    var apilink ='http://ddragon.leagueoflegends.com/cdn/img/champion/splash/'+props.championName+'_0.jpg'
    
    return(
        <div className="cardContainer" style={{ backgroundImage: `url(${apilink})`,backgroundSize: "cover"}}>
            <img src={props.img} alt='Champion image' width={100}/>
            <span>{props.championName}</span>
            <p>{props.title}</p>
        </div>
    );
}

export default ChampionCard;