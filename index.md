<div id="cargaAppMenu" class="navbar"></div>
<button onclick="tratarOpMenu(this)" class="dropbtn" value="recalcular">Recalcular</button>
<div id="menuVehiculos" class="dropdown">
	<button onclick="tratarOpMenu(this)" class="dropbtn" value="vehiculos">Opciones de Vehículos</button>
	<div id="dropdownVehiculos" class="dropdown-content"></div>
</div>
	
<div id="Diagrama" style="position: relative; height: 450px; width: 100%;"></div>

<script src="{{ "/javascripts/configVeh.js" | prepend: site.baseurl}}"></script>
<script src="{{ "/javascripts/calculadorDistribCargas.js" | prepend: site.baseurl}}"></script>

<script type="text/javascript"
        src="https://www.google.com/jsapi?autoload={
			'modules':[{
            'name':'visualization',
            'version':'1',
            'packages':['corechart']
        }]
    }">
</script>

<script>
	window.addEventListener("load", inicializarMenu);
	window.addEventListener("load", inicializarVeh(tiposVeh[0]));
</script>
