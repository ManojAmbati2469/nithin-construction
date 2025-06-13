
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'site-visit' | 'journey';
}

const InquiryModal = ({ isOpen, onClose, type }: InquiryModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formTitle = type === 'site-visit' ? 'Schedule Site Visit' : 'Start Your Journey';
  const formName = type === 'site-visit' ? 'site-visit-form' : 'journey-form';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Form Submitted Successfully!",
          description: "We'll get back to you soon.",
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={resetForm}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Your {type === 'site-visit' ? 'site visit request' : 'inquiry'} has been submitted successfully. 
                Our team will contact you within 24 hours.
              </p>
            </div>
            <Button onClick={resetForm} className="gradient-construction text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">
            {formTitle}
          </DialogTitle>
        </DialogHeader>
        
        <form
          name={formName}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value={formName} />
          <input type="hidden" name="bot-field" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                className="w-full"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="w-full"
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full"
              placeholder="Enter your phone number"
            />
          </div>

          {type === 'site-visit' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="text-sm font-medium">
                  Preferred Visit Date
                </Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredTime" className="text-sm font-medium">
                  Preferred Time
                </Label>
                <Input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  className="w-full"
                />
              </div>
            </>
          )}

          {type === 'journey' && (
            <div className="space-y-2">
              <Label htmlFor="interestedIn" className="text-sm font-medium">
                Interested In
              </Label>
              <select
                id="interestedIn"
                name="interestedIn"
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="">Select apartment type</option>
                <option value="2BHK">2 BHK Apartment</option>
                <option value="3BHK">3 BHK Apartment</option>
                <option value="Both">Both 2 & 3 BHK</option>
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder={`Tell us more about your ${type === 'site-visit' ? 'visit requirements' : 'requirements'}`}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 gradient-construction text-white hover:opacity-90"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryModal;
