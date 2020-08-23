package com.example.asfaleia.service;



import com.example.asfaleia.model.Role;

import java.util.List;

public interface RoleService {

    Role getRoleById(Long id);

    List<Role> getAllRoles();

    Role createRole(Role role);

    Role updateRole(Role role);

    void deleteRole(Long id);


}
