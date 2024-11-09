import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('accounts')
          .select('username, role')
          .eq('id_acc', user.id)
          .single(); // Fetch a single record

        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setUsername(data.username);
          setRole(data.role);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUsername(''); // Clear the username on logout
    setRole(''); // Clear the role on logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, username, role, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);