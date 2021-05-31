const ProductModel = require('../schemas/products/product.model');

exports.insert = async (req, res) => {
  let result = await ProductModel.createProduct(req.body);
  console.log('Insterting new product');
  res.status(201).send({id: result._id});
};

exports.listAll = async (req, res) => {
  let result = await ProductModel.listAll();
  console.log('All product');
  res.status(200).send(result);
};

exports.listAllByCategory = async (req, res) => {
  const category = req.params.category;
  let result = await ProductModel.listByCategory(category);
  console.log('Products listed by category');
  res.status(200).send(result);
};

exports.getById = async (req, res) => {
  const id = req.params.productId;
  let result =  await ProductModel.findById(id);
  console.log('Product get by id');
  res.status(200).send(result);
};

exports.patchById = async (req, res) => {
  const id = req.params.productId;
  let result = await ProductModel.patchProduct(id, req.body);
  console.log('Product has been updated!');
  res.status(204).send(result);
}

exports.removeById = (req, res) => {
  const id = req.params.productId;
  let result = ProductModel.removeById(id);
  console.log('Product has been removed!');
  res.status(204).send(result);
}
