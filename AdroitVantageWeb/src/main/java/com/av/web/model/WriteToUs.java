package com.av.web.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Document(collection = "WriteToUs")
public class WriteToUs {

    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @Id
    private long id;

    @NotBlank
    @Size(max = 100)
    @Indexed(unique = true)
    private String userName;

    @NotBlank
    @Size(max = 100)
    @Email
    @Indexed(unique = true)
    private String emailId;

    @NotBlank
    @Pattern(regexp = "(^$|[0-9]{10})")
    @Size(min = 10, max = 10)
    private String phoneNumber;

    @NotBlank
    @Size(max = 2000)
    private String message;

    public WriteToUs() { }

    public WriteToUs(String userName, String emailId, String phoneNumber) {
        this.userName = userName;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "WriteToUs{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", message='" + message + '\'' +
                '}';
    }

}
