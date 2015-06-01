package com.mcp.sv.cmbc;


import com.mcp.sv.util.*;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.ws.rs.*;

/**
 * REST Web Service
 *
 * @author Administrator
 */

@Path("LotteryService")
public class LotteryService {

    private static final Logger logger = LoggerFactory.getLogger(LotteryService.class);

    private static RedisCilent redisCilent = new RedisCilent();

    public LotteryService() {
    }

    @POST
    @Produces({"application/json"})
    @Path("commonTrans")
    public String commonTrans( @FormParam("body") String body, @FormParam("payType") String payType,@FormParam("amount") int amount, @FormParam("outerId") String outerId,@FormParam("userName") String userName, @FormParam("passWord") String passWord) {
        String resMessage = "";
        //判断用户权限
        int recharge=0;
        JSONObject res=new JSONObject();
        try {
            JSONObject userInfo = new JSONObject(LotteryDao.getUser(userName, passWord));
            JSONObject acount =userInfo.getJSONObject("acount");
            recharge=acount.getInt("recharge");
            logger.info("发起投注 "+userName+"账户余额:"+recharge);
        } catch (JSONException e) {
            try {
                res.put("repCode","9999");
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return res.toString();
        }
        //放入订单库
        boolean orderInsertRes=LotteryDao.insertOrder(userName,outerId,CmbcConstant.ORDER_1000,body);
        if(!orderInsertRes){
            try {
                res.put("repCode","9999");
                return  res.toString();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        //判断余额
        if(recharge-amount<0){
            try {
                res.put("repCode","1007");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return res.toString();
        }
        //投注
        if (body != null) {
            try {
                resMessage = HttpClientWrapper.mcpPost(CmbcConstant.MCP_CT03,body);
                logger.info("收到的：  " + resMessage);
                JSONObject transRes=new JSONObject(resMessage);
                String repCode= (String) transRes.get("repCode");
                if("0000".equals(repCode)){
                    //插入消费记录
                    boolean is=LotteryDao.insertLog(MongoConst.MONGO_RECHARGE_LOG, CmbcConstant.TRANSTYPE, userName, recharge, recharge - amount, amount, outerId);
                    //更新订单状态送达
                    if(!"".equals(LotteryDao.updateOrderStatus(userName,outerId,CmbcConstant.ORDER_2000))){
                        //订单更新送达状态未成功处理
                    }
                    if(is){
                        //扣除账户金钱
                        String result=LotteryDao.recharge(userName,-amount);
                        if("".equals(result)){
                            if(!"".equals(LotteryDao.updateOrderStatus(userName,outerId,CmbcConstant.ORDER_3000))){
                                //订单更新已支付状态未成功处理
                            }
                            return resMessage;
                        }else{
                            //未扣除账户彩币处理
                        }
                    }else {
                        //未插入消费记录处理
                    }
                }else{
                    //投注出错处理
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return resMessage;//不是投注的请求。其它的请求。
    }

    /**
     * 获取期次信息
     *
     */
    @POST
    @Produces({"application/json"})
    @Path("getTerms")
    public String getTerms(@FormParam("body") String body) {
        String resMessage = "";
        //取期次
        System.out.println(body);
        if (body != null) {
            try {
                resMessage = HttpClientWrapper.mcpPost(CmbcConstant.MCP_CQ01, body);
                System.out.println("收到的：  " + resMessage);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return resMessage;
    }

    /**
     * 用户注册
     *
     */
    @POST
    @Produces({"application/json"})
    @Path("register")
    public String register(@FormParam("userName") String username, @FormParam("passWord") String passWord, @FormParam("rePassWord") String rePassWord) {
        String description=LotteryDao.register(username, passWord, rePassWord);
        return toResult(description);
    }

    /**
     * 用户登陆
     *
     */
    @POST
    @Produces({"application/json"})
    @Path("login")
    public String login(@FormParam("userName") String username, @FormParam("passWord") String passWord) {
        String description = LotteryDao.login(username, passWord);
        return toResult(description);
    }

    /**
     * 用户充值
     *
     */
    @POST
    @Produces({"application/json"})
    @Path("recharge")
    public String recharge(@FormParam("userName") String username, @FormParam("money") String money) {
        int recharge=Integer.parseInt(money);
        String description = LotteryDao.recharge(username, recharge);
        return toResult(description);
    }

    /**
     * 用户信息
     *
     */
    @POST
    @Produces({"application/json"})
    @Path("getUser")
    public String getUser(@FormParam("userName") String username,@FormParam("passWord") String passWord) {
        String description = null;
        try {
            description = LotteryDao.getUser(username, passWord);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return description;
    }

    /**
     * 订单信息
     *
     */
    @POST
    @Produces({"application/json"})
    @Path("getOrder")
    public String getOrder(@FormParam("userName") String username,@FormParam("passWord") String passWord,@FormParam("outerId") String outerId,@FormParam("curPage") int curPage,@FormParam("pageSize") int pageSize) {
        String description = null;
        try {
            description = LotteryDao.getOrder(username, passWord, curPage, pageSize, outerId);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return description;
    }


    /**
     * 日志信息
     *
     */
    @POST
    @Produces({"application/json"})
    @Path("getLogs")
    public String getLogs(@FormParam("userName") String userName,@FormParam("passWord") String passWord,@FormParam("accountType") int accountType,@FormParam("curPage") int curPage,@FormParam("pageSize") int pageSize) {
        String description = null;
        try {
            description = LotteryDao.getLogs(userName, passWord,curPage,pageSize,accountType);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return description;
    }

    public String toResult(String description){
        JSONObject resMessage=new JSONObject();
        try {
            resMessage.put("description",description);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return resMessage.toString();
    }




    public static void main(String[] args) throws JSONException {

        System.out.println(MD5.MD5Encode("13834656673" + CmbcConstant.CMBC_SIGN_KEY));


    }
}
