package com.mcp.sv.cmbc;

import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.config.ConnectionConfig;
import org.apache.http.config.MessageConstraints;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.CodingErrorAction;
import java.text.SimpleDateFormat;
import java.util.*;

public class HttpClientWrapper {
    private static final Logger logger = LoggerFactory.getLogger(LotteryService.class);

    private static String mcp8Url = CmbcConstant.MCP_INTERFACE_URL;

    private static CloseableHttpClient httpClient;

    protected synchronized static CloseableHttpClient getHttpClient() {
        if (httpClient == null) {
            PoolingHttpClientConnectionManager conManager = new PoolingHttpClientConnectionManager();
            MessageConstraints messageConstraints = MessageConstraints.custom().setMaxHeaderCount(200).setMaxLineLength(2000).build();
            //ConnectionConfig
            ConnectionConfig connectionConfig = ConnectionConfig.custom()
                    .setMalformedInputAction(CodingErrorAction.IGNORE)
                    .setUnmappableInputAction(CodingErrorAction.IGNORE).setCharset(Consts.UTF_8)
                    .setMessageConstraints(messageConstraints).build();

            conManager.setDefaultConnectionConfig(connectionConfig);
            RequestConfig defaultRequestConfig = RequestConfig.custom()
                    .setSocketTimeout(90000)
                    .setConnectTimeout(90000)
                    .setCookieSpec(CookieSpecs.IGNORE_COOKIES)
                    .setConnectionRequestTimeout(90000)
                    .setStaleConnectionCheckEnabled(true)
                    .build();
            httpClient = HttpClients.custom().setConnectionManager(conManager).setDefaultRequestConfig(defaultRequestConfig).build();
        }
        return httpClient;
    }

    public static String postMany(String url, Map<String, String> keys) {
        HttpPost request = new HttpPost(url);
        List<NameValuePair> reqParams = new ArrayList<NameValuePair>();
        for (String key : keys.keySet()) {
            reqParams.add(new BasicNameValuePair(key, keys.get(key)));
        }
        request.setEntity(new UrlEncodedFormEntity(reqParams, Consts.UTF_8));
        HttpContext context = HttpClientContext.create();
        String res = "";
        try {
            CloseableHttpResponse response = getHttpClient().execute(request, context);
            res = EntityUtils.toString(response.getEntity());
            res = new String(res.getBytes("ISO-8859-1"), "utf-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }

    public static String getUrl(String url , Map<String, String> keys){
        HttpGet request = new HttpGet(url);
        //添加timeout属性
        RequestConfig.Builder rcBuilder = RequestConfig.copy(RequestConfig.DEFAULT);
        rcBuilder.setConnectTimeout(90000);
        rcBuilder.setSocketTimeout(90000);
        request.setConfig(rcBuilder.build());
        String res = "";
        try {
            CloseableHttpResponse response = getHttpClient().execute(request);
            res = EntityUtils.toString(response.getEntity());
            res = new String(res.getBytes("ISO-8859-1"), "utf-8");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }


    public static String cmbcPost(String url, String key, String param) {
        HttpPost request = new HttpPost(url);
        List<NameValuePair> reqParams = new ArrayList<NameValuePair>();
        reqParams.add(new BasicNameValuePair(key, param));
        request.setEntity(new UrlEncodedFormEntity(reqParams, Consts.UTF_8));
        HttpContext context = HttpClientContext.create();
        String res = "";
        try {
            CloseableHttpResponse response = getHttpClient().execute(request, context);
            res = EntityUtils.toString(response.getEntity());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }

    public static String post(HttpServletRequest userRequest, HttpServletResponse httpResponse, String cmd, String body, String st, String id) {
        String cookie = (String) userRequest.getSession().getAttribute("MCP8");
        try {
            JSONObject cvRequest = new JSONObject();
            String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
            SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT, Locale.getDefault());
            String msgId = UUID.randomUUID().toString().replace("-", "");
            logger.info("id = " + msgId + "\r\nCookie : " + cookie + "\r\ncmd : " + cmd + "\r\nbody : " + body);
            JSONObject head = new JSONObject();
            head.put("timestamp", format.format(new Date()));
            head.put("cmd", cmd);
            head.put("ver", "s.1.01");
            head.put("id", msgId);
            head.put("userId", id); //TODO 加上userID  ，如果渠道的话，userID设为空。
            head.put("channelCode", CmbcConstant.CMBC_CODE);  //民生银行客户端。
            head.put("digestType", "md5");
            head.put("digest", MD5.MD5Encode(body + head.get("timestamp") + st));//st
            cvRequest.put("head", head);
            cvRequest.put("body", body);

            HttpPost request = new HttpPost(mcp8Url);
            try {
                if (cookie != null && !"".equals(cookie)) {
                    request.setHeader("Cookie", cookie);
                }
                List<NameValuePair> reqParams = new ArrayList<NameValuePair>();
                reqParams.add(new BasicNameValuePair("message", cvRequest.toString()));

                request.setEntity(new UrlEncodedFormEntity(reqParams, Consts.UTF_8));
                HttpContext context = HttpClientContext.create();
                CloseableHttpResponse response=null;
                try {
                    response = getHttpClient().execute(request, context);
                    if (cmd.equals("A04") || cmd.equals("A03") || cmd.equals("A01")) {
                        StringBuilder cookieValue = new StringBuilder();
                        Header[] headers = response.getHeaders("Set-Cookie");
                        for (Header header : headers) {
                            String cookie_temp = header.getValue();
                            if (cookieValue.length() > 0) cookieValue.append(",");
                            cookieValue.append(cookie_temp);
                        }
                        //addCookie(httpResponse,cookieValue.toString());
                        userRequest.getSession().setAttribute("MCP8", cookieValue.toString());
                    }
                    String retString = EntityUtils.toString(response.getEntity());
                 //   retString = new String(retString.getBytes("ISO-8859-1"), "utf-8");
                    JSONObject obj = new JSONObject(retString);

                    JSONObject retBody = new JSONObject(obj.getString("body"));
                    retBody.put("nowTime", obj.getJSONObject("head").getString("timestamp"));
//                  retBody.put("password","123456");//TODO 自动注册的用户密码统一为这一个。可以改写一下这个密码生成算法。
//	            	logger.info("Response : "+ JsonUtil.formatJson(retBody.toString(), "\t"));
                    return retBody.toString();
                } finally {
                    if(response!=null){
                        response.close();
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                try {
                    JSONObject obj = new JSONObject();
                    obj.put("repCode", "-1");
                    obj.put("description", "远程请求失败");
                    return obj.toString();
                } catch (Exception ex) {
                    return null;
                }
            }
        } catch (Exception e) {
            return null;
        }
    }


    public static String mcpPost( String cmd, String body) {
        try {
            JSONObject cvRequest = new JSONObject();
            String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSSZ";
            SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT, Locale.getDefault());
            String msgId = UUID.randomUUID().toString().replace("-", "");
            logger.info("id = " + msgId + "\r\ncmd : " + cmd + "\r\nbody : " + body);
            JSONObject head = new JSONObject();
            head.put("timestamp", format.format(new Date()));
            head.put("cmd", cmd);
            head.put("version",CmbcConstant.MCP_VERSION);
            head.put("messageid", msgId);
            head.put("userId", CmbcConstant.MCP_CODE);
            head.put("userType", "CHANNEL");
            head.put("digestType", "md5");
            head.put("digest", MD5.MD5Encode(body + head.get("timestamp") + CmbcConstant.MCP_KEY));//st
            cvRequest.put("head", head);
            cvRequest.put("body", body);
            HttpPost request = new HttpPost(mcp8Url);
            try {
                List<NameValuePair> reqParams = new ArrayList<NameValuePair>();
                reqParams.add(new BasicNameValuePair("message", cvRequest.toString()));

                request.setEntity(new UrlEncodedFormEntity(reqParams, Consts.UTF_8));
                HttpContext context = HttpClientContext.create();
                CloseableHttpResponse response=null;
                try {
                    response = getHttpClient().execute(request, context);
                    String retString = EntityUtils.toString(response.getEntity());
                    //   retString = new String(retString.getBytes("ISO-8859-1"), "utf-8");
                    logger.error(retString);
                    logger.error("==================");
                    JSONObject obj = new JSONObject(retString);
                    String bodyStr=obj.getString("body");
                    if(!"".equals(bodyStr)){
                        JSONObject retBody = new JSONObject(obj.getString("body"));
                        retBody.put("repCode", "0000");
                        retBody.put("nowTime", obj.getJSONObject("head").getString("timestamp"));
                        return retBody.toString();
                    }else{
                        return "";
                    }
                } finally {
                    if(response!=null){
                        response.close();
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                try {
                    JSONObject obj = new JSONObject();
                    obj.put("repCode", "-1");
                    obj.put("description", "远程请求失败");
                    return obj.toString();
                } catch (Exception ex) {
                    return null;
                }
            }
        } catch (Exception e) {
            return null;
        }
    }

    //获取竞猜足球信息
    /**
     * 向指定URL发送GET方法的请求
     *
     * @param url
     *            发送请求的URL

     * @return URL 所代表远程资源的响应结果
     */
    public static String sendGet(String url) {
        String result = "";
        BufferedReader in = null;
        try {
            String urlNameString = url.trim();
            URL realUrl = new URL(urlNameString);
            // 打开和URL之间的连接
            URLConnection connection = realUrl.openConnection();
            // 设置通用的请求属性
            connection.setRequestProperty("accept", "*/*");
            connection.setRequestProperty("connection", "Keep-Alive");
            connection.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 建立实际的连接
            connection.connect();
            // 获取所有响应头字段
            Map<String, List<String>> map = connection.getHeaderFields();
            // 遍历所有的响应头字段
//            for (String key : map.keySet()) {
//                System.out.println(key + "--->" + map.get(key));
//            }
            // 定义 BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    connection.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        } catch (Exception e) {
            System.out.println("发送GET请求出现异常！" + e);
            e.printStackTrace();
        }
        // 使用finally块来关闭输入流
        finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
        return result;
    }

}
