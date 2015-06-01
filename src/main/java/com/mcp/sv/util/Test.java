package com.mcp.sv.util;

import com.mcp.sv.cmbc.HttpClientWrapper;
import com.mongodb.*;
import com.mongodb.util.JSON;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

/**
 * Created by Administrator on 2015/5/20.
 */
public class Test {

    public static void main(String[] args) throws JSONException {

//        JSONObject jsonObject=new JSONObject();
//        jsonObject.put("gameCode","T51");
//        jsonObject.put("pType","05");
//        jsonObject.put("passType","1");
//        //jsonObject.put("matchCode","201505203009");
//        HttpClientWrapper httpClientWrapper=new HttpClientWrapper();
//        String str=httpClientWrapper.mcpPost("CQ22", jsonObject.toString());
//        //201505203009
//        System.out.println(str);

        DB db = MongoManager.getDB(MongoConst.MONGO_NAME);
        DBCollection users = db.getCollection("users");

        DBObject user =users.find(new BasicDBObject().append("userName", "shi0200")).toArray().get(0);
        String str=JSON.serialize(user);
        BasicDBObject query= (BasicDBObject) JSON.parse(str);
        query.append("money", 333);
        int m= (int) user.get("money");
        System.out.println(m);
//        if(cur.count()==1){
//            while (cur.hasNext()) {
//                DBObject user =cur.next();
//                String userName= (String)user.get("userName");
//                String passWord= (String)user.get("passWord");
//                System.out.println(userName);
//                System.out.println(passWord);
//            }
//        }

    }

}
