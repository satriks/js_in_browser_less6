(function () {

document.addEventListener('DOMContentLoaded', printTask)    
const taskText = document.querySelector('.tasks__input')
document.getElementById("tasks__add").addEventListener('click', addTask)
taskText.addEventListener('keydown', addTask)

function addTask(event) {

    if ((event.key == 'Enter' || this.id == 'tasks__add') && taskText.value) {
        event.preventDefault()
        
        const taskList = document.querySelector('.tasks__list')
        const task = document.createElement('div')
        task.innerHTML = `<div class="task">
                            <div class="task__title">
                                ${taskText.value}
                            </div>
                            <a href="#" class="task__remove">&times;</a>
                        </div>`
        taskList.append(task)
        saveToStorage(taskText.value)
        taskText.value = ''
        task.querySelector('.task__remove').addEventListener('click', (event) => close(event, task))
    }
}

function close(event, task) {

    let taskFromStorage = JSON.parse(localStorage.getItem('tasks')) || []
    taskFromStorage = taskFromStorage.filter(el => el !== task.firstElementChild.firstElementChild.innerText)
    localStorage.setItem('tasks', JSON.stringify([...taskFromStorage]))

    event.preventDefault()
    task.querySelector('.task__remove').removeEventListener('click', (event) => close(event, task))
    task.remove()
}

function saveToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    localStorage.setItem('tasks', JSON.stringify([...tasks, task]))
}

function printTask() {
    const taskFromStorage = JSON.parse(localStorage.getItem('tasks'))

    if (taskFromStorage) {
        taskFromStorage.forEach(element => printTaskFromStorage(element));
    }
}

function printTaskFromStorage(element) {

    const taskList = document.querySelector('.tasks__list')
    const task = document.createElement('div')
    task.innerHTML = `<div class="task">
                        <div class="task__title">
                            ${element}
                        </div>
                        <a href="#" class="task__remove">&times;</a>
                        </div>`
    taskList.append(task)
    taskText.value = ''
    task.querySelector('.task__remove').addEventListener('click', (event) => close(event, task))

}

})()
    