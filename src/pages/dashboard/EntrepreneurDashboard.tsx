import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, AlertCircle } from 'lucide-react';

import VideoCallSection from '../../components/VideoCallSection';
import PaymentSection from '../../components/PaymentSection'; // ✅ ADDED
import DocumentChamber from '../../components/DocumentChamber';
import MeetingCalendar from '../../components/MeetingCalendar';

import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';

import { useAuth } from '../../context/AuthContext';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<any[]>([]);
  const recommendedInvestors = investors.slice(0, 3);

  useEffect(() => {
    if (user) {
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(
    (req) => req.status === 'pending'
  );

 return (
  <div className="space-y-8 animate-fade-in pb-10">
    {/* 1. HEADER */}
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
        <p className="text-gray-600">Your startup control center</p>
      </div>
      <Link to="/investors">
        <Button leftIcon={<PlusCircle size={18} />}>Find Investors</Button>
      </Link>
    </div>

    {/* 2. VIDEO + DOCUMENT SECTION */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
          Live Pitch Room
        </h2>
        <VideoCallSection />
      </div>
      <div className="lg:col-span-5 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-green-600 rounded-full"></span>
          Document Chamber
        </h2>
        <DocumentChamber />
      </div>
    </div>

    

    {/* 4. CALENDAR */}
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
        Meeting Scheduler
      </h2>
      <Card>
        <CardBody>
          <MeetingCalendar />
        </CardBody>
      </Card>
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
    
    {/* 5. REQUESTS + INVESTORS */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex justify-between items-center border-b">
            <h2 className="text-lg font-medium text-gray-900">Collaboration Requests</h2>
            <Badge variant="primary">{pendingRequests.length} pending</Badge>
          </CardHeader>
          <CardBody>
            {collaborationRequests.length > 0 ? (
              <div className="space-y-4">
                {collaborationRequests.map((request) => (
                  <CollaborationRequestCard key={request.id} request={request} onStatusUpdate={() => {}} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle size={24} className="mx-auto mb-2" />
                <p>No requests yet</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="border-b">
            <h2 className="text-lg font-medium">Recommended Investors</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {recommendedInvestors.map((investor) => (
              <InvestorCard key={investor.id} investor={investor} showActions={false} />
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  </div>
);
};