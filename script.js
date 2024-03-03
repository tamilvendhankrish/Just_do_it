const todo = document.querySelector('.todo'); // unordered todo list 
const form = document.querySelector('.form'); // input box to add new task
const info = document.querySelector('.info'); // when there are no tasks
const header = document.querySelector('.header'); // when there are one or more tasks
const filter = document.querySelector('.filter'); // input box to enter search string
const error = document.querySelector('.error'); // when the filter is not found
const tasks = todo.getElementsByTagName('li'); // list of all the tasks
const filtered = todo.getElementsByClassName('filtered'); // list of all filtered tasks

// checks and updates the todo list
const checkTasks = () => {
    if (tasks.length > 0) {
        info.classList.add('d-none');
        header.classList.remove('d-none');
        filter.classList.remove('d-none');
    }
    else {
        info.classList.remove('d-none');
        header.classList.add('d-none');
        filter.classList.add('d-none');
    }
}

// filters tasks based on the search string
const filterTasks = (term) => {

    Array.from(todo.children)
        .filter((task) => !task.textContent.includes(term))
        .forEach((task) => task.classList.add('d-none', 'filtered'))

    Array.from(todo.children)
        .filter((task) => task.textContent.includes(term))
        .forEach((task) => task.classList.remove('d-none', 'filtered'))
}

todo.addEventListener('click', e => {

    // when new task is added
    if (e.target.classList.contains('fa-trash-can')) { 
        e.target.parentNode.parentNode.classList.add('outgoing');

        // red color for outgoing tasks
        setTimeout(() => {
            e.target.parentNode.parentNode.remove();
            checkTasks();
        }, 1000);
    }
    // when task is completed
    else if (e.target.classList.contains('fa-circle-check')) {
        e.target.parentNode.parentNode.classList.add('completed');
        e.target.classList.remove('fa-circle-check');
        e.target.classList.add('fa-arrows-rotate');
    }
    // when task progress is reset
    else if (e.target.classList.contains('fa-arrows-rotate')) {
        e.target.parentNode.parentNode.classList.remove('completed');
        e.target.classList.remove('fa-arrows-rotate');
        e.target.classList.add('fa-circle-check');
    }
})

form.addEventListener('submit', e => {

    e.preventDefault(); // prevents page reload

    var templateString = "";

    // new task added as template string to todo list
    if (form.task.value != '') {
        templateString = `
        <li class="list-group-item d-flex justify-content-between align-items-center incoming">
                    <div class="task">
                        ${form.task.value.toLowerCase().trim()}
                    </div>
                    <div class="buttons">
                        <i class="fa-sharp fa-solid fa-circle-check"></i>
                        <span>&nbsp;</span>
                        <i class="fa-sharp fa-solid fa-trash-can"></i>
                    </div>
                </li>
        `;
    }

    todo.innerHTML += templateString;

    // green color for incoming tasks
    setTimeout(() => {
        Array.from(tasks)
        .forEach((item)=>{
            item.classList.remove('incoming')})
    }, 1000);

    form.reset();
    checkTasks();
})

filter.addEventListener('keyup', e => {

    const term = filter.value.toLowerCase().trim();
    // filters tasks based on search string
    filterTasks(term); 

    // if no match is found
    if(filtered.length === tasks.length){
    error.classList.remove('d-none');
    header.classList.add('d-none');
    }
    // if one or more match is found
    else{
    error.classList.add('d-none');
    header.classList.remove('d-none');
    }
})