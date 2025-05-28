'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ProfileInfoTab } from '@/components/profile/ProfileInfoTab'
import { ProfileSettingsTab } from '@/components/profile/ProfileSettingsTab'
import { ProfileSecurityTab } from '@/components/profile/ProfileSecurityTab'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'settings' | 'security'>('info')

  return (
    <div className="w-full min-h-screen bg-background px-4 py-6 md:px-8 lg:px-12">
      <h1 className="text-2xl font-semibold mb-6 dark:text-white">Особистий кабінет</h1>

      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === 'info' ? 'default' : 'outline'}
          onClick={() => setActiveTab('info')}
        >
          Інформація
        </Button>
        <Button
          variant={activeTab === 'settings' ? 'default' : 'outline'}
          onClick={() => setActiveTab('settings')}
        >
          Налаштування
        </Button>
        <Button
          variant={activeTab === 'security' ? 'default' : 'outline'}
          onClick={() => setActiveTab('security')}
        >
          Безпека
        </Button>
      </div>

      <div className="w-full">
        {activeTab === 'info' && <ProfileInfoTab />}
        {activeTab === 'settings' && <ProfileSettingsTab />}
        {activeTab === 'security' && <ProfileSecurityTab />}
      </div>
    </div>
  )
}
