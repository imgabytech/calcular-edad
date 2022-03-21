/**
 * Funcion que devuelve true o false (dependiendo de si la fecha es correcta.)
 * Debe recibir el dia, mes y año
 */
function fecha_correcta(day,month,year)
{
    var d_fecha;
    /*
     En javascript, el mes empieza en la posicion 0 y termina en la 11 
     siendo 0 el mes de Enero.
    */
    month=month-1;
    /*
     Se establece un objeto "Data" con los valores recibidos
     Los parámetros son: año, mes.
     getDate(); devuelve el dia como un entero entre 1 y 31
     getMonth(); devuelve el mes como un numero de 0 a 11
     getYear(); devuelve el año
     getFullYear(); devuelve el año
    */
    d_fecha=new Date(year,month,day);

    //Devolver (true or false)
    return ((day==d_fecha.getDate()) && (month==d_fecha.getMonth()) && (year==d_fecha.getFullYear()));
}


/**
  Funcion para validar una fecha
   * Tiene que recibir:
   La fecha en formato inglés yyyy-mm-dd (año - mes - día)
   * Devuelve:
   true-Fecha correcta
   false-Fecha Incorrecta
 */
function validar_fecha(fecha)
{
	/*
    *Expresión regular: para buscar patrones en el texto (fecha)

	^ a inicios del texto (fecha) (dos primeros caracteres de la fecha)
	- crear un intervalo de caracteres coincidentes [0-9] (coincide con cualquier dígito)

	{} cuantificadores de posiciones o caracteres permitidos  
     pueden ser cualquiera de los valores individuales del conjunto definido por los corchetes.)
	 (00, 99, 55, 76, 17, 18, 26... etc)

	+ coincide con el carácter que le precede una vez o más. (01 al 99)
	Por lo tanto, se buscará primero en qué digitos (total de 2 caracteres) comienza 
	el año y luego se añaden los dos dígitos faltantes que pueden ser numeros del cero 
	al nueve ([0-9]) y pueden repetirse un total de dos veces ({2}) 

    [] crear el conjunto de caracteres con el que deberá coincidir la expresión
	() agrupar las distintas partes de una expresión.
	([-]) identifica y separa el año, el mes y el día
    
    En cuanto a las llaves {}
	cuando se añade una coma {1,2} serán 1 a 2 caracteres, en este caso de los meses y los días
	 Por lo tanto, un año tiene de 1 (un caracter) a 12 (dos caracteres) meses.
	Y un mes tiene de 1 (un caracter) a 31 (dos caracteres) días
	(1, 31, 5, 10, 9, 18, etc)
    */

    var patron=new RegExp("^([0-9]{2})+([0-9]{2})([-])([0-9]{1,2})([-])([0-9]{1,2})");
    ////////////////////////////////////////////////////////////////////////////////// 
    if(fecha.search(patron)==0)
    {
        var valor=fecha.split("-");
        if(fecha_correcta(valor[2],valor[1],valor[0]))
        {
            return true;
        }
    }
    return false;
}
 
function calcularEdad()
{
    var fecha=document.getElementById("user_date").value;
    ///////////////////////////////////////////////////
    if(validar_fecha(fecha)==true)
    {
        // Si la fecha es correcta, se calcula la edad
        var valor=fecha.split("-");
        var dia = valor[2];
        var mes = valor[1];
        var ano = valor[0];

        // Se toman los valores actuales 
        var f_actual = new Date();
        var ano_actual = f_actual.getYear();
        var mes_actual = f_actual.getMonth()+1;
        var dia_actual = f_actual.getDate();

        // Se realiza el cálculo
        /*
        El problema conocido como “efecto 2000” se basaba en la tesis de que, una vez alcanzado 
        el nuevo milenio, es decir, el año 2000, los equipos lo marcarían como año 00, sin tener 
        en cuenta el cambio de siglo. ... Esto significa que el mundo informático viviría en 1900.
        */
        var edad = (ano_actual + 1900) - ano;
        /////////////////////////////////////////
        if ( mes_actual < mes )
        { edad--; }

        if ((mes == mes_actual) && (dia_actual < dia))
        { edad--; }

        if (edad > 1900)
        { edad -= 1900; }

        // Se calculan los meses
        var meses=0;
        ///////////////////////////////
        if(mes_actual<mes)
            meses=12-(mes-mes_actual);

        if(mes_actual>=mes)
            meses=mes_actual-mes;

        if(dia>dia_actual && mes<mes_actual)
        	meses=(mes_actual-mes)-1;

        if(mes_actual==mes && dia>dia_actual)
            meses=11;

        // Se calculan los dias
        var dias=0;
        ///////////////////////////////
        if(dia_actual>dia)
           dias=dia_actual-dia;

       //De acuerdo a la condición, se muestra en pantalla el resultado
        if(dia_actual<dia)
        {
            ultimoDiaMes=new Date(ano_actual, mes_actual, 0);
            dias=ultimoDiaMes.getDate()-(dia-dia_actual);
        }
 
        document.getElementById("result").innerHTML="La edad es de: "+edad+" años, "+meses+" meses y " +dias+ " días";
    } else{
        document.getElementById("result").innerHTML="La fecha "+fecha+" es incorrecta";
    }
}