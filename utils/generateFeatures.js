const axios = require('axios');

const generateFeatures = async (productName) => {
    const prompt = `Describe las características principales de un producto llamado "${productName}"`;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct'
            ,
            { inputs: prompt },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        const result = response.data[0]?.generated_text || 'Características no disponibles';
        return result;
    } catch (error) {
        console.error('[IA Error]', error.message);
        return 'Características generadas automáticamente no disponibles';
    }
};

module.exports = generateFeatures;
