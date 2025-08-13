package tn.esprit.attestationservice.service;

import tn.esprit.attestationservice.entity.Attestation;
import tn.esprit.attestationservice.entity.AttestationStatus;

import java.util.List;

public interface IAttestationService {
    List<Attestation> getAllAttestations();

    Attestation getAttestationById(Long id);

    Attestation createAttestation(Attestation attestation);

    Attestation createAttestationForStudent(Long studentId, Attestation attestation);

    Attestation updateStatus(Long id, AttestationStatus status);

    String deleteAttestation(Long id);
}
