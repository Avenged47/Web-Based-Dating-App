import Navbar from "../components/common/Navbar";
import AboutImage from "../assets/images/about.png";
import FeaturesSection from "../components/layout/FeaturesSection";
import Footer from "../components/layout/Footer";
import SlidingForm from "../components/auth/animation/SlidingForm";
import useSlidingForm from "../hooks/useSlidingForm";

function About() {
  const [showSlidingForm, setShowSlidingForm] = useSlidingForm();
  return (
    <div>
      <Navbar
        onJoinNowClick={() => {
          setShowSlidingForm(true);
        }}
      />
      {showSlidingForm ? (
        <SlidingForm setShowSlidingForm={setShowSlidingForm} />
      ) : (
        <>
          <div className="px-2 lg:pl-[149px] font-bold text-base text-custom-indigo">
            About MATCH-MATE
          </div>
          <div className="flex xl:flex-row flex-col gap-7 px-2 lg:px-[149px] pt-9 pb-[55px]">
            <img src={AboutImage} className="lg:w-full xl:w-1/2 aspect-3/2" />
            <div>
              <h3 className="font-bold text-[40px] text-custom-indigo text-justify leading-[50px]">
                Match-Mate
              </h3>
              <p className="px-2 py-10 font-medium text-base text-custom-indigo text-justify leading-[30px]">
                Match-Mate is an innovative dating web application designed to
                connect like-minded individuals in a seamless and engaging
                manner. Utilizing advanced algorithms, it matches users based on
                their interests, preferences, and behaviors, ensuring
                compatibility and increasing the chances of meaningful
                connections. Match-Mate offers a user-friendly interface,
                allowing users to create detailed profiles, upload photos, and
                share their stories. With features like instant messaging, video
                calls, and personalized recommendations, users can communicate
                effectively and build relationships at their own pace. Our
                platform prioritizes safety and privacy, incorporating stringent
                security measures to protect user data. Match-Mate aims to
                foster genuine connections and help users find their perfect
                match, creating a vibrant community where love and companionship
                thrive. Whether you are looking for a serious relationship or
                just someone to share your interests with, Match-Mate is here to
                help you navigate the exciting world of online dating with
                confidence and ease. Join Match-Mate today and take the first
                step towards finding your ideal partner.
              </p>
              <div className="inline-center inline-flex bg-custom-indigo px-[25px] py-2.5 rounded-[10px]">
                <button className="justify-center font-bold text-base text-white">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default About;
