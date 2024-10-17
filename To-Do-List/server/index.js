const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json()); 


app.get("/", (req, res) => {
  
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("An error occurred while reading the file.");
    } else {
      res.send(data); 
      console.log(data); 
    }
  });
});


app.post("/", (req, res) => {
 
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.send("An error occurred while reading the file.");
    } else {
      const products = JSON.parse(data); 
      const newProduct = { ...req.body, id: uuidv4() }; 
      products.push(newProduct); 

      
      fs.writeFile("./db.json", JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
          res.send("An error occurred while writing to the file.");
        } else {
          res.send("Item added successfully"); 
        }
      });
    }
  });
});

app.put("/:id", (req, res) => {
  const { id } = req.params; 
  const updatedProduct = req.body; 

  
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send("Internal Server Error");
    } else {
      let products = JSON.parse(data); 
      const productIndex = products.findIndex((product) => product.id == id); 

      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...updatedProduct,
        };

        fs.writeFile("./db.json", JSON.stringify(products), (err) => {
          if (err) {
            res.send("Internal Server Error");
          } else {
            res.send("Product updated successfully"); 
          }
        });
      } else {
        res.send("Product not found"); 
      }
    }
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params; 

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send("Internal Server Error");
    } else {
      let products = JSON.parse(data); 
      products = products.filter((product) => product.id != id); 

      fs.writeFile("./db.json", JSON.stringify(products), (err) => {
        if (err) {
          res.send("Internal Server Error");
        } else {
          res.send("Product deleted successfully"); 
        }
      });
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
