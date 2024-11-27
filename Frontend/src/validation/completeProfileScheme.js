import * as Yup from "yup";

export const completeProfileSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  sexualOrientation: Yup.string().required(
    "Please select your sexual orientation"
  ),
  relationshipStatus: Yup.string().required(
    "Please select your relationship status"
  ),
  interestedIn: Yup.string().required("Please select who you’re interested in"),
  interests: Yup.array()
    .of(Yup.string())
    .min(5, "Please select at least five interests"),
  dislikes: Yup.array()
    .of(Yup.string())
    .min(5, "Please select at least five dislikes"),
  day: Yup.string().required("Day is required"),
  month: Yup.string().required("Month is required"),
  year: Yup.string().required("Year is required"),
  // dob: Yup.string()
  //   .test("is-valid-dob", "Invalid date of birth", function () {
  //     const { day, month, year } = this.parent;
  //     const formattedMonth = String(getMonthNumber(month)).padStart(2, "0"); // Helper function for month
  //     const formattedDay = String(day).padStart(2, "0");

  //     const dob = `${year}-${formattedMonth}-${formattedDay}`;
  //     const birthDate = new Date(dob);

  //     if (birthDate.toString() === "Invalid Date") {
  //       return false;
  //     }

  //     const today = new Date();
  //     const age = today.getFullYear() - birthDate.getFullYear();
  //     const isBirthdayPassedThisYear =
  //       today.getMonth() > birthDate.getMonth() ||
  //       (today.getMonth() === birthDate.getMonth() &&
  //         today.getDate() >= birthDate.getDate());

  //     return age > 18 || (age === 18 && isBirthdayPassedThisYear);
  //   })
  //   .required("Date of birth is required"),
  // images: Yup.array()
  //   .min(3, "You must upload at least 3 images.") // Ensure a minimum of 3 images
  //   .of(
  //     Yup.mixed().test(
  //       "isValidImage",
  //       "Please upload a valid image",
  //       (value) => value && value.type && value.type.startsWith("image/") // Validate that each item is an image
  //     )
  //   )
  //   .required("Please upload your images."),
});
