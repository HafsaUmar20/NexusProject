import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';



// Components

import VideoCallSection from '../../components/VideoCallSection';

import DocumentChamber from '../../components/DocumentChamber';

import MeetingCalendar from '../../components/MeetingCalendar';

import PaymentSection from '../../components/PaymentSection'; // ✅ ADDED

// UI Components

import { Button } from '../../components/ui/Button';

import { Card, CardBody, CardHeader } from '../../components/ui/Card';

import { Input } from '../../components/ui/Input';

import { Badge } from '../../components/ui/Badge';

import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';



// Context & Data

import { useAuth } from '../../context/AuthContext';

import { entrepreneurs } from '../../data/users';

import { getRequestsFromInvestor } from '../../data/collaborationRequests';



export const InvestorDashboard: React.FC = () => {

  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

 

  if (!user) return null;

 

  const sentRequests = getRequestsFromInvestor(user.id);

 

  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {

    const matchesSearch = searchQuery === '' ||

      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||

      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase());

   

    const matchesIndustry = selectedIndustries.length === 0 ||

      selectedIndustries.includes(entrepreneur.industry);

   

    return matchesSearch && matchesIndustry;

  });

 

  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

 

  const toggleIndustry = (industry: string) => {

    setSelectedIndustries(prev =>

      prev.includes(industry) ? prev.filter(i => i !== industry) : [...prev, industry]

    );

  };

 

  return (

    <div className="space-y-6 animate-fade-in">

      {/* 1. HEADER SECTION */}

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {user.name}</h1>

          <p className="text-gray-600">Discover and manage your startup investments</p>

        </div>

        <Link to="/entrepreneurs">

          <Button leftIcon={<PlusCircle size={18} />}>

            View All Startups

          </Button>

        </Link>

      </div>



      {/* 2. CALENDAR SECTION */}

      <Card>

        <CardBody>

           <h2 className="text-xl font-bold mb-4">Availability & Meetings</h2>

           <MeetingCalendar />

        </CardBody>

      </Card>

     

      {/* 3. WEEK 2 - MILESTONES 3 & 4 (GRID LAYOUT) */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="space-y-4">

          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">

            <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>

            Live Pitch Room

          </h2>

          <VideoCallSection />

        </div>



        <div className="space-y-4">

          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">

            <span className="w-1.5 h-6 bg-green-600 rounded-full"></span>

            Document Chamber

          </h2>

          <DocumentChamber />

        </div>

      </div>

      {/* 3. MILESTONE 5 - PAYMENT SECTION (Stand-alone Row) */}
    <div className="w-full space-y-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
        Financial Hub
      </h2>
      {/* Remove the <Card> wrapper here since PaymentSection has its own cards */}
      <PaymentSection />
    </div>

      {/* 4. FILTERS & SEARCH */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="w-full md:w-2/3">

          <Input

            placeholder="Search startups..."

            value={searchQuery}

            onChange={(e) => setSearchQuery(e.target.value)}

            fullWidth

            startAdornment={<Search size={18} />}

          />

        </div>

        <div className="w-full md:w-1/3 flex items-center gap-2">

          <Filter size={18} className="text-gray-500" />

          <div className="flex flex-wrap gap-2">

            {industries.map(industry => (

              <Badge

                key={industry}

                variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}

                className="cursor-pointer"

                onClick={() => toggleIndustry(industry)}

              >

                {industry}

              </Badge>

            ))}

          </div>

        </div>

      </div>

     

      {/* 5. STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ... (Keep your existing Card components here) ... */}

      </div>

     

      {/* 6. FEATURED STARTUPS GRID */}

      <div>

        <Card>

          <CardHeader>

            <h2 className="text-lg font-medium text-gray-900">Featured Startups</h2>

          </CardHeader>

          <CardBody>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredEntrepreneurs.map(entrepreneur => (

                <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />

              ))}

            </div>

          </CardBody>

        </Card>

      </div>

    </div>

  );

};