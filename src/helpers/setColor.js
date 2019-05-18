const setColor = colorName => {
  let listBackground,
    listBackgroundHover,
    evenItemBackground,
    evenItemBackgroundHover,
    navIconsHover,
    gradientIcon;

  switch (colorName) {
    case 'Sky Blue':
      listBackground = '#add8e6';
      listBackgroundHover = '#a5d3e2';
      evenItemBackground = '#9acfe0';
      evenItemBackgroundHover = '#90c9db';
      navIconsHover = '#add8e6';
      gradientIcon = 'linear-gradient(45deg, #89c3d6, #4c99b2)';
      break;

    case 'Desert Hell':
      listBackground = '#e8c48d';
      listBackgroundHover = '#e2bd83';
      evenItemBackground = '#e8ba8d';
      evenItemBackgroundHover = '#e5b587';
      navIconsHover = '#e8c48d';
      gradientIcon = 'linear-gradient(45deg, #e2bb7c, #ce9d5f)';
      break;

    case 'Lilac Purple':
      listBackground = '#e7b7e8';
      listBackgroundHover = '#e3aee5';
      evenItemBackground = '#d6aae0';
      evenItemBackgroundHover = '#d3a4dd';
      navIconsHover = '#e7b7e8';
      gradientIcon = 'linear-gradient(45deg, #d9ace2, #b87fc4)';
      break;

    default:
      listBackground = '#add8e6';
      listBackgroundHover = '#a5d3e2';
      evenItemBackground = '#9acfe0';
      evenItemBackgroundHover = '#90c9db';
      navIconsHover = '#add8e6';
      gradientIcon = '#add8e6';
  }

  return {
    listBackground,
    listBackgroundHover,
    evenItemBackground,
    evenItemBackgroundHover,
    navIconsHover,
    gradientIcon
  };
};

export default setColor;
