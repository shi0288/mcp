package com.mcp.sv.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class EncodingFilter implements Filter {
    private String encoding = "UTF-8";

    private static final String PARAM_ENCODING = "encoding";

    public void destroy() {

    }

    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        request.setCharacterEncoding(encoding);
        response.setCharacterEncoding(encoding);
        chain.doFilter(request, res);
    }

    public void init(FilterConfig config) throws ServletException {
        String temp = config.getInitParameter(PARAM_ENCODING);
        if (temp != null) encoding = temp;
    }
}
