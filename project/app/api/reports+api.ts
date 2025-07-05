export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || 'month';

    // Mock report data based on period
    const reportData = {
      totalPatients: period === 'year' ? '1,247' : period === 'quarter' ? '312' : period === 'week' ? '28' : '156',
      totalAppointments: period === 'year' ? '4,892' : period === 'quarter' ? '1,223' : period === 'week' ? '112' : '489',
      revenue: period === 'year' ? '$892,340' : period === 'quarter' ? '$223,085' : period === 'week' ? '$18,590' : '$74,360',
      satisfaction: period === 'year' ? '94%' : period === 'quarter' ? '92%' : period === 'week' ? '96%' : '93%',
      appointmentTrends: [
        { month: 'Jan', scheduled: 45, completed: 42, cancelled: 3, total: 45 },
        { month: 'Feb', scheduled: 52, completed: 48, cancelled: 4, total: 52 },
        { month: 'Mar', scheduled: 38, completed: 35, cancelled: 3, total: 38 },
        { month: 'Apr', scheduled: 61, completed: 58, cancelled: 3, total: 61 },
        { month: 'May', scheduled: 47, completed: 44, cancelled: 3, total: 47 },
        { month: 'Jun', scheduled: 55, completed: 51, cancelled: 4, total: 55 },
      ],
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    return Response.json(reportData);
  } catch (error) {
    console.error('Get reports error:', error);
    return Response.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}