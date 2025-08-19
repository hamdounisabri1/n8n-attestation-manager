package tn.esprit.attestationservice.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.attestationservice.entity.Student;
import tn.esprit.attestationservice.repository.IStudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService implements IStudentService {
    @Autowired
    private IStudentRepository studentRepository;


    @Override
    public Student addStudent(Student student) {
        student.setAttestationsCount(0);
        return studentRepository.save(student);
    }
    @Override
    public List<Student> addStudents(List<Student> students) {
        students.forEach(s -> s.setAttestationsCount(0));
        return studentRepository.saveAll(students);
    }

    public Long getStudentIDByStudentID(String studentId) {
        Student student = studentRepository.findByStudentId(studentId);
        if (student == null) {
            return 0L; // Student not found
        }
        return student.getId();
    }


    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public Student updateStudent(Long id, Student studentDetails) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setFullName(studentDetails.getFullName());
            student.setEmail(studentDetails.getEmail());
            student.setStudentId(studentDetails.getStudentId());
            student.setStudentClass(studentDetails.getStudentClass());
            return studentRepository.save(student);
        } else {
            return null;
        }
    }

    @Override
    public String deleteStudent(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isEmpty()) {
            return "Student not found";
        }
        try {
            studentRepository.deleteById(id);
            return "Student successfully deleted";
        } catch (Exception e) {
            return "Error deleting student";
        }
    }
}
