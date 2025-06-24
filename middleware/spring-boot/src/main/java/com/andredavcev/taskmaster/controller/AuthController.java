package com.andredavcev.taskmaster.controller;

import com.andredavcev.taskmaster.controller.http.AuthenticationRequest;
import com.andredavcev.taskmaster.controller.http.AuthenticationResponse;
import com.andredavcev.taskmaster.controller.http.RegisterRequest;
import com.andredavcev.taskmaster.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public  ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.login(request));
    }

}
