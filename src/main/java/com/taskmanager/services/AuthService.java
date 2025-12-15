package com.taskmanager.services;

import com.taskmanager.dtos.LoginRequest;
import com.taskmanager.dtos.LoginResponse;
import com.taskmanager.dtos.RegisterRequest;
import com.taskmanager.models.User;
import com.taskmanager.repositories.UserRepository;
import com.taskmanager.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public LoginResponse register(RegisterRequest registerRequest) {
        try {
            logger.info("Registration attempt for email: {}", registerRequest.getEmail());
            
            // Check if user already exists
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                logger.warn("Registration failed - email already exists: {}", registerRequest.getEmail());
                throw new RuntimeException("Email already registered");
            }
            
            // Create new user
            User user = new User();
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            
            userRepository.save(user);
            logger.info("User registered successfully: {}", registerRequest.getEmail());
            
            // Generate token and return
            String token = jwtUtil.generateToken(user.getEmail());
            return new LoginResponse(token, user.getEmail());
        } catch (Exception e) {
            logger.error("Registration error for email {}: {}", registerRequest.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }
    
    public LoginResponse login(LoginRequest loginRequest) {
        try {
            logger.info("Login attempt for email: {}", loginRequest.getEmail());
            
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
            
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            String token = jwtUtil.generateToken(user.getEmail());
            
            logger.info("Login successful for email: {}", loginRequest.getEmail());
            return new LoginResponse(token, user.getEmail());
        } catch (AuthenticationException e) {
            logger.error("Login failed for email {}: {}", loginRequest.getEmail(), e.getMessage());
            throw new RuntimeException("Invalid credentials");
        }
    }
}
