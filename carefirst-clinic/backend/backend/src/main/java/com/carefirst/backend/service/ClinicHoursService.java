package com.carefirst.backend.service;

import com.carefirst.backend.dto.ClinicHoursResponse;
import com.carefirst.backend.repository.ClinicHoursRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClinicHoursService {

    private final ClinicHoursRepository clinicHoursRepository;

    public ClinicHoursService(ClinicHoursRepository clinicHoursRepository) {
        this.clinicHoursRepository = clinicHoursRepository;
    }

    @Transactional(readOnly = true)
    public List<ClinicHoursResponse> listAll() {
        return clinicHoursRepository.findAllByOrderByDayOfWeekAsc().stream()
                .map(ClinicHoursResponse::from)
                .toList();
    }
}