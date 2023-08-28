package com.noknok.awsimageupload.profile;

import com.noknok.awsimageupload.profile.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

// Construct the API layer for userprofile
@RestController
@RequestMapping ("api/v1/user-profile")
@CrossOrigin("*") //Not best practice but this allows all other localhost to access to this port
public class UserProfileController {

    //Inject UserprofileService
    private final UserProfileService userProfileService;
    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    //GET
    @GetMapping
    public List<UserProfile> getUserProfiles(){
        return userProfileService.getUserProfiles();
    }

    //POST
    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            path = "{userProfileId}/image/upload"
    )
    public void uploadUserProfileImage(@PathVariable("userProfileId")UUID userProfileId,
            @RequestParam("file")MultipartFile file){
        userProfileService.uploadUserProfileImage(userProfileId, file);

    }

    // GET
    @GetMapping("{userProfileId}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userProfileId") UUID userProfileId){
        return userProfileService.downloadUserProfileImage(userProfileId);
    }
    //PUT


    //DELETE
}
