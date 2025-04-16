
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Progress } from "@/components/ui/progress";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentStep } = useResume();
  
  const steps = [
    "Personal Information",
    "Education",
    "Experience",
    "Skills",
    "Projects",
    "Positions",
    "Achievements",
    "Activities",
    "Hobbies",
    "Generate PDF"
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-resume-bg">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-resume-primary font-inter">
            Shaurya Resume Builder
          </h1>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{steps[currentStep]}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white shadow-md py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} Shaurya Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
