const Redis = require('ioredis');
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host,
    username: "rediswr",
    password: "c10225d778825e8ca4b3f678bd16cf5f34843e9fd0eaa16f219e17cf5c7f5f16",
    db: 0,
})
module.exports = redis;