const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.log('Error connecting to database', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    isPublished: Boolean,
    price: Number,
    date: { type: Date, default: Date.now }
});

const Course = mongoose.model('Course', courseSchema);

async function getCoursesForExercise1() {
    const courses = await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    
    console.log(courses);
}

// getCoursesForExercise1();

async function getCoursesForExercise2() {
    const courses = await Course
        .find({ isPublished: true})
        .or([ { tags: 'backend' }, { tags: 'frontend' } ])
        .sort('-price')
        .select({ name: 1, author: 1, price: 1 });
    
    console.log(courses);
}

// getCoursesForExercise2();

async function getCoursesForExercise3() {
    const courses = await Course
        .find({ isPublished: true })
        .or([ { price: { $gte: 15 } }, { name: /.*by.*/i } ])
        .select('name price');
    
    console.log(courses);
}

getCoursesForExercise3();