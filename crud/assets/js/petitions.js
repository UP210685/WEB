//Obtener usuarios
    //Enviar variables por GET 

export async function getAllUsers(){
    const resp = await fetch("/api/getUsers.php");
    const json = await resp.json();
    
    return json;
}

//Enviar tareas por POST
export async function createNewTask(FormData){
    const options = {
        method: 'POST',
        body: FormData
    };
    const resp = await fetch("/api/createTask.php", options);
    const json = await resp;
    return json;
}


//Obtener tareas por GET
export async function getAllTasks(){
    const resp = await fetch("/api/getTasks.php");
    const json = await resp.json();

    return json;
}

//Eliminar tarea 
export async function deleteTask(id){
    const resp = await fetch("/api/deleteTask.php?id="+id);
    const json = await resp;
    return json;
}

// Actualizar Tarea
export async function updateTask(id){
    const resp = await fetch("/api/getTask.php?id="+id);
    const json = await resp.json();
    return json;

}
