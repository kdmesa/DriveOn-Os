import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, X, AlertCircle, ChevronLeft, ChevronRight, MapPin, Target, Video, Copy, Check } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';

interface CalendarPageProps {
  onNavigate: (page: string) => void;
}

interface Booking {
  id: string;
  instructorName: string;
  instructorImage: string;
  lessonType: string;
  date: Date;
  time: string;
  duration: string;
  skillLevel: string;
  focusAreas: string[];
  additionalNotes?: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  zoomLink?: string;
  meetingId?: string;
  meetingPassword?: string;
}

// Mock bookings data - In production, this would come from a database
const mockBookings: Booking[] = [
  {
    id: '1',
    instructorName: 'Mike Johnson',
    instructorImage: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=200',
    lessonType: 'Private Lesson',
    date: new Date(2025, 9, 5, 9, 0), // Oct 5, 2025, 9:00 AM
    time: '9:00 AM',
    duration: '1 hour',
    skillLevel: 'Intermediate',
    focusAreas: ['Putting', 'Short Game'],
    additionalNotes: 'Working on consistency with short putts',
    price: 120,
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/1234567890?pwd=abc123',
    meetingId: '123 456 7890',
    meetingPassword: 'golf2025'
  },
  {
    id: '2',
    instructorName: 'Sarah Wilson',
    instructorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    lessonType: 'Playing Lesson',
    date: new Date(2025, 9, 8, 14, 0), // Oct 8, 2025, 2:00 PM
    time: '2:00 PM',
    duration: '2 hours',
    skillLevel: 'Advanced',
    focusAreas: ['Course Management', 'Iron Play', 'Mental Game'],
    price: 450,
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/9876543210?pwd=xyz789',
    meetingId: '987 654 3210',
    meetingPassword: 'proGolf99'
  },
  {
    id: '3',
    instructorName: 'David Chen',
    instructorImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
    lessonType: 'Private Lesson',
    date: new Date(2025, 8, 28, 10, 0), // Sept 28, 2025, 10:00 AM
    time: '10:00 AM',
    duration: '1.5 hours',
    skillLevel: 'Beginner',
    focusAreas: ['Full Swing', 'Driving'],
    price: 270,
    status: 'completed',
    zoomLink: 'https://zoom.us/j/5555555555?pwd=def456',
    meetingId: '555 555 5555',
    meetingPassword: 'swing123'
  }
];

const CalendarPage: React.FC<CalendarPageProps> = ({ onNavigate }) => {
  const { } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming').sort((a, b) => a.date.getTime() - b.date.getTime());
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleCancelBooking = () => {
    if (selectedBooking) {
      setBookings(bookings.map(b => 
        b.id === selectedBooking.id 
          ? { ...b, status: 'cancelled' as const }
          : b
      ));
      setShowCancelModal(false);
      setSelectedBooking(null);
      setCancelReason('');
    }
  };

  const canCancelBooking = (booking: Booking) => {
    const now = new Date();
    const bookingTime = booking.date;
    const hoursDifference = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursDifference > 24; // Can cancel if more than 24 hours away
  };

  const handleJoinLesson = (zoomLink: string) => {
    window.open(zoomLink, '_blank');
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const canJoinLesson = (booking: Booking) => {
    const now = new Date();
    const bookingTime = booking.date;
    const minutesDifference = (bookingTime.getTime() - now.getTime()) / (1000 * 60);
    // Can join 15 minutes before and up to lesson duration after start time
    return minutesDifference <= 15 && minutesDifference >= -120; // 15 min before to 2 hours after
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getBookingsForDate = (date: Date | null) => {
    if (!date) return [];
    return bookings.filter(b => 
      b.date.getDate() === date.getDate() &&
      b.date.getMonth() === date.getMonth() &&
      b.date.getFullYear() === date.getFullYear() &&
      b.status === 'upcoming'
    );
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const monthDays = getMonthDays(currentMonth);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Lessons</h1>
            <p className="text-gray-600">View and manage your booked golf lessons</p>
          </div>

          {/* View Toggle */}
          <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'list' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'calendar' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Calendar View
              </button>
            </div>
            
            <button
              onClick={() => onNavigate('booking')}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Book New Lesson
            </button>
          </div>

          {/* Calendar View */}
          {view === 'calendar' && (
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                    {day}
                  </div>
                ))}
                
                {monthDays.map((date, index) => {
                  const dayBookings = getBookingsForDate(date);
                  const isToday = date && 
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-24 p-2 border rounded-lg ${
                        !date ? 'bg-gray-50' : 
                        isToday ? 'bg-emerald-50 border-emerald-300' : 
                        'bg-white hover:bg-gray-50'
                      } transition-colors`}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday ? 'text-emerald-600' : 'text-gray-700'
                          }`}>
                            {date.getDate()}
                          </div>
                          {dayBookings.map(booking => (
                            <div
                              key={booking.id}
                              onClick={() => setSelectedBooking(booking)}
                              className="text-xs bg-emerald-100 text-emerald-800 p-1 rounded mb-1 cursor-pointer hover:bg-emerald-200 transition-colors truncate"
                            >
                              {booking.time} - {booking.instructorName}
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* List View */}
          {view === 'list' && (
            <>
              {/* Upcoming Lessons */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Lessons ({upcomingBookings.length})</h2>
                {upcomingBookings.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
                    <CalendarIcon className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming lessons</h3>
                    <p className="text-gray-600 mb-4">Book a lesson to get started</p>
                    <button
                      onClick={() => onNavigate('booking')}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Book a Lesson
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <img
                            src={booking.instructorImage}
                            alt={booking.instructorName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{booking.lessonType}</h3>
                                <p className="text-gray-600">with {booking.instructorName}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-gray-900">${booking.price}</p>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <CalendarIcon size={16} />
                                  <span>{booking.date.toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    month: 'long', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Clock size={16} />
                                  <span>{booking.time} ({booking.duration})</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                  <User size={16} />
                                  <span>Skill Level: {booking.skillLevel}</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-600">
                                  <Target size={16} className="mt-0.5" />
                                  <div className="flex flex-wrap gap-1">
                                    {booking.focusAreas.map((area, idx) => (
                                      <span key={idx} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-xs">
                                        {area}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {booking.additionalNotes && (
                              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Notes:</span> {booking.additionalNotes}
                                </p>
                              </div>
                            )}
                            
                            {/* Zoom Meeting Info */}
                            {booking.zoomLink && (
                              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Video className="text-blue-600" size={18} />
                                  <h4 className="font-semibold text-blue-900">Virtual Lesson Details</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Meeting ID:</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-gray-900">{booking.meetingId}</span>
                                      <button
                                        onClick={() => copyToClipboard(booking.meetingId || '', 'meetingId-' + booking.id)}
                                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                                        title="Copy Meeting ID"
                                      >
                                        {copiedField === 'meetingId-' + booking.id ? (
                                          <Check className="text-green-600" size={14} />
                                        ) : (
                                          <Copy className="text-blue-600" size={14} />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Password:</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-gray-900">{booking.meetingPassword}</span>
                                      <button
                                        onClick={() => copyToClipboard(booking.meetingPassword || '', 'password-' + booking.id)}
                                        className="p-1 hover:bg-blue-100 rounded transition-colors"
                                        title="Copy Password"
                                      >
                                        {copiedField === 'password-' + booking.id ? (
                                          <Check className="text-green-600" size={14} />
                                        ) : (
                                          <Copy className="text-blue-600" size={14} />
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-3">
                              {booking.zoomLink && canJoinLesson(booking) && (
                                <button
                                  onClick={() => handleJoinLesson(booking.zoomLink!)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                                >
                                  <Video size={16} />
                                  Join Lesson
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                              >
                                View Details
                              </button>
                              {canCancelBooking(booking) ? (
                                <button
                                  onClick={() => {
                                    setSelectedBooking(booking);
                                    setShowCancelModal(true);
                                  }}
                                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm"
                                >
                                  Cancel Lesson
                                </button>
                              ) : (
                                <div className="flex items-center gap-2 text-sm text-amber-600">
                                  <AlertCircle size={16} />
                                  <span>Cannot cancel (less than 24hrs)</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Lessons */}
              {pastBookings.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Past Lessons ({pastBookings.length})</h2>
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="bg-white p-6 rounded-xl shadow-sm border opacity-75">
                        <div className="flex items-start gap-4">
                          <img
                            src={booking.instructorImage}
                            alt={booking.instructorName}
                            className="w-16 h-16 rounded-full object-cover grayscale"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{booking.lessonType}</h3>
                                <p className="text-gray-600">with {booking.instructorName}</p>
                                <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                                  booking.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {booking.status === 'completed' ? 'Completed' : 'Cancelled'}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-gray-700">${booking.price}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <CalendarIcon size={16} />
                                <span>{booking.date.toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{booking.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Cancel Lesson</h3>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex gap-2">
                  <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Cancellation Policy</p>
                    <p>You're cancelling more than 24 hours in advance, so you'll receive a full refund.</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Lesson:</span> {selectedBooking.lessonType} with {selectedBooking.instructorName}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Date:</span> {selectedBooking.date.toLocaleDateString()} at {selectedBooking.time}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for cancellation (optional)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Help us improve by sharing why you're cancelling..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Keep Lesson
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Cancel Lesson
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && !showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Lesson Details</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b">
                <img
                  src={selectedBooking.instructorImage}
                  alt={selectedBooking.instructorName}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedBooking.instructorName}</h4>
                  <p className="text-gray-600">{selectedBooking.lessonType}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                    selectedBooking.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' :
                    selectedBooking.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Schedule</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon size={16} />
                      <span>{selectedBooking.date.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span>{selectedBooking.time} ({selectedBooking.duration})</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      <span>Golf Training Center</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Your Profile</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User size={16} />
                      <span>Skill Level: {selectedBooking.skillLevel}</span>
                    </div>
                    <div className="text-gray-600">
                      <div className="flex items-start gap-2 mb-1">
                        <Target size={16} className="mt-0.5" />
                        <span>Focus Areas:</span>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-6">
                        {selectedBooking.focusAreas.map((area, idx) => (
                          <span key={idx} className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedBooking.additionalNotes && (
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Additional Notes</h5>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedBooking.additionalNotes}</p>
                  </div>
                </div>
              )}

              {/* Zoom Meeting Details in Modal */}
              {selectedBooking.zoomLink && selectedBooking.status === 'upcoming' && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Video className="text-blue-600" size={20} />
                    <h5 className="font-semibold text-blue-900">Virtual Lesson Access</h5>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-700 block mb-1">Meeting ID</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-white border border-blue-200 rounded font-mono text-sm">
                          {selectedBooking.meetingId}
                        </code>
                        <button
                          onClick={() => copyToClipboard(selectedBooking.meetingId || '', 'modal-meetingId')}
                          className="p-2 hover:bg-blue-100 rounded transition-colors"
                          title="Copy Meeting ID"
                        >
                          {copiedField === 'modal-meetingId' ? (
                            <Check className="text-green-600" size={18} />
                          ) : (
                            <Copy className="text-blue-600" size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 block mb-1">Password</label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 px-3 py-2 bg-white border border-blue-200 rounded font-mono text-sm">
                          {selectedBooking.meetingPassword}
                        </code>
                        <button
                          onClick={() => copyToClipboard(selectedBooking.meetingPassword || '', 'modal-password')}
                          className="p-2 hover:bg-blue-100 rounded transition-colors"
                          title="Copy Password"
                        >
                          {copiedField === 'modal-password' ? (
                            <Check className="text-green-600" size={18} />
                          ) : (
                            <Copy className="text-blue-600" size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    {canJoinLesson(selectedBooking) && (
                      <button
                        onClick={() => handleJoinLesson(selectedBooking.zoomLink!)}
                        className="w-full mt-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Video size={18} />
                        Join Lesson Now
                      </button>
                    )}
                    {!canJoinLesson(selectedBooking) && (
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Join button will be available 15 minutes before the lesson
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Price</span>
                  <span className="text-2xl font-bold text-emerald-600">${selectedBooking.price}</span>
                </div>
              </div>

              {selectedBooking.status === 'upcoming' && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  {canCancelBooking(selectedBooking) && (
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Cancel Lesson
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
