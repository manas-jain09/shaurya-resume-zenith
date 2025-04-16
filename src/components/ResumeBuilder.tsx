
import React from "react";
import { useResume } from "@/context/ResumeContext";
import Layout from "./Layout";
import PersonalInfoForm from "./steps/PersonalInfoForm";
import EducationForm from "./steps/EducationForm";
import ExperienceForm from "./steps/ExperienceForm";
import SkillsForm from "./steps/SkillsForm";
import ProjectsForm from "./steps/ProjectsForm";
import PositionsForm from "./steps/PositionsForm";
import AchievementsForm from "./steps/AchievementsForm";
import ActivitiesForm from "./steps/ActivitiesForm";
import HobbiesForm from "./steps/HobbiesForm";
import GeneratePDF from "./steps/GeneratePDF";

const ResumeBuilder = () => {
  const { currentStep } = useResume();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <EducationForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <SkillsForm />;
      case 4:
        return <ProjectsForm />;
      case 5:
        return <PositionsForm />;
      case 6:
        return <AchievementsForm />;
      case 7:
        return <ActivitiesForm />;
      case 8:
        return <HobbiesForm />;
      case 9:
        return <GeneratePDF />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <Layout>
      {renderStep()}
    </Layout>
  );
};

export default ResumeBuilder;
