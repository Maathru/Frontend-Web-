import axiosInstance from "./axiosInstance";

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

class PregnancyService {
  static async getParentDetails(userId) {
    const url = userId
      ? `/parent/pregnancy/main/parent?user=${userId}`
      : `/parent/pregnancy/main/parent`;

    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async saveParentDetails(userId, formObject) {
    const url = userId
      ? `/parent/pregnancy/main/parent?user=${userId}`
      : `/parent/pregnancy/main/parent`;

    try {
      const response = await axiosInstance.post(url, formObject);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static mapParentDetailsToFormObject(parentDetails) {
    return {
      name_woman: parentDetails.womanName,
      name_man: parentDetails.manName,
      address: parentDetails.address,
      location: parentDetails.location,
      phone_woman: parentDetails.womanPhone,
      phone_woman: parentDetails.manPhone,
      dob_woman: parentDetails.womanDob,
      dob_man: parentDetails.manDob,
      marriedAge_woman: parentDetails.womanAgeMarried,
      marriedAge_man: parentDetails.manAgeMarried,
      education_woman: parentDetails.womanEducationLevel,
      education_man: parentDetails.manEducationLevel,
      occupation_woman: parentDetails.womanOccupation,
      occupation_man: parentDetails.manOccupation,
      distance: parentDetails.distance,

      blood_relatives_woman: parentDetails.bloodRelatives,
      blood_relatives_other: parentDetails.bloodRelativesDetails,
      rubella_woman: parentDetails.rubella,
      rubella_other: parentDetails.rubellaDetails,
      pregnancy_screening_woman: parentDetails.pregnancyScreening,
      pregnancy_screening_other: parentDetails.pregnancyScreeningDetails,
      folic_acid_woman: parentDetails.folicAcid,
      folic_acid_other: parentDetails.folicAcidDetails,
      infertility_woman: parentDetails.infertility,
      infertility_other: parentDetails.infertilityDetails,
    };
  }
  static mapFormObjectToParentDetails(formObject) {
    return {
      womanName: formObject.name_woman,
      manName: formObject.name_man,
      address: formObject.address,
      location: formObject.location,
      womanPhone: formObject.phone_woman,
      manPhone: formObject.phone_man,
      womanDob: formObject.dob_woman,
      manDob: formObject.dob_man,
      womanAgeMarried: formObject.marriedAge_woman,
      manAgeMarried: formObject.marriedAge_man,
      womanEducationLevel: formObject.education_woman,
      manEducationLevel: formObject.education_man,
      womanOccupation: formObject.occupation_woman,
      manOccupation: formObject.occupation_man,
      distance: formObject.distance,

      bloodRelatives: formObject.blood_relatives_woman,
      bloodRelativesDetails: formObject.blood_relatives_other,
      rubella: formObject.rubella_woman,
      rubellaDetails: formObject.rubella_other,
      pregnancyScreening: formObject.pregnancy_screening_woman,
      pregnancyScreeningDetails: formObject.pregnancy_screening_other,
      folicAcid: formObject.folic_acid_woman,
      folicAcidDetails: formObject.folic_acid_other,
      infertility: formObject.infertility_woman,
      infertilityDetails: formObject.infertility_other,
    };
  }

  static async getFamilyHistory(userId) {
    const url = userId
      ? `/parent/pregnancy/main/family?user=${userId}`
      : `/parent/pregnancy/main/family`;

    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async saveFamilyHistory(userId, formObject) {
    const url = userId
      ? `/parent/pregnancy/main/family?user=${userId}`
      : `/parent/pregnancy/main/family`;

    try {
      const response = await axiosInstance.post(url, formObject);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static mapFamilyHistoryToFormObject(familyHistory) {
    return {
      diabetes_woman: familyHistory.womanDiabetes,
      hbp_woman: familyHistory.womanHighBloodPressure,
      blood_diseases_woman: familyHistory.womanBloodRelatedDiseases,
      others_woman: familyHistory.other,

      diabetes_other: familyHistory.diabetesDetails,
      hbp_other: familyHistory.highBloodPressureDetails,
      blood_diseases_other: familyHistory.womanBloodRelatedDiseasesDetails,
      others_other: familyHistory.otherDetails,
    };
  }
  static mapFormObjectToFamilyHistory(formObject) {
    return {
      womanDiabetes: formObject.diabetes_woman,
      womanHighBloodPressure: formObject.hbp_woman,
      womanBloodRelatedDiseases: formObject.blood_diseases_woman,
      other: formObject.others_woman,

      diabetesDetails: formObject.diabetes_other,
      highBloodPressureDetails: formObject.hbp_other,
      womanBloodRelatedDiseasesDetails: formObject.blood_diseases_other,
      otherDetails: formObject.others_other,
    };
  }

  static async getPregnancyHistory(userId) {
    const url = userId
      ? `/parent/pregnancy/main/pregnancy?user=${userId}`
      : `/parent/pregnancy/main/pregnancy`;

    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async savePregnancyHistory(userId, formObject) {
    const url = userId
      ? `/parent/pregnancy/main/pregnancy?user=${userId}`
      : `/parent/pregnancy/main/pregnancy`;

    try {
      const response = await axiosInstance.post(url, formObject);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static mapPregnancyHistoryToFormObject(pregnancyHistory) {
    return {
      pregnancies_g: pregnancyHistory.pregnanciesG,
      pregnancies_p: pregnancyHistory.pregnanciesP,
      living_children: pregnancyHistory.children,
      youngest_child_dob: pregnancyHistory.youngestChildBirthday,

      last_menstrual_period: pregnancyHistory.lastMenstrualPeriod,
      expected_delivery: pregnancyHistory.expectedDoD,
      expected_delivery_by_ultrasound: pregnancyHistory.usCorrectedExpectedDoD,
      expected_period_begin: pregnancyHistory.expectedPeriodBegin,
      expected_period_end: pregnancyHistory.expectedPeriodEnd,
      first_sensation: pregnancyHistory.firstSensationOfRotationalMotion,
      gestational_weeks: pregnancyHistory.gestationalWeeksAtEnrollment,
      family_methods_type:
        pregnancyHistory.familyPlanningMethodsBeforePregnancy,
      family_methods:
        pregnancyHistory.familyPlanningMethodsBeforePregnancyDetails,
    };
  }
  static mapFormObjectToPregnancyHistory(formObject) {
    return {
      pregnanciesG: formObject.pregnancies_g,
      pregnanciesP: formObject.pregnancies_p,
      children: formObject.living_children,
      youngestChildBirthday: formObject.youngest_child_dob,

      lastMenstrualPeriod: formObject.last_menstrual_period,
      expectedDoD: formObject.expected_delivery,
      usCorrectedExpectedDoD: formObject.expected_delivery_by_ultrasound,
      expectedPeriodBegin: formObject.expected_period_begin,
      expectedPeriodEnd: formObject.expected_period_end,
      firstSensationOfRotationalMotion: formObject.first_sensation,
      gestationalWeeksAtEnrollment: formObject.gestational_weeks,
      familyPlanningMethodsBeforePregnancy: formObject.family_methods_type,
      familyPlanningMethodsBeforePregnancyDetails: formObject.family_methods,
    };
  }

  static async getCurrentPregnancy(userId) {
    const url = userId
      ? `/parent/pregnancy/main/current?user=${userId}`
      : `/parent/pregnancy/main/current`;

    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async saveCurrentPregnancy(userId, formObject) {
    const url = userId
      ? `/parent/pregnancy/main/current?user=${userId}`
      : `/parent/pregnancy/main/current`;

    try {
      const response = await axiosInstance.post(url, formObject);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static mapCurrentPregnancyToFormObject(currentPregnancy) {
    return {
      pregnancy_20_35_woman: currentPregnancy.pregnancyUnder_20_andOver_35,
      more_than_5_pregnancies_woman: currentPregnancy.moreThan5_pregnancies,
      preeclampsia_woman: currentPregnancy.preeclampsia,
      vaginal_bleeding_woman: currentPregnancy.antepartumVaginalBleeding,
      multiple_births_woman: currentPregnancy.multipleBirths,
      casual_positions_woman: currentPregnancy.casualPositions,
      delivery_date_not_specified_woman:
        currentPregnancy.doDOfTheChildIsNotSpecified,
      other_woman: currentPregnancy.otherThingsToConsider,

      pregnancy_20_35_other:
        currentPregnancy.pregnancyUnder_20_andOver_35Details,
      more_than_5_pregnancies_other:
        currentPregnancy.moreThan5_pregnanciesDetails,
      preeclampsia_other: currentPregnancy.preeclampsiaDetails,
      vaginal_bleeding_other: currentPregnancy.antepartumVaginalBleedingDetails,
      multiple_births_other: currentPregnancy.multipleBirthsDetails,
      casual_positions_other: currentPregnancy.casualPositionsDetails,
      delivery_date_not_specified_other:
        currentPregnancy.doDOfTheChildIsNotSpecifiedDetails,
      other_other: currentPregnancy.otherThingsToConsiderDetails,

      bmi_more_or_less_woman: currentPregnancy.bmiLessOrHigh,
      diabetes_current_woman: currentPregnancy.diabetes,
      malaria_current_woman: currentPregnancy.malaria,
      heart_diseases_current_woman: currentPregnancy.heartDiseases,
      kidney_diseases_current_woman: currentPregnancy.kidneyDiseases,

      bmi_more_or_less_other: currentPregnancy.bmiLessOrHighDetails,
      diabetes_current_other: currentPregnancy.diabetesDetails,
      malaria_current_other: currentPregnancy.malariaDetails,
      heart_diseases_current_other: currentPregnancy.heartDiseasesDetails,
      kidney_diseases_current_other: currentPregnancy.kidneyDiseasesDetails,
    };
  }
  static mapFormObjectToCurrentPregnancy(formObject) {
    return {
      pregnancyUnder_20_andOver_35: formObject.pregnancy_20_35_woman,
      moreThan5_pregnancies: formObject.more_than_5_pregnancies_woman,
      preeclampsia: formObject.preeclampsia_woman,
      antepartumVaginalBleeding: formObject.vaginal_bleeding_woman,
      multipleBirths: formObject.multiple_births_woman,
      casualPositions: formObject.casual_positions_woman,
      doDOfTheChildIsNotSpecified: formObject.delivery_date_not_specified_woman,
      otherThingsToConsider: formObject.other_woman,

      pregnancyUnder_20_andOver_35Details: formObject.pregnancy_20_35_other,
      moreThan5_pregnanciesDetails: formObject.more_than_5_pregnancies_other,
      preeclampsiaDetails: formObject.preeclampsia_other,
      antepartumVaginalBleedingDetails: formObject.vaginal_bleeding_other,
      multipleBirthsDetails: formObject.multiple_births_other,
      casualPositionsDetails: formObject.casual_positions_other,
      doDOfTheChildIsNotSpecifiedDetails:
        formObject.delivery_date_not_specified_other,
      otherThingsToConsiderDetails: formObject.other_other,

      bmiLessOrHigh: formObject.bmi_more_or_less_woman,
      diabetes: formObject.diabetes_current_woman,
      malaria: formObject.malaria_current_woman,
      heartDiseases: formObject.heart_diseases_current_woman,
      kidneyDiseases: formObject.kidney_diseases_current_woman,

      bmiLessOrHighDetails: formObject.bmi_more_or_less_other,
      diabetesDetails: formObject.diabetes_current_other,
      malariaDetails: formObject.malaria_current_other,
      heartDiseasesDetails: formObject.heart_diseases_current_other,
      kidneyDiseasesDetails: formObject.kidney_diseases_current_other,
    };
  }

  static async getClinicalConservation(userId) {
    const url = userId
      ? `/parent/pregnancy/clinical?user=${userId}`
      : `/parent/pregnancy/clinical`;

    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async saveClinicalConservation(userId, formObject) {
    const url = userId
      ? `/parent/pregnancy/clinical?user=${userId}`
      : `/parent/pregnancy/clinical`;

    try {
      const response = await axiosInstance.post(url, formObject);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getChildBirth(userId) {
    const url = userId
      ? `/parent/pregnancy/child?user=${userId}`
      : `/parent/pregnancy/child`;

    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async saveChildBirth(userId, formObject) {
    const url = userId
      ? `/parent/pregnancy/child?user=${userId}`
      : `/parent/pregnancy/child`;

    try {
      const response = await axiosInstance.post(url, formObject);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static mapChildBirthToFormObject(childBirth) {
    return {
      birth_place: childBirth.birthPlace,
      dob: childBirth.dob,
      date_released: childBirth.dateReleased,
      done_by: childBirth.doneBy,
      pregnancyResult: childBirth.resultOfPregnancy,
      pregnancyStatus: childBirth.statusOfPregnancy,

      complicationsCracked: childBirth.crackedAround,
      complicationsPostpartumBleeding: childBirth.postpartumBleeding,
      complicationsTrappedAura: childBirth.trappedAura,
      complicationsCuts: childBirth.anyCutsAround,
      complicationsLongDelivery: childBirth.longDelivery,
      complicationsOther: childBirth.otherComplications,
      vitaminADose: childBirth.vitaminADose,
      rubellaVaccine: childBirth.rubellaVaccine,

      childSex: childBirth.sex,
      birthWeight: childBirth.birthWeight,
      prematureBirth: childBirth.prematureBirth,
      complicationsAtBirth: childBirth.complicationsAtBirth,

      mothersDeath: childBirth.motherDead,
      mothersDeathDate: childBirth.motherDeadDate,
      mothersDeathCause: childBirth.motherDeadCause,
      investigated: childBirth.investigated,
    };
  }
  static mapFormObjectToChildBirth(formObject) {
    return {
      birthPlace: formObject.birth_place,
      dob: formObject.dob,
      dateReleased: formObject.date_released,
      doneBy: formObject.done_by,
      resultOfPregnancy: formObject.pregnancyResult,
      statusOfPregnancy: formObject.pregnancyStatus,

      crackedAround: formObject.complicationsCracked,
      postpartumBleeding: formObject.complicationsPostpartumBleeding,
      trappedAura: formObject.complicationsTrappedAura,
      anyCutsAround: formObject.complicationsCuts,
      longDelivery: formObject.complicationsLongDelivery,
      otherComplications: formObject.complicationsOther,
      vitaminADose: formObject.vitaminADose,
      rubellaVaccine: formObject.rubellaVaccine,

      sex: formObject.childSex,
      birthWeight: formObject.birthWeight,
      prematureBirth: formObject.prematureBirth,
      complicationsAtBirth: formObject.complicationsAtBirth,

      motherDead: formObject.mothersDeath,
      motherDeadDate: formObject.mothersDeathDate,
      motherDeadCause: formObject.mothersDeathCause,
      investigated: formObject.investigated,
    };
  }
}

export default PregnancyService;
