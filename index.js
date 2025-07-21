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
// 設定基本路由
app.get('/', (req, res) => {
	res.send('Hello, Zeabur!');
});

// POST → Proxy → doGet(GAS)
app.post('/api', async (req, res) => {
	try {
		await fetch(GAS_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(req.body),
		});
		console.log(`✅ 已轉發給 GAS`);
	} catch (err) {
		res.status(500).send('連接 GAS 失敗');
		console.error(`❌ 連接 GAS 失敗`, err.message);
	}
});
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
