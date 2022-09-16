import { pageDomElements } from '.';
import '../css/todoView.css'
import { viewItems } from './viewAllPage';

export const viewDom = function (type, item) {
    if (type === 'ToDos') {
        let viewContainer = document.createElement('div');
        viewContainer.id = 'view-container';

        let viewTodo = document.createElement('div');
        viewTodo.id = 'view-todo';
        // title
        const titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', 'todo-title');
        titleLabel.textContent = 'Todo Title';
        const todoTitle = document.createElement('div');
        todoTitle.id = 'todo-title';
        todoTitle.textContent = item.title;
        // description
        const descriptionLabel = document.createElement('label');
        descriptionLabel.setAttribute('for', 'todo-description');
        descriptionLabel.textContent = 'Todo Description';
        const todoDescription = document.createElement('div');
        todoDescription.id = 'todo-description';
        todoDescription.textContent = item.description ? item.description : '-';
        // note
        const noteLabel = document.createElement('label');
        noteLabel.setAttribute('for', 'todo-note');
        noteLabel.textContent = 'Todo Note';
        const todoNote = document.createElement('div');
        todoNote.id = 'todo-note';
        todoNote.textContent = item.note ? item.note : '-';
        // Date
        const dateLabel = document.createElement('label');
        dateLabel.setAttribute('for', 'todo-note');
        dateLabel.textContent = 'Todo Date';
        const todoDate = document.createElement('div');
        todoDate.id = 'todo-date';
        todoDate.textContent = item.dueDate ? item.dueDate : '-';
        // priority
        const priorityLabel = document.createElement('label');
        priorityLabel.setAttribute('for', 'todo-priority');
        priorityLabel.textContent = 'Todo Priority';
        const todoPriority = document.createElement('div');
        todoPriority.id = 'todo-priority';
        if (item.priority === 'Low') todoPriority.style.color = 'green';
        else if (item.priority === 'High') todoPriority.style.color = 'red';
        else if (item.priority === 'Normal') todoPriority.style.color = 'orange';
        todoPriority.textContent = item.priority ? item.priority : '-';

        // append all to view todo element
        viewTodo.appendChild(titleLabel);
        viewTodo.appendChild(todoTitle);
        viewTodo.appendChild(descriptionLabel);
        viewTodo.appendChild(todoDescription);
        viewTodo.appendChild(noteLabel);
        viewTodo.appendChild(todoNote)
        viewTodo.appendChild(dateLabel);
        viewTodo.appendChild(todoDate);
        viewTodo.appendChild(priorityLabel);
        viewTodo.appendChild(todoPriority);

        document.body.appendChild(viewContainer);
        document.body.appendChild(viewTodo);
    }

    else {

        pageDomElements.mainContent.innerHTML = '';
        pageDomElements.contentHeaderTitle.textContent = 'ToDos'
        viewItems('ToDos', item.name);
    }
}