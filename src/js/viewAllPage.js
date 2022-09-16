import '../css/todoList.css'
import { pageDomElements } from "./index";
import { default as Todo } from './todos'
import { default as Project } from './projects'

export const viewItems = function (type = 'ToDos', projectName = '', sortType = 'Date') {
    // main content header
    if (projectName !== '') {

        let header = document.createElement('div');
        header.classList.add('main-content-header');
        const h3 = document.createElement('h3');
        h3.textContent = 'Project Name: ';
        const projectHeader = document.createElement('div');
        projectHeader.id = 'project-name';
        projectHeader.textContent = projectName;
        header.appendChild(h3);
        header.appendChild(projectHeader);
        pageDomElements.mainContent.appendChild(header);
    }

    if (type === 'ToDos') {
        if (Object.keys(Todo.getTodoList(projectName, sortType)).length === 0) {
            const warningMsg = document.createElement('div');
            warningMsg.classList.add('warning-msg');
            pageDomElements.mainContent.appendChild(warningMsg);
            warningMsg.innerHTML = svgIcons.warningMark + 'There are no todos to show';
        }

        else createTodoTable(projectName, sortType);
    }

    else {
        if (Object.keys(Project.getProjects()).length === 0) {
            const warningMsg = document.createElement('div');
            warningMsg.classList.add('warning-msg');
            pageDomElements.mainContent.appendChild(warningMsg);
            warningMsg.innerHTML = svgIcons.warningMark + 'There are no projects to show';
        }

        else createProjectTable();
    }
};

const createTodoTable = function (projectName, sortType) {
    const todoList = Todo.getTodoList(projectName, sortType);

    // table
    const table = document.createElement('table');
    pageDomElements.mainContent.appendChild(table);
    const tHeader = table.insertRow();
    tHeader.classList.add('list-header');

    // table header row
    tHeader.insertCell();
    tHeader.insertCell().textContent = 'Title';
    tHeader.insertCell().textContent = 'Priority';
    tHeader.insertCell().textContent = 'Todo-Date';
    tHeader.insertCell().textContent = 'Project Name';

    // create a sort select list
    tHeader.insertCell().innerHTML = `           
        Sort 
        <select id="sort-list">
            <option value="Date">Date</option>
            <option value="Priority">Priority</option>
            <option value="Done">Done</option>
        </select>`;
    // check the selected type of sort
    document.getElementById('sort-list').value = sortType;

    // todo item row
    todoList.forEach(todo => {
        let newTodo = table.insertRow();
        newTodo.id = todo.id;
        newTodo.classList.add('item');

        /* ---------row information-------- */
        // check icon
        let checkCell = newTodo.insertCell();
        checkCell.classList.add('done-mark');
        if (todo.done === true) checkCell.innerHTML = svgIcons.checkIcon;
        else checkCell.innerHTML = svgIcons.emptyCircle;

        // todo title
        let todoTitle = newTodo.insertCell();
        todoTitle.classList.add('item-title');
        todoTitle.textContent = todo.title;

        // todo priority
        let todoPriority = newTodo.insertCell();
        todoPriority.classList.add('item-priority');
        if (todo.priority === 'Low') todoPriority.style.color = 'green';
        else if (todo.priority === 'High') todoPriority.style.color = 'red';
        else if (todo.priority === 'Normal') todoPriority.style.color = 'orange';
        todoPriority.textContent = todo.priority ? todo.priority : '-';

        // todo date
        let todoDate = newTodo.insertCell();
        todoDate.classList.add('item-Date');
        todoDate.textContent = todo.dueDate ? todo.dueDate : '-';

        // todo project name
        let todoProjectName = newTodo.insertCell();
        todoProjectName.classList.add('item-project-name');
        todoProjectName.textContent = todo.projectName ? todo.projectName : '-';

        // tool btns
        let todoTools = newTodo.insertCell();
        todoTools.classList.add('tool-btns');

        todoTools.innerHTML = svgIcons.viewIcon + svgIcons.editIcon + svgIcons.deleteIcon;
    });
}

const createProjectTable = function () {
    const table = document.createElement('table');
    pageDomElements.mainContent.appendChild(table);
    const tHeader = table.insertRow();
    tHeader.classList.add('list-header');

    // table header row
    tHeader.insertCell().textContent = 'Project Name';
    tHeader.insertCell().textContent = 'Created-at';
    tHeader.insertCell();
    tHeader.insertCell();

    // todo item row
    const projectList = Project.getProjects();
    projectList.forEach(project => {
        let newProject = table.insertRow();
        newProject.id = project.id;
        newProject.classList.add('item');

        /* ---------row information-------- */
        // project name
        let projectName = newProject.insertCell();
        projectName.classList.add('project-name');
        projectName.textContent = project.name;

        // project date
        let projectDate = newProject.insertCell();
        projectDate.classList.add('project-date');

        const date = new Date(project.creationDate);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; // Months start at 0!
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedDate = yyyy + '-' + mm + '-' + dd;
        projectDate.textContent = formattedDate;

        // project add new todo btn
        let addTodo = newProject.insertCell();
        addTodo.classList.add('add-todo');
        let newTodoBtn = document.createElement('button');
        newTodoBtn.id = 'create-new-todo-dom';
        newTodoBtn.textContent = '+ ToDo';
        addTodo.appendChild(newTodoBtn);

        // tool btns
        let projectTools = newProject.insertCell();
        projectTools.classList.add('tool-btns');

        projectTools.innerHTML = svgIcons.viewIcon + svgIcons.editIcon + svgIcons.deleteIcon;
    });
}

const svgIcons = (() => {
    const checkIcon = `
    <svg id="done-mark" style="width:24px;height:24px" viewBox="0 0 24 24">
        <title>Done</title>
        <path id="done-mark"fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
    </svg>
    `;

    const viewIcon = `
    <svg id="view-btn" style="width:24px;height:24px" viewBox="0 0 24 24">
        <title>View</title>
        <path id="view-btn" fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
    </svg>`;

    const editIcon = `
    <svg id="edit-btn" style="width:24px;height:24px" viewBox="0 0 24 24">
        <title>Edit</title>
        <path id="edit-btn" fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
    </svg>`;

    const deleteIcon = `
    <svg id="delete-btn" style="width:24px;height:24px" viewBox="0 0 24 24">
        <title>Delete</title>
        <path id="delete-btn" fill="currentColor" d="M21.03,3L18,20.31C17.83,21.27 17,22 16,22H8C7,22 6.17,21.27 6,20.31L2.97,3H21.03M5.36,5L8,20H16L18.64,5H5.36M9,18V14H13V18H9M13,13.18L9.82,10L13,6.82L16.18,10L13,13.18Z" />
    </svg>`;

    const emptyCircle = `
    <svg id="done-mark" style="width:24px;height:24px" viewBox="0 0 24 24">
        <title>Done</title>
        <path id="done-mark"  fill="currentColor" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
    </svg>`;

    const warningMark = `
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
    </svg>`;

    return { checkIcon, emptyCircle, viewIcon, editIcon, deleteIcon, warningMark }
})();