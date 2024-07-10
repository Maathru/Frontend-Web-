import { Button } from "@/components/ui/button";
import landingImg from "../assets/landingImg.png";
import { useTranslation } from "react-i18next";

const landing = () => {
  const { t } = useTranslation("landing");

  return (
    <div className="flex bg-white dark:bg-dark-background">
      <div className="pl-28 pt-12">
        <p className="text-3xl font-bold">{t("title")}</p>
        <p className="text-xl font-semibold mt-4 mb-36">{t("subTitle")}</p>

        <p className="text-lg w-8/12 text-justify font-normal">
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
      <img src={landingImg} alt="" className="w-4/12" />
    </div>
  );
};

export default landing;
