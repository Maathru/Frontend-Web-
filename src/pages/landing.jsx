import { Button } from "@/components/ui/button";
import landingImg from "../assets/landingImg.png";
import { useTranslation } from "react-i18next";
import { useTitle } from "@/hooks/useTitle";

const Landing = () => {
  useTitle("Maathru");
  const { t } = useTranslation("landing");

  return (
    <div className="xl:flex content-container">
      <div className="xl:pl-28 mt-12 xl:flex-1 xl:block flex flex-col items-center">
        <p className="text-3xl font-bold">{t("title")}</p>
        <p className="text-xl font-semibold mt-4 mb-12 md:mb-24">{t("subTitle")}</p>

        <p className="text-lg md:w-8/12 text-justify font-normal">
          {t("content")}
        </p>

        <div className="flex gap-10 mt-10">
          <Button className="bg-[#9C33C1] px-10" size="lg">
            {t("button1")}
          </Button>
          <Button className="bg-[#9C33C1] px-10" size="lg">
            {t("button2")}
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <img src={landingImg} alt="" className="w-9/12 hidden xl:block" />
      </div>
    </div>
  );
};

export default Landing;
