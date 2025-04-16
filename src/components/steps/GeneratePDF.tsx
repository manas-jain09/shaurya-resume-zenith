import React, { useRef } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7SUc.woff2', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7SUc.woff2', fontWeight: 700 },
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Inter',
    fontSize: 10,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    borderBottomStyle: 'solid',
    paddingBottom: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: '#3B82F6',
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 5,
    color: '#4B5563',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: '#3B82F6',
    borderBottomWidth: 1,
    borderBottomColor: '#3B82F6',
    borderBottomStyle: 'solid',
    paddingBottom: 3,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 700,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 11,
    fontWeight: 500,
    marginBottom: 2,
  },
  date: {
    fontSize: 10,
    color: '#6B7280',
  },
  description: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  bulletList: {
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 4,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  technologies: {
    fontSize: 9,
    marginTop: 2,
  },
  techLabel: {
    fontWeight: 700,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    backgroundColor: '#F3F4F6',
    padding: '3 6',
    borderRadius: 4,
    fontSize: 9,
  },
  hobbies: {
    fontSize: 10,
  },
});

const ResumePDF = ({ resumeData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </Text>
          <View style={styles.contactInfo}>
            {resumeData.personalInfo.email && (
              <View style={styles.contactItem}>
                <Text>{resumeData.personalInfo.email}</Text>
              </View>
            )}
            {resumeData.personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text>{resumeData.personalInfo.phone}</Text>
              </View>
            )}
            {resumeData.personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text>{resumeData.personalInfo.linkedin}</Text>
              </View>
            )}
            {resumeData.personalInfo.github && (
              <View style={styles.contactItem}>
                <Text>{resumeData.personalInfo.github}</Text>
              </View>
            )}
            {resumeData.personalInfo.website && (
              <View style={styles.contactItem}>
                <Text>{resumeData.personalInfo.website}</Text>
              </View>
            )}
          </View>
        </View>

        {resumeData.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{resumeData.personalInfo.summary}</Text>
          </View>
        )}

        {resumeData.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</Text>
                {edu.grade && <Text style={styles.description}>Grade: {edu.grade}</Text>}
              </View>
            ))}
          </View>
        )}

        {resumeData.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resumeData.experience.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 8 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}{exp.location ? `, ${exp.location}` : ""}</Text>
                {exp.description.length > 0 && (
                  <View style={styles.bulletList}>
                    {exp.description.map((desc, index) => (
                      <View key={index} style={styles.bulletItem}>
                        <Text style={styles.bullet}>• </Text>
                        <Text style={styles.bulletText}>{desc}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {exp.technologies?.length > 0 && (
                  <Text style={styles.technologies}>
                    <Text style={styles.techLabel}>Technologies: </Text>
                    {exp.technologies.join(", ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {resumeData.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resumeData.projects.map((project) => (
              <View key={project.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{project.title}</Text>
                  <Text style={styles.date}>
                    {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : "Present"}
                  </Text>
                </View>
                <Text style={styles.description}>{project.description}</Text>
                {project.technologies?.length > 0 && (
                  <Text style={styles.technologies}>
                    <Text style={styles.techLabel}>Technologies: </Text>
                    {project.technologies.join(", ")}
                  </Text>
                )}
                {project.link && (
                  <Text style={styles.technologies}>
                    <Text style={styles.techLabel}>Link: </Text>
                    {project.link}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {resumeData.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resumeData.skills.map((skill) => (
                <View key={skill.id} style={styles.skillItem}>
                  <Text>{skill.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {resumeData.positions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Positions of Responsibility</Text>
            {resumeData.positions.map((position) => (
              <View key={position.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{position.title}</Text>
                  <Text style={styles.date}>
                    {formatDate(position.startDate)} - {position.endDate ? formatDate(position.endDate) : "Present"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{position.organization}</Text>
                {position.description && <Text style={styles.description}>{position.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {resumeData.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {resumeData.achievements.map((achievement) => (
              <View key={achievement.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{achievement.title}</Text>
                  {achievement.date && (
                    <Text style={styles.date}>{formatDate(achievement.date)}</Text>
                  )}
                </View>
                {achievement.description && <Text style={styles.description}>{achievement.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {resumeData.activities.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Extracurricular Activities</Text>
            {resumeData.activities.map((activity) => (
              <View key={activity.id} style={{ marginBottom: 6 }}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{activity.title}</Text>
                  <Text style={styles.date}>
                    {formatDate(activity.startDate)} - {activity.endDate ? formatDate(activity.endDate) : "Present"}
                  </Text>
                </View>
                {activity.organization && <Text style={styles.itemSubtitle}>{activity.organization}</Text>}
                {activity.description && <Text style={styles.description}>{activity.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {resumeData.hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hobbies & Interests</Text>
            <Text style={styles.hobbies}>{resumeData.hobbies.map((h) => h.name).join(", ")}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

const GeneratePDF = () => {
  const { resumeData, setCurrentStep } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrevStep = () => {
    setCurrentStep(8);
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
            <PDFDownloadLink 
              document={<ResumePDF resumeData={resumeData} />} 
              fileName={`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`}
              className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-resume-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-resume-accent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-resume-primary disabled:pointer-events-none disabled:opacity-50"
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Preparing PDF...' : 'Download PDF'
              }
            </PDFDownloadLink>
          </div>
        </CardContent>
      </Card>

      <div 
        className="bg-white shadow-lg p-8 mb-8 w-[210mm] mx-auto" 
        ref={resumeRef} 
        style={{ minHeight: '297mm', maxWidth: '100%', boxSizing: 'border-box' }}
      >
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

        {resumeData.personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-resume-primary border-b mb-2 pb-1">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{resumeData.personalInfo.summary}</p>
          </div>
        )}

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
