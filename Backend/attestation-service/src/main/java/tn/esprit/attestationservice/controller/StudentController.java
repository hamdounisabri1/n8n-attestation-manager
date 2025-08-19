package tn.esprit.attestationservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.attestationservice.entity.Student;
import tn.esprit.attestationservice.service.IStudentService;

import java.util.List;

@RestController
@RequestMapping("students")
public class StudentController {
    @Autowired
    private IStudentService studentService;

    @PostMapping("create")
    public Student createStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PostMapping("/createList")
    public List<Student> addStudents(@RequestBody List<Student> students) {
        return studentService.addStudents(students);
    }
    @GetMapping("getAll")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PutMapping("/update/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable Long id) {
        return studentService.deleteStudent(id);
    }

    @GetMapping("/by-student-id/{studentId}")
    public ResponseEntity<Long> getStudentDatabaseId(@PathVariable String studentId) {
        Long dbId = studentService.getStudentIDByStudentID(studentId);
        return ResponseEntity.ok(dbId);
    }
}
