import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/providers/AuthProvider';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  AlertTriangle,
  Heart,
  Activity
} from 'lucide-react-native';
import { DashboardStats } from '@/types';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await fetch('/api/dashboard/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
  });

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    trend 
  }: { 
    title: string; 
    value: string; 
    icon: any; 
    color: string; 
    trend?: string; 
  }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Icon size={20} color={color} />
        </View>
        {trend && (
          <View style={styles.trendContainer}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={styles.trendText}>{trend}</Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const QuickAction = ({ 
    title, 
    icon: Icon, 
    color, 
    onPress 
  }: { 
    title: string; 
    icon: any; 
    color: string; 
    onPress: () => void; 
  }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <LinearGradient
        colors={[color, color + 'CC']}
        style={styles.quickActionGradient}
      >
        <Icon size={24} color="#FFFFFF" />
        <Text style={styles.quickActionText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Activity size={32} color="#2563EB" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#2563EB', '#06B6D4']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>Dr. {user?.firstName || 'User'}</Text>
          </View>
          <View style={styles.headerIcon}>
            <Heart size={28} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      {/* Stats Overview */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Patients"
            value={stats?.totalPatients.toString() || '0'}
            icon={Users}
            color="#2563EB"
            trend="+12%"
          />
          <StatCard
            title="Today's Appointments"
            value={stats?.todayAppointments.toString() || '0'}
            icon={Calendar}
            color="#10B981"
            trend="+5%"
          />
          <StatCard
            title="Pending"
            value={stats?.pendingAppointments.toString() || '0'}
            icon={Clock}
            color="#F59E0B"
          />
          <StatCard
            title="Completed"
            value={stats?.completedAppointments.toString() || '0'}
            icon={CheckCircle}
            color="#06B6D4"
            trend="+8%"
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction
            title="Add Patient"
            icon={Users}
            color="#2563EB"
            onPress={() => {}}
          />
          <QuickAction
            title="Schedule"
            icon={Calendar}
            color="#10B981"
            onPress={() => {}}
          />
          <QuickAction
            title="Reports"
            icon={TrendingUp}
            color="#F59E0B"
            onPress={() => {}}
          />
          <QuickAction
            title="Emergency"
            icon={AlertTriangle}
            color="#EF4444"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityContainer}>
          {stats?.recentPatients?.slice(0, 3).map((patient, index) => (
            <View key={patient.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Users size={16} color="#2563EB" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                  New patient: {patient.firstName} {patient.lastName}
                </Text>
                <Text style={styles.activityTime}>
                  {new Date(patient.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          )) || []}
        </View>
      </View>

      {/* Upcoming Appointments */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <View style={styles.appointmentsContainer}>
          {stats?.upcomingAppointments?.slice(0, 3).map((appointment, index) => (
            <View key={appointment.id} style={styles.appointmentItem}>
              <View style={styles.appointmentTime}>
                <Text style={styles.appointmentTimeText}>{appointment.time}</Text>
                <Text style={styles.appointmentDateText}>
                  {new Date(appointment.date).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentPatient}>{appointment.patientName}</Text>
                <Text style={styles.appointmentType}>{appointment.type}</Text>
              </View>
              <View style={[
                styles.appointmentStatus,
                { backgroundColor: appointment.status === 'confirmed' ? '#10B981' : '#F59E0B' }
              ]}>
                <Text style={styles.appointmentStatusText}>
                  {appointment.status}
                </Text>
              </View>
            </View>
          )) || []}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    padding: 24,
    paddingTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statCard: {
    width: (width - 64) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    marginLeft: 4,
  },
  statValue: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  lastSection: {
    paddingBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  quickAction: {
    width: (width - 64) / 2,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  quickActionGradient: {
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EBF8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  activityTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  appointmentsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  appointmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  appointmentTime: {
    width: 80,
    marginRight: 16,
  },
  appointmentTimeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  appointmentDateText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentPatient: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#111827',
  },
  appointmentType: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  appointmentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appointmentStatusText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});