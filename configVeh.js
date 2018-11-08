/*
Ing. Daniel Clarke
djclarke.speaight@gmail.com




Especificaciones técnicas:

- las medidas de longitud están expresadas en centimetros [CM]
- la escala de la representación gráfica es de 1px = 2cm
- las medidas de masa (comunmente referido como peso) se expresan en kilogramos [KG] 
*/

var pMaxVeh = 30000;
var pMaxCombo = 75000;

var defAxleGroup = [ //pMaxEjes
	//#, config_ejes, tipo_rodado, tipo_rodado-text, peso_max, peso_tolerancia, sep_min, sep_max
	[0, 'Ninguno', '0', '0', 0, 0, 0, 0],
	[1, 'Simple', 'S', 'Simple', 6000, 500, 0, 0],
	[1, 'Simple', 'D', 'Dual', 10500, 1000, 0, 0],
	[1, 'Simple', 'W', 'Superancha', 8000, 1000, 0, 0],
	[2, 'Tándem', 'SS', 'Simple-Simple', 10000, 1500, 120, 240],
	[2, 'Tándem', 'SD', 'Simple-Dual', 14000, 1500, 120, 240],
	[2, 'Tándem', 'DD', 'Doble Dual', 18000, 1500, 120, 240],
	[2, 'Tándem', 'WW', 'Doble Superancha', 16000, 1500, 120, 240],
	[2, 'Tándem', 'S+S', '1+1 Simples', 12000, 1000, 240, 480],
	[2, 'Tándem', 'D+D', '1+1 Dual-Dual', 21000, 2000, 240, 480],
	[2, 'Tándem', 'W+W', '1+1 Superancha', 16000, 2000, 240, 480],
	[3, 'Triple', 'SDD', 'Simple-Dual-Dual', 21000, 2000, 240, 480],
	[3, 'Triple', 'DDD',  'Triple Dual', 25500, 2000, 240, 480],
	[3, 'Triple', 'WWW', 'Triple Superancha', 24000, 2000, 240, 480],
	[3, 'Triple', 'D+D+D', '1+1+1 Duales', 31500, 2000, 480, 580],
	[3, 'Triple', 'W+W+W', '1+1+1 Superanchas', 24000, 2000, 480, 580]
];

var init = { 
	chasis: {
		grupo: [
			{config: 1, configPermitido: [1, 2], rodado: "S", sep: 0, tara: 4700},
			{config: 1,	configPermitido: [1, 2, 3], rodado: "D", sep: 0, tara: 1700}
		],
		distGrp12: 470,
		distCarga0: 72,
		distCargaF: 600
	},
	tractor: {
		grupo: [
			{config: 1, configPermitido: [1, 2], rodado: "S", sep: 0, tara: 4900},
			{config: 1,	configPermitido: [1, 2, 3], rodado: "D", sep: 0, tara: 2500}
		],
		distGrp12: 360,
		distGrp25: 40,
		distCarga0: 210,
		distCargaF: 200
	},
	semi: {
		grupo: [
			{config: 2, configPermitido: [1, 2, 3], rodado: "DD", sep: 1400, tara: 4900},
			{config: 1,	configPermitido: [0, 1], rodado: "D", sep: 0, tara: 0}
		],
		distGrp35: 650,
		distGrp34: 240,
		distCarga05: 210,
		distCarga0F: 1200
	}
};

// Archivos de imagen compuesta para Chasis
var imgCompositePath = "imgComposite/";
var imgComposite = {
	chasis: [
		["chasisTraseroimg", imgCompositePath+"chasisTrasero.png", "inline", -266],
		["chasisDelanteimg", imgCompositePath+"chasisDelante.png", "inline", -74],
		["chasis12img", imgCompositePath+"semiEje.png", "none", -60],
		["chasis21img", imgCompositePath+"semiEje.png", "inline", -60],
		["chasis22img", imgCompositePath+"semiEje.png", "none", -60],
		["chasis23img", imgCompositePath+"semiEje.png", "none", -60],
	],
	tractor: [
		["tractorTraseroimg", imgCompositePath+"tractorTrasero.png", "inline", -186],
		["tractorDelanteimg", imgCompositePath+"tractorDelante.png", "inline", -74],
		["tractor12img", imgCompositePath+"semiEje.png", "none", -60],
		["tractor21img", imgCompositePath+"semiEje.png", "inline", -60],
		["tractor22img", imgCompositePath+"semiEje.png", "none", -60],
		["tractor23img", imgCompositePath+"semiEje.png", "none", -60],
	],
	semi: [
		["semiTraseroimg", imgCompositePath+"semiTrasero.png", "inline", -423],
		["semiDelanteimg", imgCompositePath+"semiDelante.png", "inline", -23],
		["semi21img", imgCompositePath+"semiEje.png", "inline", -60],
		["semi11img", imgCompositePath+"semiEje.png", "inline", -60],
		["semi12img", imgCompositePath+"semiEje.png", "none", -60],
		["semi13img", imgCompositePath+"semiEje.png", "none", -60],
	],
};
