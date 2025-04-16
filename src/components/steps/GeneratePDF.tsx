
import React, { useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

const GeneratePDF = () => {
  const { resumeData, setCurrentStep } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrevStep = () => {
    setCurrentStep(8);
  };

  const handleGeneratePDF = async () => {
    if (!resumeRef.current) return;

    try {
      toast("Generating PDF", {
        description: "Please wait while we generate your PDF...",
      });
      
      const resumeElement = resumeRef.current;
      
      const canvas = await html2canvas(resumeElement, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 800,
        windowHeight: 1131,
      });
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const margin = 1; // Changed to 1mm as requested
      const contentWidth = pdfWidth - (2 * margin);
      const contentHeight = pdfHeight - (2 * margin);
      
      const scaledImgWidth = imgWidth * ratio;
      const scaledImgHeight = imgHeight * ratio;
      
      const imgX = margin + (contentWidth - scaledImgWidth) / 2;
      const imgY = margin + (contentHeight - scaledImgHeight) / 2;
      
      pdf.addImage({
        imageData: imgData,
        format: "PNG", 
        x: imgX, 
        y: imgY, 
        width: scaledImgWidth,
        height: scaledImgHeight,
        compression: "FAST",
        rotation: 0
      });
      
      pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
      
      toast("PDF Generated", {
        description: "Your resume PDF has been successfully generated!",
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast("PDF Generation Failed", {
        description: "There was an error generating your PDF. Please try again.",
      });
    }
  };

  const openPreviewInNewTab = () => {
    // Serialize the resume data to pass to the new window
    const resumeDataString = JSON.stringify(resumeData);
    
    // Open a new window and write the HTML content
    const newWindow = window.open('', '_blank');
    if (!newWindow) {
      toast("Preview Failed", {
        description: "Could not open a new window. Please check your browser settings.",
      });
      return;
    }

    // Create HTML content for the new window
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
          }
          
          body {
            background-color: #f5f5f5;
            padding: 2rem;
          }
          
          .container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 2rem;
          }
          
          .header {
            border-bottom: 2px solid #2563eb;
            padding-bottom: 1rem;
            margin-bottom: 1.5rem;
          }
          
          h1 {
            font-size: 1.75rem;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 0.5rem;
          }
          
          .contact-info {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            font-size: 0.875rem;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
          }
          
          .section {
            margin-bottom: 1.5rem;
          }
          
          .section-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #2563eb;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 0.75rem;
            padding-bottom: 0.25rem;
          }
          
          .item {
            margin-bottom: 0.75rem;
          }
          
          .item-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          }
          
          .item-title {
            font-weight: 500;
            font-size: 1rem;
          }
          
          .item-date {
            font-size: 0.75rem;
            color: #4b5563;
          }
          
          .item-subtitle {
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.25rem;
          }
          
          .item-details {
            font-size: 0.875rem;
          }
          
          ul {
            padding-left: 1.5rem;
          }
          
          li {
            font-size: 0.875rem;
            line-height: 1.4;
            margin-bottom: 0.25rem;
          }
          
          .technologies {
            font-size: 0.75rem;
            margin-top: 0.25rem;
          }
          
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.375rem;
            list-style-type: none;
            padding-left: 0;
          }
          
          .skill-item {
            background-color: #f3f4f6;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
          }
          
          .print-button {
            display: block;
            margin: 1rem auto;
            padding: 0.5rem 1rem;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 0.25rem;
            font-weight: 500;
            cursor: pointer;
          }
          
          @media print {
            body {
              background: none;
              padding: 0;
            }
            
            .container {
              box-shadow: none;
              max-width: 100%;
              padding: 0.5cm;
            }
            
            .print-button {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <button class="print-button" onclick="window.print()">Print Resume</button>
        <div class="container">
          <div id="resume-content"></div>
        </div>
        
        <script>
          const resumeData = ${resumeDataString};
          
          function formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            });
          }
          
          function buildResume() {
            const container = document.getElementById("resume-content");
            
            // Header Section
            const header = document.createElement("div");
            header.className = "header";
            
            const name = document.createElement("h1");
            name.textContent = \`\${resumeData.personalInfo.firstName} \${resumeData.personalInfo.lastName}\`;
            header.appendChild(name);
            
            const contactInfo = document.createElement("div");
            contactInfo.className = "contact-info";
            
            if (resumeData.personalInfo.email) {
              const email = document.createElement("span");
              email.className = "contact-item";
              email.textContent = resumeData.personalInfo.email;
              contactInfo.appendChild(email);
            }
            
            if (resumeData.personalInfo.phone) {
              const phone = document.createElement("span");
              phone.className = "contact-item";
              phone.textContent = resumeData.personalInfo.phone;
              contactInfo.appendChild(phone);
            }
            
            if (resumeData.personalInfo.linkedin) {
              const linkedin = document.createElement("span");
              linkedin.className = "contact-item";
              linkedin.textContent = resumeData.personalInfo.linkedin;
              contactInfo.appendChild(linkedin);
            }
            
            if (resumeData.personalInfo.github) {
              const github = document.createElement("span");
              github.className = "contact-item";
              github.textContent = resumeData.personalInfo.github;
              contactInfo.appendChild(github);
            }
            
            if (resumeData.personalInfo.website) {
              const website = document.createElement("span");
              website.className = "contact-item";
              website.textContent = resumeData.personalInfo.website;
              contactInfo.appendChild(website);
            }
            
            header.appendChild(contactInfo);
            container.appendChild(header);
            
            // Summary Section
            if (resumeData.personalInfo.summary) {
              const summarySection = document.createElement("div");
              summarySection.className = "section";
              
              const summaryTitle = document.createElement("h2");
              summaryTitle.className = "section-title";
              summaryTitle.textContent = "Professional Summary";
              summarySection.appendChild(summaryTitle);
              
              const summary = document.createElement("p");
              summary.className = "item-details";
              summary.textContent = resumeData.personalInfo.summary;
              summarySection.appendChild(summary);
              
              container.appendChild(summarySection);
            }
            
            // Education Section
            if (resumeData.education.length > 0) {
              const educationSection = document.createElement("div");
              educationSection.className = "section";
              
              const educationTitle = document.createElement("h2");
              educationTitle.className = "section-title";
              educationTitle.textContent = "Education";
              educationSection.appendChild(educationTitle);
              
              resumeData.education.forEach(edu => {
                const eduItem = document.createElement("div");
                eduItem.className = "item";
                
                const eduHeader = document.createElement("div");
                eduHeader.className = "item-header";
                
                const degree = document.createElement("h3");
                degree.className = "item-title";
                degree.textContent = edu.degree;
                eduHeader.appendChild(degree);
                
                if (edu.startDate || edu.endDate) {
                  const dates = document.createElement("span");
                  dates.className = "item-date";
                  dates.textContent = \`\${formatDate(edu.startDate)} - \${edu.endDate ? formatDate(edu.endDate) : "Present"}\`;
                  eduHeader.appendChild(dates);
                }
                
                eduItem.appendChild(eduHeader);
                
                const institution = document.createElement("p");
                institution.className = "item-subtitle";
                institution.textContent = \`\${edu.institution}\${edu.location ? \`, \${edu.location}\` : ""}\`;
                eduItem.appendChild(institution);
                
                if (edu.grade) {
                  const grade = document.createElement("p");
                  grade.className = "item-details";
                  grade.textContent = \`Grade: \${edu.grade}\`;
                  eduItem.appendChild(grade);
                }
                
                educationSection.appendChild(eduItem);
              });
              
              container.appendChild(educationSection);
            }
            
            // Experience Section
            if (resumeData.experience.length > 0) {
              const experienceSection = document.createElement("div");
              experienceSection.className = "section";
              
              const experienceTitle = document.createElement("h2");
              experienceTitle.className = "section-title";
              experienceTitle.textContent = "Experience";
              experienceSection.appendChild(experienceTitle);
              
              resumeData.experience.forEach(exp => {
                const expItem = document.createElement("div");
                expItem.className = "item";
                
                const expHeader = document.createElement("div");
                expHeader.className = "item-header";
                
                const title = document.createElement("h3");
                title.className = "item-title";
                title.textContent = exp.title;
                expHeader.appendChild(title);
                
                if (exp.startDate || exp.endDate) {
                  const dates = document.createElement("span");
                  dates.className = "item-date";
                  dates.textContent = \`\${formatDate(exp.startDate)} - \${exp.endDate ? formatDate(exp.endDate) : "Present"}\`;
                  expHeader.appendChild(dates);
                }
                
                expItem.appendChild(expHeader);
                
                const company = document.createElement("p");
                company.className = "item-subtitle";
                company.textContent = \`\${exp.company}\${exp.location ? \`, \${exp.location}\` : ""}\`;
                expItem.appendChild(company);
                
                if (exp.description && exp.description.length > 0) {
                  const descList = document.createElement("ul");
                  exp.description.forEach(desc => {
                    const descItem = document.createElement("li");
                    descItem.textContent = desc;
                    descList.appendChild(descItem);
                  });
                  expItem.appendChild(descList);
                }
                
                if (exp.technologies && exp.technologies.length > 0) {
                  const tech = document.createElement("p");
                  tech.className = "technologies";
                  tech.innerHTML = \`<strong>Technologies:</strong> \${exp.technologies.join(", ")}\`;
                  expItem.appendChild(tech);
                }
                
                experienceSection.appendChild(expItem);
              });
              
              container.appendChild(experienceSection);
            }
            
            // Projects Section
            if (resumeData.projects.length > 0) {
              const projectsSection = document.createElement("div");
              projectsSection.className = "section";
              
              const projectsTitle = document.createElement("h2");
              projectsTitle.className = "section-title";
              projectsTitle.textContent = "Projects";
              projectsSection.appendChild(projectsTitle);
              
              resumeData.projects.forEach(project => {
                const projectItem = document.createElement("div");
                projectItem.className = "item";
                
                const projectHeader = document.createElement("div");
                projectHeader.className = "item-header";
                
                const title = document.createElement("h3");
                title.className = "item-title";
                title.textContent = project.title;
                projectHeader.appendChild(title);
                
                if (project.startDate || project.endDate) {
                  const dates = document.createElement("span");
                  dates.className = "item-date";
                  dates.textContent = \`\${formatDate(project.startDate)} - \${project.endDate ? formatDate(project.endDate) : "Present"}\`;
                  projectHeader.appendChild(dates);
                }
                
                projectItem.appendChild(projectHeader);
                
                const description = document.createElement("p");
                description.className = "item-details";
                description.textContent = project.description;
                projectItem.appendChild(description);
                
                if (project.technologies && project.technologies.length > 0) {
                  const tech = document.createElement("p");
                  tech.className = "technologies";
                  tech.innerHTML = \`<strong>Technologies:</strong> \${project.technologies.join(", ")}\`;
                  projectItem.appendChild(tech);
                }
                
                if (project.link) {
                  const link = document.createElement("p");
                  link.className = "technologies";
                  link.innerHTML = \`<strong>Link:</strong> \${project.link}\`;
                  projectItem.appendChild(link);
                }
                
                projectsSection.appendChild(projectItem);
              });
              
              container.appendChild(projectsSection);
            }
            
            // Skills Section
            if (resumeData.skills.length > 0) {
              const skillsSection = document.createElement("div");
              skillsSection.className = "section";
              
              const skillsTitle = document.createElement("h2");
              skillsTitle.className = "section-title";
              skillsTitle.textContent = "Skills";
              skillsSection.appendChild(skillsTitle);
              
              const skillsList = document.createElement("ul");
              skillsList.className = "skills-list";
              
              resumeData.skills.forEach(skill => {
                const skillItem = document.createElement("li");
                skillItem.className = "skill-item";
                skillItem.textContent = skill.name;
                skillsList.appendChild(skillItem);
              });
              
              skillsSection.appendChild(skillsList);
              container.appendChild(skillsSection);
            }
            
            // Positions Section
            if (resumeData.positions.length > 0) {
              const positionsSection = document.createElement("div");
              positionsSection.className = "section";
              
              const positionsTitle = document.createElement("h2");
              positionsTitle.className = "section-title";
              positionsTitle.textContent = "Positions of Responsibility";
              positionsSection.appendChild(positionsTitle);
              
              resumeData.positions.forEach(position => {
                const positionItem = document.createElement("div");
                positionItem.className = "item";
                
                const positionHeader = document.createElement("div");
                positionHeader.className = "item-header";
                
                const title = document.createElement("h3");
                title.className = "item-title";
                title.textContent = position.title;
                positionHeader.appendChild(title);
                
                if (position.startDate || position.endDate) {
                  const dates = document.createElement("span");
                  dates.className = "item-date";
                  dates.textContent = \`\${formatDate(position.startDate)} - \${position.endDate ? formatDate(position.endDate) : "Present"}\`;
                  positionHeader.appendChild(dates);
                }
                
                positionItem.appendChild(positionHeader);
                
                const organization = document.createElement("p");
                organization.className = "item-subtitle";
                organization.textContent = position.organization;
                positionItem.appendChild(organization);
                
                if (position.description) {
                  const description = document.createElement("p");
                  description.className = "item-details";
                  description.textContent = position.description;
                  positionItem.appendChild(description);
                }
                
                positionsSection.appendChild(positionItem);
              });
              
              container.appendChild(positionsSection);
            }
            
            // Achievements Section
            if (resumeData.achievements.length > 0) {
              const achievementsSection = document.createElement("div");
              achievementsSection.className = "section";
              
              const achievementsTitle = document.createElement("h2");
              achievementsTitle.className = "section-title";
              achievementsTitle.textContent = "Achievements";
              achievementsSection.appendChild(achievementsTitle);
              
              resumeData.achievements.forEach(achievement => {
                const achievementItem = document.createElement("div");
                achievementItem.className = "item";
                
                const achievementHeader = document.createElement("div");
                achievementHeader.className = "item-header";
                
                const title = document.createElement("h3");
                title.className = "item-title";
                title.textContent = achievement.title;
                achievementHeader.appendChild(title);
                
                if (achievement.date) {
                  const date = document.createElement("span");
                  date.className = "item-date";
                  date.textContent = formatDate(achievement.date);
                  achievementHeader.appendChild(date);
                }
                
                achievementItem.appendChild(achievementHeader);
                
                if (achievement.description) {
                  const description = document.createElement("p");
                  description.className = "item-details";
                  description.textContent = achievement.description;
                  achievementItem.appendChild(description);
                }
                
                achievementsSection.appendChild(achievementItem);
              });
              
              container.appendChild(achievementsSection);
            }
            
            // Activities Section
            if (resumeData.activities.length > 0) {
              const activitiesSection = document.createElement("div");
              activitiesSection.className = "section";
              
              const activitiesTitle = document.createElement("h2");
              activitiesTitle.className = "section-title";
              activitiesTitle.textContent = "Extracurricular Activities";
              activitiesSection.appendChild(activitiesTitle);
              
              resumeData.activities.forEach(activity => {
                const activityItem = document.createElement("div");
                activityItem.className = "item";
                
                const activityHeader = document.createElement("div");
                activityHeader.className = "item-header";
                
                const title = document.createElement("h3");
                title.className = "item-title";
                title.textContent = activity.title;
                activityHeader.appendChild(title);
                
                if (activity.startDate || activity.endDate) {
                  const dates = document.createElement("span");
                  dates.className = "item-date";
                  dates.textContent = \`\${formatDate(activity.startDate)} - \${activity.endDate ? formatDate(activity.endDate) : "Present"}\`;
                  activityHeader.appendChild(dates);
                }
                
                activityItem.appendChild(activityHeader);
                
                if (activity.organization) {
                  const organization = document.createElement("p");
                  organization.className = "item-subtitle";
                  organization.textContent = activity.organization;
                  activityItem.appendChild(organization);
                }
                
                if (activity.description) {
                  const description = document.createElement("p");
                  description.className = "item-details";
                  description.textContent = activity.description;
                  activityItem.appendChild(description);
                }
                
                activitiesSection.appendChild(activityItem);
              });
              
              container.appendChild(activitiesSection);
            }
            
            // Hobbies Section
            if (resumeData.hobbies.length > 0) {
              const hobbiesSection = document.createElement("div");
              hobbiesSection.className = "section";
              
              const hobbiesTitle = document.createElement("h2");
              hobbiesTitle.className = "section-title";
              hobbiesTitle.textContent = "Hobbies & Interests";
              hobbiesSection.appendChild(hobbiesTitle);
              
              const hobbies = document.createElement("p");
              hobbies.className = "item-details";
              hobbies.textContent = resumeData.hobbies.map(h => h.name).join(", ");
              hobbiesSection.appendChild(hobbies);
              
              container.appendChild(hobbiesSection);
            }
          }
          
          buildResume();
        </script>
      </body>
      </html>
    `;

    // Write the HTML content to the new window
    newWindow.document.write(htmlContent);
    newWindow.document.close();
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
          <div className="flex justify-between flex-wrap gap-2">
            <Button variant="outline" onClick={handlePrevStep}>
              Previous
            </Button>
            <div className="flex gap-2">
              <Button 
                onClick={openPreviewInNewTab} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </Button>
              <Button onClick={handleGeneratePDF} className="bg-resume-primary hover:bg-resume-accent">
                Generate PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div 
        className="bg-white shadow-lg p-8 mb-8 w-[210mm] mx-auto" 
        ref={resumeRef} 
        style={{ minHeight: '297mm', maxWidth: '100%', boxSizing: 'border-box' }}
      >
        {/* Header / Personal Info */}
        <div className="border-b-2 border-resume-primary pb-4 mb-6">
          <h1 className="text-3xl font-bold text-resume-primary">
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
            {resumeData.personalInfo.email && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {resumeData.personalInfo.email}
              </span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {resumeData.personalInfo.phone}
              </span>
            )}
            {resumeData.personalInfo.linkedin && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                {resumeData.personalInfo.linkedin}
              </span>
            )}
            {resumeData.personalInfo.github && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {resumeData.personalInfo.github}
              </span>
            )}
            {resumeData.personalInfo.website && (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {resumeData.personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {resumeData.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-base">{edu.degree}</h3>
                    {(edu.startDate || edu.endDate) && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</p>
                  {edu.grade && <p className="text-sm text-gray-700">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-base">{exp.title}</h3>
                    {(exp.startDate || exp.endDate) && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium mb-1">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                  {exp.description.length > 0 && (
                    <ul className="list-disc list-outside text-sm space-y-1 pl-5 mb-1">
                      {exp.description.map((desc, index) => (
                        <li key={index} className="text-sm leading-tight">{desc}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies?.length > 0 && (
                    <p className="text-xs mt-1">
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
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Projects
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((project) => (
                <div key={project.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-base">{project.title}</h3>
                    {(project.startDate || project.endDate) && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-tight">{project.description}</p>
                  {project.technologies?.length > 0 && (
                    <p className="text-xs mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(", ")}
                    </p>
                  )}
                  {project.link && (
                    <p className="text-xs mt-1">
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
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {resumeData.skills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="bg-gray-100 px-2 py-0.5 text-xs rounded"
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
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Positions of Responsibility
            </h2>
            <div className="space-y-2">
              {resumeData.positions.map((position) => (
                <div key={position.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-base">{position.title}</h3>
                    {(position.startDate || position.endDate) && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(position.startDate)} - {position.endDate ? formatDate(position.endDate) : "Present"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium">{position.organization}</p>
                  {position.description && <p className="text-sm leading-tight">{position.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Achievements
            </h2>
            <div className="space-y-2">
              {resumeData.achievements.map((achievement) => (
                <div key={achievement.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-base">{achievement.title}</h3>
                    {achievement.date && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">{formatDate(achievement.date)}</span>
                    )}
                  </div>
                  {achievement.description && <p className="text-sm leading-tight">{achievement.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activities */}
        {resumeData.activities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Extracurricular Activities
            </h2>
            <div className="space-y-2">
              {resumeData.activities.map((activity) => (
                <div key={activity.id} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-base">{activity.title}</h3>
                    {(activity.startDate || activity.endDate) && (
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(activity.startDate)} - {activity.endDate ? formatDate(activity.endDate) : "Present"}
                      </span>
                    )}
                  </div>
                  {activity.organization && <p className="text-sm font-medium">{activity.organization}</p>}
                  {activity.description && <p className="text-sm leading-tight">{activity.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies */}
        {resumeData.hobbies.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
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
