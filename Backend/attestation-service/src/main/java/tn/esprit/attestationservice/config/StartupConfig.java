package tn.esprit.attestationservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import tn.esprit.attestationservice.entity.AppUser;
import tn.esprit.attestationservice.entity.Roles;
import tn.esprit.attestationservice.repository.IUserRepository;

@Configuration
public class StartupConfig implements CommandLineRunner {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin") == null) {
            AppUser admin = new AppUser();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole(Roles.ADMIN); // Adjust if your enum is different
            userRepository.save(admin);
            System.out.println("Default admin user created: admin/admin");
        }
    }
}
