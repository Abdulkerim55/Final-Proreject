
const createTaskHtml = (id ,name, description, assignedTo, duedate, status) => {
    const html = ` 
    <div class="card text-white bg-dark mb-3" style="min-width: 22rem;padding:7px;">
        <div class = "data-task-id" ${id}>
            <spane><button class="status-btn  ${status == "Done" ? "btn-success" : "btn-info"}"  id="btnStatus" type="button">${status}</button></spane>
            <h5><small>Task Name:</small>${name}</h5>
            <h6>Description: ${description}</h6>
            <h6>Assigned To: ${assignedTo}</h6>
            <h6>Due: ${duedate}</h6>
            <button class="done-button btn-lg btn-success btn-sm ${status == "Done" ? "invisible" : "visible"}"  id="MarkAsDone" type="submit" >Mark As Done</button>
            <button class="delete-button btn-danger btn btn-sm" id="btnDelet" onclick ="Delete()" fa-toggle-on type="reset">delete</button>
       </div>
    </div>
    <br>`           
    return html;
}

const taskList = document.getElementById('list');

class TaskManager {
    constructor(currentId = 0) {
        this.currentId = currentId;
        this.tasks = [];
    }
    //tasks containing property
    addTask(name, description, assignedTo, dueDate, status = "TODO") {
        this.currentId++;
        const task = {
            id: this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
        }
        this.tasks.push(task)
    }
    render() {
        const tasksHtmlList = [];
        this.tasks.forEach((task) => {
            let dueDate = new Date(task.dueDate);
            let dd = dueDate.getDate() + 1;
            let mm = dueDate.getMonth() + 1;
            let yyyy = dueDate.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            } 
            dueDate = mm + '/' + dd + '/' + yyyy;
            const formattedDate = dueDate;
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status)
            tasksHtmlList.push(taskHtml)
        })
        const tasksHtml = tasksHtmlList.join('\n');
        taskList.innerHTML = tasksHtml;
    }
    getTaskById(taskId) {
        let foundTask;
        this.tasks.forEach(task => {
            if (task.id =taskId) {
                foundTask = task
            }
        })
        return foundTask;
    }
    save() {
        let tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', tasksJson);
        let currentId = JSON.stringify(this.currentId);
        localStorage.setItem('currentId', currentId);
    }
    load() {
        if (localStorage.getItem('tasks')) {
            let tasksJson = localStorage.getItem('tasks');
            this.tasks = JSON.parse(tasksJson);
        }
        if (localStorage.getItem('currentId')) {
            let currentId = localStorage.getItem('currentId');
            this.currentId = parseInt(currentId);
        }
    }
    deleteTask(taskId) {
        const newTasks = [];
        this.tasks.forEach((task) => {
            if (task.id != taskId) {
                newTasks.push(task);
            }
        })
        this.tasks = newTasks;

    }
}

