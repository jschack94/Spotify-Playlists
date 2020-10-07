class SessionsController < ApplicationController

 
  
    # Log out
    def destroy
      reset_session
      redirect_to root_path
    end
  
    private
  
    # Spotify OmniAuth verification
    def auth
      request.env['omniauth.auth']
    end
  
  
  end