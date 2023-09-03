const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categorydata = await Category.findAll({
      include: [{model: Product}],
  });
    res.status(200).json(categorydata)
  }catch(err){
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
    const categorybyID = await Category.findByPk(req.params.id,{
      include: [{model: Product}],
    });
    res.status(200).json(categorybyID)
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create({
      id: req.body.id,
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory)
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const CategoryData = await Category.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    if(!CategoryData[0]){
      res.status(404).json({message: 'No category with this id'});
      return;
    }
    res.status(200).json(Category)
  }catch(err){
    res.status(404).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const CategoryToDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!CategoryToDelete){
      res.status(404).json({message: 'No category with this id'});
      return;
    }
    res.status(200).json(`${CategoryToDelete} has been deleted`);
  }catch(err){
    res.status(500).json
  }
});

module.exports = router;
