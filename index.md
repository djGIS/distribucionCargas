<style>
	.diminputBoxes {
		width:36px;
		text-align: right; font-family: arial,helvetica,sans-serif; font-size: 10pt;
	}
	
	.dimLineVert1 {
		border-left-style: dashed;
		border-left-width: 1px;
	}
	
	.dimLineVert2 {
		border-left-style: dashed;
		border-left-width: 1px;
		border-right-style: dashed;
		border-right-width: 1px; 
	}
	
	.tablainputBoxes.chasis {
		width:120px;
		text-align: right; font-family: arial,helvetica,sans-serif; font-size: 10pt;
	}
			
	.triangle_left {
		border-top: 4px solid transparent;
		border-right: 20px solid #000000;
		border-bottom: 4px solid transparent;
		position: absolute;
	}

	.triangle_right {
		border-top: 4px solid transparent;
		border-left: 20px solid #000000;
		border-bottom: 4px solid transparent;
		position: absolute;
	}
</style>

<style>
/* Estilos CSS para barra de navegación

	/* Navbar container */
	.navbar {
		height: 48px;
		width: 100%;
		overflow: scroll;
		background-color: #333;
		font-family: Arial;
	}

	/* Dropdown Button */
	.dropbtn {
		background-color: #3498DB;
		color: white;
		padding: 16px;
		font-size: 16px;
		border: none;
		cursor: pointer;
	}

	/* Dropdown button on hover & focus */
	.dropbtn:hover, .dropbtn:focus {
		background-color: #2980B9;
	}

	/* The container div - needed to position the dropdown content */
	.dropdown {
		float: left;
		position: relative;
		display: inline-block;
	}

	/* Dropdown Content (Hidden by Default) */
	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #f1f1f1;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		z-index: 1;
	}

	/* Dropdown Content (Hidden by Default) */
	.dropdown-contentShow {
		display: block;
		position: absolute;
		background-color: #f1f1f1;
		min-width: 160px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
		z-index: 1;
	}

	/* Links inside the dropdown */
	.dropdown-content a {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
	}

	/* Change color of dropdown links on hover */
	.dropdown-content a:hover {background-color: #ddd}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {display:block;}
</style>

<div id="cargaAppMenu" class="navbar">
<div class="dropdown">
	<button onclick="tratarOpMenu(this)" class="dropbtn" value="recalcular">Recalcular</button>
</div>
<div id="menuVehiculos" class="dropdown">
	<button onclick="tratarOpMenu(this)" class="dropbtn" value="vehiculos">Opciones de Vehículos</button>
	<div id="dropdownVehiculos" class="dropdown-content"></div>
</div>
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
