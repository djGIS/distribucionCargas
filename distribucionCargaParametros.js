// Parametros de ajuste de ubicación en pantalla
var posBaseLine = 100;
var posCajaLine = 60;
var posEjesLine = 370;
var posPisoCaja = 250;

// Parametros de inicialización
var sepGrp1init = 0;
var distGrp12init = 3500;
var sepGrp2init = 0;
var distCarga0init = 720;
var distCargaFinit = 6000;

var tractorInit = {
	configGrp1: 1,
	rodadoGrp1: "S",
    sepGrp1: 0,
    distGrp12: 3500,
	configGrp2: 1,
	rodadoGrp2: "D",
    sepGrp2: 0,
    distEng: -460,
	distCarga0: 2500,
	distCargaF: 4000
};

var semiInit = {
	distEng: 690,
	distEngGrp3: 6600,
	configGrp3: 2,
	rodadoGrp3: "D",
    sepGrp3: 1400,
	distGrpL3: 2800,
    configGrpL: 0,
	rodadoGrpL: "",
    sepGrpL: 0,
	distCarga0: 0,
	distCargaF: 9000
};
