const path = require('path');

module.exports = {
  description: 'Component Story Generator',
  prompts: [
    {
      type: 'fuzzypath',
      message: 'Component name for story',
      name: 'path',
      rootPath: './components',
      itemType: 'file',
      excludeFilter: (nodePath) => {
        return nodePath.includes('stories.tsx');
      }
    },
  ],
  actions: [
    {
      type: 'add',
      path: '{{getFolder path}}/{{getDirName path}}.stories.tsx',
      templateFile: 'generators/stories/component/Component.stories.tsx.hbs',
      skipIfExists: true,
    },
  ],
}
