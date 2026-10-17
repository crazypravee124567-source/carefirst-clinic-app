package com.carefirst.backend.service;

import com.carefirst.backend.dto.ClinicResponse;
import com.carefirst.backend.exception.NotFoundException;
import com.carefirst.backend.repository.ClinicRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClinicService {

    private final ClinicRepository clinicRepository;

    public ClinicService(ClinicRepository clinicRepository) {
        this.clinicRepository = clinicRepository;
    }

    @Transactional(readOnly = true)
    public ClinicResponse get() {
        return clinicRepository.findFirstByOrderByIdAsc()
                .map(ClinicResponse::from)
                .orElseThrow(() -> new NotFoundException("Clinic is not set up"));
    }
}
