let contador=0;
let costoTotal=0;
let element=document.getElementById("totalPrecio");
element.innerHTML="Total en precio";
let txtNombre=document.getElementById("Name");
// txtNombre.value="Leche descremada";
// console.log(txtNombre.value);
let txtNumber=document.getElementById("Number");

let total=document.getElementById("precioTotal");
// let campos=document.getElementsByClassName("campo");
// campos[0].value="Leche descremada deslactosada light=Agua";
// console.log(campos[0].value);
// console.log(campos);

// for(let i=0; i<campos.length; i++){
//     campos[i].style.border="red thin solid";
// }

// let spans=document.getElementsByTagName("span");
// for(let i=0; i<spans.length; i++){
//     console.log(spans[i].textContent);
// }

let tabla=document.getElementById("listaCompras");
let cuerpoTabla=tabla.getElementsByTagName("tbody");

// cuerpoTabla[0].innerHTML=`<tr>
// <th scope="row">1</th>
// <td>Leche descremada</td>
// <td>3 Lt</td>
// <td>$ 23.00</td>
// </tr>`;
function validarNombre(){
    if (txtNombre.value.length<=3){
        return false;
    }
    return true;
};
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
};

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
        }
        
        document.getElementById("alertValidacionesTexto").innerHTML=`Los campos deben ser llenados correctamente
        <ul>${lista}</ul>`;
        document.getElementById("alertValidaciones").style.display="block";

        setTimeout(function(){
            document.getElementById("alertValidaciones").style.display="none";
        },
        5000)
        return false;
    }
    txtNombre.style.border="";
    txtNumber.style.border="";
    contador++;
    document.getElementById("contadorProductos").innerHTML=contador;    
    let precio=(Math.floor((Math.random()*50)*100))/100;
    let cantidad= parseFloat(txtNumber.value);
    costoTotal+=(precio*cantidad);
    total.innerHTML=`$ ${costoTotal.toFixed(2)}`;
    let tmp=`<tr>
    <th scope="row">${contador}</th>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>$ ${precio}</td>
    </tr>`
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
//agregar.onclick=