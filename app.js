window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    const username = localStorage.getItem('username') || '';
    nameInput.value = username;
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })


    newTodoForm.addEventListener('submit', e => {
        if (!content.value) {
            alert("Please Enter a Task")
        }
        else {
            e.preventDefault();
            const todo = {
                content: e.target.elements.content.value,
                category: e.target.elements.category.value,
                done: false,
                createdAt: new Date().toISOString()
            }
            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            e.target.reset();

            DisplayTodos();
        }

    })
    DisplayTodos();
})

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '',
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item')
            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span')
            const content = document.createElement('div')
            const actions = document.createElement('div')
            const edit = document.createElement('button')
            const deleteButton = document.createElement('button')


            input.type = 'checkbox';
            input.checked = todo.done;
            span.classList.add('bubble');

            if (todo.category == 'personal') {
                span.classList.add('personal');
            } else if (todo.category == 'business') {
                span.classList.add('business')
            } else if (todo.category == 'school') {
                span.classList.add('school')
            } else {
                span.classList.add('uncategorized')
            }
            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}"
        readonly>`;
            edit.innerHTML = 'Edit';
            deleteButton.innerHTML = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);
            todoList.appendChild(todoItem);



            if (todo.done) {
                todoItem.classList.add('done');
            }
            input.addEventListener('click', e => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));

                DisplayTodos();
            })
            edit.addEventListener('click', e => {
                const input = content.querySelector('input');
                input.removeAttribute('readonly');
                input.focus();
                input.addEventListener('blur', e => {
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();



                })
            })
            deleteButton.addEventListener('click', e => {
                todos = todos.filter(t => t != todo);
                // OR for the delete function
                // todos = todos.filter(t => {
                //     if (t === todo){
                //         return false;
                //     }
                //     else{
                //         return true;
                //     }
                // });
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        });
    const clear = document.createElement('input');
    if (todos.length > 0) {
        clear.type = 'submit'
        clear.classList.add('clear');
        clear.value = 'Clear Tasks';
        todoList.appendChild(clear);
    }

    clear.addEventListener('click', e => {
        todos = [];
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
    })

}