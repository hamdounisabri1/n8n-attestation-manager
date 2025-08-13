package tn.esprit.attestationservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.attestationservice.entity.AppUser;
import tn.esprit.attestationservice.entity.ChangePassRequest;
import tn.esprit.attestationservice.entity.ChangePassRequestStatus;
import tn.esprit.attestationservice.repository.IChangePassRepository;
import tn.esprit.attestationservice.repository.IUserRepository;

import java.util.List;


@Service
public class ChangePassService implements IChangePassService {

    @Autowired
    private IChangePassRepository changePassRequestRepository;
    @Autowired
    private IUserRepository appUserRepository;

    public List<ChangePassRequest> getAllRequests() {
        return changePassRequestRepository.findAll();
    }

    public ChangePassRequest getRequestById(Long id) {
        return changePassRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public ChangePassRequest saveRequest(ChangePassRequest request) {
        return changePassRequestRepository.save(request);
    }

    public String deleteRequest(Long id) {
        if (!changePassRequestRepository.existsById(id)) {
            return "Request not found";
        }
        try {
            changePassRequestRepository.deleteById(id);
            return "Request successfully deleted";
        } catch (Exception e) {
            return "Error deleting request: " + e.getMessage();
        }
    }


    // Create request and assign to a user
    public ChangePassRequest createRequestForUser(Long userId) {
        AppUser user = appUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ChangePassRequest request = new ChangePassRequest();
        request.setStatus(ChangePassRequestStatus.PENDING);
        request.setUser(user);

        return changePassRequestRepository.save(request);
    }

}
