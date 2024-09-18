import featureImage from "../../assets/images/features.png";

function FeaturesSection() {
  return (
    <div className="flex flex-row justify-between font-bold">
      <div className="pb-[89px]">
        <div className="pt-14 pr-4 lg:pr-0 pl-4 lg:pl-[149px]">
          <div className="inline-flex font-bold text-5xl text-center text-custom-indigo uppercase">
            why choose us?
          </div>
          <p className="pt-7 w-auto lg:w-2/3 font-bold text-base text-custom-indigo text-justify tracking-wide">
            At Match-Mate, we understand that the journey to finding love is a
            unique and personal experience. We to make that journey not only
            exciting but also meaningful.
          </p>
        </div>
        <div className="bg-gray-200 mt-8 mb-8 py-4 pl-4 lg:pl-[149px] rounded-tr-full rounded-br-full w-3/4 lg:w-[620px] font-bold text-custom-indigo">
          <div className="mb-2 text-xl uppercase">Find your match</div>
          <p>
            Connect with thousands of singles in your area. Find your perfect
            match and start meaningful relationship today
          </p>
        </div>
        <div className="bg-gray-200 mt-4 py-4 pl-4 lg:pl-[149px] rounded-tr-full rounded-br-full w-3/4 lg:w-[620px] font-bold text-custom-indigo">
          <div className="mb-2 text-xl uppercase">Chat and Connect</div>
          <p>
            Send messages, share photos. Our chat feature makes it easy to break
            the ice and connect with other singles.
          </p>
        </div>
      </div>
      <div className="xl:flex items-end hidden">
        <img className="pr-[149px] aspect-3/2" src={featureImage} />
      </div>
    </div>
  );
}

export default FeaturesSection;
