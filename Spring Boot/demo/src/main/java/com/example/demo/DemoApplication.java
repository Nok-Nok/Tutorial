package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
/*
* Next Task:
* Create a student class with name, email, dob, age
* Save it to the PostgreSQL DB
*/

/*
Next task:
Create a class that will take care of the API layer that will do CRUD functionality
GET/POST/PUT/DELETE
 */
/*
Next Task:
Create service layer to handle business logics
 */
/*
Next Task:
Configure the teh Data Access layer and connect to POSTGRESQL DB
Store the student information into the DB and get it back out
 */