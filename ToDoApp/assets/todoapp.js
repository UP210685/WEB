const formulario = document.getElementById("formulario");
const selectNombres = document.getElementById("select");
const infUser = document.getElementById("informacionusuario");
const lisTareas = document.getElementById("listadotareas");
const contenedor = document.getElementById("contendor");


selectNombres.addEventListener("change", () => {
    infUser.innerText= " ";
    lisTareas.innerText = " ";
    const titulo = document.createElement("h1");
    titulo.innerText = "Información del usuario"
    infUser.appendChild(titulo);
    const valor = selectNombres.value -1;
    desplegarInfo(valor);
    
})
function desplegarInfo (value){
    getUsers()
    .then(function(json){
        const ul = document.createElement('ul');
        const id = json[value].id;
        const nombre = document.createElement('li');
        const email = document.createElement('li');
        const button = document.createElement('button');
        nombre.innerText = json[value].firstname + " "+ json[value].lastname;
        email.innerText = json[value].email;
        button.innerText = "Tareas";
        ul.appendChild(nombre);
        ul.appendChild(email);
        infUser.appendChild(ul);  
        infUser.appendChild(button);
        console.log("El id es " + id);

        button.addEventListener("click", () =>{
            const titulo = document.createElement('h1');
            titulo.innerText = "Lista de tareas del usuario";
            lisTareas.appendChild(titulo);
            desplegarTareas(id);
        });

    
    })
}
function desplegarTareas (value){
    getTasks()
    .then (function(json){
        lisTareas.innerText= "";
        const arraytask = [];
        const listatareas = document.createElement('ol');
        for(let i=0; i < json.length; i++){
            const id = json[i].userId;
            const tarea = document.createElement('li');
            if (value === id){
                tarea.innerText = json[i].title;
                listatareas.appendChild(tarea);
                lisTareas.appendChild(listatareas);
            }
        }
    })
}

function getUsers(){
    return fetch("http://127.0.0.7:5500/data/usuarios.json")
    .then(function(response){
        return response.json();
    })
}
function getTasks(){
    return fetch("http://127.0.0.7:5500/data/tareas.json")
    .then(function(response){
        return response.json();
    })
}
