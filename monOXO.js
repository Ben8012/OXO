function creeGrille(){
    new Grille();
}

//constructeur des objets grilles
function Grille(){
    this.cases = [];
    this.partieFinie =false;
    this.creeJoueur();
    this.afficher(); 
    
}

//constructeur des objet Case
function Case(grille, td){
    this.grille = grille;
    this.td = td;
    this.signe = "";
    this.coche = false;
}

function Partie(){
    this.tour = false; 
}

function Joueur(nom,signe){
    this.nom = nom;
    this.signe = signe;
}

Grille.prototype.creeJoueur = function (){
    var j1 = new Joueur("Lara", "X") ;
    var j2 = new Joueur("Mia", "O");
    this.joueurs = [j1,j2];
}

Grille.prototype.afficher = function(){
    k=0; 
    var div = document.getElementById("grille");
    div.setAttribute("style","display:flex; justify-content:center")
    while (div.firstChild) div.removeChild(div.firstChild);
    var table = div.appendChild(document.createElement("table"));
    table.setAttribute("class", "tictactoe");
    for (let i = 0; i <= 2; i++) {
           var tr = table.appendChild(document.createElement("tr"));
     
           for (let j = 0; j <= 2; j++) {

                var td = tr.appendChild(document.createElement("td"));
                if(k==0){
                    td.setAttribute("class","caseCote ")
                }
                else if (k==1){
                    td.setAttribute("class","casemilieuHautBas")
                }
                else if (k==2){
                    td.setAttribute("class","caseCote ")
                }
                else if (k==3){
                    td.setAttribute("class","caseMilieuGaucheDroite ")
                }
                else if (k==4){
                    td.setAttribute("class","caseCentre")
                }
                else if (k==5){
                    td.setAttribute("class","caseMilieuGaucheDroite  ")
                }
                else if (k==6){
                    td.setAttribute("class","caseCote ")
                }
                else if (k==7){
                    td.setAttribute("class","casemilieuHautBas")
                }
                else if (k==8){
                    td.setAttribute("class","caseCote  ")
                }

                var c = new Case(this, td );
                this.cases[this.cases.length] = c;

                td.onclick = function(c) { return function() { c.jouer() }; }(c);
                k++  
           }
    }
    var div1 = document.getElementById("message");
    div1.setAttribute("class","message")
    while (div1.firstChild) div1.removeChild(div1.firstChild);
    var p = div1.appendChild(document.createElement("p"));
    p.appendChild(document.createTextNode("C'est au tour de "+this.joueurs[0].nom+", il joue avec les "+this.joueurs[0].signe));
    
}

Case.prototype.jouer = function(){
    console.log(this.grille)
    if(!this.grille.partieFinie){
        if(!Partie.tour){
            if(!this.coche){
                this.td.appendChild(document.createTextNode(this.grille.joueurs[0].signe))
                this.coche = true;
                this.signe = this.grille.joueurs[0].signe
                Partie.tour = !Partie.tour
                var div1 = document.getElementById("message");
                div1.setAttribute("class","message")
                while (div1.firstChild) div1.removeChild(div1.firstChild);
                var p = div1.appendChild(document.createElement("p"));
                p.appendChild(document.createTextNode("C'est au tour de "+this.grille.joueurs[1].nom+", il joue avec les "+this.grille.joueurs[1].signe));
            
            }
            else alert("Cette case est deja cochée. Jouez une autre case")
        }
        else{
            if(!this.coche){
                this.td.appendChild(document.createTextNode(this.grille.joueurs[1].signe))
                this.coche = true;
                this.signe = this.grille.joueurs[1].signe
                Partie.tour = !Partie.tour
                var div1 = document.getElementById("message");
                div1.setAttribute("class","message")
                while (div1.firstChild) div1.removeChild(div1.firstChild);
                var p = div1.appendChild(document.createElement("p"));
                p.appendChild(document.createTextNode("C'est au tour de "+this.grille.joueurs[0].nom+", il joue avec les "+this.grille.joueurs[0].signe));
                
            }
            else alert("Cette case est deja cochée. Jouez une autre case")   
        }
        this.grille.verifier();
    }else {
        alert("La partie est finie ! cliquez sur OK pour rejouer !")
        window.location.reload();
    }
}


Grille.prototype.texteVictoire1 = function(){
    var div1 = document.getElementById("message");
    div1.setAttribute("class","message")
    while (div1.firstChild) div1.removeChild(div1.firstChild);
    var p = div1.appendChild(document.createElement("p"));
    p.appendChild(document.createTextNode("Le joueur "+this.joueurs[0].nom+" a gagné !!"));
    this.partieFinie = true;
}

Grille.prototype.texteVictoire2= function(){
    var div1 = document.getElementById("message");
    div1.setAttribute("class","message")
    while (div1.firstChild) div1.removeChild(div1.firstChild);
    var p = div1.appendChild(document.createElement("p"));
    p.appendChild(document.createTextNode("Le joueur "+this.joueurs[1].nom+" a gagné !!"));
    this.partieFinie = true;
}

Grille.prototype.verifier = function(){
    
    
    if(this.cases[0].signe == this.joueurs[0].signe && this.cases[1].signe == this.joueurs[0].signe && this.cases[2].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[0].td.setAttribute("class","caseCoteV");
        this.cases[1].td.setAttribute("class","casemilieuHautBasV");
        this.cases[2].td.setAttribute("class","caseCoteV");
    }
    else if (this.cases[3].signe == this.joueurs[0].signe && this.cases[4].signe == this.joueurs[0].signe && this.cases[5].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[3].td.setAttribute("class","caseMilieuGaucheDroiteV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[5].td.setAttribute("class","caseMilieuGaucheDroiteV");
        
    }
    else if (this.cases[6].signe == this.joueurs[0].signe && this.cases[7].signe == this.joueurs[0].signe && this.cases[8].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[6].td.setAttribute("class","caseCoteV");
        this.cases[7].td.setAttribute("class","casemilieuHautBasV");
        this.cases[8].td.setAttribute("class","caseCoteV");
    }
    else if (this.cases[0].signe == this.joueurs[0].signe && this.cases[3].signe == this.joueurs[0].signe && this.cases[6].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[0].td.setAttribute("class","caseCoteV");
        this.cases[3].td.setAttribute("class","caseMilieuGaucheDroiteV");
        this.cases[6].td.setAttribute("class","caseCoteV");
    }    
    else if(this.cases[1].signe == this.joueurs[0].signe && this.cases[4].signe == this.joueurs[0].signe && this.cases[7].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[1].td.setAttribute("class","casemilieuHautBasV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[7].td.setAttribute("class","casemilieuHautBasV");
    }
    else if(this.cases[2].signe == this.joueurs[0].signe && this.cases[5].signe == this.joueurs[0].signe && this.cases[8].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[2].td.setAttribute("class","caseCoteV");
        this.cases[5].td.setAttribute("class","caseMilieuGaucheDroiteV");
        this.cases[8].td.setAttribute("class","caseCoteV");
    }
    else if(this.cases[0].signe == this.joueurs[0].signe && this.cases[4].signe == this.joueurs[0].signe && this.cases[8].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[0].td.setAttribute("class","caseCoteV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[8].td.setAttribute("class","caseCoteV");
    }
    else if( this.cases[2].signe == this.joueurs[0].signe && this.cases[4].signe == this.joueurs[0].signe && this.cases[6].signe == this.joueurs[0].signe){
        this.texteVictoire1();
        this.cases[2].td.setAttribute("class","caseCoteV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[6].td.setAttribute("class","caseCoteV");
    }
     
    else if(this.cases[0].signe == this.joueurs[1].signe && this.cases[1].signe == this.joueurs[1].signe && this.cases[2].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[0].td.setAttribute("class","caseCoteV");
        this.cases[1].td.setAttribute("class","casemilieuHautBasV");
        this.cases[2].td.setAttribute("class","caseCoteV");
    }
    else if (this.cases[3].signe == this.joueurs[1].signe && this.cases[4].signe == this.joueurs[1].signe && this.cases[5].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[3].td.setAttribute("class","caseMilieuGaucheDroiteV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[5].td.setAttribute("class","caseMilieuGaucheDroiteV");
    }
    else if (this.cases[6].signe == this.joueurs[1].signe && this.cases[7].signe == this.joueurs[1].signe && this.cases[8].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[6].td.setAttribute("class","caseCoteV");
        this.cases[7].td.setAttribute("class","casemilieuHautBasV");
        this.cases[8].td.setAttribute("class","caseCoteV");
    }
    else if (this.cases[0].signe == this.joueurs[1].signe && this.cases[3].signe == this.joueurs[1].signe && this.cases[6].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[0].td.setAttribute("class","caseCoteV");
        this.cases[3].td.setAttribute("class","caseMilieuGaucheDroiteV");
        this.cases[6].td.setAttribute("class","caseCoteV");
    }    
    else if(this.cases[1].signe == this.joueurs[1].signe && this.cases[4].signe == this.joueurs[1].signe && this.cases[7].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[1].td.setAttribute("class","casemilieuHautBasV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[7].td.setAttribute("class","casemilieuHautBasV");
    }
    else if(this.cases[2].signe == this.joueurs[1].signe && this.cases[5].signe == this.joueurs[1].signe && this.cases[8].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[2].td.setAttribute("class","caseCoteV");
        this.cases[5].td.setAttribute("class","caseMilieuGaucheDroiteV");
        this.cases[8].td.setAttribute("class","caseCoteV");
    }
    else if(this.cases[0].signe == this.joueurs[1].signe && this.cases[4].signe == this.joueurs[1].signe && this.cases[8].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[0].td.setAttribute("class","caseCoteV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[8].td.setAttribute("class","caseCoteV");
    }
    else if( this.cases[2].signe == this.joueurs[1].signe && this.cases[4].signe == this.joueurs[1].signe && this.cases[6].signe == this.joueurs[1].signe){
        this.texteVictoire2();
        this.cases[2].td.setAttribute("class","caseCoteV");
        this.cases[4].td.setAttribute("class","caseCentreV");
        this.cases[6].td.setAttribute("class","caseCoteV");
    }

    l=0;
    for (let i = 0; i < this.cases.length; i++) {
            if(this.cases[i].coche){
                l++
            }
    }
    if(l>=9){
        setTimeout(1000)
        alert("Egalité !, appuyez sur OK pour recommencer")
        window.location.reload();
    }
        
}


