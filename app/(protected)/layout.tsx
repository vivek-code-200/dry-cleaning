import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Sidebar from "@/components/Sidebar"
import Topbar from "@/components/Topbar"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex bg-slate-950">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="w-full relative h-screen flex flex-col  overflow-y-auto">
        <Topbar name={session.user.name || "user"} />
        {children}
      </div>
    </div>
  )
}