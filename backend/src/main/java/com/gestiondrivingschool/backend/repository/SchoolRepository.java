package com.gestiondrivingschool.backend.repository;

import com.gestiondrivingschool.backend.model.School;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SchoolRepository extends JpaRepository<School, Long> {
    List<School> findByCity(String city);
    List<School> findByLicenseTypesContaining(String licenseType);
    List<School> findByCityAndLicenseTypesContaining(String city, String licenseType);
}
