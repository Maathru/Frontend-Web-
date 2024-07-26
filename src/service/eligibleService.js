import axiosInstance from "./axiosInstance";

const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

class EligibleService {
  static async addEligibleInfo(formData) {
    try {
      const response = await axiosInstance.post(`/eligible`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getEligibleInfo() {
    try {
      const response = await axiosInstance.get(`/eligible`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static createObject(formObject) {
    return {
      basicInfoDto: {
        manAge: formObject.age_man,
        womanAge: formObject.age_woman,
        manEducationLevel: formObject.education_man,
        womanEducationLevel: formObject.education_woman,
        manOccupation: formObject.occupation_man,
        womanOccupation: formObject.occupation_woman,
        marriedDate: formObject.marriage,
      },

      medicalHistoryDto: {
        womenAnemia: formObject.anemia_woman,
        womanHeartDisease: formObject.rheumatism_woman,
        womanDiabetes: formObject.diabetics_woman,
        womanHighBloodPressure: formObject.pressure_woman,
        womanHighCholesterol: formObject.cholesterol_woman,
        womanChestTightnessWheezing: formObject.wheezing_woman,
        womanThyroid: formObject.thyroid_woman,
        womanDental: formObject.dental_woman,
        womanMentalIllness: formObject.mental_woman,
        womanLongTermDiseases: formObject.complication_woman,
        womanFoodPoisoning: formObject.poisoning_woman,
        womanLongTermMedication: formObject.medication_woman,
        womanSurgery: formObject.surgeries_woman,

        manAnemia: formObject.anemia_man,
        manHeartDisease: formObject.rheumatism_man,
        manDiabetes: formObject.diabetics_man,
        manHighBloodPressure: formObject.pressure_man,
        manHighCholesterol: formObject.cholesterol_man,
        manChestTightnessWheezing: formObject.wheezing_man,
        manThyroid: formObject.thyroid_man,
        manDental: formObject.dental_man,
        manMentalIllness: formObject.mental_man,
        manLongTermDiseases: formObject.complication_man,
        manFoodPoisoning: formObject.poisoning_man,
        manLongTermMedication: formObject.medication_man,
        manSurgery: formObject.surgeries_man,

        anemiaDetails: formObject.anemia_other,
        heartDiseaseDetails: formObject.rheumatism_other,
        diabetesDetails: formObject.diabetics_other,
        highBloodPressureDetails: formObject.pressure_other,
        highCholesterolDetails: formObject.cholesterol_other,
        chestTightnessWheezingDetails: formObject.wheezing_other,
        thyroidDetails: formObject.thyroid_other,
        dentalDetails: formObject.dental_other,
        mentalIllnessDetails: formObject.mental_other,
        longTermDiseases: formObject.complication_other,
        foodPoisoningDetails: formObject.poisoning_other,
        longTermMedicationDetails: formObject.medication_other,
        surgeryDetails: formObject.surgeries_other,
      },

      specialWomanDto: {
        rubella: formObject.rubella_woman,
        folicAcid: formObject.folic_woman,
        consanguineous: formObject.consanguineous_woman,
        periodsPattern: formObject.periods_woman,
        period: formObject.periods_pattern,
        heavyBleed: formObject.heavily_woman,
        vaginalBleed: formObject.vaginal_woman,
        abdominalPain: formObject.menstruation_woman,
        vaginalDischarge: formObject.unusual_woman,
        abortion: formObject.abortions_woman,
        infantMortality: formObject.infant_woman,
        stillbirth: formObject.stillbirths_woman,
        tubalPregnancy: formObject.tubal_woman,

        rubellaDetails: formObject.rubella_other,
        folicAcidDetails: formObject.folic_other,
        consanguineousDetails: formObject.consanguineous_other,
        periodsPatternDetails: formObject.periods_other,
        heavyBleedOther: formObject.heavily_other,
        vaginalBleedOther: formObject.vaginal_other,
        abdominalPainOther: formObject.menstruation_other,
        vaginalDischargeOther: formObject.unusual_other,
        abortionOther: formObject.abortions_other,
        infantMortalityOther: formObject.infant_other,
        stillbirthOther: formObject.stillbirths_other,
        tubalPregnancyOther: formObject.tubal_other,
      },
      specialBothDto: {
        manDissatisfiedSex: formObject.dissatisfied_man,
        manFamilyPlaning: formObject.planning_man,
        manDelayFirstBirth: formObject.delay_man,

        womanDissatisfiedSex: formObject.dissatisfied_woman,
        womanFamilyPlaning: formObject.planning_woman,
        womanDelayFirstBirth: formObject.delay_woman,
        manBreastExamination: formObject.breast_woman,

        dissatisfiedSexDetails: formObject.dissatisfied_other,
        familyPlaningDetails: formObject.planning_other,
        delayFirstBirthDetails: formObject.delay_other,
        breastExaminationDetails: formObject.breast_other,
      },

      familyHealthInfoDto: {
        manHighBloodPressure: formObject.family_pressure_man,
        manDiabetes: formObject.family_heart_man,
        manHeartDiseases: formObject.family_nervous_man,
        manNervousDisorders: formObject.family_hemophilia_man,
        manHemophilia: formObject.family_hemophilia_man,
        manThalassemia: formObject.family_thalassemia_man,
        manMentalIllnessAndSuicide: formObject.family_mental_man,
        manTwins: formObject.family_twins_man,

        womanHighBloodPressure: formObject.family_pressure_woman,
        womanDiabetes: formObject.family_heart_woman,
        womanHeartDiseases: formObject.family_nervous_woman,
        womanNervousDisorders: formObject.family_hemophilia_woman,
        womanHemophilia: formObject.family_hemophilia_woman,
        womanThalassemia: formObject.family_thalassemia_woman,
        womanMentalIllnessAndSuicide: formObject.family_mental_woman,
        womanTwins: formObject.family_twins_woman,

        highBloodPressureWho: formObject.family_pressure_other,
        diabetesWho: formObject.family_heart_other,
        heartDiseasesWho: formObject.family_nervous_other,
        nervousDisordersWho: formObject.family_hemophilia_other,
        hemophiliaWho: formObject.family_hemophilia_other,
        thalassemiaWho: formObject.family_thalassemia_other,
        mentalIllnessAndSuicideWho: formObject.family_mental_other,
        twinsWho: formObject.family_twins_other,
      },

      familyNutritionDto: {
        manThreeMeals: formObject.meal_man,
        manAnimalProtein: formObject.meal_animal_man,
        manPlantProtein: formObject.meal_plant_man,
        manVegetable: formObject.meal_vegetables_man,
        manFruit: formObject.meal_fruit_man,
        manFamilyMeal: formObject.diet_family_man,
        manGardenDiet: formObject.diet_garden_man,
        manMuchSugar: formObject.diet_sugar_man,
        manMuchFat: formObject.diet_fat_man,

        womanThreeMeals: formObject.meal_woman,
        womanAnimalProtein: formObject.meal_animal_woman,
        womanPlantProtein: formObject.meal_plant_woman,
        womanVegetable: formObject.meal_vegetables_woman,
        womanFruit: formObject.meal_fruit_woman,
        womanFamilyMeal: formObject.diet_family_woman,
        womanGardenDiet: formObject.diet_garden_woman,
        womanMuchSugar: formObject.diet_sugar_woman,
        womanMuchFat: formObject.diet_fat_woman,

        threeMealsDetails: formObject.meal_other,
        animalProteinDetails: formObject.meal_animal_other,
        plantProteinDetails: formObject.meal_plant_other,
        vegetableDetails: formObject.meal_vegetables_other,
        fruitDetails: formObject.meal_fruit_other,
        familyMealDetails: formObject.diet_family_other,
        gardenDietDetails: formObject.diet_garden_other,
        muchSugarDetails: formObject.diet_sugar_other,
        muchFatDetails: formObject.diet_fat_other,
      },
    };
  }

  static mapDtoToFormObject(eligibleDto) {
    return {
      age_man: eligibleDto.basicInfoDto.manAge,
      age_woman: eligibleDto.basicInfoDto.womanAge,
      education_man: eligibleDto.basicInfoDto.manEducationLevel,
      education_woman: eligibleDto.basicInfoDto.womanEducationLevel,
      occupation_man: eligibleDto.basicInfoDto.manOccupation,
      occupation_woman: eligibleDto.basicInfoDto.womanOccupation,
      marriage: eligibleDto.basicInfoDto.marriedDate,
      region: eligibleDto.basicInfoDto.region,
      area: Capitalize(eligibleDto.basicInfoDto.moh[0]),
      district: Capitalize(eligibleDto.basicInfoDto.moh[1]),
      userId: eligibleDto.basicInfoDto.userId,
      womanName: eligibleDto.basicInfoDto.womanName,
      manName: eligibleDto.basicInfoDto.manName,
      address: eligibleDto.basicInfoDto.address,
      createdDate: eligibleDto.basicInfoDto.createdDate,

      anemia_woman: eligibleDto.medicalHistoryDto.womenAnemia,
      rheumatism_woman: eligibleDto.medicalHistoryDto.womanHeartDisease,
      diabetics_woman: eligibleDto.medicalHistoryDto.womanDiabetes,
      pressure_woman: eligibleDto.medicalHistoryDto.womanHighBloodPressure,
      cholesterol_woman: eligibleDto.medicalHistoryDto.womanHighCholesterol,
      wheezing_woman: eligibleDto.medicalHistoryDto.womanChestTightnessWheezing,
      thyroid_woman: eligibleDto.medicalHistoryDto.womanThyroid,
      dental_woman: eligibleDto.medicalHistoryDto.womanDental,
      mental_woman: eligibleDto.medicalHistoryDto.womanMentalIllness,
      complication_woman: eligibleDto.medicalHistoryDto.womanLongTermDiseases,
      poisoning_woman: eligibleDto.medicalHistoryDto.womanFoodPoisoning,
      medication_woman: eligibleDto.medicalHistoryDto.womanLongTermMedication,
      surgeries_woman: eligibleDto.medicalHistoryDto.womanSurgery,

      anemia_man: eligibleDto.medicalHistoryDto.manAnemia,
      rheumatism_man: eligibleDto.medicalHistoryDto.manHeartDisease,
      diabetics_man: eligibleDto.medicalHistoryDto.manDiabetes,
      pressure_man: eligibleDto.medicalHistoryDto.manHighBloodPressure,
      cholesterol_man: eligibleDto.medicalHistoryDto.manHighCholesterol,
      wheezing_man: eligibleDto.medicalHistoryDto.manChestTightnessWheezing,
      thyroid_man: eligibleDto.medicalHistoryDto.manThyroid,
      dental_man: eligibleDto.medicalHistoryDto.manDental,
      mental_man: eligibleDto.medicalHistoryDto.manMentalIllness,
      complication_man: eligibleDto.medicalHistoryDto.manLongTermDiseases,
      poisoning_man: eligibleDto.medicalHistoryDto.manFoodPoisoning,
      medication_man: eligibleDto.medicalHistoryDto.manLongTermMedication,
      surgeries_man: eligibleDto.medicalHistoryDto.manSurgery,

      anemia_other: eligibleDto.medicalHistoryDto.anemiaDetails,
      rheumatism_other: eligibleDto.medicalHistoryDto.heartDiseaseDetails,
      diabetics_other: eligibleDto.medicalHistoryDto.diabetesDetails,
      pressure_other: eligibleDto.medicalHistoryDto.highBloodPressureDetails,
      cholesterol_other: eligibleDto.medicalHistoryDto.highCholesterolDetails,
      wheezing_other:
        eligibleDto.medicalHistoryDto.chestTightnessWheezingDetails,
      thyroid_other: eligibleDto.medicalHistoryDto.thyroidDetails,
      dental_other: eligibleDto.medicalHistoryDto.dentalDetails,
      mental_other: eligibleDto.medicalHistoryDto.mentalIllnessDetails,
      complication_other: eligibleDto.medicalHistoryDto.longTermDiseases,
      poisoning_other: eligibleDto.medicalHistoryDto.foodPoisoningDetails,
      medication_other: eligibleDto.medicalHistoryDto.longTermMedicationDetails,
      surgeries_other: eligibleDto.medicalHistoryDto.surgeryDetails,

      rubella_woman: eligibleDto.specialWomanDto.rubella,
      folic_woman: eligibleDto.specialWomanDto.folicAcid,
      consanguineous_woman: eligibleDto.specialWomanDto.consanguineous,
      periods_woman: eligibleDto.specialWomanDto.periodsPattern,
      periods_pattern: eligibleDto.specialWomanDto.period,
      heavily_woman: eligibleDto.specialWomanDto.heavyBleed,
      vaginal_woman: eligibleDto.specialWomanDto.vaginalBleed,
      menstruation_woman: eligibleDto.specialWomanDto.abdominalPain,
      unusual_woman: eligibleDto.specialWomanDto.vaginalDischarge,
      abortions_woman: eligibleDto.specialWomanDto.abortion,
      infant_woman: eligibleDto.specialWomanDto.infantMortality,
      stillbirths_woman: eligibleDto.specialWomanDto.stillbirth,
      tubal_woman: eligibleDto.specialWomanDto.tubalPregnancy,

      rubella_other: eligibleDto.specialWomanDto.rubellaDetails,
      folic_other: eligibleDto.specialWomanDto.folicAcidDetails,
      consanguineous_other: eligibleDto.specialWomanDto.consanguineousDetails,
      periods_other: eligibleDto.specialWomanDto.periodsPatternDetails,
      heavily_other: eligibleDto.specialWomanDto.heavyBleedOther,
      vaginal_other: eligibleDto.specialWomanDto.vaginalBleedOther,
      menstruation_other: eligibleDto.specialWomanDto.abdominalPainOther,
      unusual_other: eligibleDto.specialWomanDto.vaginalDischargeOther,
      abortions_other: eligibleDto.specialWomanDto.abortionOther,
      infant_other: eligibleDto.specialWomanDto.infantMortalityOther,
      stillbirth_other: eligibleDto.specialWomanDto.stillbirthOther,
      tubal_other: eligibleDto.specialWomanDto.tubalPregnancyOther,

      dissatisfied_man: eligibleDto.specialBothDto.manDissatisfiedSex,
      planning_man: eligibleDto.specialBothDto.manFamilyPlaning,
      delay_man: eligibleDto.specialBothDto.manDelayFirstBirth,

      dissatisfied_woman: eligibleDto.specialBothDto.womanDissatisfiedSex,
      planning_woman: eligibleDto.specialBothDto.womanFamilyPlaning,
      delay_woman: eligibleDto.specialBothDto.womanDelayFirstBirth,
      breast_woman: eligibleDto.specialBothDto.manBreastExamination,

      dissatisfied_other: eligibleDto.specialBothDto.dissatisfiedSexDetails,
      planning_other: eligibleDto.specialBothDto.familyPlaningDetails,
      delay_other: eligibleDto.specialBothDto.delayFirstBirthDetails,
      breast_other: eligibleDto.specialBothDto.breastExaminationDetails,

      family_pressure_man: eligibleDto.familyHealthInfoDto.manHighBloodPressure,
      family_heart_man: eligibleDto.familyHealthInfoDto.manDiabetes,
      family_nervous_man: eligibleDto.familyHealthInfoDto.manHeartDiseases,
      family_hemophilia_man:
        eligibleDto.familyHealthInfoDto.manNervousDisorders,
      family_hemophilia_man: eligibleDto.familyHealthInfoDto.manHemophilia,
      family_thalassemia_man: eligibleDto.familyHealthInfoDto.manThalassemia,
      family_mental_man:
        eligibleDto.familyHealthInfoDto.manMentalIllnessAndSuicide,
      family_twins_man: eligibleDto.familyHealthInfoDto.manTwins,

      family_pressure_woman:
        eligibleDto.familyHealthInfoDto.womanHighBloodPressure,
      family_heart_woman: eligibleDto.familyHealthInfoDto.womanDiabetes,
      family_nervous_woman: eligibleDto.familyHealthInfoDto.womanHeartDiseases,
      family_hemophilia_woman:
        eligibleDto.familyHealthInfoDto.womanNervousDisorders,
      family_hemophilia_woman: eligibleDto.familyHealthInfoDto.womanHemophilia,
      family_thalassemia_woman:
        eligibleDto.familyHealthInfoDto.womanThalassemia,
      family_mental_woman:
        eligibleDto.familyHealthInfoDto.womanMentalIllnessAndSuicide,
      family_twins_woman: eligibleDto.familyHealthInfoDto.womanTwins,

      family_pressure_other:
        eligibleDto.familyHealthInfoDto.highBloodPressureWho,
      family_heart_other: eligibleDto.familyHealthInfoDto.diabetesWho,
      family_nervous_other: eligibleDto.familyHealthInfoDto.heartDiseasesWho,
      family_hemophilia_other:
        eligibleDto.familyHealthInfoDto.nervousDisordersWho,
      family_hemophilia_other: eligibleDto.familyHealthInfoDto.hemophiliaWho,
      family_thalassemia_other: eligibleDto.familyHealthInfoDto.thalassemiaWho,
      family_mental_other:
        eligibleDto.familyHealthInfoDto.mentalIllnessAndSuicideWho,
      family_twins_other: eligibleDto.familyHealthInfoDto.twinsWho,

      meal_man: eligibleDto.familyNutritionDto.manThreeMeals,
      meal_animal_man: eligibleDto.familyNutritionDto.manAnimalProtein,
      meal_plant_man: eligibleDto.familyNutritionDto.manPlantProtein,
      meal_vegetables_man: eligibleDto.familyNutritionDto.manVegetable,
      meal_fruit_man: eligibleDto.familyNutritionDto.manFruit,
      diet_family_man: eligibleDto.familyNutritionDto.manFamilyMeal,
      diet_garden_man: eligibleDto.familyNutritionDto.manGardenDiet,
      diet_sugar_man: eligibleDto.familyNutritionDto.manMuchSugar,
      diet_fat_man: eligibleDto.familyNutritionDto.manMuchFat,

      meal_woman: eligibleDto.familyNutritionDto.womanThreeMeals,
      meal_animal_woman: eligibleDto.familyNutritionDto.womanAnimalProtein,
      meal_plant_woman: eligibleDto.familyNutritionDto.womanPlantProtein,
      meal_vegetables_woman: eligibleDto.familyNutritionDto.womanVegetable,
      meal_fruit_woman: eligibleDto.familyNutritionDto.womanFruit,
      diet_family_woman: eligibleDto.familyNutritionDto.womanFamilyMeal,
      diet_garden_woman: eligibleDto.familyNutritionDto.womanGardenDiet,
      diet_sugar_woman: eligibleDto.familyNutritionDto.womanMuchSugar,
      diet_fat_woman: eligibleDto.familyNutritionDto.womanMuchFat,

      meal_other: eligibleDto.familyNutritionDto.threeMealsDetails,
      meal_animal_other: eligibleDto.familyNutritionDto.animalProteinDetails,
      meal_plant_other: eligibleDto.familyNutritionDto.plantProteinDetails,
      meal_vegetables_other: eligibleDto.familyNutritionDto.vegetableDetails,
      meal_fruit_other: eligibleDto.familyNutritionDto.fruitDetails,
      diet_family_other: eligibleDto.familyNutritionDto.familyMealDetails,
      diet_garden_other: eligibleDto.familyNutritionDto.gardenDietDetails,
      diet_sugar_other: eligibleDto.familyNutritionDto.muchSugarDetails,
      diet_fat_other: eligibleDto.familyNutritionDto.muchFatDetails,

      womanWeight: eligibleDto.midwifeAssessmentDto.womanWeight,
      womanHeight: eligibleDto.midwifeAssessmentDto.womanHeight,
      womanBmi: eligibleDto.midwifeAssessmentDto.womanBmi,
      womanBloodType: eligibleDto.midwifeAssessmentDto.womanBloodType,
      womanHemoglobin: eligibleDto.midwifeAssessmentDto.womanHemoglobin,

      manWeight: eligibleDto.midwifeAssessmentDto.manWeight,
      manHeight: eligibleDto.midwifeAssessmentDto.manHeight,
      manBmi: eligibleDto.midwifeAssessmentDto.manBmi,
      manBloodType: eligibleDto.midwifeAssessmentDto.manBloodType,
      manHemoglobin: eligibleDto.midwifeAssessmentDto.manHemoglobin,

      special: eligibleDto.midwifeAssessmentDto.special,
      session: eligibleDto.midwifeAssessmentDto.session,
    };
  }

  static createMidwifeEligibleObject(
    userEmail,
    formObject,
    pastPregnancies,
    familyPlanningMethods
  ) {
    return {
      email: userEmail,
      womanName: formObject.womanName,
      manName: formObject.manName,
      address: formObject.address,
      womanPhone: formObject.womanPhone,
      manPhone: formObject.manPhone,
      womanDob: formObject.womanDob,
      manDob: formObject.manDob,
      womanAgeMarried: formObject.womanAgeMarried,
      manAgeMarried: formObject.manAgeMarried,
      womanEducationLevel: formObject.womanEducationLevel,
      manEducationLevel: formObject.manEducationLevel,
      womanOccupation: formObject.womanOccupation,
      manOccupation: formObject.manOccupation,
      womanWeight: formObject.womanWeight,
      manWeight: formObject.manWeight,
      womanHeight: formObject.womanHeight,
      manHeight: formObject.manHeight,
      womanBmi: formObject.womanBmi,
      manBmi: formObject.manBmi,
      womanBloodType: formObject.womanBloodType,
      manBloodType: formObject.manBloodType,
      womanHemoglobin: formObject.womanHemoglobin,
      manHemoglobin: formObject.manHemoglobin,
      children: formObject.children,
      special: formObject.special,
      session: formObject.session,
      pastPregnancies: pastPregnancies, // Array of past pregnancy objects
      familyPlanningMethods: familyPlanningMethods, // Array of family planning method objects}
    };
  }

  // By midwife
  static async createEligibleInfo(formData) {
    try {
      const response = await axiosInstance.post(`/eligible/midwife/add`, {
        ...formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // For midwife
  static async getEligibleInfoForMidwife(email) {
    try {
      const response = await axiosInstance.get(
        `/eligible/midwife/get/${email}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // For midwife
  static async getEligibleListForMidwife() {
    try {
      const response = await axiosInstance.get(`/eligible/midwife/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
export default EligibleService;
