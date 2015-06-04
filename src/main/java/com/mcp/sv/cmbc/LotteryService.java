package com.mcp.sv.cmbc;


import com.mcp.sv.dao.JcDao;
import com.mcp.sv.model.OldBean;
import com.mcp.sv.util.*;
import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.ws.rs.*;

/**
 * REST Web Service
 *
 * @author Administrator
 */

@Controller
@RequestMapping(value = "bankServices/LotteryService")
public class LotteryService {

    private static Logger logger = Logger.getLogger(LotteryService.class);
    private static RedisCilent redisCilent = new RedisCilent();

    public LotteryService() {
    }

   @RequestMapping(value = "commonTrans", method = RequestMethod.POST)
   @ResponseBody
    public String commonTrans(OldBean oldBean) {
        String userName = oldBean.getUserName();
        String passWord = oldBean.getPassWord();
        String outerId = oldBean.getUserName();
        String body = oldBean.getBody();
        int amount = oldBean.getAmount();

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
    @RequestMapping(value = "getTerms", method = RequestMethod.POST)
    @ResponseBody
    public String getTerms(OldBean oldBean) {
        String body = oldBean.getBody();
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
     * 获取竞彩期次信息
     *
     */
    @RequestMapping(value = "getJcInfo", method = RequestMethod.POST)
    @ResponseBody
    public String getJcInfo(OldBean oldBean) {
        String resMessage = "";
        String body = "";
        String head = oldBean.getHead();
        //取期次
        logger.error(head);
        System.out.println(head);
        if(head != null){
            try {
                resMessage = JcDao.getFormat(head, body);
                System.out.println("收到的竞彩信息：  " + resMessage);
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
    @RequestMapping(value = "register", method = RequestMethod.POST)
    @ResponseBody
    public String register(OldBean oldBean) {
        String username = oldBean.getUserName();
        String passWord = oldBean.getPassWord();
        String rePassWord = oldBean.getRePassWord();
        String description=LotteryDao.register(username, passWord, rePassWord);
        return toResult(description);
    }

    /**
     * 用户登陆
     *
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public String login(OldBean oldBean) {
        String username = oldBean.getUserName();
        String passWord = oldBean.getPassWord();
        String description = LotteryDao.login(username, passWord);
        return toResult(description);
    }

    /**
     * 用户充值
     *
     */
    @RequestMapping(value = "recharge", method = RequestMethod.POST)
    @ResponseBody
    public String recharge(OldBean oldBean) {
        int money = oldBean.getMoney();
        String username = oldBean.getUserName();
        String description = LotteryDao.recharge(username, money);
        return toResult(description);
    }

    /**
     * 用户信息
     *
     */
    @RequestMapping(value = "getUser", method = RequestMethod.POST)
    @ResponseBody
    public String getUser(OldBean oldBean) {
        String username = oldBean.getUserName();
        String passWord = oldBean.getPassWord();

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
    @RequestMapping(value = "getOrder", method = RequestMethod.POST)
    @ResponseBody
    public String getOrder(OldBean oldBean) {
        String username = oldBean.getUserName();
        int  curPage = oldBean.getCurPage();
        String passWord = oldBean.getPassWord();
        int pageSize = oldBean.getPageSize();
        String outerId = oldBean.getOuterId();

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
    @RequestMapping(value = "getLogs", method = RequestMethod.POST)
    @ResponseBody
    public String getLogs(OldBean oldBean) {
        String userName = oldBean.getUserName();
        String passWord = oldBean.getPassWord();
        int curPage = oldBean.getCurPage();
        int pageSize = oldBean.getPageSize();
        int accountType = oldBean.getAccountType();

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
