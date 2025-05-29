
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Shield, AlertTriangle } from "lucide-react";

interface RegistrationFlowProps {
  userType: 'client' | 'advocate' | 'intern';
  onComplete: () => void;
  onBack: () => void;
}

const RegistrationFlow = ({ userType, onComplete, onBack }: RegistrationFlowProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    idType: '',
    barCouncilId: '',
    schoolName: '',
    specialization: '',
    experience: '',
    fees: '',
    bio: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Personal Information';
      case 2: return 'Address Details';
      case 3: return 'Document Verification';
      case 4: return userType === 'advocate' ? 'Professional Details' : userType === 'intern' ? 'Educational Details' : 'Case Information';
      default: return 'Registration';
    }
  };

  const totalSteps = userType === 'client' ? 3 : 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Registration
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            <div className="text-sm text-slate-600">Step {step} of {totalSteps}</div>
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>{getStepTitle()}</span>
            </CardTitle>
            <CardDescription>
              All information is encrypted and compliant with Indian data protection laws
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter complete address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="Enter 6-digit pincode"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Document Verification Required</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        As per Indian legal compliance, all users must verify their identity with government-issued documents.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Government ID Type *</Label>
                  <Select value={formData.idType} onValueChange={(value) => handleInputChange('idType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                      <SelectItem value="pan">PAN Card</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="driving-license">Driving License</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">Upload Government ID (Front)</p>
                    <p className="text-xs text-slate-500 mt-1">JPG, PNG or PDF (Max 5MB)</p>
                  </div>

                  {formData.idType === 'aadhaar' && (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload Aadhaar (Back)</p>
                      <p className="text-xs text-slate-500 mt-1">Numbers will be masked as per DPDP Act 2023</p>
                    </div>
                  )}

                  {userType === 'advocate' && (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload Law Degree Certificate</p>
                      <p className="text-xs text-slate-500 mt-1">Required for advocate verification</p>
                    </div>
                  )}

                  {userType === 'intern' && (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">Upload Student ID</p>
                      <p className="text-xs text-slate-500 mt-1">Current law school identification</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && userType === 'advocate' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="barCouncilId">Bar Council ID *</Label>
                  <Input
                    id="barCouncilId"
                    value={formData.barCouncilId}
                    onChange={(e) => handleInputChange('barCouncilId', e.target.value)}
                    placeholder="Enter Bar Council registration number"
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="civil">Civil Law</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="taxation">Taxation</SelectItem>
                      <SelectItem value="property">Property Law</SelectItem>
                      <SelectItem value="labor">Labor Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Enter years of practice"
                  />
                </div>
                <div>
                  <Label htmlFor="fees">Consultation Fee (₹/hour) *</Label>
                  <Input
                    id="fees"
                    value={formData.fees}
                    onChange={(e) => handleInputChange('fees', e.target.value)}
                    placeholder="Enter your consultation fee"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Brief description of your practice and expertise"
                  />
                </div>
              </div>
            )}

            {step === 4 && userType === 'intern' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="schoolName">Law School/University *</Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                    placeholder="Enter your law school name"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Current Year of Study *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                      <SelectItem value="5">5th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interests">Areas of Interest</Label>
                  <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="criminal">Criminal Law</SelectItem>
                      <SelectItem value="civil">Civil Law</SelectItem>
                      <SelectItem value="corporate">Corporate Law</SelectItem>
                      <SelectItem value="family">Family Law</SelectItem>
                      <SelectItem value="taxation">Taxation</SelectItem>
                      <SelectItem value="property">Property Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Upload Resume/CV</p>
                  <p className="text-xs text-slate-500 mt-1">PDF format preferred</p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button onClick={onComplete} className="ml-auto bg-green-600 hover:bg-green-700">
                  Complete Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationFlow;
