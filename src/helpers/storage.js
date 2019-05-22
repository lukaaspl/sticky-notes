const saveListsToStorage = lists => {
  localStorage.setItem('lists', JSON.stringify(lists));
};

const getListsFromStorage = () => {
  return JSON.parse(localStorage.getItem('lists'));
};

const removeItemsInstanceFromStorage = listId => {
  localStorage.removeItem(`itemsForList${listId}`);
};

const saveItemsToStorage = (listId, items) => {
  localStorage.setItem(`itemsForList${listId}`, JSON.stringify(items));
};

const getItemsFromStorage = listId => {
  for (let key in localStorage)
    if (key === `itemsForList${listId}`) return JSON.parse(localStorage[key]);

  return false;
};

const saveListPosition = (listId, position) => {
  localStorage.setItem(`positionForList${listId}`, JSON.stringify(position));
};

const getListPosition = listId => {
  for (let key in localStorage)
    if (key === `positionForList${listId}`)
      return JSON.parse(localStorage[key]);

  return false;
};

const removeListPositionInstanceFromStorage = listId => {
  if (localStorage.hasOwnProperty(`positionForList${listId}`))
    localStorage.removeItem(`positionForList${listId}`);
};

export default {
  saveListsToStorage,
  getListsFromStorage,
  removeItemsInstanceFromStorage,
  saveItemsToStorage,
  getItemsFromStorage,
  saveListPosition,
  getListPosition,
  removeListPositionInstanceFromStorage
};
