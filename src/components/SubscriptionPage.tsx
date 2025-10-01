import React from 'react';
import { CheckCircle, Crown, Zap, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';

interface SubscriptionPageProps {
  onNavigate: (page: string) => void;
}

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onNavigate }) => {
  const { user, upgradePlan } = useAuth();

  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      period: '/7 days',
      description: 'Perfect for getting started',
      icon: Zap,
      color: 'emerald',
      features: [
        '5 Free Courses',
        'Basic Progress Tracking',
        'Community Access',
        'Mobile App Access'
      ],
      limitations: [
        'Limited course selection',
        'No 1-on-1 lessons',
        'Basic analytics only'
      ]
    },
    {
      id: 'premium',
      name: 'Monthly',
      price: 29,
      period: '/month',
      description: 'Most popular choice',
      icon: Star,
      color: 'blue',
      popular: true,
      features: [
        'All Courses (100+)',
        '2 Monthly Lessons',
        'Advanced Analytics',
        'Quiz System',
        'Priority Support',
        'Downloadable Content',
        'Progress Certificates'
      ]
    },
    {
      id: 'pro',
      name: 'Annual',
      price: 219,
      period: '/year',
      description: 'For serious golfers',
      icon: Crown,
      color: 'amber',
      features: [
        'Everything in Monthly',
        'Unlimited Lessons',
        'Personal Golf Coach',
        'Custom Training Plans',
        'Video Analysis',
        'Equipment Recommendations',
        'Tournament Prep',
        'Exclusive Masterclasses'
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    if (planId !== 'free') {
      upgradePlan(planId);
    }
  };

  const currentPlan = plans.find(plan => plan.id === user?.subscription) || plans[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Golf Training Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Unlock your potential with our comprehensive training programs designed for golfers at every level
            </p>
            
            {user?.subscription && (
              <div className="mt-6 inline-block bg-white px-6 py-3 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-600">
                  Current Plan: <span className="font-semibold text-gray-900">{currentPlan.name}</span>
                  {user.trialEndsAt && user.subscription === 'free' && (
                    <span className="ml-2 text-amber-600">
                      (expires in {Math.ceil((user.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days)
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl shadow-lg border-2 relative ${
                  plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
                } ${user?.subscription === plan.id ? 'ring-2 ring-emerald-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {user?.subscription === plan.id && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      plan.color === 'emerald' ? 'bg-emerald-100' :
                      plan.color === 'blue' ? 'bg-blue-100' : 'bg-amber-100'
                    }`}>
                      <plan.icon className={`${
                        plan.color === 'emerald' ? 'text-emerald-600' :
                        plan.color === 'blue' ? 'text-blue-600' : 'text-amber-600'
                      }`} size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    
                    <div className="mb-6">
                      <span className={`text-5xl font-bold ${
                        plan.color === 'emerald' ? 'text-emerald-600' :
                        plan.color === 'blue' ? 'text-blue-600' : 'text-amber-600'
                      }`}>
                        ${plan.price}
                      </span>
                      <span className="text-lg text-gray-600">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className={`${
                            plan.color === 'emerald' ? 'text-emerald-600' :
                            plan.color === 'blue' ? 'text-blue-600' : 'text-amber-600'
                          } flex-shrink-0`} size={16} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-2">Limitations:</h4>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, index) => (
                            <li key={index} className="text-sm text-gray-500">
                              • {limitation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={user?.subscription === plan.id}
                    className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                      user?.subscription === plan.id
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : plan.color === 'emerald'
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : plan.color === 'blue'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {user?.subscription === plan.id ? (
                      'Current Plan'
                    ) : plan.id === 'free' ? (
                      'Start Free Trial'
                    ) : (
                      <>
                        Upgrade Now
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
                <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What happens to my progress if I cancel?</h3>
                <p className="text-gray-600 text-sm">Your progress is saved permanently. You can always reactivate your account and pick up where you left off.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Are the lessons live or pre-recorded?</h3>
                <p className="text-gray-600 text-sm">We offer both! Courses are high-quality pre-recorded content, while 1-on-1 lessons are live sessions with certified pros.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600 text-sm">Yes, we offer a 30-day money-back guarantee on all paid plans if you're not completely satisfied.</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">What Our Members Say</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Mike Chen",
                  quote: "Dropped my handicap by 5 strokes in just 3 months!",
                  rating: 5
                },
                {
                  name: "Sarah Johnson",
                  quote: "The 1-on-1 lessons are incredible. Best investment in my golf game.",
                  rating: 5
                },
                {
                  name: "David Wilson",
                  quote: "Finally understand the fundamentals. My consistency has improved dramatically.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;