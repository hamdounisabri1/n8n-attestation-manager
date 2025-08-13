package tn.esprit.attestationservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.attestationservice.entity.ChangePassRequest;
import tn.esprit.attestationservice.service.IChangePassService;

import java.util.List;

@RestController
@RequestMapping("/change-password-requests")
@CrossOrigin(origins = "http://localhost:4200")
public class ChangePassRequestController {

    @Autowired
    private IChangePassService changePassRequestService;


    @GetMapping
    public List<ChangePassRequest> getAllRequests() {
        return changePassRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public ChangePassRequest getRequest(@PathVariable Long id) {
        return changePassRequestService.getRequestById(id);
    }

    @PostMapping
    public ChangePassRequest createRequest(@RequestBody ChangePassRequest request) {
        return changePassRequestService.saveRequest(request);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRequest(@PathVariable Long id) {
        String result = changePassRequestService.deleteRequest(id);
        if (result.equals("Request not found")) {
            return ResponseEntity.status(404).body(result);
        } else if (result.startsWith("Error")) {
            return ResponseEntity.status(500).body(result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/user/{userId}")
    public ChangePassRequest createRequestForUser(@PathVariable Long userId) {
        return changePassRequestService.createRequestForUser(userId);
    }

}
