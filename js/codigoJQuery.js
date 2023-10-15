$(document).ready(function() {
    let regexNombre = /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    let regexCorreo =/^[a-zA-Z0-9!*_-]+@[^\s@]+\.[a-zA-Z]{2,3}/;
    let regexTelefono = /^\d{3} \d{3} \d{3}/;
    $("#nombre, #apellidos, #email, #telefono, #asunto, #mensaje, #codNumerico").blur(function(){
        let valor = $(this).val();
        let campo = $(this).attr('id');
        if(valor != ""){
            switch(campo){
                case 'nombre':
                    if(regexNombre.test(valor)){
                        $(this).next().attr('src', 'imagenes/checkVerde.png');
                        $(this).next().css('opacity', '100');
                        correo.nombre = valor;
                    }else{
                        $(this).next().attr('src', 'imagenes/checkError.png');
                        $(this).next().css('opacity', '100');
                    }
                    break;
                case 'apellidos':
                    if(regexNombre.test(valor)){
                        $(this).next().attr('src', 'imagenes/checkVerde.png');
                        $(this).next().css('opacity', '100');
                        correo.apellidos = valor;
                    }else{
                        $(this).next().attr('src', 'imagenes/checkError.png');
                        $(this).next().css('opacity', '100');
                    }
                    break;
                case 'email':
                    if(regexCorreo.test(valor)){
                        $(this).next().attr('src', 'imagenes/checkVerde.png');
                        $(this).next().css('opacity', '100');
                        correo.email = valor;
                    }else{
                        $(this).next().attr('src', 'imagenes/checkError.png');
                        $(this).next().css('opacity', '100');
                    }
                    break;
                case 'telefono':
                    if(regexTelefono.test(valor)){
                        $(this).next().attr('src', 'imagenes/checkVerde.png');
                        $(this).next().css('opacity', '100');
                        correo.telefono = valor;
                    }else{
                        $(this).next().attr('src', 'imagenes/checkError.png');
                        $(this).next().css('opacity', '100');
                    }
                    break;
                case 'asunto':
                    if(valor != ""){
                        $(this).next().attr('src', 'imagenes/checkVerde.png');
                        $(this).next().css('opacity', '100');
                        correo.asunto = valor;
                    }else{
                        $(this).next().attr('src', 'imagenes/checkError.png');
                        $(this).next().css('opacity', '100');
                    }
                    break;
                case 'mensaje':
                    if(valor != ""){
                        $(this).next().attr('src', 'imagenes/checkVerde.png');
                        $(this).next().css('opacity', '100');
                        correo.mensaje = valor;
                    }else{
                        $(this).next().attr('src', 'imagenes/checkError.png');
                        $(this).next().css('opacity', '100');
                    }
                    break;
                case 'codNumerico':
                    if(parseInt(valor) === totalOp){
                        $(this).next().attr('src', 'imagenes/checkVerde.png');
                        $(this).next().css('opacity', '100');
                    }else{
                        $(this).next().attr('src', 'imagenes/checkError.png');
                        $(this).next().css('opacity', '100');
                    }
            }
        } else {
            $(this).next().attr('src', 'imagenes/checkBlanco.png');
            $(this).next().css('opacity', '0');
        }
    });

    // Inicializo los campos del formulario
    $('.formContacto :input').each(function() {
        let elemento = $(this);
        elemento.val('');
    });

    // Función para comprobar la resolución de pantalla
    function comprobarResolucion() {
        let ancho = window.innerWidth;
        //let alto = window.innerHeight;

        if (ancho >= 1400) {
          console.log("Resolución de pantalla desktop");
          /*$(".menu li a").on("mouseover mouseout", function(e){
            
          });*/
          $(".mas").off("click");
          $(".submenu").hide();
          $(".mas").text('+');
          $(".expand").on("mouseover", function() {
            // Código para manejar el evento mouseover
            $(this).children().last(".submenu").show();           
          }).on("mouseout", function() {
            // Código para manejar el evento mouseout
            $(this).children().last(".submenu").hide();
          });
        } else { // Realizar acciones específicas para resoluciones inferiores
          console.log("Resolución de pantalla tabletas y móviles");   
          $(".mas").on("click", function() {
            let signo = $(this).text();
            if(signo === '+')
                $(this).text('-');
            else
                $(this).text('+');
            let ancestroComun = $(this).closest('.menu');
            ancestroComun.find(".submenu").slideUp("slow");
            ancestroComun.find(".mas").text('+');
            let submenuActual = $(this).next(".submenu");
            if (submenuActual.is(":visible")) {
                submenuActual.slideUp("slow");
                submenuActual.prev().text('+');
            } else {
                submenuActual.slideDown("slow");
                submenuActual.prev().text('-');
            }
           });
          $(".expand").off("mouseover mouseout");
        }
    }
    // Ejecutar la función inicialmente
    comprobarResolucion();

    // Volver a ejecutar la función cuando se redimensione la ventana, pero cuidado al cambiar del modo desktop al modo móvil y viceversa; puede traer efectos indeseados sobre los submenús. Por ello es mejor dejarlo comentado.
    //$(window).on('resize', comprobarResolucion);

    $('form').on('reset', function() {
        location.reload(); // refresco la página
    });

    // Calculo la ruta del pathname sin el dominio (www.midominio.com) o localhost
    const rutaCompleta = window.location.pathname;  
    console.log(rutaCompleta);
    const numeroSeparadores = rutaCompleta.split('/').length - 1;
    
    // inicializo el array de imágenes
    let imagenes = [];
    if (numeroSeparadores > 2) // sólo para los artículos (sólo para localhost - si está alojado en un servidor en www.midominio.com el valor sería 1)
        imagenes = ["../imagenes/selva-tropical.jpg", "../imagenes/lago.jpg", "../imagenes/agapanto.jpg"];
    else // resto de páginas (inicio, categorias, contacto, ...)
        imagenes = ["imagenes/selva-tropical.jpg", "imagenes/lago.jpg", "imagenes/agapanto.jpg"];

    const cuerpo = document.querySelector("body");
    let indice = 0;
    function recorrerArray(){
        cuerpo.style.backgroundImage = `url('${imagenes[indice]}')`;
        indice++;
        if (indice >= imagenes.length){
            indice = 0;
        }
    }
    setInterval(recorrerArray, 15000);

    $("#slidebox").jCarouselLite({
		vertical: false,
		hoverPause:true,
		btnPrev: ".previous",
		btnNext: ".next",
		visible: 1,
		start: 0,
		scroll: 1,
		circular: true,
		auto:3000,
		speed:1500,				
		btnGo:
		    [".1", ".2",
		    ".3", ".4"],
		
		afterEnd: function(a, to, btnGo) {
				if(btnGo.length <= to){
					to = 0;
				}
				$(".thumbActive").removeClass("thumbActive");
				$(btnGo[to]).addClass("thumbActive");
		    }
	});

    // Panel derecho interrogante
    let panelDchoDesplazado = true;
    $(".btnPanel").on('click', function(){
        if (panelDchoDesplazado){
            $(".panelDcho").animate({ "right": "0px" }, "slow");
        } else {
            $(".panelDcho").animate({ "right": "-300px" }, "slow");
        }
        panelDchoDesplazado = !panelDchoDesplazado;
    });

    $('#captchaNumeros').text(num1 + " " + simboloOp + " " + num2);
    
});

let correo = {
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
};

function mostrarValoresForm(){
    let elemento, valorCampo;
    let texto = "";
    texto += "DATOS INTRODUCIDOS";
    const formulario = document.querySelector(".formContacto");
    for (let i = 0; i < formulario.elements.length; i++) {
        elemento = formulario.elements[i];
        // Verificar si el elemento es un campo de entrada
        if (elemento.type != 'number' && elemento.type != 'button' && elemento.type != 'reset') {
            // Obtener el nombre y el valor del campo de entrada
            valorCampo = elemento.value;
            texto += "\n" + valorCampo;
        }
    }
    texto += "\n\n¿Confirmas el envío del formulario?";
    let resul = confirm(texto);
    return(resul);
}

function buscarTexto() {
    let inputBusqueda = document.getElementById("busqueda").value;
    if(window.find(inputBusqueda)){
		window.getSelection().focusNode.parentElement.style.backgroundColor = "#999";
	}
}

function haciaArriba() {
    $("html, body").animate({scrollTop: 0}, 'slow');
}

function panelDerecho() {
    $(".panelDcho").animate({ "right": "200px" }, "slow");
}

function validarFormulario(){
    const cajitas = document.querySelectorAll('.cajasForm');
    let validar = false;
    let siguiente, atributo;
    for (let i = 0; i < cajitas.length; i++){
        if (cajitas[i].value != ""){
            siguiente = cajitas[i].nextElementSibling.getAttribute("src");
            atributo = siguiente.split("/");
            if(atributo[1] === "checkVerde.png"){
                validar = true;
            } else {
                alert("Complete el campo correctamente");
                cajitas[i].focus();
                validar = false;
                break;
            }
        } else {
            alert("Rellene el campo obligatorio");
            cajitas[i].focus();
            validar = false;
            break;
        }
    }
    if (validar){
        if (mostrarValoresForm()){
            // Enviar la solicitud AJAX al servidor PHP
            alert("¡Formulario enviado correctamente!");
            location.reload(); // refresco la página
            return validar;
        }     
    } 
}


let num1, num2, totalOp;
let simboloOp = "";
let suma;
function operacionAleatoria(valorMin, valorMax){
        // Genero 2 nº aleatorios entre 0 y 9 y redondeo sus valores
        num1 = Math.floor((Math.random() * valorMax) + valorMin);
        num2 = Math.floor((Math.random() * valorMax) + valorMin);
        // Obtengo un operando aleatorio
        operando = Math.floor((Math.random() * 3) + 1);
        switch(operando) {
            case 1:
                totalOp = num1 + num2;
                simboloOp = "+";
                break;
            case 2:
                totalOp = num1 - num2;
                simboloOp = "-";
                break;
            case 3:
                totalOp = num1 * num2;
                simboloOp = "*";
                break;
            default:
                break;
        }  
}
function recargarCaptcha() {
    operacionAleatoria(0,9);
    $('#captchaNumeros').text(num1 + " " + simboloOp + " " + num2);
    $('#codNumerico').val("");
    $('#codNumerico').next().attr('src', 'imagenes/checkBlanco.png');
    $('#codNumerico').next().css('opacity', '0');
}
operacionAleatoria(0,9);
