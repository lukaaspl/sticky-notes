const randomActionMessage = todoLists => {
  const actionMessages = [
    'Plan something crazy!',
    'Just do it!',
    'Always deliver!',
    "Don't hang around!",
    "Don't regret anything!"
  ];

  const randomIndex = Math.floor(Math.random() * actionMessages.length);
  const drawnActionMessage = actionMessages[randomIndex];

  if (todoLists.length < actionMessages.length) {
    const isActionMessageAlreadySet = todoLists.find(
      todoList => todoList.actionMessage === drawnActionMessage
    );

    if (isActionMessageAlreadySet) return randomActionMessage(todoLists);
  }

  return drawnActionMessage;
};

export default randomActionMessage;
