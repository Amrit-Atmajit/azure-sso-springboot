package com.av.career;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

import com.av.career.Application;
import com.av.career.model.Candidate;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CandidateControllerIntegrationTest {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port;

	private String getRootUrl() {
		return "http://localhost:" + port;
	}

	@Test
	public void contextLoads() {

	}

	@Test
	public void testGetAllCandidates() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);

		ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/candidates",
				HttpMethod.GET, entity, String.class);
		
		assertNotNull(response.getBody());
	}

	@Test
	public void testGetCandidateById() {
		Candidate candidate = restTemplate.getForObject(getRootUrl() + "/candidates/1", Candidate.class);
		System.out.println(candidate.getFirstName());
		assertNotNull(candidate);
	}

	@Test
	public void testCreateCandidate() {
		Candidate candidate = new Candidate();
		candidate.setEmailId("admin@gmail.com");
		candidate.setFirstName("admin");
		candidate.setLastName("admin");

		ResponseEntity<Candidate> postResponse = restTemplate.postForEntity(getRootUrl() + "/candidates", candidate, Candidate.class);
		assertNotNull(postResponse);
		assertNotNull(postResponse.getBody());
	}

	@Test
	public void testUpdateCandidate() {
		int id = 1;
		Candidate candidate = restTemplate.getForObject(getRootUrl() + "/candidates/" + id, Candidate.class);
		candidate.setFirstName("admin1");
		candidate.setLastName("admin2");

		restTemplate.put(getRootUrl() + "/candidates/" + id, candidate);

		Candidate updatedCandidate = restTemplate.getForObject(getRootUrl() + "/candidates/" + id, Candidate.class);
		assertNotNull(updatedCandidate);
	}

	@Test
	public void testDeleteCandidate() {
		int id = 2;
		Candidate candidate = restTemplate.getForObject(getRootUrl() + "/candidates/" + id, Candidate.class);
		assertNotNull(candidate);

		restTemplate.delete(getRootUrl() + "/candidates/" + id);

		try {
			candidate = restTemplate.getForObject(getRootUrl() + "/candidates/" + id, Candidate.class);
		} catch (final HttpClientErrorException e) {
			assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
		}
	}
}
