const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {type: String, required: true},
  productDescription: {type: String},
  productCategory: {type: String},
  productPrice: {type: Number, required: true},
  productNumber: {type: Number},
  productImagePath: {type: String}
});


const Product = mongoose.model('Products', productSchema);

exports.findById = async (id) =>{
  let result = await Product.findById(id);
  result = result.toJSON();
  delete result._id;
  delete result.__v;
  return result;
};

exports.createProduct = (productData) => {
  const product = new Product(productData);
  return product.save();
};

exports.listAll = async () => {
  return await Product.find({});
};

exports.listByCategory = async (category) => {
  return await Product.find({productCategory: category});
};

exports.patchProduct = (id, productData) => {
  return Product.findOneAndUpdate({
    _id: id
  }, productData);
};


exports.removeById =  (productId) => {
  Product.findByIdAndDelete(productId, (err, docs) => {
    if(err) {
      console.log('Error happened during deleting product with id: ' + productId);
    }
    else {
      console.log('Product with ' + productId + ' has been deleted');
    }
  });
};
