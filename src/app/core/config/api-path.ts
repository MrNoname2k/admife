import { environment } from "src/environments/environment";
import { ApiPathConfig } from "./api-path.config";

export class ApiPath {

  // AUTH MODULE

  public static LOGIN = environment.apiUrl.concat(ApiPathConfig.auth.login);
  public static LOGOUT = environment.apiUrl.concat(ApiPathConfig.auth.logout);
  public static REGISTER = environment.apiUrl.concat(ApiPathConfig.auth.register);
  public static CHANGE_PASSWORD = environment.apiUrl.concat(ApiPathConfig.auth.changePassword);
  public static FORGOT_PASSWORD = environment.apiUrl.concat(ApiPathConfig.auth.forgotPassword);



  // POST
  public static POST = environment.apiUrl.concat(ApiPathConfig.post.createPost);
  public static GETPOST = environment.apiUrl.concat(ApiPathConfig.post.getPostFriends);
  public static GETIMAGES = environment.apiUrl.concat(ApiPathConfig.post.getPostImage);
  public static AVATAR = environment.apiUrl.concat(ApiPathConfig.post.createAvatar);
  public static UPDATEAVATAR = environment.apiUrl.concat(ApiPathConfig.post.updateAvatar);
  public static UPDATEBANNER = environment.apiUrl.concat(ApiPathConfig.post.updateBanner);
  public static CREATEBANNER = environment.apiUrl.concat(ApiPathConfig.post.createBanner);


  // PAGES
  public static HOME = environment.apiUrl.concat(ApiPathConfig.page.home);

  // Likes
  public static LIKE = environment.apiUrl.concat(ApiPathConfig.like.likePost);

  // Comments
  public static COMMENT = environment.apiUrl.concat(ApiPathConfig.comment.commentPost);
  public static DELETECOMMENT = environment.apiUrl.concat(ApiPathConfig.comment.deleteComment);
  public static UPDATECOMMENT = environment.apiUrl.concat(ApiPathConfig.comment.updateComment);


  // users
  public static GETUSER = environment.apiUrl.concat(ApiPathConfig.users.getUser);
  public static UPDATEUSER = environment.apiUrl.concat(ApiPathConfig.users.updateUser);

  public static UPDATENOTIFICATIONSTATUS = environment.apiUrl.concat(ApiPathConfig.notification.updateStatus);

  //profile
  public static GETTIMELINEPOST = environment.apiUrl.concat(ApiPathConfig.profile.myPost);
  public static GETMYABOUT = environment.apiUrl.concat(ApiPathConfig.profile.myAbout);


}
