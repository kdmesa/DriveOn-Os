import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, X, Edit2, Shield, Bell, CreditCard } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications'>('profile');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    handicap: user?.handicap || '',
    profilePicture: user?.profilePicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    lessonReminders: true,
    courseUpdates: false,
    promotions: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications]
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Update user context
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        handicap: formData.handicap,
        profilePicture: formData.profilePicture
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      handicap: user?.handicap || '',
      profilePicture: user?.profilePicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20 px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'profile'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <User size={20} />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('account')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'account'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Shield size={20} />
                    Account
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeTab === 'notifications'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Bell size={20} />
                    Notifications
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                        >
                          <Edit2 size={16} />
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                          >
                            <Save size={16} />
                            Save Changes
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Profile Picture */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b">
                      <div className="relative">
                        <img
                          src={formData.profilePicture}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                        />
                        {isEditing && (
                          <label className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors">
                            <Camera className="text-white" size={16} />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{formData.name}</h3>
                        <p className="text-gray-600">{formData.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                          {user?.subscription || 'Free'} Member
                        </span>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="+1 (555) 000-0000"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              placeholder="City, Country"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Golf Handicap
                        </label>
                        <input
                          type="text"
                          name="handicap"
                          value={formData.handicap}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="e.g., 12.5"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          rows={4}
                          placeholder="Tell us about your golf journey..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Tab */}
                {activeTab === 'account' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      {/* Subscription */}
                      <div className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Current Plan</h3>
                            <p className="text-gray-600 mb-3">
                              You're on the <span className="font-semibold text-emerald-700">{user?.subscription || 'Free'}</span> plan
                            </p>
                            <button
                              onClick={() => onNavigate('subscription')}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                            >
                              <CreditCard size={16} />
                              Manage Subscription
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Change Password */}
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="Enter current password"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="Confirm new password"
                            />
                          </div>
                          <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Delete Account */}
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
                        <p className="text-gray-600 mb-4">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-6">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about your account' },
                        { key: 'lessonReminders', label: 'Lesson Reminders', description: 'Get reminded about upcoming booked lessons' },
                        { key: 'courseUpdates', label: 'Course Updates', description: 'Notifications when new courses are added' },
                        { key: 'promotions', label: 'Promotions & Offers', description: 'Receive special offers and promotions' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.label}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                          <button
                            onClick={() => handleNotificationChange(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications]
                                ? 'bg-emerald-600'
                                : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications]
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
