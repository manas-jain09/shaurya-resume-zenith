
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Pencil, Trash } from "lucide-react";

const SkillsForm = () => {
  const { resumeData, addSkill, updateSkill, removeSkill, setCurrentStep } = useResume();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [level, setLevel] = useState(3);

  const resetForm = () => {
    setName("");
    setLevel(3);
    setEditMode(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode) {
      updateSkill(editMode, {
        name,
        level
      });
    } else {
      addSkill({
        name,
        level
      });
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const skill = resumeData.skills.find((s) => s.id === id);
    if (skill) {
      setName(skill.name);
      setLevel(skill.level);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleNextStep = () => {
    setCurrentStep(4);
  };

  const handlePrevStep = () => {
    setCurrentStep(2);
  };

  const getSkillLevelLabel = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Basic";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Intermediate";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.skills.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="p-4 border rounded-lg bg-white flex justify-between items-center"
                >
                  <div className="space-y-1 flex-1">
                    <h4 className="font-medium">{skill.name}</h4>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 h-2 rounded-full flex-1">
                        <div 
                          className="bg-resume-primary h-2 rounded-full" 
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{getSkillLevelLabel(skill.level)}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(skill.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeSkill(skill.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Skill" : "Add Skill"}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., React.js, Project Management, etc."
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="level">Proficiency Level</Label>
              <span className="text-sm text-gray-500">{getSkillLevelLabel(level)}</span>
            </div>
            <Slider
              id="level"
              min={1}
              max={5}
              step={1}
              value={[level]}
              onValueChange={(value) => setLevel(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Beginner</span>
              <span>Basic</span>
              <span>Intermediate</span>
              <span>Advanced</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {editMode && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-resume-secondary hover:bg-resume-primary">
              {editMode ? "Update" : "Add"} Skill
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

export default SkillsForm;
