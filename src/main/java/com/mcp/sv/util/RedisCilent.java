package com.mcp.sv.util;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.JedisShardInfo;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;

/**
 * Created by bjjg11 on 2014/12/22.
 */
public class RedisCilent {


    public RedisCilent() {
        initialShardedPool();
        shardedJedis = shardedJedisPool.getResource();
    }

    private ShardedJedis shardedJedis;//切片额客户端连接
    private ShardedJedisPool shardedJedisPool;//切片连接池

    /**
     * 初始化切片池
     */
    private void initialShardedPool() {
        // 池基本配置
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxActive(20);
        config.setMaxIdle(5);
        config.setMaxWait(1000l);
        config.setTestOnBorrow(false);

        // slave链接  192.168.222.233          127.0.0.1
        List<JedisShardInfo> shards = new ArrayList<JedisShardInfo>();
        shards.add(new JedisShardInfo(JedisConst.IP, JedisConst.port, "master"));
        // 构造池
        shardedJedisPool = new ShardedJedisPool(config, shards);
    }
    public void show() {
        shardedJedisPool.returnResource(shardedJedis);
    }
    public void put(String key, String value,int cacheSeconds) {
        boolean flag = true;
        ShardedJedis shardedJedis = shardedJedisPool.getResource();
        try {
            if (shardedJedis != null) {
                shardedJedis.set(key, value);
                if (cacheSeconds != 0) {
                    shardedJedis.expire(key, cacheSeconds);
                }
            }
        } catch (Exception e) {
            flag = false;
            e.printStackTrace();
        } finally {
            if (flag) {
                shardedJedisPool.returnResource(shardedJedis);
            } else {
                shardedJedisPool.returnBrokenResource(shardedJedis);
            }
        }
    }

    public String get(String key) {
        boolean flag = true;
        ShardedJedis shardedJedis = shardedJedisPool.getResource();
        try {
            if (shardedJedis != null) {
                return shardedJedis.get(key);
            }
        } catch (Exception e) {
            flag = false;
            e.printStackTrace();
        } finally {
            if (flag) {
                shardedJedisPool.returnResource(shardedJedis);
            } else {
                shardedJedisPool.returnBrokenResource(shardedJedis);
            }
        }
        return null;
    }

    public static void main(String[] args) {
        RedisCilent redisCilent=new RedisCilent();
        redisCilent.put("kye00144","213123",5);
    }
}

