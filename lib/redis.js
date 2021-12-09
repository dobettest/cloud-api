const Redis = require('ioredis');
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host,
    username: "developer@dobettest",
    password: "5fdc70e01bfa8edc5d62e6ee0a1833118f3fa5d21b3858ca6f87052975a14023",
    db: 0,
})
module.exports = redis;

/**
 * docker run --name redis -v redis:/data -v /development/redisrestart=always redis /etc/redis/redis.conf
 * vi命令行输入$跳到文未
 * acl setuser developer@dobettest on >5fdc70e01bfa8edc5d62e6ee0a1833118f3fa5d21b3858ca6f87052975a14023 ~* &* -@all +@write +@read
 */