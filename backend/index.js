const express = require('express');
const cors = require('cors');
const db = require('./db'); // นำเข้าส่วนเชื่อมต่อ DB
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. เช็กสถานะระบบระบบ (จาก Week 1)
app.get('/', (req, res) => {
    res.json({
        message: "Staff Car API is running!",
        developer: "Wuttinan Sangkhawithian",
        student_id: "68319010042"
    });
});

// 2. GET API: ดึงข้อมูลรถทั้งหมดในระบบ
app.get('/api/cars', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM cars ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. POST API: บันทึกข้อมูลรถบุคลากรใหม่ (มีฟิลด์ขั้นต่ำตามที่โจทย์ระบุ)
app.post('/api/cars', async (req, res) => {
    const { plate_no, type, brand_model, color, owner, department, status } = req.body;
    
    // Validation เบื้องต้น ตรวจสอบว่าส่งข้อมูลมาครบไหม
    if (!plate_no || !type || !brand_model || !color || !owner || !department || !status) {
        return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบทุกฟิลด์ตามเงื่อนไข" });
    }

    try {
        const sql = `INSERT INTO cars (plate_no, type, brand_model, color, owner, department, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const [result] = await db.query(sql, [plate_no, type, brand_model, color, owner, department, status]);
        
        res.status(201).json({ 
            message: "บันทึกข้อมูลรถเรียบร้อยแล้ว!", 
            carId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});