const bcrypt = require('bcrypt');

const users = [
    {
        id: 1,
        email: 'admin@empresa.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin'
    },
    {
        id: 2,
        email: 'externo@empresa.com',
        password: bcrypt.hashSync('externo123', 10),
        role: 'external'
    }
];

module.exports = users;
