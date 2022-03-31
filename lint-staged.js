module.exports = {
  '*.{ts,tsx}': [
    'eslint src/* --max-warnings=7',
    'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests',
    () => 'tsc-files --noEmit',
  ],
  '*.{ts,tsx,json,css,js}': ['prettier --write'],
};
