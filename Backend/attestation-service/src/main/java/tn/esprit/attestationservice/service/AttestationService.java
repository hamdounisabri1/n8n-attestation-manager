package tn.esprit.attestationservice.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.attestationservice.entity.Attestation;
import tn.esprit.attestationservice.entity.AttestationStatus;
import tn.esprit.attestationservice.entity.Student;
import tn.esprit.attestationservice.repository.IAttestationRepository;
import tn.esprit.attestationservice.repository.IStudentRepository;

import java.util.List;

@Service
public class AttestationService implements IAttestationService {

    @Autowired
    private IAttestationRepository attestationRepository;

    @Autowired
    private IStudentRepository studentRepository;

    @Override
    public List<Attestation> getAllAttestations() {
        return attestationRepository.findAll();
    }

    @Override
    public Attestation getAttestationById(Long id) {
        return attestationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attestation not found with ID: " + id));
    }

    @Override
    public Attestation createAttestation(Attestation attestation) {
        attestation.setStatus(AttestationStatus.PENDING); // default status
        return attestationRepository.save(attestation);
    }

    @Override
    public Attestation createAttestationForStudent(Long studentId, Attestation attestation) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        attestation.setStudent(student);
        attestation.setStatus(AttestationStatus.PENDING);
        return attestationRepository.save(attestation);
    }

    @Override
    public Attestation updateStatus(Long id, AttestationStatus status) {
        Attestation attestation = getAttestationById(id);
        attestation.setStatus(status);
        return attestationRepository.save(attestation);
    }

    @Override
    public String deleteAttestation(Long id) {
        if (!attestationRepository.existsById(id)) {
            return "Attestation not found";
        }
        try {
            attestationRepository.deleteById(id);
            return "Successfully deleted";
        } catch (Exception e) {
            return "Error deleting attestation";
        }
    }

}
