async function switchStorage(selector) {
  const moduleTrigger = document.querySelector(selector);
  let modulePath = null;

  if (localStorage.getItem('storage')) {
    const pathFromStorage = localStorage.getItem('storage');
    modulePath = pathFromStorage;
    moduleTrigger.textContent = pathFromStorage === './ls.js' ?
                            'Перейти на серверное хранилище' :
                            'Перейти на локальное хранилище';
  } else {
    modulePath = './ls.js';
    moduleTrigger.textContent = 'Перейти на серверное хранилище';
    localStorage.setItem('storage', modulePath);
  }

  moduleTrigger.addEventListener('click', () => {
    if (modulePath === './ls.js') {
      localStorage.setItem('storage', './api.js');
    } else {
      localStorage.setItem('storage', './ls.js');
    }
    location.reload();
  });

  return await import(modulePath);
}

export default switchStorage;
