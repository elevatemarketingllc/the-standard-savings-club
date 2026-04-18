import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBusiness, setIsBusiness] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) checkBusinessUser(session.user.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) checkBusinessUser(session.user.id)
      else setIsBusiness(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkBusinessUser = async (userId) => {
    const { data } = await supabase
      .from('business_users')
      .select('id')
      .eq('user_id', userId)
      .single()
    setIsBusiness(!!data)
  }

  const signUp = async (email, password, metadata = {}) => {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }
    })
  }

  const signIn = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setIsBusiness(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, isBusiness, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
