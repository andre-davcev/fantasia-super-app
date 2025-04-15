package com.andredavcev.taskmaster.repository;

import com.andredavcev.taskmaster.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
