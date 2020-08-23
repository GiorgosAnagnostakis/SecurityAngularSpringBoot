package com.example.asfaleia.service;


import com.example.asfaleia.model.Role;
import com.example.asfaleia.model.User;
import com.example.asfaleia.payload.SignUpRequest;
import com.example.asfaleia.repository.RoleRepository;
import com.example.asfaleia.repository.UserRepository;
import com.example.asfaleia.security.AuthenticationFacade;
import com.example.asfaleia.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.*;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    AuthenticationFacade authenticationFacade;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;


    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Override
    public List<User> getUsers(String username) {
        User administrators = userRepository.findByUsername("Administrators").orElse(null);
        return username == null ? userRepository.findAll() : getUserByUsername(username);
    }

    @Override
    public User createUser(SignUpRequest signUpRequest) {

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEncryptedPassword(bCryptPasswordEncoder.encode(signUpRequest.getPassword()));
        user.setActive(true);
        userRepository.findByUsername(user.getUsername())
                .ifPresent(value -> {
                    throw new EntityAlreadyExistsException("User", "username", "A User with the same username already exists");
                });

        Role role = roleRepository.findByName(signUpRequest.getRole())
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));

        System.out.println("hello");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        return userRepository.save(user);
    }


//    @Override
//    public User updateUser(User userWithNewValues) {
////        User currentUser = userRepository.findById(userWithNewValues.getId())
////                .orElseThrow(() -> new EntityNotFoundException("User", "User not found"));
////        userRepository.findByUsername(userWithNewValues.getUsername())
////                .filter(value -> !value.getId().equals(userWithNewValues.getId()))
////                .ifPresent(value -> {
////                    throw new EntityNotFoundException();
////                });
////        currentUser = setNewValues(currentUser, userWithNewValues);
//        return userRepository.save(currentUser);
//    }

    @Override
    public void deleteUser(Long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal) {
            if (id.equals(((UserPrincipal) principal).getId())) {
                //  throw new DeleteSelfException("You cannot delete yourself! :P");
            }
        }
        userRepository.deleteById(id);
    }


    @Override
    public User addRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));
        user.addRole(role);
        return userRepository.save(user);
    }

    @Override
    public User removeRoleFromUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));
        user.removeRole(role);
        return userRepository.save(user);
    }

    private List<User> getUserByUsername(String username) {
        List<User> users = new ArrayList<>();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("No user found by that username[" + username + "]"));
        users.add(user);
        return users;
    }

    @Override
    public User getAuthenticatedUser() {
        Object principal = authenticationFacade.getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal) {
            UserPrincipal userPrincipal = (UserPrincipal) principal;
            return userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new EntityNotFoundException("User not found"));
        }
        throw new EntityNotFoundException("User not found");
    }

    @Override
    public User updatePassword(Long userId, String currentPassword, String newPassword, String newPasswordRepeat) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        if (!bCryptPasswordEncoder.matches(currentPassword, user.getEncryptedPassword())) {
//            throw new IncorrectPasswordException("Incorrect password provided");
        }
        if (!newPassword.equals(newPasswordRepeat)) {
//            throw new PasswordMismatchException("The passwords do not match");
        }
        user.setEncryptedPassword(bCryptPasswordEncoder.encode(newPassword));
        return user;
    }


}

