const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const sourceFile = "navkontor-postnummer.xlsx";
const enhetsnrTilKontorFile = "./src/pages/finn-nav-kontor/enhetsnr-til-enhetsnavn.json";
const postnrTilEnhetsnrFile = "./src/pages/finn-nav-kontor/postnr-til-enhetsnr.json";
const stedsnavnTilEnhetsnrFile = "./src/pages/finn-nav-kontor/stedsnavn-til-enhetsnr.json";

const sheetToJson = (fileName, sheetName, columnKeys) => (
  excelToJson({
    sourceFile: fileName,
    header: {
      rows: 1
    },
    sheets: [
      {
        name: sheetName,
        columnToKey: columnKeys
      }
    ]
  })[sheetName]
);

const jsonToFile = (jsonObj, destFile) => (
  fs.writeFile(destFile, JSON.stringify(jsonObj),e => e && console.log("Error: " + e))
);

const sheetNames = Object.keys(excelToJson({sourceFile: sourceFile, columnToKey: {}}));

const enhetsnrTilKontor = sheetToJson(
  sourceFile,
  sheetNames[0],
  {
    A: "enhetsnr",
    B: "enhetsnavn",
  }
);

const postnrTilEnhetsnr = sheetToJson(
  sourceFile,
  sheetNames[1],
  {
    A: "postnr",
    J: "enhetsnr"
  }
);

const stedsnavnTilEnhetsnr = sheetToJson(
  sourceFile,
  sheetNames[1],
  {
    B: "poststed",
    H: "kommune",
    J: "enhetsnr"
  }
);

const stedsnavnJsonToFile = (stedsnavnJson) => {
  const stedsnavnObj = {};
  const addValue = (key, value) => {
    if (!key || !value) {
      return;
    }
    if (!stedsnavnObj[key]) {
      stedsnavnObj[key] = []
    }
    if (!stedsnavnObj[key].includes(value)) {
      stedsnavnObj[key].push(value);
    }
  };

  Object.values(stedsnavnJson).forEach((element) => {
    addValue(element.poststed, element.enhetsnr);
    addValue(element.kommune, element.enhetsnr);
  });

  jsonToFile(stedsnavnObj, stedsnavnTilEnhetsnrFile);
};

stedsnavnJsonToFile(stedsnavnTilEnhetsnr);

jsonToFile(Object.values(enhetsnrTilKontor).reduce((acc, curr) => ({
  ...acc, [parseInt(curr.enhetsnr, 10)]: curr.enhetsnavn}), {}), enhetsnrTilKontorFile);

jsonToFile(Object.values(postnrTilEnhetsnr).reduce((acc, curr) => ({
  ...acc, [parseInt(curr.postnr, 10)]: curr.enhetsnr}), {}), postnrTilEnhetsnrFile);