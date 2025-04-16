
import React, { createContext, useState, useContext, ReactNode } from "react";

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate: string;
};

export type Skill = {
  id: string;
  name: string;
  level: number;
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
};

export type Position = {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Achievement = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export type Activity = {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Hobby = {
  id: string;
  name: string;
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
};

export type ResumeData = {
  personalInfo: PersonalInfo;
  education: Education[];
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  positions: Position[];
  achievements: Achievement[];
  activities: Activity[];
  hobbies: Hobby[];
};

const initialPersonalInfo: PersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  linkedin: "",
  github: "",
  website: "",
  summary: "",
};

const initialResumeData: ResumeData = {
  personalInfo: initialPersonalInfo,
  education: [],
  projects: [],
  skills: [],
  experience: [],
  positions: [],
  achievements: [],
  activities: [],
  hobbies: [],
};

type ResumeContextType = {
  resumeData: ResumeData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addPosition: (position: Omit<Position, "id">) => void;
  updatePosition: (id: string, position: Partial<Position>) => void;
  removePosition: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, "id">) => void;
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;
  addActivity: (activity: Omit<Activity, "id">) => void;
  updateActivity: (id: string, activity: Partial<Activity>) => void;
  removeActivity: (id: string) => void;
  addHobby: (hobby: Omit<Hobby, "id">) => void;
  updateHobby: (id: string, hobby: Partial<Hobby>) => void;
  removeHobby: (id: string) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [currentStep, setCurrentStep] = useState(0);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }));
  };

  const addEducation = (education: Omit<Education, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { ...education, id: generateId() }],
    }));
  };

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addProject = (project: Omit<Project, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: generateId() }],
    }));
  };

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, ...project } : proj
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  const addSkill = (skill: Omit<Skill, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: generateId() }],
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addExperience = (experience: Omit<Experience, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: generateId() }],
    }));
  };

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addPosition = (position: Omit<Position, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      positions: [...prev.positions, { ...position, id: generateId() }],
    }));
  };

  const updatePosition = (id: string, position: Partial<Position>) => {
    setResumeData((prev) => ({
      ...prev,
      positions: prev.positions.map((pos) =>
        pos.id === id ? { ...pos, ...position } : pos
      ),
    }));
  };

  const removePosition = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      positions: prev.positions.filter((pos) => pos.id !== id),
    }));
  };

  const addAchievement = (achievement: Omit<Achievement, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { ...achievement, id: generateId() }],
    }));
  };

  const updateAchievement = (id: string, achievement: Partial<Achievement>) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((ach) =>
        ach.id === id ? { ...ach, ...achievement } : ach
      ),
    }));
  };

  const removeAchievement = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((ach) => ach.id !== id),
    }));
  };

  const addActivity = (activity: Omit<Activity, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      activities: [...prev.activities, { ...activity, id: generateId() }],
    }));
  };

  const updateActivity = (id: string, activity: Partial<Activity>) => {
    setResumeData((prev) => ({
      ...prev,
      activities: prev.activities.map((act) =>
        act.id === id ? { ...act, ...activity } : act
      ),
    }));
  };

  const removeActivity = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      activities: prev.activities.filter((act) => act.id !== id),
    }));
  };

  const addHobby = (hobby: Omit<Hobby, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, { ...hobby, id: generateId() }],
    }));
  };

  const updateHobby = (id: string, hobby: Partial<Hobby>) => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.map((h) => (h.id === id ? { ...h, ...hobby } : h)),
    }));
  };

  const removeHobby = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h.id !== id),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        currentStep,
        setCurrentStep,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        addSkill,
        updateSkill,
        removeSkill,
        addExperience,
        updateExperience,
        removeExperience,
        addPosition,
        updatePosition,
        removePosition,
        addAchievement,
        updateAchievement,
        removeAchievement,
        addActivity,
        updateActivity,
        removeActivity,
        addHobby,
        updateHobby,
        removeHobby,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
