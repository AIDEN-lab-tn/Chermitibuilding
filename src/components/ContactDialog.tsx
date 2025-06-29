import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Building2, Mail, Phone, User, MessageSquare, DollarSign } from 'lucide-react';

interface ContactDialogProps {
  children: React.ReactNode;
}

export const ContactDialog = ({ children }: ContactDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'newsletter',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you for your interest! We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/90 dark:bg-black/90 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl">
            <Building2 className="h-8 w-8 text-blue-400" />
            <span>Get in Touch</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
                <User className="h-4 w-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interest" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
                <MessageSquare className="h-4 w-4" />
                <span>Interest</span>
              </Label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              >
                <option value="newsletter">Newsletter Only</option>
                <option value="viewing">Schedule Viewing</option>
                <option value="purchase">Purchase Inquiry</option>
                <option value="investment">Investment Opportunity</option>
              </select>
            </div>
            <div>
              <Label htmlFor="budget" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
                <DollarSign className="h-4 w-4" />
                <span>Budget Range</span>
              </Label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-md text-gray-900 dark:text-white"
              >
                <option value="">Select Budget</option>
                <option value="2-5M">$2M - $5M</option>
                <option value="5-10M">$5M - $10M</option>
                <option value="10-20M">$10M - $20M</option>
                <option value="20M+">$20M+</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="flex items-center space-x-2 text-gray-900 dark:text-blue-300 font-semibold">
              <MessageSquare className="h-4 w-4" />
              <span>Message</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-white dark:bg-gray-800 border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white mt-2"
              rows={4}
              placeholder="Tell us about your requirements..."
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
            Submit Inquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
