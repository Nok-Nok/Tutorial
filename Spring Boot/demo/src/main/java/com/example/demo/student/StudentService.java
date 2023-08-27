package com.example.demo.student;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class StudentService {
    /*
    Perform dependency injection of StudentRepository into StudentService
    Ensure studentRepository is private and final inside StudentService. No other class should be able to
    access/modify this repo unless using methods of StudentService.
     */
    private final StudentRepository studentRepository;
    @Autowired
    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }
    //  GET Request
    //	getStudents returns a list/array of student => which is invoked for getStudents in StudentController
    public List<Student> getStudents(){
        return studentRepository.findAll();
    }

    // POST Request:
    public void addNewStudent(Student student){
        System.out.println(student);
        // Find corresponding student with the given email
        Optional<Student> studentByEmail = studentRepository.findStudentByEmail(student.getEmail());
        // If found a student with the given email, throw Error
        if (studentByEmail.isPresent()) {
            throw new IllegalStateException("Email has been taken");
        }
        // Else save the student entity
        studentRepository.save(student);
    }

    // DELETE Request:
    public void deleteStudent(Long studentId){
        //  If studentId does not exist, throw an error
        if (!studentRepository.existsById((studentId))){
            throw new IllegalStateException("Student w/ id " + studentId + " does not exist in DB");
        }
        // Else delete the student
        studentRepository.deleteById(studentId);
    }

    // PUT Request:
    @Transactional
    public void updateStudent(Long studentId, String name, String email){
        Student student = studentRepository.findById(studentId).orElseThrow(()->new IllegalStateException("Student w/" +
                " id " + studentId + " does not exist in DB"));

        // Update name if given name is valid
        System.out.println(name);
        if (name != null && !name.isEmpty() && !Objects.equals(student.getName(),name)){
            student.setName(name);
        }

        // Update email if given email is valid
        if (email !=null && !email.isEmpty() && !Objects.equals(student.getEmail(),email)){
            Optional<Student> studentByEmail = studentRepository.findStudentByEmail(email);
            if (studentByEmail.isPresent()){
                throw new IllegalStateException("Email has been taken");
            }
            student.setEmail(email);
        }
    }
}
