var M;
class Main implements EventListenerObject, HandlerPost,GetResponseListener{
    
    private nombre:string;
    private lista : Array<User> = new Array ();
    public myFramework: MyFramework = new MyFramework;
    
    constructor (n:string){
        this.nombre = n;
        this.myFramework.requestGET("http://localhost:8000/devices",this,"inicio");
        let usr1 = new User(1, "matias", "mramos@asda.com", true);
        let usr2 = new User(2, "Jose", "jose@asda.com", false);
        let usr3 = new User(3, "Pedro", "perdro@asda.com", false);
    }
    public mostrarLista() {
        let listaUsr: Array<User> = new Array<User>();
        let usr1 = new User(1, "matias", "mramos@asda.com", true);
        let usr2 = new User(2, "Jose", "jose@asda.com", false);
        let usr3 = new User(3, "Pedro", "perdro@asda.com", false);
        
        
        usr1.setIsLogged(false);
        listaUsr.push(usr1);
        listaUsr.push(usr2);
        listaUsr.push(usr3);
        
        for (let obj in listaUsr) {
            listaUsr[obj].printInfo();
        }
    }
    public handleEvent(ev: Event) {
        let objetoClick: HTMLElement = <HTMLElement>ev.target;
        let objetoEvento =<HTMLInputElement> ev.target; //saber que objeto produjo el evento
        console.log(objetoEvento);
        if(ev.type == "click" && objetoEvento.id.substring(0,2)== "ck") {     
            let id = objetoEvento.id.substring(3);

            let check = objetoEvento.checked;
            console.log( "datos",check);
            let accion = "switch";
            let datos = {"id": id, "type": check, "accion": accion}

            this.myFramework.requestPOST("http://localhost:8000/devices/",this,datos,"NA");

        }else if(ev.type == "click" && objetoEvento.id == "btn1") {         
            let idBuscar = <HTMLInputElement>this.getELement("id_buscar")
            let id = idBuscar.value;
            this.myFramework.requestGET("http://localhost:8000/devices/"+id,this,"busqueda");

        }
        else if(ev.type == "click" && objetoEvento.id == "btn2") {         
            let id = window.prompt("ingrese ID de dispositivo");
            let name = window.prompt("ingrese nombre de dispositivo");
            let description = window.prompt("ingrese descripcionde dispositivo");
            let state = false
            let type = 0
            let accion = "agregar"
            let dispositivo = {"id": id, "name": name, "description": description, "state": state, "type": type, "accion":accion }
            this.myFramework.requestPOST("http://localhost:8000/devices/",this,dispositivo,"NA");
            alert("SE AGREGO DISPOSITIVO, ACTUALIZAR PAGINA")
        }
        else if(ev.type == "click" && objetoEvento.id == "btnEditar") {        
            
            let idEdit = window.prompt("ingrese ID de dispositivo a editar");
            let name = window.prompt("ingrese nombre de dispositivo");
            let description = window.prompt("ingrese descripcionde dispositivo");
            let state = 0
            let type = true
            let accion = "editar"
            let dispositivo = {"id": idEdit, "name": name, "description": description, "state": state, "type": type, "accion":accion }
            this.myFramework.requestPOST("http://localhost:8000/devices/",this,dispositivo,"NA");
            alert("SE EDITO DISPOSITIVO, ACTUALIZAR PAGINA")
        }
        else if(ev.type == "click" && objetoEvento.id == "btnBorrar") {        
            
            let idEdit = window.prompt("ingrese ID de dispositivo a borrar");
            let accion = "borrar"
            let dispositivo = {"id": idEdit, "accion":accion }
            this.myFramework.requestPOST("http://localhost:8000/devices/",this,dispositivo,"NA");
            alert("SE ELEIMINO DISPOSITIVO, ACTUALIZAR PAGINA")
        }


    }

    public mostrarDisp(){
        let xml = new XMLHttpRequest();
        xml.onreadystatechange = function respustaServidor(){
            if(xml.readyState==4){
                if(xml.status == 200){
                console.log(xml.responseText); 
                }
            }
            
        }
        xml.open("GET","http://localhost:8000/devices",true);

        xml.send();


    }

    handlerGetResponse(status: number, response: string, tipo:string) {
        console.log("LLEGO ", response);
        let respuestaObjetos:Array<Device> = JSON.parse(response);
        console.log(respuestaObjetos);
        if(tipo =="inicio" ){
            let check;
            let lista = this.getELement("lista");
            for (let disp of respuestaObjetos ){
                    if (disp.type == 0){
                        check = "unchecked";
                    }
                    else {
                        check = "checked"
                    }
                    lista.innerHTML+=`<div class="input-field col s6 m6 l6 xl6">
                    <li class="collection-item avatar" >
                    <img src="./static/images/estrella.jpg" alt="" class="circle">
                    <span class="title">${disp.name}</span>
                    <p>${disp.description} <br>
                        ID: ${disp.id}
                        <a href="#!" class="secondary-content">
                        <div class="switch">
                            <label>
                            Off
                            <input type="checkbox" ${check} id ="ck_${disp.id}" miATT ="${disp.id}">
                            <span class="lever"></span>
                            On
                            </label>
                        </div>
                    </a>
                </li>
                </div>`      
            }
            for (let disp of respuestaObjetos){
                let checkbox= this.getELement("ck_"+disp.id);
                checkbox.addEventListener("click",this);
    
            }
        }
        else if (tipo =="busqueda"){
            
            let disp= respuestaObjetos[0];
            let lista = this.getELement("lista");
            let check;
            for (let disp of respuestaObjetos ){
                if (disp.type == 0){
                    check = "unchecked";
                }
                else {
                    check = "checked"
                }
            lista.innerHTML=`<div class="input-field col s6 m6 l6 xl6">
                    <li class="collection-item avatar" >
                    <img src="./static/images/estrella.jpg" alt="" class="circle">
                    <span class="title">${disp.name}</span>
                    <p>${disp.description} <br>
                        ID: ${disp.id}
                        <a href="#!" class="secondary-content">
                        <div class="switch">
                            <label>
                            Off
                            <input type="checkbox" ${check} id ="ck_${disp.id}" miATT ="${disp.id}">
                            <span class="lever"></span>
                            On
                            </label>
                         </div>
                    </a>
                    </li>
                    </div>`   
            
        }

        }
        
    
}
    

    public getELement(id: string): HTMLElement{

       return document.getElementById(id); 
    }


    responsePost(status: number, response: string) {
        alert(response);
    }

    
}
window.onload = function inicio(){

    let miObjeto: Main = new Main("Oscar");
    let botonBuscar = miObjeto.getELement("btn1");
    let botonAgregar = miObjeto.getELement("btn2");
    let botonEditar = miObjeto.getELement("btnEditar");
    let botonBorrar = miObjeto.getELement("btnBorrar");
    botonBuscar.addEventListener("click", miObjeto);
    botonAgregar.addEventListener("click", miObjeto);
    botonEditar.addEventListener("click", miObjeto);
    botonBorrar.addEventListener("click", miObjeto);
  
}




