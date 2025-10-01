import React, { useState } from 'react';
import { Play, Clock, Users, Star, Search, Filter, BookOpen } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';
import CourseViewer from './CourseViewer';

interface CoursesPageProps {
  onNavigate: (page: string) => void;
}

const courses = [
  {
    id: 1,
    title: 'Perfect Putting Fundamentals',
    instructor: 'Mike Johnson',
    duration: '2h 30m',
    lessons: 12,
    level: 'Beginner',
    rating: 4.9,
    students: 2340,
    image: 'https://images.pexels.com/photos/1325735/pexels-photo-1325735.jpeg?auto=compress&cs=tinysrgb&w=400',
    preview: true,
    premium: false
  },
  {
    id: 2,
    title: 'Advanced Driving Techniques',
    instructor: 'Sarah Wilson',
    duration: '4h 15m',
    lessons: 18,
    level: 'Advanced',
    rating: 4.8,
    students: 1890,
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&h=300&fit=crop',
    preview: false,
    premium: true
  },
  {
    id: 3,
    title: 'Course Management Strategy',
    instructor: 'David Chen',
    duration: '3h 45m',
    lessons: 15,
    level: 'Intermediate',
    rating: 4.9,
    students: 3200,
    image: 'https://images.pexels.com/photos/1325659/pexels-photo-1325659.jpeg?auto=compress&cs=tinysrgb&w=400',
    preview: false,
    premium: true
  },
  {
    id: 4,
    title: 'Short Game Mastery',
    instructor: 'Lisa Martinez',
    duration: '3h 20m',
    lessons: 14,
    level: 'Intermediate',
    rating: 4.7,
    students: 2100,
    image: 'https://images.pexels.com/photos/1325766/pexels-photo-1325766.jpeg?auto=compress&cs=tinysrgb&w=400',
    preview: true,
    premium: false
  },
  {
    id: 5,
    title: 'Mental Game & Focus',
    instructor: 'Dr. Robert Kim',
    duration: '2h 15m',
    lessons: 10,
    level: 'All Levels',
    rating: 4.8,
    students: 2890,
    image: 'https://images.pexels.com/photos/1325735/pexels-photo-1325735.jpeg?auto=compress&cs=tinysrgb&w=400',
    preview: false,
    premium: true
  },
  {
    id: 6,
    title: 'Bunker Play Essentials',
    instructor: 'Tom Anderson',
    duration: '1h 45m',
    lessons: 8,
    level: 'Beginner',
    rating: 4.6,
    students: 1650,
    image: 'https://images.pexels.com/photos/1325659/pexels-photo-1325659.jpeg?auto=compress&cs=tinysrgb&w=400',
    preview: true,
    premium: false
  }
];

const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // If a course is selected, show the course viewer
  if (selectedCourse) {
    return (
      <CourseViewer
        courseId={selectedCourse}
        onNavigate={onNavigate}
        onBack={() => setSelectedCourse(null)}
      />
    );
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const canAccessCourse = (course: typeof courses[0]) => {
    if (course.preview) return true;
    if (user?.subscription === 'premium' || user?.subscription === 'pro') return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Golf Courses</h1>
            <p className="text-gray-600">Master your golf game with our comprehensive course library</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Filter size={20} />
                  Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Any Duration</option>
                      <option>Under 2 hours</option>
                      <option>2-4 hours</option>
                      <option>4+ hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Any Rating</option>
                      <option>4.5+ Stars</option>
                      <option>4.0+ Stars</option>
                      <option>3.5+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instructor</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Any Instructor</option>
                      <option>Mike Johnson</option>
                      <option>Sarah Wilson</option>
                      <option>David Chen</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Access</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>All Courses</option>
                      <option>Free Preview</option>
                      <option>Premium Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  {course.preview && (
                    <span className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Free Preview
                    </span>
                  )}
                  {course.premium && !canAccessCourse(course) && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Premium
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <Play className="text-white opacity-0 hover:opacity-100 transition-opacity" size={48} />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-current" size={16} />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">by {course.instructor}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {canAccessCourse(course) ? (
                    <button 
                      onClick={() => setSelectedCourse(course.id)}
                      className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Start Course
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('subscription')}
                      className="w-full bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                    >
                      Upgrade to Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;