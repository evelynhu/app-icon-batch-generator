const gm = require('gm');
const fs = require('fs');

const inputFolder = './input';
const outputFolder = './output';
const size = {
  SMALL: { title: '', width: 72, height: 72},
  MEDIUM: { title: '@2x', width: 144, height: 144},
  LARGE: { title: '@3x', width: 216, height: 216},
}

const resize = (fileName, size) => {
  const {title, width, height} = size;
  console.log('resize ', fileName, ' to ', width, 'x', height);
  gm(`${inputFolder}/${fileName}.png`)
    .resize(width, height)
    .write(`${outputFolder}/${fileName}${title}.png`, (err) => {
      if (err) {
        console.log(err);
      }
    })
}

fs.readdir(inputFolder, (err, files) => {
  files.forEach(file => {
    const fileName = file.split('.')[0];

    resize(fileName, size.SMALL);
    resize(fileName, size.MEDIUM);
    resize(fileName, size.LARGE);
  });
})
