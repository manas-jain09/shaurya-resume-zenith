
import React, { useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const GeneratePDF = () => {
  const { resumeData, setCurrentStep } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrevStep = () => {
    setCurrentStep(8);
  };

  const handleGeneratePDF = async () => {
    if (!resumeRef.current) return;

    const resumeElement = resumeRef.current;
    const canvas = await html2canvas(resumeElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-resume-primary">
            Preview and Generate PDF
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Review your resume and generate a PDF version that you can download and share.
          </p>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              Previous
            </Button>
            <Button onClick={handleGeneratePDF} className="bg-resume-primary hover:bg-resume-accent">
              Generate PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-white shadow-lg p-8 mb-8" ref={resumeRef}>
        {/* Header / Personal Info */}
        <div className="border-b-2 border-resume-primary pb-4 mb-6">
          <h1 className="text-3xl font-bold text-resume-primary">
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
            {resumeData.personalInfo.email && (
              <span>{resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span>{resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.linkedin && (
              <span>{resumeData.personalInfo.linkedin}</span>
            )}
            {resumeData.personalInfo.github && (
              <span>{resumeData.personalInfo.github}</span>
            )}
            {resumeData.personalInfo.website && (
              <span>{resumeData.personalInfo.website}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Professional Summary
            </h2>
            <p className="text-sm">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.degree}</h3>
                    {(edu.startDate || edu.endDate) && (
                      <span className="text-sm text-gray-600">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate) || "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</p>
                  {edu.grade && <p className="text-sm text-gray-600">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.title}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-sm text-gray-600">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-1">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                  {exp.description.length > 0 && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {exp.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies?.length > 0 && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Technologies:</span> {exp.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Projects
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{project.title}</h3>
                    {(project.startDate || project.endDate) && (
                      <span className="text-sm text-gray-600">
                        {formatDate(project.startDate)} - {formatDate(project.endDate) || "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                    </p>
                  )}
                  {project.link && (
                    <p className="text-sm mt-1">
                      <span className="font-medium">Link:</span> {project.link}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="bg-gray-100 px-3 py-1 rounded text-sm"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Positions */}
        {resumeData.positions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Positions of Responsibility
            </h2>
            <div className="space-y-3">
              {resumeData.positions.map((position) => (
                <div key={position.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{position.title}</h3>
                    {(position.startDate || position.endDate) && (
                      <span className="text-sm text-gray-600">
                        {formatDate(position.startDate)} - {formatDate(position.endDate) || "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{position.organization}</p>
                  {position.description && <p className="text-sm">{position.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Achievements
            </h2>
            <div className="space-y-3">
              {resumeData.achievements.map((achievement) => (
                <div key={achievement.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{achievement.title}</h3>
                    {achievement.date && (
                      <span className="text-sm text-gray-600">{formatDate(achievement.date)}</span>
                    )}
                  </div>
                  {achievement.description && <p className="text-sm">{achievement.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {resumeData.activities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Extracurricular Activities
            </h2>
            <div className="space-y-3">
              {resumeData.activities.map((activity) => (
                <div key={activity.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{activity.title}</h3>
                    {(activity.startDate || activity.endDate) && (
                      <span className="text-sm text-gray-600">
                        {formatDate(activity.startDate)} - {formatDate(activity.endDate) || "Present"}
                      </span>
                    )}
                  </div>
                  {activity.organization && <p className="text-sm">{activity.organization}</p>}
                  {activity.description && <p className="text-sm">{activity.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {resumeData.hobbies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2">
              Hobbies & Interests
            </h2>
            <p className="text-sm">{resumeData.hobbies.map((h) => h.name).join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePDF;
