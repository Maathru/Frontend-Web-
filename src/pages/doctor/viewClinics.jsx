import React from "react";
import {
  HiChevronLeft,
  HiLocationMarker,
  HiMailOpen,
  HiPhone,
} from "react-icons/hi";
import { useTranslation } from "react-i18next";

const viewClinics = () => {
  const { t } = useTranslation("viewClinics");

  return (
    <div className="p-12 pt-8">
      <div className="text-3xl text-[#5B5B5B] font-semibold mb-8">
        <HiChevronLeft className="text-5xl inline" />
        {t("title")}
      </div>

      <div className="flex">
        <div className="flex-1"></div>
        <div className="flex-1">
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6">MOH Office - Udahamulla</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div className="flex items-center gap-2 text-lg">
                <HiPhone className="text-[#620084]" />
                <p>+94 112457896</p>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <HiMailOpen className="text-[#620084]" />
                <p>mohudahamulla@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <HiLocationMarker className="text-[#620084]" />
                <p>No.26, Udahamulla, Nugegoda.</p>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6">MOH Office - Udahamulla</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div className="flex items-center gap-2 text-lg">
                <HiPhone className="text-[#620084]" />
                <p>+94 112457896</p>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <HiMailOpen className="text-[#620084]" />
                <p>mohudahamulla@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <HiLocationMarker className="text-[#620084]" />
                <p>No.26, Udahamulla, Nugegoda.</p>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-6">MOH Office - Udahamulla</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-4">
              <div className="flex items-center gap-2 text-lg">
                <HiPhone className="text-[#620084]" />
                <p>+94 112457896</p>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <HiMailOpen className="text-[#620084]" />
                <p>mohudahamulla@gmail.com</p>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <HiLocationMarker className="text-[#620084]" />
                <p>No.26, Udahamulla, Nugegoda.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default viewClinics;
