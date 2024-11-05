import * as Yup from "yup";

export const completeProfileSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  // day: Yup.string().required("Day is required"),
  // month: Yup.string().required("Month is required"),
  // year: Yup.string().required("Year is required"),
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

  // day: Yup.string().required("Day is required"),
  // month: Yup.string().required("Month is required"),
  // year: Yup.string()
  //   .required("Year is required")
  //   .test(
  //     "is-18-or-older",
  //     "You must be at least 18 years old",
  //     function (value) {
  //       const { day, month, year } = this.parent; // Get the sibling fields
  //       const birthDate = new Date(year, month - 1, day); // Create date object
  //       const today = new Date();
  //       const age = today.getFullYear() - birthDate.getFullYear();

  //       if (
  //         age > 18 ||
  //         (age === 18 &&
  //           today >=
  //             new Date(
  //               today.getFullYear(),
  //               birthDate.getMonth(),
  //               birthDate.getDate()
  //             ))
  //       ) {
  //         return true;
  //       }

  //       return false;
  //     }
  //   ),
  // images: Yup.array()
  //   .of(Yup.string().required("Image is required"))
  //   .min(3, "Please select at least three images"),
});
