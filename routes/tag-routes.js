const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/tags', (req, res) => {

  Tag.findAll({

    include: {
      model: Product,
      attributes: [ 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(tagsData => {
      if (!tagsData) {
        res.status(404).json({ message: "No tags found" })
        return
      }
      res.json(tagsData)
    })
  .catch (err => console.log(err))
})

router.get('/tags/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id },

    include: {
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: "No tag with this id found" })
        return
      }
      res.json(tagData)
    })
    .catch(err => console.log(err))

})

router.post('/tags', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData => res.json(tagData))
    .catch(err => console.log(err))
})

router.put('/tags/:id', (req, res) => {
  Tag.update({
    where: { id: req.params.id },
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: "No tag with this id found to update" })
        return
      }
      res.json(tagData)
    })
    .catch(err => console.log(err))

})

router.delete('/tags/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id },
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: "No tag with this id found to delete" })
        return
      }
      res.json(tagData)
    })
    .catch(err => console.log(err))
})

module.exports = router
