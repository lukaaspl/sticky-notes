const saveLists = lists => {
  localStorage.setItem('lists', JSON.stringify(lists));
};

const getLists = () => {
  return JSON.parse(localStorage.getItem('lists'));
};

const removeItemsInstance = listId => {
  localStorage.removeItem(`itemsForList${listId}`);
};

const saveItems = (listId, items) => {
  localStorage.setItem(`itemsForList${listId}`, JSON.stringify(items));
};

const getItems = listId => {
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

const removeListPositionInstance = listId => {
  if (localStorage.hasOwnProperty(`positionForList${listId}`))
    localStorage.removeItem(`positionForList${listId}`);
};

const saveListViewState = (listId, viewState) => {
  localStorage.setItem(`viewStateForList${listId}`, viewState);
};

const getListViewState = listId => {
  for (let key in localStorage)
    if (key === `viewStateForList${listId}`) return localStorage[key];

  return false;
};

const removeListViewStateInstance = listId => {
  if (localStorage.hasOwnProperty(`viewStateForList${listId}`))
    localStorage.removeItem(`viewStateForList${listId}`);
};

const setWelcomeScreen = () => {
  sessionStorage.setItem('welcomeScreen', 'true');
};

const getWelcomeScreen = () => {
  return sessionStorage.getItem('welcomeScreen');
};

export default {
  saveLists,
  getLists,
  removeItemsInstance,
  saveItems,
  getItems,
  saveListPosition,
  getListPosition,
  removeListPositionInstance,
  saveListViewState,
  getListViewState,
  removeListViewStateInstance,
  setWelcomeScreen,
  getWelcomeScreen
};
