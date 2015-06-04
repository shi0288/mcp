package com.mcp.sv.cmbc;

/**
 * Created by yeeson on 14-3-16.
 */
public class CmbcConstant {
    public static final String CMBC_CODE = "Q0001";
    public static final String CMBC_KEY = "135790";
    public static final String CMBC_SIGN_KEY = "!@#$%^&*()";

    public static final String MCP_VERSION="1.0.00";
    public static final String MCP_CODE = "Q0001";
    public static final String MCP_KEY = "135790";
    public static final String MCP_INTERFACE_URL = "http://218.30.107.19:9088/mcp-filter/main/interface.htm";


    //命令
    public static final String MCP_CQ01="CQ01";  //查询期次
    public static final String MCP_CT03="CT03";  //普通投注

    public static final String MCP_CQ22="CQ22";  //查询

    //执行状态
    public static final String ERROR="9999";
    public static final String SUCCESS="0000";

    //记录类别
    public static final int TRANSTYPE=0;

    //订单状态
    public static final int ORDER_1000=1000;  //未支付
    public static final int ORDER_2000=2000;  //下单成功
    public static final int ORDER_3000=3000;  //已支付
    public static final int ORDER_4000=4000;  //出票成功


    //竞彩获取数据url
    public static  final String SPF_URL = "http://i.sporttery.cn/odds_calculator/get_odds?i_format=json&poolcode%5B%5D=hhad&poolcode%5B%5D=had";
    public static  final String BF_URL = "http://i.sporttery.cn/odds_calculator/get_odds?i_format=json&poolcode%5B%5D=crs";
    public static  final String ZJQS_URL = "http://i.sporttery.cn/odds_calculator/get_odds?i_format=json&poolcode%5B%5D=ttg";
    public static  final String BQCSPF_URL = "http://i.sporttery.cn/odds_calculator/get_odds?i_format=json&poolcode%5B%5D=hafu";
    public static  final String HHGG_URL = "http://info.sporttery.cn/interface/interface_mixed.php?action=fb_list&pke=0.8295743858907372";
    //"http://i.sporttery.cn/odds_calculator/get_odds?i_format=json&poolcode%5B%5D=hafu";

    public static final String APPID = "wxda8654f8803b6fc9";
    public static final String APPSECRET = "dba26e3fbc2732cf7068fbca345530ae";
    //
    public static  final String SPF = "SPF";
    public static  final String BF = "BF";
    public static  final String ZJQS = "ZJQS";
    public static  final String BQCSPF = "BQCSPF";
    public static  final String HHGG = "HHGG";


}
