const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')

Product.belongsTo(Category, { foreignKey: 'category_id' })

Category.hasMany(Product, {foreignKey: 'category_id' })

Product.belongsToMany(Tag, { through: Product, foreignKey: 'product_id' })

Tag.belongsToMany(Product, { through: Product, foreignKey: 'tag_id'})

module.exports = {
  Product,
  Catergory,
  Tag,
  ProductTag
}