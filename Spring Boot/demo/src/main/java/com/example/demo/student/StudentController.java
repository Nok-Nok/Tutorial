package com.example.demo.student;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/*
RestController annotation is used to indicate that:
    * the class StudentController defines a Spring MVC controller (handle CRUD request)
    * the methods' return value to the web response body.
It combines the functionality of `Controller` and `ResponseBody`
 */
@RestController
/*
RequestMapping annotation is used at class level to specify the base URI path for all the endpoints in this
controller
This means that the StudentController would be invoked if we access route: localhost:8080/api/v1/student
 */
@RequestMapping(path = "api/v1/student")
public class StudentController {
    /*
    Declares an instance variable `studentSesrvice` with both `private` and `final` access modifiers.
    `private:` It restricts the access to this variable to within the class only. It's encapsulated to prevent direct
     access from outside the class => need to have a getter to access this information
     `final:` This means that the variable's value cannot be changed after it's assigned int eh constructor. it's
     used to make sure variable remains constant after the initialization.
     `StudentService:` this means the variable `studentService` has a data type of `StudentService`, which entails of
      having the method getStudent.
     */
    private final StudentService studentService;

    /*
    This is the constructor of StudentController class. It takes a parameter type `StudentService` and
    assign it to `studentService` instance variable.
    This is a form of dependency injection where `StudentService` is injected into the controller class when an
    instance is created.
    Remember `studentService` is private to this class and its value is final after being initialized within the
    constructor.
     */
    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }
    /*
    `getMapping` annotation is used to specify that the following method handle GET request
     */
    @GetMapping
    /*
    getStudents: returns a list/array of Student objects if there is a GET request to this endpoint
     */
    public List<Student> getStudents(){
        /*
        Note: for this one, we can omit the `this` keyword since we know we are trying to access the current
        instance variable. Inside the construct, parameter name is also the same name as instance variable, so we
        need to use this to avoid ambiguity.
        We can still say `return this.studentService.getStudents()` without any negative effect.
         */
        return studentService.getStudents();
    }

    @PostMapping
    /*
    registerNewStudent: take in a Student object from the RequestBody and save that Student entity in the Database
     */
    public void registerNewStudent (@RequestBody Student student){
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    /*
    deleteStudent: delete a student from DB with the given ID
     */
    public void deleteStudent(@PathVariable("studentId") Long studentId){
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    /*
    updateStudent: update the student dob and email
     */
    public void updateStudent(
            @PathVariable("studentId") Long studentId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email){
        studentService.updateStudent(studentId, name, email);
    }
}
