module.exports = {
  '*.{ts,tsx}': [
    'eslint src/* --max-warnings=100000',
    'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
    () => 'tsc-files --noEmit',
  ],
  '*.{ts,tsx,json,css,js}': ['prettier --write'],
};
