package com.andredavcev.taskmaster.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Task {
    @Id
    private Long id;

    private String name;
    private String description;
    private Boolean completed;
    private LocalDate dueDate;
}
