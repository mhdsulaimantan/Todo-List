import { default as Todo } from './todos'
import { default as Project } from './projects'
import { viewItems } from './viewAllPage';
import { pageDomElements } from './index';

export const createItem = function (type, sortType = null) {
    if (type === 'ToDos') {
        const formInfo = formTodoData();
        if (formInfo !== undefined) {
            Todo.setNewTodo(
                formInfo.title.value,
                formInfo.description.value,
                formInfo.dueDate.value,
                formInfo.note.value,
                Date.now(),
                formInfo.priorityValue,
                formInfo.projectName.value
            );
            alert("The Todo has been created successfully");
            // clear the main content
            pageDomElements.mainContent.innerHTML = '';
            // view all todos
            viewItems(type, formInfo.projectName.value, sortType);
        }
    }
    // projects 
    else {
        const formInfo = formProjectData();
        Project.setNewProject(
            formInfo.name.value,
            Date.now()
        );
        alert("The Project has been created successfully");
        // clear the main content
        pageDomElements.mainContent.innerHTML = '';
        viewItems(type);
    }
}

export const deleteItem = function (itemId, type, sortType = null) {
    if (type === 'ToDos') {
        // get the project name to view items for that project
        let projectName = Todo.getTodoInfo(itemId).projectName;

        // remove todo
        Todo.removeTodo(itemId);
        alert('The Todo was deleted successfully');
        // clear the main content
        pageDomElements.mainContent.innerHTML = '';
        viewItems(type, projectName, sortType);
    }
    // projects
    else {
        Project.removeProject(itemId);
        alert('The Project was deleted successfully');
        // clear the main content
        pageDomElements.mainContent.innerHTML = '';
        viewItems(type);
    }
}

export const updateItem = function (itemId, type, sortType = null, done = false) {
    if (type === 'ToDos') {
        let projectName;
        if (done) {
            let todo = Todo.getTodoInfo(itemId);
            Todo.updateTodo(
                itemId,
                todo.title,
                todo.description,
                todo.dueDate,
                todo.note,
                todo.creationDate,
                todo.priority,
                todo.projectName,
                !todo.done
            );
            projectName = todo.projectName;
        }

        else {
            const formInfo = formTodoData();

            Todo.updateTodo(
                itemId,
                formInfo.title.value,
                formInfo.description.value,
                formInfo.dueDate.value,
                formInfo.note.value,
                Date.now(),
                formInfo.priorityValue,
                formInfo.projectName.value,
            );

            alert("The Todo has been updated successfully");
            projectName = formInfo.projectName.value;
        }

        // clear the main content
        pageDomElements.mainContent.innerHTML = '';
        viewItems(type, projectName, sortType);
    }
    // update project
    else {
        let formInfo = formProjectData();
        Project.updateProject(
            itemId,
            formInfo.name.value,
            Date.now()
        );
        alert("The Project has been updated successfully");
        // clear the main content
        pageDomElements.mainContent.innerHTML = '';
        viewItems(type);
    }
}

const formTodoData = function () {
    const title = document.querySelector('#title');
    if (title !== null) {
        if (title.value === '') alert('you should enter a title!!!');
        else {
            const description = document.querySelector('#description');
            const dueDate = document.querySelector('#duedate');
            const note = document.querySelector('#note');
            const priority = document.getElementsByName('priority');
            // get the check priority value
            let priorityValue;
            for (let i = 0; i < priority.length; i++)
                if (priority[i].checked) { priorityValue = priority[i].value };

            const projectName = document.querySelector('#project-name');

            return { title, description, dueDate, note, priorityValue, projectName }
        }
    }
}

const formProjectData = function () {
    const name = document.querySelector('#project-name');
    if (name !== null) {
        if (name.value === '') alert('you should enter a name!!!');
        else {
            return { name }
        }
    }
}