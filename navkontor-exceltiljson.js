const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const sourceFile = "navkontor.xlsx";
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

const kontorInfoJson = sheetToJson(
  sourceFile,
  sheetNames[1],
  {
    A: "postnr",
    B: "poststed",
    H: "kommune",
    I: "kontornavn",
    J: "enhetsnr"
  }
);

const stedsnavnJsonToFile = (jsonObj) => {
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

  Object.values(jsonObj).forEach((element) => {
    if (element.poststed) {
      addValue(element.poststed, element.enhetsnr);
    }
    if (element.kommune) {
      addValue(element.kommune, element.enhetsnr);
    }
    if (element.kontornavn) {
      addValue(element.kontornavn.replace("NAV ", "").toUpperCase(), element.enhetsnr);
    }
  });

  jsonToFile(stedsnavnObj, stedsnavnTilEnhetsnrFile);
};

stedsnavnJsonToFile(kontorInfoJson);

jsonToFile(Object.values(kontorInfoJson).reduce((acc, curr) => ({
  ...acc, [parseInt(curr.enhetsnr, 10)]: curr.kontornavn}), {}), enhetsnrTilKontorFile);

jsonToFile(Object.values(kontorInfoJson).reduce((acc, curr) => ({
  ...acc, [parseInt(curr.postnr, 10)]: curr.enhetsnr}), {}), postnrTilEnhetsnrFile);
