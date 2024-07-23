import { Typography } from "@mui/material";
import BabyImage from "../assets/babycry.png";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation("notFound");

  return (
    <div className="flex flex-col items-center content-container">
      <img src={BabyImage} alt="crying baby" className="w-2/12" />
      <Typography variant="h3">{t("title")}</Typography>
      <Typography variant="h6">{t("error")}</Typography>

      <br />
      <Link>
        <Button>{t("return")}</Button>
      </Link>
    </div>
  );
};

export default NotFound;
