import '../css/index.css'
import { viewItems } from './viewAllPage';
import { createDom } from './createPage';
import * as CURD from './CURD'
import { default as Todo } from './todos'
import { default as Project } from './projects'
import { updateDom } from './updatePage';
import { viewDom } from './viewPage';

const pageListener = function () {
    // nav listeners
    pageDomElements.allListItems.forEach(element => {
        element.addEventListener('click', () => {
            let selectedLi = document.querySelector('.selected');
            selectedLi.classList.remove('selected');

            pageDomElements.contentHeaderTitle.textContent = element.innerText;

            // clear the main content
            pageDomElements.mainContent.innerHTML = '';

            //show list of required items
            viewItems(element.innerText)
            element.classList.add('selected');
        });
    });

    pageDomElements.addBtn.addEventListener('click', () => {
        const projectName = document.querySelector('#project-name');
        if (projectName) createDom(pageDomElements.contentHeaderTitle.innerText, projectName.innerText);
        else createDom(pageDomElements.contentHeaderTitle.innerText);
    });

    // dynamic dom elements listener
    let itemId;
    let sortType = 'Date';
    document.body.addEventListener('click', (e) => {
        let type = pageDomElements.contentHeaderTitle.innerText;
        if (e.target.id === 'create-item') CURD.createItem(type, sortType);
        else if (e.target.id === 'delete-btn') CURD.deleteItem(e.target.closest('tr').id, type, sortType);
        else if (e.target.id === 'edit-btn') {
            itemId = e.target.closest('tr').id;
            let item;
            if (type === 'ToDos') item = Todo.getTodoInfo(itemId);
            else item = Project.getProjectInfo(itemId);
            updateDom(type, item);
        }
        else if (e.target.id === 'edit-item') CURD.updateItem(itemId, type, sortType);
        else if (e.target.id === 'view-btn') {
            itemId = e.target.closest('tr').id;
            let item;
            if (type === 'ToDos') item = Todo.getTodoInfo(itemId);
            else item = Project.getProjectInfo(itemId);
            viewDom(type, item);
        }
        else if (e.target.id === 'done-mark') CURD.updateItem(e.target.closest('tr').id, type, sortType, true);
        // sort list
        else if (e.target.id === 'sort-list') {
            // get project name if exist
            const projectName = document.querySelector('#project-name') ? document.querySelector('#project-name').innerText : '';
            e.target.addEventListener('change', () => {
                // clear the main content
                pageDomElements.mainContent.innerHTML = '';
                sortType = e.target.value;
                viewItems(type, projectName, sortType);
            });
        }
        // cancel the view
        else if (e.target.id === 'view-container') {
            e.target.remove();
            document.querySelector('#view-todo').remove();
        }

        // create todo for a project
        else if (e.target.id === 'create-new-todo-dom') {
            itemId = e.target.closest('tr').id;
            let project = Project.getProjectInfo(itemId);
            pageDomElements.contentHeaderTitle.innerText = 'ToDos';
            createDom('ToDos', project.name);
        }
    });
}

export const pageDomElements = (() => {
    const container = document.querySelector('#container');
    const allListItems = document.querySelectorAll('li');
    const contentHeaderTitle = document.querySelector('.section-title');
    const addBtn = document.querySelector('.add');
    const mainContent = document.querySelector('.main-content');

    return {
        container,
        allListItems,
        contentHeaderTitle,
        addBtn,
        mainContent,
    }
})();

viewItems();
pageListener();


