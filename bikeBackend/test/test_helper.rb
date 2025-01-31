ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

require "minitest/reporters"
require 'mocha/minitest'

Minitest::Reporters.use!(Minitest::Reporters::SpecReporter.new)

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup fixtures in test/fixtures/*.yml for all tests.
    fixtures :all
  end
end
