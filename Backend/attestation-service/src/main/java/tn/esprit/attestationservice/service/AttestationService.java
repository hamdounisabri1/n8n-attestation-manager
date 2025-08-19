package tn.esprit.attestationservice.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.attestationservice.entity.Attestation;
import tn.esprit.attestationservice.entity.AttestationStatus;
import tn.esprit.attestationservice.entity.Student;
import tn.esprit.attestationservice.repository.IAttestationRepository;
import tn.esprit.attestationservice.repository.IStudentRepository;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class AttestationService implements IAttestationService {

    @Autowired
    private IAttestationRepository attestationRepository;

    @Autowired
    private IStudentRepository studentRepository;

    private static final String PREFIX = "REF";
    private static final int CODE_LENGTH = 6;

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
    public Attestation createAttestation() {
        Attestation attestation = new Attestation();
        attestation.setStatus(AttestationStatus.PENDING); // default status
        attestation.setRefCode(generateNextRefCode());
        return attestationRepository.save(attestation);
    }

    // synchronized ensures thread safety
    public synchronized String generateNextRefCode() {
        Attestation last = attestationRepository.findTopByOrderByIdDesc();

        if (last == null || last.getRefCode() == null) {
            return PREFIX + String.format("%0" + CODE_LENGTH + "d", 1);
        }

        String lastCode = last.getRefCode().replace(PREFIX, "");
        int nextNumber = Integer.parseInt(lastCode) + 1;

        if (nextNumber > 999999) {
            throw new RuntimeException("Maximum refCode reached!");
        }

        return PREFIX + String.format("%0" + CODE_LENGTH + "d", nextNumber);
    }

    @Override
    public Attestation createAttestationForStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
        Attestation attestation = new Attestation();
        attestation.setStudent(student);
        attestation.setRefCode(generateNextRefCode());
        attestation.setStatus(AttestationStatus.PENDING);
        return attestationRepository.save(attestation);
    }

    @Override
    public Attestation updateStatus(Long id, AttestationStatus status) {
        Attestation attestation = getAttestationById(id);

        attestation.setStatus(status);

        if (status == AttestationStatus.DELIVERED) {
            LocalDate today = LocalDate.now(ZoneOffset.UTC);
            Date date = Date.from(today.atStartOfDay(ZoneOffset.UTC).toInstant());
            attestation.setDeliveryDate(date);
        }

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
