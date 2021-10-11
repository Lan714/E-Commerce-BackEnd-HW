const router = require('express').Router()
const { Category, Product } = require('../models')

// The `/api/categories` endpoint

router.get('/categories', (req, res) => {
  // find all categories
  Cateogory.findAll(({

    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(categoriesData => {
    if (!categoriesData) {
      res.status(404).json({message: "No categories found"})
      return
    }
    res.json(categoriesData)
  })
  catch(err => console.log(err))
})
 

router.get('/categories/:id', (req, res) => {
  Cateogory.findOne({
    where: { id: req.params.id },
    
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: "No category with this id found" })
        return
      }
      res.json(categoryData)
    })
  catch (err => console.log(err))
 
})

router.post('/categories', (req, res) => {
  Cateogory.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  catch (err => console.log(err))
})

router.put('/categories/:id', (req, res) => {
  Cateogory.update({
    where: { id: req.params.id },
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: "No category with this id found to update" })
        return
      }
      res.json(categoryData)
    })
  catch (err => console.log(err))
 
})

router.delete('/categories/:id', (req, res) => {
  Cateogory.destroy({
    where: { id: req.params.id },
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: "No category with this id found to delete" })
        return
      }
      res.json(categoryData)
    })
  catch (err => console.log(err))
})

module.exports = router
