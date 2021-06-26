const cards=document.querySelectorAll('.memory-card');
let screen=document.getElementById('score');
let screenvalue=0;
let hasflippedcard=false;
let lockboard =false;
let firstcard,secondcard;
screen.innerHTML=screenvalue;
function flipcard(){
    if(lockboard)return;
    if(this === firstcard) return;
    this.classList.add('flip');
    screenvalue+=1;
    screen.innerHTML=screenvalue;
    if(!hasflippedcard){
        // first click
        hasflippedcard=true;
        firstcard=this;
    }else{
        //second click
        // hasflippedcard=false;
        console.log(hasflippedcard);
        secondcard=this;
        checkformatch();
    } 
}

function checkformatch(){
    //checking the cards are matching or not
    if(firstcard.dataset.name === secondcard.dataset.name){
        disablecards();
    }else{
       unflipcards();
    }
}

function disablecards(){
    firstcard.removeEventListener('click',flipcard);
    secondcard.removeEventListener('click',flipcard);
    resetboard();
}

function unflipcards(){
    // unflip the card
    lockboard=true;
    setTimeout( ()=>{
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
       resetboard();
        
    },1200);
}

function resetboard(){
    [hasflippedcard,lockboard]=[false,false];
    [firstcard,secondcard]=[null,null];
}

(function shuffle(){
    cards.forEach(card => {
        let randompos =Math.floor(Math.random()*12);
        card.style.order=randompos;
    });
})();

 cards.forEach(card => 
     card.addEventListener('click',flipcard)
 );