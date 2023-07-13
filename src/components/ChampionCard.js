function ChampionCard(props){
    function removeApostrophe(str) {
        var result = str.replace(/\'/g, '');

        var final = result.replace(/ /g, '');
        return final;
    }
    var original = props.bck
    var fixedName = removeApostrophe(original)

    console.log(fixedName)

    return(
        <div className="champCard">
            <img className="pimg" src={props.img} alt='Champion image'  style={{borderRadius: '50%'}}/>
            <div className="backimg" style={{backgroundImage: fixedName}}>
                <span className="dominef" style={{fontSize: '1.2em', fontWeight: 'bold'}}>{props.championName}</span>
                <p className="kaushanF">{props.title}</p>

            </div>
        </div>
    );
}

export default ChampionCard;