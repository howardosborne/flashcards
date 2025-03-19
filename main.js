let flashcards = [];
let cardIndex = 0;
let show = false;

async function getSheets() {
    document.getElementById("messages").innerHTML = "loading"
    href = encodeURIComponent(window.location.href);
    url = `https://script.google.com/macros/s/AKfycbwTpGdGNTPc8DTRIgKybIrm2G-Uv1y7nmhOc9q6NdE/dev`
    const response = await fetch(url);
    if(response.status == 200){
        sets = await response.json();
        let output = "<h1>pick a pack</h1>"
        for(let i=0;i<sets.length;i++){
            output += `<div class="card" id="card_${i}">
            <div class="card-body">
                <h2 class="card-title" onclick="getCards(${sets[i]})">${sets[i]}</h2>
            </div>
        </div>`
        }
        document.getElementById("messages").innerHTML = `
        
        
        `
    }
    
}

async function getCards(set){
    document.getElementById("messages").innerHTML = "loading"
    href = encodeURIComponent(window.location.href);
    url = `https://script.google.com/macros/s/AKfycbwTpGdGNTPc8DTRIgKybIrm2G-Uv1y7nmhOc9q6NdE/dev?flashcards=${set}`
    const response = await fetch(url);
    if(response.status == 200){
        flashcards = await response.json();
        //loadCard(0);
        loadSheet();
        document.getElementById("messages").innerHTML = ""
    }
}

function loadSheet(){
    let output = '<div class="row">';
    for(let i=1;i<flashcards.length;i++){
        output += `
        <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card" id="card_${i}">
            <div class="card-body">
                <h1 class="card-title" onclick="toggle(${i})">${flashcards[i][0]} <span class="badge rounded-pill text-bg-light" onclick="hide(${i})">done</span></h1>
                <h2 class="card-text" id="answer_${i}" hidden="true">${flashcards[i][1]}</h2>          
            </div>
        </div>
        </div>`
    }
    output +="</div>"
    document.getElementById("flashcards").innerHTML = output;
}
function toggle(index){
    if(document.getElementById(`answer_${index}`).hidden){
        document.getElementById(`answer_${index}`).hidden=false;
    }
    else{
        document.getElementById(`answer_${index}`).hidden=true;
    }
}

function hide(index){
        document.getElementById(`card_${index}`).hidden=true;
}

function loadCard(item){
    document.getElementById("question").innerHTML = flashcards[item][0];
    if(show){
        document.getElementById("answer").innerHTML = flashcards[item][1];
    }
    else{
        document.getElementById("answer").innerHTML = "";
    }
}
function back(){
    if(cardIndex==0){cardIndex = flashcards.length -1}
    else{cardIndex -= 1}
    loadCard(cardIndex)
}
function toggleShow(){
    if(show){
        show = false;
        document.getElementById("show").innerHTML = "show";
        loadCard(cardIndex);
    }
    else{
        show = true;
        document.getElementById("show").innerHTML = "hide";
        loadCard(cardIndex);
    }
}
function next(){
    if(cardIndex==flashcards.length -1){cardIndex = 0}
    else{cardIndex += 1}
    loadCard(cardIndex)
}
