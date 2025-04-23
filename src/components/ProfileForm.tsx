import React, { useState } from 'react';
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button'; 

const ProfileForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Профіль оновлено!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ПІП" />
      <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="URL аватарки" />
      <Button type="submit">Зберегти</Button>
    </form>
  );
};

export default ProfileForm;
