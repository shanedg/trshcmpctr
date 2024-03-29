import { join } from 'node:path';

const relativePathToRepoRoot = '../../';

/**
 * Plopfile
 * See https://plopjs.com/documentation/
 * @param plop plop API object
 */
export default function (plop) {
  plop.setGenerator('project', {
    description: 'scaffold a new js project',

    // inquirer prompts
    // https://www.npmjs.com/package/inquirer
    prompts: [
      {
        type: 'input',
        name: 'scope',
        message: 'project scope please (omit @-prefix, <enter> for "trshcmpctr")',
        default: 'trshcmpctr'
      },
      {
        type: 'input',
        name: 'name',
        message: 'project name please',
      },
      {
        type: 'input',
        name: 'path',
        message: 'project path please',
      },
    ],

    actions: [
      {
        type: 'addMany',
        destination: `${relativePathToRepoRoot}{{path}}/`,
        base: 'templates',
        templateFiles: '**/*.hbs',
        // By default, globs don't match file names that start with dot, i.e. '.eslintrc.js.hbs'.
        globOptions: { dot: true },
      },

      // Update rush.json projects
      {
        type: 'append',
        path: join(relativePathToRepoRoot, 'rush.json'),
        // This regular expression matches the start of the projects list.
        // The template is appended immediately after this line.
        pattern: /"projects": \[/,
        template: `    {
      "packageName": "@{{scope}}/{{name}}",
      "projectFolder": "{{path}}"
    },`
      },

      // Update vscode eslint plugin working directories
      {
        type: 'append',
        path: join(relativePathToRepoRoot, '.vscode', 'settings.json'),
        pattern: /"eslint.workingDirectories": \[/,
        template: '    "{{path}}",',
      },
    ]
  });
}
