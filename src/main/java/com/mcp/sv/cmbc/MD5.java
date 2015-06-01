package com.mcp.sv.cmbc;

import java.security.MessageDigest;

/**MD5.java
 * description: MD5����
 * @author ������
 * version 1.0
 * Jan 11, 2008
 * History:
 */
public class MD5 {

	/**
	 * @param args
	 * function
	 */
	private final static String[] hexDigits = { 
	      "0", "1", "2", "3", "4", "5", "6", "7", 
	      "8", "9", "a", "b", "c", "d", "e", "f"}; 

	
	  public static String byteArrayToHexString(byte[] b) { 
	    StringBuffer resultSb = new StringBuffer(); 
	    for (int i = 0; i < b.length; i++) { 
	      resultSb.append(byteToHexString(b[i])); 
	    } 
	    return resultSb.toString(); 
	  } 

	  private static String byteToHexString(byte b) { 
	    int n = b; 
	    if (n < 0) 
	      n = 256 + n; 
	    int d1 = n / 16; 
	    int d2 = n % 16; 
	    return hexDigits[d1] + hexDigits[d2]; 
	  } 

	  public static String MD5Encode(String origin) { 
	    String resultString = null; 

	    try { 
	      resultString=new String(origin); 
	      MessageDigest md = MessageDigest.getInstance("MD5"); 
	      resultString=byteArrayToHexString(md.digest(resultString.getBytes("UTF-8")));
	    } 
	    catch (Exception ex) { 
                ex.printStackTrace();
	    } 
	    return resultString; 
	  } 

	  public static void main(String[] args){ 
                System.err.println(MD5Encode("666 (中)")); 
                try
                {
               String queryString="connChannel=VINUX&game=00-0&merchantId=23456789&orderId=1231234234234234234234234234&stakeNumber=01020304050607%2C01020304050607&userId=13581665881";
              System.out.println(MD5.MD5Encode(queryString+"$R@#@#$@#V*@!"));
                }
                catch(Exception e)
                {
                    e.printStackTrace();;
                }

	  } 


}
