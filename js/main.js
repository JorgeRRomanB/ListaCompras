//Variables globales
let contador=0;
let costoTotal=0;
let totalEnProductos=0;
//Arreglo global para almacenar la lista de compras.
let datos=[];
let element=document.getElementById("totalPrecio");
element.innerHTML="Total en precio";
let txtNombre=document.getElementById("Name");
let txtNumber=document.getElementById("Number");
let total=document.getElementById("precioTotal");
let tabla=document.getElementById("listaCompras");
let cuerpoTabla=tabla.getElementsByTagName("tbody");

function validarNombre(){
    if (txtNombre.value.length<=3){
        return false;
    }
    return true;
};//Funcion validar campo Nombre
function validarCantidad(){
    if (txtNumber.value.length==0){
        return false;
    }
    if (isNaN(txtNumber.value)){
        return false;
    }
    if (parseFloat(txtNumber.value)<=0){
        return false;
    }
    return true;
};//Funcion validar campo Cantidad

let agregar=document.getElementById("btnAgregar");

agregar.addEventListener("click", (event)=>{
    event.preventDefault();
    if ((! validarNombre())||(! validarCantidad())) {
        let lista="";
        if(!validarNombre()){
            txtNombre.style.border="red thin solid";
            lista+="<li>Debes escribir un nombre valido</li>";
        }
        if(!validarCantidad()){
            txtNumber.style.border="red thin solid";
            lista+="<li>Debes escribir una cantidad valido</li>";
        }//Alerta
        
        document.getElementById("alertValidacionesTexto").innerHTML=`Los campos deben ser llenados correctamente
        <ul>${lista}</ul>`;
        document.getElementById("alertValidaciones").style.display="block";

        setTimeout(function(){
            document.getElementById("alertValidaciones").style.display="none";
        },
        5000)//Desaparece la alerta
        return false;
    }
    txtNombre.style.border="";
    txtNumber.style.border="";
    contador++;
    document.getElementById("contadorProductos").innerHTML=contador;   
    localStorage.setItem("contadorProductos", contador);
    let precio=(Math.floor((Math.random()*50)*100))/100;
    let cantidad= parseFloat(txtNumber.value);
    totalEnProductos+=(cantidad<1)?Math.ceil(cantidad):parseInt(cantidad);
    document.getElementById("productosTotal").innerHTML=totalEnProductos;
    localStorage.setItem("productosTotal", totalEnProductos);
    costoTotal+=(precio*cantidad);
    total.innerHTML=`$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("precioTotal", costoTotal.toFixed(2));
    //JSON
    let elemento=`{"id":${contador},"nombre":"${txtNombre.value}","cantidad":${txtNumber.value},"precio":${precio}}`;
    datos.push(JSON.parse(elemento));//guarda la cadena
    localStorage.setItem("elementosTabla", JSON.stringify(datos));

    let tmp=`<tr>
    <th scope="row">${contador}</th>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>$ ${precio}</td>
    </tr>`//Lista de agregados
    cuerpoTabla[0].innerHTML+=tmp;
    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus();
});
txtNombre.addEventListener("blur", (event)=>{
    event.target.value=event.target.value.trim();
});
txtNumber.addEventListener("blur", (event)=>{
    event.target.value=event.target.value.trim();
});

window.addEventListener("load", function(){
    if (localStorage.getItem("contadorProductos")!=null){
        contador= parseInt(localStorage.getItem("contadorProductos"));
        document.getElementById("contadorProductos").innerHTML=contador;
    }
    if (localStorage.getItem("productosTotal")!=null){
        totalEnProductos= parseInt(localStorage.getItem("productosTotal"));
        document.getElementById("productosTotal").innerHTML=totalEnProductos;
    }
    if (localStorage.getItem("precioTotal")!=null){
        costoTotal= parseFloat(localStorage.getItem("precioTotal"));
        total.innerHTML=costoTotal;
    }
    if(localStorage.getItem("elementosTabla")!=null){
        datos=JSON.parse(localStorage.getItem("elementosTabla"));
        datos.forEach(element=>{
            cuerpoTabla[0].innerHTML+=`<tr>
            <th scope="row">${element.id}</th>
            <td>${element.nombre}</td>
            <td>${element.cantidad}</td>
            <td>$ ${element.precio}</td>
            </tr>`;
        });
    }
});//Recarga lo guardado en el localStorage
