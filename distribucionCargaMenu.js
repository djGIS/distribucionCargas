	function tipoVehiculo(opDisplay) {
		var tiposVeh = ['Chasis', 'Semi', 'Tractor'];
		
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
