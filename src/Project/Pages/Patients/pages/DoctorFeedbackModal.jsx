

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, CheckCircle } from 'lucide-react';

const SimpleFeedback = ({ doctor, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    await onSubmit({ rating, comment });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      setRating(0);
      setComment('');
    }, 2000);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition"
      >
        Give Feedback
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 bg-white rounded-xl shadow-xl"
            >
              {!showSuccess ? (
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Rate {doctor?.name || 'Doctor'}</h3>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition ${
                            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Rating Text */}
                  <p className="text-center text-sm text-gray-600 mb-4">
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </p>

                  {/* Comment */}
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience (optional)"
                    rows="3"
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-blue-400"
                  />

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={rating === 0}
                    className={`w-full mt-4 py-2 rounded-lg font-medium transition ${
                      rating === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-1">Thank You!</h3>
                  <p className="text-sm text-gray-600">Your feedback helps us improve</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Demo Component
const DoctorFeedbackModal = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const handleSubmit = async (feedback) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setFeedbacks(prev => [feedback, ...prev]);
    console.log('Feedback submitted:', feedback);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Dr. Sarah Wilson</h2>
              <p className="text-sm text-gray-500">Cardiologist</p>
            </div>
            <SimpleFeedback 
              doctor={{ name: "Dr. Sarah Wilson" }} 
              onSubmit={handleSubmit}
            />
          </div>
          
          {/* Rating Display */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-600 ml-2">(4.8)</span>
          </div>
        </div>

        {/* Recent Feedbacks */}
        {feedbacks.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-3">Recent Feedback</h3>
            <div className="space-y-3">
              {feedbacks.map((fb, i) => (
                <div key={i} className="border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(fb.rating)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {fb.comment && (
                    <p className="text-sm text-gray-600">{fb.comment}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorFeedbackModal;