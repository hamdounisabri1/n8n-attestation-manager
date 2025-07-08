package tn.esprit.attestationservice.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.attestationservice.entity.Student;
import tn.esprit.attestationservice.repository.IStudentRepository;

@Service
public class StudentService implements IStudentService {
    @Autowired
    private IStudentRepository studentRepository;


    @Override
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }
}
