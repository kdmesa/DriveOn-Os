import React, { useState } from 'react';
import { Play, Star, Users, Trophy, ArrowRight, CheckCircle, Target, BarChart, Calendar, Award, Quote, Clock, Shield, TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Eye, Compass, Lightbulb, X } from 'lucide-react';
import Header from './Header';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  openAuth: (mode: 'login' | 'register') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, openAuth }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Header onNavigate={onNavigate} openAuth={openAuth} />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 min-h-[600px] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1920&q=80" 
            alt="Golfer swinging" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-gray-900/60"></div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium shadow-lg">
              #1 Golf Training Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          The Golf Performance System That Delivers
            <span className="text-emerald-400 block">Measurable Results</span>
          </h1>
          
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
            Join thousands of golfers improving their game with our comprehensive courses, 
            personalized lessons, and interactive training system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => openAuth('register')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => setShowVideoModal(true)}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Play size={20} />
              Watch Demo
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="text-yellow-400" size={16} />
              <span>4.9/5 from 12,000+ golfers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users size={16} className="text-emerald-400" />
              <span>50,000+ active members</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Trophy size={16} className="text-emerald-400" />
              <span>Trusted by PGA Pros</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, and Positioning Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Purpose & Direction
            </h2>
            <p className="text-xl text-gray-600">
              Transforming golf training through innovation and excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-emerald-600">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center">
                  <Target className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Mission</h3>
              <p className="text-gray-700 text-center leading-relaxed">
              Help busy adult golfers gain measurable speed and play pain-safe in 10–20 minutes/day with a proven operating system (OS), coach-led momentum, and community.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-blue-600">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                  <Eye className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Vision</h3>
              <p className="text-gray-700 text-center leading-relaxed">
              The default golf performance platform—consumer-first membership, coach network (DCC), and club licensing that ties training to outcomes (mph, pain, score).
              </p>
            </div>

            {/* Positioning Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-t-4 border-purple-600">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                  <Compass className="text-white" size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Our Positioning</h3>
              <p className="text-gray-700 text-center leading-relaxed">
              Golf-first, measurable outcomes, minimal time. Annual membership as the spine; cohorts, certification, and B2B licensing drive ARPU and defensibility.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-12 bg-gradient-to-r from-emerald-600 to-blue-600 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Our Core Values</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Lightbulb className="text-yellow-300" size={32} />
                </div>
                <h4 className="text-white font-semibold mb-2">Innovation</h4>
                <p className="text-emerald-100 text-sm">Constantly evolving with cutting-edge technology</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Trophy className="text-yellow-300" size={32} />
                </div>
                <h4 className="text-white font-semibold mb-2">Excellence</h4>
                <p className="text-emerald-100 text-sm">Delivering world-class instruction and results</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <Users className="text-yellow-300" size={32} />
                </div>
                <h4 className="text-white font-semibold mb-2">Community</h4>
                <p className="text-emerald-100 text-sm">Building a supportive network of passionate golfers</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <BarChart className="text-yellow-300" size={32} />
                </div>
                <h4 className="text-white font-semibold mb-2">Results</h4>
                <p className="text-emerald-100 text-sm">Focused on measurable improvement and success</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Frustrating Gap We Close Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Frustrating Gap We Close
            </h2>
            <p className="text-xl text-gray-600">
              Designed specifically for adult golfers who demand efficiency and results
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl border-2 border-emerald-100 hover:border-emerald-300 transition-all shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-emerald-100 rounded-full">
                  <Clock className="text-emerald-600" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    You're an Adult Golfer (30-60) who's always too busy
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                for a 90-minute gym session. You need <span className="font-bold text-emerald-600">efficiency</span>. 
                Our 10-20 minute focused sessions fit into your schedule.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Target className="text-blue-600" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    You're tired of generic fitness advice
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You want a system designed <span className="font-bold text-blue-600">specifically for the golf swing</span> and 
                mobility. No more wasted time on irrelevant exercises.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 hover:border-red-300 transition-all shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Shield className="text-red-600" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    You play with pain
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                (back, shoulder, hip) and fear aggravating an old injury. You need a <span className="font-bold text-red-600">safe, 
                progressive plan</span> designed by professionals.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <TrendingUp className="text-purple-600" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    You want proof, not promises
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You need a system that tracks your speed, mobility, and score delta. 
                <span className="font-bold text-purple-600"> Measurable results</span> or your money back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Improve Your Golf Game
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Courses</h3>
              <p className="text-gray-600">Access 100+ professional golf courses with detailed video instructions and practice drills.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1-on-1 Lessons</h3>
              <p className="text-gray-600">Book personalized sessions with certified PGA professionals at your convenience.</p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Quizzes</h3>
              <p className="text-gray-600">Test your knowledge and track progress with interactive quizzes and assessments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DriveOn OS?
            </h2>
            <p className="text-xl text-gray-600">
              The complete platform for golfers of all skill levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Target className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Learning Path</h3>
                  <p className="text-gray-600">
                    Get customized course recommendations based on your skill level, goals, and playing style. 
                    Our AI-powered system adapts to your progress.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
                  <p className="text-gray-600">
                    Track every aspect of your game with detailed statistics, progress charts, and 
                    performance insights to identify areas for improvement.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Calendar className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-600">
                    Book lessons at times that work for you. Our instructors are available 7 days a week, 
                    with morning, afternoon, and evening slots.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Award className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Certified Professionals</h3>
                  <p className="text-gray-600">
                    Learn from PGA-certified instructors with years of teaching experience and proven 
                    track records of helping golfers improve.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Golfers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied golfers who've improved their game
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={20} />
                ))}
              </div>
              <Quote className="text-emerald-200 mb-4" size={32} />
              <p className="text-gray-700 mb-6 italic">
                "I've lowered my handicap by 8 strokes in just 3 months! The personalized lessons and 
                detailed course content are game-changers. Best investment I've made in my golf game."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-gray-900">James Davidson</p>
                  <p className="text-sm text-gray-600">Handicap: 12 → 4</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={20} />
                ))}
              </div>
              <Quote className="text-emerald-200 mb-4" size={32} />
              <p className="text-gray-700 mb-6 italic">
                "As a beginner, I was intimidated by golf. GolfPro made learning fun and easy. The instructors 
                are patient and the courses are well-structured. I'm now playing confidently!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Martinez</p>
                  <p className="text-sm text-gray-600">Member for 6 months</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-yellow-500" size={20} />
                ))}
              </div>
              <Quote className="text-emerald-200 mb-4" size={32} />
              <p className="text-gray-700 mb-6 italic">
                "The analytics feature is incredible! I can see exactly where I need to improve. The 
                combination of video lessons and live coaching has transformed my game completely."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-sm text-gray-600">Handicap: 18 → 11</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coach/Program Highlights Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Coaches
            </h2>
            <p className="text-xl text-gray-600">
              Learn from the best in the business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Coach 1 */}
            <div className="bg-gradient-to-b from-emerald-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                MJ
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Mike Johnson</h3>
              <p className="text-emerald-600 text-center font-semibold mb-4">PGA Professional</p>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  15+ years teaching experience
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  Putting & Short Game Specialist
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  2,340+ students coached
                </p>
              </div>
              <p className="text-gray-700 text-sm italic text-center">
                "My goal is to help every golfer find their perfect putting stroke and build confidence on the greens."
              </p>
            </div>

            {/* Coach 2 */}
            <div className="bg-gradient-to-b from-blue-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                SW
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Sarah Wilson</h3>
              <p className="text-blue-600 text-center font-semibold mb-4">PGA Certified Coach</p>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  Former LPGA Tour Player
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  Swing Mechanics Expert
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  1,890+ students coached
                </p>
              </div>
              <p className="text-gray-700 text-sm italic text-center">
                "I specialize in helping beginners build a solid foundation and advanced players refine their technique."
              </p>
            </div>

            {/* Coach 3 */}
            <div className="bg-gradient-to-b from-purple-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                DC
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">David Chen</h3>
              <p className="text-purple-600 text-center font-semibold mb-4">Master Instructor</p>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-600" />
                  20+ years pro experience
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-600" />
                  Course Management Specialist
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-600" />
                  3,200+ students coached
                </p>
              </div>
              <p className="text-gray-700 text-sm italic text-center">
                "Strategic thinking is just as important as technique. I teach golfers how to play smarter, not just harder."
              </p>
            </div>
          </div>

          {/* Program Highlights */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold text-center mb-8">Our Program Highlights</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100+</div>
                <p className="text-emerald-100">Expert-Led Courses</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-emerald-100">Active Members</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9/5</div>
                <p className="text-emerald-100">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <p className="text-emerald-100">Course Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Choose Your Training Plan
          </h2>
          <p className="text-center text-gray-600 mb-12">Start with a free trial, upgrade anytime</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Trial */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-emerald-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Trial</h3>
              <p className="text-4xl font-bold text-emerald-600 mb-6">$0<span className="text-lg text-gray-600">/7 days</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>5 Free Courses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>Basic Progress Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-600" />
                  <span>Community Access</span>
                </li>
              </ul>
              <button 
                onClick={() => openAuth('register')}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            {/* Premium */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-4xl font-bold text-blue-600 mb-6">$29<span className="text-lg text-gray-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>All Courses (100+)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>2 Monthly Lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600" />
                  <span>Quiz System</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Choose Premium
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-4xl font-bold text-amber-600 mb-6">$99<span className="text-lg text-gray-600">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-amber-600" />
                  <span>Everything in Premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-amber-600" />
                  <span>Unlimited Lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-amber-600" />
                  <span>Personal Golf Coach</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-amber-600" />
                  <span>Custom Training Plans</span>
                </li>
              </ul>
              <button className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                Go Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Lower Your Handicap?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of golfers who have improved their game with our proven system.
          </p>
          <button 
            onClick={() => openAuth('register')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
          >
            Start Your Free Trial Today
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="text-emerald-500" size={24} />
                DriveOn Os
              </h3>
              <p className="text-gray-400 mb-4">
                The #1 golf training platform trusted by 50,000+ golfers worldwide.
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-emerald-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('courses')} className="hover:text-emerald-500 transition-colors">
                    Browse Courses
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('booking')} className="hover:text-emerald-500 transition-colors">
                    Book a Lesson
                  </button>
                </li>
                <li>
                  <button onClick={() => openAuth('login')} className="hover:text-emerald-500 transition-colors">
                    Sign In
                  </button>
                </li>
                <li>
                  <button onClick={() => openAuth('register')} className="hover:text-emerald-500 transition-colors">
                    Start Free Trial
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Our Coaches
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-500 transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                  <a href="mailto:support@golfpro.com" className="hover:text-emerald-500 transition-colors">
                    support@driveonos.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                  <a href="tel:+1234567890" className="hover:text-emerald-500 transition-colors">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={18} className="text-emerald-500 mt-1 flex-shrink-0" />
                  <span>
                    123 Golf Avenue<br />
                    San Francisco, CA 94102
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 DriveOn OS. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-emerald-500 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
            >
              <X size={24} className="text-gray-700" />
            </button>
            
            {/* Video Container */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/me5gjIUe1Ks?autoplay=1"
                title="DriveOn OS Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transform Your Golf Game</h3>
              <p className="text-gray-600 mb-4">See how DriveOn OS helps golfers improve their performance with our proven system.</p>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  openAuth('register');
                }}
                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Start Your Free Trial Today
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;