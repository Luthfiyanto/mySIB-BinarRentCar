/**
 * File ini digunakan untuk mengambil data mobil dari challenge sebelumnya
 * kemudian diringkas menjadi beberapa properti yang lebih sedikit agar memudahkan
 * untuk testing server
 */

const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "cars.json");
const outputFilePath = path.join(__dirname, "carsData.json");

fs.readFile(inputFilePath, (err, data) => {
  if (err) {
    console.log("Error reading input file", err);
    return;
  }

  const carsData = JSON.parse(data);

  const filteredCarsData = carsData.map((car, index) => {
    return {
      id: car.id,
      name: car.manufacture + " " + car.model,
      type: car.capacity > 4 ? "large" : car.capacity > 2 ? "medium" : "small",
      image: car.image,
      capacity: car.capacity,
      rentPerDay: car.rentPerDay,
      description: car.description,
      availableAt: car.availableAt,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  fs.writeFile(outputFilePath, JSON.stringify(filteredCarsData, null, 2), (err) => {
    if (err) {
      console.log("Error writing output file", err);
      return;
    }
    console.log("Filtered data saved to carsData.json");
  });
});
