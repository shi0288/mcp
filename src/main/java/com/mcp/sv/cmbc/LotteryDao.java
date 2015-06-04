package com.mcp.sv.cmbc;

import com.mcp.sv.util.MongoConst;
import com.mcp.sv.util.MongoUtil;
import com.mongodb.*;
import com.mongodb.util.JSON;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by Administrator on 2015/5/26.
 */
public class LotteryDao {

    private static final Logger logger = LoggerFactory.getLogger(LotteryDao.class);

    //注册用户
    public static String register(String userName, String passWord, String rePassWord) {
        //查询库中是否有此记录
        Map param = new HashMap();
        param.put("userName", userName);
        List datas = MongoUtil.query(MongoConst.MONGO_USERS, param);
        logger.info("新用户注册：" + userName);
        if (datas.size() > 0) {
            return "用户名已存在";
        }
        if (!passWord.equals(rePassWord)) {
            return "两次密码输入不一致";
        }
        param.put("passWord", MD5.MD5Encode(passWord));
        int res = MongoUtil.save(MongoConst.MONGO_USERS, param);

        if (res != 0) {
            return "注册失败";
        }
        return "";
    }

    public static String login(String userName, String passWord) {
        //查询库中是否有此记录
        Map param = new HashMap();
        param.put("userName", userName);
        List datas = MongoUtil.query(MongoConst.MONGO_USERS, param);
        logger.info("用户登陆：" + userName + "  " + datas.size());
        if (datas.size() == 1) {
            DBObject user = (DBObject) datas.get(0);
            String dbPassWord = (String) user.get("passWord");
            if (MD5.MD5Encode(passWord).equals(dbPassWord)) {
                //登录成功
                return "";
            } else {
                return "密码输入错误";
            }
        }
        return "登陆异常";
    }


    public static String getUser(String userName, String passWord) throws JSONException {
        //查询库中是否有此记录
        JSONObject res = new JSONObject();
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("passWord", MD5.MD5Encode(passWord));
        List datas = MongoUtil.query(MongoConst.MONGO_USERS, param);
        if (datas.size() == 1) {
            res.put("repCode", CmbcConstant.SUCCESS);
            DBObject user = (DBObject) datas.get(0);
            res.put("user", new JSONObject(JSON.serialize(user)));
            //获取账户信息
            param.remove("passWord");
            datas = MongoUtil.query(MongoConst.MONGO_ACOUNT, param);
            if(datas.size() == 1){
                DBObject acount = (DBObject) datas.get(0);
                res.put("acount", new JSONObject(JSON.serialize(acount)));
            }
            return res.toString();
        }
        res.put("repCode", CmbcConstant.ERROR);
        return res.toString();
    }


    public static String getOrder(String userName, String passWord, int curPage, int pageSize, String outerId) throws JSONException {
        //查询库中是否有此记录
        JSONObject res = new JSONObject();
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("passWord", MD5.MD5Encode(passWord));
        List datas = MongoUtil.query(MongoConst.MONGO_USERS, param);
        if (datas.size() == 1) {
            param.remove("passWord");
            if (outerId != null) {
                param.put("outerId", outerId);
            }
            datas = MongoUtil.queryForPage(MongoConst.MONGO_TORDER, param, curPage, pageSize);
            JSONArray results = new JSONArray();
            for (int i = 0; i < datas.size(); i++) {
                results.put(datas.get(i));
            }
            res.put("rst", results);
            res.put("repCode", CmbcConstant.SUCCESS);
            return res.toString();
        }
        res.put("repCode", CmbcConstant.ERROR);
        return res.toString();
    }

    public static String getLogs(String userName, String passWord, int curPage, int pageSize, int accountType) throws JSONException {
        //查询库中是否有此记录
        JSONObject res = new JSONObject();
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("passWord", MD5.MD5Encode(passWord));
        List datas = MongoUtil.query(MongoConst.MONGO_USERS, param);
        if (datas.size() == 1) {
            param.remove("passWord");
            //if (null != accountType) {
                param.put("type", accountType);
           // }
            datas = MongoUtil.queryForPage(MongoConst.MONGO_RECHARGE_LOG, param, curPage, pageSize);
            JSONArray results = new JSONArray();
            for (int i = 0; i < datas.size(); i++) {
                results.put(datas.get(i));
            }
            res.put("rst", results);
            res.put("repCode", CmbcConstant.SUCCESS);
            return res.toString();
        }
        res.put("repCode", CmbcConstant.ERROR);
        return res.toString();
    }




    public static String recharge(String userName, int money) {
        //查询库中是否有此记录
        Map param = new HashMap();
        param.put("userName", userName);
        List datas = MongoUtil.query(MongoConst.MONGO_ACOUNT, param);
        logger.info("用户彩币更新：" + userName + "  " + datas.size() + "金额：" + money);
        if (datas.size() == 1) {
            DBObject acount = (DBObject) datas.get(0);
            int recharge = (int) acount.get("recharge");
            money += recharge;
            String acountStr = JSON.serialize(acount);
            DBObject newAcount = (DBObject) JSON.parse(acountStr);
            newAcount.put("recharge", money);
            int res = MongoUtil.update(MongoConst.MONGO_ACOUNT, acount, newAcount);
            if (res == 1) {
                return "";
            } else {
                return "彩币更新失败";
            }
        } else if (datas.size() == 0) {
            param.put("recharge", money);
            int res = MongoUtil.save(MongoConst.MONGO_ACOUNT, param);
            if (res == 0) {
                return "";
            } else {
                return "彩币更新失败";
            }
        }
        return "彩币更新异常";
    }


    //存储记录
    public static boolean insertLog(String tableName, int type, String userName, int beforeMoney, int afterMoney, int money, String outerId) {
        //查询库中是否有此记录
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("type", type);
        param.put("beforeMoney", beforeMoney);
        param.put("afterMoney", afterMoney);
        param.put("money", money);
        param.put("orderId", outerId);
        param.put("createTime", LotteryDao.getTime());
        int res = MongoUtil.save(tableName, param);
        if (res == 0) {
            return true;
        }
        return false;
    }


    //存储订单
    public static boolean insertOrder(String userName, String outerId, int status, String body) {
        //查询库中是否有此记录
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("outerId", outerId);
        param.put("status", status);  //未支付
        param.put("body", body);
        param.put("createTime", LotteryDao.getTime());
        int res = MongoUtil.save(MongoConst.MONGO_TORDER, param);
        if (res == 0) {
            return true;
        }
        return false;
    }

    //更改订单状态
    public static String updateOrderStatus(String userName, String outerId, int status) {
        //查询库中是否有此记录
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("outerId", outerId);
        List datas = MongoUtil.query(MongoConst.MONGO_TORDER, param);
        logger.info("用户订单状态更新：" + userName + "  " + datas.size() + "  " + "状态：" + status + "  " + "outerId：" + outerId);
        if (datas.size() == 1) {
            DBObject order = (DBObject) datas.get(0);
            String orderStr = JSON.serialize(order);
            DBObject newOrder = (DBObject) JSON.parse(orderStr);
            newOrder.put("status", status);
            int res = MongoUtil.update(MongoConst.MONGO_TORDER, order, newOrder);
            if (res == 1) {
                return "";
            } else {
                return "用户订单状态更新失败";
            }
        } else if (datas.size() == 0) {
            return "找不到此订单：" + outerId;
        }
        return "用户订单状态更新异常";
    }


    //添加地址
    public static String addAddress(String userName, String passWord, String address,String phone,String name) {
        //查询库中是否有此用户
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("passWord", passWord);
        Map param1 = new HashMap();
        param1.put("userName", userName);
        List datas = MongoUtil.query(MongoConst.MONGO_USERS, param);
        logger.info("用户添加地址：" + userName);
        if (datas.size() > 0) {
            List addresss = MongoUtil.query(MongoConst.MONGO_USERS_ADDRESS, param1);
            if (addresss.size() > 0) {
                param.put("addressId", datas.size()+1);
            }else {
                param.put("addressId", 1);
            }
        }
        param.put("userName", userName);
        param.put("address", address);
        param.put("phone", phone);
        param.put("name", name);
        int res = MongoUtil.save(MongoConst.MONGO_USERS_ADDRESS, param);
        if (res != 0) {
            return "插入地址表失败";
        }
        return "";
    }

    //查询已经存在地址
    public static String queryAddress(String userName, String passWord) {
        //查询库中是否有此用户
        JSONObject res = new JSONObject();
        JSONObject req = new JSONObject();
        Map param = new HashMap();
        param.put("userName", userName);
        param.put("passWord", passWord);
        List datas = MongoUtil.query(MongoConst.MONGO_USERS, param);
        logger.info("用户添加地址：" + userName);
        if (datas.size() > 0) {
            List addresss = MongoUtil.query(MongoConst.MONGO_USERS_ADDRESS, param);
            if(addresss.size() >= 1){
                for (int i=0;i<addresss.size();i++){
                    DBObject address = (DBObject) addresss.get(i);

                }
//                res.put("acount", new JSONObject(JSON.serialize(acount)));
            }
        }else{
            param.put("addreddId", 1);
        }
        param.put("userName", userName);
//        param.put("address", address);
//        param.put("phone", phone);
//        int res = MongoUtil.save(MongoConst.MONGO_USERS_ADDRESS, param);
//        if (res != 0) {
//            return "插入地址表失败";
//        }
        return "";
    }

    public static String getTime() {
        String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT, Locale.getDefault());
        return format.format(new java.util.Date());
    }
}
