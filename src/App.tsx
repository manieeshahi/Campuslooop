/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Users,
  Calendar,
  Gamepad2,
  Clock,
  Sparkles,
  BookOpen,
  Trophy,
  Check,
  ChevronRight,
  Flame,
  Zap,
  MapPin,
  Heart,
  MessageCircle,
  LogOut,
  Star,
  Search,
  Bell,
  Briefcase,
  Share2,
  ThumbsUp,
  Plus,
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  ShoppingCart,
  ShoppingBag,
  PlusCircle,
  Radio,
  TrendingUp,
  AlertCircle,
  Send,
  FileText,
  Bookmark,
  Award,
  Layers,
  GraduationCap,
  HelpCircle,
  ExternalLink,
  Code2,
  Cpu,
  CheckCircle2,
  X,
  Bot,
  CalendarDays,
  PenTool,
  RotateCcw,
  BookMarked,
  FlipHorizontal,
  Lightbulb,
  CreditCard,
  CheckSquare,
  Square,
  ArrowRight,
  UserCheck,
  Gift,
  Ticket,
  Tag,
  Copy,
  Coffee,
  Play,
  Pause,
  ShieldCheck,
  User,
  Compass,
  Settings,
  UserX,
  Edit3,
  Sliders,
  Sun,
  Moon,
} from 'lucide-react';

import clayStudent from './assets/images/clay_student_character_1793285125927.jpg';
import clayBobaStudy from './assets/images/clay_study_boba_1793285143665.jpg';
import trophyMascot from './assets/images/cartoon_quiz_trophy_1793284658081.jpg';
import campusSunsetBg from './assets/images/campus_students_dusk_1793294179785.jpg';

// Core Navigation Hubs
type MainHub = 'study' | 'notes' | 'tutors' | 'feed' | 'community' | 'profile';

// Sub-views
type StudySubView = 'rooms' | 'matcher' | 'streak_timer';
type NotesSubView = 'library' | 'buy_sell' | 'issue_books';
type TutorsSubView = 'browse' | 'become_tutor' | 'wallet';
type CommunitySubView = 'doubts' | 'hack_teams' | 'quiz';

interface UsedBook {
  id: string;
  title: string;
  author: string;
  subject: SubjectType;
  price: number;
  originalPrice: number;
  condition: 'Like New' | 'Good' | 'Highlighted';
  sellerName: string;
  sellerYear: string;
  sellerContact: string;
  imageEmoji: string;
}

interface LibraryBook {
  id: string;
  title: string;
  author: string;
  subject: SubjectType;
  availableCopies: number;
  totalCopies: number;
  shelfLocation: string;
  edition: string;
  isIssued?: boolean;
}

type SubjectType = 'DSA' | 'Java' | 'OS' | 'DBMS' | 'AI' | 'Flutter';
type MoodType = 'focus' | 'together' | 'advice';
type SlotType = 30 | 45 | 60;
type YearType = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

// Interfaces
interface Peer {
  id: string;
  n: string;
  username: string;
  avatarSrc?: string;
  avatarEmoji: string;
  avatarBg: string;
  college: string;
  branch: string;
  year: YearType;
  activity: string;
  bio: string;
  sk: string[];
  m: MoodType[];
  f: SlotType[];
  color: string;
  quote: string;
  rating: number;
  likesCount: number;
  isLiked?: boolean;
  isConnected?: boolean;
  leetcodeId?: string;
  leetcodeSolved?: number;
  leetcodeRating?: number;
  leetcodeRank?: string;
  vouchers?: { name: string; brand: 'starbucks' | 'pw' | 'epson' | 'notion'; code: string; discount: string }[];
  vouchersCount?: number;
  buddiesList?: { name: string; college: string; branch: string }[];
  activeStory?: {
    topic: string;
    timeLeft: string;
    statusBadge: string;
  };
  s?: number;
  why?: string[];
}

interface Tutor {
  id: string;
  name: string;
  avatarSrc?: string;
  avatarEmoji: string;
  year: string;
  specialty: SubjectType[];
  rating: number;
  reviewsCount: number;
  sessionsCompleted: number;
  hourlyPoints: number;
  badge: string;
  bio: string;
  availableSlots: string[];
}

interface NoteItem {
  id: string;
  title: string;
  subject: SubjectType;
  author: string;
  authorYear: string;
  rating: number;
  reviews: number;
  downloads: number;
  pages: number;
  summary: string[];
  formulas: string[];
  flashcards: { q: string; a: string }[];
}

interface PlannedDay {
  day: string;
  subject: SubjectType;
  topic: string;
  duration: string;
  completed: boolean;
  type: 'concept' | 'problems' | 'revision';
}

interface CommunityPost {
  id: string;
  author: string;
  authorYear: string;
  avatarEmoji: string;
  subject: SubjectType;
  title: string;
  desc: string;
  upvotes: number;
  hasUpvoted?: boolean;
  replies: {
    author: string;
    text: string;
    isVerifiedHelpful?: boolean;
    time: string;
  }[];
  resourceTitle?: string;
  time: string;
}

interface CampusEvent {
  id: number;
  t: string;
  title: string;
  where: string;
  going: number;
  tag: 'Hackathon' | 'Workshop' | 'Internship' | 'Deadline' | 'Contest';
  eligibility: string;
  organizer: string;
  logoType?: 'sih' | 'tcs' | 'google' | 'flipkart' | 'codesprint' | 'workshop' | 'contest' | 'acm';
  prizePool?: string;
  deadline?: string;
  tagBg: string;
  tagColor: string;
}

interface MeetingRoom {
  id: string;
  name: string;
  subject: SubjectType;
  code: string;
  time: string;
  duration: string;
  topic: string;
  tutor?: {
    name: string;
    role: string;
    avatarEmoji: string;
    rating: number;
  };
  mutualBuddies: {
    name: string;
    avatarEmoji: string;
    avatarBg: string;
  }[];
  participantsCount: number;
  maxParticipants: number;
  isLive: boolean;
}

interface ProjectTeam {
  id: string;
  hackathonName: string;
  logoType: 'sih' | 'tcs' | 'google' | 'flipkart';
  title: string;
  event: string;
  desc: string;
  creator: string;
  creatorYear: string;
  membersCount: number;
  maxMembers: number;
  eligibility: string;
  location: string;
  prizePool: string;
  deadline: string;
  rolesNeeded: string[];
  appliedRoles?: string[];
  applied?: boolean;
}

function HackathonLogo({ type }: { type: 'sih' | 'tcs' | 'google' | 'flipkart' | 'codesprint' | 'workshop' | 'contest' | 'acm' }) {
  if (type === 'tcs') {
    return (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#134074] p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center text-white shrink-0">
        <span className="text-[11px] font-black tracking-widest text-white leading-none">TCS</span>
        <span className="text-[9px] font-extrabold text-sky-300 leading-none mt-0.5">iON</span>
      </div>
    );
  }
  if (type === 'sih') {
    return (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF9933] via-white to-[#138808] p-0.5 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center shrink-0">
        <div className="w-full h-full bg-[#190019]/90 rounded-[14px] flex flex-col items-center justify-center text-white p-0.5">
          <span className="text-[10px] font-black text-amber-300 leading-none">SIH</span>
          <span className="text-[8px] font-bold text-white leading-none mt-0.5">2026</span>
        </div>
      </div>
    );
  }
  if (type === 'google') {
    return (
      <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center shrink-0">
        <div className="flex items-center gap-0.5">
          <span className="text-xs font-black text-[#4285F4]">G</span>
          <span className="text-xs font-black text-[#EA4335]">D</span>
          <span className="text-xs font-black text-[#FBBC05]">S</span>
          <span className="text-xs font-black text-[#34A853]">C</span>
        </div>
        <span className="text-[8px] font-black text-[#522B5B] uppercase leading-none mt-0.5">Solutions</span>
      </div>
    );
  }
  if (type === 'flipkart') {
    return (
      <div className="w-12 h-12 rounded-2xl bg-[#2874F0] p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center text-white shrink-0">
        <span className="text-[10px] font-black text-[#FFE500] leading-none">Flipkart</span>
        <span className="text-[8px] font-extrabold text-white leading-none mt-0.5">GRiD 7.0</span>
      </div>
    );
  }
  if (type === 'workshop') {
    return (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center text-white shrink-0">
        <Sparkles className="w-5 h-5 text-emerald-200" />
        <span className="text-[7.5px] font-black uppercase text-white leading-none mt-0.5">WORKSHOP</span>
      </div>
    );
  }
  if (type === 'contest') {
    return (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-900 p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center text-white shrink-0">
        <Trophy className="w-5 h-5 text-amber-300" />
        <span className="text-[7.5px] font-black uppercase text-amber-200 leading-none mt-0.5">CF DUEL</span>
      </div>
    );
  }
  if (type === 'acm') {
    return (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-700 to-red-900 p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center text-white shrink-0">
        <Code2 className="w-5 h-5 text-white" />
        <span className="text-[7.5px] font-black uppercase text-white leading-none mt-0.5">ICPC</span>
      </div>
    );
  }
  return (
    <div className="w-12 h-12 rounded-2xl bg-[#522B5B] p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center text-white shrink-0">
      <Code2 className="w-5 h-5 text-[#DFB6B2]" />
      <span className="text-[8px] font-black text-white leading-none mt-0.5">CODE</span>
    </div>
  );
}

interface StudyVoucher {
  id: string;
  title: string;
  category: 'food' | 'books' | 'tech' | 'stationery';
  partner: string;
  discount: string;
  sparksCost: number;
  promoCode: string;
  description: string;
  iconEmoji: string;
  logoBrand?: 'spotify' | 'epson' | 'pw' | 'starbucks' | 'notion' | 'canteen' | 'books';
  badge?: string;
  validity: string;
  claimed?: boolean;
}

function VoucherBrandLogo({ brand, emoji }: { brand?: string; emoji: string }) {
  if (brand === 'spotify') {
    return (
      <div className="w-11 h-11 rounded-2xl bg-[#1DB954] p-1.5 shadow-md border-2 border-white flex items-center justify-center shrink-0">
        <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </div>
    );
  }
  if (brand === 'epson') {
    return (
      <div className="w-11 h-11 rounded-2xl bg-[#003399] p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white shrink-0">
        <span className="text-[10px] font-black tracking-wider leading-none">EPSON</span>
        <span className="text-[7px] font-extrabold text-sky-200 leading-none mt-0.5">EcoPrint</span>
      </div>
    );
  }
  if (brand === 'pw') {
    return (
      <div className="w-11 h-11 rounded-2xl bg-[#111111] p-1 shadow-md border-2 border-[#DFB6B2] flex flex-col items-center justify-center shrink-0">
        <div className="flex items-center gap-0.5">
          <span className="text-sm font-black text-white leading-none">P</span>
          <span className="text-sm font-black text-[#FF3E3E] leading-none">W</span>
        </div>
        <span className="text-[7px] font-black text-amber-300 uppercase leading-none mt-0.5">Campus</span>
      </div>
    );
  }
  if (brand === 'starbucks') {
    return (
      <div className="w-11 h-11 rounded-2xl bg-[#00704A] p-1 shadow-md border-2 border-white flex flex-col items-center justify-center text-white shrink-0">
        <span className="text-xs">⭐</span>
        <span className="text-[7px] font-black tracking-tighter leading-none mt-0.5 text-white">STARBUCKS</span>
      </div>
    );
  }
  if (brand === 'notion') {
    return (
      <div className="w-11 h-11 rounded-2xl bg-white p-1 shadow-md border-2 border-slate-300 flex flex-col items-center justify-center shrink-0">
        <span className="text-sm font-black text-black">N</span>
        <span className="text-[7px] font-black text-slate-500 uppercase leading-none">Notion</span>
      </div>
    );
  }
  return (
    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FBE4D8] to-[#DFB6B2] flex items-center justify-center text-xl shrink-0 shadow-sm border border-white">
      {emoji}
    </div>
  );
}

const SUBJECTS: SubjectType[] = ['DSA', 'Java', 'OS', 'DBMS', 'AI', 'Flutter'];

const MOODS: { id: MoodType; label: string; emoji: string }[] = [
  { id: 'focus', label: 'Deep Focus', emoji: '🎧' },
  { id: 'together', label: 'Study Together', emoji: '🤝' },
  { id: 'advice', label: 'Need Advice', emoji: '💡' },
];

const CARTOON_AVATARS = [
  { id: 'clay_mascot', name: 'Clay Mascot 3D', src: '/assets/aistudio/image_bfa36e2d.png', emoji: '🦊' },
  { id: 'clay_student', name: 'Clay Student', src: clayStudent, emoji: '🎓' },
  { id: 'bunny_reader', name: 'Study Bunny', src: '/assets/aistudio/image_1a4f2b80.png', emoji: '🐰' },
  { id: 'boba_study', name: 'Boba Learner', src: clayBobaStudy, emoji: '🧋' },
  { id: 'trophy_mascot', name: 'Quiz Trophy', src: trophyMascot, emoji: '🏆' },
];

const PEERS: Peer[] = [
  {
    id: 'p1',
    n: 'Riya Sharma',
    username: '@riya_codes',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '🌸',
    avatarBg: 'bg-rose-100',
    college: 'Delhi Technological University (DTU)',
    branch: '3rd Year · Computer Science & Eng.',
    year: '3rd Year',
    activity: '🔥 In Central Library: Practicing Graph BFS/DFS & Dynamic Programming',
    bio: 'DTU CSE \'27 | Solved 450+ LeetCode problems | Smart India Hackathon finalist | Looking for a study buddy for Trees & Java backend prep! 🌸',
    sk: ['DSA', 'Java', 'OS'],
    m: ['together', 'advice'],
    f: [30, 45, 60],
    color: '#DFB6B2',
    quote: 'Solving Trees & Graphs on LeetCode today!',
    rating: 4.9,
    likesCount: 184,
    isConnected: true,
    leetcodeId: 'riya_codes_dtu',
    leetcodeSolved: 485,
    leetcodeRating: 1942,
    leetcodeRank: 'Top 3.6%',
    vouchers: [
      { name: 'Starbucks 20% Off', brand: 'starbucks', code: 'RIYA-SB20', discount: '20% Off Handcrafted Brews' },
      { name: 'Notion Plus Free 6 Mo', brand: 'notion', code: 'RIYA-NOTION6', discount: 'Free Student Workspace' },
      { name: 'PhysicsWallah Campus Pass', brand: 'pw', code: 'RIYA-PW500', discount: '₹500 Discount on Placements' },
    ],
    buddiesList: [
      { name: 'Rahul Sharma', college: 'DTU', branch: '3rd Year · CSE' },
      { name: 'Kabir Verma', college: 'NSUT', branch: '4th Year · ECE' },
      { name: 'Aarav Patel', college: 'BITS Goa', branch: '2nd Year · IT' },
    ],
    activeStory: {
      topic: 'Practicing LeetCode Hard Trees',
      timeLeft: '2h left',
      statusBadge: 'Library 📚',
    },
  },
  {
    id: 'p2',
    n: 'Aarav Patel',
    username: '@aarav.dev',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '🌿',
    avatarBg: 'bg-emerald-100',
    college: 'BITS Pilani, Goa Campus',
    branch: '2nd Year · Information Technology',
    year: '2nd Year',
    activity: '🚀 Building Flutter E-Commerce UI & Riverpod State Management',
    bio: 'BITS Goa \'28 | Flutter & Firebase enthusiast | TCS-iON Hackathon contestant | Free for 45 min peer code review and mock battles! 🌿',
    sk: ['Flutter', 'DBMS', 'Java'],
    m: ['focus', 'together'],
    f: [30, 45],
    color: '#D1E7DD',
    quote: 'Flutter State Management & SQLite caching.',
    rating: 4.8,
    likesCount: 142,
    isConnected: true,
    leetcodeId: 'aarav_flutter_goa',
    leetcodeSolved: 340,
    leetcodeRating: 1720,
    leetcodeRank: 'Top 8.4%',
    vouchers: [
      { name: 'Epson EcoPrint 50 Free Pages', brand: 'epson', code: 'AARAV-EPSON50', discount: '50 High-Yield Prints' },
      { name: 'Starbucks 20% Off', brand: 'starbucks', code: 'AARAV-SB20', discount: '20% Off Cold Coffee' },
    ],
    buddiesList: [
      { name: 'Rahul Sharma', college: 'DTU', branch: '3rd Year · CSE' },
      { name: 'Meera Sen', college: 'IIT Roorkee', branch: '3rd Year · AI' },
    ],
    activeStory: {
      topic: 'Debugging Riverpod state cache',
      timeLeft: '45m left',
      statusBadge: 'Hostel Lab 💻',
    },
  },
  {
    id: 'p3',
    n: 'Meera Sen',
    username: '@meera_ai',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '🪴',
    avatarBg: 'bg-amber-100',
    college: 'IIT Roorkee',
    branch: '3rd Year · AI & Data Science',
    year: '3rd Year',
    activity: '🧠 Training PyTorch Transformer model & SQL query optimization',
    bio: 'IITR \'27 | Kaggle Master & AI researcher | Working on crop diagnosis with Gemini API | Let\'s crack semester exams together! 🪴',
    sk: ['AI', 'DBMS', 'DSA'],
    m: ['advice'],
    f: [45, 60],
    color: '#F8D7DA',
    quote: 'PyTorch model training & SQL optimization.',
    rating: 5.0,
    likesCount: 219,
    leetcodeId: 'meera_ai_iitr',
    leetcodeSolved: 512,
    leetcodeRating: 2110,
    leetcodeRank: 'Knight · Top 1.8%',
    vouchers: [
      { name: 'Notion Plus Free 6 Mo', brand: 'notion', code: 'MEERA-NOTION', discount: 'Free Student Workspace' },
      { name: 'PW Campus Pass', brand: 'pw', code: 'MEERA-PW500', discount: '₹500 Discount on AI Modules' },
      { name: 'Epson EcoPrint 50 Free Pages', brand: 'epson', code: 'MEERA-EPSON', discount: '50 Free Printouts' },
    ],
    buddiesList: [
      { name: 'Rahul Sharma', college: 'DTU', branch: '3rd Year · CSE' },
      { name: 'Aarav Patel', college: 'BITS Goa', branch: '2nd Year · IT' },
    ],
    activeStory: {
      topic: 'Fine-tuning LoRA weights in lab',
      timeLeft: '1h left',
      statusBadge: 'AI Lab 🧠',
    },
  },
  {
    id: 'p4',
    n: 'Kabir Verma',
    username: '@kabir_os',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '⚡',
    avatarBg: 'bg-sky-100',
    college: 'Netaji Subhas Univ. of Tech (NSUT)',
    branch: '4th Year · Electronics & Comm.',
    year: '4th Year',
    activity: '⚡ Grinding OS CPU Scheduling, Deadlocks & Concurrency sem prep',
    bio: 'NSUT \'26 | Core Systems & Embedded C++ geek | 9.1 CGPA | Peer Tutor on CampusLoop | DM for OS & Hardware doubt solving! ⚡',
    sk: ['OS', 'DSA', 'Java'],
    m: ['focus'],
    f: [60],
    color: '#FFF3CD',
    quote: 'Concurrency, deadlocks & memory management.',
    rating: 4.9,
    likesCount: 198,
    isConnected: true,
    leetcodeId: 'kabir_os_nsut',
    leetcodeSolved: 440,
    leetcodeRating: 1890,
    leetcodeRank: 'Top 4.2%',
    vouchers: [
      { name: 'PhysicsWallah Campus Pass', brand: 'pw', code: 'KABIR-PW500', discount: '₹500 Discount on Core Prep' },
      { name: 'Starbucks 20% Off', brand: 'starbucks', code: 'KABIR-SB20', discount: '20% Off Cold Brew' },
    ],
    buddiesList: [
      { name: 'Rahul Sharma', college: 'DTU', branch: '3rd Year · CSE' },
      { name: 'Riya Sharma', college: 'DTU', branch: '3rd Year · CSE' },
    ],
    activeStory: {
      topic: 'Explaining Banker\'s Algorithm on Pod',
      timeLeft: '30m left',
      statusBadge: 'Study Pod 🎧',
    },
  },
  {
    id: 'p5',
    n: 'Tanya Joshi',
    username: '@tanya.ui',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '✨',
    avatarBg: 'bg-purple-100',
    college: 'IIT Delhi',
    branch: '3rd Year · Design & Computing',
    year: '3rd Year',
    activity: '🎨 Designing Figma 3D Clay Prototypes & Flipkart GRiD wireframes',
    bio: 'IITD \'27 | UI/UX Designer & Frontend Dev | Loves Claymorphic aesthetics | Seeking a backend partner for college hackathons! ✨',
    sk: ['Flutter', 'AI', 'DSA'],
    m: ['together'],
    f: [30, 45],
    color: '#E2D9F3',
    quote: 'Figma Claymorphism & Interaction Design.',
    rating: 4.9,
    likesCount: 165,
    leetcodeId: 'tanya_ui_iitd',
    leetcodeSolved: 290,
    leetcodeRating: 1650,
    leetcodeRank: 'Top 11.2%',
    vouchers: [
      { name: 'Notion Plus Free 6 Mo', brand: 'notion', code: 'TANYA-NOTION', discount: 'Free Student Workspace' },
      { name: 'Starbucks 20% Off', brand: 'starbucks', code: 'TANYA-SB20', discount: '20% Off Caramel Macchiato' },
    ],
    buddiesList: [
      { name: 'Rahul Sharma', college: 'DTU', branch: '3rd Year · CSE' },
      { name: 'Meera Sen', college: 'IIT Roorkee', branch: '3rd Year · AI' },
    ],
    activeStory: {
      topic: 'Working on hackathon presentation deck',
      timeLeft: '3h left',
      statusBadge: 'Cafeteria ☕',
    },
  },
];

const TUTORS: Tutor[] = [
  {
    id: 'tut1',
    name: 'Riya Sharma',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '🌸',
    year: '3rd Year CSE',
    specialty: ['DSA', 'Java'],
    rating: 4.9,
    reviewsCount: 38,
    sessionsCompleted: 45,
    hourlyPoints: 50,
    badge: 'Gold DSA Mentor',
    bio: 'Solved 450+ LeetCode problems. Specialized in Binary Search, Graphs & DP.',
    availableSlots: ['Today 5:00 PM', 'Tomorrow 6:30 PM', 'Sunday 11:00 AM'],
  },
  {
    id: 'tut2',
    name: 'Kabir Verma',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '⚡',
    year: '4th Year ECE',
    specialty: ['OS', 'DSA'],
    rating: 5.0,
    reviewsCount: 29,
    sessionsCompleted: 32,
    hourlyPoints: 45,
    badge: 'System Systems Pro',
    bio: 'Scored A+ in Operating Systems. Master of Paging, Semaphores & CPU Scheduling.',
    availableSlots: ['Today 7:00 PM', 'Saturday 4:00 PM'],
  },
  {
    id: 'tut3',
    name: 'Aarav Patel',
    avatarSrc: '/assets/aistudio/image_1310e48c.png',
    avatarEmoji: '🌿',
    year: '2nd Year IT',
    specialty: ['Flutter', 'DBMS'],
    rating: 4.8,
    reviewsCount: 22,
    sessionsCompleted: 26,
    hourlyPoints: 40,
    badge: 'App Development Lead',
    bio: 'Built 4 production Flutter apps. Great at SQL Normalization & Schema Design.',
    availableSlots: ['Tomorrow 4:00 PM', 'Sunday 2:00 PM'],
  },
];

const NOTES_LIBRARY: NoteItem[] = [
  {
    id: 'n1',
    title: 'Complete DSA Visual Handwritten Notes',
    subject: 'DSA',
    author: 'Riya Sharma',
    authorYear: '3rd Year',
    rating: 4.9,
    reviews: 64,
    downloads: 380,
    pages: 42,
    summary: [
      'Comprehensive coverage of Arrays, Two-Pointer, Sliding Window & Binary Search.',
      'Step-by-step visual diagrams for Tree Traversals (Inorder, Preorder, Level-Order).',
      'Dynamic Programming 0/1 Knapsack patterns with memoization vs tabulation tables.',
    ],
    formulas: [
      'Binary Search: mid = low + (high - low) / 2',
      'Tree Height: 1 + max(height(left), height(right))',
      'QuickSort Average Time: O(n log n), Worst: O(n²)',
    ],
    flashcards: [
      {
        q: 'What is the worst-case time complexity of QuickSort?',
        a: 'O(n²), occurring when the chosen pivot is always the smallest or largest element.',
      },
      {
        q: 'What data structure is used for Breadth-First Search (BFS)?',
        a: 'A Queue (FIFO) is used to visit vertices level by level.',
      },
      {
        q: 'How does an AVL Tree maintain balance?',
        a: 'By tracking Balance Factor = Height(Left) - Height(Right), keeping it within {-1, 0, 1} using LL, RR, LR, RL rotations.',
      },
    ],
  },
  {
    id: 'n2',
    title: 'Operating Systems End-Sem Master Cheat Sheet',
    subject: 'OS',
    author: 'Kabir Verma',
    authorYear: '4th Year',
    rating: 5.0,
    reviews: 48,
    downloads: 410,
    pages: 28,
    summary: [
      'CPU Scheduling Algorithms with Gantt charts: FCFS, SJF, Round Robin & Priority.',
      'Banker’s Algorithm for Deadlock Avoidance with Safety Matrix determination.',
      'Virtual Memory: Page Fault calculation for FIFO, LRU, and Optimal Page Replacement.',
    ],
    formulas: [
      'Turnaround Time = Completion Time - Arrival Time',
      'Waiting Time = Turnaround Time - Burst Time',
      'Need Matrix = Max Demand - Allocation',
    ],
    flashcards: [
      {
        q: 'What are the 4 Coffman conditions for a deadlock?',
        a: '1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.',
      },
      {
        q: 'What is Belady’s Anomaly in Paging?',
        a: 'The phenomenon where increasing the number of page frames results in more page faults (seen in FIFO replacement).',
      },
      {
        q: 'What is the purpose of the Translation Lookaside Buffer (TLB)?',
        a: 'A high-speed hardware cache for fast virtual-to-physical address translation.',
      },
    ],
  },
  {
    id: 'n3',
    title: 'Java OOP & Spring Boot JPA Architecture',
    subject: 'Java',
    author: 'Aarav Patel',
    authorYear: '2nd Year',
    rating: 4.8,
    reviews: 35,
    downloads: 290,
    pages: 35,
    summary: [
      'Core OOP Principles (Encapsulation, Inheritance, Polymorphism, Abstraction) with real-world examples.',
      'Collections Framework: ArrayList vs LinkedList, HashMap internal collision buckets.',
      'Spring Boot JPA: Resolving N+1 queries with @EntityGraph and JOIN FETCH.',
    ],
    formulas: [
      'HashMap Load Factor: default 0.75 threshold',
      'Java Memory: Stack (Primitives & References) vs Heap (Objects)',
      'Concurrency: ConcurrentHashMap uses synchronized bin buckets',
    ],
    flashcards: [
      {
        q: 'Why is String immutable in Java?',
        a: 'For Security, Thread Safety, String Pool caching efficiency, and HashMap key reliability.',
      },
      {
        q: 'How does HashMap handle hash collisions in Java 8+?',
        a: 'Uses linked list chains, converting to balanced Red-Black Trees when bucket size exceeds 8 (TREEIFY_THRESHOLD).',
      },
      {
        q: 'What is the difference between Comparable and Comparator?',
        a: 'Comparable provides natural single-order sorting (compareTo), while Comparator allows multiple custom sort strategies (compare).',
      },
    ],
  },
];

const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: 1,
    t: 'Nov 15 · Online Round',
    title: 'TCS-iON Hackathon: Digital Ninja Challenge',
    where: 'Online Phase + TCS Siruseri Grand Finale',
    going: 240,
    tag: 'Hackathon',
    eligibility: 'B.Tech / BE Students (2nd, 3rd & 4th Year) · All Branches',
    organizer: 'Tata Consultancy Services & TCS-iON',
    logoType: 'tcs',
    prizePool: '₹5,00,000 + Fast-Track Digital Ninja Interview',
    deadline: 'Registration closes Nov 15, 2026',
    tagBg: 'bg-[#0B2545]/10',
    tagColor: 'text-[#0B2545]',
  },
  {
    id: 2,
    t: 'Nov 30 · Grand Finale',
    title: 'Smart India Hackathon 2026 (SIH)',
    where: 'AICTE Nodal Centers & Hybrid Finals',
    going: 380,
    tag: 'Hackathon',
    eligibility: 'All Engineering Batches (Team of 6 with 1+ Female Member)',
    organizer: 'Ministry of Education & AICTE',
    logoType: 'sih',
    prizePool: '₹1,00,000 per Problem Statement',
    deadline: 'Idea Submission closes Nov 30, 2026',
    tagBg: 'bg-orange-50',
    tagColor: 'text-orange-700',
  },
  {
    id: 3,
    t: 'Dec 15 · Global Showcase',
    title: 'Google Solution Challenge 2026',
    where: 'Virtual Showcase + Google Campus Live Demo',
    going: 195,
    tag: 'Hackathon',
    eligibility: 'Open to All Students with GDSC Membership',
    organizer: 'Google Developer Student Clubs',
    logoType: 'google',
    prizePool: '$4,000 per Member + Google Engineer Mentorship',
    deadline: 'Project Submission closes Dec 15, 2026',
    tagBg: 'bg-blue-50',
    tagColor: 'text-blue-700',
  },
  {
    id: 4,
    t: 'Nov 20 · Round 1 Live',
    title: 'Flipkart GRiD 7.0 - E-Commerce Tech & Robotics',
    where: 'Online Rounds + Flipkart HQ Bengaluru Finale',
    going: 310,
    tag: 'Hackathon',
    eligibility: 'Engineering Batches 2026, 2027 & 2028 (B.Tech / B.E. / M.Tech)',
    organizer: 'Flipkart Campus Talent Team',
    logoType: 'flipkart',
    prizePool: '₹5,25,000 + PPI for SDE-1 / SDE-2 (CTC ₹32 LPA)',
    deadline: 'Registrations close Nov 20, 2026',
    tagBg: 'bg-sky-50',
    tagColor: 'text-sky-800',
  },
  {
    id: 5,
    t: 'Nov 22 · Hands-on Lab',
    title: 'Generative AI & LLMs: Building RAG Agents Masterclass',
    where: 'Auditorium 2 + Live Streamed Discord Lab',
    going: 315,
    tag: 'Workshop',
    eligibility: 'Open to all Engineering Students (Bring Laptops)',
    organizer: 'Google Developer Student Clubs & Campus AI Wing',
    logoType: 'workshop',
    prizePool: 'Free $100 Cloud API Credits + Verifiable Credential',
    deadline: 'Limited to 60 In-Person Seats',
    tagBg: 'bg-emerald-50',
    tagColor: 'text-emerald-800',
  },
  {
    id: 6,
    t: 'Nov 28 · 3 Hours Sprint',
    title: 'CodeForces Intra-College Winter Sprint 2026',
    where: 'Central Computer Center Labs 1 & 2',
    going: 420,
    tag: 'Contest',
    eligibility: '1st to 4th Year Individual Coders (All Branches)',
    organizer: 'Competitive Programming Society DTU',
    logoType: 'contest',
    prizePool: '₹35,000 Cash Pool + Top 10 Swag Kits & Hoodies',
    deadline: 'Rated Contest · Closes Nov 27, 2026',
    tagBg: 'bg-purple-50',
    tagColor: 'text-purple-800',
  },
  {
    id: 7,
    t: 'Dec 05 · Weekend Intensive',
    title: 'Full-Stack System Design & Distributed Microservices',
    where: 'Seminar Hall B + High-Throughput GitHub Lab',
    going: 265,
    tag: 'Workshop',
    eligibility: '2nd, 3rd & 4th Year CS/IT/ECE Students',
    organizer: 'CampusLoop Alumni Tech Leaders',
    logoType: 'workshop',
    prizePool: 'Architect Certificate + Senior Mock Interview Slot',
    deadline: 'Registrations close Dec 03, 2026',
    tagBg: 'bg-amber-50',
    tagColor: 'text-amber-800',
  },
  {
    id: 8,
    t: 'Dec 12 · 5 Hours Duel',
    title: 'ACM-ICPC Regional Mock Qualifier Duel',
    where: 'Online on HackerRank & CodeChef Portal',
    going: 350,
    tag: 'Contest',
    eligibility: 'Teams of 3 registered college students',
    organizer: 'ACM Student Chapter & Algorithms Club',
    logoType: 'acm',
    prizePool: '₹50,000 Travel Sponsorship to ICPC Regional Finals',
    deadline: 'Team Registration closes Dec 10, 2026',
    tagBg: 'bg-rose-50',
    tagColor: 'text-rose-800',
  },
];

const INITIAL_TEAMS: ProjectTeam[] = [
  {
    id: 't_tcs',
    hackathonName: 'TCS-iON Hackathon',
    logoType: 'tcs',
    title: 'CloudVault: Secure FinTech Microservices & Fraud AI',
    event: 'TCS-iON HACKATHON',
    desc: 'Developing an AI-driven real-time UPI transaction fraud detection engine with sub-10ms response time using Apache Kafka and Spring Boot.',
    creator: 'Aditya Nair (3rd Year)',
    creatorYear: '3rd Year CSE',
    membersCount: 2,
    maxMembers: 4,
    eligibility: 'B.Tech / BE Students (2nd, 3rd & 4th Year) · All Branches',
    location: 'Phase 1: Online · Grand Finale: TCS Siruseri / Regional Hub',
    prizePool: '₹5,00,000 Prize Pool + Fast-Track Digital Ninja Interview',
    deadline: 'Nov 15, 2026',
    rolesNeeded: ['Spring Boot Backend', 'Python / ML Dev', 'React UI Specialist'],
  },
  {
    id: 't_sih',
    hackathonName: 'Smart India Hackathon 2026 (SIH)',
    logoType: 'sih',
    title: 'EduSphere: AI-Powered Adaptive Tutor',
    event: 'SMART INDIA HACKATHON 2026',
    desc: 'Building an interactive AI platform that transforms lecture slides into interactive quizzes, concept flashcards, and student study pods.',
    creator: 'Rohan Gupta (3rd Year)',
    creatorYear: '3rd Year CSE',
    membersCount: 2,
    maxMembers: 4,
    eligibility: 'All AICTE Approved Batches (Team of 6 with 1+ Female Member)',
    location: 'Nodal Centers Across India (Hybrid Finals)',
    prizePool: '₹1,00,000 per Problem Statement by Ministry of Education',
    deadline: 'Idea Submission: Nov 30, 2026',
    rolesNeeded: ['Java Backend', 'Flutter Frontend', 'UI/UX Designer'],
  },
  {
    id: 't_google',
    hackathonName: 'Google Solution Challenge 2026',
    logoType: 'google',
    title: 'AgroSense: AI Crop Disease & Local Weather Advisory',
    event: 'GOOGLE SOLUTION CHALLENGE',
    desc: 'Mobile-first computer vision model running on Gemini Nano + Flutter for offline crop leaf infection diagnosis for rural farmers.',
    creator: 'Ananya Sharma (3rd Year)',
    creatorYear: '3rd Year IT',
    membersCount: 3,
    maxMembers: 4,
    eligibility: 'College Students with Google Developer Student Club Membership',
    location: 'Global Virtual Showcase + Google Campus Live Demo',
    prizePool: '$4,000 per Team Member + Mentorship by Google Engineers',
    deadline: 'Project Submission: Dec 15, 2026',
    rolesNeeded: ['TensorFlow / Gemini API', 'Flutter Dev'],
  },
  {
    id: 't_flipkart',
    hackathonName: 'Flipkart GRiD 7.0 - E-Commerce Tech',
    logoType: 'flipkart',
    title: 'WarehouseFlow: Autonomous AMR Path Optimization',
    event: 'FLIPKART GRID 7.0',
    desc: 'Simulating fleet coordination of 50+ automated mobile robots in high-density fulfillment centers using multi-agent reinforcement learning.',
    creator: 'Vikram Rao (4th Year)',
    creatorYear: '4th Year ECE',
    membersCount: 2,
    maxMembers: 3,
    eligibility: 'Engineering Batches 2026, 2027 & 2028 (B.Tech / B.E. / M.Tech)',
    location: 'Round 1-3 Online · National Grand Finale at Flipkart HQ Bengaluru',
    prizePool: '₹5,25,000 + PPI for SDE-1 / SDE-2 (CTC ₹32 LPA)',
    deadline: 'Registrations close Nov 20, 2026',
    rolesNeeded: ['Python / ROS Dev', 'Algorithms / C++ Dev'],
  },
];

const INITIAL_COMMUNITY: CommunityPost[] = [
  {
    id: 'c1',
    author: 'Devansh Roy',
    authorYear: '2nd Year CSE',
    avatarEmoji: '⚡',
    subject: 'DSA',
    title: 'Intuitive way to handle Red-Black Tree deletion double-black case?',
    desc: 'I keep getting confused between Case 2 (sibling is black with black children) and Case 3 (sibling has red child). Need a clean mental model.',
    upvotes: 24,
    time: '2 hours ago',
    replies: [
      {
        author: 'Riya Sharma (3rd Year)',
        text: 'Think of the double-black as an extra heavy token that needs to be absorbed. A rotation with the sibling transfers the red color and absorbs the token immediately! See note #1.',
        isVerifiedHelpful: true,
        time: '1 hour ago',
      },
    ],
    resourceTitle: 'Red-Black Trees Cheatsheet.pdf',
  },
];

const INITIAL_VOUCHERS: StudyVoucher[] = [
  {
    id: 'v_starbucks',
    title: 'Starbucks 40% Off Cold Brew & Frappuccino',
    category: 'food',
    partner: 'Starbucks Coffee (Campus Outlet)',
    discount: '40% OFF',
    sparksCost: 150,
    promoCode: 'STARBUCKS-JAVA40',
    description: 'Recharge late-night study sessions! Valid on Java Chip Frappuccino, Vanilla Cold Brew & Butter Croissants.',
    iconEmoji: '☕',
    logoBrand: 'starbucks',
    badge: 'Campus Favorite',
    validity: 'Valid till Nov 20',
  },
  {
    id: 'v_spotify',
    title: 'Spotify Student Premium 3 Months ₹99',
    category: 'tech',
    partner: 'Spotify Campus Pack',
    discount: '₹99 ONLY',
    sparksCost: 180,
    promoCode: 'SPOTIFY-LOFI-PASS',
    description: 'Ad-free study beats, deep work ambient sounds, and offline podcasts for study focus with zero ad breaks.',
    iconEmoji: '🎧',
    logoBrand: 'spotify',
    badge: 'Best Value',
    validity: 'Valid for students',
  },
  {
    id: 'v_epson',
    title: 'Epson EcoTank 50 Free Laser Color Pages',
    category: 'stationery',
    partner: 'Epson Campus Print Station (Admin Block)',
    discount: '100% FREE',
    sparksCost: 90,
    promoCode: 'EPSON-PRINT-FREE50',
    description: 'Print major project reports, IEEE research papers, and lab manuals in high-res color with free spiral binding.',
    iconEmoji: '🖨️',
    logoBrand: 'epson',
    badge: 'Popular',
    validity: 'Valid this semester',
  },
  {
    id: 'v_pw',
    title: 'Physics Wallah (PW) - 40% Off Tech Batches',
    category: 'tech',
    partner: 'Physics Wallah (PW) Campus Partner',
    discount: '40% OFF',
    sparksCost: 200,
    promoCode: 'PW-CAMPUS-TECH40',
    description: 'Flat 40% off on PW GATE CS/IT, DSA Placement Batch, System Design masterclass & full-length mock test series.',
    iconEmoji: '🎓',
    logoBrand: 'pw',
    badge: 'Top Exam Prep',
    validity: 'Valid till Nov 30',
  },
  {
    id: 'v_canteen',
    title: '50% Off Adrak Chai & Crispy Samosa Combo',
    category: 'food',
    partner: 'Central Campus Canteen',
    discount: '50% OFF',
    sparksCost: 100,
    promoCode: 'CANTEEN-CHAI50',
    description: 'Post-study refresh! Valid on hot ginger adrak chai + 2 crispy aloo samosas at Central Canteen counter.',
    iconEmoji: '🥟',
    logoBrand: 'canteen',
    badge: 'Hot Deal',
    validity: 'Valid till Nov 15',
  },
  {
    id: 'v_notion',
    title: '3 Months Notion AI Pro Student Pass',
    category: 'tech',
    partner: 'Notion Education Partner',
    discount: 'FREE PRO',
    sparksCost: 250,
    promoCode: 'NOTION-STUDENT-PRO',
    description: 'Organize exam roadmaps, subject wikis, and lecture notes with unlimited AI summaries and study planner.',
    iconEmoji: '💻',
    logoBrand: 'notion',
    badge: 'Exclusive',
    validity: 'Redeem anytime',
  },
  {
    id: 'v_books',
    title: '₹150 Flat Off Engineering Reference Books',
    category: 'books',
    partner: 'University Book Depo & Co.',
    discount: '₹150 OFF',
    sparksCost: 160,
    promoCode: 'CAMPUS-READ150',
    description: 'Valid on Cormen DSA, Galvin OS, or semester previous year solved question banks.',
    iconEmoji: '📚',
    logoBrand: 'books',
    badge: 'Top Pick',
    validity: 'Valid till Nov 30',
  },
];

const INITIAL_ROOMS: MeetingRoom[] = [
  {
    id: 'room-1',
    name: 'DSA Graphs & Dynamic Programming Pod',
    subject: 'DSA',
    code: 'LOOP-DSA4',
    time: 'Live Now · Started 15m ago',
    duration: '45 mins sprint',
    topic: 'Graph BFS/DFS, Dijkstra & Memoization Patterns',
    tutor: {
      name: 'Aman Verma',
      role: '4th Year DSA Mentor (Ex-Amazon Intern)',
      avatarEmoji: '👨‍💻',
      rating: 4.95,
    },
    mutualBuddies: [
      { name: 'Priya Sharma', avatarEmoji: '🌸', avatarBg: 'bg-rose-100' },
      { name: 'Aarav Patel', avatarEmoji: '🌿', avatarBg: 'bg-emerald-100' },
    ],
    participantsCount: 5,
    maxParticipants: 8,
    isLive: true,
  },
  {
    id: 'room-2',
    name: 'Java Spring Boot & REST APIs Pod',
    subject: 'Java',
    code: 'LOOP-JAVA8',
    time: 'Live Now · 25m left',
    duration: '60 mins sprint',
    topic: 'JWT Auth, Hibernate ORM & Service Layer',
    tutor: {
      name: 'Rohit Deshmukh',
      role: 'Backend SDE Intern & 4th Year',
      avatarEmoji: '☕',
      rating: 4.85,
    },
    mutualBuddies: [
      { name: 'Neha Gupta', avatarEmoji: '👩‍🏫', avatarBg: 'bg-amber-100' },
    ],
    participantsCount: 4,
    maxParticipants: 6,
    isLive: true,
  },
  {
    id: 'room-3',
    name: 'Operating Systems: Concurrency & Semaphores',
    subject: 'OS',
    code: 'LOOP-OS12',
    time: 'Starts 11:30 AM · In 20 mins',
    duration: '30 mins sprint',
    topic: 'Deadlock Avoidance, Dining Philosophers & Mutex Locks',
    mutualBuddies: [
      { name: 'Riya Sharma', avatarEmoji: '🌸', avatarBg: 'bg-rose-100' },
      { name: 'Kabir Mehta', avatarEmoji: '⚡', avatarBg: 'bg-purple-100' },
    ],
    participantsCount: 3,
    maxParticipants: 6,
    isLive: false,
  },
  {
    id: 'room-4',
    name: 'Flutter & Mobile UI Claymorphism Sprint',
    subject: 'Flutter',
    code: 'LOOP-FLUT7',
    time: 'Starts 2:00 PM · Today',
    duration: '45 mins sprint',
    topic: 'Custom Animators, State Management & Riverpod',
    tutor: {
      name: 'Simran Kaur',
      role: 'Mobile Lead (Google DSC DTU)',
      avatarEmoji: '📱',
      rating: 4.9,
    },
    mutualBuddies: [
      { name: 'Aarav Patel', avatarEmoji: '🌿', avatarBg: 'bg-emerald-100' },
    ],
    participantsCount: 6,
    maxParticipants: 10,
    isLive: false,
  },
  {
    id: 'room-5',
    name: 'DBMS SQL Query Optimization & Indexing',
    subject: 'DBMS',
    code: 'LOOP-DBMS3',
    time: 'Live Now',
    duration: '30 mins sprint',
    topic: 'B-Trees vs Hash Indexes & Execution Plan Analysis',
    mutualBuddies: [
      { name: 'Kabir Mehta', avatarEmoji: '⚡', avatarBg: 'bg-purple-100' },
    ],
    participantsCount: 2,
    maxParticipants: 6,
    isLive: true,
  },
];

function CampusLoop3DLogo({
  size = 'normal',
  onHighFive,
  colorTheme = 'dark',
  showControls = false,
  onColorThemeChange,
}: {
  size?: 'normal' | 'compact';
  onHighFive?: () => void;
  colorTheme?: 'dark' | 'indigo' | 'teal' | 'coral';
  showControls?: boolean;
  onColorThemeChange?: (theme: 'dark' | 'indigo' | 'teal' | 'coral') => void;
}) {
  const [internalColorTheme, setInternalColorTheme] = useState<'dark' | 'indigo' | 'teal' | 'coral'>('dark');
  const activeColorTheme = colorTheme || internalColorTheme;

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTapped, setIsTapped] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const angleRef = useRef(0);
  const [orbPositions, setOrbPositions] = useState({
    x1: 178,
    y1: 85,
    x2: 42,
    y2: 85,
  });

  // Mathematically exact Bernoulli Lemniscate infinity path
  const loopPathD = useMemo(() => {
    const cx = 110;
    const cy = 85;
    const A = 68;
    const B = 46;
    const steps = 140;
    let d = '';
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * 2 * Math.PI;
      const denom = 1 + Math.sin(theta) * Math.sin(theta);
      const x = cx + (A * Math.cos(theta)) / denom;
      const y = cy + (B * Math.sin(theta) * Math.cos(theta)) / denom;
      if (i === 0) d += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      else d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    return d + ' Z';
  }, []);

  // Animate circulating orbs (coral & mint) along track
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      angleRef.current = (angleRef.current + delta * 2.4 * speedMultiplier) % (2 * Math.PI);

      const cx = 110;
      const cy = 85;
      const A = 68;
      const B = 46;

      const t1 = angleRef.current;
      const d1 = 1 + Math.sin(t1) * Math.sin(t1);
      const x1 = cx + (A * Math.cos(t1)) / d1;
      const y1 = cy + (B * Math.sin(t1) * Math.cos(t1)) / d1;

      const t2 = (angleRef.current + Math.PI) % (2 * Math.PI);
      const d2 = 1 + Math.sin(t2) * Math.sin(t2);
      const x2 = cx + (A * Math.cos(t2)) / d2;
      const y2 = cy + (B * Math.sin(t2) * Math.cos(t2)) / d2;

      setOrbPositions({ x1, y1, x2, y2 });
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [speedMultiplier]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -22;
    const tiltY = (x / (rect.width / 2)) * 22;
    setTilt({ x: tiltX, y: tiltY });
    setSpeedMultiplier(2.2);
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpeedMultiplier(1);
    setIsHovered(false);
  };

  const handleTap = () => {
    setIsTapped(true);
    setTimeout(() => setIsTapped(false), 850);
    onHighFive?.();
  };

  const themeStyles = {
    dark: 'from-[#141522] via-[#0E0F17] to-[#08080C] border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)]',
    indigo: 'from-[#1C1744] via-[#120F2D] to-[#0A071E] border-indigo-400/30 shadow-[0_25px_60px_rgba(20,12,50,0.9)]',
    teal: 'from-[#0B2A2F] via-[#061C20] to-[#030F11] border-teal-400/30 shadow-[0_25px_60px_rgba(4,25,30,0.9)]',
    coral: 'from-[#331320] via-[#220B15] to-[#12050A] border-rose-400/30 shadow-[0_25px_60px_rgba(45,10,25,0.9)]',
  };

  const isCompact = size === 'compact';
  const cardWidth = isCompact ? 'w-16 h-16 rounded-2xl' : 'w-56 h-56 rounded-[44px]';

  return (
    <div className="flex flex-col items-center select-none">
      {/* 3D Perspective Container */}
      <div
        style={{ perspective: 1000 }}
        className="flex items-center justify-center cursor-pointer"
        onPointerMove={!isCompact ? handlePointerMove : undefined}
        onPointerLeave={!isCompact ? handlePointerLeave : undefined}
        onClick={handleTap}
        title="Tap for a high-five!"
      >
        <div
          style={{
            transform: isTapped
              ? undefined
              : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? '25px' : '0px'})`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`relative ${cardWidth} p-2 bg-gradient-to-br ${themeStyles[activeColorTheme]} border-2 backdrop-blur-xl flex items-center justify-center overflow-hidden transition-shadow ${
            isTapped ? 'animate-tap-spin' : ''
          }`}
        >
          {/* Glass Specular Sheen (matching the video's gloss reflection) */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-full blur-md pointer-events-none" />
          <div className="absolute inset-0 bg-radial at-top-left from-white/15 via-transparent to-black/40 pointer-events-none" />

          {/* Infinity Loop SVG Track & Circulating Orbs */}
          <svg
            viewBox="20 20 180 130"
            className="w-full h-full relative z-10 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]"
          >
            {/* Ambient Track Glow */}
            <path
              d={loopPathD}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="filter blur-[3px]"
            />

            {/* Pristine White Solid 3D Ribbon Track */}
            <path
              d={loopPathD}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Ribbon Depth Highlight */}
            <path
              d={loopPathD}
              fill="none"
              stroke="rgba(240, 240, 255, 0.95)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Orb 1: Coral / Peach-Orange Glowing Sphere */}
            <g transform={`translate(${orbPositions.x1}, ${orbPositions.y1})`}>
              <circle r="14" fill="#FF5E62" opacity="0.4" className="filter blur-[2px]" />
              <circle r="8.5" fill="#FF5E62" />
              <circle cx="-2.5" cy="-2.5" r="3" fill="#FFA5A7" opacity="0.9" />
            </g>

            {/* Orb 2: Mint / Seafoam-Teal Glowing Sphere */}
            <g transform={`translate(${orbPositions.x2}, ${orbPositions.y2})`}>
              <circle r="14" fill="#20E3B2" opacity="0.4" className="filter blur-[2px]" />
              <circle r="8.5" fill="#20E3B2" />
              <circle cx="-2.5" cy="-2.5" r="3" fill="#A8F8E4" opacity="0.9" />
            </g>
          </svg>
        </div>
      </div>

      {showControls && !isCompact && (
        <div className="flex flex-col items-center mt-3 space-y-2">
          {/* Hint text from video */}
          <p className="text-[11px] font-semibold text-[#DFB6B2]/80 tracking-wide m-0">
            Move to tilt and speed up • tap for a high-five
          </p>

          {/* Theme Colours Row (matching video) */}
          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[10px] font-bold text-[#DFB6B2]/60 uppercase tracking-wider mr-1">
              Colours
            </span>
            {[
              { id: 'indigo', bg: 'bg-[#2B2358]' },
              { id: 'teal', bg: 'bg-[#10434A]' },
              { id: 'coral', bg: 'bg-[#521E2C]' },
              { id: 'dark', bg: 'bg-[#181924]' },
            ].map((col) => (
              <button
                key={col.id}
                onClick={() => {
                  setInternalColorTheme(col.id as any);
                  onColorThemeChange?.(col.id as any);
                }}
                className={`w-6 h-6 rounded-full ${col.bg} transition-all cursor-pointer ${
                  activeColorTheme === col.id ? 'ring-2 ring-white scale-110 shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                title={`Switch to ${col.id} theme`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



const INITIAL_USED_BOOKS: UsedBook[] = [
  {
    id: 'ub-1',
    title: 'Introduction to Algorithms (CLRS 3rd Ed.)',
    author: 'Cormen, Leiserson, Rivest, Stein',
    subject: 'DSA',
    price: 450,
    originalPrice: 1250,
    condition: 'Like New',
    sellerName: 'Kabir Verma (4th Year ECE)',
    sellerYear: '4th Year',
    sellerContact: 'Hostel 4, Room 212 · WhatsApp: +91 98765 43210',
    imageEmoji: '📘',
  },
  {
    id: 'ub-2',
    title: 'Operating System Concepts (Galvin 9th Ed.)',
    author: 'Silberschatz, Galvin, Gagne',
    subject: 'OS',
    price: 380,
    originalPrice: 950,
    condition: 'Good',
    sellerName: 'Riya Sharma (3rd Year CSE)',
    sellerYear: '3rd Year',
    sellerContact: 'Central Library Desk 4 · WhatsApp: +91 98123 45678',
    imageEmoji: '📗',
  },
  {
    id: 'ub-3',
    title: 'Database System Concepts (Korth 7th Ed.)',
    author: 'Silberschatz, Korth, Sudarshan',
    subject: 'DBMS',
    price: 320,
    originalPrice: 890,
    condition: 'Highlighted',
    sellerName: 'Aarav Patel (2nd Year IT)',
    sellerYear: '2nd Year',
    sellerContact: 'Aryabhatta Hostel · WhatsApp: +91 97234 56789',
    imageEmoji: '📙',
  },
  {
    id: 'ub-4',
    title: 'Clean Code & Java System Design Architecture',
    author: 'Robert C. Martin',
    subject: 'Java',
    price: 400,
    originalPrice: 1100,
    condition: 'Like New',
    sellerName: 'Aman Verma (4th Year CSE)',
    sellerYear: '4th Year',
    sellerContact: 'DTU Innovation Lab · WhatsApp: +91 99887 76655',
    imageEmoji: '📕',
  },
];

const INITIAL_LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'lb-1',
    title: 'Discrete Mathematics and Its Applications',
    author: 'Kenneth H. Rosen',
    subject: 'DSA',
    availableCopies: 5,
    totalCopies: 10,
    shelfLocation: 'Central Library, Shelf CS-14',
    edition: '8th International Edition',
    isIssued: true,
  },
  {
    id: 'lb-3',
    title: 'Modern Compiler Implementation in Java',
    author: 'Andrew W. Appel',
    subject: 'Java',
    availableCopies: 4,
    totalCopies: 6,
    shelfLocation: 'Central Library, Shelf CS-22',
    edition: '2nd Cambridge Edition',
    isIssued: false,
  },
  {
    id: 'lb-2',
    title: 'Computer Networks (5th Edition)',
    author: 'Andrew S. Tanenbaum & David J. Wetherall',
    subject: 'OS',
    availableCopies: 3,
    totalCopies: 8,
    shelfLocation: 'Central Library, Shelf CS-09',
    edition: '5th Pearson Edition',
    isIssued: false,
  },
  {
    id: 'lb-4',
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell & Peter Norvig',
    subject: 'AI',
    availableCopies: 2,
    totalCopies: 5,
    shelfLocation: 'Central Library, Shelf AI-03',
    edition: '4th Global Edition',
    isIssued: false,
  },
];


export default function App() {
  const [hub, setHub] = useState<MainHub>('study');
  const [studySubView, setStudySubView] = useState<StudySubView>('rooms');
  const [notesSubView, setNotesSubView] = useState<NotesSubView>('library');
  const [communitySubView, setCommunitySubView] = useState<CommunitySubView>('doubts');
  const [isVouchersExpanded, setIsVouchersExpanded] = useState(false);

  // Theme state: 'warm' vs 'dark'
  const [appTheme, setAppTheme] = useState<'warm' | 'dark'>(() => {
    return (localStorage.getItem('campusloop_app_theme') as 'warm' | 'dark') || 'warm';
  });

  const [welcomeLogoTheme, setWelcomeLogoTheme] = useState<'dark' | 'indigo' | 'teal' | 'coral'>('dark');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    try {
      localStorage.setItem('campusloop_app_theme', appTheme);
      if (appTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
      }
    } catch {}
  }, [appTheme]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Meeting Room State & VC Call Mode
  const [roomsList, setRoomsList] = useState<MeetingRoom[]>(INITIAL_ROOMS);
  const [activeCallRoom, setActiveCallRoom] = useState<MeetingRoom | null>(null);
  const [roomFilterSubject, setRoomFilterSubject] = useState<string>('all');
  const [roomJoinCodeInput, setRoomJoinCodeInput] = useState('');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [createRoomName, setCreateRoomName] = useState('');
  const [createRoomSubject, setCreateRoomSubject] = useState<SubjectType>('DSA');
  const [createRoomTopic, setCreateRoomTopic] = useState('');
  const [createRoomDuration, setCreateRoomDuration] = useState('45 mins sprint');

  // VC Session Chat State
  const [vcMessages, setVcMessages] = useState<{ sender: string; text: string; time: string; isHost?: boolean }[]>([
    { sender: 'Aman Verma (Tutor)', text: 'Welcome everyone! We are starting the BFS graph traversal diagram.', time: '10:02 AM' },
    { sender: 'Priya Sharma', text: 'Hey Aman! Audio and screen are crystal clear 👍', time: '10:03 AM' },
    { sender: 'Aarav Patel', text: 'Ready with LeetCode problem #133 Clone Graph.', time: '10:04 AM' },
  ]);
  const [vcChatInput, setVcChatInput] = useState('');

  // Modals & Popups
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showDirectMessagesModal, setShowDirectMessagesModal] = useState(false);
  const [activeDmPeer, setActiveDmPeer] = useState<Peer | null>(null);
  const [dmInputText, setDmInputText] = useState('');
  const [dmThreads, setDmThreads] = useState<Record<string, { sender: string; text: string; time: string }[]>>({
    p1: [
      { sender: 'Riya Sharma', text: 'Hey Rahul! Did you solve problem 3 on Trees?', time: '10:14 AM' },
      { sender: 'You', text: 'Working on BFS traversal right now in the library!', time: '10:18 AM' },
      { sender: 'Riya Sharma', text: 'Awesome, hop into the study pod whenever ready!', time: '10:20 AM' },
    ],
    p2: [
      { sender: 'Aarav Patel', text: 'Sent you the Flutter Riverpod repo for the campus project!', time: 'Yesterday' },
      { sender: 'You', text: 'Thanks Aarav, checking it out tonight.', time: 'Yesterday' },
    ],
    p4: [
      { sender: 'Kabir Verma', text: 'OS review session tomorrow at 4 PM if you want to join!', time: '2 days ago' },
    ],
  });

  // Profile Data & Specific Modals
  const [userProfile, setUserProfile] = useState({
    name: 'Rahul Sharma',
    username: '@rahul.dev',
    college: 'Delhi Technological University (DTU)',
    year: '3rd Year · Computer Science & Eng.',
    rollNo: '2K23/CO/312',
    bio: 'DTU CSE \'27 | 480+ LeetCode Solved | Smart India Hackathon \'26 Finalist | 5 Vouchers Unlocked | Grinding Trees, DP & System Design for SDE-1 Internships 🚀',
    avatar: '/assets/aistudio/image_bfa36e2d.png',
    leetcodeSolved: 480,
    leetcodeEasy: 180,
    leetcodeMed: 240,
    leetcodeHard: 60,
    contestRating: 1856,
    globalRank: 'Top 4.2%',
    hackathons: [
      { name: 'Smart India Hackathon 2026', title: 'EduSphere: Adaptive AI Tutor', role: 'Team Lead', badge: 'National Finalist 🏆' },
      { name: 'TCS-iON Ninja Challenge', title: 'CloudVault: Secure FinTech', role: 'Backend & ML', badge: 'Top 10 Finalist ⚡' },
      { name: 'Flipkart GRiD 7.0', title: 'Warehouse AMR Path Optimization', role: 'Algorithm Dev', badge: 'Round 2 Qualified 🚀' },
    ],
  });

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showRemoveBuddyModal, setShowRemoveBuddyModal] = useState(false);
  const [showLeetCodeModal, setShowLeetCodeModal] = useState(false);

  // Other Peers Profiles & Sub-modals (LeetCode ID, Buddies, Vouchers)
  const [viewingPeerProfile, setViewingPeerProfile] = useState<Peer | null>(null);
  const [peerLeetCodeModal, setPeerLeetCodeModal] = useState<Peer | null>(null);
  const [peerVouchersModal, setPeerVouchersModal] = useState<Peer | null>(null);
  const [peerBuddiesModal, setPeerBuddiesModal] = useState<Peer | null>(null);

  // Edit Profile Form State
  const [editName, setEditName] = useState(userProfile.name);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);
  const [editLeetCode, setEditLeetCode] = useState(userProfile.leetcodeSolved);

  // Peer Discovery
  const [peersList, setPeersList] = useState<Peer[]>(PEERS);
  const [activeStoryPeer, setActiveStoryPeer] = useState<Peer | null>(null);
  const [buddyViewMode, setBuddyViewMode] = useState<'feed' | 'match'>('feed');

  // Matcher filters
  const [mood, setMood] = useState<MoodType>('together');
  const [slot, setSlot] = useState<SlotType>(30);
  const [subj, setSubj] = useState<SubjectType>('DSA');
  const [matches, setMatches] = useState<Peer[] | null>(null);

  // Notes Library & Embedded Flashcards
  const [expandedFlashcardNoteId, setExpandedFlashcardNoteId] = useState<string | null>(null);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Used Books (Buy & Sell)
  const [usedBooks, setUsedBooks] = useState<UsedBook[]>(INITIAL_USED_BOOKS);
  const [showSellBookModal, setShowSellBookModal] = useState(false);
  const [sellBookTitle, setSellBookTitle] = useState('');
  const [sellBookSubject, setSellBookSubject] = useState<SubjectType>('DSA');
  const [sellBookPrice, setSellBookPrice] = useState(350);
  const [sellBookOriginalPrice, setSellBookOriginalPrice] = useState(900);
  const [sellBookCondition, setSellBookCondition] = useState<'Like New' | 'Good' | 'Highlighted'>('Like New');
  const [sellBookContact, setSellBookContact] = useState('Hostel 2, Room 104 · WhatsApp');

  // Issue Central Library Books
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>(INITIAL_LIBRARY_BOOKS);
  const [issuedSlip, setIssuedSlip] = useState<{ book: LibraryBook; token: string; returnDate: string } | null>(null);

  // Tutors
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [bookingSlot, setBookingSlot] = useState<string>('');
  const [userPoints, setUserPoints] = useState(380);
  const [bookedSessions, setBookedSessions] = useState<{ tutor: string; subject: string; time: string }[]>([]);

  // Spill (Community): Reddit-style Doubts & HACK Team
  const [redditPosts, setRedditPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY);
  const [redditFlairFilter, setRedditFlairFilter] = useState<string>('all');
  const [redditCommentInputs, setRedditCommentInputs] = useState<Record<string, string>>({});
  const [hackTeamTab, setHackTeamTab] = useState<'join' | 'post'>('join');
  const [teams, setTeams] = useState<ProjectTeam[]>(INITIAL_TEAMS);
  const [postTeamHackathon, setPostTeamHackathon] = useState('Smart India Hackathon 2026 (SIH)');
  const [postTeamTitle, setPostTeamTitle] = useState('');
  const [postTeamDesc, setPostTeamDesc] = useState('');
  const [postTeamRoles, setPostTeamRoles] = useState('React Dev, ML Engineer');
  const [postTeamMembers, setPostTeamMembers] = useState(3);
  const [postTeamMax, setPostTeamMax] = useState(5);

  // Events & Contests
  const [events, setEvents] = useState<CampusEvent[]>([
    ...INITIAL_EVENTS,
    {
      id: 9,
      t: 'Nov 24 · Virtual Duel',
      title: 'LeetCode Biweekly Intra-College Sprint 2026',
      where: 'Online Contest Portal · LeetCode Arena',
      going: 285,
      tag: 'Contest',
      eligibility: 'All Engineering Batches (1st to 4th Year)',
      organizer: 'Competitive Programming Society DTU',
      logoType: 'contest',
      prizePool: '₹20,000 Cash + LeetCode Premium Subscriptions',
      deadline: 'Contest starts Nov 24, 8:00 PM',
      tagBg: 'bg-purple-50',
      tagColor: 'text-purple-800',
    },
    {
      id: 10,
      t: 'Dec 02 · Hands-on Bootcamp',
      title: 'AWS Cloud Practitioner & Serverless Architecture',
      where: 'Auditorium 1 + Live Streamed Lab',
      going: 340,
      tag: 'Workshop',
      eligibility: 'Open to all CS / IT / ECE undergraduates',
      organizer: 'AWS Student Community DTU',
      logoType: 'workshop',
      prizePool: 'Free $150 AWS Credits + Certification Voucher',
      deadline: 'Limited to 90 Lab Seats',
      tagBg: 'bg-emerald-50',
      tagColor: 'text-emerald-800',
    },
  ]);

  // Streak & Vouchers
  const [streak, setStreak] = useState(5);
  const [longestStreak, setLongestStreak] = useState(14);
  const [streakSparks, setStreakSparks] = useState(320);
  const [todayFocusMinutes, setTodayFocusMinutes] = useState(45);
  const [todayStreakCompleted, setTodayStreakCompleted] = useState(false);
  const [streakTimerDuration, setStreakTimerDuration] = useState(25 * 60);
  const [streakTimeRemaining, setStreakTimeRemaining] = useState(25 * 60);
  const [isStreakTimerRunning, setIsStreakTimerRunning] = useState(false);
  const [streakSubject, setStreakSubject] = useState<SubjectType>('DSA');
  const [streakAmbientSound, setStreakAmbientSound] = useState<'lofi' | 'library' | 'rain' | 'off'>('lofi');
  const [streakDayLog, setStreakDayLog] = useState([
    { day: 'Mon', date: 'Oct 23', minutes: 50, completed: true },
    { day: 'Tue', date: 'Oct 24', minutes: 40, completed: true },
    { day: 'Wed', date: 'Oct 25', minutes: 60, completed: true },
    { day: 'Thu', date: 'Oct 26', minutes: 30, completed: true },
    { day: 'Fri', date: 'Today', minutes: 45, completed: false, isToday: true },
    { day: 'Sat', date: 'Tomorrow', minutes: 0, completed: false },
    { day: 'Sun', date: 'Oct 29', minutes: 0, completed: false },
  ]);
  const [vouchers, setVouchers] = useState<StudyVoucher[]>(INITIAL_VOUCHERS);
  const [voucherFilter, setVoucherFilter] = useState<'all' | 'food' | 'books' | 'tech' | 'stationery'>('all');
  const [claimedVouchers, setClaimedVouchers] = useState<{ id: string; voucher: StudyVoucher; claimedAt: string }[]>([
    { id: 'claim-init-1', voucher: INITIAL_VOUCHERS[0], claimedAt: 'Yesterday' },
  ]);
  const [showVouchersModal, setShowVouchersModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMessage(null), 3200);
  };

  // Timer countdown
  useEffect(() => {
    if (!isStreakTimerRunning) return;
    const interval = setInterval(() => {
      setStreakTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsStreakTimerRunning(false);
          const minsAdded = Math.round(streakTimerDuration / 60);
          setTodayFocusMinutes((m) => m + minsAdded);
          setStreakSparks((s) => s + 50);
          setUserPoints((p) => p + 40);
          setTodayStreakCompleted(true);
          setStreakDayLog((days) =>
            days.map((d) => (d.isToday ? { ...d, completed: true, minutes: d.minutes + minsAdded } : d))
          );
          setStreak((cur) => cur + 1);
          showToast(`🏆 Daily Study Goal Achieved! +50 Sparks & +40 Pts earned! Streak is now ${streak + 1} days!`);
          return streakTimerDuration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isStreakTimerRunning, streakTimerDuration, streak]);

  const handleClaimStreakManual = () => {
    const elapsedMins = Math.max(15, Math.round((streakTimerDuration - streakTimeRemaining) / 60) || 25);
    setIsStreakTimerRunning(false);
    setStreakTimeRemaining(streakTimerDuration);
    setTodayFocusMinutes((m) => m + elapsedMins);
    setStreakSparks((s) => s + 50);
    setUserPoints((p) => p + 40);
    setTodayStreakCompleted(true);
    setStreakDayLog((days) =>
      days.map((d) => (d.isToday ? { ...d, completed: true, minutes: d.minutes + elapsedMins } : d))
    );
    if (!todayStreakCompleted) {
      setStreak((cur) => cur + 1);
      showToast(`🔥 Streak Saved for Today! +50 Sparks added! New Streak: ${streak + 1} Days!`);
    } else {
      showToast(`⚡ Extra focus session logged! +50 Sparks added to wallet!`);
    }
  };

  const handleRedeemVoucher = (voucher: StudyVoucher) => {
    if (streakSparks < voucher.sparksCost) {
      showToast(`Need ${voucher.sparksCost - streakSparks} more Sparks! Complete a study session to unlock!`);
      return;
    }
    setStreakSparks((s) => s - voucher.sparksCost);
    setVouchers((prev) => prev.map((v) => (v.id === voucher.id ? { ...v, claimed: true } : v)));
    setClaimedVouchers((prev) => [...prev, { id: `claim-${Date.now()}`, voucher, claimedAt: 'Just now' }]);
    showToast(`🎉 Voucher Unlocked: ${voucher.title}! Code: ${voucher.promoCode}`);
  };

  const copyVoucherCode = (code: string) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCode(code);
    showToast(`Coupon code "${code}" copied! Show this at campus counter!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCreateMeetingRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createRoomName.trim()) {
      showToast('Please enter a room name!');
      return;
    }
    const newRoom: MeetingRoom = {
      id: `room-${Date.now()}`,
      name: createRoomName.trim(),
      subject: createRoomSubject,
      code: `LOOP-${createRoomSubject}${Math.floor(10 + Math.random() * 90)}`,
      time: 'Live Now · Just Created',
      duration: createRoomDuration,
      topic: createRoomTopic.trim() || `${createRoomSubject} Collaborative sprint`,
      mutualBuddies: [{ name: 'Riya Sharma', avatarEmoji: '🌸', avatarBg: 'bg-rose-100' }],
      participantsCount: 1,
      maxParticipants: 8,
      isLive: true,
    };
    setRoomsList([newRoom, ...roomsList]);
    setShowCreateRoomModal(false);
    setCreateRoomName('');
    setCreateRoomTopic('');
    setActiveCallRoom(newRoom);
    showToast(`Meeting room "${newRoom.name}" created! Joined audio/video session!`);
  };

  const handleJoinByCode = () => {
    const code = roomJoinCodeInput.trim().toUpperCase();
    if (!code) {
      showToast('Please enter a room code (e.g. LOOP-DSA4)!');
      return;
    }
    const found = roomsList.find((r) => r.code.toUpperCase() === code);
    if (found) {
      setActiveCallRoom(found);
      setRoomJoinCodeInput('');
      showToast(`Joined ${found.name}! Audio/video call connected!`);
    } else {
      // Create ad-hoc room with that code
      const adhoc: MeetingRoom = {
        id: `room-${Date.now()}`,
        name: `Private Study Pod (${code})`,
        subject: 'DSA',
        code: code,
        time: 'Live Now',
        duration: '45 mins sprint',
        topic: 'Peer code review and mock interview practice',
        mutualBuddies: [{ name: 'Aarav Patel', avatarEmoji: '🌿', avatarBg: 'bg-emerald-100' }],
        participantsCount: 2,
        maxParticipants: 6,
        isLive: true,
      };
      setRoomsList([adhoc, ...roomsList]);
      setActiveCallRoom(adhoc);
      setRoomJoinCodeInput('');
      showToast(`Connected to room ${code}! Audio/video pod live!`);
    }
  };

  const handleSendVcMessage = () => {
    if (!vcChatInput.trim()) return;
    const newMsg = {
      sender: 'You (Rahul)',
      text: vcChatInput.trim(),
      time: 'Just now',
      isHost: true,
    };
    setVcMessages((prev) => [...prev, newMsg]);
    setVcChatInput('');
  };

  const handleListBookForSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellBookTitle.trim()) {
      showToast('Please enter book title!');
      return;
    }
    const newBook: UsedBook = {
      id: `ub-${Date.now()}`,
      title: sellBookTitle.trim(),
      author: 'Author verified',
      subject: sellBookSubject,
      price: sellBookPrice,
      originalPrice: sellBookOriginalPrice,
      condition: sellBookCondition,
      sellerName: `${userProfile.name} (3rd Year DTU)`,
      sellerYear: '3rd Year',
      sellerContact: sellBookContact,
      imageEmoji: '📖',
    };
    setUsedBooks([newBook, ...usedBooks]);
    setShowSellBookModal(false);
    setSellBookTitle('');
    showToast(`Book "${newBook.title}" listed for sale on campus marketplace!`);
  };

  const handleIssueLibraryBook = (book: LibraryBook) => {
    if (book.availableCopies <= 0) {
      showToast('Sorry, all copies are currently issued!');
      return;
    }
    const token = `DTU-LIB-${Math.floor(1000 + Math.random() * 9000)}`;
    const returnDate = 'Nov 15, 2026 (14 Days)';
    setLibraryBooks((prev) =>
      prev.map((b) => (b.id === book.id ? { ...b, availableCopies: b.availableCopies - 1, isIssued: true } : b))
    );
    setIssuedSlip({ book, token, returnDate });
    showToast(`Book Issued! Show digital slip #${token} at library circulation desk.`);
  };

  const handlePostHackTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTeamTitle.trim()) {
      showToast('Please enter project title!');
      return;
    }
    const newTeam: ProjectTeam = {
      id: `t_${Date.now()}`,
      hackathonName: postTeamHackathon,
      logoType: postTeamHackathon.toLowerCase().includes('flipkart')
        ? 'flipkart'
        : postTeamHackathon.toLowerCase().includes('tcs')
        ? 'tcs'
        : postTeamHackathon.toLowerCase().includes('google')
        ? 'google'
        : 'sih',
      title: postTeamTitle.trim(),
      event: postTeamHackathon.toUpperCase(),
      desc: postTeamDesc.trim() || 'Developing an innovative hackathon solution with high impact.',
      creator: `${userProfile.name} (3rd Year)`,
      creatorYear: '3rd Year CSE',
      membersCount: postTeamMembers,
      maxMembers: postTeamMax,
      eligibility: 'Engineering undergraduates · All branches',
      location: 'Hybrid / Online + Onsite Grand Finale',
      prizePool: '₹2,50,000 + Internship Interview Slots',
      deadline: 'Dec 05, 2026',
      rolesNeeded: postTeamRoles.split(',').map((r) => r.trim()).filter(Boolean),
    };
    setTeams([newTeam, ...teams]);
    setHackTeamTab('join');
    setPostTeamTitle('');
    setPostTeamDesc('');
    showToast(`Hackathon team "${newTeam.title}" published! Applicants will be notified.`);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // =============================================================
  // WELCOME / LANDING SCREEN (When not logged in)
  // =============================================================
  if (!isLoggedIn) {
    return (
      <div
        className={`w-full min-h-screen text-[#FBE4D8] flex flex-col justify-between relative select-none antialiased px-4 sm:px-6 py-6 overflow-y-auto overflow-x-hidden bg-cover bg-center bg-no-repeat font-sans ${
          viewMode === 'mobile'
            ? 'max-w-[440px] min-h-[820px] mx-auto shadow-2xl rounded-[38px] my-6 border-8 border-[#1B1B3A] overflow-hidden'
            : 'w-full'
        }`}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(8, 11, 22, 0.72) 0%, rgba(9, 13, 26, 0.85) 60%, rgba(6, 8, 17, 0.95) 100%), url(${campusSunsetBg})`,
          backgroundColor: '#070A15',
        }}
      >
        {/* Subtle Ambient Glowing Blobs */}
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#7C3AED]/15 blur-[130px] rounded-full pointer-events-none -z-0" />
        <div className="absolute bottom-12 right-1/4 w-80 h-80 bg-[#00C2FF]/15 blur-[130px] rounded-full pointer-events-none -z-0" />

        {/* Top Floating View Toggle */}
        <div className="w-full max-w-md mx-auto flex items-center justify-end relative z-20 shrink-0">
          <button
            onClick={() => {
              const nextMode = viewMode === 'desktop' ? 'mobile' : 'desktop';
              setViewMode(nextMode);
              showToast(nextMode === 'desktop' ? 'Switched to Full Website View 🌐' : 'Switched to Mobile Phone Frame 📱');
            }}
            className="px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer backdrop-blur-md transition-all shadow-sm"
            title="Toggle between Website View and Mobile Phone Frame"
          >
            {viewMode === 'desktop' ? <span>📱 Phone View</span> : <span>🌐 Website View</span>}
          </button>
        </div>

        {/* Main Centered Content */}
        <div className="relative z-10 my-auto py-4 sm:py-6 w-full max-w-md mx-auto flex flex-col items-center text-center space-y-4 sm:space-y-5">
          {/* Top Branding (Matching image_d170ef86.png) */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight font-sans flex items-center justify-center drop-shadow-lg">
              <span className="text-white">Campus</span>
              <span className="text-[#00C2FF]">Loop</span>
            </h1>
            <p className="text-sm sm:text-base text-[#FBE4D8]/90 font-serif italic text-center max-w-xs sm:max-w-sm mx-auto leading-relaxed drop-shadow-sm">
              Your All-in-One Campus Academic &amp; Peer Learning Platform
            </p>
          </div>

          {/* 3D Interactive Logo */}
          <div className="flex flex-col items-center space-y-2 py-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-cyan-500/30 blur-2xl rounded-full -z-10 group-hover:scale-110 transition-transform duration-500" />
              <CampusLoop3DLogo
                colorTheme={welcomeLogoTheme}
                showControls={false}
                onHighFive={() => showToast('✋ High-Five! You powered up the study loop! 🚀')}
              />
            </div>
            {/* Interactive Tilt and Colours Selector */}
            <div className="flex flex-col items-center space-y-1.5 pt-1">
              <p className="text-[11px] sm:text-xs font-medium text-slate-300 tracking-wide m-0 flex items-center gap-1.5 drop-shadow-sm font-sans">
                <span>Move cursor to tilt 3D loop</span>
                <span className="text-white/40">•</span>
                <span className="text-amber-300">tap for high-five ✋</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mr-0.5 font-sans">
                  THEME:
                </span>
                {[
                  { id: 'indigo', bg: 'bg-[#2B2358]', label: 'Indigo' },
                  { id: 'teal', bg: 'bg-[#10434A]', label: 'Teal' },
                  { id: 'coral', bg: 'bg-[#521E2C]', label: 'Coral' },
                  { id: 'dark', bg: 'bg-[#181924]', label: 'Dark' },
                ].map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setWelcomeLogoTheme(col.id as any)}
                    className={`w-5 h-5 rounded-full ${col.bg} transition-all cursor-pointer ${
                      welcomeLogoTheme === col.id
                        ? 'ring-2 ring-[#00C2FF] ring-offset-2 ring-offset-[#070A15] scale-110 shadow-md'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    title={`Switch logo to ${col.label} theme`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Exact Warm Cream / Clay Sign In Card from Screenshot */}
          <div className="w-full bg-[#FDF2E9] rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_10px_25px_rgba(43,18,76,0.2)] border border-[#DFB6B2]/70 text-[#190019] space-y-4 text-center">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ECD5DC] border border-[#DFB6B2] text-[#522B47] text-xs font-bold tracking-wide shadow-xs mx-auto">
              <span>🎓</span>
              <span>Campus Student Sign In</span>
            </div>

            {/* Title: Welcome!! in Cursive / Serif Style */}
            <h2 className="text-4xl sm:text-5xl font-serif italic font-bold text-[#190019] tracking-tight my-1 select-none">
              Welcome!!
            </h2>

            {/* Continue with Google Button */}
            <button
              onClick={() => {
                setIsLoggedIn(true);
                showToast('🎉 Google SSO Verified: Welcome Rahul!');
              }}
              className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs hover:shadow transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="text-[#190019] font-bold text-sm sm:text-base font-serif">
                Continue with Google
              </span>
            </button>

            {/* Divider: or College ID */}
            <div className="flex items-center gap-3 my-0.5">
              <div className="flex-1 h-px bg-[#DFB6B2]" />
              <span className="text-xs sm:text-sm font-serif italic text-[#854F6C] font-semibold">
                or College ID
              </span>
              <div className="flex-1 h-px bg-[#DFB6B2]" />
            </div>

            {/* College ID Input with Graduation Cap Icon */}
            <div className="relative">
              <input
                type="text"
                defaultValue="2K23/CO/312 (DTU)"
                className="w-full bg-white border border-[#DFB6B2] rounded-2xl px-4 py-3 text-[#2B124C] font-bold text-sm sm:text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-[#854F6C]/40 font-serif pr-10"
                placeholder="Enter College ID"
              />
              <span className="absolute right-3.5 top-3 text-base pointer-events-none select-none">
                🎓
              </span>
            </div>

            {/* Enter Campus Button (Plum Gradient matching screenshot) */}
            <button
              onClick={() => {
                setIsLoggedIn(true);
                showToast('🎉 Welcome to CampusLoop, Rahul! 5-Day Study Streak Active!');
              }}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#623758] to-[#2B124C] hover:from-[#522B47] hover:to-[#190019] text-white font-serif font-bold text-sm sm:text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Campus as Rahul Sharma →</span>
            </button>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="w-full max-w-md mx-auto pt-3 text-center text-xs text-slate-400 relative z-10 shrink-0">
          <p className="m-0 font-medium">© 2026 CampusLoop • DTU &amp; Campus Peer Network</p>
        </footer>
      </div>
    );
  }

  // =============================================================
  // MAIN APP (When logged in)
  // =============================================================
  return (
    <div
      className={`min-h-screen clay-bg-canvas text-[#190019] flex flex-col justify-between relative select-none antialiased ${
        appTheme === 'dark' ? 'dark-theme' : ''
      } ${
        viewMode === 'mobile'
          ? 'w-full max-w-[440px] min-h-[820px] mx-auto shadow-2xl rounded-[38px] my-6 border-8 border-[#1B1B3A] overflow-hidden'
          : 'w-full'
      }`}
    >
      {/* Responsive Top Header */}
      <header className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shrink-0 sticky top-0 z-40 bg-[#FBE4D8]/95 backdrop-blur-md border-b border-[#DFB6B2]/40 shadow-xs">
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => {
              setHub('study');
              setStudySubView('rooms');
            }}
            className="flex items-center gap-1.5 cursor-pointer select-none group"
          >
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-sans drop-shadow-xs flex items-center">
              <span className={appTheme === 'dark' ? 'text-white' : 'text-[#2B124C]'}>Campus</span>
              <span className="text-[#00C2FF]">Loop</span>
            </h1>
            <ChevronRight className="w-4 h-4 text-[#854F6C] rotate-90 group-hover:text-[#2B124C] transition-colors" />
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-[#DFB6B2] text-xs font-bold text-[#522B5B]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-live" />
            <span>380+ students studying live in pods & library</span>
          </div>
        </div>

        {/* Center: Desktop Hub Navigation Tabs */}
        {viewMode === 'desktop' && (
          <nav className="hidden md:flex items-center gap-2 bg-[#170F25] p-2 rounded-2xl border border-[#2B1B40] shadow-md font-sans">
            <button
              onClick={() => setHub('study')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                hub === 'study' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <img
                src="/assets/aistudio/image_521f80c6.png"
                alt="Study"
                className={`w-4.5 h-4.5 object-contain ${hub === 'study' ? 'brightness-0 invert' : 'brightness-0 invert opacity-75'}`}
              />
              <span>Study</span>
            </button>

            <button
              onClick={() => setHub('notes')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                hub === 'notes' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <img
                src="/assets/aistudio/image_2d166a70.png"
                alt="Library"
                className={`w-4.5 h-4.5 object-contain ${hub === 'notes' ? 'brightness-0 invert' : 'brightness-0 invert opacity-75'}`}
              />
              <span>Library</span>
            </button>

            {/* Feed with circular plus button matching Image 2 */}
            <button
              onClick={() => setHub('feed')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                hub === 'feed' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="w-5.5 h-5.5 rounded-full bg-white text-black flex items-center justify-center shadow-xs shrink-0">
                <Plus className="w-4 h-4 stroke-[3]" />
              </div>
              <span>Feed</span>
            </button>

            {/* Spill */}
            <button
              onClick={() => setHub('community')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                hub === 'community' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-4.5 h-4.5" />
              <span>Spill</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => setHub('profile')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                hub === 'profile' ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-4.5 h-4.5" />
              <span>Profile</span>
            </button>
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            onClick={() => {
              setHub('study');
              setStudySubView('streak_timer');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-black text-amber-800 cursor-pointer hover:bg-amber-100 transition-all shadow-xs"
            title="View Daily Streak & Vouchers"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{streak}d</span>
            <span className="text-slate-300">|</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{streakSparks} Sparks</span>
          </div>

          <button
            onClick={() => {
              const nextMode = viewMode === 'desktop' ? 'mobile' : 'desktop';
              setViewMode(nextMode);
              showToast(nextMode === 'desktop' ? 'Switched to Full Website View 🌐' : 'Switched to Mobile Phone Frame 📱');
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl clay-pill-btn text-xs font-black cursor-pointer hover:scale-105 active:scale-95 transition-all"
            title="Toggle between Full Website View and Mobile Phone Frame"
          >
            {viewMode === 'desktop' ? (
              <>
                <Sliders className="w-3.5 h-3.5 text-[#522B5B]" />
                <span>Phone View</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-[#522B5B]" />
                <span>Website View</span>
              </>
            )}
          </button>

          {/* Chat Icon (Next to Settings) */}
          <button
            onClick={() => setShowDirectMessagesModal(true)}
            className="relative p-2 rounded-full hover:bg-white/60 active:scale-90 transition-all cursor-pointer text-[#2B124C]"
            title="Chat with Campus Buddies"
          >
            <MessageSquare className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#FBE4D8]" />
          </button>

          {/* Activity Heart */}
          <button
            onClick={() => setShowActivityModal(true)}
            className="relative p-2 rounded-full hover:bg-white/60 active:scale-90 transition-all cursor-pointer text-[#2B124C]"
            title="Activity & Campus Notifications"
          >
            <Heart className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#FBE4D8]" />
          </button>

          {/* Theme Quick Toggle */}
          <button
            onClick={() => {
              const nextTheme = appTheme === 'dark' ? 'warm' : 'dark';
              setAppTheme(nextTheme);
              showToast(nextTheme === 'dark' ? 'Dark Mode Enabled 🌙' : 'Warm Light Clay Mode Enabled ☀️');
            }}
            className="relative p-2 rounded-full hover:bg-white/60 active:scale-90 transition-all cursor-pointer text-[#2B124C]"
            title={`Switch to ${appTheme === 'dark' ? 'Warm Light' : 'Dark Mode'}`}
          >
            {appTheme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-[#522B5B]" />}
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettingsModal(true)}
            className="relative p-2 rounded-full hover:bg-white/60 active:scale-90 transition-all cursor-pointer text-[#2B124C]"
            title="Settings & Account"
          >
            <Settings className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Profile Avatar */}
          <div
            onClick={() => setHub('profile')}
            className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-[#FF5E62] via-[#DFB6B2] to-[#854F6C] cursor-pointer hover:scale-105 transition-all shadow-xs shrink-0"
            title="View Profile"
          >
            <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover rounded-full bg-[#190019] p-0.5" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className={`flex-1 overflow-y-auto ${viewMode === 'desktop' ? 'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5' : 'px-4 py-3'} space-y-4`}>
        {/* ========================================================= */}
        {/* 1. HUB: STUDY (Rooms/VC, Matcher, Streak/Vouchers)        */}
        {/* ========================================================= */}
        {hub === 'study' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Sub-nav Pills (Smart Planner and AI solver removed) */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'rooms', label: 'Group Rooms & VC Pods', icon: <Video className="w-4 h-4" /> },
                { id: 'matcher', label: 'Buddy Discovery Feed', icon: <Users className="w-4 h-4" /> },
                { id: 'streak_timer', label: 'Streak & Vouchers', icon: <Flame className="w-4 h-4 text-orange-500" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setStudySubView(tab.id as StudySubView);
                    if (tab.id !== 'rooms') setActiveCallRoom(null);
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    studySubView === tab.id ? 'clay-pill-btn-active' : 'clay-pill-btn'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* 1A. GROUP ROOMS & LIVE VC POD */}
            {studySubView === 'rooms' && (
              <div className="space-y-4">
                {/* ACTIVE AUDIO/VIDEO CALL (VC POD) */}
                {activeCallRoom ? (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Top Call Banner */}
                    <div className="clay-card-purple text-white p-4 space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <h3 className="font-black text-base text-white m-0">{activeCallRoom.name}</h3>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-black bg-white/20 text-[#DFB6B2]">
                            {activeCallRoom.code}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Live Session · 24:15 left</span>
                        </div>
                      </div>

                      {/* Video Grid Tiles */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                        {/* Tile 1: You */}
                        <div className="aspect-4/3 rounded-2xl bg-[#190019] border-2 border-white/20 p-3 flex flex-col justify-between relative overflow-hidden shadow-inner">
                          <div className="flex items-center justify-between text-[10px] font-bold text-white/80">
                            <span className="bg-black/50 px-2 py-0.5 rounded-md">You (Host)</span>
                            <span className={`p-1 rounded-full ${isMicMuted ? 'bg-rose-500' : 'bg-emerald-500'}`}>
                              {isMicMuted ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-white" />}
                            </span>
                          </div>
                          <div className="my-auto text-center">
                            {isVideoOff ? (
                              <div className="w-14 h-14 mx-auto rounded-full bg-[#522B5B] flex items-center justify-center text-2xl border-2 border-white/40">
                                👨‍💻
                              </div>
                            ) : (
                              <div className="relative inline-block">
                                <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-emerald-400 to-[#00C2FF] animate-pulse">
                                  <img src={userProfile.avatar} alt="You" className="w-full h-full object-cover rounded-full bg-[#0C0A1A] p-0.5" />
                                </div>
                                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
                              </div>
                            )}
                          </div>
                          <div className="text-[10px] text-center text-white/90 font-bold">
                            {userProfile.name}
                          </div>
                        </div>

                        {/* Tile 2: Peer or Tutor */}
                        <div className="aspect-4/3 rounded-2xl bg-[#190019] border-2 border-emerald-400/60 p-3 flex flex-col justify-between relative overflow-hidden shadow-inner ring-2 ring-emerald-400/40">
                          <div className="flex items-center justify-between text-[10px] font-bold text-white/80">
                            <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-md font-black">
                              {activeCallRoom.tutor ? activeCallRoom.tutor.name : 'Riya Sharma'}
                            </span>
                            <span className="p-1 rounded-full bg-emerald-500">
                              <Mic className="w-3 h-3 text-white" />
                            </span>
                          </div>
                          <div className="my-auto text-center">
                            <div className="w-16 h-16 mx-auto rounded-full p-0.5 bg-gradient-to-tr from-emerald-400 via-amber-300 to-rose-400 animate-spin-slow">
                              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border border-white overflow-hidden">
                                <img src="/assets/aistudio/image_1310e48c.png" alt={activeCallRoom.tutor ? activeCallRoom.tutor.name : 'Peer'} className="w-full h-full object-cover" />
                              </div>
                            </div>
                          </div>
                          <div className="text-[10px] text-center text-emerald-300 font-bold flex items-center justify-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>Speaking...</span>
                          </div>
                        </div>

                        {/* Tile 3: Mutual Buddy */}
                        <div className="aspect-4/3 rounded-2xl bg-[#190019] border-2 border-white/20 p-3 flex flex-col justify-between relative overflow-hidden shadow-inner">
                          <div className="flex items-center justify-between text-[10px] font-bold text-white/80">
                            <span className="bg-black/50 px-2 py-0.5 rounded-md">
                              {activeCallRoom.mutualBuddies[0]?.name || 'Aarav Patel'}
                            </span>
                            <span className="p-1 rounded-full bg-emerald-500">
                              <Mic className="w-3 h-3 text-white" />
                            </span>
                          </div>
                          <div className="my-auto text-center">
                            <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 flex items-center justify-center border-2 border-white/40 overflow-hidden">
                              <img src="/assets/aistudio/image_1310e48c.png" alt="Mutual Buddy" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="text-[10px] text-center text-white/90 font-bold">
                            Mutual Buddy
                          </div>
                        </div>
                      </div>

                      {/* VC Call Control Toolbar */}
                      <div className="pt-2 flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setIsMicMuted(!isMicMuted);
                            showToast(isMicMuted ? 'Microphone Unmuted 🎙️' : 'Microphone Muted 🔇');
                          }}
                          className={`p-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                            isMicMuted ? 'bg-rose-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                          title="Toggle Mic"
                        >
                          {isMicMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          <span className="hidden sm:inline">{isMicMuted ? 'Unmute' : 'Mute'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsVideoOff(!isVideoOff);
                            showToast(isVideoOff ? 'Camera Turned On 📹' : 'Camera Turned Off 📷');
                          }}
                          className={`p-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                            isVideoOff ? 'bg-rose-600 text-white' : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                          title="Toggle Video"
                        >
                          {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                          <span className="hidden sm:inline">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setIsScreenSharing(!isScreenSharing);
                            showToast(isScreenSharing ? 'Stopped Screen Share' : 'Screen Share Active 💻');
                          }}
                          className={`p-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                            isScreenSharing ? 'bg-[#00C2FF] text-black font-black' : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                          title="Share Screen"
                        >
                          <Monitor className="w-4 h-4" />
                          <span className="hidden sm:inline">Share</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveCallRoom(null);
                            showToast('Left study call session.');
                          }}
                          className="px-4 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                          title="End Call / Leave Pod"
                        >
                          <PhoneOff className="w-4 h-4" />
                          <span>Leave Pod</span>
                        </button>
                      </div>
                    </div>

                    {/* Dedicated Live VC Session Chat Section (Whiteboard removed) */}
                    <div className="clay-card p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-[#522B5B]" />
                          <h4 className="font-black text-sm text-[#2B124C] m-0">Live Pod VC Chat</h4>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {vcMessages.length} Messages
                        </span>
                      </div>

                      <div className="h-44 overflow-y-auto space-y-2 p-3 rounded-2xl clay-inset-box text-xs">
                        {vcMessages.map((m, idx) => (
                          <div key={idx} className="flex flex-col">
                            <div className="flex items-baseline gap-1.5">
                              <span className={`font-black text-xs ${m.isHost ? 'text-indigo-600' : 'text-[#2B124C]'}`}>
                                {m.sender}:
                              </span>
                              <span className="text-[11px] text-[#522B5B] font-medium">{m.text}</span>
                              <span className="text-[9px] text-slate-400 ml-auto">{m.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={vcChatInput}
                          onChange={(e) => setVcChatInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendVcMessage();
                          }}
                          placeholder="Type doubt, code snippet, or message in VC..."
                          className="flex-1 px-3.5 py-2.5 text-xs rounded-xl clay-inset-box text-[#2B124C] font-medium focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
                        />
                        <button
                          onClick={handleSendVcMessage}
                          className="clay-pill-btn-active px-4 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-xs active:scale-95"
                        >
                          <Send className="w-3.5 h-3.5 text-[#DFB6B2]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* MEETING ROOMS DIRECTORY (When not in call) */
                  <div className="space-y-4">
                    {/* Top Room Actions: Create Room & Join with Code */}
                    <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <h3 className="font-black text-base text-[#2B124C] m-0">Campus Study Rooms & Live Audio/Video Pods</h3>
                          <p className="text-xs text-[#854F6C] font-semibold mt-0.5 m-0">
                            Join live collaborative voice/video rooms, see mutual buddies attending, or book 1-on-1 peer mentorship!
                          </p>
                        </div>
                        <button
                          onClick={() => setShowCreateRoomModal(true)}
                          className="clay-pill-btn-active px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
                        >
                          <PlusCircle className="w-4 h-4 text-[#DFB6B2]" />
                          <span>Create Meeting Room</span>
                        </button>
                      </div>

                      {/* Join Room with Code Bar */}
                      <div className="pt-2 border-t border-[#DFB6B2]/50 flex items-center gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={roomJoinCodeInput}
                            onChange={(e) => setRoomJoinCodeInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleJoinByCode();
                            }}
                            placeholder="Enter Meeting Code (e.g. LOOP-DSA4 or LOOP-JAVA8)..."
                            className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
                          />
                          <Radio className="w-4 h-4 text-[#854F6C] absolute left-3 top-3" />
                        </div>
                        <button
                          onClick={handleJoinByCode}
                          className="px-4 py-2.5 rounded-xl bg-[#2B124C] text-[#FBE4D8] font-black text-xs cursor-pointer hover:bg-black transition-all shrink-0 active:scale-95"
                        >
                          Join by Code
                        </button>
                      </div>
                    </div>

                    {/* Room Subject Filter Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {['all', 'DSA', 'Java', 'OS', 'DBMS', 'Flutter'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setRoomFilterSubject(s)}
                          className={`rounded-full px-3 py-1 text-[11px] font-black shrink-0 transition-all cursor-pointer ${
                            roomFilterSubject === s ? 'clay-pill-btn-active' : 'clay-pill-btn'
                          }`}
                        >
                          {s === 'all' ? 'All Active Pods' : `#${s}`}
                        </button>
                      ))}
                    </div>

                    {/* Meeting Rooms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roomsList
                        .filter((r) => (roomFilterSubject === 'all' ? true : r.subject === roomFilterSubject))
                        .map((room) => (
                          <div
                            key={room.id}
                            className="clay-card p-4 space-y-3 border-2 border-[#ECD7CE] hover:border-[#DFB6B2] transition-all flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              {/* Header: Subject + Code + Live timer */}
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-black uppercase tracking-wider text-[#522B5B] bg-[#E2D9F3] px-2.5 py-0.5 rounded-full">
                                  #{room.subject}
                                </span>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] font-mono font-black text-[#2B124C] bg-[#FBE4D8] px-2 py-0.5 rounded-md border border-[#DFB6B2]">
                                    {room.code}
                                  </span>
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                                    {room.time}
                                  </span>
                                </div>
                              </div>

                              <h4 className="font-black text-sm text-[#2B124C] leading-snug m-0">
                                {room.name}
                              </h4>
                              <p className="text-xs text-[#854F6C] font-medium leading-snug m-0">
                                <strong>Topic:</strong> {room.topic}
                              </p>

                              {/* Tutor Mention If Any */}
                              {room.tutor && (
                                <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-100 border border-amber-300 shrink-0">
                                      <img src="/assets/aistudio/image_1310e48c.png" alt={room.tutor.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                      <div className="font-black text-xs text-amber-900 leading-none">
                                        Tutor: {room.tutor.name}
                                      </div>
                                      <span className="text-[10px] text-amber-700 font-semibold">
                                        {room.tutor.role}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-black text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-300">
                                    ★ {room.tutor.rating}
                                  </span>
                                </div>
                              )}

                              {/* Mutual Buddies Attending */}
                              <div className="p-2.5 rounded-xl bg-white/80 border border-[#DFB6B2]/60 space-y-1">
                                <div className="flex items-center justify-between text-[10px] font-black text-[#522B5B]">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3 text-[#854F6C]" />
                                    <span>MUTUAL BUDDIES ATTENDING:</span>
                                  </span>
                                  <span className="text-slate-400 font-bold">{room.participantsCount}/{room.maxParticipants} spots</span>
                                </div>
                                <div className="flex items-center gap-2 pt-0.5">
                                  {room.mutualBuddies.map((mb, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-[#2B124C] bg-white px-2 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                                      <div className="w-4 h-4 rounded-full overflow-hidden bg-slate-100 shrink-0">
                                        <img src="/assets/aistudio/image_1310e48c.png" alt={mb.name} className="w-full h-full object-cover" />
                                      </div>
                                      <span>{mb.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-2 border-t border-[#DFB6B2]/40 flex items-center justify-between">
                              <span className="text-xs text-[#854F6C] font-semibold">
                                {room.duration}
                              </span>
                              <button
                                onClick={() => {
                                  setActiveCallRoom(room);
                                  showToast(`Entered ${room.name}! Audio & Video Pod Live 🎧`);
                                }}
                                className="clay-pill-btn-active px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
                              >
                                <Video className="w-3.5 h-3.5 text-[#DFB6B2]" />
                                <span>Join Room (VC)</span>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Integrated 1-on-1 Peer Mentors Section */}
                    <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] space-y-3 mt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-black text-sm text-[#2B124C] m-0">1-on-1 Peer Tutoring & Doubt Mentors</h3>
                          <p className="text-xs text-[#854F6C] font-semibold mt-0.5 m-0">
                            Book private mentorship sessions with university toppers using earned study sparks/points!
                          </p>
                        </div>
                        <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                          {userPoints} Campus Points
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {TUTORS.map((tutor) => (
                          <div key={tutor.id} className="p-3.5 rounded-2xl bg-white border border-[#DFB6B2] space-y-2.5 flex flex-col justify-between shadow-xs">
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                    <img src="/assets/aistudio/image_1310e48c.png" alt={tutor.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <div className="font-black text-xs text-[#2B124C]">{tutor.name}</div>
                                    <div className="text-[10px] text-[#854F6C] font-semibold">{tutor.year}</div>
                                  </div>
                                </div>
                                <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                  ★ {tutor.rating}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#522B5B] font-medium leading-snug m-0">
                                {tutor.bio}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {tutor.specialty.map((s) => (
                                  <span key={s} className="text-[9px] font-black px-2 py-0.5 rounded-md bg-[#E2D9F3] text-[#522B5B]">
                                    #{s}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-[#DFB6B2]/40 flex items-center justify-between">
                              <span className="text-xs font-black text-[#2B124C]">
                                {tutor.hourlyPoints} Pts <span className="text-[10px] text-slate-400 font-normal">/hr</span>
                              </span>
                              <button
                                onClick={() => {
                                  setSelectedTutor(tutor);
                                  setBookingSlot(tutor.availableSlots[0]);
                                }}
                                className="clay-pill-btn-active text-[10px] font-black px-3 py-1.5 rounded-lg cursor-pointer"
                              >
                                Book Session
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 1B. BUDDY DISCOVERY FEED */}
            {studySubView === 'matcher' && (
              <div className="space-y-4">
                {/* Active Stories Ribbon */}
                <div className="clay-card p-3 space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-black uppercase text-[#854F6C] tracking-wide flex items-center gap-1">
                      <span>📸</span> Campus Live Stories
                    </span>
                    <span className="text-[9px] font-bold text-[#10B981] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                      {peersList.length + 1} Studying Now
                    </span>
                  </div>
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 scrollbar-none">
                    <button
                      onClick={() => showToast('Your live study story is active! 🚀 Topic: DSA Trees')}
                      className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
                    >
                      <div className="relative">
                        <div className="w-13 h-13 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-[#DFB6B2] to-[#854F6C] shadow-sm group-hover:scale-105 transition-all">
                          <div className="w-full h-full rounded-full bg-[#2B124C] border-2 border-white flex items-center justify-center text-white text-base overflow-hidden">
                            <img src="/assets/aistudio/image_1a4f2b80.png" alt="Rahul" className="w-full h-full object-cover p-1" />
                          </div>
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#10B981] text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
                          +
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-[#2B124C] max-w-[54px] truncate text-center">
                        Your Story
                      </span>
                    </button>
                    {peersList.map((peer) => (
                      <button
                        key={peer.id}
                        onClick={() => setActiveStoryPeer(peer)}
                        className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
                      >
                        <div className="relative">
                          <div className="w-13 h-13 rounded-full p-[2.5px] bg-gradient-to-tr from-[#FF5E62] via-[#FF9966] to-[#854F6C] shadow-md group-hover:scale-108 transition-all">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-slate-100 flex items-center justify-center">
                              <img src="/assets/aistudio/image_1310e48c.png" alt={peer.n} className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <span className="absolute -bottom-1 -right-1 text-[9px] px-1 py-0.2 rounded-full bg-[#2B124C] text-white font-black border border-white whitespace-nowrap">
                            {peer.activeStory?.statusBadge || 'Live'}
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-[#2B124C] max-w-[58px] truncate text-center">
                          {peer.n.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Mode Switcher */}
                <div className="clay-card p-1.5 flex items-center gap-1">
                  <button
                    onClick={() => setBuddyViewMode('feed')}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      buddyViewMode === 'feed' ? 'clay-pill-btn-active' : 'text-[#854F6C] hover:bg-white/40'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Buddy Discovery Feed</span>
                  </button>
                  <button
                    onClick={() => setBuddyViewMode('match')}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      buddyViewMode === 'match' ? 'clay-pill-btn-active' : 'text-[#854F6C] hover:bg-white/40'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Smart Match Filter</span>
                  </button>
                </div>

                {/* Responsive 3-Column Peer Grid */}
                {buddyViewMode === 'feed' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {peersList.map((peer) => {
                      const isConnected = peer.isConnected;
                      const isLiked = peer.isLiked;
                      return (
                        <div
                          key={peer.id}
                          className="clay-card-warm p-4 border-2 border-[#DFB6B2] space-y-3 relative overflow-hidden transition-all hover:shadow-lg flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-2.5">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => setViewingPeerProfile(peer)}
                                  className="w-13 h-13 rounded-2xl p-0.5 bg-gradient-to-tr from-[#854F6C] via-[#DFB6B2] to-[#2B124C] shadow-md shrink-0 cursor-pointer hover:scale-105 transition-all text-center"
                                  title={`View ${peer.n}'s profile`}
                                >
                                  <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-white">
                                    <img src="/assets/aistudio/image_1310e48c.png" alt={peer.n} className="w-full h-full object-cover" />
                                  </div>
                                </button>
                                <div>
                                  <div
                                    onClick={() => setViewingPeerProfile(peer)}
                                    className="flex items-center gap-1.5 cursor-pointer group/name"
                                  >
                                    <h3 className="font-black text-sm text-[#2B124C] group-hover/name:text-[#854F6C] transition-colors leading-none m-0">
                                      {peer.n}
                                    </h3>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-100" />
                                  </div>
                                  <span className="text-[10px] font-bold text-[#854F6C] block mt-0.5">
                                    {peer.username}
                                  </span>
                                  <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#522B5B] mt-0.5">
                                    <span className="truncate max-w-[200px]">{peer.college}</span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-white/80 text-[#854F6C] border border-[#DFB6B2]/40 shrink-0">
                                {peer.year}
                              </span>
                            </div>

                            {/* Live Activity */}
                            <div className="bg-gradient-to-r from-[#522B5B]/10 via-[#854F6C]/10 to-[#DFB6B2]/20 border border-[#DFB6B2] p-2.5 rounded-2xl space-y-1">
                              <div className="flex items-center justify-between text-[10px] font-black text-[#522B5B]">
                                <span className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-live" />
                                  <span>CURRENTLY STUDYING & WORKING ON</span>
                                </span>
                                <span className="text-[9px] text-[#854F6C]">Live Now</span>
                              </div>
                              <p className="text-xs font-bold text-[#2B124C] leading-snug m-0">
                                {peer.activity}
                              </p>
                            </div>

                            {/* Bio / Snapshot */}
                            <p className="text-xs text-[#522B5B] font-medium leading-relaxed m-0 bg-white/60 p-2.5 rounded-xl border border-white">
                              "{peer.bio}"
                            </p>

                            {/* Interactive Profile Stats Badges: LeetCode, Vouchers, Buddies */}
                            <div className="grid grid-cols-3 gap-1.5 pt-1">
                              <button
                                onClick={() => setPeerLeetCodeModal(peer)}
                                className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left cursor-pointer transition-all active:scale-95"
                                title="Click to view LeetCode stats"
                              >
                                <span className="text-[9px] font-black text-amber-800 uppercase block">LeetCode ⚡</span>
                                <span className="text-xs font-black text-[#2B124C]">{peer.leetcodeSolved || 400} solved</span>
                              </button>

                              <button
                                onClick={() => setPeerBuddiesModal(peer)}
                                className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-left cursor-pointer transition-all active:scale-95"
                                title="Click to view connected buddies"
                              >
                                <span className="text-[9px] font-black text-purple-800 uppercase block">Buddies 👥</span>
                                <span className="text-xs font-black text-[#2B124C]">{peer.buddiesList?.length || 3} friends</span>
                              </button>

                              <button
                                onClick={() => setPeerVouchersModal(peer)}
                                className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left cursor-pointer transition-all active:scale-95"
                                title="Click to view campus vouchers"
                              >
                                <span className="text-[9px] font-black text-emerald-800 uppercase block">Vouchers 🎟️</span>
                                <span className="text-xs font-black text-[#2B124C]">{peer.vouchers?.length || 3} active</span>
                              </button>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                              {peer.sk.map((skill) => (
                                <span key={skill} className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#2B124C] text-[#FBE4D8] shadow-2xs">
                                  #{skill}
                                </span>
                              ))}
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 ml-auto flex items-center gap-1">
                                ★ {peer.rating}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 border-t border-[#DFB6B2]/40 flex items-center justify-between gap-1.5 flex-wrap">
                            <button
                              onClick={() => {
                                setPeersList((prev) =>
                                  prev.map((p) =>
                                    p.id === peer.id
                                      ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
                                      : p
                                  )
                                );
                                showToast(isLiked ? `Unliked ${peer.n.split(' ')[0]}'s profile` : `❤️ Liked ${peer.n.split(' ')[0]}'s study profile!`);
                              }}
                              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                isLiked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-white/80 text-[#522B5B] hover:bg-white'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-[#854F6C]'}`} />
                              <span>{peer.likesCount}</span>
                            </button>

                            <button
                              onClick={() => showToast(`Waved at ${peer.n.split(' ')[0]}! 👋 Notification sent to their phone.`)}
                              className="px-2.5 py-1.5 rounded-xl text-xs font-black bg-white/80 text-[#522B5B] hover:bg-white cursor-pointer active:scale-95 transition-all"
                            >
                              Wave 👋
                            </button>

                            <button
                              onClick={() => {
                                setPeersList((prev) => prev.map((p) => (p.id === peer.id ? { ...p, isConnected: !p.isConnected } : p)));
                                showToast(isConnected ? `Removed buddy connection with ${peer.n.split(' ')[0]}` : `🤝 Connected with ${peer.n}!`);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                                isConnected ? 'bg-emerald-600 text-white shadow-2xs' : 'clay-pill-btn-active'
                              }`}
                            >
                              {isConnected ? '✓ Connected' : 'Connect 🤝'}
                            </button>

                            {/* Join Pod -> Immediately launches VC call! */}
                            <button
                              onClick={() => {
                                const newPod: MeetingRoom = {
                                  id: `pod-${peer.id}`,
                                  name: `Study Pod with ${peer.n.split(' ')[0]}`,
                                  subject: (peer.sk[0] as SubjectType) || 'DSA',
                                  code: `POD-${peer.n.slice(0, 3).toUpperCase()}${Math.floor(10 + Math.random() * 90)}`,
                                  time: 'Live Now',
                                  duration: '30 mins sprint',
                                  topic: peer.activity,
                                  mutualBuddies: [{ name: peer.n, avatarEmoji: peer.avatarEmoji, avatarBg: peer.avatarBg }],
                                  participantsCount: 2,
                                  maxParticipants: 4,
                                  isLive: true,
                                };
                                setActiveCallRoom(newPod);
                                setStudySubView('rooms');
                                showToast(`Joined live Audio/Video Pod with ${peer.n}! 🎧`);
                              }}
                              className="px-3 py-1.5 rounded-xl text-xs font-black bg-[#2B124C] text-[#FBE4D8] hover:bg-[#190019] cursor-pointer shadow-2xs active:scale-95 transition-all flex items-center gap-1"
                            >
                              <Video className="w-3 h-3 text-sky-300" />
                              <span>Join Pod</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Smart Match Filter */}
                {buddyViewMode === 'match' && (
                  <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 items-start">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="clay-card-warm p-4 flex items-center gap-3.5 border-2 border-[#DFB6B2]">
                        <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white/50 p-0.5">
                          <img src={clayStudent} alt="Student" className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-black uppercase text-[#854F6C] bg-white/80 px-2 py-0.5 rounded-full">
                            Criteria Matcher 🎯
                          </span>
                          <h2 className="text-[15px] font-black text-[#2B124C] mt-1 leading-tight">Filter Compatible Buddies</h2>
                          <p className="text-[11px] text-[#854F6C] font-semibold mt-0.5 leading-tight">
                            Match by semester, subject & study availability.
                          </p>
                        </div>
                      </div>

                      <div className="clay-card p-3.5 space-y-2">
                        <span className="text-xs font-black text-[#2B124C] block">Target Subject</span>
                        <div className="grid grid-cols-3 gap-2">
                          {SUBJECTS.map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setSubj(s);
                                setMatches(null);
                              }}
                              className={`rounded-xl py-1.5 text-xs font-black transition-all cursor-pointer ${
                                subj === s ? 'clay-pill-btn-active' : 'clay-pill-btn'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="clay-card p-3.5 space-y-2">
                        <span className="text-xs font-black text-[#2B124C] block">Study Mood & Time</span>
                        <div className="flex flex-wrap gap-2">
                          {MOODS.map((m) => (
                            <button
                              key={m.id}
                              onClick={() => {
                                setMood(m.id);
                                setMatches(null);
                              }}
                              className={`rounded-full px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
                                mood === m.id ? 'clay-pill-btn-active' : 'clay-pill-btn'
                              }`}
                            >
                              <span>{m.emoji}</span> {m.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const scored = PEERS.map((p) => {
                            let s = 40;
                            const why: string[] = [];
                            if (p.m.includes(mood)) s += 30, why.push(`Wants ${mood}`);
                            if (p.sk.includes(subj)) s += 25, why.push(`Strong in ${subj}`);
                            return { ...p, s: Math.min(s, 98), why };
                          }).sort((a, b) => (b.s || 0) - (a.s || 0));
                          setMatches(scored);
                          showToast('Found compatible peers on campus! 🎯');
                        }}
                        className="w-full py-3.5 rounded-2xl font-black text-[14px] text-white bg-gradient-to-r from-[#854F6C] via-[#522B5B] to-[#2B124C] border-2 border-[#522B5B] shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Users className="w-4 h-4 text-[#DFB6B2]" />
                        <span>Find My Study Buddy</span>
                      </button>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      {matches && matches.length > 0 ? (
                        <div className="space-y-3">
                          <span className="text-xs font-black text-[#2B124C] block">Recommended Study Partners</span>
                          {matches.map((peer) => (
                            <div key={peer.id} className="clay-card p-4 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                  <img src="/assets/aistudio/image_1310e48c.png" alt={peer.n} className="w-full h-full object-cover" />
                                </div>
                                <div
                                  onClick={() => setViewingPeerProfile(peer)}
                                  className="cursor-pointer group/pm"
                                >
                                  <div className="font-black text-sm text-[#2B124C] group-hover/pm:text-[#854F6C] transition-colors">{peer.n}</div>
                                  <div className="text-[11px] text-[#854F6C] font-semibold">{peer.college} · {peer.year}</div>
                                  <div className="text-[10px] text-[#522B5B] font-bold mt-0.5">{peer.sk.join(' · ')}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-black text-[#1B4D3E] bg-[#D1E7DD] px-2 py-0.5 rounded-lg block mb-1">
                                  {peer.s}% Match
                                </span>
                                <button
                                  onClick={() => {
                                    const podRoom: MeetingRoom = {
                                      id: `pod-match-${peer.id}`,
                                      name: `Study Pod with ${peer.n.split(' ')[0]}`,
                                      subject: subj,
                                      code: `POD-${subj}${Math.floor(10 + Math.random() * 90)}`,
                                      time: 'Live Now',
                                      duration: '30 mins sprint',
                                      topic: `Collaborative ${subj} practice`,
                                      mutualBuddies: [{ name: peer.n, avatarEmoji: peer.avatarEmoji, avatarBg: peer.avatarBg }],
                                      participantsCount: 2,
                                      maxParticipants: 4,
                                      isLive: true,
                                    };
                                    setActiveCallRoom(podRoom);
                                    setStudySubView('rooms');
                                    showToast(`Joined Virtual VC Pod with ${peer.n}! 🎧`);
                                  }}
                                  className="clay-pill-btn-active text-[11px] font-black px-3 py-1.5 rounded-xl cursor-pointer"
                                >
                                  Join Pod (VC)
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="clay-card p-6 text-center text-[#854F6C] font-semibold text-xs space-y-2">
                          <Users className="w-8 h-8 mx-auto text-[#DFB6B2]" />
                          <div>Select your preferred subject and mood on the left, then click "Find My Study Buddy"!</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 1C. DAILY STREAK & CAMPUS VOUCHERS */}
            {studySubView === 'streak_timer' && (
              <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 items-start">
                {/* Left Column: Streak Hero, Calendar, and Focus Timer */}
                <div className="lg:col-span-6 space-y-4">
                  {/* Daily Streak Hero Banner */}
                  <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 p-0.5 shadow-md flex items-center justify-center shrink-0">
                          <div className="w-full h-full bg-white/90 rounded-[14px] flex flex-col items-center justify-center">
                            <Flame className="w-6 h-6 text-orange-500 fill-orange-500 animate-bounce" />
                            <span className="text-[10px] font-black text-[#2B124C] leading-none mt-0.5">{streak}d</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-black uppercase text-[#854F6C] bg-white/80 px-2 py-0.5 rounded-full">
                              Daily Study Streak 🔥
                            </span>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100/90 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Freeze Active
                            </span>
                          </div>
                          <h2 className="text-[18px] font-black text-[#2B124C] mt-1 leading-tight flex items-center gap-1.5">
                            <span>{streak} Days Streak!</span>
                            <span className="text-xs font-bold text-[#854F6C]">(Best: {longestStreak}d)</span>
                          </h2>
                          <p className="text-[11px] font-bold text-[#854F6C] mt-0.5 leading-tight">
                            {todayStreakCompleted
                              ? '🎉 Today’s streak is locked! You studied 45+ mins.'
                              : '⚡ Study 15+ mins with the timer below to maintain your streak!'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#DFB6B2]/50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#2B124C]">
                        <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                        <span>{streakSparks} Streak Sparks Available</span>
                      </div>
                      <button
                        onClick={() => setShowVouchersModal(true)}
                        className="clay-pill-btn-active text-[10px] font-black px-2.5 py-1 rounded-xl flex items-center gap-1 cursor-pointer"
                      >
                        <Ticket className="w-3 h-3" />
                        <span>My Vouchers ({claimedVouchers.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* 7-Day Weekly Streak Calendar */}
                  <div className="clay-card p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#2B124C] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#854F6C]" />
                        <span>Weekly Streak Board</span>
                      </span>
                      <span className="text-[10px] font-black text-[#854F6C]">
                        Today: <span className="text-[#2B124C]">{todayFocusMinutes} min studied</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {streakDayLog.map((item, idx) => {
                        const isCompleted = item.completed || (item.isToday && todayStreakCompleted);
                        return (
                          <div
                            key={idx}
                            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                              item.isToday
                                ? 'bg-gradient-to-b from-[#DFB6B2]/60 to-[#FBE4D8] border-2 border-orange-400 shadow-sm scale-105'
                                : isCompleted
                                ? 'clay-inset-box bg-white/70'
                                : 'bg-white/40 border border-[#DFB6B2]/40 opacity-70'
                            }`}
                          >
                            <span className="text-[10px] font-bold text-[#854F6C]">{item.day}</span>
                            <div className="my-1">
                              {isCompleted ? (
                                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                                  <Check className="w-3.5 h-3.5" />
                                </div>
                              ) : item.isToday ? (
                                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm animate-pulse">
                                  <Flame className="w-3.5 h-3.5 fill-white" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border border-dashed border-[#DFB6B2] text-[#854F6C] flex items-center justify-center text-[9px] font-bold">
                                  ·
                                </div>
                              )}
                            </div>
                            <span className="text-[9px] font-black text-[#2B124C]">
                              {item.minutes > 0 ? `${item.minutes}m` : '-'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Focus Timer */}
                  <div className="clay-card p-4 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-black text-[#2B124C] flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#854F6C]" />
                          <span>Daily Focus Timer</span>
                        </h3>
                        <p className="text-[10px] text-[#854F6C] font-semibold mt-0.5">
                          Complete focus sessions to earn Streak Sparks & Campus Vouchers!
                        </p>
                      </div>
                      <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                        +50 Sparks / 25m
                      </span>
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-[#2B124C] block mb-1">Target Subject</label>
                      <div className="grid grid-cols-6 gap-1">
                        {SUBJECTS.map((s) => (
                          <button
                            key={s}
                            onClick={() => setStreakSubject(s)}
                            className={`py-1 text-[10px] font-black rounded-lg transition-all ${
                              streakSubject === s ? 'clay-pill-btn-active' : 'clay-pill-btn'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { mins: 15, label: '15m Sprint', sparks: 25 },
                        { mins: 25, label: '25m Focus', sparks: 50 },
                        { mins: 45, label: '45m Deep', sparks: 80 },
                        { mins: 60, label: '60m Marathon', sparks: 100 },
                      ].map((mode) => {
                        const isSelected = streakTimerDuration === mode.mins * 60;
                        return (
                          <button
                            key={mode.mins}
                            onClick={() => {
                              setStreakTimerDuration(mode.mins * 60);
                              setStreakTimeRemaining(mode.mins * 60);
                              setIsStreakTimerRunning(false);
                            }}
                            className={`p-2 rounded-xl text-center transition-all ${
                              isSelected
                                ? 'bg-gradient-to-b from-[#522B5B] to-[#2B124C] text-[#FBE4D8] shadow-md border border-[#DFB6B2]'
                                : 'clay-inset-box hover:bg-white/80'
                            }`}
                          >
                            <div className="text-[11px] font-black">{mode.label}</div>
                            <div className={`text-[9px] font-bold ${isSelected ? 'text-[#DFB6B2]' : 'text-[#854F6C]'}`}>
                              +{mode.sparks} Sparks
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="clay-inset-box p-5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden bg-white/70 border-2 border-[#ECD7CE]">
                      <div className="absolute top-2 left-3 flex items-center gap-1 text-[10px] font-bold text-[#854F6C]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                        <span>{streakSubject} Focus Block</span>
                      </div>
                      <div className="my-2">
                        <span className="text-4xl font-black text-[#2B124C] tracking-tight font-mono drop-shadow-sm">
                          {formatTimer(streakTimeRemaining)}
                        </span>
                      </div>
                      <div className="w-full max-w-[260px] h-2 bg-[#DFB6B2]/40 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-orange-400 to-[#522B5B] rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, ((streakTimerDuration - streakTimeRemaining) / streakTimerDuration) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9px] font-black text-[#854F6C] uppercase">Ambience:</span>
                        {[
                          { id: 'lofi', label: '🎧 Lo-Fi Beats' },
                          { id: 'library', label: '📚 Library' },
                          { id: 'rain', label: '🌧️ Rain' },
                          { id: 'off', label: 'Off' },
                        ].map((snd) => (
                          <button
                            key={snd.id}
                            onClick={() => {
                              setStreakAmbientSound(snd.id as any);
                              showToast(`Study Ambience set to ${snd.label}!`);
                            }}
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-all ${
                              streakAmbientSound === snd.id
                                ? 'bg-[#2B124C] text-[#FBE4D8]'
                                : 'bg-white/60 text-[#854F6C] hover:bg-white'
                            }`}
                          >
                            {snd.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsStreakTimerRunning(!isStreakTimerRunning)}
                        className="flex-1 py-2.5 rounded-xl text-xs font-black clay-pill-btn-active flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        {isStreakTimerRunning ? (
                          <>
                            <Pause className="w-4 h-4 text-[#DFB6B2]" />
                            <span>Pause Timer</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 text-[#DFB6B2] fill-[#DFB6B2]" />
                            <span>Start Study Session</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsStreakTimerRunning(false);
                          setStreakTimeRemaining(streakTimerDuration);
                          showToast('Timer reset.');
                        }}
                        className="clay-pill-btn p-2.5 rounded-xl text-xs font-bold shrink-0 hover:scale-105 active:scale-95 transition-all"
                      >
                        <RotateCcw className="w-4 h-4 text-[#522B5B]" />
                      </button>
                      <button
                        onClick={() => {
                          setStreakTimeRemaining((prev) => prev + 5 * 60);
                          setStreakTimerDuration((prev) => prev + 5 * 60);
                          showToast('+5 Minutes added to session!');
                        }}
                        className="clay-pill-btn px-2.5 py-2.5 rounded-xl text-xs font-black shrink-0 hover:scale-105 active:scale-95 transition-all"
                      >
                        +5m
                      </button>
                    </div>

                    <button
                      onClick={handleClaimStreakManual}
                      className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-xs shadow-md hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Flame className="w-4 h-4 fill-white" />
                      <span>Finish & Claim Today's Streak (+50 Sparks)</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Campus Rewards & Vouchers */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="clay-card-warm p-4 space-y-3 border-2 border-[#DFB6B2]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-rose-600" />
                        <h3 className="text-[14px] font-black text-[#2B124C]">Streak rewards and vouchers</h3>
                      </div>
                    </div>

                    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                      {[
                        { id: 'all', label: 'All Offers', icon: '🎁' },
                        { id: 'food', label: 'Food & Chai', icon: '☕' },
                        { id: 'books', label: 'Books', icon: '📚' },
                        { id: 'stationery', label: 'Stationery', icon: '✏️' },
                        { id: 'tech', label: 'Tech Pro', icon: '💻' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setVoucherFilter(cat.id as any)}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-black shrink-0 transition-all ${
                            voucherFilter === cat.id ? 'clay-pill-btn-active' : 'clay-pill-btn'
                          }`}
                        >
                          <span className="mr-1">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const filteredVouchersList = vouchers.filter((v) =>
                        voucherFilter === 'all' ? true : v.category === voucherFilter
                      );
                      const displayedVouchers = isVouchersExpanded ? filteredVouchersList : filteredVouchersList.slice(0, 3);
                      return (
                        <div className="space-y-2.5">
                          {displayedVouchers.map((voucher) => {
                            const canAfford = streakSparks >= voucher.sparksCost;
                            return (
                              <div
                                key={voucher.id}
                                className={`p-3 rounded-2xl bg-white/95 border-2 transition-all relative overflow-hidden ${
                                  voucher.claimed ? 'border-emerald-400 shadow-sm' : 'border-[#ECD7CE] shadow-sm hover:border-[#DFB6B2]'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                    <VoucherBrandLogo brand={voucher.logoBrand} emoji={voucher.iconEmoji} />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#2B124C] text-[#FBE4D8]">
                                          {voucher.discount}
                                        </span>
                                        {voucher.badge && (
                                          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">
                                            {voucher.badge}
                                          </span>
                                        )}
                                        <span className="text-[10px] font-bold text-[#854F6C] truncate">
                                          {voucher.partner}
                                        </span>
                                      </div>
                                      <h4 className="text-xs font-black text-[#2B124C] mt-1 leading-snug">{voucher.title}</h4>
                                      <p className="text-[10px] font-medium text-[#854F6C] mt-0.5 leading-snug">{voucher.description}</p>
                                      <div className="text-[9px] font-bold text-slate-400 mt-1">{voucher.validity}</div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    <div className="flex items-center gap-1 text-[10px] font-black text-[#522B5B] bg-[#FBE4D8] px-2 py-0.5 rounded-lg border border-[#DFB6B2]/50">
                                      <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400" />
                                      <span>{voucher.sparksCost}</span>
                                    </div>
                                    {voucher.claimed ? (
                                      <div className="flex flex-col items-end gap-1">
                                        <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                          <Check className="w-2.5 h-2.5" /> Claimed
                                        </span>
                                        <button
                                          onClick={() => copyVoucherCode(voucher.promoCode)}
                                          className="clay-pill-btn text-[9px] font-black px-2 py-1 rounded-lg flex items-center gap-1 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                        >
                                          <Copy className="w-2.5 h-2.5 text-[#522B5B]" />
                                          <span>{copiedCode === voucher.promoCode ? 'Copied!' : 'Code'}</span>
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => handleRedeemVoucher(voucher)}
                                        disabled={!canAfford}
                                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${
                                          canAfford
                                            ? 'clay-pill-btn-active shadow hover:scale-105 active:scale-95 cursor-pointer'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                                        }`}
                                      >
                                        {canAfford ? 'Redeem 🎁' : 'Need Sparks'}
                                      </button>
                                    )}
                                  </div>
                                </div>
                                {voucher.claimed && (
                                  <div className="mt-2 pt-2 border-t border-[#DFB6B2]/40 flex items-center justify-between bg-emerald-50/70 p-1.5 rounded-xl">
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-900">
                                      <Tag className="w-3 h-3 text-emerald-600" />
                                      <span>Coupon: <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-200">{voucher.promoCode}</span></span>
                                    </div>
                                    <button
                                      onClick={() => copyVoucherCode(voucher.promoCode)}
                                      className="text-[9px] font-black text-emerald-700 hover:underline cursor-pointer"
                                    >
                                      {copiedCode === voucher.promoCode ? 'Copied! ✓' : 'Copy Coupon'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {filteredVouchersList.length > 3 && (
                            <button
                              onClick={() => setIsVouchersExpanded(!isVouchersExpanded)}
                              className="w-full py-2.5 px-3 rounded-2xl clay-pill-btn text-xs font-bold text-[#2B124C] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-white active:scale-98 transition-all shadow-2xs"
                            >
                              <span>{isVouchersExpanded ? 'Show Less' : `View All (${filteredVouchersList.length}) Vouchers`}</span>
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. HUB: LIBRARY (Notes & Flashcards, Buy/Sell, Issue Books) */}
        {/* ========================================================= */}
        {hub === 'notes' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Sub-tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'library', label: 'Notes & Flashcards', icon: <BookOpen className="w-4 h-4" /> },
                { id: 'buy_sell', label: 'Buy / Sell Used Books', icon: <ShoppingBag className="w-4 h-4" /> },
                { id: 'issue_books', label: 'Issue Library Books', icon: <Bookmark className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setNotesSubView(tab.id as NotesSubView)}
                  className={`rounded-full px-4 py-2 text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    notesSubView === tab.id ? 'clay-pill-btn-active' : 'clay-pill-btn'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* 2A. NOTES & EMBEDDED FLASHCARDS */}
            {notesSubView === 'library' && (
              <div className="space-y-4">
                <div className="clay-card-warm p-4 space-y-1.5 border-2 border-[#DFB6B2]">
                  <h3 className="font-black text-[15px] text-[#2B124C]">Campus Notes & Interactive Flashcards</h3>
                  <p className="text-xs text-[#854F6C] font-semibold m-0">
                    High-scoring notes vetted by senior toppers. Expand interactive revision flashcards directly inside any subject card!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {NOTES_LIBRARY.map((note) => {
                    const isExpanded = expandedFlashcardNoteId === note.id;
                    return (
                      <div key={note.id} className="clay-card p-4 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#522B5B] bg-[#E2D9F3] px-2.5 py-0.5 rounded-full">
                              #{note.subject}
                            </span>
                            <div className="flex items-center gap-1 text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>{note.rating} ({note.reviews})</span>
                            </div>
                          </div>
                          <h4 className="font-black text-sm text-[#2B124C] leading-snug m-0">{note.title}</h4>
                          <div className="text-[11px] text-[#854F6C] font-semibold">
                            Author: {note.author} ({note.authorYear}) · {note.pages} Pages · {note.downloads} Downloads
                          </div>

                          <div className="bg-[#FFF6F0] p-2.5 rounded-xl border border-[#ECD7CE] space-y-1">
                            <div className="text-[10px] font-black text-[#522B5B]">Key Invariant:</div>
                            <div className="text-[11px] font-mono font-bold text-[#2B124C] truncate">{note.formulas[0]}</div>
                          </div>

                          {/* Embedded Flashcard Drawer */}
                          {isExpanded && (
                            <div className="pt-2 border-t border-[#DFB6B2]/40 space-y-2 animate-pop">
                              <div className="flex items-center justify-between text-[11px] font-bold text-[#854F6C]">
                                <span>Card {flashcardIdx + 1} of {note.flashcards.length}</span>
                                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#DFB6B2]">
                                  {isFlipped ? 'Answer Side' : 'Question Side'}
                                </span>
                              </div>

                              <div
                                onClick={() => setIsFlipped(!isFlipped)}
                                className={`p-4 rounded-xl text-center cursor-pointer min-h-[90px] flex flex-col justify-center border-2 transition-all ${
                                  isFlipped ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-[#DFB6B2]'
                                }`}
                              >
                                {isFlipped ? (
                                  <p className="text-xs font-bold text-emerald-900 leading-snug m-0">
                                    {note.flashcards[flashcardIdx]?.a}
                                  </p>
                                ) : (
                                  <h5 className="text-xs font-black text-[#2B124C] leading-snug m-0">
                                    {note.flashcards[flashcardIdx]?.q}
                                  </h5>
                                )}
                                <span className="text-[9px] text-slate-400 font-bold mt-1 block">Tap to flip 🔄</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  disabled={flashcardIdx === 0}
                                  onClick={() => {
                                    setFlashcardIdx((prev) => Math.max(0, prev - 1));
                                    setIsFlipped(false);
                                  }}
                                  className="flex-1 py-1 text-[10px] font-black clay-pill-btn rounded-lg disabled:opacity-40"
                                >
                                  Prev
                                </button>
                                <button
                                  disabled={flashcardIdx >= note.flashcards.length - 1}
                                  onClick={() => {
                                    setFlashcardIdx((prev) => Math.min(note.flashcards.length - 1, prev + 1));
                                    setIsFlipped(false);
                                  }}
                                  className="flex-1 py-1 text-[10px] font-black clay-pill-btn-active rounded-lg disabled:opacity-40"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-[#DFB6B2]/40">
                          <button
                            onClick={() => {
                              if (expandedFlashcardNoteId === note.id) {
                                setExpandedFlashcardNoteId(null);
                              } else {
                                setExpandedFlashcardNoteId(note.id);
                                setFlashcardIdx(0);
                                setIsFlipped(false);
                              }
                            }}
                            className="w-full clay-pill-btn-active py-2 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                          >
                            <FlipHorizontal className="w-3.5 h-3.5 text-[#DFB6B2]" />
                            <span>{isExpanded ? 'Hide Flashcards' : `Practice Flashcards (${note.flashcards.length} Cards)`}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2B. BUY & SELL USED BOOKS */}
            {notesSubView === 'buy_sell' && (
              <div className="space-y-4">
                <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-black text-[15px] text-[#2B124C]">Buy & Sell Used Engineering Textbooks</h3>
                    <p className="text-xs text-[#854F6C] font-semibold mt-0.5 m-0">
                      Direct peer-to-peer textbook marketplace! Save up to 70% on semester reference books.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSellBookModal(true)}
                    className="clay-pill-btn-active px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <PlusCircle className="w-4 h-4 text-[#DFB6B2]" />
                    <span>Sell a Textbook</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {usedBooks.map((book) => (
                    <div key={book.id} className="clay-card p-4 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-[#522B5B] bg-[#E2D9F3] px-2.5 py-0.5 rounded-full">
                            #{book.subject}
                          </span>
                          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Condition: {book.condition}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="text-3xl p-2 rounded-2xl bg-[#FFF6F0] border border-[#ECD7CE] shrink-0">
                            {book.imageEmoji}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-sm text-[#2B124C] leading-snug m-0">{book.title}</h4>
                            <div className="text-[10px] text-[#854F6C] font-semibold mt-0.5">{book.author}</div>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <div className="text-[10px] font-bold text-slate-500">Seller: <strong className="text-[#2B124C]">{book.sellerName}</strong></div>
                          <div className="text-[10px] font-semibold text-slate-600 truncate">{book.sellerContact}</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#DFB6B2]/40 flex items-center justify-between">
                        <div>
                          <span className="text-base font-black text-emerald-700">₹{book.price}</span>
                          <span className="text-xs text-slate-400 line-through ml-1.5 font-bold">₹{book.originalPrice}</span>
                        </div>
                        <button
                          onClick={() => {
                            showToast(`Contacting seller ${book.sellerName.split(' ')[0]}... WhatsApp invite copied!`);
                          }}
                          className="clay-pill-btn-active px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer hover:scale-105 active:scale-95 transition-all"
                        >
                          Buy / Contact
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2C. ISSUE CENTRAL LIBRARY BOOKS */}
            {notesSubView === 'issue_books' && (
              <div className="space-y-4">
                <div className="clay-card-warm p-5 border-2 border-[#DFB6B2] space-y-2">
                  <h3 className="font-black text-lg sm:text-xl text-[#2B124C]">Central University Library Digital Catalog</h3>
                  <p className="text-sm text-[#854F6C] font-semibold m-0">
                    Check shelf inventory & click "Issue Book" to generate a 14-day digital checkout token for the circulation desk!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {libraryBooks.map((book) => (
                    <div
                      key={book.id}
                      className="rounded-2xl p-6 bg-[#0C1F1F] border border-[#143B3B] space-y-4 flex flex-col justify-between shadow-xl font-sans"
                    >
                      <div className="space-y-3.5">
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-black uppercase tracking-wider text-[#A5B4FC] bg-[#1E1B4B] px-3.5 py-1.5 rounded-full">
                            #{book.subject.toUpperCase()}
                          </span>
                          <span
                            className={`text-sm font-black px-3.5 py-1.5 rounded-full ${
                              book.availableCopies > 0
                                ? 'bg-[#064E3B]/80 text-[#34D399]'
                                : 'bg-rose-950 text-rose-300'
                            }`}
                          >
                            {book.availableCopies > 0
                              ? `${book.availableCopies}/${book.totalCopies} Copies Available`
                              : 'All Copies Issued'}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h4 className="font-black text-lg sm:text-xl text-white leading-snug tracking-tight m-0 font-sans">
                            {book.title}
                          </h4>
                          <div className="text-sm text-slate-300 font-semibold mt-1 font-sans">
                            {book.author} · {book.edition}
                          </div>
                        </div>

                        {/* Shelf Location Pill */}
                        <div className="p-3 rounded-xl bg-[#061515] border border-[#143B3B] text-sm font-semibold text-slate-200 flex items-center gap-2.5">
                          <span className="text-amber-400 text-base">📍</span>
                          <span>{book.shelfLocation}</span>
                        </div>
                      </div>

                      {/* Bottom Row */}
                      <div className="pt-3.5 border-t border-[#143B3B]/60 flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-slate-300 font-sans">
                          14-Day Lending Period
                        </span>
                        <button
                          disabled={book.availableCopies <= 0 && !book.isIssued}
                          onClick={() => handleIssueLibraryBook(book)}
                          className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-black transition-all flex items-center gap-2 shadow-lg font-sans ${
                            book.isIssued
                              ? 'bg-[#10B981] hover:bg-[#059669] text-white cursor-pointer active:scale-95'
                              : book.availableCopies > 0
                              ? 'bg-[#6366F1] hover:bg-[#4F46E5] text-white cursor-pointer active:scale-95'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {book.isIssued ? (
                            <>
                              <span>✓</span>
                              <span>Issued (Slip Active)</span>
                            </>
                          ) : (
                            <span>Issue Book Slip</span>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. HUB: CAMPUS FEED & HACKATHONS                          */}
        {/* ========================================================= */}
        {hub === 'feed' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-base font-black text-[#2B124C] m-0">Verified Campus Contests, Workshops & Hackathons</h2>
                <p className="text-xs text-[#854F6C] font-semibold mt-0.5 m-0">
                  Curated academic events, competitive programming duels, and national technical challenges.
                </p>
              </div>
              <span className="text-xs font-black text-[#522B5B] bg-white px-3 py-1 rounded-full border border-[#DFB6B2]">
                {events.length} Live Opportunities
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((e) => (
                <div key={e.id} className="clay-card p-4 space-y-3 border-2 border-[#ECD7CE] hover:border-[#DFB6B2] transition-all flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3">
                      {e.logoType && <HackathonLogo type={e.logoType} />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide ${e.tagBg} ${e.tagColor}`}>
                            {e.tag}
                          </span>
                          <span className="text-[11px] font-bold text-[#854F6C]">{e.t}</span>
                        </div>
                        <h3 className="font-black text-sm text-[#2B124C] leading-snug m-0">{e.title}</h3>
                        <div className="text-[11px] text-[#854F6C] font-semibold mt-0.5">{e.organizer}</div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#FFF6F0] border border-[#ECD7CE] space-y-1.5 text-xs">
                      <div className="flex items-start gap-1.5 text-[11px]">
                        <span className="font-black text-[#2B124C] shrink-0">🎓 Eligibility:</span>
                        <span className="text-[#522B5B] font-medium">{e.eligibility}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-[11px]">
                        <span className="font-black text-[#2B124C] shrink-0">📍 Where:</span>
                        <span className="text-[#522B5B] font-medium">{e.where}</span>
                      </div>
                      {e.prizePool && (
                        <div className="flex items-start gap-1.5 text-[11px]">
                          <span className="font-black text-[#2B124C] shrink-0">🏆 Prize Pool:</span>
                          <span className="text-[#1B4D3E] font-bold">{e.prizePool}</span>
                        </div>
                      )}
                      {e.deadline && (
                        <div className="flex items-start gap-1.5 text-[11px]">
                          <span className="font-black text-[#2B124C] shrink-0">⏰ Deadline:</span>
                          <span className="text-[#B45309] font-bold">{e.deadline}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#F0D9D0]">
                    <span className="text-xs text-[#854F6C] font-bold"><strong>{e.going}</strong> registered</span>
                    <button
                      onClick={() => showToast(`Registered for ${e.title}! Calendar invite & preparation deck sent!`)}
                      className="clay-pill-btn-active text-xs font-black px-4 py-2 rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. HUB: SPILL (Reddit-style Doubts, HACK Team, Quiz)      */}
        {/* ========================================================= */}
        {hub === 'community' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Sub-tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'doubts', label: 'Spill Doubts (Reddit Convos)', icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'hack_teams', label: 'HACK Team Rosters', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'quiz', label: 'Peer Quiz Arena', icon: <Trophy className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCommunitySubView(tab.id as CommunitySubView)}
                  className={`rounded-full px-4 py-2 text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    communitySubView === tab.id ? 'clay-pill-btn-active' : 'clay-pill-btn'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* 4A. REDDIT-STYLE DOUBTS & THREAD CONVERSATIONS */}
            {communitySubView === 'doubts' && (
              <div className="space-y-4">
                {/* Reddit Community Header */}
                <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
                      r/
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-[#2B124C] m-0">r/CampusLoop Doubts & Academic Spill</h3>
                      <p className="text-[11px] text-[#854F6C] font-semibold mt-0.5 m-0">
                        Threaded discussions, verified peer code solutions & exam question debriefs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {['all', 'DSA', 'OS', 'Java'].map((flair) => (
                      <button
                        key={flair}
                        onClick={() => setRedditFlairFilter(flair)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                          redditFlairFilter === flair ? 'clay-pill-btn-active' : 'clay-pill-btn'
                        }`}
                      >
                        {flair === 'all' ? 'All Flairs' : `r/${flair}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reddit Posts Threads */}
                <div className="space-y-4">
                  {redditPosts
                    .filter((p) => (redditFlairFilter === 'all' ? true : p.subject === redditFlairFilter))
                    .map((post) => (
                      <div key={post.id} className="clay-card p-4 space-y-3 border-2 border-[#ECD7CE]">
                        {/* Post Header with Reddit Flair & Author */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                              r/{post.subject}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Posted by <strong>u/{post.author.toLowerCase().replace(/\s+/g, '_')}</strong> ({post.authorYear}) · {post.time}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">Discussion Thread</span>
                        </div>

                        {/* Title & Body with Left Voting Pillar */}
                        <div className="flex items-start gap-3">
                          {/* Voting Pillar */}
                          <div className="flex flex-col items-center p-1.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
                            <button
                              onClick={() => {
                                setRedditPosts((prev) =>
                                  prev.map((p) =>
                                    p.id === post.id
                                      ? { ...p, hasUpvoted: !p.hasUpvoted, upvotes: p.upvotes + (p.hasUpvoted ? -1 : 1) }
                                      : p
                                  )
                                );
                              }}
                              className={`p-1 rounded-md transition-all cursor-pointer ${
                                post.hasUpvoted ? 'text-orange-600 bg-orange-100' : 'text-slate-500 hover:text-orange-600'
                              }`}
                              title="Upvote"
                            >
                              <ArrowUp className="w-4 h-4 stroke-[3]" />
                            </button>
                            <span className="text-xs font-black text-[#2B124C] my-0.5">{post.upvotes}</span>
                            <button
                              onClick={() => showToast('Downvoted feedback noted.')}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer"
                              title="Downvote"
                            >
                              <ArrowDown className="w-4 h-4 stroke-[3]" />
                            </button>
                          </div>

                          {/* Post Details */}
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <h4 className="font-black text-base text-[#2B124C] leading-snug m-0">{post.title}</h4>
                            <p className="text-xs text-[#522B5B] leading-relaxed font-medium m-0">{post.desc}</p>
                            {post.resourceTitle && (
                              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#2B124C] bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                                <FileText className="w-3 h-3 text-[#522B5B]" />
                                <span>Attached: {post.resourceTitle}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Reddit Nested Replies Thread */}
                        <div className="pl-4 sm:pl-6 border-l-2 border-orange-300 space-y-2 pt-1">
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            {post.replies.length} Comments & Convos
                          </div>
                          {post.replies.map((reply, rIdx) => (
                            <div key={rIdx} className="p-3 rounded-2xl bg-white border border-[#DFB6B2]/60 space-y-1 shadow-2xs">
                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-black text-[#2B124C]">u/{reply.author.toLowerCase().replace(/\s+/g, '_')}</span>
                                  {reply.isVerifiedHelpful && (
                                    <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                                      ✓ Verified Solution
                                    </span>
                                  )}
                                </div>
                                <span className="text-[9px] text-slate-400">{reply.time}</span>
                              </div>
                              <p className="text-xs text-[#522B5B] leading-relaxed m-0">{reply.text}</p>
                            </div>
                          ))}
                        </div>

                        {/* Reply / Comment Box */}
                        <div className="flex items-center gap-2 pt-2 border-t border-[#DFB6B2]/40">
                          <input
                            type="text"
                            value={redditCommentInputs[post.id] || ''}
                            onChange={(e) =>
                              setRedditCommentInputs({ ...redditCommentInputs, [post.id]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const text = (redditCommentInputs[post.id] || '').trim();
                                if (!text) return;
                                setRedditPosts((prev) =>
                                  prev.map((p) =>
                                    p.id === post.id
                                      ? {
                                          ...p,
                                          replies: [
                                            ...p.replies,
                                            { author: userProfile.name, text, time: 'Just now', isVerifiedHelpful: false },
                                          ],
                                        }
                                      : p
                                  )
                                );
                                setRedditCommentInputs({ ...redditCommentInputs, [post.id]: '' });
                                showToast('Comment posted to Reddit thread!');
                              }
                            }}
                            placeholder="Add your explanation or reply to thread..."
                            className="flex-1 px-3 py-2 text-xs rounded-xl clay-inset-box text-[#2B124C] focus:outline-none"
                          />
                          <button
                            onClick={() => {
                              const text = (redditCommentInputs[post.id] || '').trim();
                              if (!text) return;
                              setRedditPosts((prev) =>
                                prev.map((p) =>
                                  p.id === post.id
                                    ? {
                                        ...p,
                                        replies: [
                                          ...p.replies,
                                          { author: userProfile.name, text, time: 'Just now', isVerifiedHelpful: false },
                                        ],
                                      }
                                    : p
                                )
                              );
                              setRedditCommentInputs({ ...redditCommentInputs, [post.id]: '' });
                              showToast('Comment posted to Reddit thread!');
                            }}
                            className="clay-pill-btn-active px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer shadow-xs active:scale-95"
                          >
                            Comment
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 4B. HACK TEAM (Two Panels: Join Teams & Post a Team) */}
            {communitySubView === 'hack_teams' && (
              <div className="space-y-4">
                {/* Panel Switcher */}
                <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-black text-[15px] text-[#2B124C]">HACK Team Roster & Recruitment Board</h3>
                    <p className="text-xs text-[#854F6C] font-semibold mt-0.5 m-0">
                      Find vacant spots in top national hackathon teams (SIH, GRiD, TCS-iON) or post your own roster!
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setHackTeamTab('join')}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                        hackTeamTab === 'join' ? 'clay-pill-btn-active' : 'clay-pill-btn'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Join Teams</span>
                    </button>
                    <button
                      onClick={() => setHackTeamTab('post')}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                        hackTeamTab === 'post' ? 'clay-pill-btn-active' : 'clay-pill-btn'
                      }`}
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Post a Team</span>
                    </button>
                  </div>
                </div>

                {/* PANEL 1: JOIN TEAMS */}
                {hackTeamTab === 'join' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teams.map((t) => {
                      const spotsLeft = t.maxMembers - t.membersCount;
                      return (
                        <div key={t.id} className="clay-card p-4 space-y-3 border-2 border-[#ECD7CE] hover:border-[#DFB6B2] transition-all flex flex-col justify-between">
                          <div className="space-y-2.5">
                            <div className="flex items-start gap-3">
                              <HackathonLogo type={t.logoType} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-[10px] font-black uppercase text-[#522B5B] bg-[#E2D9F3] px-2.5 py-0.5 rounded-full">
                                    {t.event}
                                  </span>
                                  {/* Member Vacancy Count & Tag */}
                                  <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                                    spotsLeft <= 1 ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {t.membersCount}/{t.maxMembers} Members ({spotsLeft} Spot{spotsLeft > 1 ? 's' : ''} Left!)
                                  </span>
                                </div>
                                <h4 className="font-black text-sm text-[#2B124C] leading-snug m-0">{t.hackathonName}</h4>
                                <div className="text-[11px] font-extrabold text-[#522B5B] mt-0.5">Project: {t.title}</div>
                              </div>
                            </div>

                            <p className="text-xs text-[#854F6C] font-medium leading-relaxed m-0">{t.desc}</p>

                            <div className="p-2.5 rounded-xl bg-[#FFF6F0] border border-[#ECD7CE] space-y-1 text-xs">
                              <div className="flex items-start gap-1.5 text-[11px]">
                                <span className="font-black text-[#2B124C] shrink-0">🎓 Eligibility:</span>
                                <span className="text-[#522B5B] font-medium">{t.eligibility}</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-[11px]">
                                <span className="font-black text-[#2B124C] shrink-0">📍 Location:</span>
                                <span className="text-[#522B5B] font-medium">{t.location}</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-[11px]">
                                <span className="font-black text-[#2B124C] shrink-0">🏆 Prize & Perks:</span>
                                <span className="text-[#1B4D3E] font-bold">{t.prizePool}</span>
                              </div>
                              <div className="flex items-start gap-1.5 text-[11px]">
                                <span className="font-black text-[#2B124C] shrink-0">⏰ Deadline:</span>
                                <span className="text-[#B45309] font-bold">{t.deadline}</span>
                              </div>
                            </div>

                            {/* Roles Needed */}
                            <div className="space-y-1.5 pt-1 border-t border-[#F0D9D0]">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-[#854F6C] tracking-wider">
                                  ROLES NEEDED NOW:
                                </span>
                                <span className="text-[10px] text-[#854F6C] font-semibold">Lead: {t.creator}</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {t.rolesNeeded.map((role) => {
                                  const isApplied = t.appliedRoles?.includes(role) || t.applied;
                                  return (
                                    <button
                                      key={role}
                                      onClick={() => {
                                        setTeams(
                                          teams.map((x) =>
                                            x.id === t.id
                                              ? { ...x, appliedRoles: [...(x.appliedRoles || []), role], applied: true }
                                              : x
                                          )
                                        );
                                        showToast(`Applied for ${role} role in ${t.hackathonName}! Lead notified 🚀`);
                                      }}
                                      className={`text-[10px] font-black px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                                        isApplied ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-[#FBE4D8] text-[#522B5B] hover:bg-[#DFB6B2]'
                                      }`}
                                    >
                                      {isApplied ? `✓ Applied: ${role}` : `+ Apply as ${role}`}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#DFB6B2]/40 flex items-center justify-between">
                            <span className="text-xs text-slate-500 font-bold">{spotsLeft} Vacancies Available</span>
                            <button
                              onClick={() => {
                                showToast(`Application sent to team lead ${t.creator}! They will message you.`);
                              }}
                              className="clay-pill-btn-active text-xs font-black px-4 py-1.5 rounded-xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
                            >
                              Request to Join Team
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* PANEL 2: POST A TEAM */}
                {hackTeamTab === 'post' && (
                  <div className="clay-card p-5 max-w-2xl mx-auto space-y-4">
                    <div className="border-b border-[#DFB6B2]/40 pb-2">
                      <h3 className="font-black text-base text-[#2B124C] m-0">Post a New Hackathon Team Roster</h3>
                      <p className="text-xs text-[#854F6C] font-semibold mt-0.5 m-0">
                        Looking for teammates? Post your team details, and eligible college peers can apply directly!
                      </p>
                    </div>

                    <form onSubmit={handlePostHackTeam} className="space-y-3.5">
                      <div>
                        <label className="text-xs font-black text-[#2B124C] block mb-1">Target Hackathon Name</label>
                        <select
                          value={postTeamHackathon}
                          onChange={(e) => setPostTeamHackathon(e.target.value)}
                          className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
                        >
                          <option value="Smart India Hackathon 2026 (SIH)">Smart India Hackathon 2026 (SIH)</option>
                          <option value="TCS-iON Digital Ninja Challenge">TCS-iON Digital Ninja Challenge</option>
                          <option value="Flipkart GRiD 7.0 - Robotics & Tech">Flipkart GRiD 7.0 - Robotics & Tech</option>
                          <option value="Google Solution Challenge 2026">Google Solution Challenge 2026</option>
                          <option value="ETHIndia 2026 Web3 Hackathon">ETHIndia 2026 Web3 Hackathon</option>
                          <option value="Microsoft Imagine Cup 2026">Microsoft Imagine Cup 2026</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-black text-[#2B124C] block mb-1">Project Name & One-Liner Title</label>
                        <input
                          type="text"
                          required
                          value={postTeamTitle}
                          onChange={(e) => setPostTeamTitle(e.target.value)}
                          placeholder="e.g. HealthBridge: AI Triage & Rural Telemedicine"
                          className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-black text-[#2B124C] block mb-1">Project Description & Problem Statement</label>
                        <textarea
                          rows={3}
                          required
                          value={postTeamDesc}
                          onChange={(e) => setPostTeamDesc(e.target.value)}
                          placeholder="Briefly describe what you are building and tech stack..."
                          className="w-full text-xs font-medium text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-black text-[#2B124C] block mb-1">Current Members Count</label>
                          <input
                            type="number"
                            min={1}
                            max={6}
                            value={postTeamMembers}
                            onChange={(e) => setPostTeamMembers(Number(e.target.value))}
                            className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-black text-[#2B124C] block mb-1">Max Team Size</label>
                          <input
                            type="number"
                            min={2}
                            max={6}
                            value={postTeamMax}
                            onChange={(e) => setPostTeamMax(Number(e.target.value))}
                            className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-black text-[#2B124C] block mb-1">Roles Needed (comma separated)</label>
                        <input
                          type="text"
                          value={postTeamRoles}
                          onChange={(e) => setPostTeamRoles(e.target.value)}
                          placeholder="e.g. Flutter Dev, Python Backend, UI/UX Designer"
                          className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2.5 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full clay-pill-btn-active py-3 rounded-xl font-black text-xs cursor-pointer shadow-md hover:scale-102 active:scale-98 transition-all"
                      >
                        Publish Team Roster to HACK Board 🚀
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* 4C. QUIZ ARENA */}
            {communitySubView === 'quiz' && (
              <div className="clay-card-purple text-white p-5 space-y-3 relative overflow-hidden max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-[#DFB6B2] bg-white/20 p-0.5">
                    <img src={trophyMascot} alt="Trophy" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <div>
                    <h3 className="font-black text-base text-white m-0">Live Peer Quiz Arena</h3>
                    <p className="text-xs text-[#DFB6B2] mt-0.5 mb-0 font-medium">
                      Compete 1v1 in 5-minute timed battles to earn study points!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Matchmaking arena: Aarav and Riya challenged! Starting in 5s...')}
                  className="w-full clay-pill-btn-active py-3 rounded-2xl font-black text-xs cursor-pointer"
                >
                  Find 1v1 Battle Opponent
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. HUB: PROFILE (Snapshot, LeetCode Modal, Buddies, Perks) */}
        {/* ========================================================= */}
        {hub === 'profile' && (
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 items-start animate-fadeIn">
            {/* Left Column: Top Profile Card & Snapshot */}
            <div className="lg:col-span-5 space-y-4">
              <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] text-center relative overflow-hidden shadow-lg">
                <div className="relative inline-block mx-auto mt-1 mb-1">
                  <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#FF5E62] via-[#DFB6B2] to-[#854F6C] shadow-xl">
                    <div className="w-full h-full rounded-full bg-[#190019] border-2 border-white flex items-center justify-center overflow-hidden">
                      <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover p-1.5" />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowEditProfileModal(true)}
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#522B5B] text-white border-2 border-white flex items-center justify-center shadow-md text-xs hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    title="Change Cartoon Avatar"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <h2 className="text-xl font-black text-[#2B124C] m-0 leading-tight">{userProfile.name}</h2>
                  <div className="w-4 h-4 rounded-full bg-[#0095F6] flex items-center justify-center text-white text-[10px] font-black shadow-2xs">
                    ✓
                  </div>
                </div>

                <span className="text-xs font-bold text-[#854F6C] block mt-1">
                  {userProfile.username} · {userProfile.year}
                </span>
                <p className="text-[11px] font-extrabold text-[#522B5B] mt-0.5 flex items-center justify-center gap-1">
                  <span>🎓</span>
                  <span>{userProfile.college}</span>
                </p>

                {/* 3-Column Clickable Stats: LeetCode -> ID, Buddies -> Profile, Vouchers -> Vouchers */}
                <div className="flex items-center justify-around py-3.5 mt-3 border-y border-[#DFB6B2]/50 text-center">
                  {/* Click LeetCode Stat -> Opens LeetCode ID & Contest Rating Modal */}
                  <div
                    onClick={() => setShowLeetCodeModal(true)}
                    className="cursor-pointer group p-1 rounded-xl hover:bg-amber-50 transition-all"
                    title="Click to view LeetCode ID and Contest stats"
                  >
                    <div className="text-xl font-black text-[#2B124C] leading-none group-hover:text-amber-600 transition-colors">
                      {userProfile.leetcodeSolved}
                    </div>
                    <div className="text-[10px] font-black uppercase text-[#854F6C] tracking-wider mt-1 group-hover:text-amber-700">
                      LeetCode ↗
                    </div>
                  </div>

                  <div className="h-8 w-px bg-[#DFB6B2]/70" />

                  {/* Click Buddies Stat -> Opens Buddies Profiles Modal */}
                  <div
                    onClick={() => setShowRemoveBuddyModal(true)}
                    className="cursor-pointer group p-1 rounded-xl hover:bg-rose-50 transition-all"
                    title="Click to view connected buddies"
                  >
                    <div className="text-xl font-black text-[#2B124C] leading-none group-hover:text-rose-600 transition-colors">
                      {peersList.filter((p) => p.isConnected).length}
                    </div>
                    <div className="text-[10px] font-black uppercase text-[#854F6C] tracking-wider mt-1 group-hover:text-rose-600">
                      Buddies 👥
                    </div>
                  </div>

                  <div className="h-8 w-px bg-[#DFB6B2]/70" />

                  {/* Click Vouchers Stat -> Opens Vouchers Wallet Modal */}
                  <div
                    onClick={() => setShowVouchersModal(true)}
                    className="cursor-pointer group p-1 rounded-xl hover:bg-emerald-50 transition-all"
                    title="Click to view unlocked vouchers & coupon codes"
                  >
                    <div className="text-xl font-black text-[#2B124C] leading-none group-hover:text-emerald-600 transition-colors">
                      {claimedVouchers.length + 3}
                    </div>
                    <div className="text-[10px] font-black uppercase text-[#854F6C] tracking-wider mt-1 group-hover:text-emerald-700">
                      Vouchers 🎟️
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => setShowEditProfileModal(true)}
                    className="flex-1 py-2 rounded-xl bg-white border border-[#DFB6B2] text-[#2B124C] font-black text-xs hover:bg-slate-50 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => setShowRemoveBuddyModal(true)}
                    className="flex-1 py-2 rounded-xl bg-white border border-[#DFB6B2] text-[#2B124C] font-black text-xs hover:bg-slate-50 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <UserX className="w-3.5 h-3.5 text-rose-500" />
                    <span>Remove Buddy</span>
                  </button>
                </div>

                {/* Renamed Heading to "Snapshot" */}
                <div className="mt-3 bg-white/70 p-3 rounded-2xl border border-white text-left">
                  <span className="text-[10px] font-black uppercase text-[#854F6C] block">Snapshot</span>
                  <p className="text-xs font-semibold text-[#2B124C] mt-1 leading-relaxed m-0">
                    {userProfile.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: LeetCode Details, Vouchers & Buddies */}
            <div className="lg:col-span-7 space-y-4">
              {/* LeetCode Card */}
              <div
                onClick={() => setShowLeetCodeModal(true)}
                className="clay-card p-4 space-y-3 cursor-pointer hover:border-amber-400 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-base">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-[#2B124C] m-0">LeetCode Solved Problems</h3>
                      <span className="text-[10px] text-[#854F6C] font-semibold">
                        ID: @rahul_dtu_coder · Rating: {userProfile.contestRating} ({userProfile.globalRank})
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                    {userProfile.leetcodeSolved} / 500
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                  <div style={{ width: '37.5%' }} className="bg-emerald-500 h-full" title="Easy: 180" />
                  <div style={{ width: '50%' }} className="bg-amber-500 h-full" title="Medium: 240" />
                  <div style={{ width: '12.5%' }} className="bg-rose-500 h-full" title="Hard: 60" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <div className="text-xs font-black text-emerald-800">{userProfile.leetcodeEasy}</div>
                    <div className="text-[9px] font-bold text-emerald-600">Easy</div>
                  </div>
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="text-xs font-black text-amber-800">{userProfile.leetcodeMed}</div>
                    <div className="text-[9px] font-bold text-amber-600">Medium</div>
                  </div>
                  <div className="p-2 rounded-xl bg-rose-50 border border-rose-200">
                    <div className="text-xs font-black text-rose-800">{userProfile.leetcodeHard}</div>
                    <div className="text-[9px] font-bold text-rose-600">Hard</div>
                  </div>
                </div>
              </div>

              {/* Vouchers Earned */}
              <div className="clay-card-warm p-4 border-2 border-[#DFB6B2] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-[#522B5B]" />
                    <h3 className="font-black text-xs text-[#2B124C] m-0">Vouchers & Perks Earned</h3>
                  </div>
                  <button
                    onClick={() => setShowVouchersModal(true)}
                    className="text-[10px] font-black text-[#522B5B] hover:underline cursor-pointer"
                  >
                    View All ({claimedVouchers.length + 3}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div onClick={() => setShowVouchersModal(true)} className="clay-card p-2.5 flex items-center gap-2 cursor-pointer">
                    <VoucherBrandLogo brand="starbucks" emoji="☕" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-black text-[#2B124C] truncate">Starbucks 40% Off</div>
                      <div className="text-[9px] font-mono text-emerald-700 font-bold">STARBUCKS-JAVA40</div>
                    </div>
                  </div>
                  <div onClick={() => setShowVouchersModal(true)} className="clay-card p-2.5 flex items-center gap-2 cursor-pointer">
                    <VoucherBrandLogo brand="spotify" emoji="🎵" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-black text-[#2B124C] truncate">Spotify Student</div>
                      <div className="text-[9px] font-mono text-emerald-700 font-bold">SPOTIFY-LOFI-PASS</div>
                    </div>
                  </div>
                  <div onClick={() => setShowVouchersModal(true)} className="clay-card p-2.5 flex items-center gap-2 cursor-pointer">
                    <VoucherBrandLogo brand="epson" emoji="🖨️" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-black text-[#2B124C] truncate">Epson 50 Free Pages</div>
                      <div className="text-[9px] font-mono text-emerald-700 font-bold">EPSON-PRINT-FREE50</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connected Study Buddies */}
              <div className="clay-card p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#522B5B]" />
                    <h3 className="font-black text-xs text-[#2B124C] m-0">Connected Study Buddies</h3>
                  </div>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {peersList.filter((p) => p.isConnected).length} Connected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {peersList
                    .filter((p) => p.isConnected)
                    .map((peer) => (
                      <div key={peer.id} className="p-2.5 rounded-xl bg-white border border-[#DFB6B2] flex items-center justify-between gap-2.5">
                        <div
                          onClick={() => setViewingPeerProfile(peer)}
                          className="flex items-center gap-2 min-w-0 cursor-pointer group/buddy"
                        >
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                            <img src="/assets/aistudio/image_1310e48c.png" alt={peer.n} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-black text-xs text-[#2B124C] group-hover/buddy:text-[#854F6C] transition-colors truncate">{peer.n}</span>
                              <CheckCircle2 className="w-3 h-3 text-sky-500 fill-sky-100 shrink-0" />
                            </div>
                            <span className="text-[10px] text-[#854F6C] block truncate">
                              #{peer.sk[0]} · {peer.college.split('(')[0]}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setActiveDmPeer(peer);
                              setShowDirectMessagesModal(true);
                            }}
                            className="clay-pill-btn-active text-[10px] font-black px-2.5 py-1 rounded-lg cursor-pointer"
                          >
                            Chat
                          </button>
                          <button
                            onClick={() => {
                              setPeersList((prev) => prev.map((p) => (p.id === peer.id ? { ...p, isConnected: false } : p)));
                              showToast(`Removed ${peer.n.split(' ')[0]} from study buddies.`);
                            }}
                            className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 cursor-pointer"
                            title={`Remove ${peer.n}`}
                          >
                            <UserX className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating 3D Clay Toast */}
      {toastMessage && (
        <div className="fixed left-4 right-4 bottom-20 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-pop pointer-events-none">
          <div className="clay-card-purple text-white text-xs font-bold px-4 py-3 shadow-2xl flex items-center gap-2.5 border border-[#DFB6B2]/40 rounded-2xl pointer-events-auto">
            <span className="text-base">🚀</span>
            <span className="flex-1 leading-snug">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* 5-Hub Bottom Navigation Bar: visible on mobile screens or in Phone View mode */}
      <nav className={`px-3 pb-3 pt-1 shrink-0 z-40 bg-[#FBE4D8]/95 backdrop-blur-md ${viewMode === 'desktop' ? 'md:hidden' : 'block'}`}>
        <div className="clay-card py-1.5 px-2 flex items-center justify-between shadow-lg">
          <button
            onClick={() => setHub('study')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-2xl cursor-pointer transition-all ${
              hub === 'study' ? 'scale-105' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`w-10 h-7 rounded-xl flex items-center justify-center mb-0.5 text-sm transition-all ${hub === 'study' ? 'clay-pill-btn-active' : ''}`}>
              <img
                src="/assets/aistudio/image_521f80c6.png"
                alt="Study"
                className={`w-5 h-5 object-contain ${hub === 'study' ? 'brightness-0 invert' : ''}`}
              />
            </div>
            <span className={`text-[10px] font-black ${hub === 'study' ? 'text-[#2B124C]' : 'text-[#854F6C]'}`}>
              Study
            </span>
          </button>

          <button
            onClick={() => setHub('notes')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-2xl cursor-pointer transition-all ${
              hub === 'notes' ? 'scale-105' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`w-10 h-7 rounded-xl flex items-center justify-center mb-0.5 text-sm transition-all ${hub === 'notes' ? 'clay-pill-btn-active' : ''}`}>
              <img
                src="/assets/aistudio/image_2d166a70.png"
                alt="Library"
                className={`w-5 h-5 object-contain ${hub === 'notes' ? 'brightness-0 invert' : ''}`}
              />
            </div>
            <span className={`text-[10px] font-black ${hub === 'notes' ? 'text-[#2B124C]' : 'text-[#854F6C]'}`}>
              Library
            </span>
          </button>

          {/* Feed Button: dark black circle with white plus icon as requested */}
          <button
            onClick={() => setHub('feed')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-2xl cursor-pointer transition-all ${
              hub === 'feed' ? 'scale-110' : 'opacity-90 hover:opacity-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-black border-2 border-white flex items-center justify-center text-white shadow-md mb-0.5">
              <Plus className="w-5 h-5 stroke-[3]" />
            </div>
            <span className={`text-[10px] font-black ${hub === 'feed' ? 'text-black' : 'text-[#854F6C]'}`}>
              Feed
            </span>
          </button>

          {/* Renamed to Spill */}
          <button
            onClick={() => setHub('community')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-2xl cursor-pointer transition-all ${
              hub === 'community' ? 'scale-105' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`w-10 h-7 rounded-xl flex items-center justify-center mb-0.5 text-sm transition-all ${hub === 'community' ? 'clay-pill-btn-active' : ''}`}>
              💬
            </div>
            <span className={`text-[10px] font-black ${hub === 'community' ? 'text-[#2B124C]' : 'text-[#854F6C]'}`}>
              Spill
            </span>
          </button>

          <button
            onClick={() => setHub('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-1 rounded-2xl cursor-pointer transition-all ${
              hub === 'profile' ? 'scale-105' : 'opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`w-10 h-7 rounded-xl flex items-center justify-center mb-0.5 text-sm transition-all ${hub === 'profile' ? 'clay-pill-btn-active' : ''}`}>
              👤
            </div>
            <span className={`text-[10px] font-black ${hub === 'profile' ? 'text-[#2B124C]' : 'text-[#854F6C]'}`}>
              Profile
            </span>
          </button>
        </div>
      </nav>

      {/* ============================================================= */}
      {/* MODALS & POPUPS                                               */}
      {/* ============================================================= */}

      {/* 1. LEETCODE ID & CONTEST STATS MODAL */}
      {showLeetCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-5 w-full max-w-sm border-2 border-[#DFB6B2] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h3 className="font-black text-base text-[#2B124C] m-0">LeetCode Profile & ID</h3>
              </div>
              <button
                onClick={() => setShowLeetCodeModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#DFB6B2] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400">LEETCODE USER ID</span>
                  <div className="font-mono font-black text-sm text-[#2B124C]">@rahul_dtu_coder</div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText?.('https://leetcode.com/u/rahul_dtu_coder');
                    showToast('Copied LeetCode profile link!');
                  }}
                  className="clay-pill-btn text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-bold">Contest Rating:</span>
                <span className="font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {userProfile.contestRating} (Knight ⚔️)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold">Global Ranking:</span>
                <span className="font-black text-[#2B124C]">{userProfile.globalRank}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-[#854F6C] block">Problem Solve Breakdown</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-base font-black text-emerald-800">{userProfile.leetcodeEasy}</div>
                  <div className="text-[9px] font-bold text-emerald-600">Easy Solved</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="text-base font-black text-amber-800">{userProfile.leetcodeMed}</div>
                  <div className="text-[9px] font-bold text-amber-600">Medium Solved</div>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
                  <div className="text-base font-black text-rose-800">{userProfile.leetcodeHard}</div>
                  <div className="text-[9px] font-bold text-rose-600">Hard Solved</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowLeetCodeModal(false)}
              className="w-full clay-pill-btn-active py-2.5 rounded-xl font-black text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 2. CREATE MEETING ROOM MODAL */}
      {showCreateRoomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-5 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#522B5B]" />
                <h3 className="font-black text-base text-[#2B124C] m-0">Create Study Room</h3>
              </div>
              <button
                onClick={() => setShowCreateRoomModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateMeetingRoom} className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Room Name</label>
                <input
                  type="text"
                  required
                  value={createRoomName}
                  onChange={(e) => setCreateRoomName(e.target.value)}
                  placeholder="e.g. Graph BFS & Dijkstra Pod"
                  className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Subject</label>
                <select
                  value={createRoomSubject}
                  onChange={(e) => setCreateRoomSubject(e.target.value as SubjectType)}
                  className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2.5 focus:outline-none"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Specific Topic</label>
                <input
                  type="text"
                  value={createRoomTopic}
                  onChange={(e) => setCreateRoomTopic(e.target.value)}
                  placeholder="e.g. Solving LeetCode 200 Number of Islands"
                  className="w-full text-xs font-medium text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Sprint Duration</label>
                <select
                  value={createRoomDuration}
                  onChange={(e) => setCreateRoomDuration(e.target.value)}
                  className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                >
                  <option value="30 mins sprint">30 mins sprint</option>
                  <option value="45 mins sprint">45 mins sprint</option>
                  <option value="60 mins sprint">60 mins sprint</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full clay-pill-btn-active py-3 rounded-xl font-black text-xs cursor-pointer shadow-md mt-2"
              >
                Launch Room & Join Call 🚀
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. SELL A BOOK MODAL */}
      {showSellBookModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-5 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#522B5B]" />
                <h3 className="font-black text-base text-[#2B124C] m-0">Sell a Textbook</h3>
              </div>
              <button
                onClick={() => setShowSellBookModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleListBookForSale} className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Book Title & Edition</label>
                <input
                  type="text"
                  required
                  value={sellBookTitle}
                  onChange={(e) => setSellBookTitle(e.target.value)}
                  placeholder="e.g. Fundamentals of Database Systems"
                  className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Subject</label>
                  <select
                    value={sellBookSubject}
                    onChange={(e) => setSellBookSubject(e.target.value as SubjectType)}
                    className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-2 py-2 focus:outline-none"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Condition</label>
                  <select
                    value={sellBookCondition}
                    onChange={(e) => setSellBookCondition(e.target.value as any)}
                    className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-2 py-2 focus:outline-none"
                  >
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Highlighted">Highlighted</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={sellBookPrice}
                    onChange={(e) => setSellBookPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={sellBookOriginalPrice}
                    onChange={(e) => setSellBookOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Pickup Location / WhatsApp</label>
                <input
                  type="text"
                  value={sellBookContact}
                  onChange={(e) => setSellBookContact(e.target.value)}
                  className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full clay-pill-btn-active py-2.5 rounded-xl font-black text-xs cursor-pointer shadow-md mt-1"
              >
                List Book on Marketplace 📖
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. DIGITAL LIBRARY ISSUE SLIP MODAL */}
      {issuedSlip && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-5 w-full max-w-sm border-2 border-emerald-400 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-emerald-700" />
                <h3 className="font-black text-base text-[#2B124C] m-0">Library Checkout Pass</h3>
              </div>
              <button
                onClick={() => setIssuedSlip(null)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-emerald-300 space-y-2 text-center shadow-xs">
              <div className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                DIGITAL ISSUE TOKEN
              </div>
              <div className="font-mono font-black text-xl text-[#2B124C] py-1 bg-emerald-50 rounded-xl border border-emerald-200">
                {issuedSlip.token}
              </div>
              <p className="text-xs font-black text-[#2B124C] m-0 pt-1">{issuedSlip.book.title}</p>
              <div className="text-[10px] text-[#854F6C] font-semibold">{issuedSlip.book.author}</div>
              <div className="text-[10px] text-amber-800 font-bold bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                Shelf: {issuedSlip.book.shelfLocation}
              </div>
              <div className="text-[11px] font-bold text-slate-500 pt-1">
                Due Date: <strong className="text-emerald-700">{issuedSlip.returnDate}</strong>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center m-0">
              Present this token to the library desk to collect your physical copy.
            </p>

            <button
              onClick={() => setIssuedSlip(null)}
              className="w-full clay-pill-btn-active py-2.5 rounded-xl font-black text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 5. VOUCHERS WALLET MODAL */}
      {showVouchersModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-5 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3.5 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#522B5B]" />
                <h3 className="font-black text-sm text-[#2B124C]">My Campus Vouchers</h3>
              </div>
              <button
                onClick={() => setShowVouchersModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#854F6C] font-semibold m-0">
              Show these voucher promo codes at the campus canteen, bookstore, or print shop!
            </p>
            <div className="space-y-2.5">
              {claimedVouchers.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-white border-2 border-emerald-300 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.voucher.iconEmoji}</span>
                      <div>
                        <div className="font-black text-xs text-[#2B124C]">{item.voucher.title}</div>
                        <div className="text-[10px] text-[#854F6C] font-semibold">{item.voucher.partner}</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {item.voucher.discount}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] font-bold text-slate-400">PROMO CODE</div>
                      <div className="font-mono font-black text-xs text-[#2B124C]">{item.voucher.promoCode}</div>
                    </div>
                    <button
                      onClick={() => copyVoucherCode(item.voucher.promoCode)}
                      className="clay-pill-btn-active text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedCode === item.voucher.promoCode ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-bold text-[#854F6C]">
                    <span>{item.voucher.validity}</span>
                    <span>Claimed {item.claimedAt}</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowVouchersModal(false)}
              className="w-full py-2.5 rounded-xl clay-pill-btn-active font-black text-xs cursor-pointer"
            >
              Back to Study
            </button>
          </div>
        </div>
      )}

      {/* 6. INSTAGRAM-STYLE STORY VIEWER MODAL */}
      {activeStoryPeer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-4 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3.5 relative overflow-hidden shadow-2xl">
            <div className="w-full h-1 bg-white/40 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full w-4/5 animate-pulse" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#FF5E62] via-[#FF9966] to-[#854F6C]">
                  <div className={`w-full h-full rounded-full ${activeStoryPeer.avatarBg} border-2 border-white flex items-center justify-center text-xl`}>
                    {activeStoryPeer.avatarEmoji}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-black text-sm text-[#2B124C]">{activeStoryPeer.n}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-100" />
                  </div>
                  <span className="text-[10px] text-[#854F6C] font-semibold block">
                    {activeStoryPeer.username} · {activeStoryPeer.activeStory?.timeLeft || 'Live'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveStoryPeer(null)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#2B124C] to-[#522B5B] text-white p-4 rounded-2xl space-y-2.5 shadow-inner border border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-[#DFB6B2] bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span>{activeStoryPeer.activeStory?.statusBadge || 'Library 📚'}</span>
                </span>
                <span className="text-[10px] font-bold text-[#FBE4D8]">
                  {activeStoryPeer.college.split('(')[0]}
                </span>
              </div>
              <h3 className="font-black text-base text-white leading-snug m-0">
                {activeStoryPeer.activeStory?.topic || activeStoryPeer.activity}
              </h3>
              <p className="text-xs text-[#DFB6B2] font-medium leading-relaxed m-0 italic bg-white/10 p-2.5 rounded-xl border border-white/10">
                "{activeStoryPeer.quote}"
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: '🔥 Keep Going!', msg: `Cheered on ${activeStoryPeer.n.split(' ')[0]} with 🔥!` },
                { label: '☕ Coffee Cheer', msg: `Sent virtual coffee to ${activeStoryPeer.n.split(' ')[0]}!` },
                { label: '🎧 Join Pod', msg: `Requested study pod with ${activeStoryPeer.n.split(' ')[0]}!` },
              ].map((cheer) => (
                <button
                  key={cheer.label}
                  onClick={() => {
                    showToast(cheer.msg);
                    setActiveStoryPeer(null);
                  }}
                  className="clay-card py-2 px-1 text-[10px] font-black text-[#2B124C] hover:bg-white active:scale-95 transition-all text-center cursor-pointer"
                >
                  {cheer.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. DIRECT MESSAGES / CHAT MODAL */}
      {showDirectMessagesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-4 w-full max-w-sm sm:max-w-md border-2 border-[#DFB6B2] space-y-3 max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2 shrink-0">
              <div className="flex items-center gap-2">
                {activeDmPeer && (
                  <button
                    onClick={() => setActiveDmPeer(null)}
                    className="p-1 rounded-lg text-[#2B124C] hover:bg-black/5 cursor-pointer font-black text-sm"
                  >
                    ←
                  </button>
                )}
                <div>
                  <h3 className="font-black text-base text-[#2B124C] m-0 leading-none">
                    {activeDmPeer ? activeDmPeer.n : 'Campus Buddies Chat'}
                  </h3>
                  <span className="text-[10px] text-[#854F6C] font-semibold block mt-0.5">
                    {activeDmPeer ? `${activeDmPeer.username} · Online` : 'Direct Messages with study partners'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowDirectMessagesModal(false);
                  setActiveDmPeer(null);
                }}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {!activeDmPeer ? (
              <div className="space-y-2 overflow-y-auto flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search campus buddies..."
                    className="w-full text-xs font-medium text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#854F6C] absolute left-3 top-2.5" />
                </div>
                <div className="space-y-1.5 pt-1">
                  {peersList.map((peer) => {
                    const peerThreads = dmThreads[peer.id] || [
                      { sender: peer.n, text: `Hey! Studying ${peer.sk[0]} right now.`, time: 'Recently' },
                    ];
                    const lastMsg = peerThreads[peerThreads.length - 1];
                    return (
                      <div
                        key={peer.id}
                        onClick={() => setActiveDmPeer(peer)}
                        className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-[#DFB6B2] flex items-center gap-3 cursor-pointer transition-all active:scale-98"
                      >
                        <div className="relative">
                          <div className={`w-11 h-11 rounded-full ${peer.avatarBg} flex items-center justify-center text-xl border-2 border-[#DFB6B2]`}>
                            {peer.avatarEmoji}
                          </div>
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-xs text-[#2B124C] truncate">{peer.n}</span>
                            <span className="text-[9px] text-[#854F6C] font-semibold">{lastMsg.time}</span>
                          </div>
                          <p className="text-[11px] text-[#854F6C] font-medium truncate m-0">
                            {lastMsg.sender === 'You' ? 'You: ' : ''}{lastMsg.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-1 space-y-3">
                <div className="p-2.5 rounded-xl bg-white border border-[#DFB6B2] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{activeDmPeer.avatarEmoji}</span>
                    <div>
                      <div className="text-xs font-black text-[#2B124C]">{activeDmPeer.college.split('(')[0]}</div>
                      <div className="text-[10px] text-[#854F6C] font-semibold">Specialty: #{activeDmPeer.sk.join(' #')}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowDirectMessagesModal(false);
                      const callRoom: MeetingRoom = {
                        id: `dm-pod-${activeDmPeer.id}`,
                        name: `Private Pod with ${activeDmPeer.n.split(' ')[0]}`,
                        subject: (activeDmPeer.sk[0] as SubjectType) || 'DSA',
                        code: `DM-${activeDmPeer.n.slice(0, 3).toUpperCase()}99`,
                        time: 'Live Now',
                        duration: '45 mins sprint',
                        topic: `1-on-1 collaboration on ${activeDmPeer.sk[0]}`,
                        mutualBuddies: [{ name: activeDmPeer.n, avatarEmoji: activeDmPeer.avatarEmoji, avatarBg: activeDmPeer.avatarBg }],
                        participantsCount: 2,
                        maxParticipants: 4,
                        isLive: true,
                      };
                      setActiveCallRoom(callRoom);
                      setHub('study');
                      setStudySubView('rooms');
                      showToast(`Started Live Audio/Video Call with ${activeDmPeer.n.split(' ')[0]}! 🎧`);
                    }}
                    className="clay-pill-btn-active text-[10px] font-black px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1"
                  >
                    <Video className="w-3 h-3 text-[#DFB6B2]" />
                    <span>Start Call</span>
                  </button>
                </div>

                <div className="space-y-2.5 flex-1 min-h-[160px] max-h-[260px] overflow-y-auto p-1">
                  {(dmThreads[activeDmPeer.id] || [
                    { sender: activeDmPeer.n, text: `Hey! Need any help with ${activeDmPeer.sk[0]}?`, time: '10:00 AM' },
                  ]).map((msg, idx) => {
                    const isMe = msg.sender === 'You';
                    return (
                      <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`max-w-[80%] p-2.5 rounded-2xl text-xs font-semibold leading-snug shadow-2xs ${
                            isMe
                              ? 'bg-gradient-to-r from-[#854F6C] to-[#2B124C] text-white rounded-br-2xs'
                              : 'bg-white text-[#2B124C] border border-[#DFB6B2] rounded-bl-2xs'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-[#854F6C] font-bold px-1 mt-0.5">{msg.time}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#DFB6B2]/40">
                  <input
                    type="text"
                    value={dmInputText}
                    onChange={(e) => setDmInputText(e.target.value)}
                    placeholder={`Message ${activeDmPeer.n.split(' ')[0]}...`}
                    className="flex-1 text-xs font-medium text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#854F6C]"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && dmInputText.trim()) {
                        const newMsg = { sender: 'You', text: dmInputText.trim(), time: 'Just now' };
                        setDmThreads((prev) => ({
                          ...prev,
                          [activeDmPeer.id]: [...(prev[activeDmPeer.id] || []), newMsg],
                        }));
                        setDmInputText('');
                        showToast(`Sent to ${activeDmPeer.n.split(' ')[0]}!`);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (!dmInputText.trim()) return;
                      const newMsg = { sender: 'You', text: dmInputText.trim(), time: 'Just now' };
                      setDmThreads((prev) => ({
                        ...prev,
                        [activeDmPeer.id]: [...(prev[activeDmPeer.id] || []), newMsg],
                      }));
                      setDmInputText('');
                      showToast(`Sent to ${activeDmPeer.n.split(' ')[0]}!`);
                    }}
                    className="clay-pill-btn-active px-3.5 py-2.5 rounded-xl text-xs font-black cursor-pointer shrink-0"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. ACTIVITY NOTIFICATIONS MODAL */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-4 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="font-black text-base text-[#2B124C] m-0">Activity</h3>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-[#854F6C] tracking-wide block">Today</span>
              <div className="p-2.5 rounded-2xl bg-white border border-[#DFB6B2] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-lg shrink-0">
                  ❤️
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2B124C] leading-snug m-0">
                    <span className="font-black">Riya Sharma</span> liked your DSA Tree Notes and cheered on your study session!
                  </p>
                  <span className="text-[10px] text-[#854F6C] font-semibold">12m ago</span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white border border-[#DFB6B2] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-lg shrink-0">
                  👋
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2B124C] leading-snug m-0">
                    <span className="font-black">Aarav Patel</span> sent you a study wave: "Let's prep for Flutter!"
                  </p>
                  <span className="text-[10px] text-[#854F6C] font-semibold">48m ago</span>
                </div>
                <button
                  onClick={() => showToast('Waved back at Aarav! 👋')}
                  className="clay-pill-btn-active text-[10px] font-black px-2.5 py-1 rounded-xl shrink-0 cursor-pointer"
                >
                  Wave
                </button>
              </div>

              <div className="p-2.5 rounded-2xl bg-white border border-[#DFB6B2] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-lg shrink-0">
                  🎧
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#2B124C] leading-snug m-0">
                    <span className="font-black">Kabir Verma</span> confirmed your OS review slot for 7:00 PM.
                  </p>
                  <span className="text-[10px] text-[#854F6C] font-semibold">2h ago</span>
                </div>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                  Confirmed
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowActivityModal(false)}
              className="w-full clay-pill-btn-active py-2.5 rounded-xl font-black text-xs cursor-pointer mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 9. SETTINGS MODAL */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-4 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3.5 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#2B124C]" />
                <h3 className="font-black text-base text-[#2B124C] m-0">Account & Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#DFB6B2] flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#FF5E62] to-[#854F6C] shadow-sm shrink-0">
                <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover rounded-full bg-[#190019] p-1" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-black text-sm text-[#2B124C] truncate">{userProfile.name}</span>
                  <span className="text-[10px] text-sky-500 font-black">✓</span>
                </div>
                <span className="text-[11px] text-[#854F6C] font-semibold block truncate">
                  {userProfile.username} · {userProfile.college.split('(')[0]}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setEditName(userProfile.name);
                  setEditBio(userProfile.bio);
                  setEditAvatar(userProfile.avatar);
                  setEditLeetCode(userProfile.leetcodeSolved);
                  setShowSettingsModal(false);
                  setShowEditProfileModal(true);
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-slate-50 border border-[#DFB6B2] text-left flex items-center justify-between cursor-pointer transition-all active:scale-98 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#522B5B] flex items-center justify-center text-base shrink-0">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-xs text-[#2B124C]">Edit Profile & Cartoon Avatar</div>
                    <div className="text-[10px] text-[#854F6C] font-medium">Update cartoon character, bio & LeetCode count</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setShowRemoveBuddyModal(true);
                }}
                className="w-full p-3 rounded-2xl bg-white hover:bg-slate-50 border border-[#DFB6B2] text-left flex items-center justify-between cursor-pointer transition-all active:scale-98 shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-base shrink-0">
                    <UserX className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-black text-xs text-[#2B124C]">Manage & Remove Buddies</div>
                    <div className="text-[10px] text-[#854F6C] font-medium">
                      {peersList.filter((p) => p.isConnected).length} connected study buddies
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setIsLoggedIn(false);
                  showToast('Signed out to Welcome Screen!');
                }}
                className="w-full p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-black text-xs text-center flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of CampusLoop</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. EDIT PROFILE MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-4 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3.5 max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#2B124C]" />
                <h3 className="font-black text-base text-[#2B124C] m-0">Edit Profile</h3>
              </div>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-[#854F6C] block">
                Choose Cartoon Form Avatar
              </span>
              <div className="grid grid-cols-5 gap-2">
                {CARTOON_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => setEditAvatar(av.src)}
                    className={`flex flex-col items-center gap-1 p-1 rounded-2xl border-2 transition-all cursor-pointer ${
                      editAvatar === av.src
                        ? 'border-[#2B124C] bg-white ring-2 ring-[#DFB6B2] scale-105'
                        : 'border-transparent bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-[#190019] p-0.5 border border-slate-200">
                      <img src={av.src} alt={av.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[8px] font-black text-[#2B124C] truncate max-w-full">{av.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 text-left">
              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">LeetCode Solved Count</label>
                <input
                  type="number"
                  value={editLeetCode}
                  onChange={(e) => setEditLeetCode(Number(e.target.value) || 0)}
                  className="w-full text-xs font-bold text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-[#854F6C] block mb-1">Snapshot / Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full text-xs font-medium text-[#2B124C] bg-white border border-[#DFB6B2] rounded-xl p-2.5 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setUserProfile((prev) => ({
                  ...prev,
                  name: editName,
                  bio: editBio,
                  avatar: editAvatar,
                  leetcodeSolved: editLeetCode,
                }));
                setShowEditProfileModal(false);
                showToast('Profile & Snapshot updated successfully!');
              }}
              className="w-full clay-pill-btn-active py-2.5 rounded-xl font-black text-xs cursor-pointer shadow-md"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

      {/* 11. REMOVE BUDDY MODAL */}
      {showRemoveBuddyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card-warm p-4 w-full max-w-sm border-2 border-[#DFB6B2] space-y-3 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DFB6B2]/40 pb-2">
              <div className="flex items-center gap-2">
                <UserX className="w-5 h-5 text-rose-500" />
                <h3 className="font-black text-base text-[#2B124C] m-0">Connected Buddies</h3>
              </div>
              <button
                onClick={() => setShowRemoveBuddyModal(false)}
                className="w-7 h-7 rounded-full clay-pill-btn flex items-center justify-center text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-[#854F6C] font-semibold m-0">
              Manage your connected campus study buddies or disconnect anytime.
            </p>

            <div className="space-y-2 pt-1">
              {peersList.filter((p) => p.isConnected).length === 0 ? (
                <div className="p-4 rounded-xl bg-white border border-dashed border-[#DFB6B2] text-center space-y-2">
                  <span className="text-2xl block">👥</span>
                  <div className="text-xs font-black text-[#2B124C]">No Active Buddies Connected</div>
                  <p className="text-[10px] text-[#854F6C] m-0">
                    Discover new peers in the Discovery Feed to start collaborative sessions!
                  </p>
                </div>
              ) : (
                peersList
                  .filter((p) => p.isConnected)
                  .map((peer) => (
                    <div
                      key={peer.id}
                      className="p-3 rounded-2xl bg-white border border-[#DFB6B2] flex items-center justify-between gap-2.5 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-11 h-11 rounded-full ${peer.avatarBg} flex items-center justify-center text-xl shrink-0 border border-slate-200`}>
                          {peer.avatarEmoji}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-black text-xs text-[#2B124C] truncate">{peer.n}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-100 shrink-0" />
                          </div>
                          <span className="text-[10px] text-[#854F6C] font-semibold block truncate">
                            {peer.college.split('(')[0]}
                          </span>
                          <span className="text-[9px] text-[#522B5B] font-bold block">
                            #{peer.sk.join(' #')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setPeersList((prev) => prev.map((p) => (p.id === peer.id ? { ...p, isConnected: false } : p)));
                          showToast(`Removed ${peer.n.split(' ')[0]} from study buddies!`);
                        }}
                        className="py-1.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black cursor-pointer active:scale-95 transition-all flex items-center gap-1 shrink-0"
                      >
                        <UserX className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  ))
              )}
            </div>

            <button
              onClick={() => setShowRemoveBuddyModal(false)}
              className="w-full clay-pill-btn-active py-2.5 rounded-xl font-black text-xs cursor-pointer mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 12. TUTOR BOOKING MODAL */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="clay-card p-5 w-full max-w-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-[#2B124C]">Book 1-on-1 Session</h3>
              <button onClick={() => setSelectedTutor(null)} className="p-1 rounded-full text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#2B124C] m-0">Tutor: {selectedTutor.name} ({selectedTutor.year})</p>
              <p className="text-[#854F6C] m-0">Cost: {selectedTutor.hourlyPoints} Points / 1 Hour</p>
              <div>
                <label className="font-black text-[#2B124C] block mb-1">Pick Available Time Slot</label>
                <div className="space-y-1.5">
                  {selectedTutor.availableSlots.map((sl) => (
                    <button
                      key={sl}
                      onClick={() => setBookingSlot(sl)}
                      className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-all ${
                        bookingSlot === sl ? 'clay-pill-btn-active' : 'clay-pill-btn'
                      }`}
                    >
                      {sl}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  if (!selectedTutor || !bookingSlot) {
                    showToast('Please select a preferred slot!');
                    return;
                  }
                  if (userPoints < selectedTutor.hourlyPoints) {
                    showToast('Insufficient campus points! Complete study sessions to earn points.');
                    return;
                  }
                  setUserPoints((prev) => prev - selectedTutor.hourlyPoints);
                  setBookedSessions([...bookedSessions, { tutor: selectedTutor.name, subject: selectedTutor.specialty[0], time: bookingSlot }]);
                  showToast(`1-on-1 Session booked with ${selectedTutor.name}! Calendar invite sent!`);
                  setSelectedTutor(null);
                }}
                className="w-full clay-pill-btn-active py-3 rounded-xl font-black text-xs mt-2"
              >
                Confirm & Deduct {selectedTutor.hourlyPoints} Points
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
