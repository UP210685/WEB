import {getAllUsers} from "./petitions.js";
import { createNewTask } from "./petitions.js";
import { getAllTasks } from "./petitions.js";
import { deleteTask } from "./petitions.js";
import { updateTask } from "./petitions.js";

const listUsers = document.getElementById('users');
const tBody = document.getElementById('tasks');

// console.log(listUsers);


document.addEventListener('DOMContentLoaded', async()=>{
   //Obtener los usuarios
    const users = await getAllUsers();
   let template = listUsers.innerHTML; 
   for (const user of users){
    template += `
    <option value="${user.id}">${user.fullname}</option>
    `
    }
    listUsers.innerHTML= template;

    //Obtener las tareas 
    tBody.innerHTML = '';
    fetchTask();


    //Crear tareas
    document.getElementById('form-task').addEventListener('submit', async(e)=>{
        e.preventDefault();
        const formdata = new FormData(e.target);
        const responseData = await createNewTask(formdata);
        await fetchTask(); //vuelve a llamar a las tareas al momento de crear una nueva tarea
        document.getElementById('form-task').reset();

        
    });

    

});



//Mostrar tareas
async function fetchTask(){
    const allTask= await getAllTasks();
    
    let template2 = '';

    for (const task of allTask){
        
        template2 += `
        <tr taskId="${task.id}">
            <td>${task.id}</td>
            <td>${task.idUser}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>
                <button class="task-update btn btn-secondary btn-sm">
                <span>Update</span> <i class="nf nf-md-pencil"></i>
                </button>
                <button class="task-delete btn btn-danger btn-sm">
                <span>Delete</span> <i class="nf nf-cod-trash"></i>
                </button>
            </td>
        </tr>`

    }
    tBody.innerHTML = template2;

     //Actualizar tareas
    const taskUpdate = document.getElementsByClassName('task-update');
    for(const task of taskUpdate) {
        task.addEventListener('click', async function(e) {
            console.log("click");
            let element = this.parentElement.parentElement;
            let id = element.getAttribute('taskId');
            console.log(id)
            
            const uptask = await updateTask(id);
            const title = document.getElementById('title');
            const user = document.getElementById('users');
            const description = document.getElementById('description');
            const formulario = document.getElementById('form-task');

            title.value = uptask.title;
            user.value = uptask.id;
            description.value = uptask.description;
            



        });
    }

    //Eliminar tareas
    const delButtons = document.getElementsByClassName('task-delete');
    
    for (const button of delButtons) {
        button.addEventListener('click', async function(e) {
            
            if(confirm('¿Estas seguro que deseas eliminar la tarea?')){
                let element = this.parentElement.parentElement; 
                let id = element.getAttribute('taskId');
                console.log(id);

                const delTask = await deleteTask(id);
                await fetchTask();
            }
            
            
        });
    } 
}

 









