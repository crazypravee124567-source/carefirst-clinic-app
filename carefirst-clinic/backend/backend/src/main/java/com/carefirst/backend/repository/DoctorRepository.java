package com.carefirst.backend.repository;

import com.carefirst.backend.entity.Doctor;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query("""
            select d from Doctor d
            where d.active = true
              and (:department = '' or d.department.slug = :department)
              and d.ratingAverage >= :minRating
              and d.consultationFee <= :maxFee
              and (:featuredOnly = false or d.featured = true)
              and (lower(d.name) like :pattern
                   or lower(d.title) like :pattern
                   or lower(d.department.name) like :pattern
                   or exists (select 1 from DoctorTag t
                              where t.doctor = d and lower(t.tag) like :pattern))
            order by d.name
            """)
    List<Doctor> search(
            @Param("department") String department,
            @Param("pattern") String pattern,
            @Param("minRating") double minRating,
            @Param("maxFee") BigDecimal maxFee,
            @Param("featuredOnly") boolean featuredOnly);
}
