//array to hold tasks
var tasks = [];

//task status 'enum'
var taskStatus = {
    active: 'active',
    completed: 'completed'
};

//task constructor function
function Task(id, name, status) {
    this.id = id;
    this.name = name;
    this.status = status;
}

//create new task element and add it to DOM
function addTaskElement(task) {
    //create elements
    var listEl = document.getElementById('active-list');
    var taskEl = document.createElement('li');
    var textEl = document.createTextNode(task.name);

    //set attributes
    taskEl.setAttribute('id', task.id);

    //add text
    taskEl.appendChild(textEl);

    //add task element
    listEl.appendChild(taskEl);

}

// Click handler to add a new task
function addTask(e) {
    var inputEl = document.getElementById('input-task');
    if (inputEl.value !== '') {
        //create unique id
        var id = 'item-' + tasks.length;

        //create a new task
        var task = new Task(id, inputEl.value, taskStatus.active);
        tasks.push(task);

        //add the task to the DOM
        addTaskElement(task);

        //reset input
        inputEl.value = '';
    }
}

//click handler to complete a task
function completeTask(e) {
    //get task element
    var taskEl = e.target;
    var id = taskEl.id;

    //Find the corresponding task in tasks array and update the status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].status = taskStatus.completed;
            break;
        }
    }
    //move task from active to completed list
    taskEl.remove();
    document.getElementById('completed-list').appendChild(taskEl);
}
//optional: key press handler to automatically click add task button
function clickButton(e) {
    if (e.keyCode === 13) {
        document.getElementById('add-task').click();
    }
}

//initialize the app
function init() {
    //wire add task button click handler
    document.getElementById('add-task').onclick = addTask;
    //wire the task completed list item click handler 
    document.getElementById('active-list').onclick = completeTask;
    //optional:wire task input key press handler
    document.getElementById('input-task').onkeypress = clickButton;
}

init();