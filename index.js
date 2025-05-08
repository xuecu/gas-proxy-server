import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GAS_URL = process.env.GAS_URL;

// POST → Proxy → doGet(GAS)
app.post('/api', async (req, res) => {
	try {
		const params = new URLSearchParams(req.body).toString();
		const url = `${GAS_URL}?${params}`;
		const response = await fetch(url);
		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, message: '連接 GAS 失敗' });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
