package com.carefirst.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;

@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "booking_code", nullable = false, unique = true, length = 15)
    private String bookingCode;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @Column(name = "patient_name", nullable = false)
    private String patientName;

    @Column(name = "patient_phone", nullable = false, length = 20)
    private String patientPhone;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private LocalTime appointmentTime;

    @Column(nullable = false, length = 20)
    private String status;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    // Hibernate needs this no-argument constructor to build objects from
    // result sets. It must be non-private but is never called by your code.
    protected Appointment() {
    }


    // The ONLY way to create a valid appointment — the service calls this.
    // bookingCode comes first because it must exist at construction time.
    public Appointment(String bookingCode, Doctor doctor,
                       String patientName, String patientPhone,
                       LocalDate appointmentDate, LocalTime appointmentTime,
                       OffsetDateTime createdAt) {
        this.bookingCode = bookingCode;
        this.doctor = doctor;
        this.patientName = patientName;
        this.patientPhone = patientPhone;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.createdAt = createdAt;
        this.status = "BOOKED";
    }

    // Cancelling changes state in ONE place instead of scattered setters.
    public void cancel(String reason) {
        this.status = "CANCELLED";
        this.cancelReason = reason;
    }

    public boolean isBooked() {
        return "BOOKED".equals(status);
    }

    public void updateStatus(String status) {
        this.status = status;
        if (!"CANCELLED".equals(status)) {
            this.cancelReason = null;
        }
    }

    public Long getId() { return id; }
    public String getBookingCode() { return bookingCode; }
    public Doctor getDoctor() { return doctor; }
    public String getPatientName() { return patientName; }
    public String getPatientPhone() { return patientPhone; }
    public LocalDate getAppointmentDate() { return appointmentDate; }
    public LocalTime getAppointmentTime() { return appointmentTime; }
    public String getStatus() { return status; }
    public String getCancelReason() { return cancelReason; }
    public OffsetDateTime getCreatedAt() { return createdAt; }
}
