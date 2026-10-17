package com.carefirst.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clinic")
public class Clinic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    private String smsNumber;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String district;

    private String parkingInfo;

    private String mapUrl;

    protected Clinic() {
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getSmsNumber() { return smsNumber; }
    public String getAddress() { return address; }
    public String getDistrict() { return district; }
    public String getParkingInfo() { return parkingInfo; }
    public String getMapUrl() { return mapUrl; }
}
