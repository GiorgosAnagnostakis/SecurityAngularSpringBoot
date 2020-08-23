package com.example.asfaleia.service;


import com.example.asfaleia.model.User;
import com.example.asfaleia.payload.SignUpRequest;

import java.util.List;

public interface UserService {

    User getUserById(Long id);

    List<User> getUsers(String username);

    User createUser(SignUpRequest signUpRequest);

//    User updateUser(User user);

    void deleteUser(Long id);

    User addRoleToUser(Long userId, Long roleId);

    User removeRoleFromUser(Long userId, Long roleId);

    User getAuthenticatedUser();

    User updatePassword(Long userId, String currentPassword, String newPassword, String newPasswordRepeat);

}