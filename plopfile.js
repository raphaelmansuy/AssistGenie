const inquirerFuzzyPath = require('inquirer-fuzzy-path')
const storyComponentGenerator = require('./generators/stories/component/story')
const storyPageGenerator = require('./generators/stories/page/story')
const componentGenerator = require('./generators/component')
const apiGenerator = require('./generators/api')
//const iconComponentGenerator = require('./src/generators/iconComponent')

function directoryCase(title) {
  return title.replace(/(^|\/|-)(\S)/g, (s) => s.toUpperCase())
}

function getFolder(path) {
  const split = path.split('/')
  // remove filename
  split.pop()
  if (split[0] === 'src') split.splice(0, 1)
  return split.join('/')
}

function getName(path) {
  const split = path.split('/')
  return split[split.length - 1].replace(/\.tsx$/, '')
}

function getDirName(path) {
  const split = path.split('/')
  return split[split.length - 2]
}

module.exports = function (plop) {
  plop.setGenerator('storiesComponent', storyComponentGenerator)
  plop.setGenerator('storiesPage', storyPageGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('api', apiGenerator)
  //  plop.setGenerator('iconComponent', iconComponentGenerator)

  //#region  //*=========== Handlebars Helper ===========
  /**
   * Generate story component route
   * @see https://stackoverflow.com/questions/41490076/capitalize-every-letter-after-and-characters
   */
  plop.setHelper('directoryCase', directoryCase)

  /**
   * Remove 'src', and file name from path
   */
  plop.setHelper('getFolder', getFolder)

  /**
   * Get file name from path, removing .tsx prefix
   */
  plop.setHelper('getName', getName)

  /**
   * Get directory name from path
   * */
  plop.setHelper('getDirName', getDirName)

  /*  Eq helper
   *  {{#eq value compareValue}}
   *    // do something
   * {{else}}
   *  // do something else
   * {{/eq}}
   *
   **/
  plop.setHelper('eq', function (value, compareValue) {
    return value === compareValue
  })

  /* Get component name from path
   * {{getComponentName path}}
   *
   * */
  plop.setHelper('getComponentName', (path) => {
    const name = getName(path)
    return name === 'index' ? getDirName(path) : name
  })

  /*  Neq helper
   *  {{#neq value compareValue}}
   *    // do something
   * {{else}}
   *   // do something else
   * {{/neq}}
   * */

  //#endregion  //*======== Handlebars Helper ===========

  //#region  //*=========== Inquirer Prompt ===========
  plop.setPrompt('fuzzypath', inquirerFuzzyPath)
  //#endregion  //*======== Inquirer Prompt ===========
}
