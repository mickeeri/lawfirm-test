
source 'https://rubygems.org'

gem 'bootstrap-sass', '~> 3.3', '>= 3.3.6'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.6'
# Use SCSS for stylesheets

# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
#gem 'turbolinks'

gem 'turbolinks', '~> 5.0.0.beta'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jquery-turbolinks'
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

gem 'faker', '~> 1.6', '>= 1.6.3'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1', '>= 3.1.11'
gem 'will_paginate', '~> 3.1'
#gem 'knock'
gem 'responders', '~> 2.1', '>= 2.1.2'
#gem 'rabl'
#gem 'oj'
#gem "active_model_serializers",  '~> 0.8.0'

gem "slim"

gem 'react-rails', '~> 1.6.2'

gem 'devise'


gem 'pg'
gem 'pg_search'

gem 'active_model_serializers'


source 'https://rails-assets.org' do
  gem 'rails-assets-es6-promise'
  gem 'rails-assets-fetch'
end



#gem "angularjs-rails"
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'


# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  gem 'rspec-rails', '~> 3.4'
  gem 'rubocop', '~> 0.39.0', require: false
  #gem 'sqlite3'
  gem 'factory_girl_rails', '~> 4.6'
end

group :test do
  #gem 'selenium-webdriver'
  gem 'shoulda-matchers'
  gem 'capybara', '~> 2.6', '>= 2.6.2'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  gem 'better_errors'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  #gem 'rack-mini-profiler'


  # For deployment
  gem 'capistrano',         require: false
  gem 'capistrano-rvm',     require: false
  gem 'capistrano-rails',   require: false
  gem 'capistrano-bundler', require: false
  gem 'capistrano3-puma',   require: false
end

group :production do
  gem 'puma'
  #gem 'rails_12factor'
end
