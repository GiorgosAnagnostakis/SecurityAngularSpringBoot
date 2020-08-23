package com.example.asfaleia.security;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("securityconstants")
public class SecurityConstants {

    public static final String AUTH_LOGIN_URL = "/authentication/authenticate";
    public static final String SECRET = "PdSgVkYp3s6v8y/B?E(H+MbQeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5u8x/A?D*G-KaPdSgVkYp3s6v9y$B&E)H+MbQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?";
    public static final String TOKEN_PREFIX = "Bearer";
    public static final String HEADER_STRING = "Authorization";

    public static long days;
    public static long hours;

    //Setting duration of jwt token
    public static long getTime() {
        if (days != 0) {
            return days * 24 * 60 * 60;
        }

        if (hours != 0) {
            return hours * 60 * 60;
        }

        return 0;
    }

    public static long getDays() {
        return days;
    }

    public void setDays(long days) {
        this.days = days;
    }

    public static long getHours() {
        return hours;
    }

    public void setHours(long hours) {
        this.hours = hours;
    }
}
