// define the ui variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all events listeners

loadEventListeners();

function loadEventListeners() {
    //Dom load event
    document.addEventListener('DOMContentLoaded',getTasks)
    // add task event
    form.addEventListener('submit',addTask); 
    taskList.addEventListener('click',removeTask); 
    clearBtn.addEventListener('click',clearTasks); 
    filter.addEventListener('keyup' , filterTasks); 

}

function getTasks() {
    let tasks = [];
    if(localStorage.getItem('tasks') !== null)
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task) =>{
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task)); 
        // create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e) {
    e.preventDefault();
    const task = taskInput.value;
    if(task==='')
    {
        alert('Please add a task');
        return;
    }    
    // create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task)); 
    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    taskInput.value = '';
    // add to the local storage
    storeTask(task);

}

function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure you want to delete this task?')){

            const task = e.target.parentElement.parentElement.textContent;
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.splice(tasks.indexOf(task),1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            e.target.parentElement.parentElement.remove();
        }
    }
}


function clearTasks(e)
{
    // first method
    // taskList.innerHtml = '';
    // second method => faster 
    const tasks = document.querySelectorAll('.collection-item');
    if(confirm('Are you sure you want to delete all tasks?'))
    {
        tasks.forEach((task) => task.remove());
        localStorage.removeItem('tasks');
    }
}

function filterTasks(e)
{
    const filterTxt = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('.collection-item');
    tasks.forEach((task) => {
        if(task.textContent.toLocaleLowerCase().indexOf(filterTxt)===-1)
        {
            task.style.display ='none';
        } else {
            task.style.display = 'block';
        }
    })
}

function storeTask(task)
{
    let tasks = [];
    if(localStorage.getItem('tasks') !== null)
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}