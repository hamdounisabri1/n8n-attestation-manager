package tn.esprit.attestationservice.service;

import tn.esprit.attestationservice.entity.Student;

import java.util.List;

public interface IStudentService {

    Student addStudent(Student student);
    List<Student> getAllStudents();
    Student getStudentById(Long id);
    Student updateStudent(Long id, Student student);
    String deleteStudent(Long id);
    List<Student> addStudents(List<Student> students); // Add multiple students
    Long getStudentIDByStudentID(String studentId);
}
