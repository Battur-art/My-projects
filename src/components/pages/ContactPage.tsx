import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@stylehub.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Fashion Street, NY 10001',
      description: 'Our flagship store location'
    },
    {
      icon: Clock,
      title: 'Store Hours',
      content: 'Mon-Sat: 9AM-8PM',
      description: 'Sunday: 11AM-6PM'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or need assistance with your order? 
            We're here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <info.icon className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{info.title}</h3>
                      <p className="text-slate-600 font-medium">{info.content}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Help</h2>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium text-slate-900 mb-1">Order Status</h4>
                  <p>Track your order with the order number from your confirmation email.</p>
                </div>
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium text-slate-900 mb-1">Returns</h4>
                  <p>30-day return policy. Items must be in original condition.</p>
                </div>
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium text-slate-900 mb-1">Shipping</h4>
                  <p>Free shipping on orders over $50. Usually ships within 1-2 business days.</p>
                </div>
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium text-slate-900 mb-1">Sizing</h4>
                  <p>Check our size guide on product pages for the perfect fit.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="order-inquiry">Order Inquiry</option>
                    <option value="product-question">Product Question</option>
                    <option value="return-exchange">Return/Exchange</option>
                    <option value="technical-issue">Technical Issue</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('home')}
                    className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 bg-slate-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our customer service team is available to assist you with any questions or concerns. 
            We typically respond to all inquiries within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button className="flex-1 bg-white text-slate-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200">
              Live Chat
            </button>
            <button className="flex-1 bg-amber-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors">
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;