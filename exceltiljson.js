const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const source = "postnummer-til-navkontor.xlsx";
const destination = "./src/pages/finn-nav-kontor/navkontor-oversikt.json";

const jsonObject = excelToJson({
  sourceFile: source,
  header: {
    rows: 1
  },
  sheets: [
    {
      name: "NAV kontor 2020",
      columnToKey: {
        A: "enhetsnr",
        B: "enhetsnavn",
        C: "fylke"
      }
    },
    {
      name: "Postnummer og NAV-ktr 1.1.2020",
      columnToKey: {
        A: "postnr",
        B: "poststed",
        F: "kategori",
        G: "kommunenr",
        H: "kommunenavn",
        J: "enhetsnr"
      }
    },

  ]
});
const jsonString = JSON.stringify(jsonObject);

fs.writeFile(destination, jsonString,
  e => e ? console.log("Error: " + e)
    : console.log("Konvertering av " + source + " til " + destination + " var vellykket."));
