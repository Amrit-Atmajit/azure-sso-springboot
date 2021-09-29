package com.av.web.repository;

import com.av.web.model.WriteToUs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WriteToUsRepository extends MongoRepository<WriteToUs, Long> {

}
