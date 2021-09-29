const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/tags', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
})

router.get('/tags/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
})

router.post('/tags', (req, res) => {
  // create a new tag
})

router.put('/tags/:id', (req, res) => {
  // update a tag's name by its `id` value
})

router.delete('/tags/:id', (req, res) => {
  // delete on tag by its `id` value
})

module.exports = router
