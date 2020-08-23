package com.example.asfaleia.service;


import com.example.asfaleia.model.Role;
import com.example.asfaleia.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Role not found"));
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role createRole(Role role) {
        roleRepository.findByName(role.getName())
                .ifPresent(value -> {
//                    throw new EntityAlreadyExistsException("Role", "name", "A Role with the same name already exists");
                });
        return roleRepository.save(role);
    }

    @Override
    public Role updateRole(Role roleWithNewValues) {
        Role currentRole = roleRepository.findById(roleWithNewValues.getId())
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));
        roleRepository.findByName(roleWithNewValues.getName())
                .filter(value -> !value.getId().equals(roleWithNewValues.getId()))
                .ifPresent(value -> {
//                    throw new EntityAlreadyExistsException("Role", "name", "A Role with the same name already exists");
                });
        currentRole = setNewValues(currentRole, roleWithNewValues);
        return roleRepository.save(currentRole);
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    private Role setNewValues(Role currentRole, Role roleWithNewValues) {
        currentRole.setName(roleWithNewValues.getName());
        currentRole.setDescription(roleWithNewValues.getDescription());
        return currentRole;
    }
}
