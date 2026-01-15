package com.gestiondrivingschool.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String address;
    private String city;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    // Enum for Role inside the class or separate
    public enum UserRole {
        STUDENT,
        SCHOOL
    }
}
