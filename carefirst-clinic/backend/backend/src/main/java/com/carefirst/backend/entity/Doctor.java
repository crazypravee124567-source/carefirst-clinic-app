package com.carefirst.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(nullable = false)
    private String name;

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;

    @Column(nullable = false)
    private String title;

    private String photoUrl;

    @Column(nullable = false)
    private Integer yearsExperience;

    @Column(nullable = false)
    private BigDecimal consultationFee;

    @Column(nullable = false)
    private Double ratingAverage;

    @Column(nullable = false)
    private Integer ratingCount;

    private boolean boardCertified;

    @Column(nullable = false)
    private String visitType;

    private String room;

    private boolean featured;

    private boolean active;

    @OneToMany(mappedBy = "doctor")
    @OrderBy("id ASC")
    private List<DoctorTag> tags = new ArrayList<>();

    protected Doctor() {
    }

    public Doctor(Department department, String name, String licenseNumber, String title) {
        this.department = department;
        this.name = name;
        this.licenseNumber = licenseNumber;
        this.title = title;
        this.yearsExperience = 0;
        this.consultationFee = BigDecimal.ZERO;
        this.ratingAverage = 0.0;
        this.ratingCount = 0;
        this.boardCertified = false;
        this.visitType = "In-Person";
        this.featured = false;
        this.active = true;
    }

    public Long getId() { return id; }
    public Department getDepartment() { return department; }
    public String getName() { return name; }
    public String getLicenseNumber() { return licenseNumber; }
    public String getTitle() { return title; }
    public String getPhotoUrl() { return photoUrl; }
    public Integer getYearsExperience() { return yearsExperience; }
    public BigDecimal getConsultationFee() { return consultationFee; }
    public Double getRatingAverage() { return ratingAverage; }
    public Integer getRatingCount() { return ratingCount; }
    public boolean isBoardCertified() { return boardCertified; }
    public String getVisitType() { return visitType; }
    public String getRoom() { return room; }
    public boolean isFeatured() { return featured; }
    public boolean isActive() { return active; }
    public List<DoctorTag> getTags() { return tags; }

    public void setActive(boolean active) { this.active = active; }
}
