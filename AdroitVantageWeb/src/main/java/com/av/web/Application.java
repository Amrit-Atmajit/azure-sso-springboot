package com.av.web;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
@SpringBootApplication
public class Application {

	private static final Logger LOGGER = LogManager.getLogger(Application.class);

	public static void main(String[] args) {
		LOGGER.info("In AV Web App...");
		SpringApplication.run(Application.class, args);
	}
}
