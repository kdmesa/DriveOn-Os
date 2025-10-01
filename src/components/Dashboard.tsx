import React from 'react';
import { BarChart3, BookOpen, Calendar, Award, TrendingUp, Clock, Users, Target, CalendarCheck } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();

  const stats = [
    { icon: BookOpen, label: 'Courses Completed', value: '12', color: 'bg-emerald-500' },
    { icon: Calendar, label: 'Lessons This Month', value: '3', color: 'bg-blue-500' },
    { icon: Award, label: 'Quizzes Passed', value: '8', color: 'bg-amber-500' },
    { icon: TrendingUp, label: 'Handicap Improvement', value: '-2.3', color: 'bg-purple-500' },
  ];

  const recentActivity = [
    { type: 'course', title: 'Completed "Perfect Putting"', time: '2 hours ago' },
    { type: 'lesson', title: 'Lesson with Pro Mike Johnson', time: '1 day ago' },
    { type: 'quiz', title: 'Passed "Golf Rules Quiz"', time: '3 days ago' },
    { type: 'course', title: 'Started "Advanced Driving"', time: '1 week ago' },
  ];

  const upcomingEvents = [
    { title: 'Lesson with Sarah Wilson', date: 'Tomorrow', time: '2:00 PM' },
    { title: 'Group Practice Session', date: 'Friday', time: '10:00 AM' },
    { title: 'Tournament Prep Course', date: 'Next Week', time: 'Self-paced' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Ready to continue improving your golf game?
            </p>
            
            {user?.trialEndsAt && user.subscription === 'free' && (
              <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <div className="flex items-center">
                  <Clock className="text-amber-600 mr-2" size={20} />
                  <p className="text-amber-800">
                    Your free trial expires in {Math.ceil((user.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days.
                    <button
                      onClick={() => onNavigate('subscription')}
                      className="ml-2 text-amber-600 underline hover:text-amber-700"
                    >
                      Upgrade now
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => onNavigate('courses')}
                  className="bg-emerald-600 text-white p-6 rounded-xl hover:bg-emerald-700 transition-colors text-left"
                >
                  <BookOpen size={24} className="mb-3" />
                  <h3 className="font-semibold mb-1">Browse Courses</h3>
                  <p className="text-emerald-100 text-sm">Explore our library of golf training courses</p>
                </button>
                
                <button
                  onClick={() => onNavigate('booking')}
                  className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors text-left"
                >
                  <Calendar size={24} className="mb-3" />
                  <h3 className="font-semibold mb-1">Book a Lesson</h3>
                  <p className="text-blue-100 text-sm">Schedule 1-on-1 time with a pro</p>
                </button>
                
                <button
                  onClick={() => onNavigate('calendar')}
                  className="bg-indigo-600 text-white p-6 rounded-xl hover:bg-indigo-700 transition-colors text-left"
                >
                  <CalendarCheck size={24} className="mb-3" />
                  <h3 className="font-semibold mb-1">My Lessons</h3>
                  <p className="text-indigo-100 text-sm">View and manage your booked lessons</p>
                </button>
                
                <button
                  onClick={() => onNavigate('quiz')}
                  className="bg-amber-600 text-white p-6 rounded-xl hover:bg-amber-700 transition-colors text-left"
                >
                  <Target size={24} className="mb-3" />
                  <h3 className="font-semibold mb-1">Take a Quiz</h3>
                  <p className="text-amber-100 text-sm">Test your golf knowledge</p>
                </button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-emerald-500 pl-4">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Summary */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Completion</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-emerald-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Skill Level</span>
                      <span>Intermediate</span>
                    </div>
                    <div className="w-full bg-emerald-400 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;