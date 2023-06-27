module.exports = {
  description: 'Component  Generator',
  prompts: [
    {
      type: 'input',
      message: 'Component name',
      name: 'name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'components/{{dashCase name}}/index.tsx',
      templateFile: 'generators/component/Component.tsx.hbs',
      skipIfExists: true,
    },
  ],
}
