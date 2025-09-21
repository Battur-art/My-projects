import React from 'react';
import { CheckCircle, Mail, Package, Truck } from 'lucide-react';

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigate: (page: string) => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, onNavigate }) => {
  const orderSteps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been placed successfully',
      status: 'completed'
    },
    {
      icon: Package,
      title: 'Processing',
      description: 'We are preparing your items',
      status: 'current'
    },
    {
      icon: Truck,
      title: 'Shipped',
      description: 'Your order is on its way',
      status: 'upcoming'
    },
    {
      icon: CheckCircle,
      title: 'Delivered',
      description: 'Enjoy your purchase!',
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 inline-block">
            <span className="text-sm text-gray-600">Order Number: </span>
            <span className="font-mono font-semibold text-slate-900">#{orderId.toUpperCase()}</span>
          </div>
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Order Status</h2>
          <div className="space-y-6">
            {orderSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'current' ? 'bg-amber-100 text-amber-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-medium ${
                    step.status === 'completed' ? 'text-green-900' :
                    step.status === 'current' ? 'text-amber-900' :
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                  {step.status === 'current' && (
                    <div className="mt-2">
                      <div className="bg-amber-200 rounded-full h-1.5 w-full">
                        <div className="bg-amber-500 rounded-full h-1.5 w-1/3 animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Mail className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Confirmation Email</h3>
                <p className="text-gray-600 text-sm">
                  We've sent a confirmation email with your order details and tracking information.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Package className="h-6 w-6 text-amber-500 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Processing Time</h3>
                <p className="text-gray-600 text-sm">
                  Your order will be processed within 1-2 business days and then shipped.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Truck className="h-6 w-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Estimated delivery time is 3-5 business days from shipping date.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Order Updates</h3>
                <p className="text-gray-600 text-sm">
                  We'll keep you updated via email as your order progresses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Support */}
        <div className="bg-slate-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, please don't hesitate to contact our customer support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="flex-1 bg-slate-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;