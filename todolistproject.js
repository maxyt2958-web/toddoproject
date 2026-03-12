const taskInput =document.getElementById('task-input');
const todoForm=document.querySelector('.input-area');
const tasklist=document.getElementById('task-list');
const emptyimage=document.querySelector('empty-image');

const addTAsk =( Event )=>{
    const taskText =taskInput.value.trim();
    if(!taskText){
        return;
    }

const li =document.createElement('li');
li.textContent = taskText;
tasklist.appendChild(li);
taskInput.value='';
}; 

add-task-btn.addEventListener('click',addTAsk);

