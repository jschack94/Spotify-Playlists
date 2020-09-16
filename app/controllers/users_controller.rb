class UsersController < ApplicationController

    # Create new user
    def create
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        redirect_to user_albums_path(@user)
      else
        render :index
      end
    end
  
    # Show 
    def show
      @user = User.find(params[:id])
      render json: @user
    end
  
  private
  
    # Accpetable user params
    def user_params
      params.require(:user).permit(:username, :email)
    end
  
  end