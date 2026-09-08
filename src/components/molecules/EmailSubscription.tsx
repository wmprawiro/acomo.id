"use client";

import React, { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

export const EmailSubscription: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thanks! We'll notify ${email} when we launch.`);
      setEmail('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-[480px]"
    >
      <Input 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Get Early Access</Button>
    </form>
  );
};
