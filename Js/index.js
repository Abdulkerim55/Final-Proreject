
let newTaskManager = new TaskManager();
newTaskManager.load();
newTaskManager.render();


const newTaskNameInput = document.querySelector('#newTaskNameInput');
const newTaskDescInput = document.querySelector('#newTaskDescInput');
const newTaskAssign = document.querySelector('#newTaskAssignInput');
const newTaskDuedateInput= document.querySelector('#newTaskDuedateInput');

const errorShow = document.querySelector('#name-error');
const btnSubmit = document.getElementById('btnSubmit');

function formReset(){
    newTaskNameInput.value="";
    newTaskDescInput.value = "";
    newTaskAssign.value = "";
    newTaskDuedateInput.value = "";
}

function validFormInput(data) {
    const nameInput = newTaskNameInput.value;
    const descriptionInput = newTaskDescInput.value;
    const assigneInput = newTaskAssign.value;
    const DateInput = newTaskDuedateInput.value;
    let addNewTask = newTaskManager.addTask(nameInput, descriptionInput, assigneInput, DateInput);
   
    if (nameInput === "" || descriptionInput === "" || assigneInput === "" || DateInput === "") {
        errorShow.style.display = 'block';
        setTimeout( function validFormInput(){ errorShow.style.display = 'none' }, 3000);
    }
    else { 
        addNewTask;
        newTaskManager.save();
        newTaskManager.render();
        formReset();    
    }   
};

btnSubmit.addEventListener("click", validFormInput)

taskList.addEventListener('click', (event) => {
    // let parentTask = event.target.parentElement.parentElement.getAttribute("class", "data-list-id")
    // let taskId = parentTask.dataset.taskId
    let taskId = event.target.parentElement.parentElement.getAttribute("class", "data-list-id")
    if (event.target.classList.contains("done-button")) {
        let task = newTaskManager.getTaskById(taskId)
        localStorage.setItem('task', task);
        task.status = "Done";
        newTaskManager.save();
        newTaskManager.render();
    }
    if (event.target.classList.contains("delete-button")) {
        newTaskManager.deleteTask(taskId);
        newTaskManager.save();
        newTaskManager.render();
    }

});
