# BoulderBikeRace

Bike race website for OpenClassrooms project

Project - frontend (npm start) & bikeBackend (rails s)

# Rails Testing

## # Models:

- **Rides** -> rails test test/models/rider_test.rb
  - test_city_should_be_present
  - test_latitude_should_be_present
  - test_last_name_should_be_present
  - test_should_be_valid
  - test_first_name_should_be_present
- **Submission** -> rails test test/models/submission_test.rb
  - test_slogan_should_be_present
  - test_email_should_be_present
  - test_first_name_should_be_present
  - test_last_name_should_be_present
  - test_should_be_valid
  - test_email_should_be_valid_format

## # Controllers:

- **Rides** -> rails test test/controllers/riders_controller_test.rb
  - test_should_get_index
  - test_should_return_404_if_rider_not_found
  - test_should_show_rider
- **Submissions** -> rails test test/controllers/submissions_controller_test.rb
  - test_should_create_submission
  - test_should_show_submission
  - test_should_not_create_submission_with_missing_fields
  - test_should_return_404_if_submission_not_found
  - test_should_not_create_submission_with_invalid_email
  - test_should_get_index
  - test_should_not_create_submission_with_too_long_slogan

## Performance:

- **Submissions** - rails test test/performance/submissions_performance_test.rb
  - test_handle_100_submissions_without_slowing_down
- **Rides** - rails test test/performance/riders_performance_test.rb
  - test_handle_100_rider_signups_without_slowing_down

## Security

- **Riders** - rails test test/security/riders_security.rb
  - test_should_prevent_SQL_injection_in_rider_creation
  - test_should_prevent_XSS_attacks_in_rider_input
  - test_should_prevent_invalid_data_from_being_saved
- **Submissions** - rails test test/security/submissions_security.rb
  - test_should_prevent_XSS_attacks_in_submission_input
  - test_should_prevent_SQL_injection_in_submission_creation
  - test_should_prevent_invalid_data_from_being_saved

rails test
