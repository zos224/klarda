const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const multipart = require('connect-multiparty');
const MultiparttyMiddleware = multipart({uploadDir: './images'});
const fs = require('fs');
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors());
app.use('/uploads', express.static('images'));
app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

app.post('/uploads', MultiparttyMiddleware, (req, res) => {
    const filePath = req.files.upload.path;

    // Tạo URL để truy cập hình ảnh
    const fileUrl = `http://localhost:4444/uploads/${filePath.split('\\').pop()}`;

    // Định dạng phản hồi theo cách CKEditor mong đợi
    res.status(201).json({
        uploaded: 1, // Flag success
        fileName: req.files.upload.originalFilename, // Tên file gốc
        url: fileUrl // URL để truy cập file
    });
});

app.delete('/uploads', (req, res) => {

    const filePath = `./images/${req.body.fileName}`;

    // Xóa file
    fs.unlink(filePath, (error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).send();
        }
    });
});

app.listen(4444, console.log('Server is running on port 4444'));