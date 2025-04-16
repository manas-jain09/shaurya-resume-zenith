
import React, { useState } from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, Trash } from "lucide-react";

const PositionsForm = () => {
  const { resumeData, addPosition, updatePosition, removePosition, setCurrentStep } = useResume();
  const [editMode, setEditMode] = useState<string | null>(null);
  
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setTitle("");
    setOrganization("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setEditMode(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode) {
      updatePosition(editMode, {
        title,
        organization,
        startDate,
        endDate,
        description
      });
    } else {
      addPosition({
        title,
        organization,
        startDate,
        endDate,
        description
      });
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const position = resumeData.positions.find((p) => p.id === id);
    if (position) {
      setTitle(position.title);
      setOrganization(position.organization);
      setStartDate(position.startDate);
      setEndDate(position.endDate);
      setDescription(position.description);
      setEditMode(id);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleNextStep = () => {
    setCurrentStep(6);
  };

  const handlePrevStep = () => {
    setCurrentStep(4);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Positions of Responsibility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {resumeData.positions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Positions of Responsibility</h3>
            {resumeData.positions.map((position) => (
              <div
                key={position.id}
                className="p-4 border rounded-lg bg-white flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium">{position.title}</h4>
                  <p className="text-gray-600">{position.organization}</p>
                  <p className="text-gray-500 text-sm">
                    {position.startDate && `${position.startDate} - ${position.endDate || "Present"}`}
                  </p>
                  {position.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {position.description.substring(0, 100)}
                      {position.description.length > 100 ? "..." : ""}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleEdit(position.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removePosition(position.id)}
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
            {editMode ? "Edit Position" : "Add Position"}
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="title">Position Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Team Lead, Club President"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Organization/Institution *</Label>
            <Input
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g., Computer Science Club"
              required
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your responsibilities and achievements"
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
              {editMode ? "Update" : "Add"} Position
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

export default PositionsForm;
