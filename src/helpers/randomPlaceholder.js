const randomPlaceholder = todoLists => {
  const placeholders = [
    'check browsers compatibility',
    'take dog for a walk',
    'clean room before mom comes',
    'buy milk and bananas',
    'book an appointment with dentist'
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
