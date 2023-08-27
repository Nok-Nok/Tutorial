package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
Repository annotation is used to indicate an interface is a repository, which is responsible for database interaction.
Spring Data JPA allow us to interact w/ the DB without writing code. This is good for small application that does not
 have joint table
 => extends from JpaRepository, so we can inherit the CRUD method from this library
 => JpaRepository need the Template (Student) and data type of the primary key (Long id)

 StudentRepository interface is a repository of Student Entity
 */
@Repository //This interface is for DATABASE/Repository interaction
public interface StudentRepository extends JpaRepository<Student, Long> {
    // SELECT * FROM student WHERE email = ?
    // @Query("SELECT s FROM Student s WHERE s.email = ?1")
    Optional<Student> findStudentByEmail(String email);
}
