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
        USER_PROFILES.add(new UserProfile(UUID.fromString("102a1660-2e48-4fdd-83dc-0f97bbc63780"), "janetjones",null));
        USER_PROFILES.add(new UserProfile(UUID.fromString("4ba76bfa-eabe-4af9-8890-c57854f04fc7"), "antoniojunior",null));

    }
    public List<UserProfile> getUserProfiles(){
        return USER_PROFILES;
    }
}
