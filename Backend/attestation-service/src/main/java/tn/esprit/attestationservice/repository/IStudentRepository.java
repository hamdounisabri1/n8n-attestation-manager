package tn.esprit.attestationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.attestationservice.entity.Student;

public interface IStudentRepository extends JpaRepository<Student, Long> {
}
