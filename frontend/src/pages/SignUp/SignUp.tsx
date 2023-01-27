import { ChevronDown } from "react-ionicons";
import { SignUpForm } from "../../components/SignUpForm";

const listSite = [
  "Meta",
  "About",
  "Jobs",
  "Help",
  "API",
  "Privacy",
  "Terms",
  "Top Accounts",
  "Locations",
  "Instagram Lite",
  "Contact Uploading & Non-Users",
];

export const SignUp = () => {
  return (
    <>
      <div className="flex justify-center mt-[120px]">
        <img src="../../../public/anhNen.png" alt="" className="h-[580px]" />
        <SignUpForm />
      </div>
      <ul className="flex justify-center gap-4">
        {listSite.map((site, index) => (
          <li key={index} className={"text-[12px] text-[#8e8e8e]"}>
            {site}
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-3 gap-4 text-[#8e8e8e] text-[12px]">
        <div className="flex justify-center items-center">
          <span>English</span>
          <ChevronDown color={"#8e8e8e"} height="15px" width="15px" />
        </div>
        <span>&copy; 2023 Instagram from Meta</span>
      </div>
    </>
  );
};
