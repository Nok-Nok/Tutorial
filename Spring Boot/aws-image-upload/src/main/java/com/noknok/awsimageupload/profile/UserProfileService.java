package com.noknok.awsimageupload.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
public class UserProfileService {

    // Inject UserProfileDataAccessService
    private final UserProfileDataAccessService userProfileDataAccessService;
    @Autowired
    public UserProfileService(UserProfileDataAccessService userProfileDataAccessService) {
        this.userProfileDataAccessService = userProfileDataAccessService;
    }

    List<UserProfile> getUserProfiles(){
        return userProfileDataAccessService.getUserProfiles();
    }

    void uploadUserProfileImage(UUID userProfileId, MultipartFile file){
        // Check if img not empty
        // If file is an img
        // Whether user exists in DB
        // Grab some metadata from file if any
        //Store the img in S3 and update DB w/ S3 img link
    }
}
