var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017", {
    dbName: 'miscro',
    user: "developer",
    pass: "developer@dobettest"
})