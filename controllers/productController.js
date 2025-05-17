const prisma = require('../prisma');
const generateFeatures = require('../utils/generateFeatures');


const createProduct = async (req, res) => {
  let { code, name, features, prices, companyNIT } = req.body;

  if (!code || !name || !prices || !companyNIT) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    const existing = await prisma.product.findUnique({ where: { code } });
    if (existing) return res.status(409).json({ message: 'Código duplicado' });

    // Generar características si no fueron enviadas
    if (!features || features.trim() === '') {
      features = await generateFeatures(name);
    }

    const product = await prisma.product.create({
      data: {
        code,
        name,
        features,
        prices,
        companyNIT
      }
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('[Error Prisma]', err);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { company: true }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

const getProductsGroupedByCompany = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    const grouped = {};
    products.forEach(p => {
      if (!grouped[p.companyNIT]) grouped[p.companyNIT] = [];
      grouped[p.companyNIT].push(p);
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: 'Error al agrupar productos' });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsGroupedByCompany,
};
