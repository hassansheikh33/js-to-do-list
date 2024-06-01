document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('#userInput');
    const enter = document.querySelector('#enter');
    const ul = document.querySelector('ul');

    const display = () => {
        const tasks = getitems();
        if (tasks.length > 0) {
            tasks.forEach(task => {
                createTask(task.id, task.value);
            });
        }
    }

    addItem = e => {
        e.preventDefault();
        const id = new Date().getTime().toString();
        const value = input.value;
        if (value) {
            createTask(id, value);
            input.value = "";
            addLocal(id, value);
        } else alert("Please enter something");
    }

    window.addEventListener('DOMContentLoaded', display);
    enter.addEventListener('click', addItem);

    delItem = (id, e) => {
        const parent = e.currentTarget.parentElement;
        parent.remove();
        input.value = "";
        console.log(id);
        removeLocal(id);
        if (ul.children.length == 0) {
            localStorage.clear();
        }
    }

    const getitems = () => localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];


    addLocal = (id, value) => {
        const item = { id, value };
        const tasks = getitems();
        tasks.push(item);
        localStorage.setItem("list", JSON.stringify(tasks));
    }

    removeLocal = id => {
        const tasks = getitems();
        const fitleredTasks = tasks.filter((task => task.id !== id));
        console.log(fitleredTasks);
        localStorage.setItem("list", JSON.stringify(fitleredTasks));
    }

    createTask = (id, value) => {
        const list = document.createElement('li');
        list.setAttribute("data-id", id);
        list.innerHTML = `${value}<button class="delBtn">X</button>`;
        const delBtn = list.querySelector('.delBtn');
        delBtn.addEventListener('click', delItem.bind(null, id));
        ul.appendChild(list);
        list.addEventListener('click', function () {
            this.classList.toggle('done');
        });
    }

});
