const { log } = require("console");
const fs = require("fs");
const path = require("path");

const deleteFile = (files) => {
  console.log("deleteFile11111111111111111111111", files);
  files.forEach((file) => {
    const filePath = "uploads/" + file;
    console.log("Deleting file:", filePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("images file deleted");
      }
    });
  });
};
module.exports = deleteFile;
