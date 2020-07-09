const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const inquirer = require('inquirer');

// const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
// inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

const fileChoices = fs.readdirSync('.').filter(file => path.extname(file) === '.xlsx');

inquirer.prompt([
    {
      type: 'list',
      name: 'file',
      message: 'Please select which file you would like to split: ',
      choices: fileChoices,
      prefix: '--'
    },
    {
      type: 'number',
      name: 'rowCount',
      message: 'How many maximum rows per file?',
      suffix: '(default 100)',
      prefix: '--'
    },
    {
      type: 'input',
      name: 'directoryName',
      message: 'What should we name the new directory?',
      suffix: ' (optional)',
      prefix: '--'
    }
  ])
  .then(answers => {
    const ws = xlsx.readFile(answers.file).Sheets['Sheet1'];

    // convert the sheet to json for splitting
    const json = xlsx.utils.sheet_to_json(ws);

    // split json into chunks according to user inputted length
    const chunks = [];
    while(json.length > 0) {
      chunks.push(json.splice(0, answers.rowCount || 100));
    }

    // extract headers
    const headersList = Object.keys(chunks[0][0]);

    // convert json to csv strings
    const allRecordsAsCSV = chunks.map(chunk => {
      let string = `${headersList.join(',')}\n`;
      for (let row of chunk) {
        string += Object.keys(row).map(key => row[key]).join(',');
        string += '\n';
      }
      return string;
    });

    // write each chunk to a csv file
    const baseName = path.parse(answers.file).name;
    fs.mkdirSync(`./${answers.directoryName || baseName}`);
    allRecordsAsCSV.forEach((chunk, i) => {
      const fileName = `./${answers.directoryName || baseName}/${baseName}.${i}.csv`;
      fs.writeFile(fileName, chunk, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

  });