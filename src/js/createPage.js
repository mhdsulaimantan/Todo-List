import '../css/todoForm.css'
import { pageDomElements } from './index'

export const createDom = function (type, projectName = '') {
    if (type === 'ToDos') {

        pageDomElements.mainContent.innerHTML = `
        <div class="todo-form">  
            <h3>New ToDo</h3>  
            <label for="title">Title:</label>
            <input type="text" id="title" placeholder="title">
            
            <label for="project-name">Project Name:</label>
            <input type="text" id="project-name" placeholder="Project Name" value="${projectName}">

            <label for="description">Description:</label>
            <input type="text" id="description" placeholder="description">

            <label for="note">Note:</label>
            <textarea id="note" placeholder="Note"></textarea>

            <label for="duedate">Date:</label>
            <input type="date" id="duedate">

            <label for="priority">Priority:</label>
            <div class="radio">
                <input type="radio" id="priority" name="priority" value="Low">Low
                <input type="radio" id="priority" name="priority" value="Normal">Normal
                <input type="radio" id="priority" name="priority" value="High">High
            </div>

            <button id="create-item">Create</button>
        </div>`
    }

    else {
        pageDomElements.mainContent.innerHTML = `
        <div class="project-form">    
            <label for="project-name">Project Name:</label>
            <input type="text" id="project-name" placeholder="Project Name">
            
            <button id="create-item">Create</button>
        </div>
        `;
    }
}