package tn.esprit.attestationservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.attestationservice.entity.Student;
import tn.esprit.attestationservice.service.IStudentService;

@RestController
@RequestMapping("students")
public class StudentController {
    @Autowired
    private IStudentService studentService;

    @PostMapping("create")
    public Student createPayment(@RequestBody Student student) {
        return studentService.addStudent(student);
    }
}
