import { default as Project } from './projects'

export default (() => {
    let _todoList = localStorage.getItem('_todoList') ? JSON.parse(localStorage.getItem('_todoList')) : new Array;

    const _saveLocalStorage = function () {
        localStorage.setItem('_todoList', JSON.stringify(_todoList));
    }

    const setNewTodo = function (title, description, dueDate, note, creationDate, priority, projectName, done = false) {
        _todoList.push({
            id: String(_todoList.length + 1),
            title,
            description,
            dueDate,
            note,
            creationDate,
            priority,
            projectName,
            done
        });
        // new project added
        if (projectName !== '' && !Project.getProjects().find(obj => obj.name === projectName))
            Project.setNewProject(projectName, creationDate);

        _saveLocalStorage();
    }

    const getTodoInfo = function (id) {
        let todo = _todoList.find(obj => obj.id === id);
        return todo;
    }

    const updateTodo = function (id, title, description, dueDate, note, creationDate, priority, projectName, done = false) {
        let index = _todoList.findIndex((obj => obj.id === id));

        _todoList[index] = {
            id,
            title,
            description,
            dueDate,
            note,
            creationDate,
            priority,
            projectName,
            done
        }
        // new project added
        if (projectName !== '' && !Project.getProjects().find(obj => obj.name === projectName))
            Project.setNewProject(projectName, creationDate);

        _saveLocalStorage();
    }

    const removeTodo = function (id) {
        let index = _todoList.findIndex((obj => obj.id === id));
        _todoList.splice(index, 1);
        _saveLocalStorage();
    }

    const getTodoList = function (projectName, sort) {
        let todoList;
        // all todos
        if (projectName === '') todoList = _todoList;

        // project todos
        else todoList = _todoList.filter(todo => todo.projectName === projectName);

        // sort by date
        if (sort === 'Date') {
            let sortedTodoList = [];
            todoList.forEach(todo => {
                let dueDate = todo.dueDate.split("-").join('');
                sortedTodoList.push([todo, dueDate])
            });

            sortedTodoList = sortedTodoList.sort(function (a, b) {
                return a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0);
            })
            todoList = sortedTodoList.reduce((arr, ele) => (arr.push(ele[0]), arr), []);
        }

        // sort by priority
        else if (sort === 'Priority') {
            let highList = [];
            let normalList = [];
            let lowList = [];
            let emptyList = [];
            todoList.forEach(todo => {
                if (todo.priority === 'High') highList.push(todo);
                else if (todo.priority === 'Normal') normalList.push(todo);
                else if (todo.priority === 'Low') lowList.push(todo);
                else emptyList.push(todo);
            });
            todoList = highList.concat(normalList, lowList, emptyList);
        }

        // sort by Done todos
        else if (sort === 'Done') {
            let doneList = [];
            let undoneList = [];
            todoList.forEach(todo => {
                if (todo.done === true) doneList.push(todo);
                else undoneList.push(todo);
            })
            todoList = doneList.concat(undoneList);
        }
        return todoList;
    }

    return { getTodoList, setNewTodo, getTodoInfo, updateTodo, removeTodo }
})();
