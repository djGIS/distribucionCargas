// Parametros de ajuste de ubicación en pantalla
var posBaseLine = 100;
var posCajaLine = 60;
var posEjesLine = 370;
var posPisoCaja = 250;

// Parametros de inicialización
var sepGrp1init = 0;
var distGrp12init = 4700;
var sepGrp2init = 0;
var distCarga0init = 720;
var distCargaFinit = 6000;
	
var inputBoxPad = "text-align: right;";
	
var tiposVeh = ['Chasis', 'Semi', 'Tractor'];

// Tabla de constantes de configuraciones de ejes	
var pMaxEjes = [
	//#, config_ejes, tipo_rodado, tipo_rodado-text, peso_max, peso_tolerancia, sep_min, sep_max
	[1, 'Simple', 'S', 'Simple', 6000, 500, 0, 0],
	[1, 'Simple', 'D', 'Dual', 10500, 1000, 0, 0],
	[1, 'Simple', 'SA', 'Superancha', 8000, 1000, 0, 0],
	[2, 'Tándem', '2S', 'Simple-Simple', 10000, 1500, 1200, 2400],
	[2, 'Tándem', 'SD', 'Simple-Dual', 14000, 1500, 1200, 2400],
	[2, 'Tándem', '2D', 'Doble Dual', 18000, 1500, 1200, 2400],
	[2, 'Tándem', '2SA', 'Doble Superancha', 16000, 1500, 1200, 2400],
	[3, 'Triple', 'S2D', 'Simple-Dual-Dual', 21000, 2000, 2400, 4800],
	[3, 'Triple', '3D',  'Triple Dual', 25500, 2000, 2400, 4800],
	[3, 'Triple', '3SA', 'Triple Superancha', 24000, 2000, 2400, 4800],
	[4, 'Separados', '1+1S', '1+1 Simples', 12000, 1000, 2400, 4800],
	[4, 'Separados', '1+1D', '1+1 Dual-Dual', 21000, 2000, 2400, 4800],
	[4, 'Separados', '1+1SA', '1+1 Superancha', 16000, 2000, 2400, 4800],
];
	
// Dimensiones del vehículo
var inputBoxes = [
	//id, value, min, max, top, left, width, formatting, display
	["sepGrp1input", sepGrp1init, 0, 2400, posEjesLine - 30, posBaseLine - 88, 60, inputBoxPad, "none"],
	["distGrp12input", distGrp12init, 0, 10500, posEjesLine - 10, posBaseLine + 83, 70, inputBoxPad, "inline"],
	["sepGrp2input", sepGrp2init, 0, 2400, posEjesLine - 10, posBaseLine + 332, 60, inputBoxPad, "none"],
	["distCarga0input", distCarga0init, 500, 3000, posCajaLine - 10, posBaseLine - 88, 60, inputBoxPad, "inline"],
	["distCargaFinput", distCargaFinit, 4000, 12000, posCajaLine - 10, posBaseLine + 151, 70, inputBoxPad, "inline"],
	["distCarga", distCargaFinit / 2, 0, 6000, "position: absolute; top: 51px; width: 70px; padding: 5px", 151],
];

// Lineas de dimensiones del dibujo
var dimLines = [
	//id, top, left, width, height, lineStyle, display, class
	["lineaBase", 0, posBaseLine, 0, posPisoCaja, "border-left-style: dashed; border-left-width: 1px;", "inline", ""],
	["cajaCarga", 0, posBaseLine + (inputBoxes[3][1] / 20), (inputBoxes[4][1] / 20) - 2, posPisoCaja, "border-left-style: dashed; border-left-width: 1px; border-right-style: dashed; border-right-width: 1px;", "inline", ""],
	["lineaCajaT1", posCajaLine - 3, posBaseLine - 18, 0, 0, "", "inline", "triangle_right"],
	["lineaCajaT2", posCajaLine - 3, posBaseLine + (inputBoxes[3][1] / 20) - 1, 0, 0, "", "inline", "triangle_left"],
	["lineaCajaT3", posCajaLine - 3, posBaseLine + (inputBoxes[3][1] / 20) + (inputBoxes[4][1] / 20) - 19, 0, 0, "", "inline", "triangle_right"],
	["lineaCaja1", posCajaLine, posBaseLine - 29, (inputBoxes[3][1] / 20) + (inputBoxes[4][1] / 40) + 29 - 35, 0, "border-top-style: solid; border-top-width: 1px;", "inline", ""],
	["lineaCaja2", posCajaLine, posBaseLine + (inputBoxes[3][1] / 20) + (inputBoxes[4][1] / 40) + 35, (inputBoxes[4][1] / 40) - 35, 0, "border-top-style: solid; border-top-width: 1px;", "inline", ""],
	["lineaEjesT1", posEjesLine - 3, posBaseLine, 0, 0, "", "inline", "triangle_left"],
	["lineaEjesT2", posEjesLine - 3, posBaseLine + (inputBoxes[1][1] / 20) - 19, 0, 0, "", "inline", "triangle_right"],
	["lineaEjesT3", posEjesLine - 3, posBaseLine + (inputBoxes[1][1] / 20) + (inputBoxes[2][1] / 20), 0, 0, "", "none", "triangle_left"],
	["lineaEjes1", posEjesLine, posBaseLine, (inputBoxes[1][1] / 40) - 35, 0, "border-top-style: solid; border-top-width: 1px;", "inline", ""],
	["lineaEjes2", posEjesLine, posBaseLine + (inputBoxes[1][1] / 40) + 35, (inputBoxes[1][1] / 40) - 35, 0, "border-top-style: solid; border-top-width: 1px;", "inline", ""],
	["lineaEjes3", posEjesLine, posBaseLine + (inputBoxes[1][1] / 20), (inputBoxes[2][1] / 40) + 29, 0, "border-top-style: solid; border-top-width: 1px;", "none", ""],
	["entreGrupos", posPisoCaja, posBaseLine, (inputBoxes[1][1] / 20) - 2, 150, "border-left-style: dashed; border-left-width: 1px; border-right-style: dashed; border-right-width: 1px;", "inline", ""],
	["entreEjes1", posPisoCaja, posBaseLine, (inputBoxes[0][1] / 20) - 2, 150, "border-left-style: dashed; border-left-width: 1px; border-right-style: dashed; border-right-width: 1px;", "none", ""],
	["entreEjes2", posPisoCaja, posBaseLine + (inputBoxes[1][1] / 20), (inputBoxes[2][1] / 20) - 2, 150, "border-right-style: dashed; border-right-width: 1px;", "none", ""],
	["lineaGrpT1", posEjesLine - 23, posBaseLine, 0, 0, "", "none", "triangle_left"],
	["lineaGrpT2", posEjesLine - 23, posBaseLine + (inputBoxes[0][1] / 20) - 19, 0, 0, "", "none", "triangle_right"],
	["lineaGrp1", posEjesLine - 20, posBaseLine - 29, (inputBoxes[0][1] / 20) + 29, 0, "border-top-style: solid; border-top-width: 1px;", "none", ""],
];
	
// Archivos de imagen compuesta para Chasis
var imgComposite = [
	//["ChasisTraseroimg", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/chasisTraseroN.png", "inline", (distCargaFinit / 20) - 234],
	//["ChasisDelanteimg", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/chasisDelanteN.png", "inline", -74],
	//["Chasis12img", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/chasisDireccion2N.png", "none", 10],
	//["Chasis21img", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/chasisTraccion1N.png", "inline", 79],
	//["Chasis22img", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/chasisTraccion2N.png", "none", 46],
	//["Chasis23img", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/chasisTraccion2N.png", "none", 116],
	["TractorTrasero", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/tractorTrasero.png", "inline", 116],
	["TractorDelante", "http://www.fadeeac.org.ar/images/imagenes/Departamentos/TecnicosInfraestructura/webappDistribPeso/tractorDelantero.png", "inline", 116],
];
	
// Pesos de los grupos y cargas
var pGrupos = [
	["Carga", 1, "", 0, 9000],
	["Dir", 1, "S", 4700, 6000],
	["Trac", 1, "D", 1700, 10500],
];
	
var menuButtons = [
	["menuOpVehiculos", "Opciones de Vehículos", false, "19%"],
	["menuOpDiagCarga", "Recalcular Diagrama de Carga", true, "27%"],
	["menuOpEjCarga", "Ejemplo de Distribución", false, "27%"],
	["menuOpEjDescarga", "Ejemplo de Descarga Parcial", false, "27%"],
];
	
function calcularTractor () {
		// Dimensiones
		var sepGrp1 = 0;
		var sepGrp2 = Number(document.getElementById("Tractor2sep").value);
		var distGrp12 = Number(document.getElementById("distGrp12inputTractor").value);
		//var distCarga0 = Number(document.getElementById("distCarga0inputTractor").value);
		//var distCargaCG = 3400;
		//var distCargaF = Number(document.getElementById("distCargaFinput").value);
		
		// Pesos
		var pMaxGrp1 = Number(document.getElementById("Tractor1pMax").value); 
		var pTolGrp1 = Number(document.getElementById("Tractor1pTol").value);
		var pTarGrp1 = Number(document.getElementById("Tractor1pTar").value);
		var pMaxGrp2 = Number(document.getElementById("Tractor2pMax").value);
		var pTolGrp2 = Number(document.getElementById("Tractor2pTol").value);
		var pTarGrp2 = Number(document.getElementById("Tractor2pTar").value);
		var datosGrafico = [];
		
		for (var i = -20; i <= 20; i++) {
			var dataSet0 = i*0.1;
			
			//Carga maxima permisible
			var dataSet1 = 0.001*((pMaxGrp1 + pMaxGrp2) - (pTarGrp1 + pTarGrp2));
			var dataSet6 = dataSet1;
			
			//Peso maximo eje delantero
			var dataSet2 = 0.001*Math.round((pMaxGrp1+pTolGrp1-pTarGrp1)*(sepGrp1/2+distGrp12+sepGrp2)/(sepGrp2-i*100));
			if (dataSet2 < 0) {
				dataSet2 = null;
			} else {
				dataSet6 = Math.min(dataSet6, dataSet2);
			}
			
			//Peso maximo eje trasero
			var dataSet3 = 0.001*Math.round((pMaxGrp2+pTolGrp2-pTarGrp2)*(sepGrp1+distGrp12+sepGrp2/2)/(sepGrp1+distGrp12+i*100));
			if (dataSet3 < 0) {
				dataSet3 = null;
			} else {
				dataSet6 = Math.min(dataSet6, dataSet3);
			}
			
			//Peso sobre eje delantero
			var pMin1 = 0.2;
			var dataSet4 = 0.001*Math.round(((pMin1*(pMaxGrp1+pMaxGrp2)-pTarGrp1)*(sepGrp1/2+distGrp12+sepGrp2)+(pMaxGrp2-pTarGrp2)*(sepGrp2/2))/(sepGrp2-i*100));
			if (dataSet4 < 0) {
				dataSet4 = null;
			} else {
				dataSet6 = Math.min(dataSet6, dataSet4);
			}
			
			//Peso sobre eje de tracción
			var pMin2 = 0.2;
			var n = 1;
			var dataSet5=0.001*Math.round(((pMin2*(pMaxGrp1+pMaxGrp2)-pTarGrp2)*(sepGrp1+distGrp12+sepGrp2/2)+(pMaxGrp1-pTarGrp1)*(sepGrp1/2))/(sepGrp1+distGrp12+i*100));
			//if (dataSet5 < 0) {
			//	var dataSet5 = null;
			//} else {
			//	dataSet6 = Math.min(dataSet6, dataSet5);
			//}
			
			datosGrafico.push([dataSet0, dataSet1, dataSet2, dataSet3, dataSet4, dataSet5, dataSet6]);		
		}
		drawChart(datosGrafico,-2,2);
		//drawChart(datosGrafico, 0, 0.001 * inputBoxes[4][1]);
}

	
function cargarSelectConfig (listaFuente) {
	var fieldName = listaFuente.id;
	fieldName = fieldName.substring(0, fieldName.length - 1);
	var configSelect = document.getElementById(fieldName + "c");
		
	for(var i = configSelect.options.length-1; i >= 0; i--) {
		configSelect.remove(i);
	}
		
	for (var i = 0; i < pMaxEjes.length; i++) {
		if (pMaxEjes[i][0] == listaFuente.value) {
			var option = document.createElement("option");
			option.text = pMaxEjes[i][3];
			option.value = pMaxEjes[i][2];
			configSelect.add(option);
		}
	}
		
	cargarTablaPesos(configSelect);
		
	if (listaFuente.id == "Chasis1e") {
		if (listaFuente.value == 2) {
			imgComposite[2][2] = 'inline';
			document.getElementById("sepGrp1input").min = 1200;
			document.getElementById("sepGrp1input").value = 1400;
			inputBoxes[0][8] = 'inline';
			dimLines[14][6] = 'inline';
			dimLines[16][6] = 'inline';
			dimLines[17][6] = 'inline';
			dimLines[18][6] = 'inline';
		} else if (listaFuente.value == 1) {
			imgComposite[2][2] = 'none';
			document.getElementById("sepGrp1input").min = 0;
			document.getElementById("sepGrp1input").value = 0;
			inputBoxes[0][8] = 'none';
			dimLines[14][6] = 'none';
			dimLines[16][6] = 'none';
			dimLines[17][6] = 'none';
			dimLines[18][6] = 'none';
		}
	}
			
	if (listaFuente.id == "Chasis2e") {
		if (listaFuente.value == 3) {
			imgComposite[4][2] = 'inline';
			imgComposite[5][2] = 'inline';
			document.getElementById("sepGrp2input").min = 2400;
			document.getElementById("sepGrp2input").max = 4800;
			document.getElementById("sepGrp2input").value = 2800;
			inputBoxes[2][8] = 'inline';
			dimLines[9][6] = 'inline';
			dimLines[12][6] = 'inline';
			dimLines[15][6] = 'inline';
		} else if (listaFuente.value == 2) {
			imgComposite[4][2] = 'inline';
			imgComposite[5][2] = 'none';
			document.getElementById("sepGrp2input").min = 1200;
			document.getElementById("sepGrp2input").value = 1400;
			inputBoxes[2][8] = 'inline';
			dimLines[9][6] = 'inline';
			dimLines[12][6] = 'inline';
			dimLines[15][6] = 'inline';
		} else if (listaFuente.value == 1) {
			imgComposite[4][2] = 'none';
			imgComposite[5][2] = 'none';
			document.getElementById("sepGrp2input").min = 0;
			document.getElementById("sepGrp2input").value = 0;
			inputBoxes[2][8] = 'none';
			dimLines[9][6] = 'none';
			dimLines[12][6] = 'none';
			dimLines[15][6] = 'none';
		}	
	}
		
	dimChasis();
}
	
function cargarTablaPesos (listaFuente) {
	var fieldName = listaFuente.id;
	fieldName = fieldName.substring(0, fieldName.length - 1);
	
	for (var i = 0; i < pMaxEjes.length; i++) {
		if (pMaxEjes[i][2] == listaFuente.value) {
			document.getElementById(fieldName + "pMax").value = pMaxEjes[i][4];
			document.getElementById(fieldName + "pTol").value = pMaxEjes[i][5];
		}
	}
}
	
function dimErrCheck() {
	var flag = false;
	
	for (var i = 0; i < inputBoxes.length - 1; i++) {
		
		var val = Number(document.getElementById(inputBoxes[i][0]).value);
		var min = Number(document.getElementById(inputBoxes[i][0]).min);
		var max = Number(document.getElementById(inputBoxes[i][0]).max);
		
		if (val < min) {
			flag = true;
			document.getElementById(inputBoxes[i][0]).style.backgroundColor = "#F78181";
		} else if (val > max) {
			flag = true;
			document.getElementById(inputBoxes[i][0]).style.backgroundColor = "#F78181";
		} else {
			document.getElementById(inputBoxes[i][0]).style.backgroundColor = "#FFFFFF";
		}
	}
		
	if (flag == false){
		dimChasis();
	}
}

function dimChasis() {
	var posLeft = 0;
	var width = 0;
	
	// Actualizar los valores de dimensiones
	inputBoxes[0][1] = Number(document.getElementById(inputBoxes[0][0]).value);
	inputBoxes[1][1] = Number(document.getElementById(inputBoxes[1][0]).value);
	inputBoxes[2][1] = Number(document.getElementById(inputBoxes[2][0]).value);
	inputBoxes[3][1] = Number(document.getElementById(inputBoxes[3][0]).value);
	inputBoxes[4][1] = Number(document.getElementById(inputBoxes[4][0]).value);
	inputBoxes[5][3] = inputBoxes[4][1];
	
	var distGrp12 = inputBoxes[1][1] / 20;
	var distCarga0 = inputBoxes[3][1] / 20;
	var distCargaF = inputBoxes[4][1] / 20;
			
	// Dimensionamiento por modificación de tamaño y posción de caja de carga
	posLeft = Math.round(posBaseLine + imgComposite[0][3] + distCarga0 + distCargaF - (distCarga0init + distCargaFinit) / 20);
	document.getElementById(imgComposite[0][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[0][2] + ";";
	
	inputBoxes[4][5] = Math.round(posBaseLine + distCarga0 + (distCargaF - inputBoxes[4][6]) / 2);
	
	posLeft = posBaseLine + (inputBoxes[3][1] / 20);
	document.getElementById("ChasisGraf").style = "position: absolute; top: 100px; left: " + posLeft + "px; width: 100%;";
	
	dimLines[1][2] = posBaseLine + distCarga0;
	dimLines[1][3] = distCargaF - 2;
	dimLines[3][2] = posBaseLine + distCarga0 - 1; 
	dimLines[4][2] = posBaseLine + distCarga0 + distCargaF - 19; 
	dimLines[5][3] = distCarga0 + (distCargaF / 2) + 29 - 35;
	dimLines[6][2] = posBaseLine + distCarga0 + (distCargaF / 2) + 35; 
	dimLines[6][3] = (distCargaF / 2) - 35;
	
	// Dimensionamiento por modificación de separación de los ejes delanteros
	if (inputBoxes[0][1] != 0) {
		var dimSepGrp1 = inputBoxes[0][1] / 40;
	} else {
		var dimSepGrp1 = 0;
	}
	
	posLeft = Math.round(posBaseLine + (dimSepGrp1 * 2) - 60);
	document.getElementById(imgComposite[2][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[2][2] + ";";
	width = Math.max(120, 120 + (inputBoxes[0][1] - 1200) / 10);
	posLeft = posBaseLine + dimSepGrp1 - width / 2 - 5;
	document.getElementById("tablaDireccion").style = "position: absolute; left: " + posLeft + "px; top: 303px; width: " + width + "px;";
	
	dimLines[14][3] = (dimSepGrp1 * 2) - 1;
	dimLines[17][2] = posBaseLine + (dimSepGrp1 * 2) - 19;
	dimLines[18][3] = (dimSepGrp1 * 2) + 29;
	
	// Dimensionamiento por modificación de la distancia entre grupos
	posLeft = posBaseLine + (inputBoxes[1][1] - distGrp12init) / 20 + 80;
	document.getElementById(imgComposite[3][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[3][2] + ";";
	
	inputBoxes[1][5] = Math.round(posBaseLine + (distGrp12 - inputBoxes[1][6]) / 2);
	
	dimLines[8][2] = posBaseLine + (inputBoxes[1][1] / 20) - 19;
	dimLines[10][3] = (inputBoxes[1][1] / 40) - 35;
	dimLines[11][2] = posBaseLine + (inputBoxes[1][1] / 40) + 35;
	dimLines[11][3] = (inputBoxes[1][1] / 40) - 35;
	dimLines[13][3] = (inputBoxes[1][1] / 20 ) - 2;
	
	// Dimensionamiento por modificación de separación de los ejes traseros
	if (inputBoxes[2][1] != 0) {
		var dimSepGrp2 = inputBoxes[2][1] / 40;
	} else {
		var dimSepGrp2 = 0;
	}
	var config2 = document.getElementById("Chasis2e").value - 1;
	posLeft = Math.round(posBaseLine + (dimSepGrp2 * 2 / config2) + (inputBoxes[1][1] / 20) - 258);
	document.getElementById(imgComposite[4][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[4][2] + ";";
	posLeft = Math.round(posBaseLine + (dimSepGrp2 * 2) + (inputBoxes[1][1] / 20) - 258);
	document.getElementById(imgComposite[5][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[5][2] + ";";
	width = Math.max(120, 120 + (inputBoxes[2][1] - 1200) / 10);
	posLeft = posBaseLine + distGrp12 + dimSepGrp2 - width / 2 - 5;//dimSepGrp2 - 65;
	document.getElementById("tablaTraccion").style = "position: absolute; left: " + posLeft + "px; top: 303px; width: " + width + "px;";
	
	inputBoxes[2][5] = posBaseLine + (dimSepGrp2 * 2) + (inputBoxes[1][1] / 20) + 29;
		
	dimLines[9][2] = posBaseLine + (inputBoxes[1][1] / 20) + (dimSepGrp2 * 2);
	dimLines[12][2] = posBaseLine + (inputBoxes[1][1] / 20);
	dimLines[12][3] = (dimSepGrp2 * 2) + 29;
	dimLines[15][2] = posBaseLine + (inputBoxes[1][1] / 20);
	dimLines[15][3] = dimSepGrp2 * 2;
		
	for (var i = 0; i < dimLines.length; i++) {
		document.getElementById(dimLines[i][0]).style = "position: absolute; top: " + dimLines[i][1] + "px; left: " + dimLines[i][2] + "px; width: " + dimLines[i][3] + "px; height: " + dimLines[i][4] + "px; " + dimLines[i][5] + " display: " + dimLines[i][6] + ";";
	}
		
	for (var i = 0; i < inputBoxes.length - 1; i++) {
		document.getElementById(inputBoxes[i][0]).style = "position: absolute; top: " + inputBoxes[i][4] + "px; left: " + inputBoxes[i][5] + "px; width: " + inputBoxes[i][6] + "px; " + inputBoxes[i][7] + " display: " + inputBoxes[i][8] + ";";
	}
}
	
var x1;
var left1;
var widthCarga;
	
function calcularCarga() {
	x1 = event.clientX;
	left1 = document.getElementById("Carga").style.left;
	left1 = Number(left1.substring(0, left1.length - 2));
	widthCarga = document.getElementById("Carga").style.width;
	widthCarga = Number(widthCarga.substring(0, widthCarga.length - 2));
	window.addEventListener("mousemove", moverCarga);
}
	
function removeEvMousemove () {
	window.removeEventListener("mousemove", moverCarga);
}
	
function moverCarga() {
	var x2 = event.clientX;
	var minX = posBaseLine + inputBoxes[3][1] / 20; 
	var maxX = minX + widthCarga - 8;
	
	window.addEventListener("mouseup", removeEvMousemove); 
		
	var left2 = left1 + x2 - x1; 
		if (left2 < minX) {
			left2 = minX;
			window.removeEventListener("mousemove", moverCarga);
		} else if (left2 > maxX) {
			left2 = maxX;
			window.removeEventListener("mousemove", moverCarga);
		}			
			
	var posTop = 250 - 59;
	document.getElementById("Carga").style = "position: absolute; top: " + posTop + "px; left: " + left2 + "px; width: 150px; height: 50px; border-style: solid; border-width: 4px; border-color: #8A4B08; background-color: #F7BE81; opacity: 0.6";
		
	tratarCalcularCargas();
}
	
function tratarCalcularCargas () {
	var leftCarga = document.getElementById("Carga").style.left;
	leftCarga = Number(leftCarga.substring(0, leftCarga.length - 2));
	widthCarga = document.getElementById("Carga").style.width;
	widthCarga = Number(widthCarga.substring(0, widthCarga.length - 2));
	var distCarga = (leftCarga + (widthCarga / 2) + 4 - posBaseLine) * 20 - inputBoxes[3][1];

	calcularCargas (distCarga, Number(document.getElementById("CargaPinput").value));
}
	
function calcularCargas (distCarga, pCarga) {
	// Dimensiones
	var sepGrp1 = inputBoxes[0][1];
	var sepGrp2 = inputBoxes[2][1];
	var distGrp12 = inputBoxes[1][1];
	var distCarga0 = inputBoxes[3][1];
	var distCargaF = inputBoxes[4][1];
		
	// Pesos
	var pMaxGrp1 = Number(document.getElementById("Chasis1pMax").value);
	var pTolGrp1 = Number(document.getElementById("Chasis1pTol").value);
	var pTarGrp1 = Number(document.getElementById("Chasis1pTar").value);
	var pMaxGrp2 = Number(document.getElementById("Chasis2pMax").value);
	var pTolGrp2 = Number(document.getElementById("Chasis2pTol").value);
	var pTarGrp2 = Number(document.getElementById("Chasis2pTar").value);
	
	p1 = Math.round((pCarga*(distGrp12+sepGrp2/2-distCarga0-distCarga)/(distGrp12+sepGrp2/2-sepGrp1/2))+pTarGrp1);
	p2 = Math.round((pCarga*(distCarga0+distCarga-sepGrp1/2)/(distGrp12+sepGrp2/2-sepGrp1/2))+pTarGrp2);
	document.getElementById("Chasis1p").value = p1;
	document.getElementById("Chasis2p").value = p2;
	
	verifPesos();
}
	
function verifPesos () {
	var p1 = Number(document.getElementById("Chasis1p").value);
	var p2 = Number(document.getElementById("Chasis2p").value);
		
	var configDir = Number(document.getElementById("Chasis1e").value);
	var configTrac = Number(document.getElementById("Chasis2e").value);
	var configTotal = configDir + configTrac;
		
	// Pesos
	var pMaxGrp1 = Number(document.getElementById("Chasis1pMax").value);
	var pTolGrp1 = Number(document.getElementById("Chasis1pTol").value);
	var pTarGrp1 = Number(document.getElementById("Chasis1pTar").value);
	var pMaxGrp2 = Number(document.getElementById("Chasis2pMax").value);
	var pTolGrp2 = Number(document.getElementById("Chasis2pTol").value);
	var pTarGrp2 = Number(document.getElementById("Chasis2pTar").value);
	
	// Peso minimo sobre dirección según configuración del ejes
	var pMin1;
	if (configTotal == 2) {
		pMin1 = 0.3;
	} else if (configTotal == 3) {
		pMin1 = 0.25;
	} else {
		pMin1 = 0.2;
	}
	
	if (p1 < pMin1*(p1 + p2)) {
		document.getElementById("Chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
	} else if (p1 > (pMaxGrp1+pTolGrp1)){
		document.getElementById("Chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FA5858";
	} else if (p1 > (pMaxGrp1)){
		document.getElementById("Chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
	} else {
		document.getElementById("Chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #D0FA58";
	}
	
	var pMin2 = 0.15;
	var nTrac = 1;
	var nGrp2 = configTrac;	
	if (p2 < pMin2*nTrac*(p1 + p2)/nGrp2) {
		document.getElementById("Chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
	} else if (p2 > (pMaxGrp2+pTolGrp2)){
		document.getElementById("Chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FA5858";
	} else if (p2 > (pMaxGrp2)){
		document.getElementById("Chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
	} else {
		document.getElementById("Chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #D0FA58";
	}
}
	
function inicializarChasis () {
	var posLeft = 0;
	var posTop = 0;
	var width = 0;
		
	// Dibujo del area de diagrama de carga con imagen compuesta de chasis 
	var diagArea = document.createElement("div");
	diagArea.id = "ChasisDiagrama";
	diagArea.style = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%"
	document.getElementById("Diagrama").appendChild(diagArea);
				
	for (var i = 0; i < dimLines.length; i++) {
		var dimLine = document.createElement("div");
		dimLine.id = dimLines[i][0];
		dimLine.style = "position: absolute; top: " + dimLines[i][1] + "px; left: " + dimLines[i][2] + "px; width: " + dimLines[i][3] + "px; height: " + dimLines[i][4] + "px; " + dimLines[i][5] + " display: " + dimLines[i][6] + ";";
		document.getElementById(diagArea.id).appendChild(dimLine);
		if (dimLines[i][7] != "") {
			document.getElementById(dimLine.id).setAttribute("class", dimLines[i][7]);
		}
	}
						
	for (var i = 0; i < imgComposite.length; i++) {
		var imgChasis = document.createElement("img");
		imgChasis.id = imgComposite[i][0]; 
		imgChasis.src = imgComposite[i][1];	
		posLeft = posBaseLine + imgComposite[i][3];
		imgChasis.style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[i][2] + ";";
		document.getElementById(diagArea.id).appendChild(imgChasis);
	}
		
	var grafArea = document.createElement("div");
	grafArea.id = "ChasisGraf"; 
	posLeft = posBaseLine + (inputBoxes[3][1] / 20);
	grafArea.style = "position: absolute; top: 100px; left: " + posLeft + "px; width: 100%;";  //
	document.getElementById(diagArea.id).appendChild(grafArea);
				
	// Cargar controles para dimensiones del Chasis
	for (var i = 0; i < inputBoxes.length - 1; i++) {
		var inputBox = document.createElement("input");
		inputBox.id = inputBoxes[i][0];
		inputBox.type = "number"; 
		inputBox.value = inputBoxes[i][1];
		inputBox.min = inputBoxes[i][2];
		inputBox.max = inputBoxes[i][3];
		inputBox.style = "position: absolute; top: " + inputBoxes[i][4] + "px; left: " + inputBoxes[i][5] + "px; width: " + inputBoxes[i][6] + "px; " + inputBoxes[i][7] + " display: " + inputBoxes[i][8] + ";";
		inputBox.onchange = function(){dimErrCheck();};
		document.getElementById(diagArea.id).appendChild(inputBox);
	}
		
	// Cargar controles para tabla de pesos
	var tablaArea = document.createElement("div");
	tablaArea.id = "ChasisTabla";
	document.getElementById(diagArea.id).appendChild(tablaArea);
	//document.getElementById(tablaArea.id).setAttribute("style", "width: 100%; height: 100%");
		
		// Tabla para encabezados de fila
		var container = document.createElement("div");
		container.id = "tablaEncabezado";
		
		container.style = "position: absolute; right: 0px; top: 303px; width: 120px; ";
		document.getElementById(tablaArea.id).appendChild(container);		
				
		var innerContainer = document.createElement("div");
		innerContainer.id = "tablaEncabezadoPeso";
		innerContainer.style = "position: absolute; padding: 5px; width: 100%; background-color: #6A6A6A";   //C4D3DF
		
		var inputStyle = "width: 120px; color: #C4D3DF; border-style: solid; border-color: #6A6A6A; background-color: #6A6A6A;";
		
		inputBox = document.createElement("input");
		inputBox.value = "Peso Calculado";
		inputBox.style = inputStyle;
		innerContainer.appendChild(inputBox);
		
		document.getElementById(container.id).appendChild(innerContainer);
		
		innerContainer = document.createElement("div");
		innerContainer.style = "position: absolute; padding: 5px; margin-top: 97px; width: 100%; background-color: #C4D3DF";		//C4D3DF
						
		var inputStyle = "width: 120px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";				
						
		inputBox = document.createElement("input");
		inputBox.value = "Configuración";
		inputBox.style = inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);
		
		inputBox = document.createElement("input");
		inputBox.value = "Tipo de Ruedas";
		inputBox.style = inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);
		
		inputBox = document.createElement("input");
		inputBox.value = "Peso Máximo";
		inputBox.style = inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);
		
		inputBox = document.createElement("input");
		inputBox.value = "Tolerancia";
		inputBox.style = inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);
		
		inputBox = document.createElement("input");
		inputBox.value = "Tara";
		inputBox.style = inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);
		
		document.getElementById(container.id).appendChild(innerContainer);
					
		// Tabla para ejes delanteros
		container = document.createElement("div");
		container.id = "tablaDireccion";
		posLeft = posBaseLine - 65; 
		container.style = "position: absolute; top: 303px; left: " + posLeft + "px; width: 120px;";
		document.getElementById(tablaArea.id).appendChild(container);
		
		var innerContainer = document.createElement("div");
		innerContainer.id = "tablaDireccionPeso";
		innerContainer.style = "position: absolute; padding: 5px; width: 100%; background-color: #6A6A6A";
		
		inputBox = document.createElement("input");
		inputBox.id = "Chasis1p";
		inputBox.type = "number";
		inputBox.value = 0;
		inputBox.style = "text-align: right; width: 75%; border-style: solid; border-color: #6A6A6A;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);
		
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; color: #C4D3DF;  width: 15%; border-style: solid; border-color: #6A6A6A; background-color: #6A6A6A;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);
		
		document.getElementById(container.id).appendChild(innerContainer);
		
		innerContainer = document.createElement("div");
		innerContainer.style = "position: absolute; padding: 5px; margin-top: 97px; width: 100%; background-color: #C4D3DF";
				
		inputBox = document.createElement("select");
		inputBox.id = "Chasis1e";
		//class="tablaInputBoxes" 
		inputBox.onchange = function(){cargarSelectConfig(this);};
		inputBox.style = "width: 100%; margin-bottom: 5px";
		var option = document.createElement("option");
		option.text = "Simple";
		option.value = 1;
		option.selected = true;
		inputBox.add(option,0);					//<option selected="selected" value="1">Simple</option>
		option = document.createElement("option");
		option.text = "Tándem";
		option.value = 2;
		inputBox.add(option,1);						//<option value="2">Tándem</option>
		innerContainer.appendChild(inputBox);
		
		inputBox = document.createElement("select");
		inputBox.id = "Chasis1c";
		//class="tablaInputBoxes" 
		inputBox.onchange = function(){cargarTablaPesos(this);};
		inputBox.style = "width: 100%; margin-bottom: 5px";
		var option = document.createElement("option");
		option.text = "Simple";
		option.value = "S";
		option.selected = true;
		option.disabled = true;
		inputBox.add(option,0);				
		innerContainer.appendChild(inputBox);
			
		inputBox = document.createElement("input");
		inputBox.id = "Chasis1pMax";
		inputBox.type = "number";
		inputBox.value = 6000;
		inputBox.style = "text-align: right; width: 75%; margin-bottom: 5px";
		innerContainer.appendChild(inputBox);
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; width: 15%; margin-bottom: 5px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);
			
		inputBox = document.createElement("input");
		inputBox.id = "Chasis1pTol";
		inputBox.type = "number";
		inputBox.value = 500;
		inputBox.style = "text-align: right; width: 75%; margin-bottom: 5px";
		innerContainer.appendChild(inputBox);
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; width: 15%; margin-bottom: 5px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);
			
		inputBox = document.createElement("input");
		inputBox.id = "Chasis1pTar";
		inputBox.type = "number";
		inputBox.value = 4700;
		inputBox.style = "text-align: right; width: 75%; margin-bottom: 5px";
		innerContainer.appendChild(inputBox);	
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; width: 15%; margin-bottom: 5px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);	
					
		document.getElementById(container.id).appendChild(innerContainer);
		
		// Tabla para ejes traseros
		container = document.createElement("div");
		container.id = "tablaTraccion";
		posLeft = posBaseLine + (document.getElementById("distGrp12input").value / 20) - 60; 
		container.style = "position: absolute; left: " + posLeft + "px; top: 303px; width: 120px;";
		document.getElementById(tablaArea.id).appendChild(container);
		
		innerContainer = document.createElement("div");
		innerContainer.id = "tablaDireccionPeso";
		innerContainer.style = "position: absolute; padding: 5px; width: 100%; background-color: #6A6A6A";
		
		inputBox = document.createElement("input");
		inputBox.id = "Chasis2p";
		inputBox.type = "number";
		inputBox.value = 0;
		inputBox.style = "text-align: right; width: 75%; border-style: solid; border-color: #6A6A6A;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);
		
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; color: #C4D3DF; width: 15%; border-style: solid; border-color: #6A6A6A; background-color: #6A6A6A;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);
		
		document.getElementById(container.id).appendChild(innerContainer);
		
		innerContainer = document.createElement("div");
		innerContainer.style = "position: absolute; padding: 5px; margin-top: 97px; width: 100%; background-color: #C4D3DF";

		inputBox = document.createElement("select");
		inputBox.id = "Chasis2e";
		inputBox.onchange = function(){cargarSelectConfig(this);};
		inputBox.style = "width: 100%; margin-bottom: 5px";
		var option = document.createElement("option");
		option.text = "Simple";
		option.value = 1;
		option.selected = true;
		inputBox.add(option,0);					
		option = document.createElement("option");
		option.text = "Tándem";
		option.value = 2;
		inputBox.add(option,1);						
		option = document.createElement("option");
		option.text = "Triple";
		option.value = 3;
		inputBox.add(option,2);
		innerContainer.appendChild(inputBox);	
		
		inputBox = document.createElement("select");
		inputBox.id = "Chasis2c";
		inputBox.onchange = function(){cargarTablaPesos(this);};
		inputBox.style = "width: 100%; margin-bottom: 5px";
		var option = document.createElement("option");
		option.text = "Simple";
		option.value = "S";
		inputBox.add(option,0);	
		option.text = "Dual";
		option.value = "D";
		option.selected = true;
		inputBox.add(option,1);			
		innerContainer.appendChild(inputBox);	
			
		inputStyle = "text-align: right; width: 75%;";
		
		inputBox = document.createElement("input");
		inputBox.id = "Chasis2pMax";
		inputBox.type = "number";
		inputBox.value = 10500;
		inputBox.style =  inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);	
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; width: 15%; margin-bottom: 5px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);	
		
		inputBox = document.createElement("input");
		inputBox.id = "Chasis2pTol";
		inputBox.type = "number";
		inputBox.value = 1000;
		inputBox.style = inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);	
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; width: 15%; margin-bottom: 5px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);	
			
		inputBox = document.createElement("input");
		inputBox.id = "Chasis2pTar";
		inputBox.type = "number";
		inputBox.value = 1700;
		inputBox.style = inputStyle + "margin-bottom: 5px";
		innerContainer.appendChild(inputBox);				
		inputBox = document.createElement("input");
		inputBox.value = "kg";
		inputBox.style = "text-align: right; width: 15%; margin-bottom: 5px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";
		inputBox.disabled = true; 
		innerContainer.appendChild(inputBox);	
					
		document.getElementById(container.id).appendChild(innerContainer);
		
	calcularChasis();
	inicializarMenu();
}
	
function inicializarMenu () {
	// Botones del menu
	var container = document.createElement("div");
	container.id = "barraMenu";
	container.style = "position: absolute; left: 0px; top: 0px; width: 100%;";
		
	for (var i = 0; i < menuButtons.length; i++) {
		var menuButton = document.createElement("button");
		menuButton.id = menuButtons[i][0];
		menuButton.value = menuButtons[i][0];
		var t = document.createTextNode(menuButtons[i][1]);       // Create a text node
		menuButton.appendChild(t);
		
		menuButton.style = "height: 30px; width: " + menuButtons[i][3] + ";";
		menuButton.onclick = function(){tratarOpMenu(this);};
		container.appendChild(menuButton);
		//document.getElementById(menuButtons[i][0]).setAttribute("class", "menuButton");
	}	
		
	document.getElementById("Diagrama").appendChild(container);
}
	
function tratarOpMenu (menuOp) {
	for (var i = 0; i < 4; i ++)
		document.getElementById(menuButtons[i][0]).disabled = false; 
	
	switch(menuOp.value) {
	case menuButtons[0][0]:
		alert("Las otras opciones de vehículo están en desarrollo.")
        	break;
    	case menuButtons[1][0]:
        	calcularChasis();
        	break;
	case menuButtons[2][0]:
		if (menuButtons[3][2] == true)
			document.getElementById("Diagrama").removeChild(document.getElementById("containerDescarga"));
        	inicializarCarga();
		menuOp.disabled = true; 
		menuButtons[2][2] = true;
        	break;
	case menuButtons[3][0]:
		if (menuButtons[2][2] == true) {
			document.getElementById("Diagrama").removeChild(document.getElementById("Carga"));
			menuButtons[2][2] = false;
		}	
		if (menuButtons[3][2] == true) {
			document.getElementById("Diagrama").removeChild(document.getElementById("containerDescarga"));
			menuButtons[3][2] = false;
        	}
		inicializarDescarga();
		menuButtons[3][2] = true;
        	break;
	default:
        	calcularChasis();
	}
}
	
function inicializarCarga () {
	// Dibujar una caja como carga con input para modificar su peso
	var carga = document.createElement("div");
	carga.id = "Carga";
	posTop = 250 - 59;
	posLeft = posBaseLine + (inputBoxes[3][1] / 20) + (inputBoxes[4][1] / 40) - 75;
	carga.style = "position: absolute; top: " + posTop + "px; left: " + posLeft + "px; width: 150px; height: 50px; border-style: solid; border-width: 4px; border-color: #8A4B08; background-color: #F7BE81; opacity: 0.6";
	carga.onmousedown = function(){calcularCarga();};

	inputBox = document.createElement("input");
	inputBox.id = "CargaPinput";
	inputBox.type = "number";
	inputBox.value = pGrupos[0][3];
	inputBox.style = "margin-top: 17px; margin-bottom: 17px; text-align: right; width: 120px; border-style: none; background-color: transparent;";
	inputBox.onchange = function(){tratarCalcularCargas();};
	carga.appendChild(inputBox);
		
	inputBox = document.createElement("input");
	inputBox.value = "kg";
	inputBox.style = "margin-top: 17px; margin-bottom: 17px; width: 30px; border-style: none; background-color: transparent;";
	inputBox.disabled = true; 
	carga.appendChild(inputBox);
		
	document.getElementById("ChasisDiagrama").appendChild(carga);
}
	
var pallets;
function inicializarDescarga () {
	pallets = [];
		
	var capacidadCaja = inputBoxes[4][1] / 1000;
	capacidadCaja = Math.floor(capacidadCaja);
	var pesoCarga = Math.round((pGrupos[1][4] + pGrupos[2][4] - pGrupos[1][3] - pGrupos[2][3]) / capacidadCaja);
		
	var containerDescarga = document.createElement("div");
	containerDescarga.id = "containerDescarga";
	containerDescarga.style = "position: absolute; top: 0px; left: 0px;";
	document.getElementById("ChasisDiagrama").appendChild(containerDescarga);
		
	for (var i = 0; i < capacidadCaja; i++) {
		// Dibujar una caja como carga con input para modificar su peso
		var carga = document.createElement("div");
		carga.id = "Pallet" + i;
		posTop = 250 - 70;
		posLeft = posBaseLine + (inputBoxes[3][1] / 20) + (i * 1000 / 20);
		carga.style = "position: absolute; top: " + posTop + "px; left: " + posLeft + "px; width: 50px;";
		carga.onclick = function(){descargarPallet(this);};
			
		var pal = [];
			pal.push((i * 1000) + 500);
			pal.push(pesoCarga);
		pallets.push(pal);

		var pallet = document.createElement("div");
		pallet.style = "position: relative; float: left; width: 28px; height: 18px; border-style: solid; border-width: 1px; border-color: #0489B1; background-color: #C4D3DF; opacity: 0.6";
		carga.appendChild(pallet);
		pallet = document.createElement("div");
		pallet.style = "position: relative; float: right; width: 18px; height: 18px; border-style: solid; border-width: 1px; border-color: #0489B1; background-color: #C4D3DF; opacity: 0.6";
		carga.appendChild(pallet);
		
		pallet = document.createElement("div");
		pallet.style = "position: relative; float: left; width: 18px; height: 18px; border-style: solid; border-width: 1px; border-color: #0489B1; background-color: #C4D3DF; opacity: 0.6";
		carga.appendChild(pallet);
		pallet = document.createElement("div");
		pallet.style = "position: relative; float: right; width: 28px; height: 18px; border-style: solid; border-width: 1px; border-color: #0489B1; background-color: #C4D3DF; opacity: 0.6";
		carga.appendChild(pallet);
		
		pallet = document.createElement("div");
		pallet.style = "position: relative; float: left; width: 28px; height: 18px; border-style: solid; border-width: 1px; border-color: #0489B1; background-color: #C4D3DF; opacity: 0.6";
		carga.appendChild(pallet);
		pallet = document.createElement("div");
		pallet.style = "position: relative; float: right; width: 18px; height: 18px; border-style: solid; border-width: 1px; border-color: #0489B1; background-color: #C4D3DF; opacity: 0.6";
		carga.appendChild(pallet);
		
		pallet = document.createElement("div");
		pallet.style = "position: relative; float: left; width: 48px; height: 8px; border-style: solid; border-width: 1px; border-color: #8A4B08; background-color: #F7BE81; opacity: 0.6";
		carga.appendChild(pallet);
		
		document.getElementById(containerDescarga.id).appendChild(carga);
	}
		
	calcularCargas((capacidadCaja * 1000) / 2, pesoCarga * capacidadCaja);
}
	
function descargarPallet (elem) {
	var pesoTotal = 0;
	var pesoPonderado = 0;
	var centroGravedad = 0;
	var fieldName = elem.id;
	fieldName = Number(fieldName.substring(fieldName.length - 1, fieldName.length));

	pallets[fieldName][1] = 0;
		
	document.getElementById("containerDescarga").removeChild(document.getElementById(elem.id));
		
	for (var i = 0; i < pallets.length; i++) {
		pesoTotal += pallets[i][1];
		pesoPonderado += pallets[i][0] * pallets[i][1];
		centroGravedad = pesoPonderado / pesoTotal;
	}

	calcularCargas(centroGravedad, pesoTotal);
}
	
window.addEventListener("load", inicializarChasis);
