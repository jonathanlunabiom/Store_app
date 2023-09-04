const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const TagsTo = await Tag.findAll({
      include: [{model:Product}],
  });
    res.status(200).json(TagsTo)
  }catch(err){
    res.status(500).json(err.message)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const TagsTo = await Tag.findByPk(req.params.id,{
      include: [{model:Product}],
  });
    res.status(200).json(TagsTo)
  }catch(err){
    res.status(500).json(err.message)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try{
    const newTag = await Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag)
  }catch(err){
    res.status(400).json(err.message)
  }
});

router.put('/:id', async(req, res) => {
  try{
    const tagData = await Tag.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    if(!tagData[0]){
      res.status(404).json({message: 'No tag with this id'});
      return;
    }
    res.status(200).json(tagData)
  }catch(err){
    res.status(404).json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const tagtoDelete = await Tag.destroy({
      where:{
        id: req.params.id
      }
    })
    if(!tagtoDelete){
      res.status(404).json({message: 'No tag with this id'});
      return;
    }
    res.status(200).json(`Tag deleted`)
  }catch(err){
    res.status(500).json(err.message)
  }
});

module.exports = router;
