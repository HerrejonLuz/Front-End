/*  Declaración. Unimos el DOM con los objetos en javaScript */
const pokeName=document.getElementById("pokeName");
const pokeImg = document.getElementById("pokeImg");
const pokeCard = document.getElementById("pokeCard");
const pokeId = document.getElementById("pokeId");
const pokeTypes = document.getElementById("pokeTypes");
const pokeStats = document.getElementById("pokeStats");
const pokeMoves = document.getElementById("pokeMoves");

/*Sección de funciones */

const pokeImage =(url) =>{
    pokeImg.src = url;
}

const extraerPokeTypes = (types)=>{
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        //typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const extraerPokeStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const extraerPokeMoves = moves=>{
    pokeMoves.innerHTML = '';
      for(let i=0; i<45 ; i++){
       // console.log(moves);
        const moveTextElement = document.createElement("div");
        //typeTextElement.style.color = typeColors[type.type.name];
        moveTextElement.textContent = moves[i].move.name;
        pokeMoves.appendChild(moveTextElement);
    }
}


const fetchPokemon = () =>{ 
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}` ;

    fetch(url).then((res) =>{      
        if (res.status != "200"){
            console.log(res);  
            pokeImage("./pokemon-sad.gif")
            pokeId.innerHTML = ""; 
            pokeTypes.innerHTML="";
            pokeStats.innerHTML="";
            pokeMoves.innerHTML = '';
        }  else{   
            return res.json();  
        }        
    }).then((data) =>{
        console.log(data); 
        let pokeImgURL = data.sprites.front_default; //aqui traemos un elemento espcífico del DATA
        let { stats, types, moves } = data;
       
        //console.log(pokeImgURL);
        pokeImage(pokeImgURL);
        pokeId.innerHTML = `No. ${data.id}`;
        extraerPokeTypes(types);
        extraerPokeStats(stats);
        extraerPokeMoves(moves);

    });                     
}
