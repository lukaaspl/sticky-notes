const randomPlaceholder = todoLists => {
  const placeholders = [
    'check browsers compatibility',
    'optimize photos for website',
    'create cool todo application',
    'implement some new features',
    'commit introduced changes'
  ];

  const randomIndex = Math.floor(Math.random() * placeholders.length);
  const drawnPlaceholder = placeholders[randomIndex];

  if (todoLists.length < placeholders.length) {
    const isPlaceholderAlreadySet = todoLists.find(
      todoList => todoList.placeholder === drawnPlaceholder
    );

    if (isPlaceholderAlreadySet) return randomPlaceholder(todoLists);
  }

  return drawnPlaceholder;
};

export default randomPlaceholder;
