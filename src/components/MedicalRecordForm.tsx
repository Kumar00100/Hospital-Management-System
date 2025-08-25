import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MedicalRecordFormProps {
  patientId: string;
  onSubmit: (record: any) => void;
}

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({ patientId, onSubmit }) => {
  const [formData, setFormData] = useState({
    diagnosis: '',
    prescription: '',
    notes: '',
    reportFile: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, reportFile: e.target.files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, patientId });
    // Reset form after submission
    setFormData({
      diagnosis: '',
      prescription: '',
      notes: '',
      reportFile: null,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add to Medical Record</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis Details</Label>
            <Textarea id="diagnosis" value={formData.diagnosis} onChange={handleInputChange} placeholder="Enter diagnosis details..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prescription">Prescription Notes</Label>
            <Textarea id="prescription" value={formData.prescription} onChange={handleInputChange} placeholder="e.g., Paracetamol 500mg, twice a day for 3 days" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Medical History / Notes</Label>
            <Textarea id="notes" value={formData.notes} onChange={handleInputChange} placeholder="Add any relevant medical history or notes..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reportFile">Upload Report</Label>
            <Input id="reportFile" type="file" onChange={handleFileChange} />
          </div>
          <Button type="submit">Add Record</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordForm;
