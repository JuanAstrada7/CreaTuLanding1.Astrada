import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalSales: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, 'productos'));
        const products = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const totalProducts = products.length;

        const lowStockProducts = products.filter(p => p.stock <= 5 && p.stock > 0).length;
        const outOfStockProducts = products.filter(p => p.stock === 0).length;

        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const orders = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const totalOrders = orders.length;
        const pendingOrders = orders.filter(order =>
          !order.status || order.status === 'pendiente'
        ).length;

        const totalSales = orders.reduce((acc, order) => acc + (order.total || 0), 0);

        setStats({
          totalProducts,
          totalOrders,
          pendingOrders,
          totalSales,
          lowStockProducts,
          outOfStockProducts
        });
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="dashboard-title">Panel de Administración</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Productos</h3>
            <p className="stat-number">{stats.totalProducts}</p>
            <Link to="/admin/products" className="btn btn-primary">Gestionar Productos</Link>
          </div>

          <div className="stat-card">
            <h3>Órdenes Totales</h3>
            <p className="stat-number">{stats.totalOrders}</p>
            <Link to="/admin/orders" className="btn btn-primary">Ver Órdenes</Link>
          </div>

          <div className="stat-card">
            <h3>Órdenes Pendientes</h3>
            <p className="stat-number">{stats.pendingOrders}</p>
            <Link to="/admin/orders" className="btn btn-warning">Gestionar</Link>
          </div>

          <div className="stat-card">
            <h3>Ventas Totales</h3>
            <p className="stat-number">${stats.totalSales.toLocaleString()}</p>
            <span className="stat-label">Pesos Argentinos</span>
          </div>
        </div>

        {(stats.lowStockProducts > 0 || stats.outOfStockProducts > 0) && (
          <div className="stock-alerts">
            <h2>Alertas de Stock</h2>
            <div className="alerts-grid">
              {stats.lowStockProducts > 0 && (
                <div className="alert-card warning">
                  <h4>⚠️ Stock Bajo</h4>
                  <p className="alert-number">{stats.lowStockProducts}</p>
                  <p>productos con stock ≤ 5</p>
                  <Link to="/admin/products" className="btn btn-warning btn-sm">
                    Revisar Productos
                  </Link>
                </div>
              )}

              {stats.outOfStockProducts > 0 && (
                <div className="alert-card danger">
                  <h4>🚫 Sin Stock</h4>
                  <p className="alert-number">{stats.outOfStockProducts}</p>
                  <p>productos sin stock</p>
                  <Link to="/admin/products" className="btn btn-danger btn-sm">
                    Reabastecer
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <Link to="/admin/products/new" className="action-card">
              <h4>➕ Agregar Producto</h4>
              <p>Crear un nuevo producto en el catálogo</p>
            </Link>

            <Link to="/admin/orders" className="action-card">
              <h4>📋 Ver Órdenes</h4>
              <p>Revisar y gestionar pedidos</p>
            </Link>

            <Link to="/admin/products" className="action-card">
              <h4>✏️ Editar Productos</h4>
              <p>Modificar productos existentes</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;