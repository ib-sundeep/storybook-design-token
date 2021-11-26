const tokenContext = require.context('..?raw', true, /.\.(css|less|scss|svg)$/);

const tokenFiles = tokenContext.keys().map(function (filename) {
  return { filename: filename, content: tokenContext(filename) };
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  designToken: {
    files: tokenFiles
  }
};
