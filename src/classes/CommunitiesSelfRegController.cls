public with sharing class CommunitiesSelfRegController {

    public String firstName {get; set;}
    public String lastName {get; set;}
public String email {get; set;}
public String password {get; set {password = value == null ? value : value.trim(); } }
public String confirmPassword {get; set { confirmPassword = value == null ? value : value.trim(); } }
public String communityNickname {get; set { communityNickname = value == null ? value : value.trim(); } }

public CommunitiesSelfRegController() {}



 private boolean isValidPassword() {
        return password == confirmPassword;
    }
    public PageReference registerUser() {

           // it's okay if password is null - we'll send the user a random password in that case
        if (!isValidPassword()) {
            ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, Label.site.passwords_dont_match);
            ApexPages.addMessage(msg);
            return null;
        }    

        String profileId = ''; // To be filled in by customer.    0057F000000fmYIQAY  00e7F000001mqZuQAI  
        String roleEnum = null; // To be filled in by customer.
        String accountId = ''; // To be filled in by customer.

        String userName = email;

        User u = new User();
        u.Username = userName;
        u.Email = email;
        u.FirstName = firstName;
        u.LastName = lastName;
        u.CommunityNickname = communityNickname;
        u.ProfileId = profileId;//00e7F000000y7zvQAA
        system.debug('check!!!!');

        String userId = Site.createPortalUser(u, accountId, password);

        if (userId != null) { 
            if (password != null && password.length() > 1) {
                return Site.login(userName, password, null);
            }
            else {
                PageReference page = System.Page.CommunitiesSelfRegConfirm;
                page.setRedirect(true);
                return page;
            }
        }
        return null;
    }
}