# BoulderBikeRace

Bike race website for OpenClassrooms project

Project - frontend (npm start) & bikeBackend (rails s)

# Rails Testing

## # Models:

- **Rides** -> rails test test/models/rider_test.rb
  - test_city_should_be_present PASS (0.12s)
  - test_latitude_should_be_present PASS (0.01s)
  - test_last_name_should_be_present PASS (0.01s)
  - test_should_be_valid PASS (0.01s)
  - test_first_name_should_be_present PASS (0.00s)
- **Submission** -> rails test test/models/submission_test.rb
  - test_slogan_should_be_present PASS (0.13s)
  - test_email_should_be_present PASS (0.01s)
  - test_first_name_should_be_present PASS (0.01s)
  - test_last_name_should_be_present PASS (0.01s)
  - test_should_be_valid PASS (0.01s)
  - test_email_should_be_valid_format PASS (0.01s)

## # Controllers:

- **Rides** -> rails test test/controllers/riders_controller_test.rb
  - test_should_get_index PASS (0.34s)
  - test_should_return_404_if_rider_not_found ERROR (0.64s)
  - test_should_show_rider PASS (0.03s)
- **Submissions** -> rails test test/controllers/submissions_controller_test.rb
  - test_should_create_submission PASS (0.35s)
  - test_should_show_submission PASS (0.04s)
  - test_should_not_create_submission_with_missing_fields PASS (0.06s)
  - test_should_return_404_if_submission_not_found PASS (0.02s)
  - test_should_not_create_submission_with_invalid_email PASS (0.02s)
  - test_should_get_index PASS (0.03s)
  - test_should_not_create_submission_with_too_long_slogan PASS (0.03s)

## Performance:

- **Submissions** - rails test test/performance/submissions_performance_test.rb
  - test_handle_100_submissions_without_slowing_down PASS (0.72s)
- **Rides** - rails test test/performance/riders_performance_test.rb
  - test_handle_100_rider_signups_without_slowing_down PASS (1.01s)

## Security

- **Riders** - rails test test/security/riders_security.rb
  - test_should_prevent_SQL_injection_in_rider_creation PASS (0.04s)
  - test_should_prevent_XSS_attacks_in_rider_input PASS (0.02s)
  - test_should_prevent_invalid_data_from_being_saved **FAIL (0.32s)**
- **Submissions** - rails test test/security/submissions_security.rb
  - test_should_prevent_XSS_attacks_in_submission_input PASS (0.35s)
  - test_should_prevent_SQL_injection_in_submission_creation PASS (0.03s)
  - test_should_prevent_invalid_data_from_being_saved PASS (0.04s)

rails test
