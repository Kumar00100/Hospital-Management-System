import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DoctorScheduleManagementProps {
  // In a real app, you'd pass a doctorId to fetch and update the schedule
  // For admins, a list of doctors would be passed to a parent component
  // containing this schedule manager.
}

const DoctorScheduleManagement: React.FC<DoctorScheduleManagementProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [consultingHours, setConsultingHours] = useState({ from: '09:00', to: '17:00' });
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [allowOnlineBookings, setAllowOnlineBookings] = useState(true);

  const handleBlockDate = () => {
    if (selectedDate && !blockedDates.find(d => d.getTime() === selectedDate.getTime())) {
      setBlockedDates([...blockedDates, selectedDate]);
    }
  };

  const handleUnblockDate = () => {
    if (selectedDate) {
      setBlockedDates(blockedDates.filter(d => d.getTime() !== selectedDate.getTime()));
    }
  };

  const handleSaveChanges = () => {
    // API call to save all schedule changes
    alert('Schedule saved successfully!');
    console.log({
      consultingHours,
      blockedDates,
      allowOnlineBookings,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Your Schedule</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label>Select a Date to Block/Unblock Leave</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => blockedDates.some(d => d.toDateString() === date.toDateString())}
              className="rounded-md border"
            />
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleBlockDate} disabled={!selectedDate}>Block Leave</Button>
              <Button onClick={handleUnblockDate} variant="outline" disabled={!selectedDate}>Unblock Date</Button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <Label>OPD/Consulting Hours</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  type="time"
                  value={consultingHours.from}
                  onChange={(e) => setConsultingHours({ ...consultingHours, from: e.target.value })}
                />
                <span>to</span>
                <Input
                  type="time"
                  value={consultingHours.to}
                  onChange={(e) => setConsultingHours({ ...consultingHours, to: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Label>Allow Online Bookings</Label>
              <Switch
                checked={allowOnlineBookings}
                onCheckedChange={setAllowOnlineBookings}
              />
            </div>
            <div>
              <h4 className="font-medium mb-2">Blocked Dates</h4>
              <ul className="list-disc list-inside max-h-48 overflow-y-auto">
                {blockedDates.map(date => (
                  <li key={date.toString()}>{date.toLocaleDateString()}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorScheduleManagement;
