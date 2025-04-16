
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash } from "lucide-react";

const AchievementsForm = () => {
  const { resumeData, addAchievement, updateAchievement, removeAchievement, setCurrentStep } = useResume();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTitle("");
    setDate("");
    setDescription("");
    setEditMode(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode) {
      updateAchievement(editMode, {
        title,
        date,
        description
      });
    } else {
      addAchievement({
        title,
        date,
        description
      });
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const achievement = resumeData.achievements.find((a) => a.id === id);
    if (achievement) {
      setTitle(achievement.title);
      setDate(achievement.date);
      setDescription(achievement.description);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleNextStep = () => {
    setCurrentStep(7);
  };

  const handlePrevStep = () => {
    setCurrentStep(5);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.achievements.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Achievements</h3>
            {resumeData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 border rounded-lg bg-white flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  {achievement.date && <p className="text-gray-500 text-sm">{achievement.date}</p>}
                  {achievement.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {achievement.description.substring(0, 100)}
                      {achievement.description.length > 100 ? "..." : ""}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(achievement.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeAchievement(achievement.id)}
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
            {editMode ? "Edit Achievement" : "Add Achievement"}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="title">Achievement Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., First Prize in Hackathon"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="month"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your achievement"
              className="min-h-[120px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            {editMode && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" className="bg-resume-secondary hover:bg-resume-primary">
              {editMode ? "Update" : "Add"} Achievement
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

export default AchievementsForm;
