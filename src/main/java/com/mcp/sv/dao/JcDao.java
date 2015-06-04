package com.mcp.sv.dao;


import com.mcp.sv.cmbc.CmbcConstant;
import com.mcp.sv.cmbc.LotteryService;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static com.mcp.sv.cmbc.HttpClientWrapper.sendGet;

/**
 * Created by Administrator on 2015/6/4.
 */
public class JcDao {

    private static final Logger logger = LoggerFactory.getLogger(LotteryService.class);

    public static Map<String,Object> map = new HashMap<String,Object>();

    public static String getFormat( String head, String body){
        String str = "";
        String res = "";
        try {
            JSONObject mhead = new JSONObject(head);
            String st = mhead.getString("st");
            if (st.equals(CmbcConstant.ZJQS)) {
                String ZJQS = (String) map.get(st);
                logger.info("ZJQS::::::::::" + ZJQS);
                if (ZJQS == null) {
                    str = sendGet(CmbcConstant.ZJQS_URL);
                    res = createFormat(st, str);
                } else {
                    boolean update = getTask(ZJQS,st);
                    if(update){
                        str = ZJQS;
                        res = str;
                    }else{
                        str = sendGet(CmbcConstant.ZJQS_URL);
                        res = createFormat(st, str);
                    }

                }
            } else if (st.equals("1") || st.equals("2")) {
                st = CmbcConstant.SPF;
                String cn01 = (String) map.get(st);
                logger.info("cn01::::::::::" + cn01);
                if (cn01 == null) {
                    str = sendGet(CmbcConstant.SPF_URL);
                    res = createFormat(st, str);
                } else {
                    boolean update = getTask(cn01,st);
                    if(update){
                        str = cn01;
                        res = str;
                    }else{
                        str = sendGet(CmbcConstant.SPF_URL);
                        res = createFormat(st, str);
                    }
                }
            }
            else if(st.equals(CmbcConstant.BQCSPF)){
                String BQCSPF = (String) map.get(st);
                logger.info("BQCSPF::::::::::"+BQCSPF);
                if(BQCSPF==null){
                    str = sendGet(CmbcConstant.BQCSPF_URL);
                    res = createFormat(st, str);
                }else{
                    boolean update = getTask(BQCSPF,st);
                    if(update){
                        str = BQCSPF;
                        res = str;
                    }else{
                        str = sendGet(CmbcConstant.BQCSPF_URL);
                        res = createFormat(st, str);
                    }
                }

            }else if(st.equals(CmbcConstant.BF)){
                String BF = (String) map.get(st);
                logger.info("BF::::::::::"+BF);
                if(BF==null){
                    str = sendGet(CmbcConstant.BF_URL);
                    res = createFormat(st, str);
                }else{
                    boolean update = getTask(BF,st);
                    if(update){
                        str = BF;
                        res = str;
                    }else{
                        str = sendGet(CmbcConstant.BF_URL);
                        res = createFormat(st, str);
                    }
                }

            }else if(st.equals(CmbcConstant.HHGG)){
                String HHGG = (String) map.get(st);
                logger.info("HHGG::::::::::"+HHGG);
                if(HHGG==null){
                    str = sendGet(CmbcConstant.HHGG_URL);
                    res = createHhggFormat(st, str);
                }else{
                    boolean update = getTask(HHGG,st);
                    if(update){
                        str = HHGG;
                        res = str;
                    }else{
                        str = sendGet(CmbcConstant.HHGG_URL);
                        res = createHhggFormat(st, str);
                    }
                }
            }

        }catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }

    //组织竞彩报文格式
    public static String createFormat( String type, String str) {
        String rbody = "";
        JSONObject data = new JSONObject();                 //组织好的数据
        JSONObject head = new JSONObject();
        JSONArray body = new JSONArray();                   //需要组织的数据
        String endDate = "";
        try {
            JSONObject mbody = new JSONObject(str);             //传过来的数据
            String mdata = mbody.getString("data");             //抓取得数据
            String status = mbody.getString("status");          //最后更新时间
            JSONObject updated = new JSONObject(status);
            String last_updated = updated.getString("last_updated");
            endDate = last_updated;
            JSONObject mbody_ = new JSONObject(mdata);
            Iterator iterator = mbody_.keys();
            String key = null;
            String value = null;
            int i = 0;
            while (iterator.hasNext()) {
                key = (String) iterator.next();
                value = mbody_.getString(key);
                JSONObject bodys_ = new JSONObject(value);
                String gameCode = "T51";
                String num = bodys_.getString("num");
                String[] week = new String[]{ "周一", "周二", "周三", "周四", "周五", "周六","周日"};
                String sweek = num.substring(0,2);
                String  showing= num.substring(2,5);
                for (int j = 0; j <week.length ; j++) {
                    if(sweek.equals(week[j])){
                        num = ""+(j+1)+showing;
                        break;
                    }
                }
                String code = bodys_.getString("b_date").replace("-","").trim()+num;
                String openTime = bodys_.getString("b_date")+" 12:00:00";
                String closeTime =  bodys_.getString("date")+" "+ bodys_.getString("time");
                String id = gameCode+"_"+code;
                String _id = id;
                String matchCode = code;
                String pType = "01";
                String matchName = bodys_.getString("h_cn")+"|"+ bodys_.getString("a_cn")+"|"+ bodys_.getString("l_cn");
                if(type.equals(CmbcConstant.SPF)){
                    logger.info("CmbcConstant.SPF:"+CmbcConstant.SPF);
                    String fixedodds1 = "";
                    String oddsInfo1 = "";
                    String oddsSingle1 = "";
                    if(bodys_.has("hhad")){
                        String hhad =  bodys_.getString("hhad");
                        JSONObject bodys_hhad = new JSONObject(hhad);
                        fixedodds1 = bodys_hhad.getString("fixedodds");
                        if(fixedodds1 == null || "".equals(fixedodds1)){
                            fixedodds1 = "0";
                        }
                        oddsInfo1 = bodys_hhad.getString("h")+"|"+bodys_hhad.getString("d")+"|"+bodys_hhad.getString("a");
                        oddsSingle1 = bodys_hhad.getString("single");
                    }else{
                        fixedodds1 = "未开售";
                        oddsInfo1 = "--|--|--";
                        oddsSingle1 = "未开售";
                    }

                    String oddsCode1 = "cn01";
                    String oddsName1 = "让球胜平负";
                    JSONObject bodys_hhad1 = new JSONObject();
                    bodys_hhad1.put("_id",_id+"_1");
                    bodys_hhad1.put("matchCode",matchCode);
                    bodys_hhad1.put("pType",pType);
                    bodys_hhad1.put("matchName",matchName+"|"+ fixedodds1);
                    bodys_hhad1.put("oddsInfo",oddsInfo1);
                    bodys_hhad1.put("oddsCode",oddsCode1);
                    bodys_hhad1.put("oddsName",oddsName1);
                    bodys_hhad1.put("oddsSingle", oddsSingle1);


                    String fixedodds2 = "";
                    String oddsInfo2 = "";
                    String oddsSingle2 = "";

                    if(bodys_.has("had")){
                        String had = bodys_.getString("had");
                        JSONObject bodys_had = new JSONObject(had);
                        fixedodds2 = bodys_had.getString("fixedodds");
                        if(fixedodds2 == null || "".equals(fixedodds2)){
                            fixedodds2 = "0";
                        }
                        oddsInfo2 = bodys_had.getString("h")+"|"+bodys_had.getString("d")+"|"+bodys_had.getString("a");
                        oddsSingle2 = bodys_had.getString("single");
                    }else{
                        fixedodds2 = "未开售";
                        oddsInfo2 = "--|--|--";
                        oddsSingle2 = "未开售";
                    }
                    String oddsCode2 = "cn02";
                    String oddsName2 = "胜平负";
                    JSONObject bodys_had2 = new JSONObject();
                    bodys_had2.put("_id",_id+"_2");
                    bodys_had2.put("matchCode",matchCode);
                    bodys_had2.put("pType",pType);
                    bodys_had2.put("matchName",matchName+"|"+ fixedodds2);
                    bodys_had2.put("oddsInfo",oddsInfo2);
                    bodys_had2.put("oddsCode",oddsCode2);
                    bodys_had2.put("oddsName",oddsName2);
                    bodys_had2.put("oddsSingle",oddsSingle2);

                    JSONArray matchInfo = new JSONArray();
                    matchInfo.put(0,bodys_hhad1);
                    matchInfo.put(1,bodys_had2);

                    JSONObject body_ = new JSONObject();
                    body_.put("gameCode",gameCode);
                    body_.put("code",code);
                    body_.put("openTime",openTime);
                    body_.put("closeTime",closeTime);
                    body_.put("id",id);
                    body_.put("matchInfo",matchInfo);

                    body.put(i,body_);
                    i = i+1;
                }else if(type.equals(CmbcConstant.BF)){
                    String crs =  bodys_.getString("crs");
                    JSONObject bodys_crs = new JSONObject(crs);
                    String fixedodds = bodys_crs.getString("fixedodds");
                    if(fixedodds == null || "".equals(fixedodds)){
                        fixedodds = "0";
                    }
                    String s0100 = bodys_crs.getString("0100");
                    String s0200 = bodys_crs.getString("0200");
                    String s0201 = bodys_crs.getString("0201");
                    String s0300 = bodys_crs.getString("0300");
                    String s0301 = bodys_crs.getString("0301");
                    String s0302 = bodys_crs.getString("0302");
                    String s0400 = bodys_crs.getString("0400");
                    String s0401 = bodys_crs.getString("0401");
                    String s0402 = bodys_crs.getString("0402");
                    String s0500 = bodys_crs.getString("0500");
                    String s0501 = bodys_crs.getString("0501");
                    String s0502 = bodys_crs.getString("0502");
                    String s_1_h = bodys_crs.getString("-1-h");
                    String s0000 = bodys_crs.getString("0000");
                    String s0101 = bodys_crs.getString("0101");
                    String s0202 = bodys_crs.getString("0202");
                    String s0303 = bodys_crs.getString("0303");
                    String s_1_d = bodys_crs.getString("-1-d");
                    String s0001 = bodys_crs.getString("0001");
                    String s0002 = bodys_crs.getString("0002");
                    String s0102 = bodys_crs.getString("0102");
                    String s0003 = bodys_crs.getString("0003");
                    String s0103 = bodys_crs.getString("0103");
                    String s0203 = bodys_crs.getString("0203");
                    String s0004 = bodys_crs.getString("0004");
                    String s0104 = bodys_crs.getString("0104");
                    String s0204 = bodys_crs.getString("0204");
                    String s0005 = bodys_crs.getString("0005");
                    String s0105 = bodys_crs.getString("0105");
                    String s0205 = bodys_crs.getString("0205");
                    String s_1_a = bodys_crs.getString("-1-a");
                    String oddsSingle = bodys_crs.getString("single");
                    StringBuffer oddsInfo = new StringBuffer();
                    String s = "|";
                    oddsInfo = oddsInfo.append(s0100).append(s).append(s0200).append(s).append(s0201).append(s).append(s0300).append(s).append(s0301).append(s).append(s0302)
                            .append(s).append(s0400).append(s).append(s0401).append(s).append(s0402).append(s).append(s0500).append(s).append(s0501)
                            .append(s).append(s0502).append(s).append(s_1_h)
                            .append(s).append(s0000).append(s).append(s0101).append(s).append(s0202).append(s).append(s0303).append(s).append(s_1_d)
                            .append(s).append(s0001).append(s).append(s0002).append(s).append(s0102).append(s).append(s0003).append(s).append(s0103).append(s).append(s0203).append(s).append(s0004)
                            .append(s).append(s0104).append(s).append(s0204).append(s).append(s0005).append(s).append(s0105).append(s).append(s0205).append(s).append(s_1_a);

                    JSONObject bodys_bf = new JSONObject();
                    bodys_bf.put("_id",_id+"_1");
                    bodys_bf.put("matchCode",matchCode);
                    bodys_bf.put("pType",pType);
                    bodys_bf.put("matchName",matchName+"|"+ fixedodds);
                    bodys_bf.put("oddsInfo",oddsInfo);
                    bodys_bf.put("oddsCode","BF");
                    bodys_bf.put("oddsName","比分");
                    bodys_bf.put("oddsSingle",oddsSingle);
//
                    JSONArray matchInfo = new JSONArray();
                    matchInfo.put(0,bodys_bf);

                    JSONObject body_ = new JSONObject();
                    body_.put("gameCode",gameCode);
                    body_.put("code",code);
                    body_.put("openTime",openTime);
                    body_.put("closeTime",closeTime);
                    body_.put("id",id);
                    body_.put("matchInfo",matchInfo);

                    body.put(i,body_);
                    i = i+1;
                }else if(type.equals(CmbcConstant.ZJQS)){
                    String ttg =  bodys_.getString("ttg");
                    JSONObject bodys_ttg = new JSONObject(ttg);
                    String fixedodds = bodys_ttg.getString("fixedodds");
                    if(fixedodds == null || "".equals(fixedodds)){
                        fixedodds = "0";
                    }
                    String s0 = bodys_ttg.getString("s0");
                    String s1 = bodys_ttg.getString("s1");
                    String s2 = bodys_ttg.getString("s2");
                    String s3 = bodys_ttg.getString("s3");
                    String s4 = bodys_ttg.getString("s4");
                    String s5 = bodys_ttg.getString("s5");
                    String s6 = bodys_ttg.getString("s6");
                    String s7 = bodys_ttg.getString("s7");
                    String oddsSingle = bodys_ttg.getString("single");
                    StringBuffer oddsInfo = new StringBuffer();
                    String s = "|";
                    oddsInfo = oddsInfo.append(s0).append(s).append(s1).append(s).append(s2).append(s).append(s3).append(s).append(s4)
                            .append(s).append(s5).append(s).append(s6).append(s).append(s7);
                    JSONObject bodys_zjqs = new JSONObject();
                    bodys_zjqs.put("_id",_id+"_1");
                    bodys_zjqs.put("matchCode",matchCode);
                    bodys_zjqs.put("pType",pType);
                    bodys_zjqs.put("matchName",matchName+"|"+ fixedodds);
                    bodys_zjqs.put("oddsInfo",oddsInfo);
                    bodys_zjqs.put("oddsCode","ZJQS");
                    bodys_zjqs.put("oddsName","总进球数");
                    bodys_zjqs.put("oddsSingle",oddsSingle);
//
                    JSONArray matchInfo = new JSONArray();
                    matchInfo.put(0,bodys_zjqs);

                    JSONObject body_ = new JSONObject();
                    body_.put("gameCode",gameCode);
                    body_.put("code",code);
                    body_.put("openTime",openTime);
                    body_.put("closeTime",closeTime);
                    body_.put("id",id);
                    body_.put("matchInfo",matchInfo);

                    body.put(i,body_);
                    i = i+1;
                }else if(type.equals(CmbcConstant.BQCSPF)){
                    String hafu =  bodys_.getString("hafu");
                    JSONObject bodys_hafu = new JSONObject(hafu);
                    String aa = bodys_hafu.getString("aa");
                    String fixedodds = bodys_hafu.getString("fixedodds");
                    if(fixedodds == null || "".equals(fixedodds)){
                        fixedodds = "0";
                    }
                    String ad = bodys_hafu.getString("ad");
                    String ah = bodys_hafu.getString("ah");
                    String da = bodys_hafu.getString("da");
                    String dd = bodys_hafu.getString("dd");
                    String dh = bodys_hafu.getString("dh");
                    String ha = bodys_hafu.getString("ha");
                    String hd = bodys_hafu.getString("hd");
                    String hh = bodys_hafu.getString("hh");
                    String p_status = bodys_hafu.getString("p_status");
                    String oddsSingle = bodys_hafu.getString("single");
                    StringBuffer oddsInfo = new StringBuffer();
                    String s = "|";
                    oddsInfo = oddsInfo.append(aa).append(s).append(ad).append(s).append(ah).append(s).append(da).append(s).append(dd)
                            .append(s).append(dh).append(s).append(ha).append(s).append(hd).append(s).append(hh);
                    if(p_status.equals("Selling")){//判断是否可售

                        JSONObject bodys_bqc = new JSONObject();
                        bodys_bqc.put("_id",_id+"_1");
                        bodys_bqc.put("matchCode",matchCode);
                        bodys_bqc.put("pType",pType);
                        bodys_bqc.put("matchName",matchName+"|"+ fixedodds);
                        bodys_bqc.put("oddsInfo",oddsInfo);
                        bodys_bqc.put("oddsCode","BQCSPF");
                        bodys_bqc.put("oddsName","半全场胜平负");
                        bodys_bqc.put("oddsSingle",oddsSingle);

                        JSONArray matchInfo = new JSONArray();
                        matchInfo.put(0,bodys_bqc);

                        JSONObject body_ = new JSONObject();
                        body_.put("gameCode",gameCode);
                        body_.put("code",code);
                        body_.put("openTime",openTime);
                        body_.put("closeTime",closeTime);
                        body_.put("id",id);
                        body_.put("matchInfo",matchInfo);

                        body.put(i,body_);
                        i = i+1;
                    }
                }else if(type.equals(CmbcConstant.HHGG)){

                }else{

                }
            }
            head.put("repCode","0000");
            head.put("last_updated",endDate);
            data.put("head",head);
            data.put("body",body.toString());
        } catch (Exception e) {
            try {
                head.put("repCode","-1");
                head.put("last_updated",endDate);
                data.put("head",head);
                data.put("body",body.toString());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            e.printStackTrace();
        }
        rbody = data.toString();
        map.put(type,rbody);
        map.put(type+"_last_updated",endDate);
        return rbody;
    }

    //混合过关
    public static String createHhggFormat( String type, String str)  {
        JSONObject rdata = new JSONObject();
        JSONObject rhead = new JSONObject();
        JSONObject rbody = new JSONObject();
        String rstr = "";
        try {
            String hhgg[] = str.split(";");
            System.out.println(hhgg[0]);
            String hhgg1[] = hhgg[0].split("=");
            System.out.println(hhgg1[1]);
//            JSONArray data = new JSONArray(hhgg1[1]);
            String data = hhgg1[1];
            rhead.put("repCode","0000");
            rdata.put("head",rhead);
            rdata.put("body",data);
            rstr = rdata.toString();
        }catch (Exception e) {
            e.printStackTrace();
            try {
                rhead.put("repCode", "-1");
                rdata.put("head",rhead);
                rdata.put("body","");
                rstr = rdata.toString();
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
        }
        return rstr;
    }


    //判断是否需要更新竞彩数据
    public static boolean getTask( String str,String st){
        boolean sign = false;
        try {
            if(st.equals(CmbcConstant.HHGG)){
                st = CmbcConstant.SPF;
            }
            String last_updated = (String) map.get(st);
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd' 'HH:mm:ss");
            Date last = format.parse(last_updated);
            Date nowt = new Date();
            long now1 = nowt.getTime();
            long last1 = last.getTime();
            long l = now1 - last1;
            long day=l/(24*60*60*1000);
            long hour=(l/(60*60*1000)-day*24);
            long min=((l/(60*1000))-day*24*60-hour*60);

            if(min <= 30){
                sign = true;
            }else {
                sign = false;
            }
        }catch (Exception e) {
            e.printStackTrace();
            sign = false;
        }
        return sign;
    }
}
