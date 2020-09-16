require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, 'bc3e04e361c44c0c9bc5691dde504544', '86ba61eb73e645c1b975193f54f74f59', scope: 'user-read-email'
end