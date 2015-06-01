package com.mcp.sv.util;

import com.mongodb.DB;
import com.mongodb.Mongo;
import com.mongodb.MongoException;
import com.mongodb.MongoOptions;

import java.net.UnknownHostException;

/**
 * Created by bjjg11 on 2014/11/7.
 */
public class MongoManager {

    private static Mongo mongo = null;

    private MongoManager() {

    }

    /**
     * 根据名称获取DB，相当于是连接
     *
     * @param dbName
     * @return
     */
    public static DB getDB(String dbName) {
        if (mongo == null) {
            // 初始化
            init();
        }
        return mongo.getDB(dbName);
    }

    /**
     * 初始化连接池，设置参数。
     */
    private static void init() {
        String host = MongoConst.MONGO_HOST;// 主机名
        int port = MongoConst.MONGO_PORT;// 端口
        int poolSize = MongoConst.MONGO_POOLSIZE;// 连接数量
        int blockSize = MongoConst.MONGO_BLOCKSIZE; // 等待队列长度
        // 其他参数根据实际情况进行添加
        try {
            mongo = new Mongo(host, port);
            MongoOptions opt = mongo.getMongoOptions();
            opt.connectionsPerHost = poolSize;
            opt.threadsAllowedToBlockForConnectionMultiplier = blockSize;
        } catch (UnknownHostException e) {
            // log error
        } catch (MongoException e) {
            // log error
        }
    }


}
