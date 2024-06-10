const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imgSchema = new Schema({
  image: {
    type: String,
    default: "https://res.cloudinary.com/dbqs0bidc/image/upload/v1713542797/samples/food/pot-mussels.jpg",
    set: (v) =>
    v ===""
    ? "https://res.cloudinary.com/dbqs0bidc/image/upload/v1713542797/samples/food/pot-mussels.jpg"
    : v,
  },
  sourceCode: {
    type: String,
    defauilt: "https://cloudsaaa.github.io/Maze/",
    set: (v) =>
    v ===""
    ? "https://cloudsaaa.github.io/Maze/"
    :v,
  },
  name:{
    type: String,
  }
});

const Images = mongoose.model("Images", imgSchema);
module.exports = Images;