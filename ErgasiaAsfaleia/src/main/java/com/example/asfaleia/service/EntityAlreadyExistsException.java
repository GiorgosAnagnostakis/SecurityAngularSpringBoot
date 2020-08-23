package com.example.asfaleia.service;

public class EntityAlreadyExistsException extends RuntimeException {

    private String entityType;
    private String fieldName;
    private String errorMessage;

    public EntityAlreadyExistsException(String entityType, String fieldName, String errorMessage) {
        this.entityType = entityType;
        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
