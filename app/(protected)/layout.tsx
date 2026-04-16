import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  // FORCE PASSWORD SET



  

  return (
    <div className="flex bg-slate-950">
      {/* <Navbar2 /> */}
      {/* {session && <Sidebar />} */}

      <div className="w-full relative h-screen flex flex-col  overflow-y-auto">
        {/* <Topbar name={session.user.name || "User"} taskStats={{ today: todayTasks, overdue: overdueTasks }} /> */}
        {/* <div className=" overflow-y-auto"> */}

        {children}
        {/* </div> */}
      </div>
    </div>
  )
}