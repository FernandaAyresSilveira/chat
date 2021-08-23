# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

Time::DATE_FORMATS[:DMYHMS] = "%D/%M/%Y - %H:%M"
