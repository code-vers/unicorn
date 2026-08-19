'use client';

import { 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronDown, 
  Upload,
  MessageCircleQuestion,
  Headset
} from 'lucide-react';
import { useState } from 'react';
import { SupportService } from '@/lib/api/support.service';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/Spinner';
import { useAuth } from '@/contexts/AuthContext';

const faqs = [
  { question: 'How do I extend my rental period?', answer: 'You can extend your rental period through the "Extend Rental" quick action on your dashboard or by contacting our support team.' },
  { question: 'What happens if I return the car late?', answer: 'Late returns may incur additional charges. Please notify us as soon as possible if you expect to be late.' },
  { question: 'How do I get my deposit refunded?', answer: 'Deposits are typically refunded within 3-5 business days after the vehicle is returned and inspected.' },
  { question: 'What documents are required to rent?', answer: 'You will need a valid driver\'s license, proof of ID, and a credit card for the security deposit.' },
  { question: 'Can I take the vehicle outside Kenya?', answer: 'Cross-border travel requires prior approval and additional insurance. Please contact support for more details.' },
];

export default function SupportCenter() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !message) {
      toast.error('Please enter a subject and message');
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user) {
        throw new Error('Please sign in before submitting a support ticket.');
      }
      await SupportService.createTicket({ name: user.name, email: user.email, subject, message });
      toast.success('Ticket submitted successfully! We will get back to you soon.');
      setSubject('');
      setMessage('');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-[14px] font-bold text-[#0A1413] font-montserrat">
          Support
        </h2>
        <p className="text-[12px] text-[#6B7280] font-lato">
          Get help from our team or browse frequently asked questions.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Call Us */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-px overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="bg-[#EBF7ED] rounded-[6px] p-2">
              <Phone size={16} className="text-[#3FA34D]" />
            </div>
            <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Call Us</h3>
          </div>
          <div className="p-6 space-y-2">
            <div className="flex items-center gap-4">
              <Phone size={16} className="text-[#0A1413]" />
              <span className="text-[14px] text-[#0A1413] font-nunito">+254 020 123 4567</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-full p-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#6B7280]">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="text-[14px] text-[#6B7280] font-nunito">24/7 Available</span>
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-px overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="bg-[#EBF7ED] rounded-[6px] p-2">
              <MessageCircle size={18} className="text-[#3FA34D]" />
            </div>
            <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">WhatsApp</h3>
          </div>
          <div className="p-6 space-y-2">
            <div className="flex items-center gap-4">
              <Phone size={16} className="text-[#0A1413]" />
              <span className="text-[14px] text-[#0A1413] font-nunito">+254 712 000 000</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-full p-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#6B7280]">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="text-[14px] text-[#6B7280] font-nunito">Typically replies in 5 min</span>
            </div>
          </div>
        </div>

        {/* Email Us */}
        <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-px overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center gap-3">
            <div className="bg-[#EBF7ED] rounded-[6px] p-2">
              <Mail size={16} className="text-[#3FA34D]" />
            </div>
            <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Email Us</h3>
          </div>
          <div className="p-6 space-y-2">
            <div className="flex items-center gap-4">
              <Mail size={16} className="text-[#0A1413]" />
              <span className="text-[14px] text-[#0A1413] font-nunito">support@unicornrent.co.ke</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-full p-0.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#6B7280]">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span className="text-[14px] text-[#6B7280] font-nunito">Response within 2 hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Ticket Form */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-[14px] p-6 space-y-6">
          <h3 className="text-[18px] font-bold text-[#0A1413] font-montserrat">Submit Any Query</h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[14px] font-normal text-[#0A1413] font-nunito">Subject</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                className="w-full border border-[#D9D9D9] rounded-[4px] px-3 py-2 text-[14px] font-nunito placeholder-[#D9D9D9] focus:outline-none focus:border-[#3FA344]"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[14px] font-normal text-[#0A1413] font-nunito">Message</label>
              <textarea 
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue in detail..."
                className="w-full border border-[#D9D9D9] rounded-[4px] px-3 py-2 text-[14px] font-nunito placeholder-[#D9D9D9] focus:outline-none focus:border-[#3FA344] resize-none"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="text-[14px] font-normal text-[#0A1413] font-nunito">Attachment (optional)</label>
              <div className="border-[1.5px] border-dashed border-[#D9D9D9] rounded-[8px] p-6 flex flex-col items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={32} className="text-[#6B7280]" />
                <p className="text-[14px] text-[#6B7280] font-nunito text-center">Drag and drop or click to upload</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#3FA344] text-white py-2 rounded-[6px] text-[14px] font-bold font-wix hover:bg-[#358a3a] transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {isSubmitting ? <Spinner size="sm" /> : 'Submit Ticket'}
          </button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Roadside Assistance */}
          <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-5 space-y-6">
            <h4 className="text-[14px] font-bold text-[#0A1413] font-montserrat uppercase">24/7 Roadside Assistance</h4>
            <button className="w-full bg-[#FF7815] text-white py-2 rounded-[6px] text-[14px] font-bold font-wix hover:bg-[#e66c13] transition-colors">
              Call +254 800 123 456
            </button>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center gap-3">
              <div className="bg-[#EBF7ED] rounded-[6px] p-2">
                <MessageCircleQuestion size={16} className="text-[#3FA34D]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#0A1413] font-montserrat">Frequently Asked Questions</h3>
            </div>
            <div className="divide-y divide-[#E5E7EB]">
              {faqs.map((faq, index) => (
                <div key={index} className="px-6 py-4">
                  <button 
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-[14px] font-medium text-[#1E2939] font-lato group-hover:text-[#3FA344] transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-[#1E2939] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {openFaq === index && (
                    <div className="mt-2 text-[13px] text-[#6B7280] font-lato animate-in fade-in slide-in-from-top-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
