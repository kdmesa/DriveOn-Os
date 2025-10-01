import React, { useState } from 'react';
import { User, Mail, Lock, Phone, MapPin, Target, Calendar, CheckCircle, ArrowRight, ArrowLeft, Trophy, Camera, BookOpen, BarChart, Zap } from 'lucide-react';
import { useAuth } from '../App';

interface OnboardingFlowProps {
  onComplete: () => void;
  onCancel?: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onCancel }) => {
  const { register, setUser, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Account Creation
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Profile Setup
    phone: '',
    location: '',
    handicap: '',
    golfExperience: '',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    // Step 3: Goals
    goals: [] as string[],
    focus: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleGoalToggle = (goal: string) => {
    if (formData.goals.includes(goal)) {
      setFormData({
        ...formData,
        goals: formData.goals.filter(g => g !== goal)
      });
    } else {
      setFormData({
        ...formData,
        goals: [...formData.goals, goal]
      });
    }
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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.golfExperience) {
      newErrors.golfExperience = 'Please select your experience level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        // Register user
        register(formData.name, formData.email, formData.password);
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Complete onboarding
      if (user) {
        setUser({
          ...user,
          phone: formData.phone,
          location: formData.location,
          handicap: formData.handicap,
          profilePicture: formData.profilePicture,
          onboardingCompleted: true
        });
      }
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep === 5) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFocusToggle = (focus: string) => {
    if (formData.focus.includes(focus)) {
      setFormData({
        ...formData,
        focus: formData.focus.filter(f => f !== focus)
      });
    } else {
      setFormData({
        ...formData,
        focus: [...formData.focus, focus]
      });
    }
  };

  const progressPercentage = (currentStep / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-gray-100 h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Step 1: Account Creation */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-emerald-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600">Join thousands of golfers improving their game</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Profile Setup */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-blue-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Set Up Your Profile</h2>
                <p className="text-gray-600">Tell us a bit about yourself</p>
              </div>

              {/* Profile Picture */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <img
                    src={formData.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                  />
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-700 transition-colors">
                    <Camera className="text-white" size={18} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-4">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="New York, USA"
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Golf Experience Level *
                  </label>
                  <select
                    name="golfExperience"
                    value={formData.golfExperience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                      errors.golfExperience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner - Just starting out</option>
                    <option value="intermediate">Intermediate - Play regularly</option>
                    <option value="advanced">Advanced - Competitive player</option>
                    <option value="pro">Professional</option>
                  </select>
                  {errors.golfExperience && <p className="text-red-500 text-sm mt-1">{errors.golfExperience}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Golf Handicap (Optional)
                  </label>
                  <input
                    type="text"
                    name="handicap"
                    value={formData.handicap}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., 12.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-purple-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What Are Your Goals?</h2>
                <p className="text-gray-600">Select all that apply to personalize your experience</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 'improve-swing', label: 'Improve My Swing', icon: '🏌️' },
                  { id: 'lower-handicap', label: 'Lower My Handicap', icon: '📉' },
                  { id: 'better-putting', label: 'Better Putting', icon: '⛳' },
                  { id: 'course-management', label: 'Course Management', icon: '🗺️' },
                  { id: 'fitness', label: 'Golf Fitness', icon: '💪' },
                  { id: 'mental-game', label: 'Mental Game', icon: '🧠' },
                  { id: 'short-game', label: 'Short Game', icon: '🎯' },
                  { id: 'compete', label: 'Compete in Tournaments', icon: '🏆' }
                ].map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      formData.goals.includes(goal.id)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{goal.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{goal.label}</p>
                      </div>
                      {formData.goals.includes(goal.id) && (
                        <CheckCircle className="text-emerald-600" size={24} />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center mt-6">
                {formData.goals.length} goal{formData.goals.length !== 1 ? 's' : ''} selected
              </p>

              {/* Focus Selection */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  👉 What are you most interested in?
                </h3>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  Choose your focus so we can recommend the best lessons for you.
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { id: 'private-coaching', label: 'Private Coaching', icon: '⛳' },
                    { id: 'group-lessons', label: 'Group Lessons', icon: '👥' },
                    { id: 'online-zoom', label: 'Online (Zoom)', icon: '💻' },
                    { id: 'tournaments', label: 'Tournaments', icon: '🏆' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleFocusToggle(option.id)}
                      className={`p-4 border-2 rounded-xl text-left transition-all ${
                        formData.focus.includes(option.id)
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{option.label}</p>
                        </div>
                        {formData.focus.includes(option.id) && (
                          <CheckCircle className="text-purple-600" size={20} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  {formData.focus.length} option{formData.focus.length !== 1 ? 's' : ''} selected
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Dashboard Walkthrough */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart className="text-blue-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard! 🎯</h2>
                <p className="text-gray-600">Let's take a quick tour of what you can do</p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <BookOpen className="text-emerald-600" size={24} />,
                    title: 'Browse Courses',
                    description: 'Access 100+ expert-led courses covering every aspect of golf',
                    action: 'Start learning today!'
                  },
                  {
                    icon: <Calendar className="text-blue-600" size={24} />,
                    title: 'Book Lessons',
                    description: 'Schedule one-on-one sessions with professional instructors',
                    action: 'Get personalized coaching'
                  },
                  {
                    icon: <BarChart className="text-purple-600" size={24} />,
                    title: 'Track Progress',
                    description: 'Monitor your improvement with detailed analytics and insights',
                    action: 'See how far you\'ve come'
                  },
                  {
                    icon: <Target className="text-orange-600" size={24} />,
                    title: 'Achieve Goals',
                    description: 'Work toward your goals with personalized recommendations',
                    action: 'Stay motivated!'
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border-2 border-gray-200 hover:border-emerald-300 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                        <p className="text-xs text-emerald-600 font-semibold">→ {feature.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-xl border-2 border-emerald-200">
                <div className="flex items-start gap-3">
                  <Zap className="text-emerald-600 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">🎉 You're All Set!</h3>
                    <p className="text-sm text-gray-700">
                      Your account is ready and you have everything you need to start improving your golf game. 
                      Click "Next" to choose your first action!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: First Action Prompts */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Trophy className="text-white" size={32} />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">🎊 You're Ready to Go! 🎊</h2>
                <p className="text-xl text-gray-600 mb-2">Choose your first action to get started</p>
                <p className="text-sm text-gray-500">Pick what excites you most!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => {
                    onComplete();
                  }}
                  className="group p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                      <BookOpen className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Start a Course</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Jump into your first course and start learning from the pros
                  </p>
                  <div className="flex items-center text-emerald-600 font-semibold text-sm">
                    Browse Courses <ArrowRight size={16} className="ml-1" />
                  </div>
                </button>

                <button
                  onClick={() => {
                    onComplete();
                  }}
                  className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Calendar className="text-white" size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Book a Lesson</h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    Schedule your first lesson with a pro instructor (50% OFF!)
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    Book Now <ArrowRight size={16} className="ml-1" />
                  </div>
                </button>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-center">✨ Quick Start Checklist</h3>
                <div className="space-y-3">
                  {[
                    { text: 'Account Created', done: true },
                    { text: 'Profile Set Up', done: true },
                    { text: 'Goals Selected', done: true },
                    { text: 'Preferences Configured', done: true },
                    { text: 'Ready to Learn!', done: true }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />
                      <span className={`text-sm ${item.done ? 'text-gray-700' : 'text-gray-400'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  🎯 <span className="font-semibold">Pro Tip:</span> Students who start within the first 24 hours see 3x faster improvement!
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={currentStep === 1 && onCancel ? onCancel : handleBack}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Step {currentStep} of 5
              </span>
            </div>

            <div className="flex gap-3">
              {currentStep > 1 && currentStep < 5 && (
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg"
              >
                {currentStep === 5 ? 'Complete & Start!' : 'Next'}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
