import React from "react";
import {
  HiLocationMarker,
  HiMailOpen,
  HiPhone,
} from "react-icons/hi";
import { useTranslation } from "react-i18next";
import PageHeading from "@/components/ui/pageHeading";

const viewClinics = () => {
  const { t } = useTranslation("viewClinics");
  const title = t("title");

  return (
    <div className="content-container">
      <PageHeading title={title} />

      <div className="flex">
        <div className=""></div>
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
