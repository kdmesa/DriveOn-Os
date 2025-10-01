import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, CheckCircle, Lock, ArrowLeft, BookOpen, Clock, Award, FileText, Download, Trophy, Sparkles } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';

interface CourseViewerProps {
  courseId: number;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const courseData = {
  1: {
    title: 'Perfect Putting Fundamentals',
    instructor: 'Mike Johnson',
    description: 'Master the art of putting with professional techniques and drills that will dramatically improve your short game.',
    totalLessons: 12,
    duration: '2h 30m',
    level: 'Beginner',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Putting Fundamentals',
        duration: '8:45',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        pdfUrl: 'https://www.example.com/putting-fundamentals.pdf',
        description: 'Learn the basic principles of putting stance, grip, and alignment.',
        completed: false,
        preview: true
      },
      {
        id: 2,
        title: 'Proper Putting Stance and Setup',
        duration: '12:30',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        pdfUrl: 'https://www.example.com/putting-stance-guide.pdf',
        description: 'Establish a consistent and comfortable putting stance.',
        completed: false,
        preview: true
      },
      {
        id: 3,
        title: 'Reading Greens Like a Pro',
        duration: '15:20',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        pdfUrl: 'https://www.example.com/green-reading-guide.pdf',
        description: 'Understand slope, grain, and speed to read greens accurately.',
        completed: false,
        preview: false
      },
      {
        id: 4,
        title: 'Distance Control Techniques',
        duration: '18:15',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        pdfUrl: 'https://www.example.com/distance-control-workbook.pdf',
        description: 'Master the art of controlling putting distance and speed.',
        completed: false,
        preview: false
      },
      {
        id: 5,
        title: 'Breaking Putts Mastery',
        duration: '14:45',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        pdfUrl: 'https://www.example.com/breaking-putts-guide.pdf',
        description: 'Learn to handle left-to-right and right-to-left breaking putts.',
        completed: false,
        preview: false
      }
    ]
  },
  4: {
    title: 'Short Game Mastery',
    instructor: 'Lisa Martinez',
    description: 'Transform your short game with advanced chipping, pitching, and bunker techniques.',
    totalLessons: 14,
    duration: '3h 20m',
    level: 'Intermediate',
    lessons: [
      {
        id: 1,
        title: 'Short Game Fundamentals',
        duration: '10:30',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        pdfUrl: 'https://www.example.com/short-game-fundamentals.pdf',
        description: 'Overview of short game techniques and club selection.',
        completed: false,
        preview: true
      },
      {
        id: 2,
        title: 'Chipping Basics',
        duration: '16:45',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        pdfUrl: 'https://www.example.com/chipping-guide.pdf',
        description: 'Master the basic chipping technique for consistent results.',
        completed: false,
        preview: true
      },
      {
        id: 3,
        title: 'Advanced Pitching Techniques',
        duration: '19:20',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        pdfUrl: 'https://www.example.com/pitching-techniques.pdf',
        description: 'Learn high and low pitch shots for various situations.',
        completed: false,
        preview: false
      }
    ]
  }
};

const CourseViewer: React.FC<CourseViewerProps> = ({ courseId, onNavigate, onBack }) => {
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'video' | 'pdf'>('video');
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const course = courseData[courseId as keyof typeof courseData];
  
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <button
            onClick={onBack}
            className="text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const canAccessLesson = (lesson: any) => {
    if (lesson.preview) return true;
    if (user?.subscription === 'premium' || user?.subscription === 'pro') return true;
    return false;
  };

  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      const newCompletedLessons = [...completedLessons, currentLesson];
      setCompletedLessons(newCompletedLessons);
      
      // Check if all lessons are now completed
      if (newCompletedLessons.length === course.lessons.length) {
        setShowCompletionModal(true);
      }
    }
    
    // Auto-advance to next lesson
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const nextLesson = () => {
    if (currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const currentLessonData = course.lessons[currentLesson];
  const completionPercentage = Math.round((completedLessons.length / course.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Course Header */}
          <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to Courses
            </button>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-gray-600 mb-4">by {course.instructor}</p>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>{course.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award size={16} />
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">{completionPercentage}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Content Viewer (Video or PDF) */}
            <div className="lg:col-span-3">
              {/* View Mode Toggle */}
              {canAccessLesson(currentLessonData) && (
                <div className="bg-white p-4 rounded-t-xl shadow-sm border border-b-0 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('video')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        viewMode === 'video'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Play size={16} />
                      Watch Video
                    </button>
                    <button
                      onClick={() => setViewMode('pdf')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        viewMode === 'pdf'
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <FileText size={16} />
                      View PDF
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">Choose your preferred format</span>
                </div>
              )}
              
              <div className="bg-white rounded-b-xl shadow-sm border overflow-hidden">
                {canAccessLesson(currentLessonData) ? (
                  <>
                    {viewMode === 'video' ? (
                      /* Video Player */
                      <div className="relative bg-black aspect-video">
                        {/* Mock Video Player */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                              {isPlaying ? (
                                <Pause size={32} />
                              ) : (
                                <Play size={32} />
                              )}
                            </div>
                            <p className="text-lg font-medium">{currentLessonData.title}</p>
                            <p className="text-sm opacity-75">{currentLessonData.duration}</p>
                          </div>
                        </div>
                        
                        {/* Video Controls */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <div className="flex items-center justify-between text-white">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                              >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                              </button>
                              
                              <button
                                onClick={prevLesson}
                                disabled={currentLesson === 0}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-all disabled:opacity-50"
                              >
                                <SkipBack size={20} />
                              </button>
                              
                              <button
                                onClick={nextLesson}
                                disabled={currentLesson === course.lessons.length - 1}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-all disabled:opacity-50"
                              >
                                <SkipForward size={20} />
                              </button>
                            </div>
                            
                            <button
                              onClick={handleLessonComplete}
                              className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                            >
                              Mark Complete
                            </button>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="w-full bg-white bg-opacity-20 rounded-full h-1">
                              <div 
                                className="bg-emerald-500 h-1 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* PDF Viewer */
                      <div className="bg-gray-50 min-h-[600px]">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <FileText className="text-red-600" size={24} />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{currentLessonData.title}</h3>
                                <p className="text-sm text-gray-600">PDF Document</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => window.open(currentLessonData.pdfUrl, '_blank')}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                              >
                                <Download size={16} />
                                Download PDF
                              </button>
                              <button
                                onClick={handleLessonComplete}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                              >
                                Mark Complete
                              </button>
                            </div>
                          </div>
                          
                          {/* PDF Preview */}
                          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
                            <iframe
                              src={`${currentLessonData.pdfUrl}#toolbar=1`}
                              className="w-full h-[500px]"
                              title={currentLessonData.title}
                            />
                          </div>
                          
                          {/* Navigation Buttons */}
                          <div className="flex justify-between mt-4">
                            <button
                              onClick={prevLesson}
                              disabled={currentLesson === 0}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <SkipBack size={16} />
                              Previous Lesson
                            </button>
                            <button
                              onClick={nextLesson}
                              disabled={currentLesson === course.lessons.length - 1}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Next Lesson
                              <SkipForward size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="text-gray-400 mx-auto mb-4" size={48} />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Content</h3>
                      <p className="text-gray-600 mb-4">Upgrade to access this lesson</p>
                      <button
                        onClick={() => onNavigate('subscription')}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Upgrade Now
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Lesson Info */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{currentLessonData.title}</h2>
                  <p className="text-gray-600 mb-4">{currentLessonData.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Lesson {currentLesson + 1} of {course.lessons.length} • {currentLessonData.duration}
                    </div>
                    
                    {completedLessons.includes(currentLesson) && (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle size={16} />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Course Content</h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {course.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLesson(index)}
                      className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        currentLesson === index ? 'bg-emerald-50 border-emerald-200' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          completedLessons.includes(index) 
                            ? 'bg-emerald-600 text-white' 
                            : currentLesson === index
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {completedLessons.includes(index) ? (
                            <CheckCircle size={16} />
                          ) : !canAccessLesson(lesson) ? (
                            <Lock size={14} />
                          ) : (
                            <span className="text-xs font-medium">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium text-sm mb-1 ${
                            currentLesson === index ? 'text-emerald-600' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{lesson.duration}</span>
                              <div className="flex items-center gap-1">
                                <Play size={10} className="text-blue-600" />
                                <FileText size={10} className="text-red-600" />
                              </div>
                            </div>
                            {lesson.preview && (
                              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                                Preview
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-lg w-full p-8 text-center transform animate-scaleIn">
            {/* Trophy Icon with Animation */}
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <Trophy className="text-white" size={48} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="text-yellow-400 animate-pulse" size={24} />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles className="text-yellow-400 animate-pulse" size={20} />
              </div>
            </div>
            
            {/* Congratulations Message */}
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              🎉 Congratulations! 🎉
            </h2>
            
            <p className="text-2xl font-semibold text-emerald-600 mb-4">
              Course Completed!
            </p>
            
            <p className="text-gray-600 mb-6 text-lg">
              You've successfully completed <br/>
              <span className="font-bold text-gray-900">{course.title}</span>
            </p>
            
            {/* Course Stats Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-2 text-emerald-800 mb-4">
                <Award size={24} />
                <span className="text-lg font-bold">Achievement Unlocked</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-emerald-700">{course.lessons.length}</div>
                  <div className="text-sm text-emerald-600">Lessons</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-700">{course.duration}</div>
                  <div className="text-sm text-emerald-600">Duration</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-700">100%</div>
                  <div className="text-sm text-emerald-600">Complete</div>
                </div>
              </div>
            </div>
            
            {/* Motivational Message */}
            <p className="text-gray-600 mb-6 italic">
              "You're one step closer to mastering your golf game!"
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCompletionModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Review Course
              </button>
              <button
                onClick={() => {
                  setShowCompletionModal(false);
                  onBack();
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg"
              >
                Browse More Courses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseViewer;