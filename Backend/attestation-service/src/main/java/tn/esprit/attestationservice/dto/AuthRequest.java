package tn.esprit.attestationservice.dto;

import lombok.*;

@Data

public class AuthRequest {
    private String username;
    private String password;
}
