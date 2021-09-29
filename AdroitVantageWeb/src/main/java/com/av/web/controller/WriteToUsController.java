package com.av.web.controller;

import com.av.web.exception.ResourceNotFoundException;
import com.av.web.model.WriteToUs;
import com.av.web.repository.WriteToUsRepository;
import com.av.web.service.SequenceGeneratorService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class WriteToUsController {
    private static final Logger LOGGER = LogManager.getLogger(WriteToUsController.class);

    @Autowired
    private WriteToUsRepository writeToUsRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @GetMapping("/writeToUs")
    @PreAuthorize("hasRole('Relational-Manager-Test')")
    public List<WriteToUs> getAllWriteToUsMails() {
        LOGGER.info("Calling GET /writeToUs");
        return writeToUsRepository.findAll();
    }

    @GetMapping("/writeToUs/{id}")
    @PreAuthorize("hasRole('Relational-Manager-Test')")
    public ResponseEntity<WriteToUs> getWriteToUsById(@PathVariable(value = "id") Long writeToUsId)
            throws ResourceNotFoundException {
        LOGGER.info("Calling GET /writeToUs/" + writeToUsId);
        WriteToUs writeToUs = writeToUsRepository.findById(writeToUsId)
                .orElseThrow(() -> new ResourceNotFoundException("No message not found for this id :: " + writeToUsId));
        return ResponseEntity.ok().body(writeToUs);
    }

    @PostMapping("/writeToUs")
    @PreAuthorize("hasRole('Relational-Manager-Test')")
    public WriteToUs createWriteToUs(@Valid @RequestBody WriteToUs writeToUs) {
        LOGGER.info("Calling POST /writeToUss");
        writeToUs.setId(sequenceGeneratorService.generateSequence(WriteToUs.SEQUENCE_NAME));
        return writeToUsRepository.save(writeToUs);
    }

    @PutMapping("/writeToUs/{id}")
    @PreAuthorize("hasRole('Relational-Manager-Test')")
    public ResponseEntity<WriteToUs> updateWriteToUs(@PathVariable(value = "id") Long writeToUsId,
                                                     @Valid @RequestBody WriteToUs writeToUsDetails) throws ResourceNotFoundException {
        LOGGER.info("Calling PUT /writeToUss/" + writeToUsId);
        WriteToUs writeToUs = writeToUsRepository.findById(writeToUsId)
                .orElseThrow(() -> new ResourceNotFoundException("WriteToUs not found for this id :: " + writeToUsId));
        writeToUs.setUserName(writeToUsDetails.getUserName());
        writeToUs.setEmailId(writeToUsDetails.getEmailId());
        writeToUs.setPhoneNumber(writeToUsDetails.getPhoneNumber());
        writeToUs.setMessage(writeToUsDetails.getMessage());
        final WriteToUs updatedWriteToUs = writeToUsRepository.save(writeToUs);
        return ResponseEntity.ok(updatedWriteToUs);
    }

    @DeleteMapping("/writeToUs/{id}")
    @PreAuthorize("hasRole('Relational-Manager-Test')")
    public Map<String, Boolean> deleteWriteToUs(@PathVariable(value = "id") Long writeToUsId)
            throws ResourceNotFoundException {
        WriteToUs writeToUs = writeToUsRepository.findById(writeToUsId)
                .orElseThrow(() -> new ResourceNotFoundException("WriteToUs not found for this id :: " + writeToUsId));

        writeToUsRepository.delete(writeToUs);
        LOGGER.info("Calling DELETE /writeToUss/" + writeToUsId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}

