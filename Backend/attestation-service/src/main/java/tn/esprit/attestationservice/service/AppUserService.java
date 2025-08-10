package tn.esprit.attestationservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.attestationservice.entity.AppUser;
import tn.esprit.attestationservice.repository.IUserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserService implements IAppUserService {
    @Autowired
    private IUserRepository appUserRepository;

    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public String deleteUser(Long id) {
        if (appUserRepository.existsById(id)) {
            appUserRepository.deleteById(id);
            return "User with ID " + id + " deleted successfully.";
        }
        return "User with ID " + id + " not found.";
    }

    @Override
    public AppUser updateUser(Long id, AppUser user) {
        Optional<AppUser> existingUser = appUserRepository.findById(id);

        if (existingUser.isPresent()) {
            AppUser updatedUser = existingUser.get();
            updatedUser.setUsername(user.getUsername());
            updatedUser.setPassword(user.getPassword());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setRole(user.getRole());
            return appUserRepository.save(updatedUser);
        } else {
            throw new RuntimeException("User with ID " + id + " not found.");
        }
    }

}
