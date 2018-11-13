<div style="background-color:#003366;width:800px;height:40px;padding: 5px;">
		<span style="color:Gainsboro; font-family: arial,helvetica,sans-serif;font-size: 14pt;">Hide me</span></br>
		<span style="color:Gainsboro; font-family: arial,helvetica,sans-serif;font-size: 12pt;">Buscador de Servicios y Rutas para el Autotransporte de Cargas</span>
		<img src="https://github.com/djGIS/distribucionCargas/blob/gh-pages/images/chasisDelante.png">
	</div>
	
<div id="cargaAppMenu" class="navbar"></div>
<button onclick="tratarOpMenu(this)" class="dropbtn" value="recalcular">Recalcular</button>
<div id="menuVehiculos" class="dropdown">
	<button onclick="tratarOpMenu(this)" class="dropbtn" value="vehiculos">Opciones de Vehículos</button>
	<div id="dropdownVehiculos" class="dropdown-content"></div>
</div>
	
<div id="Diagrama" style="position: relative; height: 450px; width: 100%;"></div>

<script>
	window.addEventListener("load", inicializarMenu);
	window.addEventListener("load", inicializarVeh(tiposVeh[0]));
</script> 

<script type="text/javascript" src="https://raw.githubusercontent.com/djGIS/distribucionCargas/gh-pages/javascripts/configVeh.js"></script>
<script type="text/javascript" src="https://raw.githubusercontent.com/djGIS/distribucionCargas/gh-pages/javascripts/calculadorDistribCargas.js"></script>

<script type="text/javascript"
        src="https://www.google.com/jsapi?autoload={
			'modules':[{
            'name':'visualization',
            'version':'1',
            'packages':['corechart']
        }]
    }">
</script>
