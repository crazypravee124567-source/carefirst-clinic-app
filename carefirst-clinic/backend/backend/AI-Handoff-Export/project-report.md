# CareFirst Backend - AI Handover Report

## Project tree

src\main\java\com\carefirst\backend\BackendApplication.java
src\main\java\com\carefirst\backend\config\ClockConfig.java
src\main\java\com\carefirst\backend\config\CorsConfig.java
src\main\java\com\carefirst\backend\controller\ClinicController.java
src\main\java\com\carefirst\backend\controller\DepartmentController.java
src\main\java\com\carefirst\backend\controller\DoctorController.java
src\main\java\com\carefirst\backend\controller\HealthController.java
src\main\java\com\carefirst\backend\controller\SlotController.java
src\main\java\com\carefirst\backend\dto\ClinicHoursResponse.java
src\main\java\com\carefirst\backend\dto\ClinicResponse.java
src\main\java\com\carefirst\backend\dto\DayAvailabilityResponse.java
src\main\java\com\carefirst\backend\dto\DaySlotsResponse.java
src\main\java\com\carefirst\backend\dto\DepartmentResponse.java
src\main\java\com\carefirst\backend\dto\DoctorResponse.java
src\main\java\com\carefirst\backend\dto\SlotResponse.java
src\main\java\com\carefirst\backend\entity\Clinic.java
src\main\java\com\carefirst\backend\entity\ClinicHours.java
src\main\java\com\carefirst\backend\entity\Department.java
src\main\java\com\carefirst\backend\entity\Doctor.java
src\main\java\com\carefirst\backend\entity\DoctorSchedule.java
src\main\java\com\carefirst\backend\entity\DoctorTag.java
src\main\java\com\carefirst\backend\exception\ApiError.java
src\main\java\com\carefirst\backend\exception\ConflictException.java
src\main\java\com\carefirst\backend\exception\GlobalExceptionHandler.java
src\main\java\com\carefirst\backend\exception\NotFoundException.java
src\main\java\com\carefirst\backend\repository\ClinicHoursRepository.java
src\main\java\com\carefirst\backend\repository\ClinicRepository.java
src\main\java\com\carefirst\backend\repository\DepartmentRepository.java
src\main\java\com\carefirst\backend\repository\DoctorRepository.java
src\main\java\com\carefirst\backend\repository\DoctorScheduleRepository.java
src\main\java\com\carefirst\backend\service\ClinicHoursService.java
src\main\java\com\carefirst\backend\service\ClinicService.java
src\main\java\com\carefirst\backend\service\DepartmentService.java
src\main\java\com\carefirst\backend\service\DoctorService.java
src\main\java\com\carefirst\backend\service\SlotService.java
src\main\java\com\carefirst\backend\util\SlotGenerator.java
src\main\resources\application-dev.properties
src\main\resources\application-prod.properties
src\main\resources\application.properties
src\main\resources\db\migration\V1__baseline.sql
src\main\resources\db\migration\V2__create_department.sql
src\main\resources\db\migration\V3__create_clinic.sql
src\main\resources\db\migration\V4__create_clinic_hours.sql
src\main\resources\db\migration\V5__create_doctor.sql
src\main\resources\db\migration\V6__create_doctor_tag.sql
src\main\resources\db\migration\V7__create_doctor_schedule.sql
src\test\java\com\carefirst\backend\controller\HealthControllerTest.java
src\test\java\com\carefirst\backend\util\SlotGeneratorTest.java
src\test\java\service\SlotServiceTest.java

## Git status

## main...origin/main [ahead 7]
?? AI-Handoff-Export/
?? create-ai-handoff.ps1


## Recent commits

45a07fb phase 2 completed
23fbb4c phase 2 completed
771463d phase 1 completed
03c08ff doctor and doctors data
f736a6c doctor and doctors data


## Source files and documentation


### FILE: .gitignore

```
HELP.md
target/
.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/

```

### FILE: HELP.md

```
# Getting Started

### Reference Documentation

For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/4.1.1/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/4.1.1/maven-plugin/build-image.html)
* [Spring Data JPA](https://docs.spring.io/spring-boot/4.1.1/reference/data/sql.html#data.sql.jpa-and-spring-data)
* [Flyway Migration](https://docs.spring.io/spring-boot/4.1.1/how-to/data-initialization.html#howto.data-initialization.migration-tool.flyway)
* [Validation](https://docs.spring.io/spring-boot/4.1.1/reference/io/validation.html)
* [Spring Web](https://docs.spring.io/spring-boot/4.1.1/reference/web/servlet.html)

### Guides

The following guides illustrate how to use some features concretely:

* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Validation](https://spring.io/guides/gs/validating-form-input/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the
parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.


```

### FILE: pom.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>4.1.1</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.carefirst</groupId>
    <artifactId>backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>backend</name>
    <description>backend</description>
    <url/>
    <licenses>
        <license/>
    </licenses>
    <developers>
        <developer/>
    </developers>
    <scm>
        <connection/>
        <developerConnection/>
        <tag/>
        <url/>
    </scm>
    <properties>
        <java.version>21</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-flyway</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webmvc</artifactId>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-core</artifactId>
        </dependency>
        <dependency>
            <groupId>org.flywaydb</groupId>
            <artifactId>flyway-database-postgresql</artifactId>
        </dependency>


        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-flyway-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-webmvc-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

### FILE: src\main\java\com\carefirst\backend\BackendApplication.java

```
package com.carefirst.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}

```

### FILE: src\main\java\com\carefirst\backend\config\ClockConfig.java

```
package com.carefirst.backend.config;

import java.time.Clock;
import java.time.ZoneId;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ClockConfig {

    @Bean
    public Clock clock() {
        return Clock.system(ZoneId.of("Asia/Kolkata"));
    }
}

```

### FILE: src\main\java\com\carefirst\backend\config\CorsConfig.java

```
package com.carefirst.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(allowedOrigins.split(","))
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
                .allowedHeaders("*");
    }
}
```

### FILE: src\main\java\com\carefirst\backend\controller\ClinicController.java

```
package com.carefirst.backend.controller;

import com.carefirst.backend.dto.ClinicHoursResponse;
import com.carefirst.backend.dto.ClinicResponse;
import com.carefirst.backend.service.ClinicHoursService;
import com.carefirst.backend.service.ClinicService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clinic")
public class ClinicController {

    private final ClinicService clinicService;
    private final ClinicHoursService clinicHoursService;

    public ClinicController(ClinicService clinicService,
                            ClinicHoursService clinicHoursService) {
        this.clinicService = clinicService;
        this.clinicHoursService = clinicHoursService;
    }

    @GetMapping
    public ClinicResponse get() {
        return clinicService.get();
    }

    @GetMapping("/hours")
    public List<ClinicHoursResponse> hours() {
        return clinicHoursService.listAll();
    }
}

```

### FILE: src\main\java\com\carefirst\backend\controller\DepartmentController.java

```
package com.carefirst.backend.controller;

import com.carefirst.backend.dto.DepartmentResponse;
import com.carefirst.backend.service.DepartmentService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<DepartmentResponse> list() {
        return departmentService.listAll();
    }
}

```

### FILE: src\main\java\com\carefirst\backend\controller\DoctorController.java

```
package com.carefirst.backend.controller;

import com.carefirst.backend.dto.DoctorResponse;
import com.carefirst.backend.service.DoctorService;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public List<DoctorResponse> list(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) BigDecimal maxFee,
            @RequestParam(defaultValue = "false") boolean featured) {
        return doctorService.list(department, search, minRating, maxFee, featured);
    }
}

```

### FILE: src\main\java\com\carefirst\backend\controller\HealthController.java

```
package com.carefirst.backend.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }
}
```

### FILE: src\main\java\com\carefirst\backend\controller\SlotController.java

```
package com.carefirst.backend.controller;

import com.carefirst.backend.dto.DayAvailabilityResponse;
import com.carefirst.backend.dto.DaySlotsResponse;
import com.carefirst.backend.service.SlotService;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctors/{doctorId}")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    @GetMapping("/slots")
    public DaySlotsResponse slots(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return slotService.slotsForDay(doctorId, date);
    }

    @GetMapping("/availability")
    public List<DayAvailabilityResponse> availability(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM") YearMonth month) {
        return slotService.availability(doctorId, month);
    }
}

```

### FILE: src\main\java\com\carefirst\backend\dto\ClinicHoursResponse.java

```
package com.carefirst.backend.dto;

import com.carefirst.backend.entity.ClinicHours;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.Locale;

public record ClinicHoursResponse(
        Integer dayOfWeek,
        String dayName,
        LocalTime openTime,
        LocalTime closeTime,
        String note) {

    public static ClinicHoursResponse from(ClinicHours hours) {
        String dayName = DayOfWeek.of(hours.getDayOfWeek())
                .getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        return new ClinicHoursResponse(
                hours.getDayOfWeek(),
                dayName,
                hours.getOpenTime(),
                hours.getCloseTime(),
                hours.getNote());
    }
}

```

### FILE: src\main\java\com\carefirst\backend\dto\ClinicResponse.java

```
package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Clinic;

public record ClinicResponse(
        Long id,
        String name,
        String phone,
        String smsNumber,
        String address,
        String district,
        String parkingInfo,
        String mapUrl) {

    public static ClinicResponse from(Clinic clinic) {
        return new ClinicResponse(
                clinic.getId(),
                clinic.getName(),
                clinic.getPhone(),
                clinic.getSmsNumber(),
                clinic.getAddress(),
                clinic.getDistrict(),
                clinic.getParkingInfo(),
                clinic.getMapUrl());
    }
}

```

### FILE: src\main\java\com\carefirst\backend\dto\DayAvailabilityResponse.java

```
package com.carefirst.backend.dto;

import java.time.LocalDate;

public record DayAvailabilityResponse(
        LocalDate date,
        boolean past,
        boolean today,
        int availableSlots) {
}

```

### FILE: src\main\java\com\carefirst\backend\dto\DaySlotsResponse.java

```
package com.carefirst.backend.dto;

import java.time.LocalDate;
import java.util.List;

public record DaySlotsResponse(
        LocalDate date,
        int availableCount,
        List<SlotResponse> morning,
        List<SlotResponse> afternoon,
        List<SlotResponse> evening) {
}

```

### FILE: src\main\java\com\carefirst\backend\dto\DepartmentResponse.java

```
package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Department;

public record DepartmentResponse(Long id, String name, String slug) {

    public static DepartmentResponse from(Department department) {
        return new DepartmentResponse(
                department.getId(), department.getName(), department.getSlug());
    }
}

```

### FILE: src\main\java\com\carefirst\backend\dto\DoctorResponse.java

```
package com.carefirst.backend.dto;

import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorTag;
import java.math.BigDecimal;
import java.util.List;

public record DoctorResponse(
        Long id,
        String name,
        String title,
        String departmentName,
        String departmentSlug,
        String photoUrl,
        Integer yearsExperience,
        BigDecimal consultationFee,
        Double ratingAverage,
        Integer ratingCount,
        boolean boardCertified,
        String visitType,
        String room,
        boolean featured,
        List<String> tags) {

    public static DoctorResponse from(Doctor doctor) {
        return new DoctorResponse(
                doctor.getId(),
                doctor.getName(),
                doctor.getTitle(),
                doctor.getDepartment().getName(),
                doctor.getDepartment().getSlug(),
                doctor.getPhotoUrl(),
                doctor.getYearsExperience(),
                doctor.getConsultationFee(),
                doctor.getRatingAverage(),
                doctor.getRatingCount(),
                doctor.isBoardCertified(),
                doctor.getVisitType(),
                doctor.getRoom(),
                doctor.isFeatured(),
                doctor.getTags().stream().map(DoctorTag::getTag).toList());
    }
}

```

### FILE: src\main\java\com\carefirst\backend\dto\SlotResponse.java

```
package com.carefirst.backend.dto;

import java.time.LocalTime;

public record SlotResponse(LocalTime time, boolean available) {
}

```

### FILE: src\main\java\com\carefirst\backend\entity\Clinic.java

```
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

```

### FILE: src\main\java\com\carefirst\backend\entity\ClinicHours.java

```
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
import java.time.LocalTime;

@Entity
@Table(name = "clinic_hours")
public class ClinicHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @Column(nullable = false)
    private Integer dayOfWeek;

    private LocalTime openTime;

    private LocalTime closeTime;

    private String note;

    protected ClinicHours() {
    }

    public Long getId() { return id; }
    public Integer getDayOfWeek() { return dayOfWeek; }
    public LocalTime getOpenTime() { return openTime; }
    public LocalTime getCloseTime() { return closeTime; }
    public String getNote() { return note; }
}

```

### FILE: src\main\java\com\carefirst\backend\entity\Department.java

```
package com.carefirst.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    protected Department() {
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getSlug() { return slug; }
}

```

### FILE: src\main\java\com\carefirst\backend\entity\Doctor.java

```
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

    public Long getId() { return id; }
    public Department getDepartment() { return department; }
    public String getName() { return name; }
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
}

```

### FILE: src\main\java\com\carefirst\backend\entity\DoctorSchedule.java

```
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
import java.time.LocalTime;

@Entity
@Table(name = "doctor_schedule")
public class DoctorSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @Column(nullable = false)
    private Integer dayOfWeek;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private Integer slotMinutes;

    protected DoctorSchedule() {
    }

    public Long getId() { return id; }
    public Integer getDayOfWeek() { return dayOfWeek; }
    public LocalTime getStartTime() { return startTime; }
    public LocalTime getEndTime() { return endTime; }
    public Integer getSlotMinutes() { return slotMinutes; }
}

```

### FILE: src\main\java\com\carefirst\backend\entity\DoctorTag.java

```
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

@Entity
@Table(name = "doctor_tag")
public class DoctorTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @Column(nullable = false)
    private String tag;

    protected DoctorTag() {
    }

    public Long getId() { return id; }
    public String getTag() { return tag; }
}

```

### FILE: src\main\java\com\carefirst\backend\exception\ApiError.java

```
package com.carefirst.backend.exception;

import java.time.Instant;

public record ApiError(int status, String message, Instant timestamp) {
    public ApiError(int status, String message) {
        this(status, message, Instant.now());
    }
}
```

### FILE: src\main\java\com\carefirst\backend\exception\ConflictException.java

```
package com.carefirst.backend.exception;

public class ConflictException extends RuntimeException {
    public ConflictException(String message) {
        super(message);
    }
}
```

### FILE: src\main\java\com\carefirst\backend\exception\GlobalExceptionHandler.java

```
package com.carefirst.backend.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> notFound(NotFoundException e) {
        return ResponseEntity.status(404).body(new ApiError(404, e.getMessage()));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiError> unknownPath(NoResourceFoundException e) {
        return ResponseEntity.status(404).body(new ApiError(404, "Not found"));
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiError> conflict(ConflictException e) {
        return ResponseEntity.status(409).body(new ApiError(409, e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> invalid(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(f -> f.getField() + ": " + f.getDefaultMessage())
                .orElse("Invalid request");
        return ResponseEntity.badRequest().body(new ApiError(400, msg));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> badParameter(MethodArgumentTypeMismatchException e) {
        return ResponseEntity.badRequest()
                .body(new ApiError(400, "Invalid value for '" + e.getName() + "'"));
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiError> missingParameter(MissingServletRequestParameterException e) {
        return ResponseEntity.badRequest()
                .body(new ApiError(400, "Missing parameter '" + e.getParameterName() + "'"));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> unreadable(HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest()
                .body(new ApiError(400, "Request body is missing or malformed"));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiError> wrongMethod(HttpRequestMethodNotSupportedException e) {
        return ResponseEntity.status(405).body(new ApiError(405, "Method not allowed"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> unexpected(Exception e) {
        log.error("Unexpected error", e);
        return ResponseEntity.status(500)
                .body(new ApiError(500, "Something went wrong. Please try again."));
    }
}
```

### FILE: src\main\java\com\carefirst\backend\exception\NotFoundException.java

```
package com.carefirst.backend.exception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
```

### FILE: src\main\java\com\carefirst\backend\repository\ClinicHoursRepository.java

```
package com.carefirst.backend.repository;

import com.carefirst.backend.entity.ClinicHours;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicHoursRepository extends JpaRepository<ClinicHours, Long> {

    List<ClinicHours> findAllByOrderByDayOfWeekAsc();
}

```

### FILE: src\main\java\com\carefirst\backend\repository\ClinicRepository.java

```
package com.carefirst.backend.repository;

import com.carefirst.backend.entity.Clinic;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {

    Optional<Clinic> findFirstByOrderByIdAsc();
}
```

### FILE: src\main\java\com\carefirst\backend\repository\DepartmentRepository.java

```
package com.carefirst.backend.repository;

import com.carefirst.backend.entity.Department;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    List<Department> findAllByOrderByNameAsc();
}

```

### FILE: src\main\java\com\carefirst\backend\repository\DoctorRepository.java

```
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

```

### FILE: src\main\java\com\carefirst\backend\repository\DoctorScheduleRepository.java

```
package com.carefirst.backend.repository;

import com.carefirst.backend.entity.DoctorSchedule;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    List<DoctorSchedule> findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(Long doctorId, Integer dayOfWeek);

    List<DoctorSchedule> findAllByDoctorId(Long doctorId);
}

```

### FILE: src\main\java\com\carefirst\backend\service\ClinicHoursService.java

```
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
```

### FILE: src\main\java\com\carefirst\backend\service\ClinicService.java

```
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

```

### FILE: src\main\java\com\carefirst\backend\service\DepartmentService.java

```
package com.carefirst.backend.service;

import com.carefirst.backend.dto.DepartmentResponse;
import com.carefirst.backend.repository.DepartmentRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Transactional(readOnly = true)
    public List<DepartmentResponse> listAll() {
        return departmentRepository.findAllByOrderByNameAsc().stream()
                .map(DepartmentResponse::from)
                .toList();
    }
}
```

### FILE: src\main\java\com\carefirst\backend\service\DoctorService.java

```
package com.carefirst.backend.service;

import com.carefirst.backend.dto.DoctorResponse;
import com.carefirst.backend.repository.DoctorRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DoctorService {

    private static final BigDecimal NO_FEE_LIMIT = new BigDecimal("100000");

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Transactional(readOnly = true)
    public List<DoctorResponse> list(String department, String search,
                                     Double minRating, BigDecimal maxFee,
                                     boolean featuredOnly) {

        String departmentSlug = department == null ? "" : department.trim().toLowerCase(Locale.ROOT);
        String term = search == null ? "" : search.trim().toLowerCase(Locale.ROOT);
        String pattern = "%" + term + "%";
        double rating = minRating == null ? 0.0 : minRating;
        BigDecimal fee = maxFee == null ? NO_FEE_LIMIT : maxFee;

        return doctorRepository.search(departmentSlug, pattern, rating, fee, featuredOnly)
                .stream()
                .map(DoctorResponse::from)
                .toList();
    }
}

```

### FILE: src\main\java\com\carefirst\backend\service\SlotService.java

```
package com.carefirst.backend.service;

import com.carefirst.backend.dto.DayAvailabilityResponse;
import com.carefirst.backend.dto.DaySlotsResponse;
import com.carefirst.backend.dto.SlotResponse;
import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorSchedule;
import com.carefirst.backend.exception.NotFoundException;
import com.carefirst.backend.repository.DoctorRepository;
import com.carefirst.backend.repository.DoctorScheduleRepository;
import com.carefirst.backend.util.SlotGenerator;
import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SlotService {

    private static final LocalTime NOON = LocalTime.NOON;
    private static final LocalTime FOUR_PM = LocalTime.of(16, 0);

    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final Clock clock;

    public SlotService(DoctorRepository doctorRepository,
                       DoctorScheduleRepository scheduleRepository,
                       Clock clock) {
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.clock = clock;
    }

    @Transactional(readOnly = true)
    public DaySlotsResponse slotsForDay(Long doctorId, LocalDate date) {
        requireActiveDoctor(doctorId);

        List<DoctorSchedule> blocks = scheduleRepository
                .findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(doctorId, date.getDayOfWeek().getValue());
        List<LocalTime> times = availableTimes(blocks, date);

        return new DaySlotsResponse(
                date,
                times.size(),
                slots(times, t -> t.isBefore(NOON)),
                slots(times, t -> !t.isBefore(NOON) && t.isBefore(FOUR_PM)),
                slots(times, t -> !t.isBefore(FOUR_PM)));
    }

    @Transactional(readOnly = true)
    public List<DayAvailabilityResponse> availability(Long doctorId, YearMonth month) {
        requireActiveDoctor(doctorId);

        Map<Integer, List<DoctorSchedule>> blocksByWeekday = scheduleRepository
                .findAllByDoctorId(doctorId).stream()
                .collect(Collectors.groupingBy(DoctorSchedule::getDayOfWeek));
        LocalDate today = LocalDate.now(clock);

        List<DayAvailabilityResponse> days = new ArrayList<>();
        for (int day = 1; day <= month.lengthOfMonth(); day++) {
            LocalDate date = month.atDay(day);
            List<DoctorSchedule> blocks =
                    blocksByWeekday.getOrDefault(date.getDayOfWeek().getValue(), List.of());
            days.add(new DayAvailabilityResponse(
                    date,
                    date.isBefore(today),
                    date.equals(today),
                    availableTimes(blocks, date).size()));
        }
        return days;
    }

    private void requireActiveDoctor(Long doctorId) {
        doctorRepository.findById(doctorId)
                .filter(Doctor::isActive)
                .orElseThrow(() -> new NotFoundException("Doctor not found"));
    }

    private List<LocalTime> availableTimes(List<DoctorSchedule> blocks, LocalDate date) {
        LocalDate today = LocalDate.now(clock);
        if (date.isBefore(today)) {
            return List.of();
        }

        List<LocalTime> times = blocks.stream()
                .flatMap(block -> SlotGenerator
                        .generate(block.getStartTime(), block.getEndTime(), block.getSlotMinutes())
                        .stream())
                .sorted()
                .toList();

        if (date.equals(today)) {
            LocalTime now = LocalTime.now(clock);
            return times.stream().filter(time -> time.isAfter(now)).toList();
        }
        return times;
    }

    private List<SlotResponse> slots(List<LocalTime> times, Predicate<LocalTime> inGroup) {
        return times.stream()
                .filter(inGroup)
                .map(time -> new SlotResponse(time, true))
                .toList();
    }
}

```

### FILE: src\main\java\com\carefirst\backend\util\SlotGenerator.java

```
package com.carefirst.backend.util;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public final class SlotGenerator {

    private SlotGenerator() {
    }

    public static List<LocalTime> generate(LocalTime start, LocalTime end, int slotMinutes) {
        if (slotMinutes <= 0) {
            throw new IllegalArgumentException("slotMinutes must be positive");
        }

        int startMinute = start.getHour() * 60 + start.getMinute();
        int endMinute = end.getHour() * 60 + end.getMinute();

        List<LocalTime> slots = new ArrayList<>();
        for (int minute = startMinute; minute + slotMinutes <= endMinute; minute += slotMinutes) {
            slots.add(LocalTime.of(minute / 60, minute % 60));
        }
        return slots;
    }
}

```

### FILE: src\main\resources\db\migration\V1__baseline.sql

```
SELECT 1;
```

### FILE: src\main\resources\db\migration\V2__create_department.sql

```
CREATE TABLE department (
                            id   BIGSERIAL PRIMARY KEY,
                            name VARCHAR(100) NOT NULL UNIQUE,
                            slug VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO department (name, slug) VALUES
                                        ('Family Medicine', 'family-medicine'),
                                        ('Cardiology',      'cardiology'),
                                        ('Pediatrics',      'pediatrics'),
                                        ('Dermatology',     'dermatology'),
                                        ('Orthopedics',     'orthopedics'),
                                        ('Neurology',       'neurology');
```

### FILE: src\main\resources\db\migration\V3__create_clinic.sql

```
CREATE TABLE clinic (
                        id           BIGSERIAL PRIMARY KEY,
                        name         VARCHAR(150) NOT NULL,
                        phone        VARCHAR(50)  NOT NULL,
                        sms_number   VARCHAR(50),
                        address      VARCHAR(255) NOT NULL,
                        district     VARCHAR(150) NOT NULL,
                        parking_info VARCHAR(255),
                        map_url      VARCHAR(500)
);

INSERT INTO clinic (name, phone, sms_number, address, district, parking_info, map_url)
VALUES (
           'CareFirst Clinic',
           '(555) 234-2273',
           '(555) 382-4467',
           '482 Healthway Blvd, Suite 210',
           'Metro Health District',
           'Free parking, Level 1 Patient Garage',
           'https://www.google.com/maps/search/?api=1&query=482+Healthway+Blvd'
       );
```

### FILE: src\main\resources\db\migration\V4__create_clinic_hours.sql

```
CREATE TABLE clinic_hours (
                              id          BIGSERIAL PRIMARY KEY,
                              clinic_id   BIGINT  NOT NULL REFERENCES clinic (id),
                              day_of_week INTEGER NOT NULL,
                              open_time   TIME,
                              close_time  TIME,
                              note        VARCHAR(150)
);

INSERT INTO clinic_hours (clinic_id, day_of_week, open_time, close_time, note) VALUES
                                                                                   ((SELECT id FROM clinic ORDER BY id LIMIT 1), 1, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 2, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 3, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 4, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 5, '08:00', '19:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 6, '09:00', '15:00', NULL),
    ((SELECT id FROM clinic ORDER BY id LIMIT 1), 7, NULL,    NULL,    'Urgent triage on-call');
```

### FILE: src\main\resources\db\migration\V5__create_doctor.sql

```
CREATE TABLE doctor (
                        id               BIGSERIAL PRIMARY KEY,
                        department_id    BIGINT           NOT NULL REFERENCES department (id),
                        name             VARCHAR(150)     NOT NULL,
                        title            VARCHAR(150)     NOT NULL,
                        photo_url        VARCHAR(500),
                        years_experience INTEGER          NOT NULL,
                        consultation_fee NUMERIC(8, 2)    NOT NULL,
                        rating_average   DOUBLE PRECISION NOT NULL,
                        rating_count     INTEGER          NOT NULL,
                        board_certified  BOOLEAN          NOT NULL,
                        visit_type       VARCHAR(50)      NOT NULL,
                        room             VARCHAR(50),
                        featured         BOOLEAN          NOT NULL,
                        active           BOOLEAN          NOT NULL
);

INSERT INTO doctor
(department_id, name, title, photo_url, years_experience, consultation_fee,
 rating_average, rating_count, board_certified, visit_type, room, featured, active)
VALUES
    ((SELECT id FROM department WHERE slug = 'family-medicine'),
     'Dr. Sarah Jenkins', 'General Physician', NULL, 12, 75.00, 4.9, 128, TRUE, 'In-Person', 'Room 304', TRUE, TRUE),
    ((SELECT id FROM department WHERE slug = 'cardiology'),
     'Dr. Michael Chen', 'Cardiologist', NULL, 15, 95.00, 4.95, 94, TRUE, 'In-Person', NULL, TRUE, TRUE),
    ((SELECT id FROM department WHERE slug = 'pediatrics'),
     'Dr. Emily Patel', 'Lead Pediatrician', NULL, 9, 80.00, 5.0, 142, TRUE, 'In-Person', NULL, TRUE, TRUE),
    ((SELECT id FROM department WHERE slug = 'dermatology'),
     'Dr. Marcus Vance', 'Dermatologist', NULL, 11, 90.00, 4.88, 87, TRUE, 'In-Person', NULL, FALSE, TRUE),
    ((SELECT id FROM department WHERE slug = 'orthopedics'),
     'Dr. Alena Rossi', 'Orthopedic Specialist', NULL, 14, 110.00, 4.92, 115, TRUE, 'In-Person', NULL, FALSE, TRUE),
    ((SELECT id FROM department WHERE slug = 'neurology'),
     'Dr. David Kim', 'Neurologist', NULL, 16, 120.00, 4.9, 76, TRUE, 'In-Person', NULL, FALSE, TRUE);
```

### FILE: src\main\resources\db\migration\V6__create_doctor_tag.sql

```
CREATE TABLE doctor_tag (
                            id        BIGSERIAL    PRIMARY KEY,
                            doctor_id BIGINT       NOT NULL REFERENCES doctor (id),
                            tag       VARCHAR(100) NOT NULL,
                            UNIQUE (doctor_id, tag)
);

INSERT INTO doctor_tag (doctor_id, tag) VALUES
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'family-medicine')), 'Preventive Care'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'family-medicine')), 'Women''s Health'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'cardiology')),      'Heart Health'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'cardiology')),      'Hypertension'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'pediatrics')),      'Infant Care'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'pediatrics')),      'Vaccinations'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'dermatology')),     'Acne & Eczema'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'dermatology')),     'Screenings'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'orthopedics')),     'Joint Pain'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'orthopedics')),     'Spine Rehab'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'neurology')),       'Migraine'),
                                            ((SELECT id FROM doctor WHERE department_id = (SELECT id FROM department WHERE slug = 'neurology')),       'Sleep Disorders');
```

### FILE: src\main\resources\db\migration\V7__create_doctor_schedule.sql

```
CREATE TABLE doctor_schedule (
                                 id           BIGSERIAL PRIMARY KEY,
                                 doctor_id    BIGINT  NOT NULL REFERENCES doctor (id),
                                 day_of_week  INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
                                 start_time   TIME    NOT NULL,
                                 end_time     TIME    NOT NULL,
                                 slot_minutes INTEGER NOT NULL CHECK (slot_minutes > 0),
                                 CHECK (end_time > start_time),
                                 UNIQUE (doctor_id, day_of_week, start_time)
);

-- Every doctor: Monday to Friday, two blocks a day
INSERT INTO doctor_schedule (doctor_id, day_of_week, start_time, end_time, slot_minutes)
SELECT d.id, w.weekday, b.start_time, b.end_time, 30
FROM doctor d
         CROSS JOIN generate_series(1, 5) AS w(weekday)
         CROSS JOIN (VALUES ('09:00'::time, '12:00'::time),
                            ('14:00'::time, '18:00'::time)) AS b(start_time, end_time);

-- Two doctors also work Saturday morning
INSERT INTO doctor_schedule (doctor_id, day_of_week, start_time, end_time, slot_minutes)
SELECT d.id, 6, '09:00'::time, '13:00'::time, 30
FROM doctor d
WHERE d.name IN ('Dr. Sarah Jenkins', 'Dr. Michael Chen');
```

### FILE: src\test\java\com\carefirst\backend\controller\HealthControllerTest.java

```

package com.carefirst.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void healthReturnsOk() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ok"));
    }

    @Test
    void unknownPathReturnsJson404() throws Exception {
        mockMvc.perform(get("/api/nothing"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }
}
```

### FILE: src\test\java\com\carefirst\backend\util\SlotGeneratorTest.java

```
package com.carefirst.backend.util;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.Test;

class SlotGeneratorTest {

    @Test
    void morningBlockGivesSixSlots() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(12, 0), 30);

        assertEquals(6, slots.size());
        assertEquals(LocalTime.of(9, 0), slots.get(0));
        assertEquals(LocalTime.of(11, 30), slots.get(5));
    }

    @Test
    void afternoonBlockGivesEightSlots() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(14, 0), LocalTime.of(18, 0), 30);

        assertEquals(8, slots.size());
        assertEquals(LocalTime.of(17, 30), slots.get(7));
    }

    @Test
    void leftoverTimeShorterThanOneSlotIsDropped() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(10, 20), 30);

        assertEquals(List.of(LocalTime.of(9, 0), LocalTime.of(9, 30)), slots);
    }

    @Test
    void blockShorterThanOneSlotGivesNothing() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(9, 20), 30);

        assertTrue(slots.isEmpty());
    }

    @Test
    void zeroSlotLengthIsRejected() {
        assertThrows(IllegalArgumentException.class,
                () -> SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(12, 0), 0));
    }
}
```

### FILE: src\test\java\service\SlotServiceTest.java

```
package com.carefirst.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.carefirst.backend.dto.DayAvailabilityResponse;
import com.carefirst.backend.dto.DaySlotsResponse;
import com.carefirst.backend.entity.Doctor;
import com.carefirst.backend.entity.DoctorSchedule;
import com.carefirst.backend.exception.NotFoundException;
import com.carefirst.backend.repository.DoctorRepository;
import com.carefirst.backend.repository.DoctorScheduleRepository;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SlotServiceTest {

    private final DoctorRepository doctorRepository = mock(DoctorRepository.class);
    private final DoctorScheduleRepository scheduleRepository = mock(DoctorScheduleRepository.class);

    // Tuesday 13 October 2026, 10:00 in India (04:30 UTC)
    private final Clock clock =
            Clock.fixed(Instant.parse("2026-10-13T04:30:00Z"), ZoneId.of("Asia/Kolkata"));

    private final SlotService service = new SlotService(doctorRepository, scheduleRepository, clock);

    @BeforeEach
    void setUp() {
        Doctor doctor = mock(Doctor.class);
        when(doctor.isActive()).thenReturn(true);
        when(doctorRepository.findById(1L)).thenReturn(Optional.of(doctor));

        // This doctor works Tuesdays only: 09:00-12:00 and 14:00-18:00
        List<DoctorSchedule> tuesday = List.of(block(2, 9, 12), block(2, 14, 18));
        when(scheduleRepository.findAllByDoctorIdAndDayOfWeekOrderByStartTimeAsc(1L, 2)).thenReturn(tuesday);
        when(scheduleRepository.findAllByDoctorId(1L)).thenReturn(tuesday);
    }

    private DoctorSchedule block(int dayOfWeek, int startHour, int endHour) {
        DoctorSchedule schedule = mock(DoctorSchedule.class);
        when(schedule.getDayOfWeek()).thenReturn(dayOfWeek);
        when(schedule.getStartTime()).thenReturn(LocalTime.of(startHour, 0));
        when(schedule.getEndTime()).thenReturn(LocalTime.of(endHour, 0));
        when(schedule.getSlotMinutes()).thenReturn(30);
        return schedule;
    }

    @Test
    void futureTuesdayHasFourteenSlotsGroupedByPeriod() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 20));

        assertEquals(14, day.availableCount());
        assertEquals(6, day.morning().size());
        assertEquals(4, day.afternoon().size());
        assertEquals(4, day.evening().size());
    }

    @Test
    void todayHidesSlotsThatAlreadyStarted() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 13));

        assertEquals(11, day.availableCount());
        assertEquals(3, day.morning().size());
        assertEquals(LocalTime.of(10, 30), day.morning().get(0).time());
    }

    @Test
    void pastDayHasNoSlots() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 12));

        assertEquals(0, day.availableCount());
    }

    @Test
    void dayWithoutScheduleHasNoSlots() {
        DaySlotsResponse day = service.slotsForDay(1L, LocalDate.of(2026, 10, 21));

        assertEquals(0, day.availableCount());
        assertTrue(day.morning().isEmpty());
    }

    @Test
    void unknownDoctorIsNotFound() {
        assertThrows(NotFoundException.class,
                () -> service.slotsForDay(99L, LocalDate.of(2026, 10, 20)));
    }

    @Test
    void availabilityMarksPastAndTodayAndCountsSlots() {
        List<DayAvailabilityResponse> days = service.availability(1L, YearMonth.of(2026, 10));

        assertEquals(31, days.size());
        assertTrue(days.get(11).past());           // 12 October
        assertEquals(0, days.get(11).availableSlots());
        assertTrue(days.get(12).today());          // 13 October
        assertEquals(11, days.get(12).availableSlots());
        assertEquals(14, days.get(19).availableSlots());   // 20 October
    }
}

```
