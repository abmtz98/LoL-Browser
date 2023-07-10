function ChampionCard(props){
    return(
        <>
            <img src={props.img} alt='Champion image' width={100} style={'border-radius: 50%'}/>
            <span>{props.championName}</span>
            <p>{props.title}</p>
        </>
    );
}

export default ChampionCard;