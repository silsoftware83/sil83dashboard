import  { useState } from 'react';
import { Calendar, Clock, TrendingUp, Users, FileText, CheckSquare, Bell, Briefcase, Award,  MessageSquare, Plus, X } from 'lucide-react';

export default function HRDashboard() {
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Revisar evaluaciones de desempeño Q4', time: '10:00 AM', urgent: true },
    { id: 2, text: 'Entrevista con candidato - Desarrollador Sr.', time: '2:00 PM', urgent: false },
    { id: 3, text: 'Reunión de equipo semanal', time: '4:00 PM', urgent: false }
  ]);

  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState('');

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, {
        id: Date.now(),
        text: newReminder,
        time: 'Hoy',
        urgent: false
      }]);
      setNewReminder('');
      setShowAddReminder(false);
    }
  };

  const removeReminder = (id:any) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const quickAccess = [
    { icon: Users, label: 'Gestión de Personal', color: 'bg-blue-500', link: '#' },
    { icon: Briefcase, label: 'Reclutamiento', color: 'bg-purple-500', link: '#' },
    { icon: FileText, label: 'Documentos', color: 'bg-green-500', link: '#' },
    { icon: Calendar, label: 'Calendario', color: 'bg-orange-500', link: '#' },
    { icon: Award, label: 'Evaluaciones', color: 'bg-pink-500', link: '#' },
    { icon: TrendingUp, label: 'Reportes', color: 'bg-indigo-500', link: '#' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Aprobar solicitudes de vacaciones', count: 8, priority: 'high' },
    { id: 2, task: 'Revisar documentos de nuevos ingresos', count: 3, priority: 'medium' },
    { id: 3, task: 'Actualizar políticas de la empresa', count: 1, priority: 'low' },
    { id: 4, task: 'Procesar reembolsos', count: 5, priority: 'medium' }
  ];

  const recentNews = [
    { id: 1, title: 'Nueva política de trabajo remoto implementada', date: '15 Oct 2025', category: 'Políticas' },
    { id: 2, title: 'Programa de capacitación en liderazgo disponible', date: '12 Oct 2025', category: 'Desarrollo' },
    { id: 3, title: 'Resultados de encuesta de clima laboral', date: '10 Oct 2025', category: 'Bienestar' }
  ];

  const upcomingEvents = [
    { date: '20', month: 'Oct', event: 'Onboarding - 4 nuevos empleados', type: 'onboarding' },
    { date: '22', month: 'Oct', event: 'Revisión trimestral de objetivos', type: 'review' },
    { date: '25', month: 'Oct', event: 'Taller de integración de equipos', type: 'training' }
  ];

  const kpiCards = [
    { label: 'Empleados Activos', value: '247', change: '+12', trend: 'up', icon: Users },
    { label: 'Posiciones Abiertas', value: '8', change: '-3', trend: 'down', icon: Briefcase },
    { label: 'Tasa de Retención', value: '94%', change: '+2%', trend: 'up', icon: TrendingUp },
    { label: 'Satisfacción', value: '4.6/5', change: '+0.3', trend: 'up', icon: Award }
  ];

  return (
    
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido de nuevo, Ana</h1>
            <p className="text-gray-600 mt-1">Aquí tienes un resumen de hoy</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Sábado, 18 de Octubre 2025</p>
            <p className="text-2xl font-semibold text-gray-900">10:24 AM</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{kpi.change}</span>
                    <span className="ml-1 text-gray-500">vs mes anterior</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Accesos Rápidos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickAccess.map((item, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className={`${item.color} p-3 rounded-lg mb-2 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reminders */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-orange-500" />
                Recordatorios
              </h2>
              <button
                onClick={() => setShowAddReminder(!showAddReminder)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {showAddReminder && (
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addReminder()}
                  placeholder="Nuevo recordatorio..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={addReminder}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
            )}
            
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    reminder.urgent ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${reminder.urgent ? 'text-red-500' : 'text-gray-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{reminder.text}</p>
                    <p className="text-xs text-gray-600 mt-1">{reminder.time}</p>
                  </div>
                  <button
                    onClick={() => removeReminder(reminder.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-green-500" />
              Tareas Pendientes
            </h2>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{task.task}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {task.count} {task.count === 1 ? 'pendiente' : 'pendientes'}
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{task.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-500" />
              Próximos Eventos
            </h2>
            <div className="space-y-3">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-lg px-3 py-2 min-w-[60px]">
                    <span className="text-2xl font-bold">{event.date}</span>
                    <span className="text-xs uppercase">{event.month}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.event}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                      event.type === 'onboarding' ? 'bg-green-100 text-green-700' :
                      event.type === 'review' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {event.type === 'onboarding' ? 'Onboarding' :
                       event.type === 'review' ? 'Revisión' : 'Capacitación'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* News and Announcements */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />
            Noticias y Anuncios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentNews.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
              >
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium mb-3">
                  {news.category}
                </span>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{news.title}</h3>
                <p className="text-xs text-gray-600">{news.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Resumen Rápido del Mes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm opacity-90 mb-1">Nuevos Ingresos</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Procesos Activos</p>
              <p className="text-3xl font-bold">23</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Capacitaciones</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Cumpleaños</p>
              <p className="text-3xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>

  );
}