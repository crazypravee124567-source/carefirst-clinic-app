// Shared clinic constants, date utilities, and 30-minute slot generator

export const CLINIC_CONFIG = {
  currency: '₹',
  consultationFee: 750,
  formattedFee: '₹750',
  formattedFeeWithDecimals: '₹750.00',
  zeroFee: '₹0.00',
  phoneCountryCode: '+91',
  receptionPhoneDisplay: '+91 (080) 2345-CARE',
  receptionPhoneTel: '+918023452273',
  receptionPhoneShort: '(080) 2345-CARE',
  emergencyPhone: '+91 80 3824 4400',
  emergencyPhoneTel: '+918038244400',
  accreditationText: 'NABH Accredited • Confidential Patient Self-Service',
  securityText: 'NABH Standards & End-to-End Encrypted Reservation',
  doctorCertificationBadge: 'NMC Registered Specialist',
  defaultBookingCode: 'CF-84920713', // 8-digit secure reference code
  defaultPatientName: 'Alex Morgan',
  defaultPatientPhone: '+91 98765 43210',
  defaultPhoneLast4: '3210',
};

// Mask phone number to protect patient privacy after lookup
export function maskPhoneNumber(phone: string = CLINIC_CONFIG.defaultPatientPhone): string {
  // Strip non-digits except +
  const digits = phone.replace(/\D/g, '');
  if (digits.length >= 4) {
    const last4 = digits.slice(-4);
    return `+91 •••••• ${last4}`;
  }
  return '+91 •••••• 3210';
}

// Generate dynamic dates around current date to guarantee real-date past/future logic during testing
export interface ClinicDateOption {
  day: string;
  date: string;
  month: string;
  year: number;
  val: string;
  fullDate: string;
  status: string;
  tag: string;
  slots: string;
  disabled: boolean;
}

export function getDynamicDates(): {
  dates: ClinicDateOption[];
  currentMonthYear: string;
  todayVal: string;
  todayFull: string;
} {
  const now = new Date();
  const dayNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNamesFull = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dates: ClinicDateOption[] = [];
  const currentMonthYear = `${monthNamesFull[now.getMonth()]} ${now.getFullYear()}`;

  // 2 past days (disabled), today (active), and 3 upcoming days (active)
  const offsets = [-2, -1, 0, 1, 2, 3];
  const slotCounts = ['0 slots', '0 slots', '6 slots', '4 slots', '2 slots', '8 slots'];

  let todayVal = '';
  let todayFull = '';

  for (let i = 0; i < offsets.length; i++) {
    const offset = offsets[i];
    const d = new Date(now);
    d.setDate(now.getDate() + offset);

    const isPast = offset < 0;
    const isToday = offset === 0;

    const shortDay = dayNamesShort[d.getDay()];
    const fullDay = dayNamesFull[d.getDay()];
    const shortMonth = monthNamesShort[d.getMonth()];
    const dateNum = String(d.getDate()).padStart(2, '0');
    const val = `${shortDay.charAt(0) + shortDay.slice(1).toLowerCase()}, ${shortMonth} ${d.getDate()}`;
    const fullDate = `${fullDay}, ${shortMonth} ${d.getDate()}, ${d.getFullYear()}`;

    if (isToday) {
      todayVal = val;
      todayFull = fullDate;
    }

    dates.push({
      day: shortDay,
      date: dateNum,
      month: shortMonth,
      year: d.getFullYear(),
      val,
      fullDate,
      status: isPast ? 'Past' : '',
      tag: isToday ? 'TODAY' : '',
      slots: isPast ? 'Past' : slotCounts[i],
      disabled: isPast,
    });
  }

  return { dates, currentMonthYear, todayVal, todayFull };
}

// Fixed 30-minute slot generator
export interface TimeSlot {
  time: string;
  status: 'available' | 'booked';
}

export function generate30MinuteSlots(): {
  morningSlots: TimeSlot[];
  afternoonSlots: TimeSlot[];
  eveningSlots: TimeSlot[];
} {
  // Morning slots (9:00 AM to 12:00 PM) on a fixed 30-min grid
  const morningSlots: TimeSlot[] = [
    { time: '09:00 AM', status: 'available' },
    { time: '09:30 AM', status: 'booked' },
    { time: '10:00 AM', status: 'available' },
    { time: '10:30 AM', status: 'available' },
    { time: '11:00 AM', status: 'booked' },
    { time: '11:30 AM', status: 'available' },
  ];

  // Afternoon slots (12:00 PM to 4:00 PM) on a fixed 30-min grid
  const afternoonSlots: TimeSlot[] = [
    { time: '12:00 PM', status: 'available' },
    { time: '12:30 PM', status: 'booked' },
    { time: '01:00 PM', status: 'available' },
    { time: '01:30 PM', status: 'available' },
    { time: '02:00 PM', status: 'available' },
    { time: '02:30 PM', status: 'available' },
    { time: '03:00 PM', status: 'booked' },
    { time: '03:30 PM', status: 'available' },
  ];

  // Evening slots (4:00 PM to 7:00 PM) on a fixed 30-min grid
  const eveningSlots: TimeSlot[] = [
    { time: '04:00 PM', status: 'available' },
    { time: '04:30 PM', status: 'available' },
    { time: '05:00 PM', status: 'booked' },
    { time: '05:30 PM', status: 'available' },
    { time: '06:00 PM', status: 'available' },
    { time: '06:30 PM', status: 'available' },
  ];

  return { morningSlots, afternoonSlots, eveningSlots };
}
