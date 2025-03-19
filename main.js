let flashcards = [];
let cardIndex = 0;
let show = false;
async function getCards(){
    document.getElementById("messages").innerHTML = "loading"
    href = encodeURIComponent(window.location.href);
    url = `https://script.google.com/macros/s/AKfycbxZjybYBTSYYfO5yM3N2F68A7wQYEIiJr96PHWEjpKh0Ddz7jVLcEGvr0fwYJGT7pmO/exec`
    const response = await fetch(url);
    if(response.status == 200){
        flashcards = await response.json();
        //loadCard(0);
        loadSheet();
        document.getElementById("messages").innerHTML = ""
    }
}

function loadSheet(){
    let output = "";
    for(let i=1;i<flashcards.length;i++){
        output += `
        <div class="card" id="card_${i}">
            <div class="card-body">
                <h5 class="card-title" onclick="toggle(${i})">${flashcards[i][0]} <button type="button" class="btn-close" aria-label="Close" onclick="hide(${i})"></button></h5>
                <p class="card-text" id="answer_${i}" hidden="true">${flashcards[i][1]}</p>          
            </div>
        </div>`
    }
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
