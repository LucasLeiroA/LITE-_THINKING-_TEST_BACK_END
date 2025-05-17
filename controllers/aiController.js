const suggestPrices = (req, res) => {
  const { name, features } = req.body;

  if (!name || !features) {
    return res.status(400).json({ message: 'Faltan datos del producto' });
  }

  // "IA local" — simulamos razonamiento con lógica básica
  const palabrasClave = (name + ' ' + features).toLowerCase().split(' ');

  let basePrice = 50;
  if (palabrasClave.includes('premium')) basePrice += 80;
  if (palabrasClave.includes('ecológico')) basePrice += 30;
  if (palabrasClave.includes('importado')) basePrice += 60;
  if (palabrasClave.includes('básico')) basePrice -= 20;
  if (palabrasClave.includes('industrial')) basePrice += 40;

  const prices = {
    usd: basePrice.toFixed(2),
    ars: (basePrice * 900).toFixed(2),
    eur: (basePrice * 0.95).toFixed(2)
  };

  res.json({ prices });
};

module.exports = { suggestPrices };
