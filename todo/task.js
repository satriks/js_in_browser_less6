(function () {

document.addEventListener('DOMContentLoaded', printTaskFromStorage)    
const taskText = document.querySelector('.tasks__input')
document.getElementById("tasks__add").addEventListener('click', addTask)
// taskText.addEventListener('keydown', addTask)

function addTask(event) {
    event.preventDefault()

    if ( taskText.value.trim()) {
        saveToStorage(taskText.value)
        printTask(taskText.value)
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

function printTaskFromStorage() {
    const taskFromStorage = JSON.parse(localStorage.getItem('tasks'))

    if (taskFromStorage) {
        taskFromStorage.forEach(element => printTask(element));
    }
}

function printTask(element) {

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
    