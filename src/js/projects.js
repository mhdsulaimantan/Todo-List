import { default as Todo } from './todos'

export default (() => {
    let _projectList = localStorage.getItem('_projectList') ? JSON.parse(localStorage.getItem('_projectList')) : new Array;

    const _saveLocalStorage = function () {
        localStorage.setItem('_projectList', JSON.stringify(_projectList));
    }

    const setNewProject = function (name, creationDate) {
        _projectList.push({
            id: String(_projectList.length + 1),
            name,
            creationDate
        });
        _saveLocalStorage();
    }

    const getProjectInfo = function (id) {
        let project = _projectList.find(obj => obj.id === id);
        return project;
    }

    const updateProject = function (id, name, creationDate) {
        let index = _projectList.findIndex((obj => obj.id === id));

        // update Todos project name
        let projectTodos = Todo.getTodoList(_projectList[index].name);
        projectTodos.map(todo => todo.projectName = name);

        _projectList[index] = {
            id,
            name,
            creationDate
        }

        _saveLocalStorage();
    }

    const removeProject = function (id) {
        let index = _projectList.findIndex((obj => obj.id === id));
        // delete all todo list for project
        let projectTodos = Todo.getTodoList(_projectList[index].name);
        projectTodos.forEach(todo => Todo.removeTodo(todo.id));
        // delete project
        _projectList.splice(index, 1);
        // save changes in local storage
        _saveLocalStorage();
    }

    const getProjects = function () {
        return _projectList;
    }

    return { setNewProject, getProjectInfo, updateProject, removeProject, getProjects }
})();
