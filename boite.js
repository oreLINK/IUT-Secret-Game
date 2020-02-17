var univers;
var compteurDisques = 0;
var nombreCoups = 0;
var debug = false;

function cellule(li, co) {
    this.li = li;
    this.co = co;
    this.etat = -1;
    this.atome = false;
    this.colorSwitch = false;
    this.isCircle = false;
    this.isBord = false;
    this.dom = document.createElement('td');
    this.grille = (li > 0) && (li < 9) && (co > 0) && (co < 9);
    var that=this;

    this.dom.onclick = function () {
        var paragraph = document.createElement('p');
        switch(this.style.backgroundColor){

            case "white":
            if(that.isCircle && that.etat==-1){
                paragraph.innerText = '0';
                that.dom.appendChild(paragraph);
                that.etat=1;  
            }
            break;
            
            case "darkgrey":
            if(!that.colorSwitch){
                nombreCoups++;
                this.style.backgroundColor = getRandomColor();
                that.colorSwitch = true;
            }
            checkLaser(that.li, that.co, this.style.backgroundColor);
            break;
        }
            
    }

    this.circle = function() {
        if(that.isCircle){
            var p = document.createElement('p');
            p.innerText = '0';
            that.dom.appendChild(p);
            that.etat=1;
        } 
    }

    this.initialiser = function () {
        var couleur = "";
        if ((this.li === 0 && this.co === 0) || (this.li === 0 && this.co === 9) ||
            (this.li === 9 && this.co === 0) || (this.li === 0 && this.co === 0) ||
            (this.li === 9 && this.co === 9)) { // les 4 coins
            couleur = 'grey';
        } else if (this.li === 0 || this.co === 0 || this.li === 9 || this.co === 9) { // les boutons latéraux ou les pions joué
            couleur = 'darkgrey';
        }
        else {
            couleur = "white";
        }
        this.dom.style.backgroundColor = couleur;
    };
}

function drawLaser(li, co, direction, color){
    switch (direction) {
        case "droite":
            univers[li][co+1].dom.style.backgroundColor = color;
            break;
        case "bas":
            univers[li+1][co].dom.style.backgroundColor = color;
            break;
        case "gauche":
            univers[li][co-11].dom.style.backgroundColor = color;
            break;
        case "haut":
            univers[li-1][co].dom.style.backgroundColor = color;
            break;
        default:
            break;
    }
}

function checkLaser(li, co, color){
    var enface = false;
    if(li == 0){
        var a;
        for(a = 1; a < 10; a++){
            if(univers[a][co].isCircle){
                enface = true;
            } else if(debug){
                univers[a][co].dom.style.backgroundColor = color;
            }
        }
        if(!enface) {
            univers[9][co].dom.style.backgroundColor = color;
        }
    } 
    else if (co == 9){
        var b;
        for(b = 8; b >= 0; b--){
            if(univers[li][b].isCircle){
                enface = true;
            } else if(debug){
                univers[li][b].dom.style.backgroundColor = color;
            }
        }
        if(!enface) {
            univers[li][0].dom.style.backgroundColor = color;
        }
    } else if (li == 9){
        var c;
        for(c = 8; c >= 0; c--){
            if(univers[c][co].isCircle){
                enface = true;
            } else if(debug){
                univers[c][co].dom.style.backgroundColor = color;
            }
        }
        if(!enface) {
            univers[0][co].dom.style.backgroundColor = color;
        }
    } else { //co == 0
        var d;
        for(d = 1; d < 10; d++){
            if(univers[li][d].isCircle){
                enface = true;
            } else if(debug){
                univers[li][d].dom.style.backgroundColor = color;
            }
        }
        if(!enface) {
            univers[li][9].dom.style.backgroundColor = color;
        }
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

function creerUnivers() {
    var body = document.getElementsByTagName("body")[0];
    var score = document.createElement("p");
    score.id = "score";
    var nbCoups = document.createTextNode("Score : "+getNombreCoups());
    score.appendChild(nbCoups);
    var tbl = document.createElement("table");
    var li, co, ligne;
    var randoms = [];
    randoms[0] = Math.floor(Math.random(10));

    univers = [];
    for (li = 0; li < 10; li += 1) {
        var row = document.createElement("tr");
        ligne = [];
        for (co = 0; co < 10; co += 1) {
            var c = new cellule(li, co);
            c.initialiser();
            row.appendChild(c.dom);
            if(li == 0 || li == 9 || co == 0 || co == 9){
                c.isBord = true;
            }
            var r = Math.random();
            if(r <= 0.3 && c.dom.style.backgroundColor == "white" && compteurDisques < 5){
                c.isCircle = true;
                compteurDisques++;
            }
            ligne.push(c);
        }
        tbl.appendChild(row);     
        univers.push(ligne); 
    }
    body.appendChild(score);
    body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}

function getNombreCoups(){
    return nombreCoups;
}

function clickDebug(checkBoxElem){
    if(checkBoxElem.checked) {
        debug = true;
    } else {
        debug = false;
    }
}