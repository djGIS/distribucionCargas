function drawChart(dataArray, hAxisMin, hAxisMax) {		
		var data = new google.visualization.DataTable();
		data.addColumn('number', 'Distancia');
		//data.addColumn('number', 'Dummy');
		data.addColumn('number', 'Max Permisible');
		data.addColumn('number', 'Eje Delantero'); 
		data.addColumn('number', 'Eje Trasero');
		data.addColumn('number', 'Min Delantero');
		data.addColumn('number', 'Min Tracción');
		data.addColumn('number', 'Carga Máxima'); 
		
		for (var i = 0; i < dataArray.length; i++) {
			data.addRow([dataArray[i][0], dataArray[i][1], dataArray[i][2], dataArray[i][3], dataArray[i][4], dataArray[i][5], dataArray[i][6]]);
		}
//alert(document.getElementById("distCargaFinput").value / 20);
      var options = {
        //chart: {
        //  title: 'Box Office Earnings in First Two Weeks of Opening',
        //  subtitle: 'in millions of dollars (USD)'
        //},
		curveType: 'function',
		legend: {position: 'none'},
		backgroundColor: { fill:'transparent' },
        chartArea: {
			left: 0,
			top: 0,
			width: document.getElementById("distCargaFinput").value / 20,
			height: 150
			}, 
		series: { 
			//0: {targetAxisIndex: 0, visibleInLegend: false, pointSize: 0, lineWidth: 0},
			0: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			1: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			2: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			3: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			4: {targetAxisIndex: 1, color:'blue', lineWidth: 1, lineDashStyle:[4, 4]},
			5: {targetAxisIndex: 1, color:'red', lineWidth: 2}
			},
		vAxes: {
			0: {textPosition: 'none'},
			1: {textPosition: 'inside'},
		},
		hAxis: {
            viewWindowMode:'explicit',
            viewWindow: {
              max:hAxisMax,
              min:hAxisMin
            },
			//format: '0',
			textPosition:'none',
			slantedTextAngle:90
        },				
		vAxis: {
            viewWindowMode:'explicit',
            viewWindow: {
              max: 1.1 * dataArray[0][1],
              min: 0
            }
        }	
      };

		var chart = new google.visualization.LineChart(document.getElementById('chasisGraf'));
		chart.draw(data, options);
    }
    //google.load('visualization', '1.1', {packages: ['line']});
    
	var posBaseLine = 100;
	var posCajaLine = 60;
	var posEjesLine = 380;
	var posPisoCaja = 250;
	
	var init = [
		{
		grupo: [{config: 1, configPermitido: [1, 2], rodado: "S", sep: 0, tara: 4700},
		{config: 1,	configPermitido: [1, 2, 3], rodado: "D", sep: 0, tara: 1700}],
		distGrp12: 4700,
    	distCarga0: 720,
		distCargaF: 6000
		}
	];
	
	var inputBoxPad = "text-align: right;";
	
	var tiposVeh = ['chasis', 'tractor', 'semi'];
	
	var pMaxEjes = [
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
		["sepGrp1input", init[0].grupo[0].sep, 0, 2400, posEjesLine - 30, posBaseLine - 88, 60, inputBoxPad, "none"],
		["distGrp12input", init[0].distGrp12, 0, 10500, posEjesLine - 10, posBaseLine + 83, 70, inputBoxPad, "inline"],
		["sepGrp2input", init[0].grupo[1].sep, 0, 2400, posEjesLine - 10, posBaseLine + 332, 60, inputBoxPad, "none"],
		["distCarga0input", init[0].distCarga0, 500, 3000, posCajaLine - 10, posBaseLine - 88, 60, inputBoxPad, "inline"],
		["distCargaFinput", init[0].distCargaF, 4000, 12000, posCajaLine - 10, posBaseLine + 151, 70, inputBoxPad, "inline"],
		["distCarga", init[0].distCargaF / 2, 0, 6000, "position: absolute; top: 51px; width: 70px; padding: 5px", 151],
	];
	
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
		["ChasisTraseroimg", "http://www.fadeeac.org.ar/wp-content/uploads/2017/02/chasisTrasero.png", "inline", (init[0].distCargaF / 20) - 234],
		["ChasisDelanteimg", "http://www.fadeeac.org.ar/wp-content/uploads/2017/02/chasisDelante.png", "inline", -74],
		["Chasis12img", "http://www.fadeeac.org.ar/wp-content/uploads/2017/02/chasisDireccion2.png", "none", 10],
		["Chasis21img", "http://www.fadeeac.org.ar/wp-content/uploads/2017/02/ChasisTraccion1.png", "inline", 79],
		["Chasis22img", "http://www.fadeeac.org.ar/wp-content/uploads/2017/02/ChasisTraccion2.png", "none", 46],
		["Chasis23img", "http://www.fadeeac.org.ar/wp-content/uploads/2017/02/ChasisTraccion2.png", "none", 116],
	];
	
	// Pesos de los grupos y cargas
	var pGrupos = [
		// Grupo, Ejes, Rodado, Tara, Max
		["carga", 1, "", 0, 9000],
		["chasis1", 1, "S", 4700, 6000],
		["chasis2", 1, "D", 1700, 10500],
	];
	
	var menuButtons = [
		["menuOpVehiculos", "Opciones de Vehículos", false, "19%"],
		["menuOpDiagCarga", "Recalcular Diagrama de Carga", true, "27%"],
		["menuOpEjCarga", "Ejemplo de Distribución", false, "27%"],
		["menuOpEjDescarga", "Ejemplo de Descarga Parcial", false, "27%"],
	];
	
	
	
    function calcularChasis () {
		//Configuracion de ejes
		var configDir = Number(document.getElementById("chasis1e").value);
		var configTrac = Number(document.getElementById("chasis2e").value);
		var configTotal = configDir + configTrac;
		
		// Dimensiones
		//var inputBoxes[0][1] = Number(document.getElementById("sepGrp1input").value);
		//var inputBoxes[2][1] = Number(document.getElementById("sepGrp2input").value);
		//var inputBoxes[1][1] = Number(document.getElementById("distGrp12input").value);
		//var inputBoxes[3][1] = Number(document.getElementById("distCarga0input").value);
		//var inputBoxes[4][1] = Number(document.getElementById("distCargaFinput").value);
		
		// Pesos
		var pMaxGrp1 = Number(document.getElementById("chasis1pMax").value);
		var pTolGrp1 = Number(document.getElementById("chasis1pTol").value);
		var pTarGrp1 = Number(document.getElementById("chasis1pTar").value);
		var pMaxGrp2 = Number(document.getElementById("chasis2pMax").value);
		var pTolGrp2 = Number(document.getElementById("chasis2pTol").value);
		var pTarGrp2 = Number(document.getElementById("chasis2pTar").value);
		
		var datosGrafico = [];
		
		for (var i = 0; i <= inputBoxes[4][1] / 100; i++) {
			//Carga maxima permisible
			var dataSet1 = Math.min((pMaxGrp1 + pMaxGrp2) - (pTarGrp1 + pTarGrp2),30000 - (pTarGrp1 + pTarGrp2));
			var dataSet6 = dataSet1;
			
			//Peso maximo eje delantero
			var dataSet2;
			if (i*100 < (inputBoxes[1][1]+inputBoxes[2][1]/2-inputBoxes[3][1])) {
				dataSet2 = ((pMaxGrp1+pTolGrp1-pTarGrp1)*(inputBoxes[1][1]+inputBoxes[2][1]-inputBoxes[0][1]/2)+(pMaxGrp2+pTolGrp2-pTarGrp2)*(inputBoxes[2][1]/2))/(inputBoxes[1][1]+inputBoxes[2][1]-inputBoxes[3][1]-i*100);
				dataSet6 = Math.min(dataSet6, dataSet2);	
			} else {
				dataSet2 = 30000;	
			}
			
			//Peso maximo eje trasero
			var dataSet3 = ((pMaxGrp1+pTolGrp1-pTarGrp1)*(inputBoxes[0][1]/2)+(pMaxGrp2+pTolGrp2-pTarGrp2)*(inputBoxes[1][1]+inputBoxes[2][1]/2))/(inputBoxes[3][1]+i*100);
			dataSet6 = Math.min(dataSet6, dataSet3);
			
			//Peso min eje delantero
			var pMin1;
			if (configTotal == 2) {
				pMin1 = 0.3;
			} else if (configTotal == 3) {
				pMin1 = 0.25;
			} else {
				pMin1 = 0.2;
			}
			var dataSet4 = ((pMin1*(pTarGrp1+pTarGrp2)-pTarGrp1)*(inputBoxes[1][1]+inputBoxes[2][1]-inputBoxes[0][1]/2)+(pMaxGrp2-pTarGrp2)*(inputBoxes[2][1]/2))/((inputBoxes[1][1]+inputBoxes[2][1]-inputBoxes[3][1]-i*100)-pMin1*(inputBoxes[1][1]+inputBoxes[2][1]-inputBoxes[0][1]/2));
			if (dataSet4 < 0 || dataSet4 > 30000) {
				dataSet4 = 30000;
			} else {
				//dataSet4 = 
				dataSet6 = Math.min(dataSet6, dataSet4);
			}
			
			//Peso min eje de tracción
			var pMin2 = 0.15;
			var nTrac = 1;
			var nGrp2 = configTrac;			
			//var dataSet5 = 0.001*Math.round((pMin2*n*(pTarGrp1+pTarGrp2)-pTarGrp2)/(1-pMin2*n-((inputBoxes[0][1]+inputBoxes[1][1]+inputBoxes[2][1]/2-inputBoxes[3][1]-i*100)/(inputBoxes[0][1]/2+inputBoxes[1][1]+inputBoxes[2][1]/2))));
			var dataSet5 = ((pMaxGrp1-pTarGrp1)*(inputBoxes[0][1]/2)+(pMin2*nTrac*(pTarGrp1+pTarGrp2)/nGrp2-pTarGrp2)*(inputBoxes[1][1]+inputBoxes[2][1]/2))/((inputBoxes[3][1]+i*100)+pMin2*nTrac*(inputBoxes[1][1]+inputBoxes[2][1]/2)/nGrp2);
			//if (dataSet5 > dataSet6) {
			//	dataSet6 = null;
			//}
			
			var dataSet0 = +((i * 0.1).toFixed(2));
			dataSet1 =  +((0.001 * dataSet1).toFixed(2));
			dataSet2 =  +((0.001 * dataSet2).toFixed(2));
			dataSet3 =  +((0.001 * dataSet3).toFixed(2));
			dataSet4 =  +((0.001 * dataSet4).toFixed(2));
			dataSet5 =  +((0.001 * dataSet5).toFixed(2));
			dataSet6 =  +((0.001 * dataSet6).toFixed(2));
			
			datosGrafico.push([dataSet0, dataSet1, dataSet2, dataSet3, dataSet4, dataSet5, dataSet6]);			
		}
		drawChart(datosGrafico, 0, 0.001 * inputBoxes[4][1]);
	}
	
	
	
	function tipoVehiculo(opDisplay) {
		var tiposVeh = ['chasis', 'tractor', 'semi'];
		
		for (var i = 0; i < tiposVeh.length; i++) {
			var tabla = tiposVeh[i] + 'Table';
			var diagrama = tiposVeh[i] + 'Diagrama';
			
			if (tiposVeh[i] == opDisplay) {
				document.getElementById(diagrama).style.display = 'block';
				document.getElementById(tabla).style.display = 'block';
			}
			else {
			document.getElementById(diagrama).style.display = 'none';
			document.getElementById(tabla).style.display = 'none';
			}
		}
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
		
		if (listaFuente.id == "chasis1e") {
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
			
		if (listaFuente.id == "chasis2e") {
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
		//cargarTablaPesos(document.getElementById(fieldName + "c"));
	}
	
	function cargarTablaPesos (listaFuente) {
		var fieldName = listaFuente.id;
		fieldName = fieldName.substring(0, fieldName.length - 1);
		var fieldNum = Number(fieldName.substring(fieldName.length - 1, fieldName.length));
		//alert(fieldNum);
		for (var i = 0; i < pMaxEjes.length; i++) {
			if (pMaxEjes[i][2] == listaFuente.value) {
				document.getElementById(fieldName + "pMax").value = pMaxEjes[i][4];
				document.getElementById(fieldName + "pTol").value = pMaxEjes[i][5];
				pGrupos[fieldNum][4] = pMaxEjes[i][4];
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
		posLeft = Math.round(posBaseLine + imgComposite[0][3] + distCarga0 + distCargaF - (init[0].distCarga0 + init[0].distCargaF) / 20);
		document.getElementById(imgComposite[0][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[0][2] + ";";
		
		inputBoxes[4][5] = Math.round(posBaseLine + distCarga0 + (distCargaF - inputBoxes[4][6]) / 2);
		
		posLeft = posBaseLine + (inputBoxes[3][1] / 20);
		document.getElementById("chasisGraf").style = "position: absolute; top: 100px; left: " + posLeft + "px; width: 100%;";
		
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
		width = Math.max(100, inputBoxes[0][1] / 20);
		posLeft = posBaseLine + dimSepGrp1 - width / 2 - 5;
		document.getElementById("chasis1").style = "position: absolute; left: " + posLeft + "px; top: 400px; width: " + width + "px; padding-top: 5px; padding-left: 5px; padding-right: 5px; background-color: #C4D3DF";
		document.getElementById("chasis1Peso").style = "position: absolute; left: " + posLeft + "px; width: " + width + "px;";
		
		dimLines[14][3] = (dimSepGrp1 * 2) - 1;
		dimLines[17][2] = posBaseLine + (dimSepGrp1 * 2) - 19;
		dimLines[18][3] = (dimSepGrp1 * 2) + 29;
		
		// Dimensionamiento por modificación de la distancia entre grupos
		//var dimGrp12 = inputBoxes[1][1] / 20;
		posLeft = posBaseLine + (inputBoxes[1][1] - init[0].distGrp12) / 20 + 80;
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
		var config2 = document.getElementById("chasis2e").value - 1;
		posLeft = Math.round(posBaseLine + (dimSepGrp2 * 2 / config2) + (inputBoxes[1][1] / 20) - 258);
		document.getElementById(imgComposite[4][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[4][2] + ";";
		posLeft = Math.round(posBaseLine + (dimSepGrp2 * 2) + (inputBoxes[1][1] / 20) - 258);
		document.getElementById(imgComposite[5][0]).style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[5][2] + ";";
		
		width = Math.max(100, inputBoxes[2][1] / 20);
		posLeft = posBaseLine + distGrp12 + dimSepGrp2 - width / 2 - 5;//dimSepGrp2 - 65;
		document.getElementById("chasis2").style = "position: absolute; left: " + posLeft + "px; top: 400px; width: " + width + "px; padding-top: 5px; padding-left: 5px; padding-right: 5px; background-color: #C4D3DF";
		//document.getElementById("chasis2").style = "position: absolute; left: " + posLeft + "px; top: 400px; width: " + width + "px;";
		document.getElementById("chasis2Peso").style = "position: absolute; left: " + posLeft + "px; width: " + width + "px;";
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
	var minX; 
	var maxX;
	
	function calcularCarga() {
		x1 = event.clientX;
		left1 = document.getElementById("Carga").style.left;
		left1 = Number(left1.substring(0, left1.length - 2));
		var widthCarga = document.getElementById("Carga").style.width;
		widthCarga = Number(widthCarga.substring(0, widthCarga.length - 2));
		minX = posBaseLine + inputBoxes[3][1] / 20; 
		maxX = minX + (inputBoxes[4][1] / 20) - widthCarga - 9;

		window.addEventListener("mousemove", moverCarga);
	}
	
	function removeEvMousemove () {
		window.removeEventListener("mousemove", moverCarga);
	}
	
	function moverCarga() {
		var x2 = event.clientX;
		
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
		var pMaxGrp1 = Number(document.getElementById("chasis1pMax").value);
		var pTolGrp1 = Number(document.getElementById("chasis1pTol").value);
		var pTarGrp1 = Number(document.getElementById("chasis1pTar").value);
		var pMaxGrp2 = Number(document.getElementById("chasis2pMax").value);
		var pTolGrp2 = Number(document.getElementById("chasis2pTol").value);
		var pTarGrp2 = Number(document.getElementById("chasis2pTar").value);
	
		p1 = Math.round((pCarga*(distGrp12+sepGrp2/2-distCarga0-distCarga)/(distGrp12+sepGrp2/2-sepGrp1/2))+pTarGrp1);
		p2 = Math.round((pCarga*(distCarga0+distCarga-sepGrp1/2)/(distGrp12+sepGrp2/2-sepGrp1/2))+pTarGrp2);
		document.getElementById("chasis1p").value = p1;
		document.getElementById("chasis2p").value = p2;
	
		verifPesos();
	}
	
	function verifPesos () {
		var p1 = Number(document.getElementById("chasis1p").value);
		var p2 = Number(document.getElementById("chasis2p").value);
		
		var configDir = Number(document.getElementById("chasis1e").value);
		var configTrac = Number(document.getElementById("chasis2e").value);
		var configTotal = configDir + configTrac;
		
		// Pesos
		var pMaxGrp1 = Number(document.getElementById("chasis1pMax").value);
		var pTolGrp1 = Number(document.getElementById("chasis1pTol").value);
		var pTarGrp1 = Number(document.getElementById("chasis1pTar").value);
		var pMaxGrp2 = Number(document.getElementById("chasis2pMax").value);
		var pTolGrp2 = Number(document.getElementById("chasis2pTol").value);
		var pTarGrp2 = Number(document.getElementById("chasis2pTar").value);
		
		var pMin1;
		if (configTotal == 2) {
			pMin1 = 0.3;
		} else if (configTotal == 3) {
			pMin1 = 0.25;
		} else {
			pMin1 = 0.2;
		}
		if (p1 < pMin1*(p1 + p2)) {
			document.getElementById("chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
		} else if (p1 > (pMaxGrp1+pTolGrp1)){
			document.getElementById("chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FA5858";
		} else if (p1 > (pMaxGrp1)){
			document.getElementById("chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
		} else {
			document.getElementById("chasis1p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #D0FA58";
		}
	
		var pMin2 = 0.15;
		var nTrac = 1;
		var nGrp2 = configTrac;	
		if (p2 < pMin2*nTrac*(p1 + p2)/nGrp2) {
			document.getElementById("chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
		} else if (p2 > (pMaxGrp2+pTolGrp2)){
			document.getElementById("chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FA5858";
		} else if (p2 > (pMaxGrp2)){
			document.getElementById("chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #FAAC58";
		} else {
			document.getElementById("chasis2p").style = "text-align: right; width: 75%; border-style: solid; border-width: 1px; background-color: #D0FA58";
		}
	}
	
	function inicializarChasis () {
		var posLeft = 0;
		var posTop = 0;
		var width = 0;
		var vehSelect = "chasis";

		// Dibujo del area de diagrama de carga con imagen compuesta de chasis 
		var diagArea = document.createElement("div");
			diagArea.id = vehSelect + "Diagrama";
			diagArea.style = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%"
			document.getElementById("Diagrama").appendChild(diagArea);
				
			for (var i = 0; i < dimLines.length; i++) {
				var dimLine = document.createElement("div");
				dimLine.id = dimLines[i][0];
				dimLine.style = "position: absolute; top: " + dimLines[i][1] + "px; width: " + dimLines[i][3] + "px; height: " + dimLines[i][4] + "px; " + dimLines[i][5] + " display: " + dimLines[i][6] + ";";
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
		
			var container = document.createElement("div");
			container.id = vehSelect + "Graf"; 
			container.style = "position: absolute; top: 100px; width: 100%;";  //
			document.getElementById(diagArea.id).appendChild(container);
				
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
		
			// Barra de pesos calculados
			container = document.createElement("div");
			container.id = vehSelect + "Peso";
			container.style = "position: absolute; top: 303px; padding: 5px; width: 100%; background-color: #6A6A6A; ";   //  display: none
			document.getElementById(diagArea.id).appendChild(container);
			
			var innerContainer = document.createElement("div");
			innerContainer.style = "float: right; width: 100px; background-color: #6A6A6A";
				inputBox = document.createElement("input");
				inputBox.value = "Peso Calculado";
				inputBox.style = "width: 100%; color: #C4D3DF; border-style: solid; border-color: #6A6A6A; background-color: #6A6A6A;";
				innerContainer.appendChild(inputBox);
			document.getElementById(container.id).appendChild(innerContainer);
			
			for (var i = 1; i < 3; i++) {
			innerContainer = document.createElement("div");
			innerContainer.id = vehSelect + i + "Peso";
			innerContainer.style = "position: absolute; padding: 5px; width: 100px; background-color: #6A6A6A";
				inputBox = document.createElement("input");
				inputBox.id = vehSelect + i + "p";
				inputBox.type = "number";
				inputBox.value = 0;
				inputBox.style = "float: left; text-align: right; width: 75%; border-style: solid; border-color: #6A6A6A;";
				inputBox.disabled = true; 
				innerContainer.appendChild(inputBox);
		
				inputBox = document.createElement("input");
				inputBox.value = "kg";
				inputBox.style = "float: right; text-align: right; color: #C4D3DF; width: 20%; border-style: solid; border-color: #6A6A6A; background-color: #6A6A6A;";
				inputBox.disabled = true; 
				innerContainer.appendChild(inputBox);
			document.getElementById(container.id).appendChild(innerContainer);
			}
			
		// Tabla para encabezados de fila
		container = document.createElement("div");
		container.id = vehSelect + 0;
		container.style = "position: absolute; right: 0px; top: 400px; width: 100px; padding-top: 5px; padding-left: 5px; padding-right: 5px; background-color: #C4D3DF";
		document.getElementById(diagArea.id).appendChild(container);
				
		var tablaPesos = [  // [i][0]
			["Peso Calculado", "p", "input", ""],
			["Configuración", "e", "select", function(){cargarSelectConfig(this);}],
			["Tipo de Ruedas", "c", "select", function(){cargarTablaPesos(this);}],
			["Peso Máximo", "pMax", "input", ""],
			["Tolerancia", "pTol", "input", ""],
			["Tara", "pTar", "input", ""]
		];
		
		for (var i = 1; i < 3; i++) {
			container = document.createElement("div");
			container.id = vehSelect + i;
			container.style = "position: absolute; top: 400px; width: 100px; padding-top: 5px; padding-left: 5px; padding-right: 5px; background-color: #C4D3DF";
			document.getElementById(diagArea.id).appendChild(container);			
		}

		for (var i = 1; i < tablaPesos.length; i++) {		
			// Cargar la tabla de encabezados de fila
			inputBox = document.createElement("input");
			inputBox.value = tablaPesos[i][0];
			inputBox.style = "width: 100px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF; margin-bottom: 5px";
			document.getElementById(vehSelect + 0).appendChild(inputBox);
			
			// Cargar tabla de grupos
			for (var g = 1; g < 3; g++) {
				inputBox = document.createElement(tablaPesos[i][2]);
				inputBox.id = vehSelect + g + tablaPesos[i][1];
			
				if (i == 1) {
					for (var j = 0; j < init[0].grupo[g-1].configPermitido.length; j++) {
						var option = document.createElement("option");
						for (var k = 0; k < pMaxEjes.length; k++) {
							if (pMaxEjes[k][0] == init[0].grupo[g-1].configPermitido[j]) 
								option.text = pMaxEjes[k][1];
						}
						if (init[0].grupo[g-1].configPermitido[j] == init[0].grupo[g-1].config) 
							option.selected = true;						
						option.value = init[0].grupo[g-1].configPermitido[j];
						inputBox.add(option, j);	
					}
				}	
				inputBox.onchange = tablaPesos[i][3];
				if (tablaPesos[i][2] == "select") {
					inputBox.style = "width: 100%; margin-bottom: 5px";
				} else if (tablaPesos[i][2] == "input") {
					var textBox = document.createElement("input");
					textBox.value = "kg";
					textBox.style = "float: right; text-align: right; color: #6A6A6A; width: 20%; margin-bottom: 5px; border-style: solid; border-color: #C4D3DF; background-color: #C4D3DF;";
					textBox.disabled = true; 
					document.getElementById(vehSelect + g).appendChild(textBox);
					inputBox.style = "float: left; text-align: right; width: 80%; margin-bottom: 5px";
				}
				if (i == 5) 
					inputBox.value = init[0].grupo[g-1].tara;
				document.getElementById(vehSelect + g).appendChild(inputBox);
			}
			
		}
		
		cargarSelectConfig(document.getElementById(vehSelect + 1 + "e"));
		cargarSelectConfig(document.getElementById(vehSelect + 2 + "e"));
		
		dimChasis();
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
	//alert(menuOp.value);
	
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
		//menuOp.disabled = true; 
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
		
		document.getElementById("Diagrama").appendChild(carga);
	}
	
	var pallets;
	function inicializarDescarga () {
		pallets = [];
		
		var capacidadCaja = inputBoxes[4][1] / 1000;
		capacidadCaja = Math.floor(capacidadCaja);
		//alert(init[0].distCargaF);
		var pesoCarga = Math.round((pGrupos[1][4] + pGrupos[2][4] - pGrupos[1][3] - pGrupos[2][3]) / capacidadCaja);
		//alert(pGrupos[1][4] + " " + pGrupos[2][4] + " " + pGrupos[1][3] + " " + pGrupos[2][3]);
		var containerDescarga = document.createElement("div");
		containerDescarga.id = "containerDescarga";
		containerDescarga.style = "position: absolute; top: 0px; left: 0px;";
		document.getElementById("Diagrama").appendChild(containerDescarga);
		
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
				//alert(pal[1]);
			pallets.push(pal);
			//pallets[i][1] = 
		
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
			//alert(pesoTotal + " " + pesoPonderado + " " +centroGravedad);
		}
		//alert(centroGravedad);
		calcularCargas(centroGravedad, pesoTotal);
	}
	
	window.addEventListener("load", inicializarChasis);
