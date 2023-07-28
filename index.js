const inquirer = require('inquirer');
const fs = require('fs');
//What is your github username
//Email
//Project's name
//Short desc
//Licence
//What command should be run to run tests
//what does the user need to know about using the repo
//what does the user need to know about contributing to the repo
const questions = [
    {
      type: 'input',
      name: 'projectTitle',
      message: 'Enter the title of your project:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Explain the installation process:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions and examples for use:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'ISC', 'Unlicense', 'None'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Explain how others can contribute to your project:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide examples on how to run tests for your project:',
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
  ];

  function generateREADME(answers) {
    const licenseBadge = `![License](https://img.shields.io/badge/License-${encodeURIComponent(
      answers.license
    )}-blue.svg)`;
  
    const readmeContent = `
  # ${answers.projectTitle}
  
  ## Description
  ${answers.description}
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  ${answers.installation}
  
  ## Usage
  ${answers.usage}
  
  ## License
  ${licenseBadge}
  ${answers.license !== 'None' ? `This project is licensed under the ${answers.license} license.` : 'No license specified.'}
  
  ## Contributing
  ${answers.contributing}
  
  ## Tests
  ${answers.tests}
  
  ## Questions
  GitHub: [${answers.githubUsername}](https://github.com/${answers.githubUsername})
  Email: ${answers.email}
  `;
  
    return readmeContent;
  }
  
  inquirer
  .prompt(questions)
  .then((answers) => {
    const readmeContent = generateREADME(answers);
    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) {
        console.error('Error occurred while writing the README file:', err);
      } else {
        console.log('README.md file has been successfully generated!');
      }
    });
  })
  .catch((error) => {
    console.error('Error occurred while prompting questions:', error);
  });
