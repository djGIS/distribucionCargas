function generarMenu (divId) {
    
    var button = document.createElement("button");
        button.id = "menuBtnRecalcular";
	    button.value = "recalcular";
        button.onclick = function(){tratarOpMenu(this);};
    var text = document.createTextNode("Recalcular");
    button.appendChild(text); 
	document.getElementById(divId).appendChild(button);
    document.getElementById(button.id).setAttribute("class", "dropbtn");
		
        
        

/*<button onclick="tratarOpMenu(this)" class="dropbtn" value="recalcular">Recalcular</button>
		<div id="menuVehiculos" class="dropdown">
			<button onclick="tratarOpMenu(this)" class="dropbtn" value="vehiculos">Opciones de Vehículos</button>
			<div id="dropdownVehiculos" class="dropdown-content"></div>
		</div>*/
}
