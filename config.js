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

var configAxleGroup = [
  tipoGrupoN:1,
  tipoGrupoText:'Simple',
  
  {
            tipoRodadoId:'S', 
            tipoRodadoText:'Simple', 
            pesoMax:6000, 
            pesoTolerancia:500,
            sepMin:0,
            sepMax:0
            };
            
            "contenido": [
          {
            "nombreId": "nombre",
            "nombre": "Nombre",
            "posicion": "1",
            "valor": "Permitido estacionar 24 horas lado izquierdo (impar)"
          },
          {
            "nombreId": "calle",
            "nombre": "Calle",
            "posicion": "2",
            "valor": "PAZ, MARCOS"
          },
          {
            "nombreId": "altura",
            "nombre": "Altura",
            "posicion": "3",
            "valor": "2851 - 2899"
          },
