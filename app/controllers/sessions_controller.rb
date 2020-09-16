class SessionsController < ApplicationController

    # Create new session
    def create
      spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
  
      if User.exists?(email: spotify_user.email)
        @user = User.find_by(email: spotify_user.email)
        @user.credentials = spotify_user.credentials.token
        @user.save
  
      else
        @user = User.new(email: spotify_user.email, username: spotify_user.id, credentials: spotify_user.credentials.token)
        @user.save
      end
  
      session[:user_id] = @user.id
  
      redirect_to user_albums_path(@user)
  
    end
  
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