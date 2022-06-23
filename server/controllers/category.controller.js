const { Category, Bouquet } = require('../db/models');

const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

const getOneCategory = async (req, res) => {
  const { id } = req.params;
  const bouquetCategory = await Bouquet.findAll({
    where: { category_id: id },
  });
  res.json(bouquetCategory);
};
module.exports = { getCategories, getOneCategory };
