/*
Ing. Daniel Clarke
djclarke.speaight@gmail.com




Especificaciones técnicas:

- las medidas de longitud están expresadas en centimetros [CM]
- la escala de la representación gráfica es de 1px = 2cm
- las medidas de masa (comunmente referido como peso) se expresan en kilogramos [KG] 
*/

//inicialización y calculo para vehiculos de tipo chasis solo
var posBaseLine = 100;
var posCajaLine = 60;
var posEjesLine = 380;
var posPisoCaja = 250;
var convCmToPx = 2;
var diagCanvasId = "Diagrama";
var diagAreaId = "diagArea";
	

	
var tiposVeh = ['chasis', 'tractor', 'semi'];
	
// Dimensiones del vehículo
var inputBoxes;
var dimLines;
		
	// Pesos de los grupos y cargas
	var pGrupos = [
		// Grupo, Ejes, Rodado, Tara, Max
		["carga", 1, "", 0, 9000],
		["chasis1", 1, "S", 4700, 6000],
		["chasis2", 1, "D", 1700, 10500],
	];
	
	function drawGoogleChart(vehSelect, dataArray, hAxisMin, hAxisMax) {		
	/*Función para trazar el gráfico de carga, basado en un conjunto de 6 límites calculados por la función calcular[vehiculo]*/
	
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
			width: (hAxisMax-hAxisMin)/2,
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
              max:0.01*hAxisMax,
              min:0.01*hAxisMin
            },
			//format: '0',
			textPosition:'none',
			slantedTextAngle:90
        },				
		vAxis: {
            viewWindowMode:'explicit',
            viewWindow: {
              max: 1.2 * dataArray[0][1],
              min: 0
            }
        }	
    };

	var chart = new google.visualization.LineChart(document.getElementById(vehSelect+'Graf'));
	chart.draw(data, options);
}
	
    function calcularChasisLim (vehSelect, dist, veh) {
		//Carga maxima permisible
		var dataSet1 = Math.min((veh.grp1.pMax + veh.grp2.pMax) - (veh.grp1.pTar + veh.grp2.pTar),pMaxVeh - (veh.grp1.pTar + veh.grp2.pTar));
		var dataSet6 = dataSet1;
			
		//Peso maximo eje delantero
		var dataSet2;
		if (dist < (veh.distGrp12 - veh.distCarga0 + veh.grp2.sep/2 - 20)) {
			dataSet2 = ((veh.grp1.pMax+veh.grp1.pTol-veh.grp1.pTar)*(veh.distGrp12+veh.grp2.sep-veh.grp1.sep/2)+(veh.grp2.pMax+veh.grp2.pTol-veh.grp2.pTar)*(veh.grp2.sep/2))/(veh.distGrp12+veh.grp2.sep-veh.distCarga0-dist);
			dataSet6 = Math.min(dataSet6, dataSet2);	
		} else {
			dataSet2 = 1.5*dataSet1; //pMaxVeh;	
		}
			
		//Peso maximo eje trasero
		var dataSet3 = ((veh.grp1.pMax+veh.grp1.pTol-veh.grp1.pTar)*(veh.grp1.sep/2)+(veh.grp2.pMax+veh.grp2.pTol-veh.grp2.pTar)*(veh.distGrp12+veh.grp2.sep/2))/(veh.distCarga0+dist);
		dataSet6 = Math.min(dataSet6, dataSet3);
			
		//Peso min eje delantero
		var pMin1;
		if (veh.configTotal == 2) {
			pMin1 = 0.3;
		} else if (veh.configTotal == 3) {
			pMin1 = 0.25;
		} else {
			pMin1 = 0.2;
		}
		
		var dataSet4 = ((pMin1*(veh.grp1.pTar+veh.grp2.pTar)-veh.grp1.pTar)*(veh.distGrp12+veh.grp2.sep-veh.grp1.sep/2)+(veh.grp2.pMax-veh.grp2.pTar)*(veh.grp2.sep/2))/((veh.distGrp12+veh.grp2.sep-veh.distCarga0-dist)-pMin1*(veh.distGrp12+veh.grp2.sep-veh.grp1.sep/2));
		if (dist < (veh.distGrp12 - veh.distCarga0 + 0.5*veh.grp2.sep)) {   //dataSet4 < 0 || dataSet4 > pMaxVeh) {
			dataSet4 = 1.5*dataSet1; //pMaxVeh;
		//} else if (dataSet4 < dataSet2) {
		//	dataSet4 = 1.5*dataSet1; //pMaxVeh;
		} else {
			//dataSet4 = 
			dataSet6 = Math.min(dataSet6, dataSet4);
		}
			
		//Peso min eje de tracción
		var pMin2 = 0.15;
		var nTrac = 1;
		var nGrp2 = veh.grp1.config;			
		//var dataSet5 = 0.001*Math.round((pMin2*n*(veh.grp1.pTar+veh.grp2.pTar)-veh.grp2.pTar)/(1-pMin2*n-((veh.grp1.sep+veh.distGrp12+veh.grp2.sep/2-veh.distCarga0-i*convFactor)/(veh.grp1.sep/2+veh.distGrp12+veh.grp2.sep/2))));
		var dataSet5 = ((veh.grp1.pMax-veh.grp1.pTar)*(veh.grp1.sep/2)+(pMin2*nTrac*(veh.grp1.pTar+veh.grp2.pTar)/nGrp2-veh.grp2.pTar)*(veh.distGrp12+veh.grp2.sep/2))/((veh.distCarga0+dist)+pMin2*nTrac*(veh.distGrp12+veh.grp2.sep/2)/nGrp2);
		//if (dataSet5 > dataSet6) {
		//	dataSet6 = null;
		//}
		if (vehSelect == 'tractor') 
			dist = dist - 200;
			
		var datosGrafico = [
			+((dist * 0.01).toFixed(2)),
			+((0.001 * dataSet1).toFixed(2)),
			+((0.001 * dataSet2).toFixed(2)),
			+((0.001 * dataSet3).toFixed(2)),
			+((0.001 * dataSet4).toFixed(2)),
			+((0.001 * dataSet5).toFixed(2)),
			+((0.001 * dataSet6).toFixed(2))
		];
		
		return datosGrafico;
	}
	
	function calcularChasis (vehSelect) {
		/* Modelo de cálculo para el gráfico de carga para camión solo (chasis). 
		Utilizar también para cálculo de la ubicación óptima del plato de enganche en tractores.*/
		
		var convFactor = 10;
	
		// Actualizar configuración del vehículo - pesos y dimensiones
		var veh = vehConfig(vehSelect);

		var datosGrafico = [];
		
		for (var i = 0; i <= veh.distCargaF / convFactor; i++) {
			var dataSet = calcularChasisLim(vehSelect, i*convFactor, veh);
			datosGrafico.push([dataSet[0], dataSet[1], dataSet[2], dataSet[3], dataSet[4], dataSet[5], dataSet[6]]);
		}
		if (vehSelect == 'chasis') {
			drawGoogleChart(vehSelect, datosGrafico, 0, veh.distCargaF);
		} else if (vehSelect == 'tractor') {
			drawGoogleChart(vehSelect, datosGrafico, -200, veh.distCargaF-200);
		}
	}
	
	function vehConfig (vehSelect) {
		//Función de actualización del variable "veh" para cálculos de dimensionamiento de la visualización y para el diagrama de carga.
		
		var veh = {};
			
		if ( vehSelect == 'semi') {		
				veh.distGrp25 = Number(document.getElementById(vehSelect+'distGrp25'+'input').value);
				veh.grp3 = {
					pMax: Number(document.getElementById(vehSelect+"1pMax").value),
					pTol: Number(document.getElementById(vehSelect+"1pTol").value),
					pTar: Number(document.getElementById(vehSelect+"1pTar").value),
					config: Number(document.getElementById(vehSelect+"1e").value),
					sep: Number(document.getElementById(vehSelect+'sepGrp1'+'input').value) //sepGrp3input
				}	
				veh.grp4 = {
					pMax: Number(document.getElementById(vehSelect+"2pMax").value),
					pTol: Number(document.getElementById(vehSelect+"2pTol").value),
					pTar: Number(document.getElementById(vehSelect+"2pTar").value),
					config: Number(document.getElementById(vehSelect+"1e").value),
					sep: 0 // inputBoxes[vehSelect][0][1]
				}	
				veh.distCarga05 = Number(document.getElementById(vehSelect+'distCarga05'+'input').value); //distCarga05input
				veh.distCarga0F = Number(document.getElementById(vehSelect+'distCarga0F'+'input').value); //distCarga0Finput
				veh.distGrp35 = Number(document.getElementById(vehSelect+'distGrp35'+'input').value); //distGrp35input
				veh.distGrp34 = Number(document.getElementById(vehSelect+'distGrp34'+'input').value); //distGrp34input
			vehSelect = 'tractor';	
		}
		
		if (vehSelect == 'chasis' || 'tractor') {
				veh.grp1 = {
					pMax: Number(document.getElementById(vehSelect+"1pMax").value),
					pTol: Number(document.getElementById(vehSelect+"1pTol").value),
					pTar: Number(document.getElementById(vehSelect+"1pTar").value),
					config: Number(document.getElementById(vehSelect+"1e").value),
					sep: Number(document.getElementById(vehSelect+'sepGrp1'+'input').value)
				};
				veh.grp2 = {
					pMax: Number(document.getElementById(vehSelect+"2pMax").value),
					pTol: Number(document.getElementById(vehSelect+"2pTol").value),
					pTar: Number(document.getElementById(vehSelect+"2pTar").value),
					config: Number(document.getElementById(vehSelect+"2e").value),
					sep: Number(document.getElementById(vehSelect+'sepGrp2'+'input').value)
				};
				veh.distGrp12 = Number(document.getElementById(vehSelect+inputBoxes[vehSelect][1][0]).value);
				veh.configTotal = veh.grp1.config + veh.grp2.config;	
				if (vehSelect == 'chasis') {
					veh.distCarga0 = Number(document.getElementById(vehSelect+'distCarga0'+'input').value);
					veh.distCargaF = Number(document.getElementById(vehSelect+'distCargaF'+'input').value);
				} else if (vehSelect == 'tractor') {
					veh.distCarga0 = veh.distGrp12 - 200;
					veh.distCargaF = veh.grp2.sep + 300; // ?????? Verificar
				}	
		} 
			
		return veh;
	}
	
	function calcularSemi (vehSelect) {
		/* Modelo de cálculo para el gráfico de carga para tractor con semirremolque.*/

		var convFactor = 10;
		var veh = vehConfig(vehSelect);
		
		var temp = calcularChasisLim('tractor',200+veh.distGrp25, veh); //veh.distGrp12
		var pMaxPerno = 1000*temp[6];		
		
		var datosGrafico = [];
		
		for (var i = 0; i <= veh.distCarga0F / convFactor; i++) {
			//Carga maxima permisible
			var dataSet1 = Math.min((veh.grp1.pMax + veh.grp2.pMax + veh.grp3.pMax + veh.grp4.pMax) - (veh.grp1.pTar + veh.grp2.pTar + veh.grp3.pTar + veh.grp4.pTar),pMaxCombo - (veh.grp1.pTar + veh.grp2.pTar + veh.grp3.pTar + veh.grp4.pTar));
			var dataSet6 = dataSet1;
			
			var dataSet2 = dataSet1;
			var dataSet3 = dataSet1;
			var dataSet4 = dataSet1;
			var dataSet5 = dataSet1;
			
			//Peso maximo perno de enganche -- eje delantero
			var dataSet2;
			if (i*convFactor < (veh.distGrp35)) { //+sepGrp2/2-distCarga0
				dataSet2 = ((veh.grp4.pMax+veh.grp4.pTol-veh.grp4.pTar)*(veh.grp3.sep/2+veh.distGrp34)+(pMaxPerno)*(veh.grp3.sep/2+veh.distGrp35))/(veh.grp3.sep/2+veh.distGrp35+veh.distCarga05-i*convFactor);
				dataSet6 = Math.min(dataSet6, dataSet2);	
			} else {
				dataSet2 = 1.5*dataSet1;
			}
			
			//Peso maximo eje trasero
			var dataSet3;
			if (i*convFactor > (2*veh.distCarga05)) {
				dataSet3 = ((veh.grp3.pMax+veh.grp3.pTol-veh.grp3.pTar)*(veh.grp3.sep/2+veh.distGrp35)+(veh.grp4.pMax+veh.grp4.pTol-veh.grp4.pTar)*(veh.distGrp35-veh.distGrp34))/(i*convFactor-veh.distCarga05);
				dataSet6 = Math.min(dataSet6, dataSet3);
			} else {
				dataSet3 = 1.5*dataSet1;
			}
			/*
			//Peso min eje delantero
			var pMin1;
			if (veh.configTotal == 2) {
				pMin1 = 0.3;
			} else if (veh.configTotal == 3) {
				pMin1 = 0.25;
			} else {
				pMin1 = 0.2;
			}
			var dataSet4 = ((pMin1*(grp1.pTar+grp2.pTar)-grp1.pTar)*(distGrp12+sepGrp2-sepGrp1/2)+(grp2.pMax-grp2.pTar)*(sepGrp2/2))/((distGrp12+sepGrp2-distCarga0-i*convFactor)-pMin1*(distGrp12+sepGrp2-sepGrp1/2));
			if (dataSet4 < 0 || dataSet4 > pMaxVeh) {
				dataSet4 = pMaxVeh;
			} else {
				//dataSet4 = 
				dataSet6 = Math.min(dataSet6, dataSet4);
			}
			
			//Peso min eje de tracción
			var pMin2 = 0.15;
			var nTrac = 1;
			var nGrp2 = configTrac;			
			//var dataSet5 = 0.001*Math.round((pMin2*n*(grp1.pTar+grp2.pTar)-grp2.pTar)/(1-pMin2*n-((sepGrp1+distGrp12+sepGrp2/2-distCarga0-i*convFactor)/(sepGrp1/2+distGrp12+sepGrp2/2))));
			var dataSet5 = ((grp1.pMax-grp1.pTar)*(sepGrp1/2)+(pMin2*nTrac*(grp1.pTar+grp2.pTar)/nGrp2-grp2.pTar)*(distGrp12+sepGrp2/2))/((distCarga0+i*convFactor)+pMin2*nTrac*(distGrp12+sepGrp2/2)/nGrp2);
			//if (dataSet5 > dataSet6) {
			//	dataSet6 = null;
			//}
			*/
			var dataSet0 = +((i * 0.1).toFixed(2));
			dataSet1 =  +((0.001 * dataSet1).toFixed(2));
			dataSet2 =  +((0.001 * dataSet2).toFixed(2));
			dataSet3 =  +((0.001 * dataSet3).toFixed(2));
			dataSet4 =  +((0.001 * dataSet4).toFixed(2));
			dataSet5 =  +((0.001 * dataSet5).toFixed(2));
			dataSet6 =  +((0.001 * dataSet6).toFixed(2));
			
			datosGrafico.push([dataSet0, dataSet1, dataSet2, dataSet3, dataSet4, dataSet5, dataSet6]);			
		}
		drawGoogleChart(vehSelect, datosGrafico, 0, veh.distCarga0F);
	}


	function cargarSelectConfig(listaFuente) {
		var fieldName = listaFuente.id;
		fieldName = fieldName.substring(0, fieldName.length - 1);
		var configSelect = document.getElementById(fieldName + "c");
		
		var vehSelect = listaFuente.id;
		vehSelect = vehSelect.substring(0, vehSelect.length - 2);
		
		for(var i = configSelect.options.length-1; i >= 0; i--) {
			configSelect.remove(i);
		}
		
		for (var i = 0; i < defAxleGroup.length; i++) {
			if (defAxleGroup[i][0] == listaFuente.value) {
				var option = document.createElement("option");
				option.text = defAxleGroup[i][3];
				option.value = defAxleGroup[i][2];
				configSelect.add(option);
			}
		}
		
		var flag = true;
		
		if (listaFuente.id == vehSelect+"1e") {
			try {
				var status = document.getElementById(vehSelect+"sepGrp1input").style.display;
			}
			catch(err) {
				flag = false;
			}
			if (flag == true) {
			if (listaFuente.value == 3) {
				document.getElementById(vehSelect+"12img").style.display = 'inline';
				document.getElementById(vehSelect+"13img").style.display = 'inline';
				document.getElementById(vehSelect+"sepGrp1input").min = 240;
				document.getElementById(vehSelect+"sepGrp1input").max = 480;
				document.getElementById(vehSelect+"sepGrp1input").value = 280;
				document.getElementById(vehSelect+"sepGrp1input").style.display = 'inline';
				if (vehSelect == 'semi') {
					configSelect.value = "DDD";
					document.getElementById(dimLines[vehSelect][12][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][13][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][14][0]).style.display = 'inline';
				}
			}else if (listaFuente.value == 2) {
				document.getElementById(vehSelect+"12img").style.display = 'inline';
				document.getElementById(vehSelect+"sepGrp1input").min = 120;
				document.getElementById(vehSelect+"sepGrp1input").value = 140;
				document.getElementById(vehSelect+"sepGrp1input").style.display = 'inline';
				if (vehSelect == 'semi') {
					configSelect.value = "DD";
					document.getElementById(dimLines[vehSelect][12][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][13][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][14][0]).style.display = 'inline';
					document.getElementById(vehSelect+"13img").style.display = 'none';
				} else {
					configSelect.value = "SS";
					document.getElementById(dimLines[vehSelect][13][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][15][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][16][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][17][0]).style.display = 'inline';
				}
			} else if (listaFuente.value == 1) {
				document.getElementById(vehSelect+"12img").style.display = 'none';
				document.getElementById(vehSelect+"sepGrp1input").min = 0;
				document.getElementById(vehSelect+"sepGrp1input").value = 0;
				document.getElementById(vehSelect+"sepGrp1input").style.display = 'none';
				document.getElementById(dimLines[vehSelect][13][0]).style.display = 'none';
				document.getElementById(dimLines[vehSelect][15][0]).style.display = 'none';
				document.getElementById(dimLines[vehSelect][16][0]).style.display = 'none';
				document.getElementById(dimLines[vehSelect][17][0]).style.display = 'none';
				if (vehSelect == 'semi') {
					configSelect.value = "D";
					document.getElementById(dimLines[vehSelect][12][0]).style.display = 'none';
					document.getElementById(dimLines[vehSelect][13][0]).style.display = 'none';
					document.getElementById(dimLines[vehSelect][14][0]).style.display = 'none';
					document.getElementById(vehSelect+"13img").style.display = 'none';
					//document.getElementById(dimLines[vehSelect][17][0]).style.display = 'none';
				} else {
					configSelect.value = "S";
					document.getElementById(dimLines[vehSelect][13][0]).style.display = 'none';
					document.getElementById(dimLines[vehSelect][15][0]).style.display = 'none';
					document.getElementById(dimLines[vehSelect][16][0]).style.display = 'none';
					document.getElementById(dimLines[vehSelect][17][0]).style.display = 'none';
				}
			}
			}
		} else if (listaFuente.id == vehSelect+"2e") {
		try {
				var status = document.getElementById(vehSelect+"sepGrp2input").style.display;
			}
			catch(err) {
				flag = false;
			}
			if (flag == true) {
			if (listaFuente.value == 3) {
				document.getElementById(imgComposite[vehSelect][4][0]).style.display = 'inline';
				document.getElementById(imgComposite[vehSelect][5][0]).style.display = 'inline';
				document.getElementById(vehSelect+"sepGrp2input").min = 240;
				document.getElementById(vehSelect+"sepGrp2input").max = 480;
				document.getElementById(vehSelect+"sepGrp2input").value = 280;
				document.getElementById(vehSelect+"sepGrp2input").style.display = 'inline';
				configSelect.value = "DDD";
				if (vehSelect == 'semi') {
				
				} else {
					document.getElementById(dimLines[vehSelect][9][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][11][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][14][0]).style.display = 'inline';
				}
			} else if (listaFuente.value == 2) {
				document.getElementById(imgComposite[vehSelect][4][0]).style.display = 'inline';
				document.getElementById(imgComposite[vehSelect][5][0]).style.display = 'none';
				document.getElementById(vehSelect+"sepGrp2input").min = 120;
				document.getElementById(vehSelect+"sepGrp2input").value = 140;
				document.getElementById(vehSelect+"sepGrp2input").style.display = 'inline';
				
				configSelect.value = "DD";
				if (vehSelect == 'semi') {
				
				} else {
					document.getElementById(dimLines[vehSelect][9][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][11][0]).style.display = 'inline';
					document.getElementById(dimLines[vehSelect][14][0]).style.display = 'inline';
				}
			} else if (listaFuente.value == 1) {
				document.getElementById(imgComposite[vehSelect][4][0]).style.display = 'none';
				document.getElementById(imgComposite[vehSelect][5][0]).style.display = 'none';
				document.getElementById(vehSelect+"sepGrp2input").min = 0;
				document.getElementById(vehSelect+"sepGrp2input").value = 0;
				document.getElementById(vehSelect+"sepGrp2input").style.display = 'none';
				
				configSelect.value = "D";
				if (vehSelect == 'semi') {
				
				} else {
					document.getElementById(dimLines[vehSelect][9][0]).style.display = 'none';
					document.getElementById(dimLines[vehSelect][11][0]).style.display = 'none';
					document.getElementById(dimLines[vehSelect][14][0]).style.display = 'none';
				}
			}	
			} else {
			configSelect.value = "D";
			}
		}
		cargarTablaPesos(configSelect);
		//alert(document.getElementById(dimLines[vehSelect][11][0]).style.display);
		switch (vehSelect) {
		case 'chasis':
			dimChasis(vehSelect);
			break;
		case 'tractor':
			dimChasis(vehSelect);
			break;
		case 'semi':
			dimSemi('semi');
			break;
		}	
		//cargarTablaPesos(document.getElementById(fieldName + "c"));
		
	}
	
	function cargarTablaPesos (listaFuente) {
		var fieldName = listaFuente.id;
		fieldName = fieldName.substring(0, fieldName.length - 1);
		var fieldNum = Number(fieldName.substring(fieldName.length - 1, fieldName.length));
		
		for (var i = 0; i < defAxleGroup.length; i++) {
			if (defAxleGroup[i][2] == listaFuente.value) {
				document.getElementById(fieldName + "pMax").value = defAxleGroup[i][4];
				document.getElementById(fieldName + "pTol").value = defAxleGroup[i][5];
				pGrupos[fieldNum][4] = defAxleGroup[i][4];
			}
		}
	}
	
	function dimErrCheck (vehSelect, inputFuente) {
		var fieldName = inputFuente.id;
		//fieldName = fieldName.substring(0, fieldName.length - 1);
		
		
		//var vehSelect = inputFuente.id;
		//vehSelect = vehSelect.substring(0, vehSelect.length - 2);
	
		var flag = false;
		//for (var i = 0; i < inputBoxes[vehSelect].length - 1; i++) {
			
			var val = Number(document.getElementById(fieldName).value);
			var min = Number(document.getElementById(fieldName).min);
			var max = Number(document.getElementById(fieldName).max);
						
			if (val < min) {
				flag = true;
				document.getElementById(fieldName).style.backgroundColor = "#F78181";
				document.getElementById(fieldName).value = min;
			} else if (val > max) {
				flag = true;
				document.getElementById(fieldName).style.backgroundColor = "#F78181";
				document.getElementById(fieldName).value = max;
			} else {
				document.getElementById(fieldName).style.backgroundColor = "#FFFFFF";
			}
		//}
		
		//if (flag == false){
			if (vehSelect == 'chasis' || vehSelect == 'tractor') {
				dimChasis(vehSelect);
			} else if (vehSelect == 'semi') {
				dimSemi(vehSelect);
			}
		//}
	}
	
	function dimChasis(vehSelect) {
		/*Función para dimensionar dinámicamente los vehículos.*/
		var posLeft = 0;
		var defWidth = 0;
			
		var veh = vehConfig(vehSelect);
		
		veh.grp1.sep = Math.round(veh.grp1.sep/convCmToPx);
		veh.distGrp12 = Math.round(veh.distGrp12/convCmToPx);
		veh.grp2.sep = Math.round(veh.grp2.sep/convCmToPx);
		veh.distCarga0 = Math.round(veh.distCarga0/convCmToPx);
		veh.distCargaF = Math.round(veh.distCargaF/convCmToPx);
		
		//Linea base
		posLeft = posBaseLine;
		document.getElementById(dimLines[vehSelect][0][0]).style.left = posLeft + "px";
		document.getElementById(dimLines[vehSelect][2][0]).style.left = posLeft + dimLines[vehSelect][2][2] + "px";
		document.getElementById(dimLines[vehSelect][5][0]).style.left = posLeft + dimLines[vehSelect][5][2] + "px";
		document.getElementById(dimLines[vehSelect][7][0]).style.left = posLeft + dimLines[vehSelect][7][2] + "px";
		document.getElementById(dimLines[vehSelect][10][0]).style.left = posLeft + dimLines[vehSelect][10][2] + "px";
		document.getElementById(dimLines[vehSelect][12][0]).style.left = posLeft + dimLines[vehSelect][12][2] + "px";
		document.getElementById(dimLines[vehSelect][13][0]).style.left = posLeft + dimLines[vehSelect][13][2] + "px";
		document.getElementById(dimLines[vehSelect][15][0]).style.left = posLeft + dimLines[vehSelect][15][2] + "px";
		document.getElementById(dimLines[vehSelect][17][0]).style.left = posLeft + dimLines[vehSelect][17][2] + "px";
			
		// Dimensionamiento por modificación de posción de caja de carga
		posLeft = posBaseLine + veh.distCarga0;
		defWidth = veh.distCarga0;
		document.getElementById(dimLines[vehSelect][0][0]).style.width = defWidth + "px";
		document.getElementById(vehSelect+"Graf").style.left = posLeft + "px"; //"position: absolute; top: 100px; left: " + posLeft + "px; width: 100%;";
		document.getElementById(dimLines[vehSelect][1][0]).style.left = posLeft + "px";
		document.getElementById(dimLines[vehSelect][3][0]).style.left = posLeft + dimLines[vehSelect][3][2] + "px";
		document.getElementById(dimLines[vehSelect][6][0]).style.left = posLeft + dimLines[vehSelect][6][2] + "px";
		document.getElementById(dimLines[vehSelect][5][0]).style.width = defWidth + dimLines[vehSelect][5][3] + "px";
		
		posLeft = posBaseLine + veh.distCarga0 + (veh.distCargaF - inputBoxes[vehSelect][4][6])/2;
		document.getElementById(vehSelect+inputBoxes[vehSelect][4][0]).style.left = posLeft + "px";
		
		// Dimensionamiento por modificación de tamaño de caja de carga
		posLeft = posBaseLine + veh.distCarga0 + veh.distCargaF;
		defWidth = veh.distCargaF;
		document.getElementById(dimLines[vehSelect][4][0]).style.left = posLeft + dimLines[vehSelect][4][2] + "px";
		document.getElementById(dimLines[vehSelect][1][0]).style.width = defWidth + dimLines[vehSelect][1][3] + "px";
		document.getElementById(imgComposite[vehSelect][0][0]).style.left = posLeft + imgComposite[vehSelect][0][3] + "px"; // "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[vehSelect][0][2] + ";";
		document.getElementById(dimLines[vehSelect][6][0]).style.width = defWidth + dimLines[vehSelect][6][3] + "px";
		
		// Dimensionamiento por modificación de separación de los ejes delanteros
		posLeft = posBaseLine + veh.grp1.sep;
		document.getElementById(dimLines[vehSelect][16][0]).style.left = posLeft + dimLines[vehSelect][17][2] + "px";
		document.getElementById(imgComposite[vehSelect][2][0]).style.left = posLeft + imgComposite[vehSelect][2][3] + "px";
		
		defWidth = veh.grp1.sep;
		document.getElementById(dimLines[vehSelect][13][0]).style.width = defWidth + dimLines[vehSelect][13][3] + "px";
		document.getElementById(dimLines[vehSelect][17][0]).style.width = defWidth + dimLines[vehSelect][17][3] + "px";
		
		posLeft = posBaseLine + (veh.grp1.sep - inputBoxes[vehSelect][0][6])/2;
		document.getElementById(vehSelect+inputBoxes[vehSelect][0][0]).style.left = posLeft + "px";
		
		defWidth = Math.max(100, veh.grp1.sep);
		posLeft = posBaseLine + (veh.grp1.sep - defWidth)/2 - 5; //+ dimSepGrp1 
		document.getElementById(vehSelect+"1").style.left = posLeft + "px"; //"position: absolute; left: " + posLeft + "px; top: 400px; width: " + width + "px; padding-top: 5px; padding-left: 5px; padding-right: 5px; background-color: #C4D3DF";
		document.getElementById(vehSelect+"1").style.width = defWidth + "px";
		document.getElementById(vehSelect+"1Peso").style.left = posLeft + "px"; // = "position: absolute; left: " + posLeft + "px; width: " + width + "px;";
		document.getElementById(vehSelect+"1Peso").style.width = defWidth + "px";
		
		// Dimensionamiento por modificación de la distancia entre grupos
		defWidth = veh.distGrp12;
		document.getElementById(dimLines[vehSelect][12][0]).style.width = defWidth + dimLines[vehSelect][12][3] + "px";
		
		defWidth = veh.distGrp12; //(veh.distGrp12 - inputBoxes[vehSelect][1][6])/2;
		document.getElementById(dimLines[vehSelect][10][0]).style.width = defWidth + dimLines[vehSelect][10][3] + "px";
		
		posLeft = posBaseLine + (veh.distGrp12 - inputBoxes[vehSelect][1][6])/2;
		document.getElementById(vehSelect+inputBoxes[vehSelect][1][0]).style.left = posLeft + inputBoxes[vehSelect][1][5] + "px"; //Math.round(posBaseLine + (veh.distGrp12 - inputBoxes[vehSelect][1][6]) / 2);
		
		posLeft = posBaseLine + veh.distGrp12;// - 155; //Math.round(inputBoxes[vehSelect][1][1] / convCmToPx) - 155;  
		document.getElementById(imgComposite[vehSelect][3][0]).style.left = posLeft + imgComposite[vehSelect][3][3] + "px"; //"position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[vehSelect][3][2] + ";";
		document.getElementById(dimLines[vehSelect][8][0]).style.left = posLeft + dimLines[vehSelect][8][2] + "px";
		document.getElementById(dimLines[vehSelect][11][0]).style.left = posLeft + dimLines[vehSelect][11][2] + "px";
		document.getElementById(dimLines[vehSelect][14][0]).style.left = posLeft + dimLines[vehSelect][14][2] + "px";
		
		// Dimensionamiento por modificación de separación de los ejes traseros
		document.getElementById(imgComposite[vehSelect][5][0]).style.left = posLeft + veh.grp2.sep/2 + imgComposite[vehSelect][4][3] + "px";
		document.getElementById(imgComposite[vehSelect][4][0]).style.left = posLeft + veh.grp2.sep + imgComposite[vehSelect][5][3] + "px";
		
		posLeft = posBaseLine + veh.distGrp12 + veh.grp2.sep/2;
		defWidth = Math.max(100, veh.grp2.sep);
		posLeft = posLeft - defWidth / 2 - 5; //+ dimSepGrp1 
		document.getElementById(vehSelect+"2").style.left = posLeft + "px"; 
		document.getElementById(vehSelect+"2").style.width = defWidth + "px";
		document.getElementById(vehSelect+"2Peso").style.left = posLeft + "px"; 
		document.getElementById(vehSelect+"2Peso").style.width = defWidth + "px";
		
		defWidth = veh.grp2.sep; 
		document.getElementById(dimLines[vehSelect][11][0]).style.width = defWidth + dimLines[vehSelect][11][3] + "px";
		document.getElementById(dimLines[vehSelect][14][0]).style.width = defWidth + dimLines[vehSelect][14][3] + "px";
		
		posLeft = posBaseLine + veh.distGrp12 + (veh.grp2.sep - inputBoxes[vehSelect][2][6])/2;
		document.getElementById(vehSelect+inputBoxes[vehSelect][2][0]).style.left = posLeft + inputBoxes[vehSelect][2][5] + "px";
		
		posLeft = posBaseLine + veh.distGrp12 + veh.grp2.sep;
		document.getElementById(dimLines[vehSelect][9][0]).style.left = posLeft + dimLines[vehSelect][9][2] + "px";
	}
	
	function dimSemi (vehSelect) {
		/*Función para dimensionar dinámicamente el semirremolque.*/
		
		dimChasis('tractor');
		document.getElementById('tractorGraf').style.display = 'none';
		document.getElementById(dimLines.tractor[2][0]).style.display = 'inline';
		document.getElementById(dimLines.tractor[3][0]).style.display = 'inline';
		document.getElementById(dimLines.tractor[5][0]).style.display = 'inline';
		
		var posLeft = 0;
		var defWidth = 0;
		
		// Actualizar los valores de dimensiones
		/*
		inputBoxes[vehSelect][0][1] = Number(document.getElementById(vehSelect+inputBoxes[vehSelect][0][0]).value); //distGrp35input
		inputBoxes[vehSelect][1][1] = Number(document.getElementById(vehSelect+inputBoxes[vehSelect][1][0]).value); //distCarga05input
		inputBoxes[vehSelect][2][1] = Number(document.getElementById(vehSelect+inputBoxes[vehSelect][2][0]).value); //distCarga0Finput
		inputBoxes[vehSelect][3][1] = Number(document.getElementById(vehSelect+inputBoxes[vehSelect][3][0]).value); //distGrp34input
		inputBoxes[vehSelect][4][1] = Number(document.getElementById(vehSelect+inputBoxes[vehSelect][4][0]).value); //sepGrp3input
		inputBoxes.tractor[5][1] = Number(document.getElementById('tractor'+inputBoxes.tractor[5][0]).value);//inputBoxes[vehSelect][5][3] = inputBoxes[vehSelect][4][1];
		*/
		var veh = vehConfig(vehSelect);
		
		//veh.grp1.sep = Math.round(veh.grp1.sep/convCmToPx);
		veh.distGrp12 = Math.round(veh.distGrp12/convCmToPx);
		//veh.grp2.sep = Math.round(veh.grp2.sep/convCmToPx);
		//veh.distCarga0 = Math.round(veh.distCarga0/convCmToPx);
		//veh.distCargaF = Math.round(veh.distCargaF/convCmToPx);
		veh.distGrp25 = Math.round(veh.distGrp25/convCmToPx);
		veh.distGrp35 = Math.round(veh.distGrp35/convCmToPx);
		veh.distCarga05 = Math.round(veh.distCarga05/convCmToPx);
		veh.distCarga0F = Math.round(veh.distCarga0F/convCmToPx);
		veh.distGrp34 = Math.round(veh.distGrp34/convCmToPx);
		veh.grp3.sep = Math.round(veh.grp3.sep/convCmToPx);
		
		// Dimensionamiento por modificación de posción de enganche
		posLeft = posBaseLine + veh.distGrp12;
		defWidth = document.getElementById(vehSelect+'distGrp25input').style.width;
		defWidth = Number(defWidth.substring(0, defWidth.length - 2));
		
		if (veh.distGrp25 < 0) {
			document.getElementById(vehSelect+'distGrp25input').style.left = posLeft + veh.distGrp25 - inputBoxes[vehSelect][5][5] - dimLines.tractor[5][2] - defWidth + "px";
			document.getElementById(dimLines.tractor[2][0]).style.left = posLeft + veh.distGrp25 - dimLines.tractor[2][2] + "px";
			document.getElementById(dimLines.tractor[5][0]).style.left = posLeft + veh.distGrp25 - dimLines.tractor[2][2] - dimLines.tractor[5][2] + "px";
			document.getElementById(dimLines.tractor[5][0]).style.width = Math.abs(veh.distGrp25) + 2*(dimLines.tractor[2][2] + dimLines.tractor[5][2])  + "px";
			document.getElementById(dimLines.tractor[3][0]).style.left = posLeft + "px";
		} else {
			document.getElementById(vehSelect+'distGrp25input').style.left = posLeft + veh.distGrp25 + inputBoxes[vehSelect][5][5] + dimLines.tractor[5][2]  + "px";
			document.getElementById(dimLines.tractor[2][0]).style.left = posLeft - dimLines.tractor[2][2] + "px";
			document.getElementById(dimLines.tractor[5][0]).style.left = posLeft - dimLines.tractor[2][2] - dimLines.tractor[5][2] + "px";
			document.getElementById(dimLines.tractor[5][0]).style.width = Math.abs(veh.distGrp25) + 2*(dimLines.tractor[2][2] + dimLines.tractor[5][2]) + "px";
			document.getElementById(dimLines.tractor[3][0]).style.left = posLeft + veh.distGrp25 + "px";
		}
		
		
		
		
		// Dimensionamiento por modificación de tamaño y posción de caja de carga
		posLeft = posBaseLine + veh.distGrp12 + veh.distGrp25 - veh.distCarga05;
		
		document.getElementById(vehSelect+"Graf").style.left = posLeft + "px";
		document.getElementById(vehSelect+"Graf").style.top = 87 + "px";

		document.getElementById(vehSelect+inputBoxes[vehSelect][1][0]).style.left = posLeft + inputBoxes[vehSelect][1][5] + "px";

		document.getElementById(dimLines[vehSelect][0][0]).style.left = posLeft + "px";
		document.getElementById(dimLines[vehSelect][0][0]).style.width = veh.distCarga0F - 2 + "px";
		
		document.getElementById(dimLines[vehSelect][1][0]).style.left = posLeft + "px";
		
		document.getElementById(dimLines[vehSelect][2][0]).style.left = posLeft + veh.distCarga0F + dimLines[vehSelect][2][2] + "px";

		defWidth = document.getElementById(vehSelect+inputBoxes[vehSelect][2][0]).style.width;
		defWidth = Number(defWidth.substring(0, defWidth.length - 2));
		
		document.getElementById(vehSelect+inputBoxes[vehSelect][2][0]).style.left = posLeft + (veh.distCarga0F - defWidth)/2 + "px";
		
		document.getElementById(dimLines[vehSelect][3][0]).style.left = posLeft + "px";
		document.getElementById(dimLines[vehSelect][3][0]).style.width = (veh.distCarga0F - defWidth) / 2 + "px";
		
		document.getElementById(dimLines[vehSelect][4][0]).style.left = posLeft + (veh.distCarga0F + defWidth) / 2 + "px";
		document.getElementById(dimLines[vehSelect][4][0]).style.width = (veh.distCarga0F - defWidth) / 2 + "px";
		
		document.getElementById(dimLines[vehSelect][6][0]).style.left = posLeft + dimLines[vehSelect][6][2] + "px";
		
		document.getElementById(dimLines[vehSelect][9][0]).style.left = posLeft + dimLines[vehSelect][9][2] + "px";
		
		document.getElementById(imgComposite[vehSelect][1][0]).style.left = posLeft + imgComposite[vehSelect][1][3] + "px"; //"position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[vehSelect][1][2] + ";";

		posLeft = posBaseLine + veh.distGrp12 + veh.distGrp25 - veh.distCarga05 + veh.distCarga0F; 
		document.getElementById(imgComposite[vehSelect][0][0]).style.left = posLeft + imgComposite[vehSelect][0][3] + "px"; //"position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[vehSelect][0][2] + ";";
		
		// Dimensionamiento por modificación de la distancia entre grupos
		posLeft = posBaseLine + veh.distGrp12 + veh.distGrp25;
		defWidth = document.getElementById(vehSelect+inputBoxes[vehSelect][0][0]).style.width;
		defWidth = Number(defWidth.substring(0, defWidth.length - 2));
		
		document.getElementById(dimLines.tractor[0][0]).style.width = posLeft + "px";
		
		document.getElementById(vehSelect+inputBoxes[vehSelect][0][0]).style.left = posLeft + (veh.distGrp35 - defWidth)/2 + inputBoxes[vehSelect][0][5] + "px";
		
		document.getElementById(dimLines[vehSelect][7][0]).style.left = posLeft + dimLines[vehSelect][7][2] + "px";

		document.getElementById(dimLines[vehSelect][8][0]).style.left = posLeft + veh.distGrp35 + dimLines[vehSelect][8][2] + "px";
		
		document.getElementById(dimLines[vehSelect][5][0]).style.left = posLeft + dimLines[vehSelect][5][2] + "px";
		document.getElementById(dimLines[vehSelect][5][0]).style.width = veh.distGrp35 + "px";
		
		document.getElementById(dimLines[vehSelect][10][0]).style.left = posLeft + (veh.distGrp35 + defWidth)/2 + dimLines[vehSelect][10][2] + "px";
		document.getElementById(dimLines[vehSelect][10][0]).style.width = (veh.distGrp35 - defWidth)/2 + "px";
		document.getElementById(dimLines[vehSelect][9][0]).style.width = (veh.distGrp35 - defWidth)/2 + veh.distCarga05 + dimLines[vehSelect][9][3] + "px";
		
		// Dimensionamiento por modificación de la distancia entre grupos y entre eje grupo trasero
		posLeft = posBaseLine + veh.distGrp12 + veh.distGrp25 + veh.distGrp35;
		
		document.getElementById(imgComposite[vehSelect][3][0]).style.left = posLeft + imgComposite[vehSelect][3][3] + "px";
		document.getElementById(imgComposite[vehSelect][4][0]).style.left = posLeft + veh.grp3.sep + imgComposite[vehSelect][5][3] + "px";
		document.getElementById(imgComposite[vehSelect][5][0]).style.left = posLeft + veh.grp3.sep/2 + imgComposite[vehSelect][4][3] + "px";
		
		defWidth = document.getElementById(vehSelect+inputBoxes[vehSelect][4][0]).style.width;
		defWidth = Number(defWidth.substring(0, defWidth.length - 2));
		document.getElementById(vehSelect+inputBoxes[vehSelect][4][0]).style.left = posLeft + (veh.grp3.sep - defWidth)/2 + "px";
		
		defWidth = veh.grp3.sep;
		document.getElementById(dimLines[vehSelect][11][0]).style.left = posLeft + dimLines[vehSelect][11][2] + "px";
		document.getElementById(dimLines[vehSelect][11][0]).style.width = defWidth + dimLines[vehSelect][11][3] + "px";
		
		document.getElementById(dimLines[vehSelect][12][0]).style.left = posLeft + dimLines[vehSelect][12][2] + "px";
		document.getElementById(dimLines[vehSelect][14][0]).style.left = posLeft + dimLines[vehSelect][14][2] + "px";
		document.getElementById(dimLines[vehSelect][14][0]).style.width = defWidth + dimLines[vehSelect][14][3] + "px";
		//document.getElementById(dimLines[vehSelect][15][0]).style.left = posLeft + (veh.grp3.sep + width)/2 + dimLines[vehSelect][15][2];
		//document.getElementById(dimLines[vehSelect][15][0]).style.width = (veh.grp3.sep - width)/2;
		document.getElementById(dimLines[vehSelect][13][0]).style.left = posLeft + defWidth + dimLines[vehSelect][13][2] + "px";
		
		defWidth = document.getElementById(vehSelect+"1").style.width;
		defWidth = Number(defWidth.substring(0, defWidth.length - 2));
		document.getElementById(vehSelect+"1").style.left =  posLeft + (veh.grp3.sep - defWidth)/2 + "px";
				
		// Dimensionamiento por modificación de la distancia entre grupos y distancia al eje flotante
		document.getElementById(imgComposite[vehSelect][2][0]).style.left = posLeft - veh.distGrp34 + imgComposite[vehSelect][2][3] + "px";
		
		defWidth = document.getElementById(vehSelect+inputBoxes[vehSelect][3][0]).style.width;
		defWidth = Number(defWidth.substring(0, defWidth.length - 2));
		document.getElementById(vehSelect+inputBoxes[vehSelect][3][0]).style.left = posLeft - (veh.distGrp34 + defWidth)/2 + "px";
		
		document.getElementById(dimLines[vehSelect][16][0]).style.left = posLeft - veh.distGrp34 + dimLines[vehSelect][16][2] + "px";
		document.getElementById(dimLines[vehSelect][16][0]).style.width = veh.distGrp34 + dimLines[vehSelect][16][3] + "px";
		
		document.getElementById(dimLines[vehSelect][17][0]).style.left = posLeft - veh.distGrp34 + dimLines[vehSelect][17][2] + "px";
		document.getElementById(dimLines[vehSelect][19][0]).style.left = posLeft - veh.distGrp34 + dimLines[vehSelect][19][2] + "px";
		document.getElementById(dimLines[vehSelect][19][0]).style.width = (veh.distGrp34 - defWidth)/2 + "px";
		document.getElementById(dimLines[vehSelect][20][0]).style.left = posLeft - (veh.distGrp34 - defWidth)/2 + dimLines[vehSelect][20][2] + "px";
		document.getElementById(dimLines[vehSelect][20][0]).style.width = (veh.distGrp34 - defWidth)/2 + "px";
		document.getElementById(dimLines[vehSelect][18][0]).style.left = posLeft + dimLines[vehSelect][18][2] + "px";
		
		defWidth = document.getElementById(vehSelect+"2").style.width;
		defWidth = Number(defWidth.substring(0, defWidth.length - 2));
		document.getElementById(vehSelect+"2").style.left =  posLeft - veh.distGrp34 - defWidth/2 + "px";
	}
	
	function inicializarDimCtrl (vehSelect) { 
		// Inicialización de las lineas de dimensionamiento
		for (var i = 0; i < dimLines[vehSelect].length; i++) {
			var dimLine = document.createElement("div");
			dimLine.id = dimLines[vehSelect][i][0];
			dimLine.style = "top: " + dimLines[vehSelect][i][1] + "px; height: " + dimLines[vehSelect][i][4] + "px; display: " + dimLines[vehSelect][i][6] + ";";
			document.getElementById(diagAreaId).appendChild(dimLine);
			if (dimLines[vehSelect][i][7] != "") {
				document.getElementById(dimLine.id).setAttribute("class", dimLines[vehSelect][i][7]);
			}
		}
		
		// Inicialización del dibujo del vehículo
		for (var i = 0; i < imgComposite[vehSelect].length; i++) {
			var imagen = document.createElement("img");
			imagen.id = imgComposite[vehSelect][i][0]; 
			imagen.src = imgComposite[vehSelect][i][1];	
			posLeft = posBaseLine + imgComposite[vehSelect][i][3];
			imagen.style = "position: absolute; left: " + posLeft + "px; height: 400px; display: " + imgComposite[vehSelect][i][2] + ";";
			document.getElementById(diagAreaId).appendChild(imagen);
		}
		
		var container = document.createElement("div");
			container.id = vehSelect + "Graf"; 
			container.style = "position: absolute; top: 100px; width: 100%;";  //
		document.getElementById(diagAreaId).appendChild(container);	
	}
	
	function inicializarConfigCtrl (vehSelect) {
		for (var i = 0; i < inputBoxes[vehSelect].length - 1; i++) {
			var inputBox = document.createElement("input");
				inputBox.id = vehSelect + inputBoxes[vehSelect][i][0];
				inputBox.type = "number"; 
				inputBox.value = inputBoxes[vehSelect][i][1];
				inputBox.min = inputBoxes[vehSelect][i][2];
				inputBox.max = inputBoxes[vehSelect][i][3];
				inputBox.style = "top: " + inputBoxes[vehSelect][i][4] + "px; display: " + inputBoxes[vehSelect][i][8] + ";";
				inputBox.onchange = function(){dimErrCheck(vehSelect, this);};
			document.getElementById(diagAreaId).appendChild(inputBox);
			document.getElementById(inputBox.id).setAttribute("class", "diminputBoxes");
		}
	
		// Barra de pesos calculados
		var container = document.createElement("div");
		container.id = vehSelect + "Peso";
		container.style = "position: absolute; top: 303px; height: 31px; width: 100%; background-color: #6A6A6A; ";   //  display: none
		document.getElementById(diagAreaId).appendChild(container);
			
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
				inputBox.style = "float: right; font-size: 10pt; text-align: right; color: #C4D3DF; width: 20%; border-style: solid; border-color: #6A6A6A; background-color: #6A6A6A;";
				inputBox.disabled = true; 
			innerContainer.appendChild(inputBox);
			document.getElementById(container.id).appendChild(innerContainer);
			document.getElementById(vehSelect + i + "p").setAttribute("class", "tablainputBoxes");
		}
			
		// Tabla para encabezados de fila
		container = document.createElement("div");
		container.id = vehSelect + 0;
		container.style = "position: absolute; right: 0px; top: 400px; width: 100px; padding-top: 5px; padding-left: 5px; padding-right: 5px; background-color: #C4D3DF";
		document.getElementById(diagAreaId).appendChild(container);
				
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
			document.getElementById(diagAreaId).appendChild(container);			
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
					for (var j = 0; j < init[vehSelect].grupo[g-1].configPermitido.length; j++) {
						var option = document.createElement("option");
						for (var k = 0; k < defAxleGroup.length; k++) {
							if (defAxleGroup[k][0] == init[vehSelect].grupo[g-1].configPermitido[j]) 
								option.text = defAxleGroup[k][1];
						}
						if (init[vehSelect].grupo[g-1].configPermitido[j] == init[vehSelect].grupo[g-1].config) 
							option.selected = true;						
						option.value = init[vehSelect].grupo[g-1].configPermitido[j];
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
					inputBox.value = init[vehSelect].grupo[g-1].tara;
				document.getElementById(vehSelect + g).appendChild(inputBox);
				
			}
			
		}
	}
	
	function inicializarVeh (vehSelect) {
		var posLeft = 0;
		var posTop = 0;
		var width = 0;
		
		if (typeof vehSelect != 'string')
			vehSelect = vehSelect.id; 
		
		// Limpieza del area de dibujo
		if (document.getElementById(diagCanvasId).children.length > 0) {
			for (var i=0; i < document.getElementById(diagCanvasId).children.length; i++)
				document.getElementById(diagCanvasId).removeChild(document.getElementById(diagCanvasId).childNodes[i]);
		}	
		
		inputBoxes = {
				//[ejeId, value, min, max, top, left, width, formatting, display]
			chasis: [
				["sepGrp1input", init.chasis.grupo[0].sep, 0, 240, posEjesLine - 30, 0, 50, , "none"],
				["distGrp12input", init.chasis.distGrp12, 0, 1050, posEjesLine - 10, 0, 50, , "inline"],
				["sepGrp2input", init.chasis.grupo[1].sep, 0, 240, posEjesLine - 10, 0, 50, , "none"],
				["distCarga0input", init.chasis.distCarga0, 50, 300, posCajaLine - 10, posBaseLine - 78, 50, , "inline"],
				["distCargaFinput", init.chasis.distCargaF, 400, 1200, posCajaLine - 10, 0, 50, , "inline"],
				["distCarga", init.chasis.distCargaF / 2, 0, 600, "position: absolute; top: 51px; width: 70px; padding: 5px", 151],
			],
			tractor: [
				["sepGrp1input", init.tractor.grupo[0].sep, 0, 240, posEjesLine - 30, 0, 50, , "none"],
				["distGrp12input", init.tractor.distGrp12, 0, 1050, posEjesLine - 10, 0, 50, , "inline"],
				["sepGrp2input", init.tractor.grupo[1].sep, 0, 240, posEjesLine - 10, 0, 50, , "none"],
				["distCarga0input", init.tractor.distCarga0, 50, 300, posCajaLine - 10, 0, 50, , "none"],
				["distCargaFinput", init.tractor.distCargaF, 50, 200, posCajaLine - 10, 0, 50, , "none"],
				//["distGrp25input", init.tractor.distGrp25, -100, 100, posCajaLine + 150, 19, 50, , "none"],
				["distCarga", init.tractor.distCargaF / 2, 0, 600, "position: absolute; top: 51px; width: 70px; padding: 5px", 151],
			],
			semi: [
				["distGrp35input", init.semi.distGrp35, 600, 1200, posCajaLine - 10, 0, 50, , "inline"],
				["distCarga05input", init.semi.distCarga05, 50, 300, posCajaLine - 10, -88, 50, , "inline"],
				["distCarga0Finput", init.semi.distCarga0F, 600, 1650, posCajaLine - 40, 0, 50, , "inline"],
				["distGrp34input", init.semi.distGrp34, 240, 400, posEjesLine - 10, 0, 50, , "inline"],
				["sepGrp1input", init.tractor.grupo[1].sep, 0, 240, posEjesLine - 10, 0, 50, , "none"],
				["distGrp25input", init.tractor.distGrp25, -100, 100, posCajaLine + 150, 19, 50, , "inline"],
				["distCarga", init.tractor.distCargaF / 2, 0, 600, "position: absolute; top: 51px; width: 70px; padding: 5px", 151],
			]
		};
		
		dimLines = {
			chasis: [
				//id, top, left, width, height, lineStyle, display, class
				["lineaBaseV", 0, 0, 0, posPisoCaja, "", "inline", "dimLineVert1"],
				["cajaCargaV", 0, 0, -2, posPisoCaja, "", "inline", "dimLineVert2"],
				["lineaCajaT1", posCajaLine - 3, -19, 0, 0, "", "inline", "triangle_right"],
				["lineaCajaT2", posCajaLine - 3, 0, 0, 0, "", "inline", "triangle_left"],
				["lineaCajaT3", posCajaLine - 3, -19, 0, 0, "", "inline", "triangle_right"],
				["lineaCaja1", posCajaLine, -29, 29, 0, "", "inline", "dimLineHoriz"],
				["lineaCaja2", posCajaLine, 0, 0, 0, "", "inline", "dimLineHoriz"],
				["lineaEjesT1", posEjesLine - 3, 0, 0, 0, "", "inline", "triangle_left"],
				["lineaEjesT2", posEjesLine - 3, -19, 0, 0, "", "inline", "triangle_right"],
				["lineaEjesT3", posEjesLine - 3, -1, 0, 0, "", "none", "triangle_left"],
				["lineaEjes1", posEjesLine, 0, 0, 0, "", "inline", "dimLineHoriz"],
				["lineaEjes2", posEjesLine, 0, 0, 0, "", "none", "dimLineHoriz"],
				//["lineaEjes3", posEjesLine, 0, 29, 0, "", "none", ""],
				["entreGruposV", posPisoCaja, 0, -2, 150, "", "inline", "dimLineVert2"],
				["entreEjes1V", posPisoCaja, 0, -2, 150, "", "none", "dimLineVert2"],
				["entreEjes2V", posPisoCaja, 0, -2, 150, "", "none", "dimLineVert3"],
				["lineaGrpT1", posEjesLine - 23, -19, 0, 0, "", "none", "triangle_right"],
				["lineaGrpT2", posEjesLine - 23, 0, 0, 0, "", "none", "triangle_left"],
				["lineaGrp1", posEjesLine - 20, 0, 0, 0, "", "none", "dimLineHoriz"],
			],
			tractor: [
				//id, top, left, width, height, lineStyle, display, class
				["lineaBaseV", 0, 0, 0, posPisoCaja, "", "none", "dimLineVert1"],
				["cajaCargaV", 0, 0, -2, posPisoCaja, "", "none", "dimLineVert2"],
				["lineaCajaT1", posCajaLine + 157, 19, 0, 0, "", "none", "triangle_right"],
				["lineaCajaT2", posCajaLine + 157, 0, 0, 0, "", "none", "triangle_left"],
				["lineaCajaT3", posCajaLine - 3, -19, 0, 0, "", "none", "triangle_right"],
				["lineaCaja1", posCajaLine + 160, 10, 0, 0, "", "none", "dimLineHoriz"],
				["lineaCaja2", posCajaLine, 0, 0, 0, "", "none", "dimLineHoriz"],
				["lineaEjesT1", posEjesLine - 3, 0, 0, 0, "", "inline", "triangle_left"],
				["lineaEjesT2", posEjesLine - 3, -19, 0, 0, "", "inline", "triangle_right"],
				["lineaEjesT3", posEjesLine - 3, -1, 0, 0, "", "none", "triangle_left"],
				["lineaEjes1", posEjesLine, 0, 0, 0, "", "inline", "dimLineHoriz"],
				["lineaEjes2", posEjesLine, 0, 0, 0, "", "none", "dimLineHoriz"],
				//["lineaEjes3", posEjesLine, 0, 29, 0, "", "none", "dimLineHoriz"],
				["entreGruposV", posPisoCaja - 50, 0, -2, 200, "", "inline", "dimLineVert2"],
				["entreEjes1V", posPisoCaja, 0, -2, 150, "", "none", "dimLineVert2"],
				["entreEjes2V", posPisoCaja, 0, -2, 150, "", "none", "dimLineVert3"],
				["lineaGrpT1", posEjesLine - 23, -19, 0, 0, "", "none", "triangle_right"],
				["lineaGrpT2", posEjesLine - 23, 0, 0, 0, "", "none", "triangle_left"],
				["lineaGrp1", posEjesLine - 20, 0, 0, 0, "", "none", "dimLineHoriz"],
			],
			semi: [
				//id, top, left_offset, width, height, lineStyle, display, class
				//dimensiones de caja de carga
				["semiCajaCarga", 0, posBaseLine, (inputBoxes.semi[2][1] / convCmToPx) - 2, posPisoCaja, "", "inline", "dimLineVert2"],
				["semiLineaCajaT1", posCajaLine - 33, 0, 0, 0, "", "inline", "triangle_left"],
				["semiLineaCajaT2", posCajaLine - 33, -18, 0, 0, "", "inline", "triangle_right"],
				["semiLineaCaja1", posCajaLine - 30, posBaseLine - 29, (inputBoxes.semi[3][1] / convCmToPx) + (inputBoxes.semi[4][1] / (2 * convCmToPx)) + 29 - 35, 0, "", "inline", "dimLineHoriz"],
				["semiLineaCaja2", posCajaLine - 30, posBaseLine + (inputBoxes.semi[3][1] / convCmToPx) + (inputBoxes.semi[4][1] / (2 * convCmToPx)) + 35, (inputBoxes.semi[4][1] / (2 * convCmToPx)) - 35, 0, "", "inline", "dimLineHoriz"],
				//dimensiones con respecto al plato de enganche
				["semiEntreGrupos1", 0, 0, (inputBoxes.semi[2][1] / convCmToPx) - 2, posPisoCaja, "", "inline", "dimLineVert2"],
				["semiLineaCajaT3", posCajaLine - 3, -18, 0, 0, "", "inline", "triangle_right"],
				["semiLineaCajaT4", posCajaLine - 3, 0, 0, 0, "", "inline", "triangle_left"],
				["semiLineaCajaT5", posCajaLine - 3, -18, 0, 0, "", "inline", "triangle_right"],
				["semiLineaCaja3", posCajaLine, -35, 35, 0, "", "inline", "dimLineHoriz"],
				["semiLineaCaja4", posCajaLine, 0, 0, 0, "", "inline", "dimLineHoriz"],
				//dimensiones del grupo 3
				["semiEntreGrupos2", posPisoCaja, 0, -2, 0, "", "inline", "dimLineVert2"],
				["semiLineaEjesT1", posEjesLine - 3, -19, 0, 0, "", "none", "triangle_right"],
				["semiLineaEjesT2", posEjesLine - 3, 0, 0, 0, "", "none", "triangle_left"],
				["semiLineaEjes1", posEjesLine, 0, 0, 0, "", "none", "dimLineHoriz"],
				["semiLineaEjes2", posEjesLine, posBaseLine + (inputBoxes.semi[1][1] / (2 * convCmToPx)) + 35, (inputBoxes.semi[1][1] / (2 * convCmToPx)) - 35, 0, "", "none", "dimLineHoriz"],
				//dimensiones del eje flotante
				["semiEntreGrupos3", posPisoCaja, 0, -2, 150, "", "inline", "dimLineVert2"],
				["semiLineaEjesT3", posEjesLine - 3, 0, 0, 0, "", "inline", "triangle_left"],
				["semiLineaEjesT4", posEjesLine - 3, -18, 0, 0, "", "inline", "triangle_right"],
				["semiLineaEjes3", posEjesLine, 0, (inputBoxes.semi[1][1] / (2 * convCmToPx)) - 35, 0, "", "inline", "dimLineHoriz"],
				["semiLineaEjes4", posEjesLine, 0, (inputBoxes.semi[1][1] / (2 * convCmToPx)) - 35, 0, "", "inline", "dimLineHoriz"],
			]
		};

		// Inicialización del area de diagrama para el vehículo
		var diagArea = document.createElement("div");
			diagArea.id = "diagArea";
			diagArea.style = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%"
		document.getElementById(diagCanvasId).appendChild(diagArea);

		switch (vehSelect) { 
			case 'chasis':
				inicializarDimCtrl('chasis');
				inicializarConfigCtrl('chasis');
				cargarSelectConfig(document.getElementById('chasis' + 1 + "e"));
				cargarSelectConfig(document.getElementById('chasis' + 2 + "e"));
				dimChasis('chasis');
				calcularChasis('chasis');	
			break;
			
			case 'tractor':
				inicializarDimCtrl('tractor');
				inicializarConfigCtrl('tractor');
				cargarSelectConfig(document.getElementById('tractor' + 1 + "e"));
				cargarSelectConfig(document.getElementById('tractor' + 2 + "e"));
				dimChasis('tractor');
				calcularChasis('tractor');
			break;
			
			case 'semi':
				inicializarDimCtrl('tractor');
				inicializarDimCtrl('semi');
				
				inicializarConfigCtrl('tractor');
				cargarSelectConfig(document.getElementById('tractor' + 1 + "e"));
				cargarSelectConfig(document.getElementById('tractor' + 2 + "e"));
				
				inicializarConfigCtrl('semi');
				cargarSelectConfig(document.getElementById('semi' + 1 + "e"));
				cargarSelectConfig(document.getElementById('semi' + 2 + "e"));
				
				dimSemi('semi');
				calcularSemi('semi');
			break;
		}
	}
	
	

	
	// Barra de menu
	var menuButtons = [
		["menuVehiculos", "Opciones de Vehículos", false, "50%"],
		["menuDiagCarga", "Recalcular Diagrama de Carga", true, "27%"],
		//["menuOpEjCarga", "Ejemplo de Distribución", false, "27%"],
		//["menuOpEjDescarga", "Ejemplo de Descarga Parcial", false, "27%"],
	];	
	
	
	
	function inicializarMenu () {
/*		var container = document.createElement("div");
		container.id = "barra"+menuButtons[0][0];
		container.class = "dropdown";
		//container.style = "position: absolute; left: 0px; top: 0px; width: " + menuButtons[0][3] + ";";
				
		var menuButton = document.createElement("button");
			menuButton.id = menuButtons[0][0];
			menuButton.value = menuButtons[0][0];
			menuButton.class = "dropbtn";
			var t = document.createTextNode(menuButtons[0][1]);       // Create a text node
			menuButton.appendChild(t);
			
			//menuButton.style.display = "block"; // = "height: 30px; width: 100%;";
			menuButton.onclick = function(){tratarOpMenu(this);};
		//container.appendChild(menuButton);
		
		var menuButtonDropDownContent = document.createElement("div");
			menuButtonDropDownContent.id = "drop"+menuButtons[0][0];
			menuButtonDropDownContent.class = "dropdown-content";
		*/
		for (var i = 0; i < tiposVeh.length; i++) {
		//	var menuButton = document.createElement("button");
		//		menuButton.id = tiposVeh[i];
		//		menuButton.value = tiposVeh[i];
						
				var link = document.createElement("a"); //
				link.id = tiposVeh[i];
				var t = document.createTextNode(tiposVeh[i]);       // Create a text node
				//menuButton.appendChild(t);
				link.appendChild(t);
				link.class = "dropdown-content"; //setAttribute('href', 'javascript:inicializarVeh()');
		
				//menuButton.style = "height: 30px; width: 100%;display:none;";
				link.onclick = function(){inicializarVeh(this);};
				//link.style.display = 'none';
				
			document.getElementById("dropdownVehiculos").appendChild(link);
			//alert(document.getElementById("dropdownVehiculos").children.length);
		}
	//	container.appendChild(menuButtonDropDownContent);
	
		/*
		var container = document.createElement("div");
		container.id = "barraMenu";
		container.style = "position: absolute; left: 200px; top: 0px; width: " + menuButtons[0][3] + ";";
		
		for (var i = 1; i < menuButtons.length; i++) {
			var menuButton = document.createElement("button");
			menuButton.id = menuButtons[i][0];
			menuButton.value = menuButtons[i][0];
			var t = document.createTextNode(menuButtons[i][1]);       // Create a text node
			menuButton.appendChild(t);
			
			menuButton.style = "height: 30px; width: " + menuButtons[i][3] + ";";
			menuButton.onclick = function(){tratarOpMenu(this);};
			container.appendChild(menuButton);
			//document.getElementById(menuButtons[i][0]).setAttribute("class", "menuButton");
		}*/	
		
		
	}
	
function tratarOpMenu (menuOp) {
	//for (var i = 0; i < 4; i ++)
	//	document.getElementById(menuButtons[i][0]).disabled = false; 
	//alert(menuOp.value);
	
	switch(menuOp.value) {
	case "vehiculos":
	//alert(document.getElementById("dropdownVehiculos").children[0]);
		document.getElementById("dropdownVehiculos").classList.remove("dropdown-content"); //classList.toggle("show");
		document.getElementById("dropdownVehiculos").classList.add("dropdown-contentShow"); //classList.toggle("show");
		//document.getElementById("myDropdown").classList.toggle("show");
		
		/*if (document.getElementById("barra"+menuButtons[0][0]).children.length > 1) {
			for (var i=1; i < document.getElementById("barra"+menuButtons[0][0]).children.length; i++) 
				document.getElementById("barra"+menuButtons[0][0]).childNodes[i].style.display = "block";
		}*/	
       
	   break;
	   
    case "recalcular":
		var flag = false;
		var flagT = false;
		
		for (i=0; i<document.getElementById("diagArea").children.length; i++) {
			var vehSelect = document.getElementById("diagArea").children[i].id
			vehSelect = vehSelect.substring(0, 4);
			
			switch (vehSelect) {
				case 'semi':
					calcularSemi('semi');
					flag = true;
					break;
				case 'trac':
					flagT = true;
					if (flagT == true && i == (document.getElementById("diagArea").children.length-1)) {
						calcularChasis('tractor');
						flag = true;
					}	
					break;
				case 'chas':
					calcularChasis('chasis');
					flag = true;
					break;
			}		
			if (flag == true)
				i = document.getElementById("diagArea").children.length;
		}
		//      
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
