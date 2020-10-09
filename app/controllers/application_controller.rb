class ApplicationController < ActionController::Base

  # Spotify API connection gem
  RSpotify::authenticate("7e196ee602664010b6d29c4df510d260", "604d0619f0814dd3b70efa53803c027e")

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