package com.example.demo.student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

/*
`Configuration` - Spring Framework - marks a class a source of Bean definition
 */
@Configuration
public class StudentConfig {
    /*
    `Bean` - Spring Framework - indicates the method produces a bean to be manages by the Spring Container
    `CommandLineRunner` - Spring Framework - an interface that if overrun, the method inside will be executed
    automatically when the Spring application context starts up.
    => When this application is run, we automatically load 2 Student entity into the StudentRepository
    => Initialize the DB
     */
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository){
        return args -> {
            // Create 2 Student objects (ID is created by default with PostgreSQL)
            Student mariam = new Student(
                    "Mariam",
                    "mariam@jmail.com",
                    LocalDate.of(2000, Month.JANUARY, 5));
            Student alex = new Student(
                    "Alex",
                    "alex@jmail.com",
                    LocalDate.of(2004, Month.JANUARY, 5));

            // Save a list of student object in the Student Repo
            studentRepository.saveAll(List.of(mariam,alex));
        };
    };
}
