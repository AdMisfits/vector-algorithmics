'use client';

import React, { useState, useEffect, useMemo } from 'react';
import './Calendar.css';

interface CustomCalendarProps {
  onSuccess?: () => void;
}

export default function CustomCalendar({ onSuccess }: CustomCalendarProps) {
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const [slotsData, setSlotsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch slots whenever the target month changes
  useEffect(() => {
    // We want to fetch slots for the current month and maybe next. 
    // GHL allows fetching a range.
    const startObj = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const endObj = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0);
    
    const startDate = startObj.getTime();
    const endDate = endObj.getTime();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';

    setIsLoading(true);
    fetch(`/api/calendar/slots?startDate=${startDate}&endDate=${endDate}&timezone=${tz}`)
      .then(r => r.json())
      .then(data => {
        setSlotsData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [targetDate.getMonth(), targetDate.getFullYear()]);

  // Extract available dates as a Set of strings "YYYY-MM-DD"
  const availableDates = useMemo(() => {
    if (!slotsData || !slotsData[Object.keys(slotsData)[0]] || !slotsData[Object.keys(slotsData)[0]].slots) return new Set<string>();
    
    // The GHL api structure varies slightly, but usually it returns:
    // { "calendarId": { "slots": { "2021-08-21": ["09:00", "09:30"], "2021-08-22": [...] } } }
    const calKey = Object.keys(slotsData)[0];
    const slotsObj = slotsData[calKey].slots;
    
    return new Set(Object.keys(slotsObj));
  }, [slotsData]);

  const handlePrevMonth = () => {
    setTargetDate(new Date(targetDate.getFullYear(), targetDate.getMonth() - 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleNextMonth = () => {
    setTargetDate(new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();

  const renderCalendarDays = () => {
    const cells = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < firstDay; i++) {
        cells.push(<div key={`empty-${i}`} className="date-cell empty"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(year, month, d);
        // Format YYYY-MM-DD for checking slots
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        
        const hasSlots = availableDates.has(dateStr);
        const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isSelected = selectedDate?.getDate() === d && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;

        cells.push(
            <button
                key={d}
                disabled={isPast || !hasSlots}
                className={`date-cell ${hasSlots ? 'has-slots' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => {
                    setSelectedDate(dateObj);
                    setSelectedSlot(null);
                }}
            >
                {d}
            </button>
        );
    }

    return cells;
  };

  const getSlotsForSelectedDate = () => {
    if (!selectedDate || !slotsData) return [];
    const calKey = Object.keys(slotsData)[0];
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    return slotsData[calKey]?.slots[dateStr] || [];
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedSlot) return;

    // Pull lead data from URL params as written by app.js (Virtual URL feature)
    const params = new URLSearchParams(window.location.search);
    const firstName = params.get('first_name') || params.get('name') || 'Guest';
    const lastName = params.get('last_name') || '';
    const email = params.get('email');
    const phone = params.get('phone');
    const fbp = params.get('fbp') || params.get('_fbp');
    const fbc = params.get('fbc') || params.get('_fbc');

    if (!email) {
      alert("Missing email. Please fill out the form first.");
      return;
    }

    setIsBooking(true);

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
    // slot is usually "09:00", we need it in "2021-08-21T09:00:00-04:00" format
    // Since we don't know the exact tz offset string natively without complex math, we'll construct the ISO and rely on the API.
    // GHL expects ISO string or ISO string with TZ. Let's send standard ISO 8601 with timezone offset or just the local string.
    
    // Format: YYYY-MM-DDTHH:mm:ssZ
    const [hours, minutes] = selectedSlot.split(':');
    const startTimeDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(hours), parseInt(minutes));
    
    // Best way to send is ISO string, and GHL converts based on location ID or if we send selectedTimezone
    const payload = {
        firstName,
        lastName,
        email,
        phone,
        startTime: startTimeDate.toISOString(), 
        customFields: { fbp, fbc }
    };

    try {
        const res = await fetch('/api/calendar/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (res.ok) {
            setIsSuccess(true);
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('smart_capture_booking_complete'));
            }
            if (onSuccess) onSuccess();
        } else {
            const err = await res.json();
            alert(`Error: ${err.error || 'Failed to book'}`);
        }
    } catch (e) {
        console.error(e);
        alert('An error occurred while booking.');
    } finally {
        setIsBooking(false);
    }
  };

  if (isSuccess) {
    return (
        <div className="calendar-root">
            <div className="success-state">
                <svg className="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Booking Confirmed!</h2>
                <p>A calendar invitation has been sent to your email address.</p>
            </div>
        </div>
    );
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const selectedSlots = getSlotsForSelectedDate();

  return (
    <div className="calendar-root">
      <div className="calendar-left">
        <div className="calendar-header">
            <div className="month-title">
                {monthNames[month]} {year}
            </div>
            <div className="nav-buttons">
                <button className="nav-button" onClick={handlePrevMonth} disabled={month === today.getMonth() && year === today.getFullYear()}>
                    &larr;
                </button>
                <button className="nav-button" onClick={handleNextMonth}>
                    &rarr;
                </button>
            </div>
        </div>
        
        <div className="days-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="day-name">{d}</div>
            ))}
        </div>
        <div className="dates-grid">
            {renderCalendarDays()}
        </div>
      </div>

      <div className="calendar-right">
        {selectedDate ? (
            <>
                <div className="slots-header">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                
                {isLoading ? (
                    <div className="loading-state">Loading slots...</div>
                ) : selectedSlots.length > 0 ? (
                    <div className="slots-list">
                        {selectedSlots.map((slot: string) => {
                            // Extract just the time if slot is an object with different formats (GHL sometimes returns complex strings depending on the config)
                            // Usually it's "09:00"
                            const isSelected = selectedSlot === slot;
                            
                            // Simple formatting for AM/PM
                            const [h, m] = slot.split(':');
                            const hours = parseInt(h);
                            const ampm = hours >= 12 ? 'PM' : 'AM';
                            const hours12 = hours % 12 || 12;
                            const timeLabel = `${hours12}:${m} ${ampm}`;

                            return (
                                <div key={slot} className={`slot-item ${isSelected ? 'selected' : ''}`}>
                                    <button 
                                        className="slot-button"
                                        onClick={() => setSelectedSlot(slot)}
                                    >
                                        {timeLabel}
                                    </button>
                                    {isSelected && (
                                        <button 
                                            className="confirm-button"
                                            onClick={handleBook}
                                            disabled={isBooking}
                                        >
                                            {isBooking ? 'Booking...' : 'Confirm'}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="empty-state">No available slots on this date.</div>
                )}
            </>
        ) : (
            <div className="empty-state" style={{ paddingTop: '50px' }}>
                <p>Select a date on the left to view available times.</p>
            </div>
        )}
      </div>
    </div>
  );
}
