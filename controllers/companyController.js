const prisma = require('../prisma');

const createCompany = async (req, res) => {
  const { nit, name, address, phone } = req.body;

  if (!nit || !name || !address || !phone) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const existing = await prisma.company.findUnique({ where: { nit } });

    if (existing) {
      return res.status(409).json({ message: 'Ya existe una empresa con ese NIT' });
    }

    const newCompany = await prisma.company.create({
      data: { nit, name, address, phone },
    });

    res.status(201).json(newCompany);
  } catch (err) {
    console.error('[Error Prisma]', err);
    res.status(500).json({ message: 'Error al crear la empresa' });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: { products: true }
    });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener empresas' });
  }
};

const deleteCompany = async (req, res) => {
  const { nit } = req.params;

  try {
    await prisma.company.delete({ where: { nit } });
    res.json({ message: 'Empresa eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar empresa' });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  deleteCompany,
};
