import { join, relative, resolve } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '../../../');
const projectsDirectory = join(repoRoot, 'projects');
const projectsRelativeToRoot = relative(repoRoot, projectsDirectory);

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
        name: 'slug',
        message: 'project slug please',
      },
    ],

    actions: [
      {
        type: 'addMany',
        destination: `${projectsDirectory}/{{slug}}`,
        base: 'templates',
        templateFiles: '**/*.hbs',
        // By default, globs don't match file names that start with dot, i.e. '.eslintrc.js.hbs'.
        globOptions: { dot: true },
        data: {
          packageDirectory: projectsRelativeToRoot,
        },
      },

      // Update rush.json projects
      {
        type: 'append',
        path: join(repoRoot, 'rush.json'),
        // This regular expression matches the start of the projects list.
        // The template is appended immediately after this line.
        pattern: /"projects": \[/,
        template: `    {
      "packageName": "@{{scope}}/{{name}}",
      "projectFolder": "${projectsRelativeToRoot}/{{slug}}"
    },`
      },
    ]
  });
}
