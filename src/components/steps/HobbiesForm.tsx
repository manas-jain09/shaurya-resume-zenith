
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash, X } from "lucide-react";

const HobbiesForm = () => {
  const { resumeData, addHobby, updateHobby, removeHobby, setCurrentStep } = useResume();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const [name, setName] = useState("");

  const resetForm = () => {
    setName("");
    setEditMode(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode) {
      updateHobby(editMode, { name });
    } else {
      addHobby({ name });
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const hobby = resumeData.hobbies.find((h) => h.id === id);
    if (hobby) {
      setName(hobby.name);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleNextStep = () => {
    setCurrentStep(9);
  };

  const handlePrevStep = () => {
    setCurrentStep(7);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Hobbies & Interests
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.hobbies.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Hobbies & Interests</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.hobbies.map((hobby) => (
                <div
                  key={hobby.id}
                  className="bg-white border rounded-lg px-3 py-2 flex items-center gap-2"
                >
                  <span>{hobby.name}</span>
                  <div className="flex space-x-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5"
                      onClick={() => handleEdit(hobby.id)}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-5 w-5 text-red-500"
                      onClick={() => removeHobby(hobby.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">
            {editMode ? "Edit Hobby" : "Add Hobby"}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="name">Hobby/Interest *</Label>
            <div className="flex gap-2">
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Photography, Reading, Chess"
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-resume-secondary hover:bg-resume-primary">
                {editMode ? "Update" : "Add"}
              </Button>
            </div>
          </div>

          {editMode && (
            <div className="flex justify-end">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </form>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handlePrevStep}>
            Previous
          </Button>
          <Button onClick={handleNextStep} className="bg-resume-primary hover:bg-resume-accent">
            Generate PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HobbiesForm;
