import HorizontalLine from "../common/HorizontalLine";
import ImageSection from "../common/ImageSection";
import FormFieldTitle from "../UI/FormFieldTitle";
import ProfileTextField from "../UI/ProfileTextField";
import Button from "../UI/Button";
import { useState } from "react";

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

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="px-20">
      <div className="bg-custom-grey">
        <p className="pt-12 font-normal text-5xl text-center text-custom-indigo">
          Complete Your Profile
        </p>

        <form className="grid grid-cols-2 py-10 pl-20">
          <div>
            <div className="gap-6 grid grid-cols-2">
              <div>
                <FormFieldTitle title="First Name" />
                <ProfileTextField name="First Name" />
              </div>
              <div>
                <FormFieldTitle title="Last  Name" />
                <ProfileTextField name="Last Name" />
              </div>
            </div>
            <FormFieldTitle title="Email" />
            <ProfileTextField
              type="email"
              isRequired={"required"}
              name={"E-mail"}
            />
            <FormFieldTitle title="Date of birth" />
            <div className="gap-6 grid grid-cols-3">
              <div>
                <FormFieldTitle title="Day" />
                <ProfileTextField
                  name="Day"
                  type="select"
                  options={days}
                  isRequired
                />
              </div>
              <div>
                <FormFieldTitle title="Month" />
                <ProfileTextField
                  name="Month"
                  type="select"
                  options={months}
                  isRequired
                />
              </div>
              <div>
                <FormFieldTitle title="Year" />
                <ProfileTextField
                  name="Year"
                  type="select"
                  options={years}
                  isRequired
                />
              </div>
            </div>
            <FormFieldTitle title="Gender" />
            <div>
              <ProfileTextField
                type="gender"
                name="Gender"
                selectedGender={selectedGender}
                onGenderSelect={handleGenderClick}
              />
            </div>
            <FormFieldTitle title="Sexual Orientation" />
            <ProfileTextField
              name="Sexual Orientation"
              type="select"
              options={sexualOrientationOptions}
              isRequired
            />
            <FormFieldTitle title="Relationship Status" />
            <ProfileTextField
              name={"Relationship Status"}
              type="select"
              options={relationshipStatuses}
              isRequired
            />
            <FormFieldTitle title="Interested In" />
            <ProfileTextField
              name="Interested In"
              type="select"
              options={interestedInOptions}
              isRequired
            />
            <div className="ml-10">
              <HorizontalLine />
            </div>
            <FormFieldTitle title="Interests" />
            <ProfileTextField
              type="choices"
              name="Choose your interest"
              choices={interests}
              isRequired="required"
            />
            <FormFieldTitle title="Dislikes" />
            <ProfileTextField
              type="choices"
              name="Choose your dislikes"
              choices={dislikes}
              isRequired="required"
            />
          </div>

          <div className="flex flex-col mx-auto max-w-full">
            <FormFieldTitle title="Choose Picture" />
            <div className="gap-4 grid grid-cols-3 pt-2">
              <ImageSection />
              <ImageSection />
              <ImageSection />
              <ImageSection />
              <ImageSection />
              <ImageSection />
            </div>
          </div>
        </form>
        <div className="flex justify-center pb-2">
          <Button>
            <p className="px-24 py-2">Submit</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
