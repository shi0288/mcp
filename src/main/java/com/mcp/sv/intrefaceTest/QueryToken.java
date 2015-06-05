package com.mcp.sv.intrefaceTest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.mcp.core.util.StringUtil;
import com.mcp.sv.cmbc.CmbcConstant;
import com.mcp.sv.cmbc.HttpClientWrapper;

/**
 * Created by ChubChen on 2015/6/3.
 */
public class QueryToken {

    private static final String URL = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&";

    public static void main(String[] args){
    String url = URL+"appid=" + CmbcConstant.APPID +"&secret=" + CmbcConstant.APPSECRET;
    String result = HttpClientWrapper.getUrl(url);
    System.out.println(result);
    JSONObject jsonObject = JSON.parseObject(result);
    String access_token =  jsonObject.get("access_token").toString();
    String expires_in =   jsonObject.get("expires_in").toString();
    if(!StringUtil.isEmpty(access_token)){
        //   WeiXinDao.updateToken(access_token);
    }
    }
}
