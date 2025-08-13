package tn.esprit.attestationservice.service;

import tn.esprit.attestationservice.entity.AppUser;

import java.util.List;

public interface IAppUserService {

    List<AppUser> getAllUsers();
    String deleteUser(Long id);
    AppUser updateUser(Long id, AppUser user);
    AppUser getUserById(Long id);
}
