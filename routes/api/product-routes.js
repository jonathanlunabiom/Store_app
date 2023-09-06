const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try{
    const product = await Product.findAll({
      include:[{model:Category},{model:Tag, through:ProductTag}]
    });
    res.status(200).json(product);
  }catch(err){
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try{
    const productbyID = await Product.findByPk(req.params.id,{
      include:[{model:Category},{model:Tag, through:ProductTag}]
    })
    res.status(200).json(productbyID)
  }catch(err){
    res.status(500).json(err)
  }
});

// create new product
router.post('/', async (req, res) => {
  try{
    let flag = false;
    const product = await Product.create(req.body);

    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
      let flag = true;
    }

    if (flag) {
      res.status(200).json(productTagIdArr);
    } else {
      res.status(200).json(product);
    }
  }catch(err){
    res.status(400).json(err.message)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
  
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
  
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
  
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
  
    return res.json(product);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteProduct = await Product.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!deleteProduct){
      res.status(404).json({message: 'No prodduct with this id'});
      return;
    }
    res.status(200).json(`Product deleted`)
  }catch(err){
    res.status(500).json(err.message)
  }
});

module.exports = router;
