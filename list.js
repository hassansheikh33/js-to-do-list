document.addEventListener('DOMContentLoaded', function(){
    const input = document.querySelector('#userInput');
    const enter = document.querySelector('#enter');
    const ul = document.querySelector('ul');
    
    const display=()=>{
        const tasks = getitems();
        if(tasks.length>0){
            tasks.forEach(task => {
                createTask(task.id,task.value); 
            });
        }
    }

    addItem=e=>{
        e.preventDefault();
        const id = new Date().getTime().toString();
        const value = input.value;
        if(value){
            createTask(id,value);
            input.value = "";
            addLocal(id,value);
        }else alert("Please enter something");
    }
    
    window.addEventListener('DOMContentLoaded', display);
    enter.addEventListener('click', addItem);

    delItem=e=>{
        const parent = e.currentTarget.parentElement;
        parent.remove();
        input.value = "";
        const id = parent.dataset.id;
        removeLocal(id);
        if(ul.children.length == 0 ){
            localStorage.clear();
        }
    }

    getitems=()=> localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];


    addLocal=(id,value)=>{
        const item = {id, value}; 
        const tasks = getitems();
        tasks.push(item);
        localStorage.setItem("list", JSON.stringify(tasks));
    }

    removeLocal=id=>{
        const tasks = getitems();
        for(i in tasks){
            if(tasks[i].id=== id){
                tasks.splice(i,1);
            }
        }
        localStorage.setItem("list",JSON.stringify(tasks));
    }

    createTask=(id,value)=>{
        const list = document.createElement('li');
            list.setAttribute("data-id", id);
            list.innerHTML= `${value}<button class="delBtn">X</button>`;
            const delBtn = list.querySelector('.delBtn');
            delBtn.addEventListener('click', function(){
                this.parentElement.remove();
                const id = this.parentElement.id;
                removeLocal(id);
                if(ul.children.length == 0 ){
                localStorage.clear();
                }
            });
            ul.appendChild(list);
            list.addEventListener('click', function(){
                this.classList.toggle('done');
            });
    }

});
