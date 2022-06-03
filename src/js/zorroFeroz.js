const LoadScreen = document.getElementById("cargarJuego");
LoadScreen.addEventListener("click", function() {
    const ProjectFox = document.getElementById("projectFox");
    const projectFox1 = document.getElementById("projectFox1");
    const projectFox2 = document.getElementById("projectFox2");
    const projectFox3 = document.getElementById("projectFox3");

    ProjectFox.removeChild(projectFox1);
    ProjectFox.removeChild(projectFox2);
    ProjectFox.removeChild(projectFox3);

    const NewScreen = document.createElement("section");
    NewScreen.setAttribute("class", "moduloZorroFeroz");
    NewScreen.setAttribute("id", "game");
    ProjectFox.appendChild(NewScreen);

    const ModuleGame = document.getElementById("game");
    const ImageStart = "../assets/images/project__zorroFeroz.jpg";
    const BtnStart = "../assets/zorroFeroz/boton__play.png";
    const BtnStart2 = "../assets/zorroFeroz/boton__play2.png";

    const LaunchImg = document.createElement("img");
    LaunchImg.setAttribute("src",ImageStart);
    LaunchImg.setAttribute("id", "imgLaunch");
    ModuleGame.appendChild(LaunchImg);

    const LaunchBtn = document.createElement("button");
    LaunchBtn.setAttribute("class","moduloZorroFeroz__start");
    LaunchBtn.setAttribute("id", "btnStart");
    ModuleGame.appendChild(LaunchBtn);

    const LaunchBtnImg = document.createElement("img");
    LaunchBtnImg.setAttribute("src",BtnStart);
    LaunchBtn.appendChild(LaunchBtnImg);

    const BtnGame = document.getElementById("btnStart");
    BtnGame.addEventListener("mouseenter", function(){
        LaunchBtnImg.setAttribute("src",BtnStart2);
    });
    BtnGame.addEventListener("mouseout", function(){
        LaunchBtnImg.setAttribute("src",BtnStart);
    });
    BtnGame.addEventListener("click", function(){
        LaunchBtnImg.setAttribute("src",BtnStart);
        setTimeout(function(){
            LaunchBtnImg.setAttribute("src",BtnStart2);
            lauchStart();
        },100);
    });

    function lauchStart() {
        ModuleGame.removeChild(LaunchBtn);

        const GameMenu = document.createElement("div");
        GameMenu.setAttribute("class", "moduloZorroFeroz__gameMenu");
        ModuleGame.appendChild(GameMenu);

        const BtnNewGame = document.createElement("button");
        BtnNewGame.setAttribute("id", "btnNewGame");
        GameMenu.appendChild(BtnNewGame);
        const TextBtnNewGame = document.getElementById("btnNewGame");
        TextBtnNewGame.innerText= "Nuevo Juego";

        const BtnExit = document.createElement("button");
        BtnExit.setAttribute("id", "btnExit");
        GameMenu.appendChild(BtnExit);
        const TextBtnExit = document.getElementById("btnExit");
        TextBtnExit.innerText= "Salir del Juego";

        TextBtnNewGame.addEventListener("click", function() {
            ModuleGame.removeChild(GameMenu);
            ModuleGame.removeChild(LaunchImg);

            const BaseGame = document.createElement("img");
            BaseGame.setAttribute("class", "moduloZorroFeroz__game");
            BaseGame.setAttribute("src", "../assets/zorroFeroz/farm.png");
            BaseGame.setAttribute("width", "1000px");
            BaseGame.setAttribute("height", "600px");
            ModuleGame.appendChild(BaseGame);

            startGame();
        });
        TextBtnExit.addEventListener("click", _ => { location.reload() });
    }

    function startGame() {
        const GameZone = document.createElement("canvas");
        GameZone.setAttribute("class", "moduloZorroFeroz__gameZone");
        GameZone.setAttribute("id", "foxFoxy");
        GameZone.setAttribute("width", "960px");
        GameZone.setAttribute("height", "440px");
        ModuleGame.appendChild(GameZone);

        const Farm = document.getElementById("foxFoxy");
        const FarmZone = Farm.getContext("2d");

        const Keys = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39};
        let aleatorioVacas, aleatorioCerdos, animales, nivel;
        let xStart, xEnd, yStart, yEnd, walking;
        let estado = "inicial";
        const anchoAnimal = 70;
        let Granja = [];
        let Ganado = [];
        let Piara = [];

        let Base = { url: "../assets/zorroFeroz/farm.png", cargaOK: false }
        let Fox = { url: "../assets/zorroFeroz/zorro.png", cargaOK: false };
        let Chicken = { url: "../assets/zorroFeroz/pollo.png", cargaOK: false };
        let Cow = { url: "../assets/zorroFeroz/vaca.png", cargaOK: false };
        let Pig = { url: "../assets/zorroFeroz/cerdo.png", cargaOK: false };

        Base.objeto = new Image();
        Base.objeto.src = Base.url;
        Base.objeto.addEventListener("load", loadBase);
        Fox.objeto = new Image();
        Fox.objeto.src = Fox.url;
        Fox.objeto.addEventListener("load", loadFox);
        Chicken.objeto = new Image();
        Chicken.objeto.src = Chicken.url;
        Chicken.objeto.addEventListener("load", loadChicken);
        Cow.objeto = new Image();
        Cow.objeto.src = Cow.url;
        Cow.objeto.addEventListener("load", loadCow);
        Pig.objeto = new Image();
        Pig.objeto.src = Pig.url;
        Pig.objeto.addEventListener("load", loadPig);

        function loadBase() {
            Base.cargaOK = true;
            cargar();
        }
        function loadFox() {
            Fox.cargaOK = true;
            cargar();
        }
        function loadChicken() {
            Chicken.cargaOK = true;
            cargar();
        }
        function loadCow() {
            Cow.cargaOK = true;
            cargar();
        }
        function loadPig() {
            Pig.cargaOK = true;
            cargar();
        }

        document.addEventListener("keyup", moverZorro);

        function cargar () {
            switch (estado) {
                case "inicial":
                    nivel = 0;
                    aleatorioVacas = aleatorio(1, 10);
                    aleatorioCerdos = aleatorio(1, 10);
                    animales = aleatorioVacas + aleatorioCerdos + 2;
                    for (let v = 0; v < animales; v++) {
                        let x = aleatorio(0, 12);
                        let y = aleatorio(0, 5);
                        Granja[v] = [x, y];
                        for(g in Granja) {
                            if(v != g) {
                                if(Granja[v][0] == Granja[g][0] && Granja[v][1] == Granja[g][1]) {
                                    Granja.pop();
                                    v--;
                                }
                            }
                        }
                    }
                    estado = "jugando";
                    break
                case "win":
                    borrarArray(Granja);
                    borrarArray(Ganado);
                    borrarArray(Piara);
                    nivel++;
                    aleatorioVacas = aleatorio(1, 10);
                    aleatorioCerdos = aleatorio(1, 10);
                    aleatorioVacas = aleatorioVacas + nivel;
                    aleatorioCerdos = aleatorioCerdos + nivel;
                    animales = aleatorioVacas + aleatorioCerdos + 2;
                    for (let v = 0; v < animales; v++) {
                        let x = aleatorio(0, 12);
                        let y = aleatorio(0, 5);
                        Granja[v] = [x, y];
                        for(g in Granja) {
                            if(v != g) {
                                if(Granja[v][0] == Granja[g][0] && Granja[v][1] == Granja[g][1]) {
                                    Granja.pop();
                                    v--;
                                }
                            }
                        }
                    }
                    estado = "jugando";
                    break
                case "lose":
                    borrarArray(Granja);
                    borrarArray(Ganado);
                    borrarArray(Piara);
                    nivel = 0;
                    aleatorioVacas = aleatorio(1, 10);
                    aleatorioCerdos = aleatorio(1, 10);
                    aleatorioVacas = aleatorioVacas + nivel;
                    aleatorioCerdos = aleatorioCerdos + nivel;
                    animales = aleatorioVacas + aleatorioCerdos + 2;
                    for (let v = 0; v < animales; v++) {
                        let x = aleatorio(0, 12);
                        let y = aleatorio(0, 5);
                        Granja[v] = [x, y];
                        for(g in Granja) {
                            if(v != g) {
                                if(Granja[v][0] == Granja[g][0] && Granja[v][1] == Granja[g][1]) {
                                    Granja.pop();
                                    v--;
                                }
                            }
                        }
                    }
                    estado = "jugando";
                    break;
            }
            if(Base.cargaOK) {
                FarmZone.drawImage(Base.objeto, -40, -105);
            }
            if (Chicken.cargaOK) {
                Chicken.x = Granja[0][0] * anchoAnimal;
                Chicken.y = Granja[0][1] * anchoAnimal;
                FarmZone.drawImage(Chicken.objeto, Chicken.x, Chicken.y);
            }
            if (Fox.cargaOK) {
                Fox.x = Granja[1][0] * anchoAnimal;
                Fox.y = Granja[1][1] * anchoAnimal;
                FarmZone.drawImage(Fox.objeto, Fox.x, Fox.y);
            }
            if (Cow.cargaOK) {
                for (v = 0; v < aleatorioVacas; v++) {
                    let x = v + 2;
                    Cow.x = Granja[x][0] * anchoAnimal;
                    Cow.y = Granja[x][1] * anchoAnimal;
                    let vaquita = [Cow.x,Cow.y];
                    Ganado[v] = vaquita;
                    FarmZone.drawImage(Cow.objeto, Cow.x, Cow.y);
                }
            }
            if (Pig.cargaOK) {
                for (c = 0; c < aleatorioCerdos; c++) {
                    let x = c + 2 + aleatorioVacas;
                    Pig.x = Granja[x][0] * anchoAnimal;
                    Pig.y = Granja[x][1] * anchoAnimal;
                    let cerdito = [Pig.x,Pig.y];
                    Piara[c] = cerdito;
                    FarmZone.drawImage(Pig.objeto, Pig.x, Pig.y);
                }
            }
        }

        function moverZorro(evento) {
            var movimiento = anchoAnimal;
            var x = Fox.x;
            var y = Fox.y;
            if(evento.keyCode == undefined){
                evento = evento;
            } else {
                evento = evento.keyCode;
            }
            switch(evento) {
                case Keys.UP:
                    if(Fox.y == 0){
                        Fox.y = Fox.y;
                    } else {
                        Fox.y = y - movimiento;
                    }
                    caminar(x, y, x, y - movimiento, FarmZone);
                    break;
                case Keys.DOWN:
                    if(Fox.y >= 300){
                        Fox.y = Fox.y;
                    } else {
                        Fox.y = y + movimiento;
                    }
                    caminar(x, y, x, y + movimiento, FarmZone);
                    break;
                case Keys.LEFT:
                    if(Fox.x == 0){
                        Fox.x = Fox.x;
                    } else {
                        Fox.x = x - movimiento;
                    }
                    caminar(x, y, x- movimiento, y, FarmZone);
                    break;
                case Keys.RIGHT:
                    if(Fox.x >= 820){
                        Fox.x = Fox.x;
                    } else {
                        Fox.x = x + movimiento;
                    }
                    caminar(x, y, x + movimiento, y, FarmZone);
                    break;
            }
        }

        function caminar(xi, yi, xf, yf, mapFarm) {
            mapFarm.beginPath();
            mapFarm.moveTo(xi, yi);
            mapFarm.lineTo(xf, yf);
            mapFarm.closePath();
            if(Base.cargaOK) {
                mapFarm.drawImage(Base.objeto, -40, -105);
            }
            if (Chicken.cargaOK) {
                mapFarm.drawImage(Chicken.objeto, Chicken.x, Chicken.y);
            }
            if (Cow.cargaOK) {
                for (positionVaca in Ganado) {
                    Cow.x = Ganado[positionVaca][0];
                    Cow.y = Ganado[positionVaca][1];
                    mapFarm.drawImage(Cow.objeto, Cow.x, Cow.y);
                }
            }
            if (Pig.cargaOK) {
                for (positionCerdo in Piara) {
                    Pig.x = Piara[positionCerdo][0];
                    Pig.y = Piara[positionCerdo][1];
                    mapFarm.drawImage(Pig.objeto, Pig.x, Pig.y);
                }
            }
            if (Fox.cargaOK) {
                mapFarm.drawImage(Fox.objeto, Fox.x, Fox.y);
                setTimeout(comprobar, 50);
                function comprobar() {
                    if(Fox.x == Chicken.x && Fox.y == Chicken.y) {
                        alert("Atrapaste al pollito");
                        estado = "win";
                        cargar();
                    } else {
                        for(i = 2; i < Granja.length; i++) {
                            var x = Granja[i][0] * anchoAnimal;
                            var y = Granja[i][1] * anchoAnimal;
                            if(Fox.x == x && Fox.y == y) {
                                alert("No es un pollo, has perdido");
                                estado = "lose";
                                cargar();
                            }
                        }
                    }
                }
            }
        }
    }
})





function aleatorio(min, max) {
    var resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    return resultado;
}

function borrarArray(array) {
    for (var x = array.length; x > 0; x--) {
        array.pop();
    }
}