class ApplicationController < ActionController::Base


  
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