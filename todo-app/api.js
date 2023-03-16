async function getTodeList(owner) {
    const response = await fetch(
        ` http://localhost:3500/api/todos?owner=${owner}`
    );

    return await response.json();
}

async function createTodoItem({name, owner}) {
    const response = await fetch('http://localhost:3500/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            owner,
            done: false
        })
    });

    return await response.json();
}

function switchTodoItemDone(obj) {
    obj.done = !obj.done;
    fetch(`http://localhost:3500/api/todos/${obj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({done: obj.done})
    });
}

function deleteTodoItem(obj, element) {
    if (confirm('Вы уверены?')) {
        fetch(`http://localhost:3500/api/todos/${obj.id}`, {
            method: 'DELETE'
        });
        element.remove();
    }
}

export {getTodeList, createTodoItem, switchTodoItemDone, deleteTodoItem};
