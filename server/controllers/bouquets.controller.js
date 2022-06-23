const { Bouquet } = require('../db/models');

const getAllBouquets = async (req, res) => {
  const card = await Bouquet.findAll({ where: { inStock: true } });
  res.json(card);
};

const addBouquet = async (req, res) => {
  console.log(34537, req.files);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(401).json('No file uploaded!');
  }
  const sampleFile = req.files.img;
  const uploadPath = `/img/${sampleFile.name}`;
  sampleFile.mv(`public/img/${sampleFile.name}`, (err) => {
    if (err) {
      return res.status(401).json(err.message);
    }
  });
  try {
    const {
      title, description, price, category_id,
    } = req.body;
    const bouquet = await Bouquet.create({
      title,
      description,
      price,
      img: uploadPath,
      category_id,
    });
    return res.json(bouquet);
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

const updateBouquet = async (req, res) => {
  const { id } = req.params;
  const {
    title, description, price, category_id,
  } = req.body;
  let bouquet;
  try {
    bouquet = await Bouquet.findOne({
      where: { id },
    });
  } catch (error) {
    return res.status(401).json(error.message);
  }
  if (!bouquet) {
    return res.status(401).json('No this item in DataBase');
  }
  if (bouquet.title !== title) bouquet.title = title;
  if (bouquet.description !== description) bouquet.description = description;
  if (bouquet.price !== price) bouquet.price = price;
  if (bouquet.category_id !== category_id) bouquet.category_id = category_id;
  if (req.files !== null) {
    const sampleFile = req.files.img;
    const uploadPath = `/img/${sampleFile.name}`;
    sampleFile.mv(`public/img/${sampleFile.name}`, (err) => {
      if (err) {
        return res.status(401).json(err.message);
      }
    });
    bouquet.img = uploadPath;
  }
  try {
    await bouquet.save();
    return res.json(bouquet);
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

const deleteBouquet = async (req, res) => {
  try {
    const { id } = req.params;
    const [count] = await Bouquet.update(
      { inStock: false },
      { where: { id } },
    );
    return res.json(count);
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

module.exports = {
  getAllBouquets,
  addBouquet,
  updateBouquet,
  deleteBouquet,
};
