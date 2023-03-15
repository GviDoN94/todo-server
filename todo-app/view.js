function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.textContent = title;
    return appTitle;
}

function createTodoItemForm() {
    const form = document.createElement('form'),
        input = document.createElement('input'),
        buttonWrapper = document.createElement('div'),
        button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.disabled = true;
    input.addEventListener('input', () => {
        button.disabled = false;
        if (!input.value.trim()) {
            button.disabled = true;
        }
    });

    return {
        form,
        input,
        button,
    };
}

function createTodoList() {
    const list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
}

function createTodoItemElement(obj, {onDone, onDelete}) {
    const item = document.createElement('li'),
        buttonGroup = document.createElement('div'),
        doneButton = document.createElement('button'),
        deleteButton = document.createElement('button'),
        doneClass = 'list-group-item-success';

    item.classList.add(
        'list-group-item',
        'd-flex', 'justify-content-between',
        'align-items-center'
    );
    item.textContent = obj.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    if (obj.done) {
        item.classList.add(doneClass);
    }

    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    doneButton.addEventListener('click', () => {
        onDone(obj, item);
        if (!item.classList.contains(doneClass) && obj.done) {
            item.classList.add(doneClass);
        } else {
            item.classList.remove(doneClass);
        }
    });

    deleteButton.addEventListener('click', () => {
        onDelete(obj, item);
    });

    return item;
}

async function createTodoApp(container, {
    title='Список дел',
    todoItemsList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick
}) {
    const todoAppTitle = createAppTitle(title),
        todoItemForm = createTodoItemForm(),
        todoList = createTodoList(),
        handlers = {onDone: onDoneClick, onDelete: onDeleteClick};

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    
    todoItemsList.forEach(item => {
        const todoItemElement = createTodoItemElement(item, handlers);
        todoList.append(todoItemElement);
    });

    todoItemForm.form.addEventListener('submit', async event => {
        event.preventDefault();

        if (!todoItemForm.input.value.trim()) {
            todoItemForm.input.value = '';
            return;
        }

        const todoItem = await onCreateFormSubmit({
            name: todoItemForm.input.value.trim(),
            owner: title
        }),
            todoItemElement = createTodoItemElement(todoItem, handlers);

        todoList.append(todoItemElement);
        todoItemForm.input.value = '';
        todoItemForm.button.disabled = true;
    });
}

export default createTodoApp;
