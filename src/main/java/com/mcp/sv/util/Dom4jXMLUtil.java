/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.mcp.sv.util;

import org.dom4j.Document;
import org.dom4j.DocumentFactory;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;

import java.io.StringWriter;

/**
 *
 * @author Administrator
 */
public class Dom4jXMLUtil {
    public String getXMLString(Document doc){	
        String strXml = "";
        try
        {
        // 有样式(缩进)的写出
            OutputFormat opf = OutputFormat.createPrettyPrint();
            opf.setEncoding("UTF-8");
            opf.setTrimText(true);
            //获取XML字符串形式
            StringWriter writerStr = new StringWriter();
            XMLWriter xmlw = new XMLWriter(writerStr, opf);
            xmlw.write(doc);
            strXml = writerStr.getBuffer().toString();
            // 无样式的
            //strXml = doc.asXML();
            return strXml;
        }
        catch(Exception e)
        {
            return strXml;
        }
    }
    public Document getXMLDoc(){
		DocumentFactory df = DocumentFactory.getInstance();
                // org.dom4j.Document doc = DocumentHelper.createDocument();
                Document doc = df.createDocument("UTF-8");
		return doc;
	}  
}
