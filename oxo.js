function start()
{
var j1 = new Joueur("Benjamin");
var j2 = new Joueur("Alex");
var partie = new Partie([j1, j2], 0);
}


/********************************************************************************************
** objets de type Joueur
********************************************************************************************/
function Joueur(nom)
   {
   this.nom=nom;        //le nom du joueur
   };

/********************************************************************************************
** objets de type JoueurPartie (un joueur en train de jouer une partie)
********************************************************************************************/
function JoueurPartie(joueur, index, symbole)
   {
   this.joueur = joueur;
   this.index = index;
   this.symbole = symbole;
   };

/********************************************************************************************
** objets de type Partie
********************************************************************************************/
function Partie(joueurs, tour)
   {
   if (joueurs.length!=2) 
      {
      alert("le nombre de joueurs doit être égal à  2");
      return; 
      }
   this.grille=new Grille(this);
   this.joueurs=new Array();
   for (var i=0; i<2; i++)
       {
       var symbole="XO".substring(i,i+1);
       this.joueurs[i] = new JoueurPartie(joueurs[i], i, symbole);
       }
   if (tour<0) tour=0;
   if (tour>1) tour=1;
   this.tour = tour;
   this.termine=false;

   this.aQuiLeTour();
   };

//--------
// appelé pour déterminer qui doit joueur et relancer les joueurs
//
Partie.prototype.aQuiLeTour = function() {
   if (this.termine) return;
   this.grille.afficherMessage("Au tour de "+this.joueurs[this.tour].joueur.nom+" de jouer avec les "+this.joueurs[this.tour].symbole);
   };

//--------
// appelé par la Grille lorsque la case 'ncase' est cliqué
//
Partie.prototype.caseClique = function(ncase) {
   if (this.termine) return;
   this.jouer(this.joueurs[this.tour], ncase);
   };

//--------
// appelé par 'joueur' (JoueurPartie) lorsqu'il joue la case 'ncase'
//
Partie.prototype.jouer = function (joueur, ncase) {
   if (this.tour!=joueur.index) return;
   if (ncase<1 || ncase>3*3) return;

   var c = ncase - 1;
   var x = c % 3;
   var y = (c - (c % 3)) / 3;

   if (this.grille.cocher(x, y, joueur.symbole))
      {
      var resultat = this.grille.verifier(joueur.symbole);
      if (resultat==-1) 
         {
         this.grille.afficherMessage("Match nul, plus aucune possibilitée !");
         this.termine=true;
         return;
         }
      if (resultat==1) 
         {
         this.grille.afficherMessage(this.joueurs[this.tour].joueur.nom+" a gagné !");
         this.termine=true;
         return;
         }
      this.tour++;
      if (this.tour>=this.joueurs.length) this.tour=0;
      this.aQuiLeTour();
      }
   };

/********************************************************************************************
** objets de type Grille
********************************************************************************************/
function Grille(partie)
   {
   this.partie = partie;
   this.grille = new Array();
   for (var y=0; y<3; y++)
       {
       this.grille[y]=new Array();
       for (var x=0; x<3; x++)
           {
           this.grille[y][x]=new Case(partie); 
           }
       } 
   this.dessiner(document.getElementById("grille"));
   };

Grille.prototype.color1= "#8fc048";
Grille.prototype.color2= "#e6007b";


Grille.prototype.dessiner = function (div) {
   while (div.firstChild) div.removeChild(div.firstChild);
   var table = div.appendChild(document.createElement("table"));
   table.setAttribute("class", "tictactoe");
   for (var y=0; y<3; y++)
       {
       var tr = table.appendChild(document.createElement("tr"));
       for (var x=0; x<3; x++)
           {
           var td = tr.appendChild(document.createElement("td"));
           td.style.color=this.color1;
           td.onclick = this.caseClique.bind(this, y*3 + x + 1);
           this.grille[y][x].td = td;
           this.grille[y][x].dessiner();
           }
       }
   this.message = div.appendChild(document.createElement("div"));
   this.message.setAttribute("class", "message");
   };

Grille.prototype.afficherMessage = function (msg) {
   while (this.message.firstChild) this.message.removeChild(this.message.firstChild);
   this.message.appendChild(document.createTextNode(msg));
   };

Grille.prototype.caseClique = function (ncase) {
   this.partie.caseClique(ncase);
   };

Grille.prototype.cocher = function (x, y, symbole) {
   if (x<0 || x>=3) return false;
   if (y<0 || y>=3) return false;
   return this.grille[y][x].cocher(symbole);
   };

//
//renvoi: -1 plus de possibilitÃ©s
//         0 pas gagnÃ©
//         1 gagnÃ©
//
Grille.prototype.verifier = function (symbole) {
   var resultat=-1;

   var diagonale1=0;
   var diagonale2=0;
   for (var y=0; y<3; y++)
       {
       if (this.grille[y][y].symbole==symbole) diagonale1++;       
       if (this.grille[y][3 - y - 1].symbole==symbole) diagonale2++;       
       var ligne = 0;
       var colonne = 0;
       for (var x=0; x<3; x++)
           {
           if (resultat==-1 && this.grille[y][x].symbole=="") resultat=0;
           if (this.grille[y][x].symbole==symbole) ligne++;
           if (this.grille[x][y].symbole==symbole) colonne++;
           }
       if (ligne==3 || colonne==3)
          {
          resultat=1;
          for (var x=0; x<3; x++)
              {
              if (ligne==3) this.grille[y][x].td.style.color=this.color2;
              if (colonne==3) this.grille[x][y].td.style.color=this.color2;
              }
          }       
       }           
   if (diagonale1==3 || diagonale2==3) 
      {
      resultat=1;
      for (var y=0; y<3; y++)
          {
          if (diagonale1==3) this.grille[y][y].td.style.color=this.color2;     
          if (diagonale2==3) this.grille[y][3 - y - 1].td.style.color=this.color2;    
          }
      }

   return resultat;
   };

/********************************************************************************************
** objets de type Case
********************************************************************************************/
function Case(partie)
   {
   this.partie=partie;
   this.symbole="";
   this.td = null;
   };

Case.prototype.cocher = function(symbole) {
   if (this.symbole!="") return false;
   this.symbole=symbole;
   this.dessiner();
   return true;
   };

Case.prototype.dessiner = function () {
   if (this.td==null) return;
   while (this.td.firstChild) this.td.removeChild(this.td.firstChild);
   this.td.appendChild(document.createTextNode(this.symbole));
   };