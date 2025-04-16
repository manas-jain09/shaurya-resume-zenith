
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
  const { currentStep, setCurrentStep, resumeData } = useResume();

  const steps = [
    { name: "Personal Information", component: PersonalInfoForm },
    { name: "Education", component: EducationForm },
    { name: "Experience", component: ExperienceForm },
    { name: "Skills", component: SkillsForm },
    { name: "Projects", component: ProjectsForm },
    { name: "Positions", component: PositionsForm },
    { name: "Achievements", component: AchievementsForm },
    { name: "Activities", component: ActivitiesForm },
    { name: "Hobbies", component: HobbiesForm },
    { name: "Generate PDF", component: GeneratePDF },
  ];

  const handleNavigation = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderStep = () => {
    const Component = steps[currentStep].component;
    return <Component />;
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 bg-white rounded-lg shadow-md p-4 h-fit">
          <h2 className="text-lg font-semibold mb-3 text-resume-primary">Navigation</h2>
          <div className="space-y-1">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  currentStep === index
                    ? "bg-resume-primary text-white font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {step.name}
              </button>
            ))}
          </div>
        </div>
        <div className="md:w-3/4">
          {renderStep()}
        </div>
      </div>
    </Layout>
  );
};

export default ResumeBuilder;
