package com.mcp.sv.dao;

import com.mcp.sv.util.MongoConst;
import com.mcp.sv.util.MongoUtil;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import org.apache.log4j.Logger;
import org.bson.BasicBSONObject;

import java.util.HashMap;

/**
 * Created by ChubChen on 2015/6/3.
 */
public class WeiXinDao {



    private static final String TOKENID = "TOKEN";
    private static final Logger logger  = Logger.getLogger(WeiXinDao.class);

    public static  void updateToken (String token){
        DBCollection collection = MongoUtil.getDb().getCollection(MongoConst.MONGO_WEIXINCONF);
        DBObject find = new BasicDBObject(); //mongodb bean
        find.put("id",TOKENID);
        DBObject set = new BasicDBObject(); //mongodb bean
        set.put("value", token);
        collection.findAndModify(find, null, null,false, set, true, true);
    }
}
