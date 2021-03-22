const Joi = require('joi');
const express = require('express');
var cors = require('cors');
var database = require('./config/database');
var taskController = require('./task/taskController');

const app = express();


// applying middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('Hello World!!! Hi GoCrackit. Vidya testing');
});

// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });

// Get all task resource
app.get('/api/courses',taskController.getCourses);

app.get('/api/courses/:id', taskController.getCourseById);

// app.get('/api/courses/:id', (req, res) => {
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course) res.status(404).send('The course with the given id was not found.');
//     res.send(course);
// });

app.post('/api/uploadfile', (req, res) => {
    uploadFile(req, res);
});

function uploadFile(req, res){
    const fs = require('fs');
    const AWS = require('aws-sdk');

    const s3 = new AWS.S3({
        accessKeyId: "accesskey",
        secretAccessKey: "secretkey"
    });

    const fileName = 'contacts.csv';

    fs.readFile(fileName, (err, data) => {
        if(err) throw err;
        const params = {
            Bucket: 'nodeappstorage',
            Key: 'contacts.csv',
            Body: JSON.stringify(data, null, 2)
        };
        s3.upload(params, function(s3Err, data) {
            if(s3Err) throw s3Err;
            console.log(`File uploaded successfully at ${data.Location}`);
            res.send(`File uploaded successfully at ${data.Location}`);
        });
    });

}

app.get('/api/getfile', (req, res) => {
    getFile(req, res);
});

function getFile(req, res){
    var filename = "contacts.csv"
    console.log('Trying to download file', filename);
    
    var AWS = require('aws-sdk');
    AWS.config.update(
      {
        accessKeyId: "accesskey",
        secretAccessKey: "secretkey",
        region: 'ap-south-1'
      }
    );
    var s3 = new AWS.S3();
    var options = {
        Bucket    : 'nodeappstorage',
        Key    : filename,
    };

    res.attachment(filename);
    var fileStream = s3.getObject(options).createReadStream();
    fileStream.pipe(res);

}


app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body); // result.error
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };  
    courses.push(course);
    res.send(course);
});

app.put('api/courses/:id', (req, res) => {
    res.send("hello");
});

// app.put('api/courses/:id', (req, res) => {
//     console.log("hello ");
//     const course = courses.find(c => c.id === parseInt(req.params.id));
//     if(!course) res.status(404).send('The course with the given id was not found.');

//     const { error } = validateCourse(req.body); // result.error
//     if(error){
//         res.status(400).send(error.details[0].message);
//         return;
//     }

//     course.name = req.body.name;
//     res.send(course);
// });

const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`Listening on port: ${port}...`);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}
