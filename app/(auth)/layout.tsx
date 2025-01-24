const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-screen min-h-screen bg-[url('/images/auth-bg-full.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/30" />
        {children}

    </div>
  )
}

export default AuthLayout