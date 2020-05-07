//Take url as a command-line argument and a local file path
//download resource to the specified path
//Will need to use get http commands
const request = require('request');
const fs = require('fs');
const getCommandLine = () => {
  return process.argv;
};

const fileUrl = getCommandLine()[2];
const downloadTo = getCommandLine()[3];

//helper function to get file size
const getFileSize = file => {
  let size = fs.statSync(file).size;
  return size;
};

//helper function to write a file
const writeFile = (fileToMake, fileContents) => {
  fs.writeFile(fileToMake, fileContents, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ${getFileSize(fileToMake)} bytes to ${fileToMake}`);
  });
};

//gets file and writes it
const getFile = url => {
  request(url, (error, response, body) => {
    if (error) throw error;
    writeFile(downloadTo, body);
  });
};
getFile(fileUrl);

//Need to test if file path is invalid