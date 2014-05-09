package com.api.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.StringEntity;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Servlet implementation class TODOAPITestServlet
 */
public class TODOAPIServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if(request.getParameter("actionCode")!=null) {
			if(request.getParameter("actionCode").equalsIgnoreCase("GETALLTODOS")) {
				getTODOSFromRequestAndWriteInResponse(response);
			} else if (request.getParameter("actionCode").equalsIgnoreCase("CREATETODO")) {
				JSONObject jsonObject = getJSONObjectFromRequest(request);
				StringEntity input = new StringEntity(jsonObject.toJSONString());
		        input.setContentType("application/json");
				Request.Post("http://todo.ceresti.com:8080/task/add").body(input).execute();
				// get fresh list of todos
				getTODOSFromRequestAndWriteInResponse(response);
			} else if (request.getParameter("actionCode").equalsIgnoreCase("UPDATETODO")) {
				JSONObject jsonObject = getJSONObjectFromRequest(request);
				StringEntity input = new StringEntity(jsonObject.toJSONString());
		        input.setContentType("application/json");
				Request.Put("http://todo.ceresti.com:8080/task/"+jsonObject.get("id").toString()).body(input).execute();
				// get fresh list of todos
				getTODOSFromRequestAndWriteInResponse(response);
			} else if (request.getParameter("actionCode").equalsIgnoreCase("DELETETODO")) {
				JSONObject jsonObject = getJSONObjectFromRequest(request);
				Request.Delete("http://todo.ceresti.com:8080/task/delete/"+jsonObject.get("id").toString()).execute();
				// get fresh list of todos
				getTODOSFromRequestAndWriteInResponse(response);
			}
		}
	}

	private void getTODOSFromRequestAndWriteInResponse(HttpServletResponse response) throws IOException,
			ClientProtocolException {
		PrintWriter out = response.getWriter();
		String strOutput = Request.Get("http://todo.ceresti.com:8080/task/list").execute().returnContent().asString();
		out.print(strOutput);
		out.flush();
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
	private JSONObject getJSONObjectFromRequest(HttpServletRequest request) throws IOException {
		JSONParser parser = new JSONParser();
		JSONObject jsonObject = null;
		try {
			jsonObject = (JSONObject) parser.parse(request.getReader());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return jsonObject; 
	}
}
