require('dotenv').config();

const { createApp } = require('./app');

const PORT = Number.parseInt(process.env.PORT, 10) || 4000;
const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend API is running on port ${PORT}`);
});
