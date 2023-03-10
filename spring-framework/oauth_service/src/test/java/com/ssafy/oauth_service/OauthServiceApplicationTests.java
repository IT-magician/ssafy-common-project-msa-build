package com.ssafy.oauth_service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.oauth_service.Repository.KakaoLoginAccessTokenCacheRepository;
import com.ssafy.oauth_service.Repository.KakaoLoginRefreshTokenCacheRepository;
import com.ssafy.oauth_service.Repository.OAuthRegisterCacheRepository;
import com.ssafy.oauth_service.dto.KakaoLoginAccessTokenCache;
import com.ssafy.oauth_service.dto.KakaoLoginRefreshTokenCache;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.UUID;

@SpringBootTest
class OauthServiceApplicationTests {

    @Autowired
    OAuthRegisterCacheRepository oAuthRegisterCacheRepository;

    @Autowired
    KakaoLoginAccessTokenCacheRepository loginAccessTokenCacheRepository;

    @Autowired
    KakaoLoginRefreshTokenCacheRepository loginRefreshTokenCacheRepository;


    @Value("${oauth2.client.registration.client-id.kakao}")
    String kakao_cliendID;

    @Test
    void contextLoads() throws Exception {
//        System.out.println(oAuthRegisterCacheRepository.findById("OTFjYTM1ODEtZjUyZC00YTkxLTgxMDgtMjVlNjgzMDc4YWFj"));
        ObjectMapper objectMapper = new ObjectMapper();

        URL url = new URL("http://localhost:9000/user/regist/" + 1234);
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("GET");

        String userData = "{\"nickname\":\"nickname\", \"name\":\"bannana\", \"prefer_time\":\"12-21\"}";
        if (userData != null && userData.length() > 0)
        {
            httpConn.setRequestProperty("Content-Type", "application/json; utf-8");
            httpConn.setDoOutput(true); //OutputStream??? ???????????? post body ????????? ??????

            OutputStream os = httpConn.getOutputStream();
            os.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(userData).getBytes(StandardCharsets.UTF_8));
            System.out.println("userData -> " + objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(userData));

            httpConn.connect();
        }
        System.out.println(new String(httpConn.getInputStream().readAllBytes()));

    }


    String access_token = "isiUxNyvwt2sXwjDEhmTxqyRmaMlL3ROKTrW5EquCisNHgAAAYYNcC6F";
    String refresh_token = "0sEUoIcwZTL2lTUHnXmq3VTbwanwJDQu5dMMCGUACisNHgAAAYYNcC6E";

    @Test
    void access_tokenCheck() throws Exception {
        try {

            URL url = new URL("https://kapi.kakao.com/v1/user/access_token_info");
            HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
            httpConn.setRequestMethod("GET");
            httpConn.setRequestProperty("Authorization", "Bearer " + access_token);
            InputStream responseStream = httpConn.getInputStream();
            String ret = new String(responseStream.readAllBytes());
            System.out.println(ret);
        }
        catch (Throwable e){
            System.out.println("token invalid");
        }
    }

    @Test
    void refresh_token_getAgain() throws Exception {
        URL url = UriComponentsBuilder
                .fromHttpUrl("https://kauth.kakao.com/oauth/token")
                .queryParam("grant_type", "refresh_token")
                .queryParam("client_id",kakao_cliendID)
                .queryParam("refresh_token","ZDY1MDRmZDgtOWM4NC00ZDQwLTk5ODYtM2Q5ZmE5ZDk1MWY0")
                .build()
                .toUri().toURL();

        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        InputStream responseStream = httpConn.getInputStream();
        String ret = new String(responseStream.readAllBytes());
        System.out.println(ret);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> map = objectMapper.convertValue(ret, Map.class);

    }

    @Test
    void logout(){

    }

}


/*
HTTP HEADER(When oau
X-Forwarded-Login : kakao's is





- ???????????? access_token??? ???????????? kakao?????? ????????????
<- access_token??? ????????? ??????. ?????? ????????? ????????? ???????????? ??? ????????? ??????

- access_token??? ???????????????, ??????????????? ????????? id??? ???????????? url??? ?????????, ??? ?????? ?????? ????????? ?????????

- access_token??? ???????????? ????????? ?????? ??????(?????? ????????? ????????? ??????)

- ????????????(access_token ??? refresh_token ?????? <- ????????? ??????. ???????????? ?????????)

- refresh token ??????

- api gateway ????????????
+ docker??? ???????????? ??????

- ssl ?????????(?????? ...???????????? ????????????...?)

 */