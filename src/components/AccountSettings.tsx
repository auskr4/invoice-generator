import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AccountSettings: React.FC = () => {
  const { user } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement update logic here
    console.log('Update account settings');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full border border-zinc-200">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <div>
        <h2 className="text-sm text-gray-400 font-semibold mb-4">Update Your Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={user?.name || ''} />
          </div>
          <Button type="submit">Update Settings</Button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;