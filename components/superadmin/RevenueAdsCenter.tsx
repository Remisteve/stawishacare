// pages/superadmin/revenue-ads.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DollarSign, TrendingUp, Target, Eye, Play, Pause, Edit, Trash2, Plus, Search,
  BarChart3, PieChart, Calendar, Users, Globe, Monitor, MousePointer, Clock,
  Zap, Crown, Brain, Crosshair, Database, Network, Terminal, Code, Binary,
  Building2, Heart, Shield, AlertTriangle, CheckCircle, Activity, MapPin
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import { GetServerSideProps } from 'next';
import { AdCampaign, Donor, RevenueStats, RevenueStream } from '@/types/revenue';

interface RevenueAdsPageProps {
  initialRevenueStreams: RevenueStream[];
  initialAdCampaigns: AdCampaign[];
  initialDonors: Donor[];
  initialStats: RevenueStats;
  revenueData: any[];
}

const COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

export default function RevenueAdsPage({ 
  initialRevenueStreams, 
  initialAdCampaigns, 
  initialDonors, 
  initialStats,
  revenueData 
}: RevenueAdsPageProps) {
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>(initialRevenueStreams);
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>(initialAdCampaigns);
  const [donors, setDonors] = useState<Donor[]>(initialDonors);
  const [stats, setStats] = useState<RevenueStats>(initialStats);
  
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showCreateAd, setShowCreateAd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  const [newAd, setNewAd] = useState({
    name: '',
    advertiser: '',
    budget: '',
    duration: '',
    category: '',
    targetAudience: '',
    placement: '',
    description: '',
    contactEmail: '',
    websiteUrl: ''
  });

  const [terminalOutput, setTerminalOutput] = useState([
    '> MONETIZATION_ENGINE INITIALIZED',
    '> ANALYZING REVENUE STREAMS...',
    '> AD_NETWORK OPTIMIZATION COMPLETE',
    '> DONOR_PIPELINE ACTIVE'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updates = [
        '> NEW AD REVENUE: +$' + Math.floor(Math.random() * 500),
        '> DONOR INQUIRY DETECTED',
        '> ENGAGEMENT METRICS UPDATED',
        '> PARTNERSHIP REVENUE CONFIRMED',
        '> CAMPAIGN PERFORMANCE OPTIMIZED',
        '> REVENUE TARGET ACHIEVED'
      ];
      setTerminalOutput(prev => [
        ...prev.slice(-3),
        updates[Math.floor(Math.random() * updates.length)]
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Dynamic campaign creation
  const handleCreateAd = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/superadmin/create-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAd),
      });

      if (response.ok) {
        const createdCampaign = await response.json();
        setAdCampaigns(prev => [...prev, createdCampaign]);
        
        // Update stats
        setStats(prev => ({
          ...prev,
          activeCampaigns: prev.activeCampaigns + 1,
          totalAdSpend: prev.totalAdSpend + parseInt(newAd.budget)
        }));

        setNewAd({
          name: '', advertiser: '', budget: '', duration: '', category: '',
          targetAudience: '', placement: '', description: '', contactEmail: '', websiteUrl: ''
        });
        
        setShowCreateAd(false);
        setTerminalOutput(prev => [...prev, `> NEW CAMPAIGN DEPLOYED: ${newAd.name}`]);
      }
    } catch (error) {
      console.error('Failed to create campaign:', error);
      setTerminalOutput(prev => [...prev, `> ERROR: CAMPAIGN DEPLOYMENT FAILED`]);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic campaign status update
  const handleCampaignStatusUpdate = async (campaignId: number, status: string) => {
    try {
      const response = await fetch('/api/superadmin/update-campaign-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, status }),
      });

      if (response.ok) {
        setAdCampaigns(prev => prev.map(campaign => 
          campaign.id === campaignId 
            ? { ...campaign, status: status as any }
            : campaign
        ));
        setTerminalOutput(prev => [...prev, `> CAMPAIGN ${campaignId} STATUS: ${status.toUpperCase()}`]);
      }
    } catch (error) {
      console.error('Failed to update campaign status:', error);
    }
  };

  // Dynamic revenue stream update
  const handleRevenueStreamUpdate = async (streamId: number, updates: Partial<RevenueStream>) => {
    try {
      const response = await fetch('/api/superadmin/update-revenue-stream', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streamId, updates }),
      });

      if (response.ok) {
        setRevenueStreams(prev => prev.map(stream => 
          stream.id === streamId 
            ? { ...stream, ...updates }
            : stream
        ));
        setTerminalOutput(prev => [...prev, `> REVENUE STREAM ${streamId} UPDATED`]);
      }
    } catch (error) {
      console.error('Failed to update revenue stream:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/50 border-green-600';
      case 'paused': return 'text-yellow-400 bg-yellow-900/50 border-yellow-600';
      case 'pending': return 'text-blue-400 bg-blue-900/50 border-blue-600';
      case 'completed': return 'text-gray-400 bg-gray-900/50 border-gray-600';
      default: return 'text-gray-400 bg-gray-900/50 border-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const activeCampaigns = adCampaigns.filter(campaign => campaign.status === 'active').length;

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Terminal Header */}
        <Card className="bg-gray-900/80 border-green-600">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-400">
              <Terminal className="mr-2 h-5 w-5" />
              MONETIZATION COMMAND CENTER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black p-4 rounded border border-green-800 h-20 overflow-y-auto">
              {terminalOutput.map((line, index) => (
                <div key={index} className="text-green-400 text-xs font-mono">
                  {line}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Revenue Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="bg-gray-900/50 border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600">MONTHLY REVENUE</p>
                  <p className="text-xl font-bold text-green-400">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600">AD IMPRESSIONS</p>
                  <p className="text-xl font-bold text-blue-400">{(stats.totalImpressions / 1000000).toFixed(1)}M</p>
                </div>
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-purple-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600">CLICK RATE</p>
                  <p className="text-xl font-bold text-purple-400">{stats.avgCTR}%</p>
                </div>
                <MousePointer className="h-6 w-6 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-yellow-600">ACTIVE ADS</p>
                  <p className="text-xl font-bold text-yellow-400">{activeCampaigns}</p>
                </div>
                <Target className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-cyan-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-cyan-600">AD SPEND</p>
                  <p className="text-xl font-bold text-cyan-400">{formatCurrency(stats.totalAdSpend)}</p>
                </div>
                <BarChart3 className="h-6 w-6 text-cyan-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-pink-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-pink-600">ROI</p>
                  <p className="text-xl font-bold text-pink-400">{stats.roi}%</p>
                </div>
                <TrendingUp className="h-6 w-6 text-pink-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-900/50 border border-green-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-900 data-[state=active]:text-green-400">OVERVIEW</TabsTrigger>
            <TabsTrigger value="ads" className="data-[state=active]:bg-green-900 data-[state=active]:text-green-400">AD CAMPAIGNS</TabsTrigger>
            <TabsTrigger value="partnerships" className="data-[state=active]:bg-green-900 data-[state=active]:text-green-400">PARTNERSHIPS</TabsTrigger>
            <TabsTrigger value="donors" className="data-[state=active]:bg-green-900 data-[state=active]:text-green-400">DONORS</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-900 data-[state=active]:text-green-400">ANALYTICS</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Streams Chart */}
              <Card className="bg-gray-900/50 border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    REVENUE STREAMS ANALYSIS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.2} />
                      <XAxis dataKey="month" stroke="#10b981" />
                      <YAxis stroke="#10b981" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #10b981',
                          color: '#10b981'
                        }} 
                      />
                      <Legend />
                      <Area type="monotone" dataKey="ads" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="partnerships" stackId="1" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="donations" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue Sources Breakdown */}
              <Card className="bg-gray-900/50 border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <PieChart className="mr-2 h-5 w-5" />
                    REVENUE SOURCES
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueStreams.map((stream, index) => (
                      <div key={stream.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded border border-gray-700">
                        <div>
                          <p className="font-medium text-green-400">{stream.source}</p>
                          <p className="text-xs text-gray-500">{stream.type} • CTR: {stream.ctr}%</p>
                          <p className="text-xs text-gray-600">{stream.demographics}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">{formatCurrency(stream.monthlyRevenue)}</div>
                          <Badge className={getStatusColor(stream.status)}>
                            {stream.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-green-900/20 border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-400">AD PERFORMANCE</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Impressions:</span>
                      <span className="text-green-400">{(stats.totalImpressions / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Clicks:</span>
                      <span className="text-green-400">{stats.totalClicks.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Average CTR:</span>
                      <span className="text-green-400">{stats.avgCTR}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue per Click:</span>
                      <span className="text-green-400">{formatCurrency(stats.revenuePerClick)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/20 border-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-400">GROWTH METRICS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Monthly Growth:</span>
                      <span className="text-blue-400">+{stats.monthlyGrowth}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">New Advertisers:</span>
                      <span className="text-blue-400">{stats.newAdvertisers} this month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Retention Rate:</span>
                      <span className="text-blue-400">{stats.retentionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Campaign:</span>
                      <span className="text-blue-400">{formatCurrency(stats.avgCampaignBudget)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/20 border-purple-800">
                <CardHeader>
                  <CardTitle className="text-purple-400">MARKET IMPACT</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Countries Reached:</span>
                      <span className="text-purple-400">{stats.countriesReached}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Healthcare Providers:</span>
                      <span className="text-purple-400">{stats.healthcareProviders.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Patients Reached:</span>
                      <span className="text-purple-400">{stats.patientsReached.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lives Impacted:</span>
                      <span className="text-purple-400">{stats.livesImpacted.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AD CAMPAIGNS TAB */}
          <TabsContent value="ads" className="space-y-6">
            <Card className="bg-gray-900/50 border-green-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-400 flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    ADVERTISING CAMPAIGNS
                  </CardTitle>
                  <Button 
                    onClick={() => setShowCreateAd(true)}
                    className="bg-green-900 hover:bg-green-800 text-green-400 border border-green-600"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    CREATE CAMPAIGN
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {adCampaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded border border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-900/50 rounded">
                          <Target className="h-6 w-6 text-blue-400" />
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-green-400">{campaign.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>Advertiser: {campaign.advertiser}</span>
                            <span>Budget: {formatCurrency(campaign.budget)}</span>
                            <span>Spent: {formatCurrency(campaign.spent)}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Target: {campaign.targetAudience}</span>
                            <span>Performance: {campaign.performance}%</span>
                            <span>{campaign.startDate} - {campaign.endDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status.toUpperCase()}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-green-600 text-green-400 hover:bg-green-900">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-blue-600 text-blue-400 hover:bg-blue-900"
                            onClick={() => handleCampaignStatusUpdate(
                              campaign.id, 
                              campaign.status === 'active' ? 'paused' : 'active'
                            )}
                          >
                            {campaign.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button variant="outline" size="sm" className="border-yellow-600 text-yellow-400 hover:bg-yellow-900">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DONORS TAB */}
          <TabsContent value="donors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <Heart className="mr-2 h-5 w-5" />
                    MAJOR DONORS
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {donors.map((donor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded border border-gray-700">
                        <div>
                          <p className="font-medium text-green-400">{donor.name}</p>
                          <p className="text-xs text-gray-500">{donor.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">{formatCurrency(donor.amount)}</div>
                          <div className="text-xs text-green-600">Annual</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-400">DONOR BREAKDOWN</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={donors}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        label={({ name, amount }) => `${name}: ${formatCurrency(amount)}`}
                      >
                        {donors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PARTNERSHIPS TAB */}
          <TabsContent value="partnerships">
            <div className="text-center text-green-400 p-8">
              <Building2 className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">STRATEGIC PARTNERSHIPS</h3>
              <p>Corporate partnership management system...</p>
            </div>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics">
            <div className="text-center text-green-400 p-8">
              <Brain className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">REVENUE ANALYTICS ENGINE</h3>
              <p>Advanced monetization insights and predictions...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Ad Campaign Modal */}
        {showCreateAd && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-green-600">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  CREATE ADVERTISING CAMPAIGN
                </CardTitle>
                <CardDescription className="text-green-600">
                  Launch new revenue-generating advertising campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-green-900/20 border-green-600">
                  <DollarSign className="h-4 w-4" />
                  <AlertDescription className="text-green-400">
                    SuperAdmin creating new monetization opportunity
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-green-600">Campaign Name *</Label>
                    <Input
                      value={newAd.name}
                      onChange={(e) => setNewAd({...newAd, name: e.target.value})}
                      className="bg-gray-800 border-green-600 text-green-400"
                      placeholder="HIV Awareness Campaign"
                    />
                  </div>
                  <div>
                    <Label className="text-green-600">Advertiser *</Label>
                    <Input
                      value={newAd.advertiser}
                      onChange={(e) => setNewAd({...newAd, advertiser: e.target.value})}
                      className="bg-gray-800 border-green-600 text-green-400"
                      placeholder="UNAIDS, WHO, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-green-600">Budget (USD) *</Label>
                    <Input
                      type="number"
                      value={newAd.budget}
                      onChange={(e) => setNewAd({...newAd, budget: e.target.value})}
                      className="bg-gray-800 border-green-600 text-green-400"
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <Label className="text-green-600">Duration (months)</Label>
                    <Input
                      type="number"
                      value={newAd.duration}
                      onChange={(e) => setNewAd({...newAd, duration: e.target.value})}
                      className="bg-gray-800 border-green-600 text-green-400"
                      placeholder="6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-green-600">Category</Label>
                    <Select value={newAd.category} onValueChange={(value: string) => setNewAd({...newAd, category: value})}>
                      <SelectTrigger className="bg-gray-800 border-green-600 text-green-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-green-600">
                        <SelectItem value="health">Health & Prevention</SelectItem>
                        <SelectItem value="mental_health">Mental Health</SelectItem>
                        <SelectItem value="family_planning">Family Planning</SelectItem>
                        <SelectItem value="education">Health Education</SelectItem>
                        <SelectItem value="technology">Health Tech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-green-600">Target Audience</Label>
                    <Input
                      value={newAd.targetAudience}
                      onChange={(e) => setNewAd({...newAd, targetAudience: e.target.value})}
                      className="bg-gray-800 border-green-600 text-green-400"
                      placeholder="Healthcare workers, Youth 18-35"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-green-600">Ad Placement</Label>
                  <Input
                    value={newAd.placement}
                    onChange={(e) => setNewAd({...newAd, placement: e.target.value})}
                    className="bg-gray-800 border-green-600 text-green-400"
                    placeholder="Dashboard, Mobile App, Email"
                  />
                </div>

                <div>
                  <Label className="text-green-600">Campaign Description</Label>
                  <Textarea
                    value={newAd.description}
                    onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                    className="bg-gray-800 border-green-600 text-green-400"
                    placeholder="Describe the campaign objectives and messaging..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-green-600">Contact Email</Label>
                    <Input
                      type="email"
                      value={newAd.contactEmail}
                      onChange={(e) => setNewAd({...newAd, contactEmail: e.target.value})}
                      className="bg-gray-800 border-green-600 text-green-400"
                      placeholder="contact@advertiser.org"
                    />
                  </div>
                  <div>
                    <Label className="text-green-600">Website URL</Label>
                    <Input
                      value={newAd.websiteUrl}
                      onChange={(e) => setNewAd({...newAd, websiteUrl: e.target.value})}
                      className="bg-gray-800 border-green-600 text-green-400"
                      placeholder="https://advertiser.org"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateAd(false)}
                    className="border-gray-600 text-gray-400"
                  >
                    CANCEL
                  </Button>
                  <Button
                    onClick={handleCreateAd}
                    disabled={loading || !newAd.name || !newAd.advertiser || !newAd.budget}
                    className="bg-green-900 hover:bg-green-800 text-green-400 border border-green-600"
                  >
                    {loading ? (
                      <>
                        <Code className="mr-2 h-4 w-4 animate-spin" />
                        LAUNCHING...
                      </>
                    ) : (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        LAUNCH CAMPAIGN
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}

// Server-side props for dynamic data loading
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Mock data - Replace with actual database calls
    const revenueStreams = [
      { 
        id: 1, source: 'Google AdSense', type: 'display', status: 'active', 
        monthlyRevenue: 12450, impressions: 1245000, clicks: 3456, ctr: 0.28,
        demographics: 'Healthcare professionals, NGOs', regions: 'Kenya, Uganda, Tanzania'
      },
      { 
        id: 2, source: 'PEPFAR Partnership', type: 'sponsored', status: 'active',
        monthlyRevenue: 25000, impressions: 145000, clicks: 890, ctr: 0.61,
        demographics: 'Policy makers, donors', regions: 'Global'
      },
      { 
        id: 3, source: 'Pharmaceutical Ads', type: 'banner', status: 'active',
        monthlyRevenue: 8900, impressions: 567000, clicks: 1234, ctr: 0.22,
        demographics: 'Doctors, patients', regions: 'East Africa'
      },
      { 
        id: 4, source: 'NGO Partnerships', type: 'sponsored', status: 'pending',
        monthlyRevenue: 15600, impressions: 89000, clicks: 445, ctr: 0.50,
        demographics: 'Community health workers', regions: 'Kenya'
      }
    ];

    const adCampaigns = [
      {
        id: 1, name: 'HIV Prevention Awareness', advertiser: 'UNAIDS', budget: 50000, spent: 23400,
        startDate: '2025-06-01', endDate: '2025-12-31', status: 'active', category: 'health',
        targetAudience: 'Youth 18-35', placement: 'Dashboard, Mobile App', performance: 94
      },
      {
        id: 2, name: 'Mental Health Support', advertiser: 'WHO', budget: 35000, spent: 12800,
        startDate: '2025-05-15', endDate: '2025-11-15', status: 'active', category: 'mental_health',
        targetAudience: 'Healthcare workers', placement: 'Sidebar, Email', performance: 87
      },
      {
        id: 3, name: 'Family Planning Education', advertiser: 'Marie Stopes', budget: 25000, spent: 8900,
        startDate: '2025-06-10', endDate: '2025-09-10', status: 'paused', category: 'family_planning',
        targetAudience: 'Women 20-40', placement: 'Video Content', performance: 76
      }
    ];

    const donors = [
      { name: 'PEPFAR', amount: 125000, category: 'Government' },
      { name: 'Global Fund', amount: 89000, category: 'International' },
      { name: 'Bill & Melinda Gates Foundation', amount: 67000, category: 'Foundation' },
      { name: 'Google.org', amount: 45000, category: 'Tech' },
      { name: 'Private Donors', amount: 23000, category: 'Individual' }
    ];

    const revenueData = [
      { month: 'Jan', ads: 8500, subscriptions: 12000, partnerships: 18000, donations: 5400 },
      { month: 'Feb', ads: 9200, subscriptions: 13500, partnerships: 21000, donations: 6700 },
      { month: 'Mar', ads: 11800, subscriptions: 15200, partnerships: 24500, donations: 8900 },
      { month: 'Apr', ads: 14500, subscriptions: 17800, partnerships: 28900, donations: 12300 },
      { month: 'May', ads: 16200, subscriptions: 19500, partnerships: 32400, donations: 15600 },
      { month: 'Jun', ads: 18900, subscriptions: 22100, partnerships: 35700, donations: 18200 }
    ];

    // Calculate stats
    const totalRevenue = revenueStreams.reduce((sum, stream) => sum + stream.monthlyRevenue, 0);
    const totalImpressions = revenueStreams.reduce((sum, stream) => sum + stream.impressions, 0);
    const totalClicks = revenueStreams.reduce((sum, stream) => sum + stream.clicks, 0);
    const totalAdSpend = adCampaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
    const totalBudget = adCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0);

    const stats = {
      totalRevenue,
      totalImpressions,
      totalClicks,
      totalAdSpend,
      avgCTR: parseFloat((totalClicks / totalImpressions * 100).toFixed(2)),
      revenuePerClick: parseFloat((totalRevenue / totalClicks).toFixed(2)),
      roi: Math.round((totalRevenue / totalAdSpend) * 100),
      activeCampaigns: adCampaigns.filter(c => c.status === 'active').length,
      monthlyGrowth: 23.7,
      newAdvertisers: 12,
      retentionRate: 94.2,
      avgCampaignBudget: Math.round(totalBudget / adCampaigns.length),
      countriesReached: 15,
      healthcareProviders: 1247,
      patientsReached: 67890,
      livesImpacted: 15670
    };

    return {
      props: {
        initialRevenueStreams: revenueStreams,
        initialAdCampaigns: adCampaigns,
        initialDonors: donors,
        initialStats: stats,
        revenueData: revenueData
      },
    };
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return {
      props: {
        initialRevenueStreams: [],
        initialAdCampaigns: [],
        initialDonors: [],
        initialStats: {},
        revenueData: []
      },
    };
  }
};