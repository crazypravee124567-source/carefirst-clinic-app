package com.carefirst.backend.repository;

import com.carefirst.backend.entity.DoctorSchedule;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    List<DoctorSchedule> findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(Long doctorId, Integer dayOfWeek);

    List<DoctorSchedule> findAllByDoctorId(Long doctorId);

    void deleteAllByDoctorId(Long doctorId);
}
