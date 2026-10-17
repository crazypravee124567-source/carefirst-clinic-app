package com.carefirst.backend.service;

import com.carefirst.backend.dto.AdminAppointmentRequest;
import com.carefirst.backend.dto.AdminAppointmentResponse;
import com.carefirst.backend.dto.AdminDoctorRequest;
import com.carefirst.backend.dto.AdminScheduleRequest;
import com.carefirst.backend.dto.AdminScheduleResponse;
import com.carefirst.backend.entity.Appointment;
import com.carefirst.backend.entity.Department;
import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorSchedule;
import com.carefirst.backend.exception.ConflictException;
import com.carefirst.backend.exception.NotFoundException;
import com.carefirst.backend.repository.AppointmentRepository;
import com.carefirst.backend.repository.DepartmentRepository;
import com.carefirst.backend.repository.DoctorRepository;
import com.carefirst.backend.repository.DoctorScheduleRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {
    private static final List<String> STATUSES = List.of("BOOKED", "IN_PROGRESS", "DONE", "CANCELLED");

    private final AppointmentRepository appointments;
    private final DoctorRepository doctors;
    private final DepartmentRepository departments;
    private final DoctorScheduleRepository schedules;
    private final AppointmentService appointmentService;

    public AdminService(AppointmentRepository appointments, DoctorRepository doctors,
                        DepartmentRepository departments, DoctorScheduleRepository schedules,
                        AppointmentService appointmentService) {
        this.appointments = appointments;
        this.doctors = doctors;
        this.departments = departments;
        this.schedules = schedules;
        this.appointmentService = appointmentService;
    }

    @Transactional(readOnly = true)
    public List<AdminAppointmentResponse> appointments(String search, Long doctorId,
                                                       String status, java.time.LocalDate date) {
        String term = search == null ? "" : search.trim().toLowerCase(Locale.ROOT);
        return (date == null ? appointments.findAllByOrderByAppointmentDateAscAppointmentTimeAsc()
                        : appointments.findAllByAppointmentDateOrderByAppointmentTimeAsc(date))
                .stream()
                .filter(a -> doctorId == null || a.getDoctor().getId().equals(doctorId))
                .filter(a -> status == null || status.isBlank() || a.getStatus().equalsIgnoreCase(status))
                .filter(a -> term.isBlank()
                        || a.getPatientName().toLowerCase(Locale.ROOT).contains(term)
                        || a.getPatientPhone().contains(term)
                        || a.getBookingCode().toLowerCase(Locale.ROOT).contains(term))
                .map(AdminAppointmentResponse::from)
                .toList();
    }

    @Transactional
    public AdminAppointmentResponse createWalkIn(AdminAppointmentRequest request) {
        var response = appointmentService.book(new com.carefirst.backend.dto.AppointmentRequest(
                request.doctorId(), request.patientName(), request.patientPhone(),
                request.date(), request.time()));
        Appointment saved = appointments.findByBookingCode(response.bookingCode())
                .orElseThrow(() -> new NotFoundException("Created appointment could not be loaded"));
        return AdminAppointmentResponse.from(saved);
    }

    @Transactional
    public AdminAppointmentResponse updateStatus(Long id, String status) {
        String normalized = status.trim().toUpperCase(Locale.ROOT);
        if (!STATUSES.contains(normalized)) {
            throw new ConflictException("Unsupported appointment status");
        }
        Appointment appointment = appointments.findById(id)
                .orElseThrow(() -> new NotFoundException("Appointment not found"));
        if ("CANCELLED".equals(normalized)) {
            appointment.cancel("Cancelled by clinic staff");
        } else {
            appointment.updateStatus(normalized);
        }
        return AdminAppointmentResponse.from(appointments.save(appointment));
    }

    @Transactional
    public Doctor createDoctor(AdminDoctorRequest request) {
        String specialization = request.specialization().trim();
        Department department = departments.findAll().stream()
                .filter(d -> specialization.toLowerCase(Locale.ROOT).contains(
                        d.getName().toLowerCase(Locale.ROOT)))
                .findFirst()
                .orElseThrow(() -> new NotFoundException("No department matches the specialization"));
        if (doctors.findAll().stream().anyMatch(d -> d.getLicenseNumber().equalsIgnoreCase(request.license().trim()))) {
            throw new ConflictException("A doctor with that license already exists");
        }
        return doctors.save(new Doctor(department, request.name().trim(), request.license().trim(), specialization));
    }

    @Transactional
    public Doctor toggleDoctor(Long id) {
        Doctor doctor = doctors.findById(id)
                .orElseThrow(() -> new NotFoundException("Doctor not found"));
        doctor.setActive(!doctor.isActive());
        return doctors.save(doctor);
    }

    @Transactional(readOnly = true)
    public List<Doctor> doctors() {
        return doctors.findAll().stream().sorted(Comparator.comparing(Doctor::getName)).toList();
    }

    @Transactional(readOnly = true)
    public List<AdminScheduleResponse> getSchedule(Long doctorId) {
        requireDoctor(doctorId);
        return schedules.findAllByDoctorId(doctorId).stream()
                .sorted(Comparator.comparing(DoctorSchedule::getDayOfWeek)
                        .thenComparing(DoctorSchedule::getStartTime))
                .map(AdminScheduleResponse::from).toList();
    }

    @Transactional
    public List<AdminScheduleResponse> replaceSchedule(Long doctorId, AdminScheduleRequest request) {
        Doctor doctor = requireDoctor(doctorId);
        schedules.deleteAllByDoctorId(doctorId);
        List<DoctorSchedule> saved = request.days().stream()
                .map(day -> new DoctorSchedule(doctor, day.dayOfWeek(), day.startTime(),
                        day.endTime(), day.slotMinutes()))
                .toList();
        return schedules.saveAll(saved).stream().map(AdminScheduleResponse::from).toList();
    }

    private Doctor requireDoctor(Long id) {
        return doctors.findById(id).orElseThrow(() -> new NotFoundException("Doctor not found"));
    }
}
