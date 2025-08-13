package tn.esprit.attestationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.attestationservice.entity.ChangePassRequest;

public interface IChangePassRepository extends JpaRepository<ChangePassRequest, Long> {
}
