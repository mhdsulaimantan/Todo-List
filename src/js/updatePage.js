import '../css/todoForm.css'
import { pageDomElements } from './index'

export const updateDom = function (type, item) {
    if (type === 'ToDos') {

        pageDomElements.mainContent.innerHTML = `
        <div class="todo-form">    
            <label for="title">Title:</label>
            <input type="text" id="title" placeholder="title" value="${item.title}">

            <label for="project-name">Project Name:</label>
            <input type="text" id="project-name" placeholder="Project Name" value="${item.projectName}">
            
            <label for="description">Description:</label>
            <input type="text" id="description" placeholder="description" value="${item.description}">

            <label for="note">Note:</label>
            <textarea id="note" placeholder="Note">${item.note}</textarea>

            <label for="duedate">Date:</label>
            <input type="date" id="duedate" value="${item.dueDate}">

            <label for="priority">Priority:</label>
            <div class="radio">
                <input type="radio" id="priority" name="priority" value="Low">Low
                <input type="radio" id="priority" name="priority" value="Normal">Normal
                <input type="radio" id="priority" name="priority" value="High">High
            </div>

            <button id="edit-item">Edit</button>
        </div>`
        // check the priority radio for the todo 
        document.querySelectorAll('#priority').forEach(ele => { if (ele.value === item.priority) ele.checked = true; });
    }

    // project
    else {
        pageDomElements.mainContent.innerHTML = `
        <div class="project-form">    
            <label for="project-name">Project Name:</label>
            <input type="text" id="project-name" placeholder="Project Name" value="${item.name}">
            
            <button id="edit-item">Edit</button>
        </div>`
    }
}