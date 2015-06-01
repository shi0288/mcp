<%@ page import="com.mcp.sv.cmbc.CmbcConstant" %>
<%@ page import="com.mcp.sv.cmbc.MD5" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript" src="/cmbc/js/commontz.js"></script>
<script type="text/javascript" src="/cmbc/js/platform.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        /*登录  */

        var Id = sessionStorage.getItem("Id");
        var clientUserId = <%=request.getParameter("userId")%>;
        if (Id == null && clientUserId != null) {//尚未登陆，需要处理登陆。
            <%
            String userId = request.getParameter("userId");
            if (userId != null) {
                String sign = request.getParameter("sign");
                String signStr =MD5.MD5Encode(userId + CmbcConstant.CMBC_SIGN_KEY);
                if (signStr.equals(sign)) {
            %>
            //startLogin("<%=userId%>", "<%=signStr%>");
            <%
               }else{
               %>
            window.alert("登陆验证失败");
            <%
               }
            }
            %>
        }
        Id = "123";
        ajustButton(Id);
    });
</script>
