package com.av.web.configuration;

import com.azure.spring.aad.webapp.AADWebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AADOAuth2LoginSecurityConfig extends AADWebSecurityConfigurerAdapter {

    private final OAuth2UserService<OidcUserRequest, OidcUser> oidcUserOAuth2UserService;

    public AADOAuth2LoginSecurityConfig(OAuth2UserService<OidcUserRequest, OidcUser> oidcUserOAuth2UserService) {
        this.oidcUserOAuth2UserService = oidcUserOAuth2UserService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .oidcUserService(oidcUserOAuth2UserService);
    }
}