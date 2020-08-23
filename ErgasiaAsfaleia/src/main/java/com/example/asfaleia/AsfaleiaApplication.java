package com.example.asfaleia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class AsfaleiaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AsfaleiaApplication.class, args);
    }

}
