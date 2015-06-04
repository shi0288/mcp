package com.mcp.sv.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.mcp.sv.cmbc.LotteryDao;
import com.mcp.sv.message.resp.MessageResponse;
import com.mcp.sv.robot.TulingApiProcess;
import com.mcp.sv.util.MessageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class CoreService {

	
	static Logger logger = LoggerFactory.getLogger(CoreService.class);
	
	/**
	 * 处理微信发来的请求
	 * 
	 * @param request
	 * @return
	 */
	public static String processRequest(HttpServletRequest request) {
		String respMessage = null;
		try {
			// 默认返回的文本消息内容
			String respContent = "请求处理异常，请稍候尝试！";

			// xml请求解析
			// 调用消息工具类MessageUtil解析微信发来的xml格式的消息，解析的结果放在HashMap里；
			Map<String, String> requestMap = MessageUtil.parseXml(request);

			// 从HashMap中取出消息中的字段；
			// 发送方帐号（open_id）
			String fromUserName = requestMap.get("FromUserName");
			// 公众帐号
			String toUserName = requestMap.get("ToUserName");
			// 消息类型
			String msgType = requestMap.get("MsgType");
			// 消息内容
			String content = requestMap.get("Content");
			// 从HashMap中取出消息中的字段；
			
			logger.info("fromUserName is:" +fromUserName+" toUserName is:" +toUserName+" msgType is:" +msgType);

			// 文本消息
			if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_TEXT)) {
				//微信聊天机器人测试 2015-3-31
				if(content!=null){
					respContent = TulingApiProcess.getTulingResult(content);
					if(respContent==""||null==respContent){
						MessageResponse.getTextMessage(fromUserName , toUserName , "1233abcddd服务号暂时无法回复");
					}
					return MessageResponse.getTextMessage(fromUserName , toUserName , respContent);
				}
			} else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {// 事件推送
				String eventType = requestMap.get("Event");// 事件类型
				
				if (eventType.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) {// 订阅
					respContent = " 您好。欢迎您访问运彩公众号";
					//注册用户到数据库
					LotteryDao.register(fromUserName, fromUserName+"123456",  fromUserName+"123456");
					return MessageResponse.getTextMessage(fromUserName, toUserName, respContent);
				} else if (eventType.equals(MessageUtil.EVENT_TYPE_UNSUBSCRIBE)) {// 取消订阅
					//删除用户或者 修改状态
					// TODO 取消订阅后用户再收不到公众号发送的消息，因此不需要回复消息
				} else if (eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {// 自定义菜单点击事件
					String eventKey = requestMap.get("EventKey");// 事件KEY值，与创建自定义菜单时指定的KEY值对应
					logger.info("eventKey is:" +eventKey);
					return MenuClickService.getClickResponse(eventKey , fromUserName , toUserName);
				}
			}
			//开启微信声音识别测试 2015-3-30
			else if(msgType.equals("voice"))
			{
				String recvMessage = requestMap.get("Recognition");
				//respContent = "收到的语音解析结果："+recvMessage;
				if(recvMessage!=null){
					respContent = TulingApiProcess.getTulingResult(recvMessage);
				}else{
					respContent = "您说的太模糊了，能不能重新说下呢？";
				}
				return MessageResponse.getTextMessage(fromUserName , toUserName , respContent); 
			}
			//拍照功能
			else if(msgType.equals("pic_sysphoto"))
			{
				
			}
			else
			{
				return MessageResponse.getTextMessage(fromUserName , toUserName , "返回为空"); 
			}

		}
		catch (Exception e) {
			e.printStackTrace();
		}

		return respMessage;
	}

}
