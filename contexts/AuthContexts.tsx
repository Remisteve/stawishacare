import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'superadmin' | 'admin' | 'doctor' | 'prep_champion' | 'patient';
  hospitalId?: string;
  hospitalName?: string;
  isApproved: boolean;
  createdAt: Date;
  lastActive: Date;
  profileComplete: boolean;
  phone?: string;
  location?: string;
  specialization?: string; // for doctors
  department?: string;
  patientStatus?: 'prep' | 'pep' | 'condom' | 'general'; // for patients
  videoUploadStatus?: 'pending' | 'uploaded' | 'missed' | 'overdue'; // for patients
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<UserData>) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user data from Firestore
  const fetchUserData = async (uid: string): Promise<UserData | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastActive: data.lastActive?.toDate() || new Date(),
        } as UserData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Update user's last active timestamp
  const updateLastActive = async (uid: string) => {
    try {
      await setDoc(
        doc(db, 'users', uid),
        { lastActive: new Date() },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating last active:', error);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserData(result.user.uid);
      
      if (!userData) {
        throw new Error('User data not found');
      }

      if (!userData.isApproved) {
        await signOut(auth);
        throw new Error('Your account is pending approval. Please contact your administrator.');
      }

      setUserData(userData);
      await updateLastActive(result.user.uid);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.displayName}!`,
      });
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function (mainly for superadmin to create first account)
  const register = async (email: string, password: string, userData: Partial<UserData>) => {
    try {
      setLoading(true);
      
      // Check if this is the first user (superadmin)
      const usersQuery = query(collection(db, 'users'), where('role', '==', 'superadmin'));
      const existingSuperAdmins = await getDocs(usersQuery);
      
      let role = userData.role;
      let isApproved = false;

      // If no superadmin exists, make this user superadmin
      if (existingSuperAdmins.empty && !role) {
        role = 'superadmin';
        isApproved = true;
      } else if (role === 'superadmin' && !existingSuperAdmins.empty) {
        throw new Error('SuperAdmin already exists');
      } else {
        isApproved = role === 'patient'; // Patients can auto-approve, others need approval
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update Firebase Auth profile
      await updateProfile(result.user, {
        displayName: userData.displayName || email.split('@')[0],
      });

      // Create user document in Firestore
      const newUserData: UserData = {
        uid: result.user.uid,
        email: email,
        displayName: userData.displayName || email.split('@')[0],
        role: role || 'patient',
        hospitalId: userData.hospitalId,
        hospitalName: userData.hospitalName,
        isApproved,
        createdAt: new Date(),
        lastActive: new Date(),
        profileComplete: false,
        phone: userData.phone,
        location: userData.location,
        specialization: userData.specialization,
        department: userData.department,
        patientStatus: userData.patientStatus,
        videoUploadStatus: userData.videoUploadStatus || 'pending',
      };

      await setDoc(doc(db, 'users', result.user.uid), newUserData);
      setUserData(newUserData);

      toast({
        title: "Registration Successful",
        description: isApproved 
          ? "Account created successfully!" 
          : "Account created! Waiting for approval.",
      });
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<UserData>) => {
    if (!currentUser || !userData) return;

    try {
      await setDoc(
        doc(db, 'users', currentUser.uid),
        { ...data, lastActive: new Date() },
        { merge: true }
      );
      
      setUserData({ ...userData, ...data });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Refresh user data
  const refreshUserData = async () => {
    if (!currentUser) return;
    
    const freshUserData = await fetchUserData(currentUser.uid);
    if (freshUserData) {
      setUserData(freshUserData);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUserData(user.uid);
        setUserData(userData);
        setCurrentUser(user);
      } else {
        setUserData(null);
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}