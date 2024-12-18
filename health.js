const express = require('express');
const app = express();

app.get('/health', (req, res) => res.send('Bot is running!'));
app.listen(process.env.PORT || 3000, () => console.log('Keep-alive server started.'));
