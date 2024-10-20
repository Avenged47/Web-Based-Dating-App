import HorizontalLine from "../common/HorizontalLine";
import ImageSection from "../common/ImageSection";
import FormFieldTitle from "../UI/FormFieldTitle";
import ProfileTextField from "../UI/ProfileTextField";
import Button from "../UI/Button";
import { useState } from "react";
import formValidation from "../../validation/formValidation";

function CompleteProfile() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const sexualOrientationOptions = [
    "Straight",
    "Heterosexual",
    "Homosexual",
    "Bisexual",
    "Pansexual",
    "Asexual",
    "Queer",
    "Lesbian",
    "Gay",
    "Transgender",
    "Non-binary",
    "Genderqueer",
    "Two-spirit",
    "Questioning",
    "Other",
  ];

  const relationshipStatuses = [
    "Single",
    "In a Relationship",
    "Married",
    "Engaged",
    "It’s Complicated",
    "Divorced",
    "Separated",
    "Widowed",
    "Open Relationship",
    "Polyamorous",
    "Prefer Not to Say",
  ];

  const interestedInOptions = [
    "Men",
    "Women",
    "Non-binary",
    "Everyone",
    "Prefer Not to Say",
  ];

  const interests = [
    "Traveling",
    "Cooking",
    "Fitness ",
    "Music",
    "Reading",
    " Photography",
    "Hiking",
    "Gaming",
    "Movies",
    "Sports",
    " Gadgets",
    "Dancing",
    "Volunteering",
    "Fashion ",
    "Pets ",
  ];

  const dislikes = [
    "Smoking",
    "Partying",
    "Hygiene",
    "Negativity",
    "Dishonesty",
    "Ambition",
    "Diet",
    "Laziness",
    "Disrespect",
    "Screens",
    "Communication",
    "Jealousy",
    "Inconsideration",
    "Clinginess",
    "Recklessness",
  ];

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedDislikes, setSelectedDislikes] = useState([]);
  const [imageData, setImageData] = useState([]);

  const [errors, setErrors] = useState({});

  const handleImageUpload = (file) => {
    setImageData((prevImages) => [...prevImages, file]);
  };
  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
    setFormData((prevData) => ({
      ...prevData,
      gender: gender,
    }));
  };

  const handleToggleInterest = (choice) => {
    setSelectedInterests((prev) =>
      prev.includes(choice)
        ? prev.filter((i) => i !== choice)
        : [...prev, choice]
    );
  };

  const handleToggleDislike = (choice) => {
    setSelectedDislikes((prev) =>
      prev.includes(choice)
        ? prev.filter((i) => i !== choice)
        : [...prev, choice]
    );
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    sexualOrientation: "",
    relationshipStatus: "",
    interestedIn: "",
    interests: [],
    dislikes: [],
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const formValidationErrors = formValidation(
    //   formData,
    //   selectedGender,
    //   selectedInterests,
    //   selectedDislikes
    // );

    // if (Object.keys(formValidationErrors).length > 0) {
    //   setErrors(formValidationErrors);
    //   return;
    // }

    const submittedData = {
      ...formData,
      interests: selectedInterests,
      dislikes: selectedDislikes,
      images: imageData,
    };

    console.log("Form submitted", submittedData);
  };

  return (
    <div className="px-20">
      <div className="bg-custom-grey">
        <p className="pt-12 font-normal text-5xl text-center text-custom-indigo">
          Complete Your Profile
        </p>

        <form className="grid grid-cols-2 py-10 pl-20" onSubmit={handleSubmit}>
          <div>
            <div className="gap-6 grid grid-cols-2">
              <div>
                <FormFieldTitle title="First Name" />
                <ProfileTextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  isRequired={"required"}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName}</p>
                )}{" "}
              </div>
              <div>
                <FormFieldTitle title="Last  Name" />
                <ProfileTextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  isRequired={"required"}
                />
              </div>
            </div>
            <FormFieldTitle title="Email" />
            <ProfileTextField
              type="email"
              isRequired={"required"}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormFieldTitle title="Date of birth" />
            <div className="gap-6 grid grid-cols-3">
              <div>
                <FormFieldTitle title="Day" />
                <ProfileTextField
                  name="day"
                  type="select"
                  options={days}
                  value={formData.day}
                  onChange={handleInputChange}
                  isRequired
                />
              </div>
              <div>
                <FormFieldTitle title="Month" />
                <ProfileTextField
                  name="month"
                  type="select"
                  options={months}
                  value={formData.month}
                  onChange={handleInputChange}
                  isRequired
                />
              </div>
              <div>
                <FormFieldTitle title="Year" />
                <ProfileTextField
                  name="year"
                  type="select"
                  options={years}
                  value={formData.year}
                  onChange={handleInputChange}
                  isRequired
                />
              </div>
            </div>
            <FormFieldTitle title="Gender" />
            <div>
              <ProfileTextField
                type="gender"
                name="gender"
                selectedGender={selectedGender}
                value={formData.gender}
                onGenderSelect={handleGenderClick}
                isRequired
              />
            </div>
            <FormFieldTitle title="Sexual Orientation" />
            <ProfileTextField
              name="sexualOrientation"
              type="select"
              options={sexualOrientationOptions}
              value={formData.sexualOrientation}
              onChange={handleInputChange}
              isRequired
            />
            <FormFieldTitle title="Relationship Status" />
            <ProfileTextField
              name="relationshipStatus"
              type="select"
              options={relationshipStatuses}
              value={formData.relationshipStatus}
              onChange={handleInputChange}
              isRequired
            />
            <FormFieldTitle title="Interested In" />
            <ProfileTextField
              name="interestedIn"
              type="select"
              options={interestedInOptions}
              value={formData.interestedIn}
              onChange={handleInputChange}
              isRequired
            />
            <div className="ml-10">
              <HorizontalLine />
            </div>
            <FormFieldTitle title="Interests" />
            <ProfileTextField
              type="choices"
              name="interests"
              placeholder="Choose your interests"
              choices={interests}
              selectedChoices={selectedInterests}
              onToggleChoice={handleToggleInterest}
              isRequired="required"
            />
            <FormFieldTitle title="Dislikes" />
            <ProfileTextField
              type="choices"
              name="dislikes"
              placeholder="Choose your dislikes"
              choices={dislikes}
              selectedChoices={selectedDislikes}
              onToggleChoice={handleToggleDislike}
              isRequired="required"
            />
          </div>

          <div className="flex flex-col mx-auto max-w-full">
            <FormFieldTitle title="Choose Picture" />
            <div className="gap-4 grid grid-cols-2 pt-2">
              <ImageSection onImageUpload={handleImageUpload} />
              <ImageSection onImageUpload={handleImageUpload} />
              <ImageSection onImageUpload={handleImageUpload} />
              <ImageSection onImageUpload={handleImageUpload} />
              <ImageSection onImageUpload={handleImageUpload} />
              <ImageSection onImageUpload={handleImageUpload} />
            </div>
          </div>
          <div className="flex justify-center pt-3 pb-2">
            <Button type="submit">
              <p className="px-24 py-2">Submit</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
