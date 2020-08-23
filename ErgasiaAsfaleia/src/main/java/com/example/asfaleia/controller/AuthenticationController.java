package com.example.asfaleia.controller;

import com.example.asfaleia.payload.JwtAuthenticationResponse;
import com.example.asfaleia.payload.LoginRequest;
import com.example.asfaleia.payload.SignUpRequest;
import com.example.asfaleia.security.JwtTokenProvider;
import com.example.asfaleia.service.UserService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/auth")
@Api
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> signUpUser(@RequestBody SignUpRequest signUpRequest) {

        if (signUpRequest.getRole().equals("ADMIN")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else if (signUpRequest.getRole().equals("BUYER") || signUpRequest.getRole().equals("SELLER")) {
            userService.createUser(signUpRequest);
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(value = "/hello")
    public ResponseEntity<?> helloUser() {

        System.out.println("hellooooo");
        userService.getUserById(1L);

        return new ResponseEntity(HttpStatus.OK);
    }

}