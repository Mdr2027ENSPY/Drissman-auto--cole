package com.gestiondrivingschool.backend.controller;

import com.gestiondrivingschool.backend.model.School;
import com.gestiondrivingschool.backend.repository.SchoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schools")
@CrossOrigin(origins = "http://localhost:3000")
public class SchoolController {

    @Autowired
    private SchoolRepository schoolRepository;

    @GetMapping
    public List<School> getAllSchools(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String licenseType
    ) {
        if (city != null && licenseType != null) {
            return schoolRepository.findByCityAndLicenseTypesContaining(city, licenseType);
        } else if (city != null) {
            return schoolRepository.findByCity(city);
        } else if (licenseType != null) {
            return schoolRepository.findByLicenseTypesContaining(licenseType);
        }
        return schoolRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<School> getSchoolById(@PathVariable Long id) {
        return schoolRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public School createSchool(@RequestBody School school) {
        return schoolRepository.save(school);
    }

    @PutMapping("/{id}")
    public ResponseEntity<School> updateSchool(@PathVariable Long id, @RequestBody School schoolDetails) {
        return schoolRepository.findById(id)
                .map(school -> {
                    school.setName(schoolDetails.getName());
                    school.setAddress(schoolDetails.getAddress());
                    school.setCity(schoolDetails.getCity());
                    school.setPhone(schoolDetails.getPhone());
                    school.setEmail(schoolDetails.getEmail());
                    school.setDescription(schoolDetails.getDescription());
                    school.setRating(schoolDetails.getRating());
                    school.setPriceMin(schoolDetails.getPriceMin());
                    school.setPriceMax(schoolDetails.getPriceMax());
                    school.setLicenseTypes(schoolDetails.getLicenseTypes());
                    school.setImageUrl(schoolDetails.getImageUrl());
                    return ResponseEntity.ok(schoolRepository.save(school));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchool(@PathVariable Long id) {
        return schoolRepository.findById(id)
                .map(school -> {
                    schoolRepository.delete(school);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
