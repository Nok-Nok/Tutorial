package com.noknok.awsimageupload.datastore;

import com.noknok.awsimageupload.profile.UserProfile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class FakeUserProfileDataStore {
    // Initialize USER_PROFILE database
    private static final List<UserProfile> USER_PROFILES = new ArrayList<>();

    // Hard code the fake DB
    static {
        USER_PROFILES.add(new UserProfile(UUID.randomUUID(), "janetjones",null));
        USER_PROFILES.add(new UserProfile(UUID.randomUUID(), "antoniojunior",null));

    }
    public List<UserProfile> getUserProfiles(){
        return USER_PROFILES;
    }
}
