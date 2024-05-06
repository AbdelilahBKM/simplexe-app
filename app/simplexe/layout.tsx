import SimplexeContextProvidor from "@/components/context/simplexeProvider"


export default function DashboardLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    
    return (
      <main>
        <SimplexeContextProvidor>
            {children}
        </SimplexeContextProvidor>
      </main>
    )
  }