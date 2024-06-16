import { Button } from "flowbite-react";
import landingImg from "../assets/landingImg.png";


const landing = () => {
  return (
    <div className="flex">
      <div className="pl-28 pt-12">
        <p className="text-3xl font-bold">Empowering Your Journey to Motherhood</p>
        <p className="text-xl font-semibold mt-4 mb-36">
          "Personalized health support, easy access to records, and expert
          advice"
        </p>

        <p className="text-lg w-8/12 text-justify font-normal">
          Maathru is dedicated to providing comprehensive support for expectant
          and new mothers. Our platform offers tailored health advice, easy
          management of medical records, and direct access to midwife
          consultations. Join us to ensure a healthy, happy journey through
          pregnancy and beyond.
        </p>

        <div className="flex gap-10 mt-10">
            <Button className="bg-[#9C33C1] px-10" size="lg">Get Started</Button>
            <Button className="bg-[#9C33C1] px-10" size="lg">Learn More</Button>
        </div>
      </div>
        <img src={landingImg} alt="" className="w-4/12"/>
    </div>
  );
};

export default landing;
