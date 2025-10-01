// Minimal local server to emulate GitHub Pages subpath
// Serves the exported `out/` directory under `/RALAN_web`
const express = require('express');
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const BASE_PATH = process.env.BASE_PATH || '/RALAN_web';
const OUT_DIR = path.join(__dirname, '..', 'out');

const app = express();

app.get('/', (_req, res) => {
  res.redirect(BASE_PATH + '/');
});

app.use(BASE_PATH, express.static(OUT_DIR, { extensions: ['html'] }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Serving ${OUT_DIR} at http://localhost:${PORT}${BASE_PATH}/`);
});


