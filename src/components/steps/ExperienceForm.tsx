
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash, X } from "lucide-react";

const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience, setCurrentStep } = useResume();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState<string[]>([""]);
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const resetForm = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setDescription([""]);
    setTechnology("");
    setTechnologies([]);
    setEditMode(null);
  };

  const handleAddDescription = () => {
    setDescription([...description, ""]);
  };

  const handleRemoveDescription = (index: number) => {
    const newDescription = description.filter((_, i) => i !== index);
    setDescription(newDescription.length ? newDescription : [""]);
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const newDescription = [...description];
    newDescription[index] = value;
    setDescription(newDescription);
  };

  const handleAddTechnology = () => {
    if (technology.trim() && !technologies.includes(technology.trim())) {
      setTechnologies([...technologies, technology.trim()]);
      setTechnology("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filteredDescription = description.filter((desc) => desc.trim());
    
    if (editMode) {
      updateExperience(editMode, {
        title,
        company,
        location,
        startDate,
        endDate,
        description: filteredDescription,
        technologies
      });
    } else {
      addExperience({
        title,
        company,
        location,
        startDate,
        endDate,
        description: filteredDescription,
        technologies
      });
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === id);
    if (experience) {
      setTitle(experience.title);
      setCompany(experience.company);
      setLocation(experience.location);
      setStartDate(experience.startDate);
      setEndDate(experience.endDate);
      setDescription(experience.description.length ? experience.description : [""]);
      setTechnologies(experience.technologies || []);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleNextStep = () => {
    setCurrentStep(3);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.experience.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Work Experience</h3>
            {resumeData.experience.map((exp) => (
              <div
                key={exp.id}
                className="p-4 border rounded-lg bg-white flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-gray-600">{exp.company}, {exp.location}</p>
                  <p className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(exp.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeExperience(exp.id)}
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
            {editMode ? "Edit Experience" : "Add Experience"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Software Developer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Tech Solutions Inc."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Mumbai, India"
            />
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
                placeholder="Leave blank if current"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Responsibilities/Achievements</Label>
            {description.map((desc, index) => (
              <div key={index} className="flex items-center gap-2">
                <Textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  placeholder="Describe your responsibilities or achievements"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveDescription(index)}
                  disabled={description.length === 1 && !desc}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddDescription}
              className="mt-2"
            >
              Add Description
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                value={technology}
                onChange={(e) => setTechnology(e.target.value)}
                placeholder="e.g., React"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTechnology}
                disabled={!technology.trim()}
              >
                Add
              </Button>
            </div>
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech) => (
                  <div
                    key={tech}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center gap-1"
                  >
                    <span>{tech}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => handleRemoveTechnology(tech)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            {editMode && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-resume-secondary hover:bg-resume-primary">
              {editMode ? "Update" : "Add"} Experience
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

export default ExperienceForm;
