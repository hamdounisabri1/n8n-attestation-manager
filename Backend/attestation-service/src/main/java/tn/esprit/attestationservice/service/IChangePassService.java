package tn.esprit.attestationservice.service;

import tn.esprit.attestationservice.entity.ChangePassRequest;

import java.util.List;

public interface IChangePassService {
    ChangePassRequest getRequestById(Long id);
    List<ChangePassRequest> getAllRequests();
    ChangePassRequest saveRequest(ChangePassRequest request);
    String deleteRequest(Long id);
    ChangePassRequest createRequestForUser(Long userId);
}
