# Booking System Documentation

## Overview
The booking system is now fully functional with data persistence across the Booking and Calendar pages.

## How It Works

### 1. **Booking Context** (`src/contexts/BookingContext.tsx`)
- Central state management for all bookings
- Provides functions to add, update, and cancel bookings
- Stores booking data that persists across page navigation

### 2. **Booking Flow**

#### Step 1: Book a Lesson (`BookingPage.tsx`)
1. Select lesson type (Private, Semi-Private, Group, or Playing Lesson)
2. Choose an instructor (Mike Johnson, Sarah Wilson, or David Chen)
3. Pick a date and time from available slots
4. Select duration (30 min, 1 hour, 1.5 hours, or 2 hours)
5. Choose skill level and focus areas
6. Add optional notes
7. Review and confirm booking

#### Step 2: Automatic Zoom Meeting Generation
- When you book a lesson, a Zoom meeting is automatically generated
- Meeting includes:
  - Zoom link
  - Meeting ID
  - Meeting password

#### Step 3: View Bookings (`CalendarPage.tsx`)
- Navigate to "My Lessons" to see all your bookings
- Bookings are organized into:
  - **Upcoming**: Future lessons
  - **Past**: Completed or cancelled lessons
- Each booking shows:
  - Instructor details
  - Lesson type and duration
  - Date and time
  - Focus areas
  - Zoom meeting details
  - Price

### 3. **Features**

✅ **Real-time Updates**: Bookings appear immediately in My Lessons
✅ **Zoom Integration**: Auto-generated meeting links for virtual lessons
✅ **Cancellation**: Cancel bookings with 24-hour notice
✅ **Price Calculation**: Dynamic pricing based on lesson type and duration
✅ **Focus Areas**: Select specific areas to work on
✅ **Instructor Profiles**: View instructor specialties and ratings

### 4. **Data Structure**

```typescript
interface Booking {
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
```

### 5. **Testing the System**

1. **Book a Lesson**:
   - Go to "Book Lesson" page
   - Complete all booking steps
   - Click "Confirm Booking"
   - You'll see a success message

2. **View Your Booking**:
   - Navigate to "My Lessons"
   - Your new booking will appear in "Upcoming Lessons"
   - Click on it to see full details including Zoom link

3. **Cancel a Booking**:
   - Click "Cancel Lesson" on any upcoming booking
   - Provide a cancellation reason
   - Confirm cancellation
   - Booking moves to past lessons with "cancelled" status

## Future Enhancements

- Email notifications for bookings
- Calendar sync (Google Calendar, Outlook)
- Recurring lesson bookings
- Instructor availability management
- Payment processing integration
- Lesson reminders
- Post-lesson feedback and ratings
