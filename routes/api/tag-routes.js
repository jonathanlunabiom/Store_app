const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const TagsTo = await Tag.findAll({
      include: [{model:ProductTag},{model:Product}],
  });
    res.status(200).json(TagsTo)
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const TagsTo = await Tag.findByPk(req.params.id,{
      include: [{model:ProductTag},{model:Product}],
  });
    res.status(200).json(TagsTo)
  }catch(err){
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // try{

  // }catch(){
    
  // }
  // create a new tag
});

router.put('/:id', (req, res) => {
  // try{

  // }catch(){
    
  // }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // try{

  // }catch(){
    
  // }
  // delete on tag by its `id` value
});

module.exports = router;
