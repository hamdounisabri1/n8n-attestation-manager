package tn.esprit.attestationservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tn.esprit.attestationservice.config.JwtUtil;
import tn.esprit.attestationservice.dto.AuthRequest;
import tn.esprit.attestationservice.dto.AuthResponse;
import tn.esprit.attestationservice.entity.AppUser;
import tn.esprit.attestationservice.entity.Roles;
import tn.esprit.attestationservice.repository.IUserRepository;
import tn.esprit.attestationservice.service.CustomUserDetailsService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200") // Add this line
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 🔐 Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // 1️⃣ First check if user exists (to control the 404 response)
            AppUser user = userRepository.findByUsername(request.getUsername());
            if (user == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "User not found"));
            }

            // 2️⃣ Attempt authentication
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            // 3️⃣ If successful, generate token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails.getUsername());
            return ResponseEntity.ok(new AuthResponse(jwt));

        } catch (BadCredentialsException ex) {
            // Wrong password case
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid password"));
        }
    }


    // 📝 Signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody AuthRequest request) {
        // Check if username already exists
        if (userRepository.findByUsername(request.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists.");
        }

        // Create and save user
        AppUser newUser = new AppUser();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(Roles.STAFF);

        userRepository.save(newUser);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully.");
    }
}
