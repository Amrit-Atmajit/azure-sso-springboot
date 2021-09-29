package com.av.web.controller;

import com.av.web.exception.ResourceNotFoundException;
import com.av.web.model.Candidate;
import com.av.web.repository.CandidateRepository;
import com.av.web.service.SequenceGeneratorService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
public class CandidateController {
	private static final Logger LOGGER = LogManager.getLogger(CandidateController.class);

	@Autowired
	private CandidateRepository candidateRepository;
	
	@Autowired
	private SequenceGeneratorService sequenceGeneratorService;

	/*@GetMapping("/account")
	public Authentication getAccount() {
		return SecurityContextHolder.getContext().getAuthentication();
	}*/

	@GetMapping("/candidates")
	@PreAuthorize("hasRole('Relational-Manager-Test')")
	public List<Candidate> getAllCandidates() {
		LOGGER.info("Calling GET /candidates");
		return candidateRepository.findAll();
	}

	@GetMapping("/candidates/{id}")
	@PreAuthorize("hasRole('Relational-Manager-Test')")
	public ResponseEntity<Candidate> getCandidateById(@PathVariable(value = "id") Long candidateId)
			throws ResourceNotFoundException {
		LOGGER.info("Calling GET /candidates/" + candidateId);
		Candidate candidate = candidateRepository.findById(candidateId)
				.orElseThrow(() -> new ResourceNotFoundException("Candidate not found for this id :: " + candidateId));
		return ResponseEntity.ok().body(candidate);
	}

	@PostMapping("/candidates")
	@PreAuthorize("hasRole('Relational-Manager-Test')")
	public Candidate createCandidate(@Valid @RequestBody Candidate candidate) {
		LOGGER.info("Calling POST /candidates");
		candidate.setId(sequenceGeneratorService.generateSequence(Candidate.SEQUENCE_NAME));
		return candidateRepository.save(candidate);
	}

	@PutMapping("/candidates/{id}")
	@PreAuthorize("hasRole('Relational-Manager-Test')")
	public ResponseEntity<Candidate> updateCandidate(@PathVariable(value = "id") Long candidateId,
			@Valid @RequestBody Candidate candidateDetails) throws ResourceNotFoundException {
		LOGGER.info("Calling PUT /candidates/" + candidateId);
		Candidate candidate = candidateRepository.findById(candidateId)
				.orElseThrow(() -> new ResourceNotFoundException("Candidate not found for this id :: " + candidateId));
		candidate.setFullName(candidateDetails.getFullName());
		candidate.setEmailId(candidateDetails.getEmailId());
		candidate.setPhoneNumber(candidateDetails.getPhoneNumber());
		final Candidate updatedCandidate = candidateRepository.save(candidate);
		return ResponseEntity.ok(updatedCandidate);
	}

	@DeleteMapping("/candidates/{id}")
	@PreAuthorize("hasRole('Relational-Manager-Test')")
	public Map<String, Boolean> deleteCandidate(@PathVariable(value = "id") Long candidateId)
			throws ResourceNotFoundException {
		Candidate candidate = candidateRepository.findById(candidateId)
				.orElseThrow(() -> new ResourceNotFoundException("Candidate not found for this id :: " + candidateId));

		candidateRepository.delete(candidate);
		LOGGER.info("Calling DELETE /candidates/" + candidateId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

