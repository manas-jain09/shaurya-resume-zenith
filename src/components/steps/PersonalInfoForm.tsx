
import React from "react";
import { useResume } from "@/context/ResumeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo, setCurrentStep } = useResume();
  const { personalInfo } = resumeData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(1);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-resume-primary">
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={personalInfo.address}
              onChange={(e) => updatePersonalInfo({ address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={personalInfo.city}
                onChange={(e) => updatePersonalInfo({ city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={personalInfo.state}
                onChange={(e) => updatePersonalInfo({ state: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={personalInfo.pincode}
                onChange={(e) => updatePersonalInfo({ pincode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={personalInfo.github}
                onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={personalInfo.website}
                onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={personalInfo.summary}
              onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
              placeholder="Write a brief professional summary"
              className="min-h-[120px]"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="bg-resume-primary hover:bg-resume-accent">
              Next
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;
