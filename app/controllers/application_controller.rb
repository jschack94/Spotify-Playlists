class ApplicationController < ActionController::Base

    # Spotify API connection gem
    RSpotify::authenticate('bc3e04e361c44c0c9bc5691dde504544', '86ba61eb73e645c1b975193f54f74f59')
  
    # User log in verification
    def authentication_required
      if !logged_in?
        redirect_to root_path
      end
    end
  
    # Logged In Check
    def logged_in?
      !!current_user
    end
  
    # Return current user helper method
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
  
    helper_method :current_user
  end