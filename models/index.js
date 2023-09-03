// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Category.hasMany(Product,{
  foreignKey: 'category_id',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});


Product.belongsToMany(Tag,{
  through: {
    model: ProductTag
  },
  as: 'tag_id',
});

Tag.belongsToMany(Product,{
  through: {
    model: ProductTag
  },
  as: 'product_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
