const generateFeatures = require('../utils/generateFeatures');

const getFeaturesByProductName = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'El nombre del producto es obligatorio' });
  }

  try {
    const features = await generateFeatures(name);
    res.json({ features });
  } catch (err) {
    res.status(500).json({ message: 'Error al generar características' });
  }
};

module.exports = { getFeaturesByProductName };
