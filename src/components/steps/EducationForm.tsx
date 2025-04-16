
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash, Plus } from "lucide-react";

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation, setCurrentStep } = useResume();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");

  const resetForm = () => {
    setDegree("");
    setInstitution("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setGrade("");
    setEditMode(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode) {
      updateEducation(editMode, {
        degree,
        institution,
        location,
        startDate,
        endDate,
        grade
      });
    } else {
      addEducation({
        degree,
        institution,
        location,
        startDate,
        endDate,
        grade
      });
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const education = resumeData.education.find((edu) => edu.id === id);
    if (education) {
      setDegree(education.degree);
      setInstitution(education.institution);
      setLocation(education.location);
      setStartDate(education.startDate);
      setEndDate(education.endDate);
      setGrade(education.grade);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(0);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.education.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Education</h3>
            {resumeData.education.map((edu) => (
              <div
                key={edu.id}
                className="p-4 border rounded-lg bg-white flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution}, {edu.location}</p>
                  <p className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.grade && <p className="text-gray-500 text-sm">Grade: {edu.grade}</p>}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(edu.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Education" : "Add Education"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree/Certificate *</Label>
              <Input
                id="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="e.g., Bachelor of Science in Computer Science"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g., University of Technology"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Mumbai, India"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Percentage</Label>
              <Input
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="e.g., 8.5 CGPA or 85%"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="month"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {editMode && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-resume-secondary hover:bg-resume-primary">
              {editMode ? "Update" : "Add"} Education
            </Button>
          </div>
        </form>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handlePrevStep}>
            Previous
          </Button>
          <Button onClick={handleNextStep} className="bg-resume-primary hover:bg-resume-accent">
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
