const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ลองทำ Route พื้นฐานสำหรับเช็กสถานะระบบ
app.get('/', (req, res) => {
    res.json({
        message: "Staff Car API is running!",
        developer: "Wuttinan Sangkhawithian",
        student_id: "68319010042"
    });
});

// สั่งให้ Server ทำงานที่ Port ที่กำหนด
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});