import React, { useState } from 'react';
import { Calendar, Clock, User, Star, ChevronLeft, ChevronRight, CheckCircle, Target, TrendingUp, Video } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';
import { useBookings } from '../contexts/BookingContext';

interface BookingPageProps {
  onNavigate: (page: string) => void;
}

const lessonTypes = [
  { id: 'private', name: 'Private Lesson', description: '1-on-1 personalized instruction', priceMultiplier: 1 },
  { id: 'semi-private', name: 'Semi-Private', description: 'Small group (2-3 people)', priceMultiplier: 0.7 },
  { id: 'group', name: 'Group Lesson', description: 'Group of 4-6 people', priceMultiplier: 0.5 },
  { id: 'playing', name: 'Playing Lesson', description: 'On-course instruction', priceMultiplier: 1.5 },
];

const durations = [
  { id: '30', name: '30 minutes', multiplier: 0.5 },
  { id: '60', name: '1 hour', multiplier: 1 },
  { id: '90', name: '1.5 hours', multiplier: 1.5 },
  { id: '120', name: '2 hours', multiplier: 2 },
];

const skillLevels = [
  { id: 'beginner', name: 'Beginner', description: 'New to golf or just starting out' },
  { id: 'intermediate', name: 'Intermediate', description: 'Have basic skills, looking to improve' },
  { id: 'advanced', name: 'Advanced', description: 'Experienced player seeking refinement' },
  { id: 'expert', name: 'Expert', description: 'Competitive player or low handicap' },
];

const focusAreas = [
  'Full Swing',
  'Putting',
  'Short Game',
  'Driving',
  'Iron Play',
  'Bunker Play',
  'Course Management',
  'Mental Game',
  'Fitness & Conditioning',
  'Club Fitting',
  'Tournament Prep',
  'Swing Analysis',
];

const instructors = [
  {
    id: 1,
    name: 'Mike Johnson',
    title: 'PGA Professional',
    rating: 4.9,
    reviews: 234,
    specialties: ['Putting', 'Short Game', 'Mental Game'],
    basePrice: 120,
    image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    title: 'LPGA Teaching Pro',
    rating: 4.8,
    reviews: 189,
    specialties: ['Driving', 'Iron Play', 'Course Strategy'],
    basePrice: 150,
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: ['10:00 AM', '1:00 PM', '3:00 PM', '5:00 PM']
  },
  {
    id: 3,
    name: 'David Chen',
    title: 'Golf Performance Coach',
    rating: 4.9,
    reviews: 156,
    specialties: ['Swing Analysis', 'Fitness', 'Club Fitting'],
    basePrice: 180,
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
    available: ['8:00 AM', '12:00 PM', '3:30 PM', '6:00 PM']
  }
];

const BookingPage: React.FC<BookingPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { addBooking } = useBookings();
  
  // Booking form state
  const [lessonType, setLessonType] = useState<string | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>('60');
  const [skillLevel, setSkillLevel] = useState<string | null>(null);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // UI state
  const [bookingStep, setBookingStep] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedZoomDetails, setGeneratedZoomDetails] = useState<{
    zoomLink: string;
    meetingId: string;
    meetingPassword: string;
  } | null>(null);

  const getWeekDates = (startDate: Date) => {
    const week = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);
  
  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  };

  const toggleFocusArea = (area: string) => {
    setSelectedFocusAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const calculatePrice = () => {
    if (!selectedInstructor) return 0;
    
    const instructor = instructors.find(i => i.id === selectedInstructor);
    if (!instructor) return 0;
    
    const lessonTypeData = lessonTypes.find(lt => lt.id === lessonType);
    const durationData = durations.find(d => d.id === duration);
    
    const basePrice = instructor.basePrice;
    const typeMultiplier = lessonTypeData?.priceMultiplier || 1;
    const durationMultiplier = durationData?.multiplier || 1;
    
    return Math.round(basePrice * typeMultiplier * durationMultiplier);
  };

  const generateZoomMeeting = () => {
    // In production, this would call Zoom API to create a meeting
    // For now, we'll generate mock meeting details
    const meetingId = Math.floor(100000000 + Math.random() * 900000000).toString();
    const formattedMeetingId = meetingId.match(/.{1,3}/g)?.join(' ') || meetingId;
    const password = Math.random().toString(36).substring(2, 10);
    const zoomLink = `https://zoom.us/j/${meetingId}?pwd=${password}`;
    
    return {
      zoomLink,
      meetingId: formattedMeetingId,
      meetingPassword: password
    };
  };

  const handleBookLesson = () => {
    if (!selectedInstructor || !selectedDate || !selectedTime || !lessonType || !skillLevel) {
      return;
    }

    // Generate Zoom meeting details
    const zoomDetails = generateZoomMeeting();
    setGeneratedZoomDetails(zoomDetails);
    
    const instructor = instructors.find(i => i.id === selectedInstructor);
    const selectedLessonType = lessonTypes.find(lt => lt.id === lessonType);
    const selectedDuration = durations.find(d => d.id === duration);
    const selectedSkillLevel = skillLevels.find(sl => sl.id === skillLevel);
    
    // Create booking object
    const newBooking = {
      id: Math.random().toString(36).substring(2, 9),
      instructorName: instructor?.name || '',
      instructorImage: instructor?.image || '',
      lessonType: selectedLessonType?.name || '',
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration?.name || '',
      skillLevel: selectedSkillLevel?.name || '',
      focusAreas: selectedFocusAreas,
      additionalNotes: additionalNotes,
      price: calculatePrice(),
      status: 'upcoming' as const,
      zoomLink: zoomDetails.zoomLink,
      meetingId: zoomDetails.meetingId,
      meetingPassword: zoomDetails.meetingPassword
    };
    
    // Save booking to context
    addBooking(newBooking);
    console.log('Booking created:', newBooking);
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('calendar'); // Navigate to calendar to see the booking
    }, 3500);
  };

  const selectedInstructorData = instructors.find(i => i.id === selectedInstructor);
  const selectedLessonType = lessonTypes.find(lt => lt.id === lessonType);
  const selectedDuration = durations.find(d => d.id === duration);
  const selectedSkillLevel = skillLevels.find(sl => sl.id === skillLevel);

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-lg w-full">
          <CheckCircle className="text-emerald-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson Booked!</h2>
          <p className="text-gray-600 mb-6">
            Your {selectedLessonType?.name.toLowerCase()} with {selectedInstructorData?.name} has been confirmed.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg text-left mb-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{selectedDuration?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold text-emerald-600">${calculatePrice()}</span>
              </div>
            </div>
          </div>

          {/* Zoom Meeting Details */}
          {generatedZoomDetails && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Video className="text-blue-600" size={20} />
                <h3 className="font-semibold text-blue-900">Virtual Lesson Created</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Meeting ID:</span>
                  <p className="font-mono text-gray-900 mt-1">{generatedZoomDetails.meetingId}</p>
                </div>
                <div>
                  <span className="text-gray-600">Password:</span>
                  <p className="font-mono text-gray-900 mt-1">{generatedZoomDetails.meetingPassword}</p>
                </div>
              </div>
              <p className="text-xs text-blue-700 mt-3">
                Meeting details have been saved. You can join from the Calendar page.
              </p>
            </div>
          )}
          
          <p className="text-sm text-gray-500">Redirecting to your lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Golf Lesson</h1>
            <p className="text-gray-600">Schedule personalized training with our certified professionals</p>
          </div>

          {/* Booking Steps */}
          <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
            <div className="flex items-center justify-between overflow-x-auto">
              {[
                { num: 1, label: 'Lesson Type' },
                { num: 2, label: 'Instructor' },
                { num: 3, label: 'Date & Time' },
                { num: 4, label: 'Preferences' },
                { num: 5, label: 'Confirm' }
              ].map((step, index, array) => (
                <div key={step.num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    step.num <= bookingStep ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.num}
                  </div>
                  <span className={`ml-2 font-medium whitespace-nowrap ${
                    step.num <= bookingStep ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                  {index < array.length - 1 && (
                    <ChevronRight className="ml-4 text-gray-400" size={20} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Select Lesson Type */}
          {bookingStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Choose Your Lesson Type</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {lessonTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`bg-white p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      lessonType === type.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => setLessonType(type.id)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-emerald-600 font-medium">
                        {type.priceMultiplier === 1 ? 'Standard pricing' : 
                         type.priceMultiplier < 1 ? `${Math.round((1 - type.priceMultiplier) * 100)}% off` :
                         `${Math.round((type.priceMultiplier - 1) * 100)}% premium`}
                      </span>
                      {lessonType === type.id && (
                        <CheckCircle className="text-emerald-600" size={20} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="font-semibold text-gray-900 mb-3">Select Duration</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {durations.map((dur) => (
                    <button
                      key={dur.id}
                      onClick={() => setDuration(dur.id)}
                      className={`p-3 rounded-lg font-medium transition-colors ${
                        duration === dur.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                      }`}
                    >
                      {dur.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => lessonType && setBookingStep(2)}
                  disabled={!lessonType}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Instructor */}
          {bookingStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Choose Your Instructor</h2>
              <div className="grid gap-6">
                {instructors.map((instructor) => (
                  <div
                    key={instructor.id}
                    className={`bg-white p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedInstructor === instructor.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                    onClick={() => setSelectedInstructor(instructor.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
                            <p className="text-gray-600">{instructor.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="text-yellow-500 fill-current" size={16} />
                              <span className="text-sm font-medium">{instructor.rating}</span>
                              <span className="text-sm text-gray-500">({instructor.reviews} reviews)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">${instructor.basePrice}</p>
                            <p className="text-sm text-gray-600">base rate/hour</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-700 mb-2">Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {instructor.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setBookingStep(1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => selectedInstructor && setBookingStep(3)}
                  disabled={!selectedInstructor}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Choose Date & Time */}
          {bookingStep === 3 && selectedInstructorData && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Select Date & Time</h2>
              
              {/* Calendar */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevWeek}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="text-lg font-semibold">
                    {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={nextWeek}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm text-gray-600 mb-2">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <button
                        onClick={() => setSelectedDate(date)}
                        disabled={date < new Date() && date.toDateString() !== new Date().toDateString()}
                        className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                          selectedDate?.toDateString() === date.toDateString()
                            ? 'bg-emerald-600 text-white'
                            : date < new Date() && date.toDateString() !== new Date().toDateString()
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-emerald-100 text-gray-700'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <h3 className="text-lg font-semibold mb-4">Available Times</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedInstructorData.available.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg font-medium transition-colors ${
                          selectedTime === time
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setBookingStep(2)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => selectedDate && selectedTime && setBookingStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Preferences & Goals */}
          {bookingStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Your Preferences & Goals</h2>
              
              {/* Skill Level */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-emerald-600" />
                  Current Skill Level
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {skillLevels.map((level) => (
                    <div
                      key={level.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        skillLevel === level.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                      onClick={() => setSkillLevel(level.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{level.name}</h4>
                          <p className="text-sm text-gray-600">{level.description}</p>
                        </div>
                        {skillLevel === level.id && (
                          <CheckCircle className="text-emerald-600 flex-shrink-0" size={20} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target size={20} className="text-emerald-600" />
                  Focus Areas (Select up to 3)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {focusAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => toggleFocusArea(area)}
                      disabled={!selectedFocusAreas.includes(area) && selectedFocusAreas.length >= 3}
                      className={`p-3 rounded-lg font-medium transition-all text-sm ${
                        selectedFocusAreas.includes(area)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Selected: {selectedFocusAreas.length}/3
                </p>
              </div>

              {/* Additional Notes */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-4">Additional Notes (Optional)</h3>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Share any specific goals, concerns, or preferences for your lesson..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setBookingStep(3)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => skillLevel && selectedFocusAreas.length > 0 && setBookingStep(5)}
                  disabled={!skillLevel || selectedFocusAreas.length === 0}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Confirm Booking */}
          {bookingStep === 5 && selectedInstructorData && selectedDate && selectedTime && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Confirm Your Booking</h2>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Lesson Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <User size={16} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium">{selectedInstructorData.name}</p>
                          <p className="text-gray-600">{selectedLessonType?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{selectedDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span>{selectedTime} ({selectedDuration?.name})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-gray-400" />
                        <span>{selectedSkillLevel?.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base rate</span>
                        <span>${selectedInstructorData.basePrice}/hr</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Duration ({selectedDuration?.name})</span>
                        <span>×{selectedDuration?.multiplier}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Lesson type</span>
                        <span>×{selectedLessonType?.priceMultiplier}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Platform fee</span>
                        <span>$0</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-emerald-600">${calculatePrice()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focus Areas Summary */}
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-medium text-emerald-800 mb-2 flex items-center gap-2">
                    <Target size={16} />
                    Focus Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFocusAreas.map((area) => (
                      <span key={area} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                {additionalNotes && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Additional Notes</h4>
                    <p className="text-sm text-gray-700">{additionalNotes}</p>
                  </div>
                )}

                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-amber-700">
                    You can cancel or reschedule your lesson up to 24 hours before the scheduled time for a full refund.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setBookingStep(4)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleBookLesson}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Book Lesson - ${calculatePrice()}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;