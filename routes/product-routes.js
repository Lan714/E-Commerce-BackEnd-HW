const router = require('express').Router()
const { Product, Category, Tag, ProductTag } = require('../../models')


router.get('/products', (req, res) => {
  Product.findAll({
    attributes: [ 'id', 'product_name', 'price', 'stock'],
    
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
 .then(productsData => {
   if (!productsData) {
     res.status(400).json({message: 'No products found' })
     return
   }
   res.json(productsData)
 })
 .catch(err => console.log(err))
})


router.get('/products/:id', (req, res) => {
  Product.findOne({
    where: { req.params.id },
    attributes: ['id', 'product_name', 'price', 'stock'],
    include: [
      {
        model: Category, 
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
  .then(productData => {
    if (!productData) {
      res.sendStatus(404).json({ message: 'No product found with this id'})
      return
    }
    res.json(productData)
  })
  .catch(err => console.log(err))
})


router.post('/products', (req, res) => {

  Product.create({
    product_name: req.body.product_name,
    product_price: req.body.product_price,
    product_stock: req.body.product_stock,
    category_id: req.body.category_id,
    tagsId: req.body.tagIds
  })
    .then((product) => {
   
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id
          }
        })
        return ProductTag.bulkCreate(productTagIdArr)
      }
    
      res.status(200).json(product)
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
})

router.put('/products/:id', (req, res) => {
 
  Product.update(req.body, {
    where: { id: req.params.id}
  })
    .then((product) => {
    
      return ProductTag.findAll({ where: { product_id: req.params.id } })
    })
    .then((productTags) => {

      const productTagIds = productTags.map(({ tag_id }) => tag_id)
     
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id
          }
        })
    
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id)

 
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags)
      ])
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
 
      res.status(400).json(err)
    })
})

router.delete('/products/:id', (req, res) => {

  Product.destroy({

    where: { id: req.params.id }

  })
  
  .then(!productData => {
    if( !productData ) {
      res.status(404).json({ message: 'No product with this id found to delete'})
      return
    }
    res.json(productData)
  })
  .catch(err => console.log(err))

})

module.exports = router
