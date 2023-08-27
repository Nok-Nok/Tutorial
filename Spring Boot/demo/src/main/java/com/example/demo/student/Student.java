package com.example.demo.student;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.Period;

/*
`Entity` annotation from JPA (Java Persistence API), indicating that objects of this class will be stored in the DB.
`Table` annotation is used to specify the details of the database table associated with the entity. In this case,
it's used without any attributes, which means that it uses the default table name (which is the same as the class
name : "Student").
 */
@Entity //Hibernate
@Table //Our Table
public class Student {
    /*
    `Id`: indicates `id` field is the primary key field of the `Student` entity
    `SequenceGenerator`: declares a sequence generator for the `id` field. It specifies the name of the generator,
    the name of the database sequence, and the allocation size.
    `GeneratedValue`: specifies how the primary key value `id` will be generated
    => Specify that `student_sequence` will be generated with strategy `GenerationType.SEQUENCE`
     */
    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long id;
    private String name;
    private String email;
    private LocalDate dob;
    @Transient
    // Saying this column will not need to be entered but calculated
    private Integer age;

    // CONSTRUCTOR
    public Student() {
    }

    public Student(Long id, String name, String email, LocalDate dob) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dob = dob;
    }

    public Student(String name, String email, LocalDate dob) {
        this.name = name;
        this.email = email;
        this.dob = dob;
    }

    // GETTER
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }

    // SETTER
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", dob=" + dob +
                ", age=" + age +
                '}';
    }
}
