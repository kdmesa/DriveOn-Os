import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Booking {
  id: string;
  instructorName: string;
  instructorImage: string;
  lessonType: string;
  date: Date;
  time: string;
  duration: string;
  skillLevel: string;
  focusAreas: string[];
  additionalNotes?: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  zoomLink?: string;
  meetingId?: string;
  meetingPassword?: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

// Initial mock bookings
const initialBookings: Booking[] = [
  {
    id: '1',
    instructorName: 'Mike Johnson',
    instructorImage: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=200',
    lessonType: 'Private Lesson',
    date: new Date(2025, 9, 5, 9, 0),
    time: '9:00 AM',
    duration: '1 hour',
    skillLevel: 'Intermediate',
    focusAreas: ['Putting', 'Short Game'],
    additionalNotes: 'Working on consistency with short putts',
    price: 120,
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/1234567890?pwd=abc123',
    meetingId: '123 456 7890',
    meetingPassword: 'golf2025'
  },
  {
    id: '2',
    instructorName: 'Sarah Wilson',
    instructorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    lessonType: 'Playing Lesson',
    date: new Date(2025, 9, 8, 14, 0),
    time: '2:00 PM',
    duration: '2 hours',
    skillLevel: 'Advanced',
    focusAreas: ['Course Management', 'Iron Play', 'Mental Game'],
    price: 450,
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/9876543210?pwd=xyz789',
    meetingId: '987 654 3210',
    meetingPassword: 'proGolf99'
  },
  {
    id: '3',
    instructorName: 'David Chen',
    instructorImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
    lessonType: 'Private Lesson',
    date: new Date(2025, 8, 28, 10, 0),
    time: '10:00 AM',
    duration: '1.5 hours',
    skillLevel: 'Beginner',
    focusAreas: ['Full Swing', 'Driving'],
    price: 270,
    status: 'completed',
    zoomLink: 'https://zoom.us/j/5555555555?pwd=def456',
    meetingId: '555 555 5555',
    meetingPassword: 'swing123'
  }
];

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
      )
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
