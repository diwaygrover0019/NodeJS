
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'],
        required: true,
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 2000);
            },
            message: 'A course should have atleast one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Diway',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });
    
    try {
        // await course.validate();
        const result = await course.save();
        console.log(result);
    } catch(ex) {
        for(field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

// createCourse();

async function getCourses() {
    // Comparision Operators
    // eq  (equal)
    // ne  (not equal)
    // gt  (greater than)
    // gte (greater than or equal to)
    // lt  (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // Logical Operators
    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        // comparision operators example
        // .find({ price: { $gt: 10, $lt: 20 } })
        // .find({ price: { $in: [10, 15, 20] } })

        // logical operators example
        // .find()
        // .or([ { author: 'Diway' }, { isPublished: true } ])

        // regex examples
        // Starts with Diway
        // .find({ author: /^Diway/ })
        // Ends with Sanu (case-insensitive)
        // .find({ author: /Sanu$/i })
        // Contains Diway
        // .find({ author: /.*Diway.*/ })

        .find({ _id: '5e006615ee603054d0071c08' })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1 });
        // .countDocuments();
    console.log(courses[0].price);
}

// getCourses();

async function updateCourse(id) {
    // Approach: Query first
    // 1) findById()
    // 2) Modify its properties
    // 3) save()

    // const course = await Course.findById(id);
    // if(!course) return;
    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });

    // const result = await course.save();
    // console.log(result);

    // Approach: Update first
    // 1) Update directly
    // 2) Optionally: get the updated document

    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jill',
            isPublished: false
        }
    }, { new: true });
    console.log(course);
}

// updateCourse('5dfaf8abad103c4ef4210d32');

async function removeCourse(id) {
    // const result = await Course.deleteOne({ _id: id });
    const result = await Course.findByIdAndDelete(id);
    console.log(result);
}

// removeCourse('5dfaf8abad103c4ef4210d32');