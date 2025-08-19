package tn.esprit.attestationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.attestationservice.entity.Attestation;
import tn.esprit.attestationservice.entity.Student;

public interface IAttestationRepository extends JpaRepository<Attestation, Long> {
    Attestation findTopByOrderByIdDesc();
}
