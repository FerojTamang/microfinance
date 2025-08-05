export const SAMPLE_IMAGE_RED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDDg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4OAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
export const SAMPLE_IMAGE_BLUE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
export const SAMPLE_IMAGE_GREEN = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';
export const SAMPLE_IMAGE_YELLOW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYSURBVBhXY5g7f7///8DAwMDAwMDAwMDAwMDAwMDAwMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NAAAYgA+4Q2GdwAAAABJRU5ErkJggg==';

export const initialAboutData = {
  overview: 'Welcome to our Microfinance Institution. We provide financial services to empower communities and foster economic growth.',
  introduction: 'Founded in 2005, our microfinance institution was inspired by the global microfinance movement. We aim to provide accessible financial services to underserved communities.',
  team: [
    { id: 1, name: 'Dr. Jane Smith', role: 'Chairperson', description: 'Leads strategic vision.', photo: SAMPLE_IMAGE_RED, phone: '+977-1-1234567' },
    { id: 2, name: 'Mr. Anil Patel', role: 'Secretary', description: 'Manages operations.', photo: SAMPLE_IMAGE_BLUE, phone: '+977-1-7654321' },
    { id: 3, name: 'Ms. Priya Sharma', role: 'Finance Officer', description: 'Oversees financial portfolio.', photo: SAMPLE_IMAGE_GREEN, phone: '+977-1-9876543' },
    { id: 4, name: 'Ms. Lakshmi Rao', role: 'Village Representative', description: 'Advocates for rural clients.', photo: SAMPLE_IMAGE_YELLOW, phone: '+977-1-4567890' },
  ],
  financials: { totalCapital: 12000000, totalInvested: 8000000, futureGoal: 20000000 },
};

export const initialFaqs = [
  {
    id: 1,
    question: 'How do I apply for a loan?',
    answer: 'To apply for a loan with MicroFinance Solutions, follow these steps:\n1. Navigate to the \'Apply for Loan\' tab on our website.\n2. Fill out the loan application form with details such as loan type, amount, tenure, full name, email, phone number, and citizenship number.\n3. Optionally, upload supporting documents like a citizenship document or agreement papers (PDF, JPG, or PNG formats, max 5MB).\n4. Review your information and click \'Submit Loan Application.\'\n5. You will receive a confirmation message, and our team will contact you for further processing.\nEnsure all required fields are completed to avoid delays in processing.',
  },
  {
    id: 2,
    question: 'What types of loans are available?',
    answer: 'We offer Personal Loans, Agricultural Loans, and Group Loans. Each loan type is designed to meet specific financial needs, with flexible tenures ranging from 3 months to 5 years.',
  },
  {
    id: 3,
    question: 'What are the eligibility criteria for a loan?',
    answer: 'To be eligible, you must be at least 18 years old, have a valid citizenship number, and provide accurate personal and contact information. Additional requirements may vary based on the loan type.',
  },
  {
    id: 4,
    question: 'How long does it take to process a loan application?',
    answer: 'Loan applications are typically processed within 3-5 business days. You will be notified via email or phone once a decision is made.',
  },
  {
    id: 5,
    question: 'Can I calculate my EMI before applying?',
    answer: 'Yes, use our EMI Calculator in the \'Apply for Loan\' tab to estimate your monthly payments based on loan amount, tenure, and interest rate.',
  },
];

export const initialContacts = [
  { id: 1, title: 'Chairperson', name: 'Mr. Feroj Tamang', email: 'chairperson@microfinance.org', phone: '+977-1-1234567' },
  { id: 2, title: 'Member', name: 'Ms. Amisha Lama', email: 'member@microfinance.org', phone: '+977-1-7654321' },
  { id: 3, title: 'Secretary', name: 'Mr. Adarsha Lama', email: 'secretary@microfinance.org', phone: '+977-1-9876543' },
];

export const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'gallery', name: 'Add Gallery', icon: 'Image' },
  { id: 'membership', name: 'Membership Forms', icon: 'Users' },
  { id: 'loans', name: 'Loan Applications', icon: 'CreditCard' },
  { id: 'aboutus', name: 'About Us', icon: 'User' },
  { id: 'contactus', name: 'Contact Us', icon: 'User' },
  { id: 'faq', name: 'FAQ', icon: 'FileText' },
  { id: 'feedback', name: 'Feedback', icon: 'User' },
  { id: 'events', name: 'Events & News Popup', icon: 'User' },
];