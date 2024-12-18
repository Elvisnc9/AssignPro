const express = require('express');
const sequelize = require('./database')
const staffRoutes = require('./routes/staffRoute')

const app = express();
app.use(express.json());


app.use('/api/staff', staffRoutes)


const PORT = 50500;
sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});


