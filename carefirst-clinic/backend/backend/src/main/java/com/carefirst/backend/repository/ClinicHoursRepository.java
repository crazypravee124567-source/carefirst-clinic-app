package com.carefirst.backend.repository;

import com.carefirst.backend.entity.ClinicHours;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicHoursRepository extends JpaRepository<ClinicHours, Long> {

    List<ClinicHours> findAllByOrderByDayOfWeekAsc();
}
