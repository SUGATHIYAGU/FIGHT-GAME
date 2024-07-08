let p1name=document.getElementById("player-1-name");
let p2name=document.getElementById("player-2-name");
let p1health=document.getElementById("player-1-Health");
let p2health=document.getElementById("player-2-Health");
let playsection=document.getElementById("play");
let resultid=document.getElementById("result");
let p1attackdiv=document.getElementsByClassName("attack1")

function updategame(p1,p2,gamestate){
p1name.innerText=p1.name;
p2name.innerText=p2.name;
p1health.innerText=p1.health;
p2health.innerText=p2.health;

if(p1.health <=0 || p2.health <=0){
    game.isover=true;
    gamestate=game.isover;
    resultid.innerText= game.winner(game.isover,p1,p2);
    return gamestate;
}
}


class Player{
    constructor(name,health,attackInjury){
        this.name=name;
        this.health=health;
        this.attackharm=attackInjury;
    }


strike(player,enemy,attackharm){
let damageamt=Math.ceil(Math.random()*attackharm);
enemy.health-=damageamt;
updategame(p1,p2,game.isover)
return `${player.name} attcks ${enemy.name} for ${damageamt} damage!!`;
}

heal(player){
    let healAmt=Math.ceil(Math.random()*5);
    player.health+=healAmt;
    updategame(p1,p2,game.isover)
    return `${player.name} heals about ${healAmt} !!`
}
}


class Game {
    constructor() {
      this.isover = false;
}

winner(isover,p1,p2){
    let ResultText;
    if(isover==true && p1.health<=0)
    {
        ResultText=`${p2.name} wins`;
    }else if(isover==true && p2.health<=0) {
        ResultText=`${p1.name} wins`;
    }
    document.getElementById('victory').play();
    return ResultText;
}


reset(p1,p2){

    p1.health=100;
    p2.health=100;
    this.isover=false;
    resultid.innerText="";
    updategame(p1,p2,this.isover)
}

}

let player1 = new Player(prompt("Enter Player 1 Name"), 100, 15);
let player2 = new Player(prompt("Enter Player 2 Name"), 100, 15);

let p1 = player1;
let p2 = player2;


let game=new Game()
updategame(p1,p2,game.isover)
let gamestate;


document.addEventListener('keydown',function(e){
    if(e.key=='q' && p2.health>=0 && game.isover==false){
        p1.strike(p1,p2,p1.attackharm)
        document.getElementById('p1attack').play();
    }
});

document.addEventListener('keydown',function(e){
    if(e.key=='p' && p1.health>=0 && game.isover==false){
        p1.strike(p2,p1,p2.attackharm)
        document.getElementById('p2attack').play();
    }
});

document.addEventListener('keydown',function(e){
    if(e.key=='a' && p2.health>=0){
        p1.heal(p1);
        document.getElementById('p1heal').play();
    }
});

document.addEventListener('keydown',function(e){
    if(e.key=='l' && p1.health>=0){
        p2.heal(p2);
        document.getElementById('p2heal').play();
    }
});

