const colors = {
  primary: {
    purple: '#7000FF',
    bnna: '#FFE920',
  },
  accents: {
    100: '#F2E5FF',
    200: '#E0D5EC',
    300: '#FF9E0D',
    400: '#FFF3F3',
    500: '#FFFBEF',
    600: '#EEFFFA',
  },
  gray: {
    100: '#D8D8D8',
    200: '#F2F2F2',
    300: '#FAFAFA',
  },
  notification: {
    alert: '#FF5B5B',
    warn: '#FFC120',
    notify: '#24DFA5',
    info: '#FFA003',
  },
  solid: {
    black: '#070707',
    gray0: '#656565',
    gray1: '#8c8c8c',
    gray2: '#d8d8d8',
    gray3: '#f2f2f2',
    gray4: '#fafafa',
    gray5: '#e5e5e5',
    white: '#FFFFFF',
    lightPurple: '#EAD9FF',
  },
  // black: '#070707',
  // darkGray: '#656565',
  // white: '#FFFFFF',
  // lightGray: '#8C8C8C',
  // lightPurple: '#EAD9FF',
  // },
  gradient: {
    primary: 'linear-gradient(180deg, #FFFFFF 0%, #F9F5FE 100%)',
    button: 'linear-gradient(101.94deg, #F8F7EE -23.23%, #F8F3FF 85.22%)',
  },
};

export const colorNames = () => {
  const results: string[] = [];
  Object.keys(colors).forEach((category) => {
    results.push(
      ...Object.keys(colors[category as keyof typeof colors]).map(
        (key) => `${category}.${key}`,
      ),
    );
  });
  return [...results] as const;
};

export default colors;
