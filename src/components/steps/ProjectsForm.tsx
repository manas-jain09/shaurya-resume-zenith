
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash, X } from "lucide-react";

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject, setCurrentStep } = useResume();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [technology, setTechnology] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setStartDate("");
    setEndDate("");
    setTechnology("");
    setTechnologies([]);
    setEditMode(null);
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
    
    if (editMode) {
      updateProject(editMode, {
        title,
        description,
        technologies,
        link,
        startDate,
        endDate
      });
    } else {
      addProject({
        title,
        description,
        technologies,
        link,
        startDate,
        endDate
      });
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const project = resumeData.projects.find((p) => p.id === id);
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setLink(project.link);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
      setTechnologies(project.technologies || []);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleNextStep = () => {
    setCurrentStep(5);
  };

  const handlePrevStep = () => {
    setCurrentStep(3);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.projects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Projects</h3>
            {resumeData.projects.map((project) => (
              <div
                key={project.id}
                className="p-4 border rounded-lg bg-white flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-gray-500 text-sm">
                    {project.startDate && `${project.startDate} - ${project.endDate || "Present"}`}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{project.description.substring(0, 100)}{project.description.length > 100 ? "..." : ""}</p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech) => (
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
                    onClick={() => handleEdit(project.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeProject(project.id)}
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
            {editMode ? "Edit Project" : "Add Project"}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., E-commerce Website"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project"
              required
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Project Link</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g., https://github.com/yourusername/project"
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
                placeholder="Leave blank if ongoing"
              />
            </div>
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
              {editMode ? "Update" : "Add"} Project
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

export default ProjectsForm;
