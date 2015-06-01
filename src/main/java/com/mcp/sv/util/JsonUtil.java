package com.mcp.sv.util;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author liujimin
 * @version 1.0
 * Json 字符串生成工具类
 * <P>
 * 传入数扰载体，生成json格式字符串
 * </p>
 */
public class JsonUtil {
	/**
	 * @param object
	 *            任意对象
	 * @return java.lang.String
	 */
	public static String objectToJson(Object object) {
		StringBuilder json = new StringBuilder();
		if (object == null) {
			json.append("\"\"");
		} else if (object instanceof String || object instanceof Integer) {
			json.append("\"").append((String) object).append("\"");
		} else {
			json.append(beanToJson(object));
		}
		return json.toString();
	}

	/**
	 * 功能描述:传入任意一个 javabean 对象生成一个指定规格的字符串
	 * 
	 * @param bean
	 *            bean对象
	 * @return String
	 */
	public static String beanToJson(Object bean) {
		StringBuilder json = new StringBuilder();
		json.append("{");
		PropertyDescriptor[] props = null;
		try {
			props = Introspector.getBeanInfo(bean.getClass(), Object.class)
					.getPropertyDescriptors();
		} catch (IntrospectionException e) {
		}
		if (props != null) {
			for (int i = 0; i < props.length; i++) {
				try {
					String name = objectToJson(props[i].getName());
					String value = objectToJson(props[i].getReadMethod()
							.invoke(bean));
					json.append(name);
					json.append(":");
					json.append(value);
					json.append(",");
				} catch (Exception e) {
				}
			}
			json.setCharAt(json.length() - 1, '}');
		} else {
			json.append("}");
		}
		return json.toString();
	}

	/**
	 * 功能描述:通过传入一个列表对象,调用指定方法将列表中的数据生成一个JSON规格指定字符串
	 * 
	 * @param list
	 *            列表对象
	 * @return java.lang.String
	 */
	public static String listToJson(List<?> list) {
		StringBuilder json = new StringBuilder();
		json.append("[");
		if (list != null && list.size() > 0) {
			for (Object obj : list) {
				json.append(objectToJson(obj));
				json.append(",");
			}
			json.setCharAt(json.length() - 1, ']');
		} else {
			json.append("]");
		}
		return json.toString();
	}
	
	
	
    /**
     * json字符串的格式化
     * 
     * @param json
     * @param fillStringUnit
     * @return
     */ 
    public static String formatJson(String json, String fillStringUnit) {
        if (json == null || json.trim().length() == 0) { 
            return null; 
        } 
         
        int fixedLenth = 0; 
        ArrayList<String> tokenList = new ArrayList<String>();
        { 
            String jsonTemp = json;
            //预读取 
            while (jsonTemp.length() > 0) { 
                String token = getToken(jsonTemp);
                jsonTemp = jsonTemp.substring(token.length()); 
                token = token.trim(); 
                tokenList.add(token); 
            }            
        } 
         
        for (int i = 0; i < tokenList.size(); i++) { 
            String token = tokenList.get(i);
            int length = token.getBytes().length; 
            if (length > fixedLenth && i < tokenList.size() - 1 && tokenList.get(i + 1).equals(":")) { 
                fixedLenth = length; 
            } 
        } 
         
        StringBuilder buf = new StringBuilder();
        int count = 0; 
        for (int i = 0; i < tokenList.size(); i++) { 
             
            String token = tokenList.get(i);
             
            if (token.equals(",")) { 
                buf.append(token); 
                doFill(buf, count, fillStringUnit); 
                continue; 
            } 
            if (token.equals(":")) { 
                buf.append(" ").append(token).append(" "); 
                continue; 
            } 
            if (token.equals("{")) { 
                String nextToken = tokenList.get(i + 1);
                if (nextToken.equals("}")) { 
                    i++; 
                    buf.append("{ }"); 
                } else { 
                    count++; 
                    buf.append(token); 
                    doFill(buf, count, fillStringUnit); 
                } 
                continue; 
            } 
            if (token.equals("}")) { 
                count--; 
                doFill(buf, count, fillStringUnit); 
                buf.append(token); 
                continue; 
            } 
            if (token.equals("[")) { 
                String nextToken = tokenList.get(i + 1);
                if (nextToken.equals("]")) { 
                    i++; 
                    buf.append("[ ]"); 
                } else { 
                    count++; 
                    buf.append(token); 
                    doFill(buf, count, fillStringUnit); 
                } 
                continue; 
            } 
            if (token.equals("]")) { 
                count--; 
                doFill(buf, count, fillStringUnit); 
                buf.append(token); 
                continue; 
            } 
             
            buf.append(token); 
            //左对齐 
            if (i < tokenList.size() - 1 && tokenList.get(i + 1).equals(":")) { 
                int fillLength = fixedLenth - token.getBytes().length; 
                if (fillLength > 0) { 
                    for(int j = 0; j < fillLength; j++) { 
                        buf.append(" "); 
                    } 
                } 
            } 
        } 
        return buf.toString(); 
    } 
     
    private static String getToken(String json) {
        StringBuilder buf = new StringBuilder();
        boolean isInYinHao = false; 
        while (json.length() > 0) { 
            String token = json.substring(0, 1);
            json = json.substring(1); 
             
            if (!isInYinHao &&  
                    (token.equals(":") || token.equals("{") || token.equals("}")  
                            || token.equals("[") || token.equals("]") 
                            || token.equals(","))) { 
                if (buf.toString().trim().length() == 0) {                   
                    buf.append(token); 
                } 
                 
                break; 
            } 
 
            if (token.equals("\\")) { 
                buf.append(token); 
                buf.append(json.substring(0, 1)); 
                json = json.substring(1); 
                continue; 
            } 
            if (token.equals("\"")) { 
                buf.append(token); 
                if (isInYinHao) { 
                    break; 
                } else { 
                    isInYinHao = true; 
                    continue; 
                }                
            } 
            buf.append(token); 
        } 
        return buf.toString(); 
    } 
 
    private static void doFill(StringBuilder buf, int count, String fillStringUnit) {
        buf.append("\n"); 
        for (int i = 0; i < count; i++) { 
            buf.append(fillStringUnit); 
        } 
    } 
}
