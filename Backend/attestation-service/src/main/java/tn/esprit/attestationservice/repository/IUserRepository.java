package tn.esprit.attestationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.attestationservice.entity.AppUser;

public interface IUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);
}
