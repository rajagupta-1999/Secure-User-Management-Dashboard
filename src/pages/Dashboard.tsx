import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchUsers } from '../store/userSlice';
import { logout } from '../store/authSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    } else {
      dispatch(fetchUsers());
    }
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/signin');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="flex items-center space-x-4">
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-semibold">{`${user.first_name} ${user.last_name}`}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
