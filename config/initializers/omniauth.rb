require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, "7e196ee602664010b6d29c4df510d260", "604d0619f0814dd3b70efa53803c027e", scope: 'user-read-email'
end