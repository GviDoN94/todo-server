let lsArr = [];

function getTodoList(owner) {
  lsArr = localStorage.getItem(owner) ?
            JSON.parse(localStorage.getItem(owner)) :
            [];
  return lsArr;
}

function getNewId(arr) {
  let maxId = 0;
  arr.forEach(item => {
    if (item.id > maxId) {
      maxId = item.id;
    }
  });
  return maxId + 1;
}

function createTodoItem({name, owner}) {
  const todoItem = {
    name: name,
    owner: owner,
    done: false,
    id: getNewId(lsArr)
  };
  lsArr.push(todoItem);
  localStorage.setItem(owner, JSON.stringify(lsArr));
  return todoItem;
}

function switchTodoItemDone(obj) {
  obj.done = !obj.done;
  localStorage.setItem(obj.owner, JSON.stringify(lsArr));
}

function deleteTodoItem(obj, element) {
  if (confirm('Вы уверены?')) {
    const index = lsArr.findIndex(item => item.id === obj.id);
    lsArr.splice(index, 1);
    localStorage.setItem(obj.owner, JSON.stringify(lsArr));
    element.remove();
  }
}

export {getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem};
