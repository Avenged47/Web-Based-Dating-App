function formValidation({
  formData,
  selectedGender,
  selectedInterests,
  selectedDislikes,
}) {
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = "First name is required.";
  }
  if (!formData.lastName) {
    errors.lastName = "Last name is required.";
  }
  if (!formData.email) {
    errors.email = "Email is required.";
  }
  if (!formData.day || !formData.month || !formData.year) {
    errors.dob = "Complete date of birth is required.";
  }
  if (!selectedGender) {
    errors.gender = "Gender is required.";
  }
  if (selectedInterests.length === 0) {
    errors.interests = "At least one interest is required.";
  }
  if (selectedDislikes.length === 0) {
    errors.dislikes = "At least one dislike is required.";
  }

  return errors;
}

export default formValidation;
