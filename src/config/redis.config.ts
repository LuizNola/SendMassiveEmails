import { createClient, RedisClient } from "redis";
require('dotenv').config();

let redis: RedisClient | undefined;
let redisIsReady = false;

export function redisConnect() {
    try {
        redis = createClient({
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            port: process.env.REDIS_PORT as unknown as number
        });

        redis.on("error", (err) => {
            console.log("Redis error: " + err);
        });

        redis.on("connect", () => {
            console.log("Redis connected");
        });

        redis.on("ready", () => {
            console.log("Redis is ready");
            redisIsReady = true;
        });

        redis.on("end", () => {
            console.log("Redis disconnected");
            redisIsReady = false;
        });

        redis.on("reconnecting", () => {
            console.log("Redis is reconnecting");
        });
    } catch (e) {
        console.error(`[Redis] Connection to Redis was not possible, we'll retry in 10 seconds`, e);
        setTimeout(redisConnect, 10000);
    }
}


export function getCachedKey(key: string) {
    return new Promise<string | null>((resolve) => {
        if (!redis || !redisIsReady) {
            return resolve(null);
        }

        redis.get(key, (err, data) => {
            console.log({data, err})
            resolve(err ? null : data);
        });
    });
}

export function writeCache(key: string, data: string, ttlSeconds: number) {
    if (redis && redisIsReady) {
        redis.setex(key, ttlSeconds, data);
    }
}

export function clearCacheByKey(key: string) {
    if (redis && redisIsReady) {
        redis.del(key);
    }
}

