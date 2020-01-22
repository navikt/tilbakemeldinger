const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const sourceFile = "postnummer-navkontor.xlsx";
const enhetsnrTilKontorFile = "./src/pages/finn-nav-kontor/enhetsnr-til-enhetsnavn.json";
const postnrTilEnhetsnrFile = "./src/pages/finn-nav-kontor/postnr-til-enhetsnr.json";

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

jsonToFile(Object.values(enhetsnrTilKontor).reduce((acc, curr) => ({
  ...acc, [parseInt(curr.enhetsnr, 10)]: curr.enhetsnavn}), {}), enhetsnrTilKontorFile);

jsonToFile(Object.values(postnrTilEnhetsnr).reduce((acc, curr) => ({
  ...acc, [parseInt(curr.postnr, 10)]: curr.enhetsnr}), {}), postnrTilEnhetsnrFile);
