package tn.esprit.attestationservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.attestationservice.entity.Attestation;
import tn.esprit.attestationservice.entity.AttestationStatus;
import tn.esprit.attestationservice.service.IAttestationService;

import java.util.List;

@RestController
@RequestMapping("/attestations")
@CrossOrigin(origins = "http://localhost:4200")
public class AttestationController {

    @Autowired
    private IAttestationService attestationService;

    @GetMapping("/all")
    public List<Attestation> getAll() {
        return attestationService.getAllAttestations();
    }

    @GetMapping("/{id}")
    public Attestation getById(@PathVariable Long id) {
        return attestationService.getAttestationById(id);
    }

    @PostMapping("/create")
    public Attestation create() {
        return attestationService.createAttestation();
    }

    @PostMapping("/create/student/{studentId}")
    public Attestation createForStudent(@PathVariable Long studentId) {
        return attestationService.createAttestationForStudent(studentId);
    }

    @PatchMapping("/{id}/status")
    public Attestation updateStatus(@PathVariable Long id, @RequestParam AttestationStatus status) {
        return attestationService.updateStatus(id, status);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttestation(@PathVariable Long id) {
        String result = attestationService.deleteAttestation(id);

        switch (result) {
            case "Attestation not found":
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
            case "Successfully deleted":
                return ResponseEntity.ok(result);
            default:
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }



}
