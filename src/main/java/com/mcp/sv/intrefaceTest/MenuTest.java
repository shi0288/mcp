package com.mcp.sv.intrefaceTest;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.mcp.sv.cmbc.CmbcConstant;
import com.mcp.sv.cmbc.HttpClientWrapper;

/**
 * Created by ChubChen on 2015/6/3.
 *  {
 "button":[
 {
 "type":"click",
 "name":"今日歌曲",
 "key":"V1001_TODAY_MUSIC"
 },
 {
 "name":"菜单",
 "sub_button":[
 {
 "type":"view",
 "name":"搜索",
 "url":"http://www.soso.com/"
 },
 {
 "type":"view",
 "name":"视频",
 "url":"http://v.qq.com/"
 },
 {
 "type":"click",
 "name":"赞一下我们",
 "key":"V1001_GOOD"
 }]
 }]
 }
 */
public class MenuTest {

    private static final String URL = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=";

    public static void main(String[] args) throws Exception{
        String token = "lHX-LynetrM6mK-jBgGUb7M_Eqchd9p4cVm6R95a8AoszdPctvc_g4KuG3TGV96S4xWoZNiJ-aA6AEip-3drJt8L7oo2sBwNpg1I_bcJdNM";

        String url = URL+token;

        JSONArray button = new JSONArray();

            JSONObject buttonObj = new JSONObject();
            buttonObj.put("name", "买彩票" );
            JSONObject subObj = new JSONObject();
            subObj.put("type", "view");
            subObj.put("name", "大乐透" );
            subObj.put("url", "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + CmbcConstant.APPID+ "&redirect_uri=www.baidu.com&response_type=code&scope=snsapi_base&state=123456#wechat_redirect");
            JSONObject subObj2 = new JSONObject();
            subObj2.put("type", "view");
            subObj2.put("name", "排列3" );
            subObj2.put("url", "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + CmbcConstant.APPID+ "&redirect_uri=www.baidu.com&response_type=code&scope=snsapi_base&state=123456#wechat_redirect");
            JSONArray subArray = new JSONArray();
            subArray.add(subObj);
            subArray.add(subObj2);
            buttonObj.put("sub_button", subArray);
            button.add(buttonObj);

        JSONObject buttonObj1 = new JSONObject();
        buttonObj1.put("name", "开奖信息" );
        JSONObject subObj3 = new JSONObject();
        subObj3.put("type", "view");
        subObj3.put("name", "大乐透");
        subObj3.put("url", "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + CmbcConstant.APPID+ "&redirect_uri=www.baidu.com&response_type=code&scope=snsapi_base&state=123456#wechat_redirect");
        JSONArray subArray1 = new JSONArray();
        subArray1.add(subObj3);
        buttonObj1.put("sub_button", subArray1);
        button.add(buttonObj1);

        JSONObject buttonObj2 = new JSONObject();
        buttonObj2.put("name", "信息" );
        JSONObject subObj4 = new JSONObject();
        subObj4.put("type", "view");
        subObj4.put("name", "大乐透");
        subObj4.put("url", "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + CmbcConstant.APPID+ "&redirect_uri=www.baidu.com&response_type=code&scope=snsapi_base&state=123456#wechat_redirect");
        JSONArray subArray2 = new JSONArray();
        subArray2.add(subObj4);
        buttonObj2.put("sub_button", subArray2);
        button.add(buttonObj2);

        JSONObject object = new JSONObject();
        object.put("button", button);
        String jsonString = object.toJSONString();
        System.out.println(jsonString);
       String result = HttpClientWrapper.postJson(url, jsonString);
        System.out.println(result);


    }
}
